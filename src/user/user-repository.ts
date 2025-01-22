import { db } from "@/db/db";
import { userTable, userDataTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const userRepository = {
  create: async (data: typeof userTable.$inferInsert) => {
    const [user] = await db.insert(userTable).values(data).returning();
    return user;
  },

  getByEmail: async (email: string) => {
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));
		return user;
  },

  getById: async (id: number) => {
    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.id, id));
    return user;
  },

  createData: async (data: typeof userDataTable.$inferInsert) => {
    const [userData] = await db.insert(userDataTable).values(data).returning();
    return userData;
  },

  getDataByUserId: async (userId: number) => {
    const [userData] = await db
      .select()
      .from(userDataTable)
      .innerJoin(userTable, eq(userTable.user_data_id, userDataTable.id))
      .where(eq(userTable.id, userId));
    return userData;
  },
};

export default userRepository;
