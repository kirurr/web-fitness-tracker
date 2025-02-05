"use client";
import {
  deleteDayActivity,
  getDayActivities,
  updateDay,
} from "@/day/day-actions";
import { useServerActionQuery } from "@/lib/server-action-hooks";
import { useDayContext } from "../day-context";
import { getDayActivityDTO } from "@/day/day-dto";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";
import { useServerAction } from "zsa-react";
import { calculateMETCalories, cn } from "@/lib/utils";
import { getUserDataDTO } from "@/user-data/user-data-dto";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

export default function Activities({ userData }: { userData: getUserDataDTO }) {
  const { dayData } = useDayContext();
  const { data, isFetching } = useServerActionQuery(getDayActivities, {
    enabled: !!dayData,
    input: {
      id: dayData ? dayData.id : 0,
    },
    queryKey: ["dayActivities", dayData],
    placeholderData: (prev) => prev,
    staleTime: Infinity,
  });

  const queryClient = useQueryClient();
  if (!dayData) return null;
  if (!data) return null;

  if (isFetching)
    return (
      <LoaderCircle className="mx-auto animate-spin text-border" size={40} />
    );
  return (
    <ul className="space-y-4">
      {data.map((item) => (
        <Activity
          data={item}
          key={item.day_activity.id}
          weight={userData.weight}
          queryClient={queryClient}
        />
      ))}
    </ul>
  );
}

function Activity({
  data,
  weight,
  queryClient,
}: {
  data: getDayActivityDTO;
  weight: number;
  queryClient: QueryClient;
}) {
  const { dayData, setDayData, setDaysData: setDays } = useDayContext();
  const form = useForm();

  const deleteDayActivityAction = useServerAction(deleteDayActivity);
  const updateDayAction = useServerAction(updateDay);

  const calories = calculateMETCalories(
    weight,
    data.met_activity!,
    data.day_activity.duration,
  );

  async function onSubmit() {
    const [_, err] = await deleteDayActivityAction.execute(
      data.day_activity.id,
    );
    if (err) throw err;

    const calories = calculateMETCalories(
      weight,
      data.met_activity!,
      data.day_activity.duration,
    );

    const newCalories = dayData!.calories_burnt - calories;

    const [updateDayData, updateDayErr] = await updateDayAction.execute({
      id: dayData!.id,
      calories_burnt: newCalories,
    });

    if (updateDayErr) throw updateDayErr;

    setDayData(updateDayData);
    setDays((days) =>
      days.map((day) => (day.id === updateDayData.id ? updateDayData : day)),
    );

    queryClient.invalidateQueries({ queryKey: ["dayActivities"] });
  }
  return (
    <li className="relative flex items-center justify-between rounded-lg border-2 p-2">
      <div
        className={cn(
          "absolute inset-0 z-20 hidden size-full items-center rounded-lg backdrop-blur-sm",
          (updateDayAction.isPending || deleteDayActivityAction.isPending) &&
            "flex",
        )}
      >
        <LoaderCircle className="mx-auto animate-spin text-border" size={40} />
      </div>
      <div className="flex w-full flex-col divide-y-2 px-2 lg:flex-row lg:divide-x-2 lg:divide-y-0">
        <p className="grow pb-2 lg:pb-0 lg:pr-2">
          {data.met_activity ? data.met_activity.name : ""}
        </p>
        <p className="py-2 lg:px-2 lg:py-0">
          {data.day_activity.duration} hours
        </p>
        <p className="pt-2 lg:pl-2 lg:pt-0">{calories} calories</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Button type="submit" variant="ghost" size="icon">
            <X />
          </Button>
        </form>
      </Form>
    </li>
  );
}
