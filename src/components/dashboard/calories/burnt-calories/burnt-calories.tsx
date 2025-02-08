"use client";

import { useDayContext } from "../../day-context";
import { CircularProgress } from "@/components/ui/circular-progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

export default function BurntCalories({
  className,
  showButton = true,
}: {
  className?: string;
  showButton?: boolean;
}) {
  const { dayData, diet, isPending, isDietPending } = useDayContext();

  const isLoading = isPending || isDietPending
  const caloriesForDay = isLoading ? 0 :  diet.diet.calories;
  const caloriesBurnt = isLoading ? 0 : dayData ? dayData.calories_burnt : 0;
  return (
    <div
      className={cn(
        "relative flex flex-col items-center gap-8 rounded-xl bg-[#43acf5]/10 p-4 shadow-lg lg:flex-row lg:items-start",
        className,
      )}
    >
      <div
        className={cn(
          isLoading ? "flex" : "hidden",
          "absolute z-50 size-full items-center justify-center backdrop-blur-sm",
        )}
      >
        <LoaderCircle className="animate-spin text-border" size={40} />
      </div>
      <CircularProgress
        progress={isLoading ? 0 : Math.round((caloriesBurnt / caloriesForDay) * 100)}
        strokeWidth={20}
        size={190}
        color="text-[#348de9]"
        backgroundColor="text-[#43acf5]/30"
      />
      <div className="flex flex-col items-center justify-center lg:items-start">
        <h2>Burnt calories</h2>
        <p>
          <span className="text-muted-foreground">Calories to burn:</span>{" "}
          {caloriesForDay}
        </p>
        <p>
          <span className="text-muted-foreground">Calories burnt:</span>{" "}
          {caloriesBurnt}
        </p>
        <Link
          className={cn(!showButton && "hidden")}
          href={"/dashboard/burnt-calories"}
        >
          <Button className="mt-4 w-fit bg-[#348de9] hover:bg-[#348de9]/90">
            Add activity
          </Button>
        </Link>
      </div>
    </div>
  );
}
