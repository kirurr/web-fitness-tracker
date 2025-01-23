"use server"
import { authenticatedProcedure } from "@/lib/procedures";
import userDataRepository from "@/user-data/user-data-repository";
import { createUserDataSchema } from "@/lib/schemas";
import userRepository from "@/user/user-repository";
import { redirect } from "next/navigation";

export const createUserData = authenticatedProcedure
  .createServerAction()
  .input(createUserDataSchema)
  .handler(async ({ input, ctx }) => {
    const userData = await userDataRepository.create(input);

		await userRepository.update(ctx.session.user.id, { user_data_id: userData.id });

		redirect("/dashboard");
  });
