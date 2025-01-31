import {
  userActivityLevelTable,
  dietTable,
  userDataTable,
  goalTable,
} from "@/db/schema";

export type createUserDataDTO = typeof userDataTable.$inferInsert;
export type getUserDataDTO = typeof userDataTable.$inferSelect;
export type updateUserDataDTO = Partial<typeof userDataTable.$inferInsert>;

export type getUserActivitiesLevelsDTO =
  (typeof userActivityLevelTable.$inferSelect)[];
export type createUserActivityLevelDTO =
  typeof userActivityLevelTable.$inferInsert;

export type getDietDTO = {
  diet: typeof dietTable.$inferSelect;
  goal: getGoalDTO | null;
};
export type createDietDTO = typeof dietTable.$inferInsert;

export type getGoalDTO = typeof goalTable.$inferSelect;
export type createGoalDTO = typeof goalTable.$inferInsert;
