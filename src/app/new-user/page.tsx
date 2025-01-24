import { auth } from "@/auth";
import NewUserForm from "@/components/new-user/new-user-form";
import userDataRepository from "@/user-data/user-data-repository";
import { LoaderCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function () {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  const data = await userDataRepository.getByUserId(session.user.id);
  if (data) redirect("/dashboard");


  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <Suspense fallback={<LoaderCircle size={50} className="animate-spin" />}>
        <Wrapper />
      </Suspense>
    </div>
  );
}

async function Wrapper() {
	await new Promise((resolve) => {
		setTimeout(() => {
			resolve("foo");
		}, 300)
	})
  const activities = await userDataRepository.getActivities();
  return <NewUserForm activities={activities} />;
}
