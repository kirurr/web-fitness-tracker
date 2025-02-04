import { auth } from "@/auth";
import BurntCalories from "@/components/dashboard/calories/burnt-calories";
import IntakeCalories from "@/components/dashboard/calories/intake-calories";
import Water from "@/components/dashboard/water/water";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/signin");

  return (
    <section className="grid grid-cols-2 grid-rows-2 gap-8">
      <BurntCalories />
      <IntakeCalories />
			<Water className="col-span-2" />
    </section>
  );
}
