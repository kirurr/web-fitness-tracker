import { auth } from "@/auth";
import Activities from "@/components/dashboard/calories/activities";
import BurntCalories from "@/components/dashboard/calories/burnt-calories";
import BurntCaloriesForm from "@/components/dashboard/calories/burnt-calories-form";
import userDataRepository from "@/user-data/user-data-repository";
import { redirect } from "next/navigation";

export default async function BurntCaloriesPage() {
  const session = await auth();

  if (!session) redirect("/signin");
  const userData = await userDataRepository.getByUserId(session.user.id);

  return (
    <>
      <section>
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4">
						<BurntCaloriesForm userData={userData.user_data} />
					</div>
					<BurntCalories />
				</div>
      </section>
      <section className="mt-16">
        <Activities userData={userData.user_data} />
      </section>
    </>
  );
}
