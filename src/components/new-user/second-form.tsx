import { zodResolver } from "@hookform/resolvers/zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dispatch, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../ui/form";
import DatepickerWithInput from "../ui/datepicker-with-input";

export default function SecondForm({
  data,
  setData,
  setState,
}: {
  data: { birth_date: Date; sex: "male" | "female" } | undefined;
  setData: Dispatch<
    SetStateAction<
      | {
          birth_date: Date;
          sex: "male" | "female";
        }
      | undefined
    >
  >;
  setState: Dispatch<SetStateAction<number>>;
}) {
  const schema = z.object({
    birth_date: z.date({ message: "Date of birth is required" }),
    sex: z.enum(["male", "female"]),
  });

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      birth_date: data ? data.birth_date : undefined,
      sex: data ? data.sex : "male",
    },
  });

  function onSubmit(data: z.infer<typeof schema>) {
    setData(data);
    setState((state) => state + 1);
  }
  return (
    <>
      <h1 className="mb-8 text-center gradient-text block w-fit mx-auto">We need to know you a bit more</h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col w-fit mx-auto">
          <FormField
            control={form.control}
            name="birth_date"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block">Date of birth</FormLabel>
                <DatepickerWithInput
                  value={field.value}
                  onChange={field.onChange}
                />
                <FormDescription>Select your date of birth</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sex"
            rules={{ required: true }}
            render={({ field }) => (
              <FormItem className="w-fit space-y-3">
                <FormLabel>Your sex</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                    className="flex items-center"
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
          <div className="self-center">
            <Button
              variant={"outline"}
              onClick={() => setState((state) => state - 1)}
              className="mr-6"
            >
              Back
            </Button>
            <Button type="submit">Next</Button>
          </div>
        </form>
      </Form>
    </>
  );
}
