import { sql } from "drizzle-orm";
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const userActivityLevelTable = sqliteTable("user_activity_level", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
  description: text().notNull(),
  index: integer().notNull(),
});

export const userDataTable = sqliteTable("user_data", {
  id: integer().primaryKey({ autoIncrement: true }),
  weight: integer().notNull(),
  height: integer().notNull(),
  birth_date: text().notNull(),
  sex: text({ enum: ["male", "female"] }),
  user_activity_level_id: integer()
    .notNull()
    .references(() => userActivityLevelTable.id),
});

export const dietTable = sqliteTable("diet", {
  id: integer().primaryKey({ autoIncrement: true }),
  calories: integer().notNull(),
  water: integer().notNull(),
});

export const userTable = sqliteTable("user", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  image_url: text(),
  created: text()
    .notNull()
    .default(sql`(current_timestamp)`),
  user_data_id: integer().references(() => userDataTable.id),
  diet_id: integer().references(() => dietTable.id),
});

export const dayTable = sqliteTable("day", {
  id: integer().primaryKey({ autoIncrement: true }),
  index: integer().notNull(),
	month_number: integer().notNull(),
	user_id: integer().notNull().references(() => userTable.id),
	calories_intake: integer().notNull(),
	calories_burnt: integer().notNull(),
	calories_per_day: integer().notNull(),
	water_per_day: integer().notNull(),
	water_intake: integer().notNull(),
});

export const metActivityTable = sqliteTable("met_activity", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull().unique(),
	value: integer().notNull(),
});

export const dayActivityTable = sqliteTable("day_activity", {
	id: integer().primaryKey({ autoIncrement: true }),
	day_id: integer().notNull().references(() => dayTable.id),
	met_activity_id: integer().notNull().references(() => metActivityTable.id),
	duration: integer().notNull(),
});
