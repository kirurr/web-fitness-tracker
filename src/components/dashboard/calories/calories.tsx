"use client";

import { getUserDataDTO } from "@/user-data/user-data-dto";
import { useDayContext } from "../day-context";
import BurntCaloriesForm from "./burnt-calories-form";
import Activities from "./activities";
import Meals from "./meals";
import SelectMealForm from "./select-meal-form";

export default function Calories({ userData }: { userData: getUserDataDTO }) {
  const { dayData, diet } = useDayContext();

  const caloriesForDay = diet.diet.calories;
	const caloriesForIntake = Math.round(caloriesForDay * diet.goal!.value);
  const caloriesBurnt = dayData ? dayData.calories_burnt : 0;
  const caloriesIntake = dayData ? dayData.calories_intake : 0;
  return (
    <div>
      <h1>Calories</h1>
      <p>Calories burned: {caloriesBurnt} of {caloriesForDay}</p>
      <p>Calories intake: {caloriesIntake} of {caloriesForIntake}</p>
      <BurntCaloriesForm userData={userData} />
      <Activities userData={userData} />
      <SelectMealForm />
			<Meals />
    </div>
  );
}
