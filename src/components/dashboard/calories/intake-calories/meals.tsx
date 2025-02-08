"use client";
import { useDayContext } from "../../day-context";
import { deleteMeal as deleteMealA, updateDay } from "@/day/day-actions";
import { getMealDTO } from "@/fatsecret/fatsecret-dto";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";
import { calculateMealCalories, cn } from "@/lib/utils";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { LoaderCircle, X } from "lucide-react";

export default function Meals(
  {
    meals,
    deleteMeal,
    isPending
  }: {
    meals: getMealDTO[];
    deleteMeal: (meal: getMealDTO) => void;
    isPending: boolean;
  }

) {
  if (isPending)
    return (
      <LoaderCircle className="mx-auto animate-spin text-border" size={40} />
    );

  return (
    <ul className="space-y-4">
      {meals.map((item) => (
        <Meal key={item.id} data={item} deleteMeal={deleteMeal} />
      ))}
    </ul>
  );
}

function Meal({
  data,
  deleteMeal
}: {
  data: getMealDTO;
  deleteMeal: (meal: getMealDTO) => void;
}) {
  const { dayData, setDayData, setDaysData: setDays } = useDayContext();
  const form = useForm();

  const deleteMealAction = useServerAction(deleteMealA);
  const updateDayAction = useServerAction(updateDay);

  const calories = calculateMealCalories(
    data.calories,
    data.portion,
    data.weight,
  );

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

    deleteMeal(data);
  }

  return (
    <li className="relative flex items-center justify-between rounded-lg border-2 p-2">
      <div
        className={cn(
          "absolute inset-0 z-20 hidden size-full items-center rounded-lg backdrop-blur-sm",
          (updateDayAction.isPending || deleteMealAction.isPending) && "flex",
        )}
      >
        <LoaderCircle className="mx-auto animate-spin text-border" size={40} />
      </div>
      <div className="flex w-full flex-col divide-y-2 px-2 lg:flex-row lg:divide-x-2 lg:divide-y-0">
        <p className="grow pb-2 lg:pb-0 lg:pr-2">{data.name}</p>
        <p className="py-2 lg:px-2 lg:py-0">{data.weight} grams</p>
        <p className="pt-2 lg:pl-2 lg:pt-0">{calories} calories</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Button type="submit" variant="ghost">
            <X />
          </Button>
        </form>
      </Form>
    </li>
  );
}
