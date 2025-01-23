import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { createServerActionProcedure } from "zsa";

export const authenticatedProcedure = createServerActionProcedure().handler(
	async () => { 
		const session = await auth();

		if (!session) redirect("/signin");

		return { session };
	}
)
