import {
  dayActivityTable,
  dayTable,
  mealTable,
  userDataTable,
} from "@/db/schema";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

export const createUserDataSchema = createInsertSchema(userDataTable);
export const createUserDataFormSchema = z.object({
  weight: z.string(),
  height: z.string(),
  birth_date: z.date(),
  sex: z.enum(["male", "female"]),
  activity_id: z.string(),
});

export const createDaySchema = z.object({
  index: z.number(),
  month_number: z.number(),
  calories_burnt: z.number().int(),
  calories_intake: z.number().int(),
  calories_per_day: z.number().int(),
  water_per_day: z.number(),
  diet_id: z.number(),
  water_intake: z.number().int(),
});

export const createDayFormSchema = z.object({
  index: z.string(),
  month_number: z.string(),
  calories_burnt: z.string(),
  calories_intake: z.string(),
  calories_per_day: z.string(),
  water_per_day: z.string(),
  water_intake: z.string(),
});

export const updateDaySchema = createUpdateSchema(dayTable);
export const updateDayFormSchema = z.object({
  id: z.string(),
  index: z.string().optional(),
  month_number: z.string().optional(),
  calories_burnt: z.string().optional(),
  calories_intake: z.string().optional(),
  calories_per_day: z.string().optional(),
  water_per_day: z.string().optional(),
  water_intake: z.string().optional(),
});

export const createDayActivitySchema = createInsertSchema(dayActivityTable);
export const createDayActivityFormSchema = z.object({
  met_activity_id: z.string(),
  duration: z.string(),
});

export const createMealSchema = createInsertSchema(mealTable);
export const createMealFormSchema = z.object({
  food: z.object({
    food_name: z.string(),
    food_description: z.string(),
    food_id: z.string(),
  }),
  weight: z.string(),
});
