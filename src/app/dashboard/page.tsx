import { auth } from "@/auth";
import BurntCalories from "@/components/dashboard/calories/burnt-calories";
import IntakeCalories from "@/components/dashboard/calories/intake-calories";
import Water from "@/components/dashboard/water/water";
import userDataRepository from "@/user-data/user-data-repository";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/signin");

  const userData = await userDataRepository.getByUserId(session.user.id);
  return (
    <div>
      <h1>Dashboard</h1>
      <BurntCalories userData={userData.user_data} />
      <IntakeCalories />
			<Water />
    </div>
  );
}
