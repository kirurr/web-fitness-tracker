import { sql } from "drizzle-orm";
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const activityTable = sqliteTable("activity", {
	id: integer().primaryKey({autoIncrement: true}),
	name: text().notNull(),
	description: text().notNull(),
	index: integer().notNull()
})

export const userDataTable = sqliteTable("user_data", {
	id: integer().primaryKey({autoIncrement: true}),
	weight: integer().notNull(),
	height: integer().notNull(),
	birth_date: text().notNull(),
	sex: text({enum: ["male", "female"]}),
	activity_id: integer().notNull().references(() => activityTable.id)
})

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
	created: text().notNull().default(sql`(current_timestamp)`),
	user_data_id: integer().references(() => userDataTable.id),
	diet_id: integer().references(() => dietTable.id)
});

