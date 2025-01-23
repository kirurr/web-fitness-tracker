import { db } from "@/db/db";
import { activityTable, userDataTable, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createUserDataDTO } from "./user-data-dto";

const userDataRepository = {
  create: async (data: createUserDataDTO) => {
    const [userData] = await db.insert(userDataTable).values(data).returning();
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
		const activities = await db.select().from(activityTable);
		return activities;
	}
};

export default userDataRepository;
