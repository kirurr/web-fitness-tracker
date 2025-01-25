"use client";

import DashboardCalendarPopover from "./dashboard-calendar";
import { useDayContext } from "./day-context";

export default function DashboardCalendarWrapper() {
	const context = useDayContext();
	if (!context) return null;

  const { date, onDateChange, month, onMonthChange, dayData, isPending } = context;

  return (
    <>
      <DashboardCalendarPopover
        date={date}
        setDate={onDateChange}
        month={month}
        setMonth={onMonthChange}
      />
      {isPending && <div>Loading...</div>}
      <div>{dayData ? JSON.stringify(dayData) : "no day entry"}</div>
    </>
  );
}
