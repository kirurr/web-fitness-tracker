"use server";

import { authenticatedProcedure } from "@/lib/procedures";
import { dayRepository } from "./day-repository";
import { z } from "zod";
import {
  createDayActivitySchema,
  createDaySchema,
  createMealSchema,
  updateDaySchema,
} from "@/lib/schemas";

export const getDays = authenticatedProcedure
  .createServerAction()
  .input(z.number())
  .handler(async ({ input, ctx }) => {
    return await dayRepository.getDaysByMonthAndUserId(
      input,
      ctx.session.user.id,
    );
  });

export const updateDay = authenticatedProcedure
  .createServerAction()
  .input(updateDaySchema)
  .handler(async ({ input }) => {
    return await dayRepository.update(input.id!, input);
  });

export const createDay = authenticatedProcedure
  .createServerAction()
  .input(createDaySchema)
  .handler(async ({ input, ctx }) => {
    return await dayRepository.create({
      ...input,
      user_id: ctx.session.user.id,
    });
  });

export const getMETActivities = authenticatedProcedure
  .createServerAction()
  .handler(async () => {
    return await dayRepository.getMETActivities();
  });

export const createDayActivity = authenticatedProcedure
  .createServerAction()
  .input(createDayActivitySchema)
  .handler(async ({ input }) => {
    return await dayRepository.createDayActivity(input);
  });

export const getDayActivities = authenticatedProcedure
  .createServerAction()
  .input(z.object({ id: z.number() }))
  .handler(async ({ input }) => {
    return await dayRepository.getDayActivities(input.id);
  });

export const deleteDayActivity = authenticatedProcedure
  .createServerAction()
  .input(z.number())
  .handler(async ({ input }) => {
    return await dayRepository.deleteDayActivity(input);
  });

export const getMealsByDayId = authenticatedProcedure
  .createServerAction()
  .input(z.number())
  .handler(async ({ input }) => {
    return await dayRepository.getMealsByDayId(input);
  });

export const createMeal = authenticatedProcedure
  .createServerAction()
  .input(createMealSchema)
  .handler(async ({ input }) => {
    return await dayRepository.createMeal(input);
  });

export const deleteMeal = authenticatedProcedure
  .createServerAction()
  .input(z.number())
  .handler(async ({ input }) => {
    return await dayRepository.deleteMeal(input);
  });
