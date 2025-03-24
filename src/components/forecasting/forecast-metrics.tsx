"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

export function ForecastMetrics() {
  const [timeframe, setTimeframe] = useState("30")

  // Filter metrics based on selected timeframe
  const metrics = forecastMetrics.filter((metric) => metric.timeframe === timeframe)

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select timeframe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30">Next 30 Days</SelectItem>
            <SelectItem value="60">Next 60 Days</SelectItem>
            <SelectItem value="90">Next 90 Days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Metric</TableHead>
              <TableHead>Current</TableHead>
              <TableHead>Forecast</TableHead>
              <TableHead>Change</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Insight</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {metrics.map((metric) => (
              <TableRow key={metric.id}>
                <TableCell className="font-medium">{metric.name}</TableCell>
                <TableCell>{metric.current}</TableCell>
                <TableCell>{metric.forecast}</TableCell>
                <TableCell>
                  <div
                    className={`flex items-center ${
                      metric.changeDirection === "positive"
                        ? "text-green-600"
                        : metric.changeDirection === "negative"
                          ? "text-red-600"
                          : "text-amber-600"
                    }`}
                  >
                    {metric.changeDirection === "positive" && "↑ "}
                    {metric.changeDirection === "negative" && "↓ "}
                    {metric.changeDirection === "neutral" && "→ "}
                    {metric.change}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      metric.confidence === "High"
                        ? "default"
                        : metric.confidence === "Medium"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {metric.confidence}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md">{metric.insight}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="rounded-lg border p-4 bg-muted/50">
        <h3 className="font-medium mb-2">About Confidence Levels</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <Badge variant="default">High</Badge>
            <div>Strong historical data with clear patterns and low volatility.</div>
          </li>
          <li className="flex items-start gap-2">
            <Badge variant="secondary">Medium</Badge>
            <div>Sufficient historical data but with some variability or seasonal factors.</div>
          </li>
          <li className="flex items-start gap-2">
            <Badge variant="outline">Low</Badge>
            <div>Limited historical data or high volatility in past performance.</div>
          </li>
        </ul>
      </div>
    </div>
  )
}

const forecastMetrics = [
  // 30-day forecasts
  {
    id: "1-30",
    timeframe: "30",
    name: "Revenue",
    current: "$20,400",
    forecast: "$24,500",
    change: "+20.1%",
    changeDirection: "positive",
    confidence: "High",
    insight: "Strong growth trend continues, driven by improved conversion rates and increased average order value.",
  },
  {
    id: "2-30",
    timeframe: "30",
    name: "ROAS",
    current: "3.58x",
    forecast: "3.80x",
    change: "+0.22x",
    changeDirection: "positive",
    confidence: "Medium",
    insight: "Efficiency improvements from recent campaign optimizations are expected to continue.",
  },
  {
    id: "3-30",
    timeframe: "30",
    name: "Conversions",
    current: "1,020",
    forecast: "1,225",
    change: "+20.1%",
    changeDirection: "positive",
    confidence: "High",
    insight: "Conversion rate optimization efforts are showing strong results across all campaigns.",
  },
  {
    id: "4-30",
    timeframe: "30",
    name: "CPC",
    current: "$1.25",
    forecast: "$1.32",
    change: "+5.6%",
    changeDirection: "negative",
    confidence: "Medium",
    insight: "Slight increase in competition is expected to drive up costs, but still within efficient range.",
  },
  {
    id: "5-30",
    timeframe: "30",
    name: "CTR",
    current: "2.8%",
    forecast: "3.1%",
    change: "+0.3%",
    changeDirection: "positive",
    confidence: "Medium",
    insight: "Recent ad creative improvements are expected to continue driving higher engagement.",
  },
  {
    id: "6-30",
    timeframe: "30",
    name: "Impression Share",
    current: "68%",
    forecast: "72%",
    change: "+4%",
    changeDirection: "positive",
    confidence: "Low",
    insight: "Increased budget and improved quality scores should help capture more available impressions.",
  },

  // 60-day forecasts
  {
    id: "1-60",
    timeframe: "60",
    name: "Revenue",
    current: "$20,400",
    forecast: "$26,200",
    change: "+28.4%",
    changeDirection: "positive",
    confidence: "Medium",
    insight: "Growth expected to accelerate in months 2-3 due to seasonal factors and campaign expansions.",
  },
  {
    id: "2-60",
    timeframe: "60",
    name: "ROAS",
    current: "3.58x",
    forecast: "3.85x",
    change: "+0.27x",
    changeDirection: "positive",
    confidence: "Medium",
    insight: "Continued optimization and seasonal improvements should drive higher efficiency.",
  },
  {
    id: "3-60",
    timeframe: "60",
    name: "Conversions",
    current: "1,020",
    forecast: "1,310",
    change: "+28.4%",
    changeDirection: "positive",
    confidence: "Medium",
    insight: "New audience targeting strategies expected to improve conversion volume.",
  },
  {
    id: "4-60",
    timeframe: "60",
    name: "CPC",
    current: "$1.25",
    forecast: "$1.38",
    change: "+10.4%",
    changeDirection: "negative",
    confidence: "Low",
    insight: "Increasing competition in key markets may drive up costs more significantly in the 30-60 day period.",
  },
  {
    id: "5-60",
    timeframe: "60",
    name: "CTR",
    current: "2.8%",
    forecast: "3.2%",
    change: "+0.4%",
    changeDirection: "positive",
    confidence: "Low",
    insight: "Planned ad creative refreshes should help maintain engagement despite increased competition.",
  },
  {
    id: "6-60",
    timeframe: "60",
    name: "Impression Share",
    current: "68%",
    forecast: "74%",
    change: "+6%",
    changeDirection: "positive",
    confidence: "Low",
    insight: "Expanded keyword coverage and increased bids should improve visibility.",
  },

  // 90-day forecasts
  {
    id: "1-90",
    timeframe: "90",
    name: "Revenue",
    current: "$20,400",
    forecast: "$28,600",
    change: "+40.2%",
    changeDirection: "positive",
    confidence: "Low",
    insight: "Long-term growth projection includes holiday season impact and planned campaign expansions.",
  },
  {
    id: "2-90",
    timeframe: "90",
    name: "ROAS",
    current: "3.58x",
    forecast: "3.90x",
    change: "+0.32x",
    changeDirection: "positive",
    confidence: "Low",
    insight: "Efficiency expected to peak during holiday season due to higher conversion rates.",
  },
  {
    id: "3-90",
    timeframe: "90",
    name: "Conversions",
    current: "1,020",
    forecast: "1,430",
    change: "+40.2%",
    changeDirection: "positive",
    confidence: "Low",
    insight: "Seasonal factors and expanded campaign reach should drive significant conversion growth.",
  },
  {
    id: "4-90",
    timeframe: "90",
    name: "CPC",
    current: "$1.25",
    forecast: "$1.45",
    change: "+16.0%",
    changeDirection: "negative",
    confidence: "Low",
    insight: "Holiday season competition will likely drive up costs in the 60-90 day period.",
  },
  {
    id: "5-90",
    timeframe: "90",
    name: "CTR",
    current: "2.8%",
    forecast: "3.4%",
    change: "+0.6%",
    changeDirection: "positive",
    confidence: "Low",
    insight: "Seasonal interest and improved targeting should drive higher engagement despite increased costs.",
  },
  {
    id: "6-90",
    timeframe: "90",
    name: "Impression Share",
    current: "68%",
    forecast: "76%",
    change: "+8%",
    changeDirection: "positive",
    confidence: "Low",
    insight: "Planned budget increases for holiday season should maximize visibility during peak demand.",
  },
]

