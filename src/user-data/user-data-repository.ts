import { db } from "@/db/db";
import {
  userActivityLevelTable,
  dietTable,
  userDataTable,
  userTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { createUserDataDTO, updateUserDataDTO } from "./user-data-dto";
import { calculateCalories, calculateWater } from "@/lib/utils";

const userDataRepository = {
  create: async (user_id: number, data: createUserDataDTO, goalId: number) => {
    const userData = await db.transaction(async (trx) => {
      const [userData] = await trx
        .insert(userDataTable)
        .values(data)
        .returning();

      const activities = await trx.select().from(userActivityLevelTable);
      const calories = calculateCalories(userData, activities);
      const water = calculateWater(userData, activities);

      const date = new Date().toDateString();
      await trx
        .insert(dietTable)
        .values({
					goal_id: goalId,
					calories,
					water,
					created: date,
					user_id: user_id
				})
        .returning();

      await trx
        .update(userTable)
        .set({ user_data_id: userData.id })
        .where(eq(userTable.id, user_id));
      return userData;
    });
    return userData;
  },
  update: async (user_id: number, data: updateUserDataDTO, diet_id: number, goal_id: number) => {
    const userData = await db.transaction(async (trx) => {
      const [updatedUserData] = await trx
        .update(userDataTable)
        .set(data)
        .where(eq(userDataTable.id, data.id!)).returning();

      const activities = await trx.select().from(userActivityLevelTable);
      const calories = calculateCalories(updatedUserData, activities);
      const water = calculateWater(updatedUserData, activities);

      const date = new Date().toDateString();
      await trx.update(dietTable).set({expired: date}).where(eq(dietTable.id, diet_id));

      await trx
        .insert(dietTable)
        .values({
					goal_id: goal_id,
					calories,
					water,
					created: date,
					user_id: user_id
				})
        .returning();
    });
    return userData;
  },

  getByUserId: async (userId: number) => {
    const [userData] = await db
      .select()
      .from(userDataTable)
      .innerJoin(userTable, eq(userTable.user_data_id, userDataTable.id))
      .where(eq(userTable.id, userId));
    return userData;
  },

  getActivities: async () => {
    const activities = await db.select().from(userActivityLevelTable);
    return activities;
  },
};

export default userDataRepository;
