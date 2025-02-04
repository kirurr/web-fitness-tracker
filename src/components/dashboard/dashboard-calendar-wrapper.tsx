"use client";

import { add, sub } from "date-fns";
import { Button } from "../ui/button";
import DashboardCalendarPopover from "./dashboard-calendar";
import { useDayContext } from "./day-context";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function DashboardCalendarWrapper() {
  const { date, onDateChange, month, onMonthChange, isPending, daysData } =
    useDayContext();

  return (
    <>
      <div className="flex justify-between mb-16">
        <Button
          variant="outline"
          size="lg"
          onClick={() => onDateChange(sub(new Date(date), { days: 1 }))}
        >
          <ArrowLeft />
          Previous day
        </Button>
        <DashboardCalendarPopover
          isPending={isPending}
          date={date}
          daysData={daysData}
          setDate={onDateChange}
          month={month}
          setMonth={onMonthChange}
        />
        <Button
          variant="outline"
          size="lg"
          onClick={() => onDateChange(add(new Date(date), { days: 1 }))}
        >
          Next day
          <ArrowRight />
        </Button>
      </div>
    </>
  );
}
