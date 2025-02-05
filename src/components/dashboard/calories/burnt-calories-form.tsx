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
import {
  createDay,
  createDayActivity,
  getMETActivities,
  updateDay,
} from "@/day/day-actions";
import { getMetActivityDTO } from "@/day/day-dto";
import { createDayActivityFormSchema } from "@/lib/schemas";
import { calculateMETCalories, cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useServerAction } from "zsa-react";
import { useDayContext } from "../day-context";
import { getUserDataDTO } from "@/user-data/user-data-dto";
import { useQueryClient } from "@tanstack/react-query";

export default function BurntCaloriesForm({
  userData,
}: {
  userData: getUserDataDTO;
}) {
  const [activities, setActivities] = useState<getMetActivityDTO[]>([]);
  const [_popoverOpen, setPopoverOpen] = useState(false);

  const {
    dayData,
    setDayData,
    setDaysData: setDays,
    diet,
    month,
    date,
  } = useDayContext();

  const form = useForm<z.infer<typeof createDayActivityFormSchema>>({
    resolver: zodResolver(createDayActivityFormSchema),
    defaultValues: {
      met_activity_id: "",
      duration: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    form.reset(undefined, { keepDefaultValues: true });
  }, [form.formState.isSubmitSuccessful, form]);

  const queryClient = useQueryClient();

  const getMETActivitiesAction = useServerAction(getMETActivities);
  const createDayActivityAction = useServerAction(createDayActivity);
  const createDayAction = useServerAction(createDay);
  const updateDayAction = useServerAction(updateDay);

  const isPending =
    createDayActivityAction.isPending ||
    createDayAction.isPending ||
    updateDayAction.isPending;

  async function onPopoverOpen() {
    setPopoverOpen(true);
    if (activities.length === 0) {
      const [data, err] = await getMETActivitiesAction.execute();

      if (err) throw err;
      setActivities(data);
    }
  }

  async function onSubmit(
    formData: z.infer<typeof createDayActivityFormSchema>,
  ) {
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
      setDays((days) => [...days, data]);
    }

    const [_dayActivityData, dayActivityErr] =
      await createDayActivityAction.execute({
        day_id: day.id,
        met_activity_id: +formData.met_activity_id,
        duration: +formData.duration,
      });
    if (dayActivityErr) throw dayActivityErr;

    const metActivity = activities.find(
      (item) => item.id.toString() === formData.met_activity_id,
    )!;

    const caloriesBurnt = calculateMETCalories(
      userData.weight,
      metActivity,
      +formData.duration,
    );

    const [updateDayData, updateDayErr] = await updateDayAction.execute({
      id: day.id,
      calories_burnt: day.calories_burnt + caloriesBurnt,
    });
    if (updateDayErr) throw updateDayErr;

    setDayData(updateDayData);
    setDays((days) =>
      days.map((day) => (day.id === updateDayData.id ? updateDayData : day)),
    );

    queryClient.invalidateQueries({ queryKey: ["dayActivities"] });
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="met_activity_id"
          rules={{ required: true }}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="block">Select activity</FormLabel>
              <Popover onOpenChange={onPopoverOpen}>
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
                      {field.value
                        ? activities.find(
                            (activitiy) =>
                              activitiy.id.toString() === field.value,
                          )?.name
                        : "Select activity"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command
                    filter={(value, search) => {
                      const activity = activities.find(
                        (item) => item.id.toString() === value,
                      );
                      if (
                        activity?.name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      )
                        return 1;
                      return 0;
                    }}
                  >
                    <CommandInput placeholder="Search activity..." />
                    <CommandList
                      className={cn(
                        getMETActivitiesAction.isPending
                          ? "overflow-hidden"
                          : "overflow-auto",
                      )}
                    >
                      {getMETActivitiesAction.isPending ? (
                        <CommandEmpty>
                          <div className="flex size-full animate-spin items-center justify-center">
                            <LoaderCircle />
                          </div>
                        </CommandEmpty>
                      ) : (
                        <CommandEmpty>No activity found.</CommandEmpty>
                      )}
                      <CommandGroup>
                        {activities.map((activity) => (
                          <CommandItem
                            value={activity.id.toString()}
                            key={activity.id}
                            onSelect={() => {
                              form.setValue(
                                "met_activity_id",
                                activity.id.toString(),
                              );
                            }}
                          >
                            {activity.name}
                            <Check
                              className={cn(
                                "ml-auto",
                                activity.id.toString() === field.value
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
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Duration</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter duration in hours" />
              </FormControl>
              <FormDescription>Enter duration in hours</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          className="mt-4 bg-[#348de9] hover:bg-[#348de9]/90"
          type="submit"
        >
          <LoaderCircle
            className={cn("animate-spin", !isPending && "hidden")}
          />
          Submit
        </Button>
      </form>
    </Form>
  );
}
