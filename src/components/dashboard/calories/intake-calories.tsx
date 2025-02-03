"use client";

import { useDayContext } from "../day-context";
import Meals from "./meals";
import SelectMealForm from "./select-meal-form";

export default function IntakeCalories() {
  const { dayData, diet } = useDayContext();

  const caloriesForDay = diet.diet.calories;
	const caloriesForIntake = Math.round(caloriesForDay * diet.goal!.value);
  const caloriesIntake = dayData ? dayData.calories_intake : 0;
  return (
    <div>
      <h1>Calories intake</h1>
      <p>Calories intake: {caloriesIntake} of {caloriesForIntake} cal</p>
      <SelectMealForm />
			<Meals />
    </div>
  );
}
