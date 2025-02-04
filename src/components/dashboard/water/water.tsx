"use client";
import { cn } from "@/lib/utils";
import { WaterProgressCounter } from "@/components/ui/water/water-progress-counter";

export default function Water({ className }: { className?: string }) {
  return <div className={cn("", className)}>
		<WaterProgressCounter />
	</div>;
}
