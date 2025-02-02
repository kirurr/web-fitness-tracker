import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  if (session) redirect("/dashboard");
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
        <SignIn />
      </div>
    </>
  );
}
