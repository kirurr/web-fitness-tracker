import IntakeCalories from "@/components/dashboard/calories/intake-calories/intake-calories";
import IntakeCaloriesWrapper from "@/components/dashboard/calories/intake-calories/intake-calories-wrapper";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export const metadata = {
  title: "Intake calories",
};

export default async function IntakeCaloriesPage() {
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
            <BreadcrumbPage>Intake calories</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <section className="grid w-full grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:grid-rows-2">
        <IntakeCalories className="lg:row-start-auto row-start-1" showButton={false} />
        <IntakeCaloriesWrapper />  
      </section>
    </>
  );
}
