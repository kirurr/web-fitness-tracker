import { dayActivityTable, dayTable, metActivityTable } from "@/db/schema";

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
  dayActivity: typeof dayActivityTable.$inferSelect;
  metActivity: typeof metActivityTable.$inferSelect;
};
export type updateDayActivityDTO = Partial<
  typeof dayActivityTable.$inferInsert
>;
