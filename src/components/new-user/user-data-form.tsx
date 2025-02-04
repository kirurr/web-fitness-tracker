"use client";

import { createUserData, updateUserData } from "@/user-data/user-data-actions";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";
import {
  Form,
  FormControl,
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
  getUserDataDTO,
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
import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function UserDataForm({
  isNewUser = true,
  activities,
  goals,
  prevData,
  dietId,
}: {
  isNewUser?: boolean;
  activities: getUserActivitiesLevelsDTO;
  goals: getGoalDTO[];
  prevData?: getUserDataDTO;
  dietId?: number;
}) {
  const [state, setState] = useState(0);
  const [firstData, setFirstData] = useState<
    | {
        weight: string;
        height: string;
        user_activity_level_id: string;
      }
    | undefined
  >(
    prevData
      ? {
          weight: prevData.weight.toString(),
          height: prevData.height.toString(),
          user_activity_level_id: prevData.user_activity_level_id.toString(),
        }
      : undefined,
  );
  const [secondData, setSecondData] = useState<
    | {
        birth_date: Date;
        sex: "male" | "female";
      }
    | undefined
  >(
    prevData
      ? {
          birth_date: new Date(prevData?.birth_date),
          sex: prevData?.sex,
        }
      : undefined,
  );

  const createUserDataAction = useServerAction(createUserData);
  const updateUserDataAction = useServerAction(updateUserData);

  const schema = z.object({
    goalId: z.string(),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      goalId: "",
    },
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    if (!firstData || !secondData) throw Error();
    if (isNewUser) {
      await createUserDataAction.execute({
        userData: {
          height: +firstData.height,
          weight: +firstData.weight,
          birth_date: secondData.birth_date.toISOString(),
          sex: secondData.sex,
          user_activity_level_id: +firstData.user_activity_level_id,
        },
        goalId: +data.goalId,
      });
    } else {
      await updateUserDataAction.execute({
        userData: {
          id: prevData!.id,
          height: +firstData.height,
          weight: +firstData.weight,
          birth_date: secondData.birth_date.toISOString(),
          sex: secondData.sex,
          user_activity_level_id: +firstData.user_activity_level_id,
        },
        goalId: +data.goalId,
        dietId: dietId!,
      });
    }
  }

  return (
    <section className="h-full w-full px-8 py-16">
      <Progress value={state * 50} className="w-full" />
      <div className="mt-16">
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
          <>
            <h1 className="gradient-text mx-auto mb-8 block w-fit text-center">
              Almost done
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="goalId"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select your goal</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="What is your goal?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {goals.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="mx-auto w-fit">
                  <Button
                    variant={"outline"}
                    onClick={() => setState((state) => state - 1)}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    disabled={createUserDataAction.isPending}
                    className="ml-6"
                  >
                    <LoaderCircle
                      className={cn(
                        "animate-spin",
                        !createUserDataAction.isPending && "hidden",
                      )}
                    />
                    Submit
                  </Button>
                </div>
              </form>
            </Form>
          </>
        )}
      </div>
    </section>
  );
}
