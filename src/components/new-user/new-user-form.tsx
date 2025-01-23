"use client";

import { createUserData } from "@/user-data/user-data-actions";
import { useForm } from "react-hook-form";
import { useServerAction } from "zsa-react";
import { z } from "zod";
import { getActivitiesDTO } from "@/user-data/user-data-dto";
import { zodResolver } from "@hookform/resolvers/zod";
import { createUserDataFormSchema } from "@/lib/schemas";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

export default function NewUserForm({
  activities,
}: {
  activities: getActivitiesDTO;
}) {
  const [activity, setActivity] = useState(activities[0]);
  const { execute } = useServerAction(createUserData, {
    onSuccess: () => {
      console.log("success");
    },
    onError: ({ err }) => {
      console.error(err);
    },
  });
  const form = useForm<z.infer<typeof createUserDataFormSchema>>({
    resolver: zodResolver(createUserDataFormSchema),
    defaultValues: {
      weight: "",
      height: "",
      activity_id: activity.id.toString(),
      sex: "male",
    },
  });

  async function onSubmit(values: z.infer<typeof createUserDataFormSchema>) {
    await execute({
      height: +values.height,
      weight: +values.weight,
      birth_date: values.birth_date.toISOString(),
      sex: values.sex,
      activity_id: +values.activity_id,
    });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex w-full justify-between gap-4 space-y-2">
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
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="birth_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block">Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={new Date(field.value)}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>Select your date of birth</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="activity_id"
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
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Your sex</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                    className="flex flex-col space-y-1"
                  >
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">Male</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Female</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
}
