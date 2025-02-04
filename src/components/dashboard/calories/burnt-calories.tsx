"use client";

import { useDayContext } from "../day-context";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function BurntCalories({ className }: { className?: string }) {
  const { dayData, diet } = useDayContext();

  const caloriesForDay = diet.diet.calories;
  const caloriesBurnt = dayData ? dayData.calories_burnt : 0;
  return (
    <div
      className={cn(
        "flex gap-8 rounded-xl bg-[#43acf5]/10 p-4 shadow-lg",
        className,
      )}
    >
      <CircularProgress
        progress={(caloriesBurnt / caloriesForDay) * 100}
        strokeWidth={20}
        size={190}
        color="text-[#348de9]"
        backgroundColor="text-[#43acf5]/30"
      />
      <div className="flex flex-col justify-center">
        <h2>Burnt calories</h2>
        <p>
          <span className="text-muted-foreground">Calories to burn:</span>{" "}
          {caloriesForDay}
        </p>
        <p>
          <span className="text-muted-foreground">Calories burnt:</span>{" "}
          {caloriesBurnt}
        </p>
        <Link href={"/dashboard/burnt-calories"}>
          <Button className="mt-4 w-fit bg-[#348de9] hover:bg-[#348de9]/90">
            Add activity
          </Button>
        </Link>
      </div>
    </div>
  );
}
