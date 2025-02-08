import IntakeCalories from "@/components/dashboard/calories/intake-calories";
import Meals from "@/components/dashboard/calories/meals";
import SelectMealForm from "@/components/dashboard/calories/select-meal-form";
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
        <SelectMealForm />
        <IntakeCalories className="lg:row-start-auto row-start-1" showButton={false} />
        <div className="w-full self-start">
          <Meals />
        </div>
      </section>
    </>
  );
}
