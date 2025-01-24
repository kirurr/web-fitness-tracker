"use client";
import { DayContentProps } from "react-day-picker";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";

export default function DashboardCalendarPopover({
  date,
  setDate,
  month,
  setMonth,
}: {
  date: Date;
  setDate: (date: Date) => void;
  month: Date | undefined;
  setMonth: (date: Date) => Promise<void>;
}) {
  const [isOpen, setIsOpen] = useState<boolean>();
  function onDateSelect(date: Date) {
		setIsOpen(false);
    setDate(date);
  }
  return (
    <Popover open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <PopoverTrigger asChild>
        <Button variant="outline">{date.toDateString() == new Date().toDateString() ? "Today" : date.toDateString()}</Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          onSelect={(date) => onDateSelect(date ?? new Date())}
          selected={date}
          month={month}
          onMonthChange={(month) => setMonth(month)}
          mode="single"
          components={{
            DayContent: Day,
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

function Day(props: DayContentProps) {
  const { date, displayMonth, activeModifiers } = props;
  return <>{date.getDate()}</>;
}
