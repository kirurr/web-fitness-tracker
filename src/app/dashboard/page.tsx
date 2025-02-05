import { auth } from "@/auth";
import BurntCalories from "@/components/dashboard/calories/burnt-calories";
import IntakeCalories from "@/components/dashboard/calories/intake-calories";
import Water from "@/components/dashboard/water/water";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/signin");

  return (
    <section className="grid lg:grid-cols-2 lg:grid-rows-2 gap-8">
      <BurntCalories />
      <IntakeCalories className="my-8 lg:my-0" />
			<Water className="lg:col-span-2 lg:w-[calc(50%-2rem)] mx-auto" />
    </section>
  );
}
