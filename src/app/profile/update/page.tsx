import { auth } from "@/auth";
import UserDataForm from "@/components/new-user/user-data-form";
import { dietRepository } from "@/diet/diet-repository";
import userDataRepository from "@/user-data/user-data-repository";
import { LoaderCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata = {
  title: "Update your data",
};

export default async function page() {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  return (
    <section className="flex flex-col items-center justify-center mx-auto max-w-screen-md">
      <Suspense fallback={<LoaderCircle size={50} className="animate-spin" />}>
        <Wrapper userId={session.user.id} />
      </Suspense>
    </section>
  );
}

async function Wrapper({ userId }: { userId: number }) {
  const [activities, goals, diets, userData] = await Promise.all([
    userDataRepository.getActivities(),
    dietRepository.getGoals(),
    dietRepository.getByUserId(userId),
    userDataRepository.getByUserId(userId),
  ]);
  const diet = diets.find((diet) => diet.diet.expired === null)!;
  return (
    <UserDataForm
      activities={activities}
      isNewUser={false}
      goals={goals}
      dietId={diet.diet.id}
      prevData={userData.user_data}
    />
  );
}
