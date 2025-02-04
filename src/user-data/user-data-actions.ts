"use server";
import { authenticatedProcedure } from "@/lib/procedures";
import userDataRepository from "@/user-data/user-data-repository";
import { createUserDataSchema } from "@/lib/schemas";
import { redirect } from "next/navigation";
import { z } from "zod";

export const createUserData = authenticatedProcedure
  .createServerAction()
  .input(z.object({ userData: createUserDataSchema, goalId: z.number() }))
  .handler(async ({ input, ctx }) => {
    await userDataRepository.create(ctx.session.user.id, input.userData, input.goalId);

    redirect("/dashboard");
  });

export const updateUserData = authenticatedProcedure
  .createServerAction()
  .input(z.object({ userData: createUserDataSchema, dietId: z.number(), goalId: z.number() }))
  .handler(async ({ input, ctx }) => {
    await userDataRepository.update(
      ctx.session.user.id, input.userData, input.dietId, input.goalId
    );

    redirect("/profile");
  });