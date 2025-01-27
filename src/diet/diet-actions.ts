"use server"
import { authenticatedProcedure } from "@/lib/procedures";
import { z } from "zod";
import { dietRepository } from "./diet-repository";

export const getDietByIdAction = authenticatedProcedure
  .createServerAction()
  .input(z.number())
  .handler(async ({ input }) => {
    return await dietRepository.getById(input);
  });
