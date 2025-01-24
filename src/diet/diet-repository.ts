import { db } from "@/db/db";
import { dietTable, userTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dietRepository = {
  getByUserId: async (userId: number) => {
    const [diet] = await db
      .select()
      .from(dietTable)
      .innerJoin(userTable, eq(userTable.diet_id, dietTable.id))
      .where(eq(userTable.id, userId));
		return diet;
  },
};
