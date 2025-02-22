import { db } from "@/db/db";
import {
  dayActivityTable,
  dayTable,
  mealTable,
  metActivityTable,
} from "@/db/schema";
import { eq, and } from "drizzle-orm";
import {
  createDayActivityDTO,
  createDayDTO,
  createMealDTO,
  updateDayDTO,
} from "./day-dto";

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

  create: async (data: createDayDTO) => {
    const [day] = await db.insert(dayTable).values(data).returning();
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
      .leftJoin(
        metActivityTable,
        eq(dayActivityTable.met_activity_id, metActivityTable.id),
      )
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

  deleteDayActivity: async (id: number) => {
    await db.delete(dayActivityTable).where(eq(dayActivityTable.id, id));
  },

  getMealsByDayId: async (dayId: number) => {
    const meals = await db
      .select()
      .from(mealTable)
      .where(eq(mealTable.day_id, dayId));
    return meals;
  },

  createMeal: async (data: createMealDTO) => {
    const [meal] = await db.insert(mealTable).values(data).returning();
    return meal;
  },

  deleteMeal: async (id: number) => {
    await db.delete(mealTable).where(eq(mealTable.id, id));
  },
};
