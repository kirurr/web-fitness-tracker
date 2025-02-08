"use client";

import { getUserDataDTO } from "@/user-data/user-data-dto";
import BurntCaloriesForm from "./burnt-calories-form";
import Activities from "./activities";
import { getDayActivityDTO } from "@/day/day-dto";
import { useEffect, useState } from "react";
import { useDayContext } from "../../day-context";
import { useServerActionQuery } from "@/lib/server-action-hooks";
import { getDayActivities } from "@/day/day-actions";

export default function BurntCaloriesWrapper({
  userData,
}: {
  userData: getUserDataDTO;
}) {
  const [activities, setActivities] = useState<getDayActivityDTO[]>([]);

  const { dayData } = useDayContext();
  const { data, isPending } = useServerActionQuery(getDayActivities, {
    enabled: !!dayData,
    input: {
      id: dayData ? dayData.id : 0,
    },
    queryKey: ["dayActivities", dayData],
    placeholderData: (prev) => prev,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (data) {
      setActivities(data);
    }
  }, [data]);

  return (
    <>
      <BurntCaloriesForm
        userData={userData}
        addActivity={(activity: getDayActivityDTO) =>
          setActivities((activities) => [...activities, activity])
        }
      />
      <div className="w-full self-start">
        <Activities
          isPending={dayData ? isPending : false}
          activities={activities}
          userData={userData}
          removeActivity={(activity: getDayActivityDTO) =>
            setActivities((activities) =>
              activities.filter(
                (item) => item.day_activity.id !== activity.day_activity.id,
              ),
            )
          }
        />
      </div>
    </>
  );
}
