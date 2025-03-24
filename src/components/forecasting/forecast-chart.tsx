"use client"

import { useState } from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Historical data (actual)
const historicalData = [
  { date: "2023-01-01", revenue: 15200, conversions: 760, spend: 4500, roas: 3.38 },
  { date: "2023-02-01", revenue: 16400, conversions: 820, spend: 4800, roas: 3.42 },
  { date: "2023-03-01", revenue: 17800, conversions: 890, spend: 5100, roas: 3.49 },
  { date: "2023-04-01", revenue: 18600, conversions: 930, spend: 5300, roas: 3.51 },
  { date: "2023-05-01", revenue: 19200, conversions: 960, spend: 5400, roas: 3.56 },
  { date: "2023-06-01", revenue: 20400, conversions: 1020, spend: 5700, roas: 3.58 },
]

// Forecast data (predicted)
const forecastData = [
  {
    date: "2023-07-01",
    revenue: 21500,
    conversions: 1075,
    spend: 5900,
    roas: 3.64,
    revenueLow: 19800,
    revenueHigh: 23200,
  },
  {
    date: "2023-08-01",
    revenue: 22800,
    conversions: 1140,
    spend: 6200,
    roas: 3.68,
    revenueLow: 20900,
    revenueHigh: 24700,
  },
  {
    date: "2023-09-01",
    revenue: 24500,
    conversions: 1225,
    spend: 6450,
    roas: 3.8,
    revenueLow: 22400,
    revenueHigh: 26600,
  },
  {
    date: "2023-10-01",
    revenue: 26200,
    conversions: 1310,
    spend: 6800,
    roas: 3.85,
    revenueLow: 23800,
    revenueHigh: 28600,
  },
]

// Combined data for display
const combinedData = [...historicalData, ...forecastData]

export function ForecastChart() {
  const [metric, setMetric] = useState("revenue")
  const [timeframe, setTimeframe] = useState("all")

  // Filter data based on timeframe
  const filteredData = timeframe === "all" ? combinedData : timeframe === "historical" ? historicalData : forecastData

  // Determine if we should show confidence intervals
  const showConfidenceInterval = timeframe !== "historical" && metric === "revenue"

  // Format the data for display
  const formatYAxis = (value: number) => {
    if (metric === "revenue" || metric === "spend") {
      return `$${value / 1000}k`
    } else if (metric === "roas") {
      return `${value}x`
    } else {
      return value
    }
  }

  const formatTooltip = (value: number, name: string) => {
    if (name === "revenue" || name === "spend" || name === "revenueLow" || name === "revenueHigh") {
      return [`$${value.toLocaleString()}`, name.replace(/([A-Z])/g, " $1").toLowerCase()]
    } else if (name === "roas") {
      return [`${value}x`, "ROAS"]
    } else {
      return [value.toLocaleString(), name]
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-2">
          <Select value={metric} onValueChange={setMetric}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="conversions">Conversions</SelectItem>
              <SelectItem value="spend">Ad Spend</SelectItem>
              <SelectItem value="roas">ROAS</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={timeframe === "historical" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeframe("historical")}
          >
            Historical
          </Button>
          <Button
            variant={timeframe === "forecast" ? "default" : "outline"}
            size="sm"
            onClick={() => setTimeframe("forecast")}
          >
            Forecast
          </Button>
          <Button variant={timeframe === "all" ? "default" : "outline"} size="sm" onClick={() => setTimeframe("all")}>
            All Data
          </Button>
        </div>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          {showConfidenceInterval ? (
            <ComposedChart
              data={filteredData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`
                }}
              />
              <YAxis tickFormatter={formatYAxis} domain={["auto", "auto"]} />
              <Tooltip
                formatter={formatTooltip}
                labelFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("default", { month: "long", year: "numeric" })
                }}
              />
              <Legend />
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="revenueHigh"
                stroke="none"
                fill="url(#colorUv)"
                fillOpacity={0.5}
                name="Upper Bound"
              />
              <Area
                type="monotone"
                dataKey="revenueLow"
                stroke="none"
                fill="url(#colorUv)"
                fillOpacity={0.5}
                name="Lower Bound"
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                strokeWidth={2}
                activeDot={{ r: 8 }}
                name="Revenue"
              />
            </ComposedChart>
          ) : (
            <LineChart
              data={filteredData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`
                }}
              />
              <YAxis tickFormatter={formatYAxis} domain={["auto", "auto"]} />
              <Tooltip
                formatter={formatTooltip}
                labelFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("default", { month: "long", year: "numeric" })
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey={metric}
                stroke="#8884d8"
                strokeWidth={2}
                activeDot={{ r: 8 }}
                name={metric.charAt(0).toUpperCase() + metric.slice(1)}
              />
            </LineChart>
          )}
        </ResponsiveContainer>
      </div>

      <div className="rounded-lg border p-3 bg-muted/50">
        <p className="text-sm text-muted-foreground">
          <span className="font-medium">Note:</span> Shaded areas represent 80% confidence intervals. Forecasts are
          based on historical data, seasonality, and market trends.
        </p>
      </div>
    </div>
  )
}

