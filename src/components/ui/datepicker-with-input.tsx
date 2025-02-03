"use client";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "./input";

export default function DatepickerWithInput({
  value,
  onChange,
}: {
  value: Date | undefined;
  onChange: (value: Date | undefined) => void;
}) {
  const dateFormat = "dd MM yyyy";

  const [inputValue, setInputValue] = useState(
    value ? format(value, dateFormat) : "",
  );
  const [date, setDate] = useState(value);
  const [month, setMonth] = useState(value ? new Date(value) : new Date());

  function onDateChange(value: Date | undefined) {
    if (!value) return;
    if (value.getMonth() !== month.getMonth()) setMonth(value);
    setInputValue(value ? format(value, dateFormat) : "");
    setDate(value);
    onChange(value);
  }

  function onInputChange(value: string) {
    setInputValue(value);
    const date = parseDateFromString(value);
    if (!date) return;
    onDateChange(date);
  }

  return (
    <div className="flex w-fit items-center gap-2">
      <Input
        name="birth_date"
        value={inputValue}
        placeholder="dd my yyyy"
        onChange={(value) => onInputChange(value.currentTarget.value)}
      />
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={"outline"}
              className={cn(
                "text-center font-normal",
                !inputValue && "text-muted-foreground",
              )}
            >
              <CalendarIcon className="h-4 w-4 opacity-50" />
            </Button>
          </FormControl>
        </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              fromYear={1900}
              toYear={new Date().getFullYear()}
              onSelect={onDateChange}
              onMonthChange={setMonth}
              month={month}
              disabled={(date) =>
                date > new Date() || date < new Date("1900-01-01")
              }
              initialFocus
            />
          </PopoverContent>
      </Popover>
    </div>
  );
}

function parseDateFromString(dateString: string) {
  const regex = /(\d{2})\D(\d{2})\D(\d{4})/;

  const match = dateString.match(regex);

  if (!match) {
    return null;
  }

  const day = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const year = parseInt(match[3], 10);

  const date = new Date(year, month, day);

  if (isNaN(date.getTime())) {
    return null;
  }

  return date;
}
