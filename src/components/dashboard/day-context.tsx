"use client";
import { getDays } from "@/day/day-actions";
import { getDayActivityDTO, getDayDTO } from "@/day/day-dto";
import { getDietDTO } from "@/user-data/user-data-dto";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { useServerAction } from "zsa-react";

type DayContextType = {
  date: Date;
  month: Date;
  days: getDayDTO[];
  dayData: getDayDTO | undefined;
  onDateChange: (date: Date) => void;
  onMonthChange: (date: Date) => Promise<void>;
  diet: getDietDTO;
  isPending: boolean;
  setDayData: Dispatch<
    SetStateAction<
      | {
          id: number;
          index: number;
          month_number: number;
          user_id: number;
          calories_intake: number;
          calories_burnt: number;
          calories_per_day: number;
          water_per_day: number;
          water_intake: number;
        }
      | undefined
    >
  >;
  setDays: Dispatch<
    SetStateAction<
      {
        id: number;
        index: number;
        month_number: number;
        user_id: number;
        calories_intake: number;
        calories_burnt: number;
        calories_per_day: number;
        water_per_day: number;
        water_intake: number;
      }[]
    >
  >;
};

const DayContext = createContext<DayContextType>({} as DayContextType);

export function DayContextProvider({
  diet,
  children,
  daysData,
}: {
  diet: getDietDTO;
  children: React.ReactNode;
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
    <DayContext.Provider
      value={{
        date,
        month,
        days,
        dayData,
        onDateChange,
        onMonthChange,
        diet,
        isPending,
        setDayData,
        setDays,
      }}
    >
      {children}
    </DayContext.Provider>
  );
}

export function useDayContext() {
  return useContext(DayContext);
}

function getDay(date: Date, days: getDayDTO[]) {
  const day = days.find((day) => day.index === date.getDate());
  return day;
}
