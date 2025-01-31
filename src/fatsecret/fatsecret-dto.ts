import { fatsecretAPITable, mealTable } from "@/db/schema";

export type getFatsecretTokenDTO = typeof fatsecretAPITable.$inferSelect;
export type createFatsecretTokenDTO = typeof fatsecretAPITable.$inferInsert;
export type updateFatsecretTokenDTO = Partial<
  typeof fatsecretAPITable.$inferInsert
>;

export type createMealDTO = typeof mealTable.$inferInsert;
export type getMealDTO = typeof mealTable.$inferSelect;

export type Foods = {
  food: Food[];
  max_results: string;
  page_number: string;
  total_results: string;
};

export type Food = {
  food_description: string;
  food_name: string;
  food_id: string;
};

export type SearchFood = {
	food: {
		food_id: string;
		food_name: string;
		servings: { serving: Serving[] };
	}
};

export type Serving = {
  serving_id: number;
  metric_serving_amount: string;
  number_of_units: string;
  calories: string;
};
