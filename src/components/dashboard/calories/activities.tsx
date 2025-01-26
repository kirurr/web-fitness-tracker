import { getDayActivities } from "@/day/day-actions";
import { getDayActivityDTO } from "@/day/day-dto";
import { useState } from "react";
import { useDayContext } from "../day-context";
import { useServerActionQuery } from "@/lib/server-action-hooks";

export default function Activities() {
  const { dayData } = useDayContext();
  const [dayActivities, setDayActivities] = useState<getDayActivityDTO[]>();
  const { isLoading, data } = useServerActionQuery(getDayActivities, {
		enabled: !!dayData,
    input: {
			id: dayData ? dayData.id : 0,
		},
		queryKey: ["dayActivities", dayData ? dayData.id : 0],
  });

  return (
    <div>
			{ isLoading ? "Loading..." : JSON.stringify(data) }
    </div>
  );
}
