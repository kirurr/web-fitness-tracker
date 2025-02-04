"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WaterDroplet } from "./water-droplet";
import { Plus, Minus, LoaderCircle } from "lucide-react";
import { useServerAction } from "zsa-react";
import { createDay, updateDay } from "@/day/day-actions";
import { useForm } from "react-hook-form";
import { useDayContext } from "@/components/dashboard/day-context";
import { Form } from "../form";

export function WaterProgressCounter() {
  const { dayData, diet } = useDayContext();

  return (
    <div className="mx-auto w-full max-w-sm space-y-6">
      <h2 className="text-center text-[#348de9]">Water Intake</h2>
      <div className="flex flex-wrap items-end justify-center gap-2">
        {Array.from({ length: diet.diet.water }).map((_, index) => {
          const fillPercentage = Math.max(
            0,
            Math.min(
              100,
              (dayData ? dayData.water_intake - index : 0 - index) * 100,
            ),
          );
          return <WaterDroplet key={index} fillPercentage={fillPercentage} />;
        })}
      </div>
      <div className="flex items-center justify-between">
        <RemoveWaterForm />
        <span className="text-2xl font-bold text-[#348de9]">
          {dayData ? dayData.water_intake.toFixed(2) : 0} / {diet.diet.water} L
        </span>
        <AddWaterForm />
      </div>
    </div>
  );
}

function AddWaterForm() {
  const updateDayAction = useServerAction(updateDay);
  const createDayAction = useServerAction(createDay);

  const { dayData, diet, setDayData, setDaysData, month, date } =
    useDayContext();

  const form = useForm();

  const onSubmit = async () => {
    let day = dayData;
    if (!day) {
      const [data, err] = await createDayAction.execute({
        diet_id: diet.diet.id,
        month_number: month.getMonth(),
        index: date.getDate(),
        calories_burnt: 0,
        calories_intake: 0,
        calories_per_day: diet.diet.calories,
        water_per_day: diet.diet.water,
        water_intake: 0,
      });
      if (err) throw err;
      day = data;
      setDaysData((days) => [...days, data]);
    }

    const newWaterIntake = day.water_intake + 0.25;

    const [updateDayData, updateDayErr] = await updateDayAction.execute({
      id: day.id,
      water_intake: newWaterIntake,
    });

    if (updateDayErr) throw updateDayErr;

    setDayData(updateDayData);
    setDaysData((days) =>
      days.map((day) => (day.id === updateDayData.id ? updateDayData : day)),
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button
          disabled={updateDayAction.isPending || createDayAction.isPending}
          className="bg-[#348de9] hover:bg-[#348de9]/80"
          size="icon"
          type="submit"
        >
          {updateDayAction.isPending || createDayAction.isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Plus />
          )}
        </Button>
      </form>
    </Form>
  );
}

function RemoveWaterForm() {
  const updateDayAction = useServerAction(updateDay);
  const createDayAction = useServerAction(createDay);

  const { dayData, diet, setDayData, setDaysData, month, date } =
    useDayContext();

  const form = useForm();

  const onSubmit = async () => {
    let day = dayData;
    if (!day) {
      const [data, err] = await createDayAction.execute({
        diet_id: diet.diet.id,
        month_number: month.getMonth(),
        index: date.getDate(),
        calories_burnt: 0,
        calories_intake: 0,
        calories_per_day: diet.diet.calories,
        water_per_day: diet.diet.water,
        water_intake: 0,
      });
      if (err) throw err;
      day = data;
      setDaysData((days) => [...days, data]);
    }

    const newWaterIntake = day.water_intake - 0.25;

    const [updateDayData, updateDayErr] = await updateDayAction.execute({
      id: day.id,
      water_intake: newWaterIntake,
    });

    if (updateDayErr) throw updateDayErr;

    setDayData(updateDayData);
    setDaysData((days) =>
      days.map((day) => (day.id === updateDayData.id ? updateDayData : day)),
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Button
          disabled={updateDayAction.isPending || createDayAction.isPending}
          className="bg-[#348de9] hover:bg-[#348de9]/80"
          size="icon"
          type="submit"
        >
          {updateDayAction.isPending || createDayAction.isPending ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <Minus />
          )}
        </Button>
      </form>
    </Form>
  );
}
