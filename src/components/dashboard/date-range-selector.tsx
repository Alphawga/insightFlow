"use client"

import { CalendarIcon } from "@radix-ui/react-icons"
import { format, subDays } from "date-fns"
import { useContext, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { DateRangeContext } from "./date-range-context"

export interface DateRangeSelectorProps {
  onDateRangeChange?: (startDate: Date, endDate: Date) => void;
}

export function DateRangeSelector({ onDateRangeChange }: DateRangeSelectorProps) {
  const { dateRange, setDateRange } = useContext(DateRangeContext)
  const [date, setDate] = useState<Date>()

  // Preset date ranges
  const selectLast7Days = () => {
    const end = new Date()
    const start = subDays(end, 7)
    setDateRange({ from: start, to: end })
    if (onDateRangeChange) {
      onDateRangeChange(start, end)
    }
  }

  const selectLast30Days = () => {
    const end = new Date()
    const start = subDays(end, 30)
    setDateRange({ from: start, to: end })
    if (onDateRangeChange) {
      onDateRangeChange(start, end)
    }
  }

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    
    if (selectedDate) {
      if (!dateRange.from) {
        setDateRange({ from: selectedDate, to: undefined })
      } else if (!dateRange.to && selectedDate >= dateRange.from) {
        setDateRange({ from: dateRange.from, to: selectedDate });
        if (onDateRangeChange) {
          onDateRangeChange(dateRange.from, selectedDate)
        }
      } else {
        setDateRange({ from: selectedDate, to: undefined })
      }
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            size="sm"
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !dateRange && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="px-4 pt-3 flex justify-between">
            <Button variant="outline" size="sm" onClick={selectLast7Days}>
              Last 7 days
            </Button>
            <Button variant="outline" size="sm" onClick={selectLast30Days}>
              Last 30 days
            </Button>
          </div>
          <Calendar
            mode="range"
            defaultMonth={dateRange.from}
            selected={{
              from: dateRange.from || undefined,
              to: dateRange.to || undefined,
            }}
            onSelect={(range) => {
              setDateRange({ 
                from: range?.from || dateRange.from, 
                to: range?.to || dateRange.to 
              });
              if (range?.from && range?.to && onDateRangeChange) {
                onDateRangeChange(range.from, range.to);
              }
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
} 