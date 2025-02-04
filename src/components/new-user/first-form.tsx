import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dispatch, SetStateAction, useState } from "react";
import { getUserActivitiesLevelsDTO } from "@/user-data/user-data-dto";
import { Button } from "../ui/button";

export default function FirstForm({
  activities,
  data,
  setData,
  setState,
}: {
  activities: getUserActivitiesLevelsDTO;
  data:
    | {
        weight: string;
        height: string;
        user_activity_level_id: string;
      }
    | undefined;
  setData: Dispatch<
    SetStateAction<
      | {
          weight: string;
          height: string;
          user_activity_level_id: string;
        }
      | undefined
    >
  >;
  setState: Dispatch<SetStateAction<number>>;
}) {
  const [activity, setActivity] = useState(
    data
      ? activities.find(
          (item) => item.id.toString() === data.user_activity_level_id,
        )!
      : activities[0],
  );

  const schema = z.object({
    weight: z
      .string()
      .min(1, "Weight is required")
      .refine((value) => !isNaN(parseInt(value)), {
        message: "Weight must be a number",
      })
      .refine(
        (value) => {
          const parsedValue = parseInt(value, 10);
          if (isNaN(parsedValue)) return false;
          return parsedValue >= 30 && parsedValue <= 300;
        },
        { message: "Weight must be between 30 and 300 kg" },
      ),
    height: z
      .string()
      .min(1, "Height is required")
      .refine((value) => !isNaN(parseInt(value)), {
        message: "Height must be a number",
      })
      .refine(
        (value) => {
          const parsedValue = parseInt(value, 10);
          if (isNaN(parsedValue)) return false;
          return parsedValue >= 50 && parsedValue <= 250;
        },
        { message: "Height must be between 50 and 250 kg" },
      ),
    user_activity_level_id: z.string(),
  });

  const form = useForm<z.infer<typeof schema>>({
    mode: "onBlur",
    resolver: zodResolver(schema),
    defaultValues: {
      weight: data ? data.weight : "",
      height: data ? data.height : "",
      user_activity_level_id: data
        ? data.user_activity_level_id.toString()
        : activity.id.toString(),
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    setData(data);
    setState((state) => state + 1);
  }
  return (
    <>
			<h1 className="text-center mb-8 gradient-text block w-fit mx-auto">Tell us about yourself</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col lg:flex-row w-full justify-between gap-4">
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Weight</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your weight" />
                  </FormControl>
                  <FormDescription>Enter your weight in kg</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Height</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your height" />
                  </FormControl>
                  <FormDescription>Enter your height in cm</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="user_activity_level_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Activity</FormLabel>
                <Select
                  onValueChange={(value) => {
                    setActivity(
                      activities.find((item) => item.id.toString() === value)!,
                    );
                    field.onChange(value);
                  }}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleact activity" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {activities.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>{activity.description}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
					<div className="mx-auto w-fit">
						<Button type="submit">Next</Button>
					</div>
        </form>
      </Form>
    </>
  );
}
