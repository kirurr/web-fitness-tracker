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
import { calculateMETCalories } from "@/lib/utils";
import { getUserDataDTO } from "@/user-data/user-data-dto";
import { QueryClient, useQueryClient } from "@tanstack/react-query";

export default function Activities({ userData }: { userData: getUserDataDTO }) {
  const { dayData } = useDayContext();
  const { data, isLoading } = useServerActionQuery(getDayActivities, {
    enabled: !!dayData,
    input: {
      id: dayData ? dayData.id : 0,
    },
    queryKey: ["dayActivities", dayData],
  });

  const queryClient = useQueryClient();
  if (!dayData) return null;
  if (!data) return null;

  if (isLoading)
    return (
      <div className="animate-spin">
        <LoaderCircle />
      </div>
    );
  return (
    <div>
      <ul>
        {data.map((item) => (
          <Activity
            data={item}
            key={item.day_activity.id}
            weight={userData.weight}
            queryClient={queryClient}
          />
        ))}
      </ul>
    </div>
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
    <li className="flex items-center">
      {data.met_activity ? data.met_activity.name : ""}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Button type="submit" variant="outline">
            <X />
          </Button>
        </form>
      </Form>
    </li>
  );
}
