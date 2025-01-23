import { userDataTable } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const createUserDataSchema = createInsertSchema(userDataTable);
export const createUserDataFormSchema = z.object({
	weight: z.string(),
	height: z.string(),
	birth_date: z.date(),
	sex: z.enum(["male", "female"]),
	activity_id: z.string()
});
