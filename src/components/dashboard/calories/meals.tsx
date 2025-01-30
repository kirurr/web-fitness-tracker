import { useServerActionQuery } from "@/lib/server-action-hooks";
import { useDayContext } from "../day-context";
import { deleteMeal, getMealsByDayId, updateDay } from "@/day/day-actions";
import { getMealDTO } from "@/fatsecret/fatsecret-dto";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";
import { calculateMealCalories } from "@/lib/utils";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";

export default function Meals() {
  const { dayData } = useDayContext();
  const { data, isFetching } = useServerActionQuery(getMealsByDayId, {
    enabled: !!dayData,
    input: dayData ? dayData.id : 0,
    queryKey: ["dayMeals", dayData],
  });
  const queryClient = useQueryClient();

  if (!dayData) return null;
  if (!data) return null;

  if (isFetching)
    return (
      <div className="animate-spin size-fit">
        <LoaderCircle />
      </div>
    );
  return (
    <div>
      {data.map((item) => (
          <Meal key={item.id} data={item} queryClient={queryClient} />
        ))}
    </div>
  );
}

function Meal({
  data,
  queryClient,
}: {
  data: getMealDTO;
  queryClient: QueryClient;
}) {
  const { dayData, setDayData, setDaysData: setDays } = useDayContext();
  const form = useForm();

  const deleteMealAction = useServerAction(deleteMeal);
  const updateDayAction = useServerAction(updateDay);

  async function onSubmit() {
    const [_, err] = await deleteMealAction.execute(data.id);
    if (err) throw err;

    const calories = calculateMealCalories(
      data.calories,
      data.portion,
      data.weight,
    );

    const newCalories = dayData!.calories_intake - calories;

    const [updateDayData, updateDayErr] = await updateDayAction.execute({
      id: dayData!.id,
      calories_intake: newCalories,
    });

    if (updateDayErr) throw updateDayErr;

    setDayData(updateDayData);
    setDays((days) =>
      days.map((day) => (day.id === updateDayData.id ? updateDayData : day)),
    );

    queryClient.invalidateQueries({ queryKey: ["dayMeals"] });
  }

  return (
    <li className="flex items-center">
      {data.name}
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
