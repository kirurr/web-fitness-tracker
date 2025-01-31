"use server";

import { authenticatedProcedure } from "@/lib/procedures";
import { z } from "zod";
import fatsecretRepository from "./fatsecret-repository";

export const findMeal = authenticatedProcedure
  .createServerAction()
  .input(z.string())
  .handler(async ({ input }) => {
    const token = await fatsecretRepository.getTokenFromAPI();

    return await fatsecretRepository.findMeal(token, input);
  });

export const getMealById = authenticatedProcedure
  .createServerAction()
  .input(z.string())
  .handler(async ({ input }) => {
    const token = await fatsecretRepository.getTokenFromAPI();

    return await fatsecretRepository.getMealById(token, input);
  });
