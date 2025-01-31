"use client";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { useDayContext } from "../day-context";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { useServerAction } from "zsa-react";
import { createDay, updateDay } from "@/day/day-actions";

export default function WaterForm() {
	const { dayData } = useDayContext();
  return (
    <>
      <AddWaterForm />
			{ dayData && dayData.water_intake > 0 && (
				<RemoveWaterForm />
			)}
    </>
  );
}

function AddWaterForm() {
	const updateDayAction = useServerAction(updateDay);
	const createDayAction = useServerAction(createDay);

	const { dayData, diet, setDayData, setDaysData, month, date } = useDayContext();
	
	const form = useForm();

	const onSubmit = async () => {
		let day = dayData;
		if (!day) {
			const [data, err] = await createDayAction.execute({
				diet_id: diet.id,
				month_number: month.getMonth(),
				index: date.getDate(),
				calories_burnt: 0,
				calories_intake: 0,
				calories_per_day: diet.calories,
				water_per_day: diet.water,
				water_intake: 0
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
				<Button type="submit"><Plus /></Button>
			</form>
		</Form>
  );
}

function RemoveWaterForm() {
	const updateDayAction = useServerAction(updateDay);
	const createDayAction = useServerAction(createDay);

	const { dayData, diet, setDayData, setDaysData, month, date } = useDayContext();
	
	const form = useForm();

	const onSubmit = async () => {
		let day = dayData;
		if (!day) {
			const [data, err] = await createDayAction.execute({
				diet_id: diet.id,
				month_number: month.getMonth(),
				index: date.getDate(),
				calories_burnt: 0,
				calories_intake: 0,
				calories_per_day: diet.calories,
				water_per_day: diet.water,
				water_intake: 0
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
				<Button type="submit"><Minus /></Button>
			</form>
		</Form>
  );
}
