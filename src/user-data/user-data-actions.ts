"use server"
import { authenticatedProcedure } from "@/lib/procedures";
import userDataRepository from "@/user-data/user-data-repository";
import { createUserDataSchema } from "@/lib/schemas";
import { redirect } from "next/navigation";

export const createUserData = authenticatedProcedure
  .createServerAction()
  .input(createUserDataSchema)
  .handler(async ({ input, ctx }) => {
		await userDataRepository.create(ctx.session.user.id, input);

		redirect("/dashboard");
  });
