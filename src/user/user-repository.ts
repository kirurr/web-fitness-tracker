import { db } from "@/db/db";
import { userTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { createUserDTO, updateUserDTO } from "./user-dto";

const userRepository = {
  create: async (data: createUserDTO) => {
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

	update: async (id: number, data: updateUserDTO) => {
		const [user] = await db.update(userTable).set(data).where(eq(userTable.id, id)).returning();
		return user;
	},
};

export default userRepository;
