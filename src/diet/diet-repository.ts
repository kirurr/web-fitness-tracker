import { db } from "@/db/db";
import { dietTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dietRepository = {
  getByUserId: async (userId: number) => {
    const diets = await db
      .select()
      .from(dietTable)
      .where(eq(dietTable.user_id, userId));
    return diets;
  },

  getById: async (id: number) => {
    const [diet] = await db
      .select()
      .from(dietTable)
      .where(eq(dietTable.id, id));
    return diet;
  },
};
