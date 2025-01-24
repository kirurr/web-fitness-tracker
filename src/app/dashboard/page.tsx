import { auth } from "@/auth";
import DashboardWrapper from "@/components/dashboard/dashboard-wrapper";
import { dayRepository } from "@/day/day-repository";
import { dietRepository } from "@/diet/diet-repository";
import { LoaderCircle } from "lucide-react";
import { Session } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/signin");
  return (
    <Suspense fallback={<LoaderCircle size={50} className="animate-spin" />}>
      <Wrapper session={session} />
    </Suspense>
  );
}

async function Wrapper({ session }: { session: Session }) {
  const [daysData, diet] = await Promise.all([
    dayRepository.getDaysByMonthAndUserId(
      new Date().getMonth(),
      session.user.id,
    ),
    dietRepository.getByUserId(session.user.id),
  ]);
  return <DashboardWrapper diet={diet.diet} daysData={daysData} />;
}
