import { auth } from "@/auth";
import Activities from "@/components/dashboard/calories/activities";
import BurntCalories from "@/components/dashboard/calories/burnt-calories";
import BurntCaloriesForm from "@/components/dashboard/calories/burnt-calories-form";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import userDataRepository from "@/user-data/user-data-repository";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function BurntCaloriesPage() {
  const session = await auth();

  if (!session) redirect("/signin");
  const userData = await userDataRepository.getByUserId(session.user.id);

  return (
    <>
      <Breadcrumb className="self-start mb-4">
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
    <section className="w-full grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 items-center gap-8">
      <BurntCaloriesForm userData={userData.user_data} />
      <BurntCalories showButton={false} className="row-start-1 lg:row-auto" />
      <div className="w-full">
        <Activities userData={userData.user_data} />
      </div>
    </section>
    </>
  );
}
