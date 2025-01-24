"use client";

import { useState } from "react";
import DashboardCalendarPopover from "./dashboard-calendar";
import { getDietDTO } from "@/user-data/user-data-dto";
import { getDays } from "@/day/day-actions";
import { useServerAction } from "zsa-react";
import { getDayDTO } from "@/day/day-dto";
import Calories from "./calories/calories";

export default function DashboardWrapper({
  diet,
  daysData,
}: {
  diet: getDietDTO;
  daysData: getDayDTO[];
}) {
  const [date, setDate] = useState<Date>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  const [days, setDays] = useState<getDayDTO[]>(daysData);
  const [dayData, setDayData] = useState<getDayDTO | undefined>(
    getDay(date, daysData),
  );

  const { execute, isPending } = useServerAction(getDays);

  function onDateChange(date: Date) {
    if (date.getMonth() !== month.getMonth()) onMonthChange(date);
    setDayData(getDay(date, days));
    setDate(date);
  }

  async function onMonthChange(date: Date) {
    setMonth(date);
    setDate(new Date(date.getFullYear(), date.getMonth(), 1));
    const [data, err] = await execute(date.getMonth());
    if (err) throw err;
    setDays(data);
  }

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
			<Calories
				caloriesForDay={dayData ? dayData.calories_per_day : diet.calories} 
				caloriesBurnt={dayData ? dayData.calories_burnt : 0}
				caloriesIntake={dayData ? dayData.calories_intake : 0}
			/>
    </>
  );
}

function getDay(date: Date, days: getDayDTO[]) {
  const day = days.find((day) => day.index === date.getDate());
  return day;
}
