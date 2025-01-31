"use client";
import { useDayContext } from "../day-context";
import WaterForm from "./water-form";

export default function Water() {
	const { dayData, diet } = useDayContext();
  return <div>
		<h1>Water</h1>
		{ dayData ? (
			<p>Today's water intake: {dayData.water_intake} ml</p>
		) : (

			<p>Today's water intake: 0 l</p>
		) }
		<p>Today's water: {diet.water} l</p>
		<WaterForm />
	</div>;
}
