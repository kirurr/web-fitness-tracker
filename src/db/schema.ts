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

export const userTable = sqliteTable("user", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  email: text().notNull().unique(),
  image_url: text(),
  created: text()
    .notNull()
    .default(sql`(current_timestamp)`),
  user_data_id: integer().references(() => userDataTable.id),
});

export const dietTable = sqliteTable("diet", {
  id: integer().primaryKey({ autoIncrement: true }),
  user_id: integer()
    .notNull()
    .references(() => userTable.id),
  calories: integer().notNull(),
  water: integer().notNull(),
  created: text().notNull(),
  expired: text(),
});

export const dayTable = sqliteTable("day", {
  id: integer().primaryKey({ autoIncrement: true }),
  index: integer().notNull(),
  month_number: integer().notNull(),
  diet_id: integer()
    .notNull()
    .references(() => dietTable.id),
  user_id: integer()
    .notNull()
    .references(() => userTable.id),
  calories_intake: integer().notNull(),
  calories_burnt: integer().notNull(),
  water_intake: integer().notNull(),
});

export const metActivityTable = sqliteTable("met_activity", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text().notNull().unique(),
  value: integer().notNull(),
});

export const dayActivityTable = sqliteTable("day_activity", {
  id: integer().primaryKey({ autoIncrement: true }),
  day_id: integer()
    .notNull()
    .references(() => dayTable.id),
  met_activity_id: integer()
    .notNull()
    .references(() => metActivityTable.id),
  duration: integer().notNull(),
});
