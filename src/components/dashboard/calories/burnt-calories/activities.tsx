"use client";
import { deleteDayActivity, updateDay } from "@/day/day-actions";
import { useDayContext } from "../../day-context";
import { getDayActivityDTO } from "@/day/day-dto";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";
import { useServerAction } from "zsa-react";
import { calculateMETCalories, cn } from "@/lib/utils";
import { getUserDataDTO } from "@/user-data/user-data-dto";

export default function Activities({
  userData,
  isPending,
  removeActivity,
  activities,
}: {
  userData: getUserDataDTO;
  isPending: boolean;
  removeActivity: (activity: getDayActivityDTO) => void;
  activities: getDayActivityDTO[];
}) {
  if (isPending)
    return (
      <LoaderCircle className="mx-auto animate-spin text-border" size={40} />
    );
  return (
    <ul className="space-y-4">
      {activities.map((item) => (
        <Activity
          data={item}
          key={item.day_activity.id}
          weight={userData.weight}
          removeActivity={removeActivity}
        />
      ))}
    </ul>
  );
}

function Activity({
  data,
  weight,
  removeActivity,
}: {
  data: getDayActivityDTO;
  weight: number;
  removeActivity: (activity: getDayActivityDTO) => void;
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

    removeActivity(data);
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
