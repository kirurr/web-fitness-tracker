import { auth } from "@/auth";
import Activities from "@/components/dashboard/calories/activities";
import BurntCalories from "@/components/dashboard/calories/burnt-calories";
import BurntCaloriesForm from "@/components/dashboard/calories/burnt-calories-form";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import userDataRepository from "@/user-data/user-data-repository";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function BurntCaloriesPage() {
  const session = await auth();

  if (!session) redirect("/signin");
  const userData = await userDataRepository.getByUserId(session.user.id);

  return (
    <>
      <Breadcrumb className="mb-4 self-start">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Burnt calories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:grid-rows-2">
        <BurntCaloriesForm userData={userData.user_data} />
        <BurntCalories showButton={false} className="row-start-1 lg:row-auto" />
        <div className="w-full self-start">
          <Activities userData={userData.user_data} />
        </div>
      </section>
    </>
  );
}
