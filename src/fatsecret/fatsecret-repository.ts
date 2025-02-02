import { db } from "@/db/db";
import { fatsecretAPITable } from "@/db/schema";
import { eq } from "drizzle-orm";
import {
  createFatsecretTokenDTO,
  Foods,
  SearchFood,
  updateFatsecretTokenDTO,
} from "./fatsecret-dto";
import { auth } from "@/auth";

const fatsecretRepository = {
  getFatsecretToken: async (id: number) => {
    const [token] = await db
      .select()
      .from(fatsecretAPITable)
      .where(eq(fatsecretAPITable.user_id, id));
    return token;
  },

  createFatsecretToken: async (data: createFatsecretTokenDTO) => {
    const [token] = await db.insert(fatsecretAPITable).values(data).returning();
    return token;
  },

  updateFatsecretTokenByUser: async (
    user_id: number,
    data: updateFatsecretTokenDTO,
  ) => {
    const [token] = await db
      .update(fatsecretAPITable)
      .set(data)
      .where(eq(fatsecretAPITable.user_id, user_id))
      .returning();
    return token;
  },

  getTokenFromAPI: async () => {
    const session = await auth();
    if (!session) throw new Error("Unauthorized");

    const token = await fatsecretRepository.getFatsecretToken(session.user.id);

    if (!token) {
      const token = await getToken();
      const expiresAt = new Date(Date.now() + token.expires_in);

      await fatsecretRepository.createFatsecretToken({
        user_id: session.user.id,
        expires_at: expiresAt.toISOString(),
        token: token.access_token,
      });

      return token.access_token;
    }

    if (new Date(token.expires_at).getTime() <= Date.now()) {
      const token = await getToken();
      const expiresAt = new Date(Date.now() + token.expires_in);

      await fatsecretRepository.updateFatsecretTokenByUser(session.user.id, {
        expires_at: expiresAt.toISOString(),
        token: token.access_token,
      });

      return token.access_token;
    }

    return token.token;
  },

  findMeal: async (token: string, search: string) => {
    const params = new URLSearchParams({
      method: "foods.search",
      search_expression: search,
      format: "json",
    });

    const response = await fetch(
      "https://platform.fatsecret.com/rest/foods/search/v1?" +
        params.toString(),
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch meals");
    }
    const result = await response.json();

    if (result.error) {
      throw new Error(JSON.stringify(result.error));
    }

    const meals: { foods: Foods } = result;
    return meals.foods;
  },

  getMealById: async (token: string, id: string) => {
    const params = new URLSearchParams({
      method: "food.get.v4",
      format: "json",
      food_id: id,
    });

    const response = await fetch(
      "https://platform.fatsecret.com/rest/food/v4?" + params.toString(),
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to fetch meal");
    }
    const result = await response.json();

    if (result.error) {
      throw new Error(JSON.stringify(result.error));
    }

    const meal = result as SearchFood;
    return meal.food;
  },
};

export default fatsecretRepository;

async function getToken() {
  const url = "https://oauth.fatsecret.com/connect/token";
  const username = process.env.FATSECRET_CLIENT_ID!;
  const password = process.env.FATSECRET_CLIENT_SECRET!;

  const headers = new Headers();
  headers.append("Authorization", "Basic " + btoa(`${username}:${password}`));
  headers.append("Content-Type", "application/x-www-form-urlencoded");

  const body = new URLSearchParams();
  body.append("grant_type", "client_credentials");
  body.append("scope", "basic");

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body,
    });
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return (await response.json()) as FatsecretToken;
    //@ts-ignore
    //eslint-disable-next-line
  } catch (error: any) {
    throw new Error("There was a problem with the fetch operation:", error);
  }
}

type FatsecretToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
};
