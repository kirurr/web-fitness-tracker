import { auth } from "@/auth";
import Calories from "@/components/dashboard/calories/calories";
import userDataRepository from "@/user-data/user-data-repository";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/signin");

  const userData = await userDataRepository.getByUserId(session.user.id);
  return (
    <div>
      <h1>Dashboard</h1>
      <Calories userData={userData.user_data} />
    </div>
  );
}
