"use client";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { createMeal, createDay, updateDay } from "@/day/day-actions";
import { findMeal, getMealById } from "@/fatsecret/fatsecret-actions";
import { createMealFormSchema } from "@/lib/schemas";
import { useServerActionQuery } from "@/lib/server-action-hooks";
import { calculateMealCalories, cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { useDayContext } from "../day-context";

export default function SelectMealForm() {
  const [search, setSearch] = useState("");

  const { data, isLoading, error, isError } = useServerActionQuery(findMeal, {
    input: search,
    queryKey: ["meal", search],
    enabled: !!search,
  });
  const queryClient = useQueryClient();
  queryClient.cancelQueries({ queryKey: ["meal", search] });

  const form = useForm<z.infer<typeof createMealFormSchema>>({
    resolver: zodResolver(createMealFormSchema),
    defaultValues: {
      weight: "",
      food: undefined,
    },
    mode: "onBlur",
  });

  const { dayData, setDayData, setDaysData, diet, month, date } =
    useDayContext();

  const createDayAction = useServerAction(createDay);
  const updateDayAction = useServerAction(updateDay);

  const createMealAction = useServerAction(createMeal);
  const getMealByIdAction = useServerAction(getMealById);

  const isPending =
    createMealAction.isPending ||
    getMealByIdAction.isPending ||
    updateDayAction.isPending ||
    getMealByIdAction.isPending;

  async function onSubmit(data: z.infer<typeof createMealFormSchema>) {
    let day = dayData;
    if (!day) {
      const [data, err] = await createDayAction.execute({
        diet_id: diet.diet.id,
        month_number: month.getMonth(),
        index: date.getDate(),
        calories_burnt: 0,
        calories_intake: 0,
        calories_per_day: diet.diet.calories,
        water_per_day: diet.diet.water,
        water_intake: 0,
      });
      if (err) throw err;
      day = data;
      setDaysData((days) => [...days, data]);
    }

    const [mealData, mealDataErr] = await getMealByIdAction.execute(
      data.food.food_id,
    );

    if (mealDataErr) throw mealDataErr;

    const numberOfUnits = +mealData.servings.serving[0].number_of_units;
    const calories = +mealData.servings.serving[0].calories;
    const portion =
      +mealData.servings.serving[0].metric_serving_amount * numberOfUnits;

    const [_meal, mealErr] = await createMealAction.execute({
      name: data.food.food_name,
      weight: +data.weight,
      calories: calories,
      portion: portion,
      day_id: day.id,
      created: new Date().toDateString(),
    });
    if (mealErr) throw mealErr;

    const caloriesGained = calculateMealCalories(
      calories,
      portion,
      +data.weight,
    );

    const newCalories = day.calories_intake + caloriesGained;
    const [updateDayData, updateDayErr] = await updateDayAction.execute({
      id: day.id,
      calories_intake: newCalories,
    });
    if (updateDayErr) throw updateDayErr;

    queryClient.invalidateQueries({ queryKey: ["dayMeals"] });

    setDayData(updateDayData);
    setDaysData((days) =>
      days.map((day) => (day.id === updateDayData.id ? updateDayData : day)),
    );
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="food"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block">Select meal</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-full justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? field.value.food_name : "Select meal"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command
                    filter={(value, search) => {
                      if (data) {
                        const meal = data.food.find(
                          (item) => item.food_id === value,
                        );
                        if (
                          meal?.food_name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        )
                          return 1;
                      }
                      return 0;
                    }}
                  >
                    <CommandInput
                      value={search}
                      onValueChange={(e) => setSearch(e)}
                      placeholder="Search meal..."
                    />
                    <CommandList
                      className={cn(
                        isLoading ? "overflow-hidden" : "overflow-auto",
                      )}
                    >
                      {!isLoading && isError && (
                        <CommandEmpty>{error?.message}</CommandEmpty>
                      )}
                      {isLoading && !data && (
                        <CommandEmpty>
                          <div className="flex size-full animate-spin items-center justify-center">
                            <LoaderCircle />
                          </div>
                        </CommandEmpty>
                      )}
                      {!isLoading && !data && !isError && (
                        <CommandEmpty>Start typing to search...</CommandEmpty>
                      )}
                      {data && <CommandEmpty>No meal found.</CommandEmpty>}
                      <CommandGroup>
                        {data &&
                          data.food.map((meal) => (
                            <CommandItem
                              value={meal.food_id}
                              key={meal.food_id}
                              onSelect={() => {
                                form.setValue("food", meal);
                              }}
                            >
                              {meal.food_name}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  field.value &&
                                    meal.food_id === field.value.food_id
                                    ? "opacity-100"
                                    : "opacity-0",
                                )}
                              />
                            </CommandItem>
                          ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="weight"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weight</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter weight in grams" />
              </FormControl>
              <FormDescription>Enter weight in grams</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="mr-4 mt-4" type="submit">
          <LoaderCircle
            className={cn("animate-spin", !isPending && "hidden")}
          />
          Submit
        </Button>
        <a href="https://www.fatsecret.com">Powered by fatsecret</a>
      </form>
    </Form>
  );
}
