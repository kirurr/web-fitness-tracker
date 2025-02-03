"use client";

import { createUserData } from "@/user-data/user-data-actions";
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

  const { execute, isPending } = useServerAction(createUserData, {
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
    defaultValues: {
      goalId: "",
    },
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
            <h1 className="mb-8 text-center gradient-text">Almost done</h1>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                <Button type="submit" disabled={isPending} className="mr-8">
									<LoaderCircle  className={cn(
										"animate-spin",
										!isPending && "hidden"
									)} />
                  Submit
                </Button>
                <Button
                  variant={"outline"}
                  onClick={() => setState((state) => state - 1)}
                >
                  Back
                </Button>
              </form>
            </Form>
          </>
        )}
      </div>
    </section>
  );
}
