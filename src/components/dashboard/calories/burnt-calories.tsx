"use client";

import { getUserDataDTO } from "@/user-data/user-data-dto";
import { useDayContext } from "../day-context";
import BurntCaloriesForm from "./burnt-calories-form";
import Activities from "./activities";

export default function BurntCalories({ userData }: { userData: getUserDataDTO }) {
  const { dayData, diet } = useDayContext();

  const caloriesForDay = diet.diet.calories;
  const caloriesBurnt = dayData ? dayData.calories_burnt : 0;
  return (
    <div>
      <h1>Burnt calories</h1>
      <p>Calories burned: {caloriesBurnt} of {caloriesForDay} cal</p>
      <BurntCaloriesForm userData={userData} />
      <Activities userData={userData} />
    </div>
  );
}
