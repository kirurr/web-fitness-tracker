"use client";

import { createUserData } from "@/user-data/user-data-actions";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { useState } from "react";
import FirstForm from "./first-form";
import SecondForm from "./second-form";
import { Progress } from "../ui/progress";
import {
  getGoalDTO,
  getUserActivitiesLevelsDTO,
} from "@/user-data/user-data-dto";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function NewUserForm({
  activities,
  goals,
}: {
  activities: getUserActivitiesLevelsDTO;
  goals: getGoalDTO[];
}) {
  const [state, setState] = useState(0);
  const [firstData, setFirstData] = useState<{
    weight: string;
    height: string;
    user_activity_level_id: string;
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
  const schema = z.object({
    goalId: z.string(),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
		defaultValues:{
			goalId: ""
		}
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    if (!firstData || !secondData) throw Error();
    await execute({
      userData: {
        height: +firstData.height,
        weight: +firstData.weight,
        birth_date: secondData.birth_date.toISOString(),
        sex: secondData.sex,
        user_activity_level_id: +firstData.user_activity_level_id,
      },
      goalId: +data.goalId,
    });
  }

  return (
    <>
      <Progress value={state * 50} className="w-[60%]" />
      {state === 0 && (
        <FirstForm
          data={firstData}
          setData={setFirstData}
          setState={setState}
          activities={activities}
        />
      )}
      {state === 1 && (
        <SecondForm
          data={secondData}
          setData={setSecondData}
          setState={setState}
        />
      )}
      {state === 2 && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="goalId"
              rules={{ required: true }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select your goal</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Want do you want to acheive?" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {goals.map((item) => (
                        <SelectItem key={item.id} value={item.id.toString()}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button>Submit</Button>
          </form>
          <Button
            variant={"outline"}
            onClick={() => setState((state) => state - 1)}
          >
            Back
          </Button>
        </Form>
      )}
    </>
  );
}
