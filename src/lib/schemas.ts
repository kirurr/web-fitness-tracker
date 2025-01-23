import { userDataTable } from "@/db/schema";
import { createInsertSchema } from "drizzle-zod";

export const createUserDataSchema = createInsertSchema(userDataTable);
