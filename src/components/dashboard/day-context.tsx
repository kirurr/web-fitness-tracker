"use client";
import { getDays } from "@/day/day-actions";
import { getDayDTO } from "@/day/day-dto";
import { getDietByIdAction } from "@/diet/diet-actions";
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
  daysData: getDayDTO[];
  dayData: getDayDTO | undefined;
  onDateChange: (date: Date) => void;
  onMonthChange: (date: Date) => Promise<void>;
  diet: getDietDTO;
  isPending: boolean;
  setDayData: Dispatch<SetStateAction<getDayDTO | undefined>>;
  setDaysData: Dispatch<SetStateAction<getDayDTO[]>>;
};

const DayContext = createContext<DayContextType>({} as DayContextType);

export function DayContextProvider({
  userDiets,
  children,
  days,
}: {
  userDiets: getDietDTO[];
  children: React.ReactNode;
  days: getDayDTO[];
}) {
  const [date, setDate] = useState<Date>(new Date());
  const [month, setMonth] = useState<Date>(new Date());
  const [daysData, setDaysData] = useState<getDayDTO[]>(days);
  const [diet, setDiet] = useState<getDietDTO>(
    userDiets.find((diet) => diet.diet.expired === null)!,
  );
  const [dayData, setDayData] = useState<getDayDTO | undefined>(
    getDay(date, daysData),
  );

  const { execute, isPending } = useServerAction(getDays);
  const getNewDietAction = useServerAction(getDietByIdAction);

	async function handleDateChange(date: Date, newDaysData?: getDayDTO[]) {
		if (newDaysData) {
			setDayData(getDay(date, newDaysData));
		} else {
			setDayData(getDay(date, daysData));
		}
    setDate(date);

    if (date.getTime() < new Date(diet.diet.created).getTime()) {
      const newDiet = userDiets.find((item) => {
        if (!item.diet.expired) return false;
        const dietCreatedTimestamp = new Date(item.diet.created).getTime();
        const dietExpiredTimestamp = new Date(item.diet.expired).getTime();
        const currentDietCreatedTimestamp = new Date(diet?.diet.created).getTime();
        return (
          currentDietCreatedTimestamp <= dietExpiredTimestamp &&
          currentDietCreatedTimestamp > dietCreatedTimestamp
        );
      });
      if (newDiet) setDiet(newDiet);
    } else {
      setDiet(userDiets.find((diet) => diet.diet.expired === null)!);
    }

    if (dayData === undefined) return;

    if (dayData?.diet_id !== diet.diet.id) {
      const [newDiet, err] = await getNewDietAction.execute(dayData!.diet_id);
      if (err) throw err;
      setDiet(newDiet);
    }
	}

  async function onDateChange(date: Date) {
    if (date.getMonth() !== month.getMonth()) return await onMonthChange(date);
		await handleDateChange(date);
  }

  async function onMonthChange(date: Date) {
    setMonth(date);
    const [data, err] = await execute(date.getMonth());
    if (err) throw err;
    setDaysData(data);
    await handleDateChange(new Date(date.getFullYear(), date.getMonth(), date.getDate()), data);
  }

  return (
    <DayContext.Provider
      value={{
        date,
        month,
        daysData,
        dayData,
        onDateChange,
        onMonthChange,
        diet,
        isPending,
        setDayData,
        setDaysData,
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
