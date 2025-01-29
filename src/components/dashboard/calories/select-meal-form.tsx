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
import { findMeal } from "@/fatsecret/fatsecret-actions";
import { createMealFormSchema } from "@/lib/schemas";
import { useServerActionQuery } from "@/lib/server-action-hooks";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export default function SelectMealForm() {
  const [search, setSearch] = useState("");

  const { data, isLoading } = useServerActionQuery(findMeal, {
    input: search,
    queryKey: ["meal", search],
    enabled: !!search,
  });

  const form = useForm<z.infer<typeof createMealFormSchema>>({
    resolver: zodResolver(createMealFormSchema),
    defaultValues: {
      food: {
        food_name: "",
        food_description: "",
        food_id: "",
      },
      weight: 0,
    },
  });

  function onSubmit(data: z.infer<typeof createMealFormSchema>) {
    console.log(data);
  }

  console.log(search);
  if (data) console.log(data);

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
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value
                        ? data
                          ? data.food.find(
                              (meal) => meal.food_id === field.value.food_id,
                            )?.food_name
                          : "Select meal"
                        : "Select meal"}
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
                    <CommandList>
                      {isLoading && !data && (
                        <CommandEmpty>
                          <div className="flex size-full animate-spin items-center justify-center">
                            <LoaderCircle />
                          </div>
                        </CommandEmpty>
                      )}
                      {!isLoading && !data && (
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
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  placeholder="Enter weight in grams"
                />
              </FormControl>
              <FormDescription>Enter weight in grams</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
