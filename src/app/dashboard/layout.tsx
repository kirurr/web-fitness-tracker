import { auth } from "@/auth";
import DashboardCalendarWrapper from "@/components/dashboard/dashboard-calendar-wrapper";
import { DayContextProvider } from "@/components/dashboard/day-context";
import { dayRepository } from "@/day/day-repository";
import { dietRepository } from "@/diet/diet-repository";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/signin");

  const [diet, daysData] = await Promise.all([
    dietRepository.getByUserId(session.user.id),
    dayRepository.getDaysByMonthAndUserId(
      new Date().getMonth(),
      session.user.id,
    ),
  ]);

  return (
    <DayContextProvider diet={diet.diet} daysData={daysData}>
      <DashboardCalendarWrapper />
      {children}
    </DayContextProvider>
  );
}
