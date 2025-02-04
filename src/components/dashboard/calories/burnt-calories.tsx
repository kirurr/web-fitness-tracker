"use client";

import { useDayContext } from "../day-context";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Button } from "@/components/ui/button";

export default function BurntCalories() {
  const { dayData, diet } = useDayContext();

  const caloriesForDay = diet.diet.calories;
  const caloriesBurnt = dayData ? dayData.calories_burnt : 0;
  return (
    <div className="flex w-full gap-8 rounded-xl p-4 shadow-lg bg-[#43acf5]/20">
      <CircularProgress
        progress={(caloriesBurnt / caloriesForDay) * 100}
        strokeWidth={20}
        size={190}
        color="text-[#43acf5]"
				backgroundColor="text-[#43acf5]/30"
      />
			<div className="flex flex-col justify-center">
				<h2>Burnt calories</h2>
        <p>
          <span className="text-muted-foreground">Calories to burn:</span> {caloriesForDay}
        </p>
        <p>
          <span className="text-muted-foreground">Calories burnt:</span> {caloriesBurnt}
        </p>
				<Button className="w-fit mt-4 bg-[#43acf5]" onClick={() => console.log("click")}>Add activity</Button>
			</div>
    </div>
  );
}
