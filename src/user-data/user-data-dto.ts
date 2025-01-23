import { activityTable, userDataTable } from "@/db/schema";

export type createUserDataDTO = typeof userDataTable.$inferInsert;
export type getUserDataDTO = typeof userDataTable.$inferSelect;
export type updateUserDataDTO = Partial<typeof userDataTable.$inferInsert>;

export type getActivitiesDTO = typeof activityTable.$inferSelect[];
