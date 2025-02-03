import { DayContentProps } from "react-day-picker";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { useState } from "react";
import { CalendarDays, LoaderCircle } from "lucide-react";
import { getDayDTO } from "@/day/day-dto";

export default function DashboardCalendarPopover({
  isPending,
  date,
  setDate,
  month,
  setMonth,
  daysData
}: {
  isPending: boolean;
  date: Date;
  setDate: (date: Date) => void;
  month: Date | undefined;
  setMonth: (date: Date) => Promise<void>;
  daysData: getDayDTO[];
}) {
  const [isOpen, setIsOpen] = useState<boolean>();
  function onDateSelect(date: Date) {
    setIsOpen(false);
    setDate(date);
  }

  return (
    <Popover open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <PopoverTrigger asChild>
        <Button disabled={isPending} variant="outline">
          {date.toDateString() == new Date().toDateString()
            ? "Today"
            : date.toDateString()}
          {isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <CalendarDays />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <Calendar
          onSelect={(date) => onDateSelect(date ?? new Date())}
          selected={date}
          month={month}
          modifiers={{ hasData:  daysData.map(day => new Date(date.getFullYear(), day.month_number, day.index))}}
          modifiersClassNames={{ hasData: "border-2"}}
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
  //eslint-disable-next-line
  const { date, displayMonth, activeModifiers } = props;
  return <>{date.getDate()}</>;
}
