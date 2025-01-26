"use client"

import { getUserDataDTO } from "@/user-data/user-data-dto";
import { useDayContext } from "../day-context";
import CaloriesForm from "./calories-form";

export default function Calories({ userData }: { userData: getUserDataDTO }) {
	const { dayData, diet } = useDayContext();
	const caloriesForDay = dayData ? dayData.calories_per_day : diet.calories;
	const caloriesBurnt = dayData ? dayData.calories_burnt : 0;
	const caloriesIntake = dayData ? dayData.calories_intake : 0;
	
  return (
    <div>
      <h1>Calories</h1>
      <p>Calories for day: {caloriesForDay}</p>
      <p>Calories burned: {caloriesBurnt}</p>
      <p>Calories intake: {caloriesIntake}</p>
			<CaloriesForm userData={userData} />
    </div>
  );
}
