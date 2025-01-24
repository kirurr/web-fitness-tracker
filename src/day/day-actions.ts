"use server";

import { authenticatedProcedure } from "@/lib/procedures";
import { dayRepository } from "./day-repository";
import { z } from "zod";
import { createDaySchema, updateDaySchema } from "@/lib/schemas";

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
    return await dayRepository.create(ctx.session.user.id, input);
  });
