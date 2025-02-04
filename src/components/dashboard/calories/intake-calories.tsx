"use client";

import { CircularProgress } from "@/components/ui/circular-progress";
import { useDayContext } from "../day-context";
import { Button } from "@/components/ui/button";

export default function IntakeCalories() {
  const { dayData, diet } = useDayContext();

  const caloriesForDay = diet.diet.calories;
  const caloriesForIntake = Math.round(caloriesForDay * diet.goal!.value);
  const caloriesIntake = dayData ? dayData.calories_intake : 0;
  return (
    <div className="flex w-full gap-8 rounded-xl p-4 shadow-lg bg-[#ba95f4]/20">
      <CircularProgress
        progress={(caloriesIntake / caloriesForIntake) * 100}
        strokeWidth={20}
        size={190}
        color="text-primary"
				backgroundColor="text-[#ba95f4]/30"
      />
      <div className="flex flex-col justify-center">
        <h2>Calories intake</h2>
        <p>
          <span className="text-muted-foreground">Calories to consume:</span> {caloriesForIntake}
        </p>
        <p>
          <span className="text-muted-foreground">Calories intake:</span> {caloriesIntake}
        </p>
				<Button className="w-fit mt-4" onClick={() => console.log("click")}>Add meal</Button>
      </div>
    </div>
  );
}
