"use client";

import { CircularProgress } from "@/components/ui/circular-progress";
import { useDayContext } from "../../day-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";

export default function IntakeCalories({
  className,
  showButton = true,
}: {
  className?: string;
  showButton?: boolean;
}) {
  const { dayData, diet, isDietPending, isPending } = useDayContext();

  const isLoading = isPending || isDietPending;

  const caloriesForDay = isLoading ? 0 : diet.diet.calories;
  const caloriesForIntake = isLoading
    ? 0
    : Math.round(caloriesForDay * diet.goal!.value);
  const caloriesIntake = isLoading ? 0 : dayData ? dayData.calories_intake : 0;
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-8 rounded-xl bg-[#ba95f4]/10 p-4 shadow-lg lg:flex-row lg:items-start",
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
        progress={
          isLoading ? 0 : Math.round((caloriesIntake / caloriesForIntake) * 100)
        }
        strokeWidth={20}
        size={190}
        color="text-primary"
        backgroundColor="text-[#ba95f4]/30"
      />
      <div className="flex flex-col items-center justify-center lg:items-start">
        <h2>Calories intake</h2>
        <p>
          <span className="text-muted-foreground">Calories to consume:</span>{" "}
          {caloriesForIntake}
        </p>
        <p>
          <span className="text-muted-foreground">Calories intake:</span>{" "}
          {caloriesIntake}
        </p>
        <Link
          className={cn(!showButton && "hidden")}
          href={"/dashboard/intake-calories"}
        >
          <Button className="mt-4 w-fit">Add meal</Button>
        </Link>
      </div>
    </div>
  );
}
