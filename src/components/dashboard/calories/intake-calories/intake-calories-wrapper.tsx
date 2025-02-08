"use client";

import { getMealDTO } from "@/fatsecret/fatsecret-dto";
import { useEffect, useState } from "react";
import SelectMealForm from "./select-meal-form";
import Meals from "./meals";
import { useDayContext } from "../../day-context";
import { useServerActionQuery } from "@/lib/server-action-hooks";
import { getMealsByDayId } from "@/day/day-actions";

export default function IntakeCaloriesWrapper() {
  const [meals, setMeals] = useState<getMealDTO[]>([]);

  const { dayData } = useDayContext();
  const { data, isPending } = useServerActionQuery(getMealsByDayId, {
    enabled: !!dayData,
    input: dayData ? dayData.id : 0,
    queryKey: ["dayMeals", dayData],
  });

  useEffect(() => {
    if (data) {
      setMeals(data);
    }
  }, [data]);

  return (
    <>
      <SelectMealForm
        addMeal={(meal: getMealDTO) => setMeals((meals) => [...meals, meal])}
      />
      <div className="w-full self-start">
        <Meals
          meals={meals}
          isPending={dayData ? isPending : false}
          deleteMeal={(meal) =>
            setMeals((meals) => meals.filter((item) => item.id !== meal.id))
          }
        />
      </div>
    </>
  );
}
