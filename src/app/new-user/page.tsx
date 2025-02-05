import { auth } from "@/auth";
import UserDataForm from "@/components/new-user/user-data-form";
import { dietRepository } from "@/diet/diet-repository";
import userDataRepository from "@/user-data/user-data-repository";
import { LoaderCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function page() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  const data = await userDataRepository.getByUserId(session.user.id);
  if (data) redirect("/dashboard");

  return (
    <section className="flex flex-col items-center justify-center mx-auto max-w-screen-md">
      <Suspense fallback={<LoaderCircle size={50} className="animate-spin" />}>
        <Wrapper />
      </Suspense>
    </section>
  );
}

async function Wrapper() {
  const [activities, goals] = await Promise.all([
    userDataRepository.getActivities(),
    dietRepository.getGoals(),
  ]);
  return <UserDataForm activities={activities} goals={goals} />;
}
