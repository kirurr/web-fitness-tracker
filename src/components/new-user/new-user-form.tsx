"use client";

import { createUserData } from "@/user-data/user-data-actions";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";
import { getActivitiesDTO } from "@/user-data/user-data-dto";
import {
  Form,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { useState } from "react";
import FirstForm from "./first-form";
import SecondForm from "./second-form";
import { Progress } from "../ui/progress";

export default function NewUserForm({
  activities,
}: {
  activities: getActivitiesDTO;
}) {
  const [state, setState] = useState(0);
  const [firstData, setFirstData] = useState<{
    weight: string;
    height: string;
    activity_id: string;
  }>();
  const [secondData, setSecondData] = useState<{
    birth_date: Date;
    sex: "male" | "female";
  }>();

  const { execute } = useServerAction(createUserData, {
    onSuccess: () => {
      console.log("success");
    },
    onError: ({ err }) => {
      console.error(err);
    },
  });
  const form = useForm();

  async function onSubmit() {
    if (!firstData || !secondData) throw Error();
    await execute({
      height: +firstData.height,
      weight: +firstData.weight,
      birth_date: secondData.birth_date.toISOString(),
      sex: secondData.sex,
      activity_id: +firstData.activity_id,
    });
  }

  return (
    <>
			<Progress value={state * 50} className="w-[60%]"/>
      {state === 0 && (
        <FirstForm
					data={firstData}
          setData={setFirstData}
          setState={setState}
          activities={activities}
        />
      )}
      {state === 1 && (
        <SecondForm data={secondData} setData={setSecondData} setState={setState} />
      )}
      {state === 2 && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
						<Button>Submit</Button>
					</form>
					<Button variant={"outline"} onClick={() => setState(state => state - 1)}>Back</Button>
        </Form>
      )}
    </>
  );
}
