"use client";
import { cn } from "@/lib/utils";
import { WaterProgressCounter } from "@/components/ui/water/water-progress-counter";

export default function Water({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-8 rounded-xl bg-[#43acf5]/10 p-4 shadow-lg",
        className,
      )}
    >
      <h2 className="text-center">Water intake</h2>
      <WaterProgressCounter />
    </div>
  );
}
