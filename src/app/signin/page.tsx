import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  if (session) redirect("/dashboard");
  return (
      <section className="flex absolute inset-0 size-full flex-col items-center justify-center">
        <SignIn />
      </section>
  );
}
