import { userTable } from "@/db/schema";

export type createUserDTO = typeof userTable.$inferInsert;
export type getUserDTO = typeof userTable.$inferSelect;
export type updateUserDTO = Partial<typeof userTable.$inferInsert>;

