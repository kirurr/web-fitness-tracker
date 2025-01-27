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
  data: {
    weight: string;
    height: string;
    user_activity_level_id: string;
  } | undefined;
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
      ? activities.find((item) => item.id.toString() === data.user_activity_level_id)!
      : activities[0],
  );

  const schema = z.object({
    weight: z.string().min(1, "Weight is required"),
    height: z.string().min(1, "Height is required"),
    user_activity_level_id: z.string(),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      weight: data ? data.weight : "",
      height: data ? data.height : "",
      user_activity_level_id: data ? data.user_activity_level_id.toString() : activity.id.toString(),
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    setData(data);
    setState((state) => state + 1);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex w-full justify-between gap-4">
          <FormField
            control={form.control}
            name="weight"
            rules={{ required: true }}
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
            rules={{ required: true }}
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
          rules={{ required: true }}
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
                    <SelectValue placeholder="Select a verified email to display" />
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
        <Button type="submit">Next</Button>
      </form>
    </Form>
  );
}
