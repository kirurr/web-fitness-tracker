import { getMetActivityDTO } from "@/day/day-dto";
import {
  getUserActivitiesLevelsDTO,
  getUserDataDTO,
} from "@/user-data/user-data-dto";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateAge(birthDate: string) {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  const age = today.getFullYear() - birthDateObj.getFullYear();
  const m = today.getMonth() - birthDateObj.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDateObj.getDate())) {
    return age - 1;
  }
  return age;
}

export function calculateCalories(
  data: getUserDataDTO,
  activities: getUserActivitiesLevelsDTO,
) {
  const age = calculateAge(data.birth_date);
  const activity = activities.find(
    (activity) => activity.id === data.user_activity_level_id,
  )!;
  return data.sex === "male"
    ? Math.round(
        (10 * data.weight + 6.25 * data.height - 5 * age + 5) * activity.index,
      )
    : Math.round(
        (10 * data.weight + 6.25 * data.height - 5 * age - 161) *
          activity.index,
      );
}

export function calculateWater(
  data: getUserDataDTO,
  activities: getUserActivitiesLevelsDTO,
) {
  const activity = activities.find(
    (activity) => activity.id === data.user_activity_level_id,
  )!;
  return data.sex === "male"
    ? Math.round(data.weight * 0.04 + activity.index * 0.6)
    : Math.round(data.weight * 0.03 + activity.index * 0.4);
}

export function calculateMETCalories(
  weight: number,
  activity: getMetActivityDTO,
  duration: number,
) {
  return Math.round(
    ((activity.value * 3.5 * weight) / 200) * (duration * 60),
  );
}
