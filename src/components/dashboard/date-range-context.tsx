"use client"

import React, { createContext, useState, ReactNode, useContext } from 'react'
import { subDays } from 'date-fns'

interface DateRange {
  from: Date | undefined
  to: Date | undefined
}

interface DateRangeContextType {
  dateRange: DateRange
  setDateRange: (range: DateRange) => void
}

export const DateRangeContext = createContext<DateRangeContextType>({
  dateRange: { from: undefined, to: undefined },
  setDateRange: () => {},
})

export function DateRangeProvider({ children }: { children: ReactNode }) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: subDays(new Date(), 30),
    to: new Date(),
  })

  return (
    <DateRangeContext.Provider value={{ dateRange, setDateRange }}>
      {children}
    </DateRangeContext.Provider>
  )
}

export function useDateRange() {
  const context = useContext(DateRangeContext);
  if (context === undefined) {
    throw new Error('useDateRange must be used within a DateRangeProvider');
  }
  return context;
} 