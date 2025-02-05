import { auth } from "@/auth";
import BurntCalories from "@/components/dashboard/calories/burnt-calories";
import IntakeCalories from "@/components/dashboard/calories/intake-calories";
import Water from "@/components/dashboard/water/water";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/signin");

  return (
    <>
      <Breadcrumb className="self-start mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
          <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="grid w-full gap-8 lg:grid-cols-2 lg:grid-rows-2">
        <BurntCalories />
        <IntakeCalories className="my-8 lg:my-0" />
        <Water className="mx-auto lg:col-span-2 lg:w-[calc(50%-2rem)]" />
      </section>
    </>
  );
}
