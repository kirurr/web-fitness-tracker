import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  if (session) redirect("/dashboard");
  return (
      <section className="flex flex-col h-full items-center justify-center">
        <SignIn />
      </section>
  );
}
