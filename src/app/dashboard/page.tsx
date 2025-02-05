import BurntCalories from "@/components/dashboard/calories/burnt-calories";
import IntakeCalories from "@/components/dashboard/calories/intake-calories";
import Water from "@/components/dashboard/water/water";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { LoaderCircle } from "lucide-react";
import { Suspense } from "react";

export default function Dashboard() {
  return (
    <>
      <Breadcrumb className="mb-4 self-start">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Suspense
        fallback={
          <div className="flex size-full items-center justify-center">
            <LoaderCircle className="h-24 w-24 animate-spin text-border" />
          </div>
        }
      >
        <Wrapper />
      </Suspense>
    </>
  );
}

async function Wrapper() {
  return (
    <section className="grid w-full gap-8 lg:grid-cols-2 lg:grid-rows-2">
      <BurntCalories />
      <IntakeCalories className="my-8 lg:my-0" />
      <Water className="mx-auto lg:col-span-2 lg:w-[calc(50%-2rem)]" />
    </section>
  );
}
