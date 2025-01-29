import { dayActivityTable, dayTable, mealTable, metActivityTable } from "@/db/schema";

export type getDayDTO = typeof dayTable.$inferSelect;
export type createDayDTO = typeof dayTable.$inferInsert;
export type updateDayDTO = Partial<typeof dayTable.$inferInsert>;

export type createMetActivityDTO = typeof metActivityTable.$inferInsert;
export type getMetActivityDTO = typeof metActivityTable.$inferSelect;
export type updateMetActivityDTO = Partial<
  typeof metActivityTable.$inferInsert
>;

export type createDayActivityDTO = typeof dayActivityTable.$inferInsert;
export type getDayActivityDTO = {
  day_activity: typeof dayActivityTable.$inferSelect;
  met_activity: typeof metActivityTable.$inferSelect | null;
};
export type updateDayActivityDTO = Partial<
  typeof dayActivityTable.$inferInsert
>;

