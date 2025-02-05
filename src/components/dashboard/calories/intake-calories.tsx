"use client";

import { CircularProgress } from "@/components/ui/circular-progress";
import { useDayContext } from "../day-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function IntakeCalories({  className }: { className?: string }) {
  const { dayData, diet } = useDayContext();

  const caloriesForDay = diet.diet.calories;
  const caloriesForIntake = Math.round(caloriesForDay * diet.goal!.value);
  const caloriesIntake = dayData ? dayData.calories_intake : 0;
  return (
    <div className={cn("flex flex-col lg:flex-row items-center lg:items-start gap-8 rounded-xl p-4 shadow-lg bg-[#ba95f4]/10", className)}>
      <CircularProgress
        progress={(caloriesIntake / caloriesForIntake) * 100}
        strokeWidth={20}
        size={190}
        color="text-primary"
				backgroundColor="text-[#ba95f4]/30"
      />
      <div className="flex flex-col items-center lg:items-start justify-center">
        <h2>Calories intake</h2>
        <p>
          <span className="text-muted-foreground">Calories to consume:</span> {caloriesForIntake}
        </p>
        <p>
          <span className="text-muted-foreground">Calories intake:</span> {caloriesIntake}
        </p>
        <Link href={"/dashboard/intake-calories"}>
          <Button className="w-fit mt-4">Add meal</Button>
        </Link>
      </div>
    </div>
  );
}
