import { auth } from "@/auth";
import NewUserForm from "@/components/new-user/new-user-form";
import userDataRepository from "@/user-data/user-data-repository";
import { redirect } from "next/navigation";

export default async function () {
  const session = await auth();
  if (!session) {
    redirect("/signin");
  }

  const data = await userDataRepository.getByUserId(session.user.id);
  if (data) redirect("/dashboard");

	const activities = await userDataRepository.getActivities();

  return (
    <>
			<NewUserForm activities={activities} />
    </>
  );
}
