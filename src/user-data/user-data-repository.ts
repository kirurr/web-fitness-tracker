import { db } from "@/db/db";
import {
  userActivityLevelTable,
  dietTable,
  userDataTable,
  userTable,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { createUserDataDTO } from "./user-data-dto";
import { calculateCalories, calculateWater } from "@/lib/utils";

const userDataRepository = {
  create: async (user_id: number, data: createUserDataDTO) => {
    const userData = await db.transaction(async (trx) => {
      const [userData] = await trx
        .insert(userDataTable)
        .values(data)
        .returning();

      const activities = await trx.select().from(userActivityLevelTable);
      const calories = calculateCalories(userData, activities);
      const water = calculateWater(userData, activities);

      const [diet] = await trx
        .insert(dietTable)
        .values({ calories, water })
        .returning();

      await trx
        .update(userTable)
        .set({ user_data_id: userData.id, diet_id: diet.id })
        .where(eq(userTable.id, user_id));
      return userData;
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
