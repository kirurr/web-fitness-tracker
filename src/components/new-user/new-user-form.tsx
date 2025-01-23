"use client";

import { createUserData } from "@/user-data/user-data-actions";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";
import { z } from "zod";
import { getActivitiesDTO } from "@/user-data/user-data-dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserDataSchema } from "@/lib/schemas";

export default function NewUserForm({
  activities,
}: {
  activities: getActivitiesDTO;
}) {
  const { execute } = useServerAction(createUserData, {
    onSuccess: () => {
      console.log("success");
    },
    onError: ({ err }) => {
      console.error(err);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof createUserDataSchema>>({
    resolver: zodResolver(createUserDataSchema),
  });
  console.log(errors);

  return (
    <form onSubmit={handleSubmit((values) => execute(values))}>
      <input
        {...register("weight", { required: true, valueAsNumber: true })}
        aria-invalid={errors.weight ? "true" : "false"}
        type="number"
        placeholder="Weight"
      />
      <input
        {...register("height", { required: true, valueAsNumber: true })}
        aria-invalid={errors.height ? "true" : "false"}
        type="number"
        placeholder="Weight"
      />
      <input
        {...register("birth_date", { required: true })}
        aria-invalid={errors.birth_date ? "true" : "false"}
        type="date"
        placeholder="Date"
      />
      <input
        {...register("sex", { required: true })}
        aria-invalid={errors.sex ? "true" : "false"}
        type="radio"
        name="sex"
        value="male"
      />
      <input
        {...register("sex", { required: true })}
        aria-invalid={errors.sex ? "true" : "false"}
        type="radio"
        name="sex"
        value="female"
      />
      <select
        {...register("activity_id", { required: true, valueAsNumber: true })}
        aria-invalid={errors.activity_id ? "true" : "false"}
      >
        {activities.map((activity) => (
          <option key={activity.id} value={activity.id}>
            {activity.name}
          </option>
        ))}
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}
