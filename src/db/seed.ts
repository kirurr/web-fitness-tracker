import { db } from "./db";
import { activityTable } from "./schema";

async function main() {
	const activities: typeof activityTable.$inferInsert[] = [
		{
			name: "Minimaly active",
			description: "This level is characterized by a lifestyle with minimal physical activity, typically involving a desk job and little to no exercise.",
			index: 1.2,
		},
		{
			name: "Lightly active",
			description: "Individuals at this level engage in light exercise, such as workouts lasting at least 20 minutes, 1 to 3 times a week.",
			index: 1.375,
		},
		{
			name: "Moderately active",
			description: "This category includes those who participate in moderate exercise, working out for 30 to 60 minutes, 3 to 4 times a week.",
			index: 1.55,
		},
		{
			name: "Very Active",
			description: "People in this group engage in vigorous exercise for 30 to 60 minutes, 5 to 7 times a week, or have physically demanding jobs.",
			index: 1.7,
		},
		{
			name: "Extremely active",
			description: "This level is for individuals who perform several intense workouts each day, 6 to 7 times a week, or have very labor-intensive jobs.",
			index: 1.9,
		},
	]

	await db.insert(activityTable).values(activities);
}
main()
