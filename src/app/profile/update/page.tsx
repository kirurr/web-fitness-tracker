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

  return (
    <main className="flex h-screen flex-col items-center justify-center lg:mx-auto lg:max-w-screen-md">
      <Suspense fallback={<LoaderCircle size={50} className="animate-spin" />}>
        <Wrapper userId={session.user.id} />
      </Suspense>
    </main>
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
