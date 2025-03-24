"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent } from "@/components/ui/card"

// Base forecast data
const baseForecast = [
  { month: "Jul", revenue: 21500, conversions: 1075, roas: 3.64 },
  { month: "Aug", revenue: 22800, conversions: 1140, roas: 3.68 },
  { month: "Sep", revenue: 24500, conversions: 1225, roas: 3.8 },
]

export function ScenarioAnalysis() {
  const [budgetChange, setBudgetChange] = useState(0)
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  // Calculate scenario data based on budget change
  const calculateScenarioData = () => {
    // Different metrics respond differently to budget changes
    const scenarios = [
      {
        name: "Conservative",
        revenue: baseForecast.map((item) => ({
          ...item,
          revenue: Math.round(item.revenue * (1 + (budgetChange * 0.8) / 100)),
          conversions: Math.round(item.conversions * (1 + (budgetChange * 0.7) / 100)),
          roas: Number.parseFloat((item.roas * (1 + (budgetChange * -0.1) / 100)).toFixed(2)),
        })),
      },
      {
        name: "Moderate",
        revenue: baseForecast.map((item) => ({
          ...item,
          revenue: Math.round(item.revenue * (1 + (budgetChange * 1.0) / 100)),
          conversions: Math.round(item.conversions * (1 + (budgetChange * 0.9) / 100)),
          roas: Number.parseFloat((item.roas * (1 + (budgetChange * 0) / 100)).toFixed(2)),
        })),
      },
      {
        name: "Aggressive",
        revenue: baseForecast.map((item) => ({
          ...item,
          revenue: Math.round(item.revenue * (1 + (budgetChange * 1.2) / 100)),
          conversions: Math.round(item.conversions * (1 + (budgetChange * 1.1) / 100)),
          roas: Number.parseFloat((item.roas * (1 + (budgetChange * 0.1) / 100)).toFixed(2)),
        })),
      },
    ]

    return scenarios
  }

  const scenarios = calculateScenarioData()

  // Format the data for display
  const formatYAxis = (value: number) => {
    if (selectedMetric === "revenue") {
      return `$${value / 1000}k`
    } else if (selectedMetric === "roas") {
      return `${value}x`
    } else {
      return value
    }
  }

  const formatTooltip = (value: number, name: string) => {
    if (selectedMetric === "revenue") {
      return [`$${value.toLocaleString()}`, name]
    } else if (selectedMetric === "roas") {
      return [`${value}x`, name]
    } else {
      return [value.toLocaleString(), name]
    }
  }

  // Calculate the impact summary
  const calculateImpact = () => {
    const moderateScenario = scenarios[1].revenue
    const baselineRevenue = baseForecast.reduce((sum, item) => sum + item.revenue, 0)
    const scenarioRevenue = moderateScenario.reduce((sum, item) => sum + item.revenue, 0)
    const revenueChange = scenarioRevenue - baselineRevenue
    const percentChange = ((revenueChange / baselineRevenue) * 100).toFixed(1)

    const baselineConversions = baseForecast.reduce((sum, item) => sum + item.conversions, 0)
    const scenarioConversions = moderateScenario.reduce((sum, item) => sum + item.conversions, 0)
    const conversionChange = scenarioConversions - baselineConversions

    const baselineRoas = baseForecast.reduce((sum, item) => sum + item.roas, 0) / baseForecast.length
    const scenarioRoas = moderateScenario.reduce((sum, item) => sum + item.roas, 0) / moderateScenario.length
    const roasChange = (scenarioRoas - baselineRoas).toFixed(2)

    return {
      revenueChange,
      percentChange,
      conversionChange,
      roasChange,
    }
  }

  const impact = calculateImpact()

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Budget Adjustment</h3>
          <div className="flex items-center gap-4">
            <Slider
              value={[budgetChange]}
              onValueChange={(value) => setBudgetChange(value[0])}
              min={-50}
              max={50}
              step={5}
              className="flex-1"
            />
            <span className="w-16 text-center font-medium">
              {budgetChange > 0 ? "+" : ""}
              {budgetChange}%
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Adjust the slider to see how different budget levels affect forecasted performance
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedMetric === "revenue" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedMetric("revenue")}
          >
            Revenue
          </Button>
          <Button
            variant={selectedMetric === "conversions" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedMetric("conversions")}
          >
            Conversions
          </Button>
          <Button
            variant={selectedMetric === "roas" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedMetric("roas")}
          >
            ROAS
          </Button>
        </div>
      </div>

      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" allowDuplicatedCategory={false} />
            <YAxis tickFormatter={formatYAxis} domain={["auto", "auto"]} />
            <Tooltip formatter={formatTooltip} />
            <Legend />

            {scenarios.map((s, index) => (
              <Line
                key={s.name}
                data={s.revenue}
                type="monotone"
                dataKey={selectedMetric}
                name={s.name}
                stroke={index === 0 ? "#82ca9d" : index === 1 ? "#8884d8" : "#ff7300"}
                strokeWidth={index === 1 ? 2 : 1}
                dot={{ r: 4 }}
                activeDot={{ r: 8 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-1">Revenue Impact</p>
              <p className={`text-2xl font-bold ${impact.revenueChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                {impact.revenueChange >= 0 ? "+" : ""}
                {impact.revenueChange.toLocaleString()} ({impact.percentChange}%)
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-1">Conversion Impact</p>
              <p className={`text-2xl font-bold ${impact.conversionChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                {impact.conversionChange >= 0 ? "+" : ""}
                {impact.conversionChange.toLocaleString()}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground mb-1">ROAS Impact</p>
              <p
                className={`text-2xl font-bold ${Number.parseFloat(impact.roasChange) >= 0 ? "text-green-600" : "text-red-600"}`}
              >
                {Number.parseFloat(impact.roasChange) >= 0 ? "+" : ""}
                {impact.roasChange}x
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-lg border p-4 bg-muted/50">
        <h3 className="font-medium mb-2">Scenario Definitions</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <div className="w-3 h-3 rounded-full bg-[#82ca9d] mt-1"></div>
            <div>
              <span className="font-medium">Conservative:</span> Assumes diminishing returns with increased budget and
              higher efficiency with decreased budget.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-3 h-3 rounded-full bg-[#8884d8] mt-1"></div>
            <div>
              <span className="font-medium">Moderate:</span> Assumes linear relationship between budget changes and
              performance outcomes.
            </div>
          </li>
          <li className="flex items-start gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff7300] mt-1"></div>
            <div>
              <span className="font-medium">Aggressive:</span> Assumes potential for greater returns with increased
              budget due to scale advantages.
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

