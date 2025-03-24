"use client"

import { useState } from "react"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"

const dailyData = [
  { name: "Mon", requests: 12500, errors: 125 },
  { name: "Tue", requests: 14200, errors: 142 },
  { name: "Wed", requests: 15800, errors: 158 },
  { name: "Thu", requests: 16500, errors: 165 },
  { name: "Fri", requests: 17200, errors: 172 },
  { name: "Sat", requests: 10800, errors: 108 },
  { name: "Sun", requests: 9500, errors: 95 },
]

const weeklyData = [
  { name: "Week 1", requests: 85000, errors: 850 },
  { name: "Week 2", requests: 92000, errors: 920 },
  { name: "Week 3", requests: 98000, errors: 980 },
  { name: "Week 4", requests: 105000, errors: 1050 },
]

const monthlyData = [
  { name: "Jan", requests: 320000, errors: 3200 },
  { name: "Feb", requests: 350000, errors: 3500 },
  { name: "Mar", requests: 380000, errors: 3800 },
  { name: "Apr", requests: 410000, errors: 4100 },
  { name: "May", requests: 440000, errors: 4400 },
  { name: "Jun", requests: 470000, errors: 4700 },
]

export function ApiUsageChart() {
  const [timeframe, setTimeframe] = useState("daily")

  // Select data based on timeframe
  const data = timeframe === "daily" ? dailyData : timeframe === "weekly" ? weeklyData : monthlyData

  return (
    <div className="space-y-4">
      <div className="flex justify-end space-x-2">
        <Button variant={timeframe === "daily" ? "default" : "outline"} size="sm" onClick={() => setTimeframe("daily")}>
          Daily
        </Button>
        <Button
          variant={timeframe === "weekly" ? "default" : "outline"}
          size="sm"
          onClick={() => setTimeframe("weekly")}
        >
          Weekly
        </Button>
        <Button
          variant={timeframe === "monthly" ? "default" : "outline"}
          size="sm"
          onClick={() => setTimeframe("monthly")}
        >
          Monthly
        </Button>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => value.toLocaleString()} />
          <Legend />
          <Area type="monotone" dataKey="requests" name="API Requests" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="errors" name="Errors" stroke="#ff7300" fill="#ff7300" />
        </AreaChart>
      </ResponsiveContainer>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <div className="text-sm font-medium text-muted-foreground">Total Requests</div>
          <div className="mt-1 text-2xl font-bold">
            {timeframe === "daily" ? "96,500" : timeframe === "weekly" ? "380,000" : "2,370,000"}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {timeframe === "daily" ? "Last 7 days" : timeframe === "weekly" ? "Last 4 weeks" : "Last 6 months"}
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="text-sm font-medium text-muted-foreground">Average Response Time</div>
          <div className="mt-1 text-2xl font-bold">
            {timeframe === "daily" ? "245ms" : timeframe === "weekly" ? "258ms" : "262ms"}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {timeframe === "daily"
              ? "-15ms from previous period"
              : timeframe === "weekly"
                ? "-8ms from previous period"
                : "+5ms from previous period"}
          </div>
        </div>

        <div className="rounded-lg border p-4">
          <div className="text-sm font-medium text-muted-foreground">Error Rate</div>
          <div className="mt-1 text-2xl font-bold">
            {timeframe === "daily" ? "1.0%" : timeframe === "weekly" ? "1.0%" : "1.0%"}
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            {timeframe === "daily"
              ? "No change from previous period"
              : timeframe === "weekly"
                ? "No change from previous period"
                : "No change from previous period"}
          </div>
        </div>
      </div>
    </div>
  )
}

