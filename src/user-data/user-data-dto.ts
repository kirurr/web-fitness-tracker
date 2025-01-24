import { userActivityLevelTable, dietTable, userDataTable } from "@/db/schema";

export type createUserDataDTO = typeof userDataTable.$inferInsert;
export type getUserDataDTO = typeof userDataTable.$inferSelect;
export type updateUserDataDTO = Partial<typeof userDataTable.$inferInsert>;

export type getUserActivitiesLevelsDTO = typeof userActivityLevelTable.$inferSelect[];
export type createUserActivityLevelDTO = typeof userActivityLevelTable.$inferInsert;

export type getDietDTO = typeof dietTable.$inferSelect;
export type createDietDTO = typeof dietTable.$inferInsert;
