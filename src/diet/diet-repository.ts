import { db } from "@/db/db";
import { dietTable, goalTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dietRepository = {
  getByUserId: async (userId: number) => {
    const diets = await db
      .select()
      .from(dietTable)
			.leftJoin(goalTable, eq(dietTable.goal_id, goalTable.id))
      .where(eq(dietTable.user_id, userId));
    return diets;
  },

  getById: async (id: number) => {
    const [diet] = await db
      .select()
      .from(dietTable)
			.leftJoin(goalTable, eq(dietTable.goal_id, goalTable.id))
      .where(eq(dietTable.id, id));
    return diet;
  },

	getGoals: async () => {
		const goals = await db
			.select()
			.from(goalTable)
		return goals;
	},
};
