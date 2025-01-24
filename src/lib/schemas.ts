import { dayTable, userDataTable } from "@/db/schema";
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

export const createDaySchema = createInsertSchema(dayTable);
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
