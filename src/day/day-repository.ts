import { db } from "@/db/db";
import { dayActivityTable, dayTable, metActivityTable } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { createDayActivityDTO, createDayDTO, updateDayDTO } from "./day-dto";

export const dayRepository = {
  getDaysByMonthAndUserId: async (monthNumber: number, userId: number) => {
    const days = await db
      .select()
      .from(dayTable)
      .where(
        and(
          eq(dayTable.month_number, monthNumber),
          eq(dayTable.user_id, userId),
        ),
      );
    return days;
  },

  create: async (userId: number, data: createDayDTO) => {
    const [day] = await db
      .insert(dayTable)
      .values({ ...data, user_id: userId })
      .returning();
    return day;
  },

  update: async (id: number, data: updateDayDTO) => {
    const [day] = await db
      .update(dayTable)
      .set(data)
      .where(eq(dayTable.id, id))
      .returning();
    return day;
  },

  getMETActivities: async () => {
    const metActivities = await db.select().from(metActivityTable);
    return metActivities;
  },

  addMETActivities: async (activities: createDayActivityDTO[]) => {
    await db.insert(dayActivityTable).values(activities);
  },

  getDayActivities: async (dayId: number) => {
    const activities = await db
      .select()
      .from(dayActivityTable)
      .where(eq(dayActivityTable.day_id, dayId));
    return activities;
  },

  createDayActivity: async (data: createDayActivityDTO) => {
    const [dayActivity] = await db
      .insert(dayActivityTable)
      .values({ ...data })
      .returning();
    return dayActivity;
  },
};
