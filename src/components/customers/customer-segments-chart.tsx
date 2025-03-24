"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "High Value",
    ltv: 1245,
    cac: 120,
    ratio: 10.4,
  },
  {
    name: "Mid Value",
    ltv: 425,
    cac: 65,
    ratio: 6.5,
  },
  {
    name: "Low Value",
    ltv: 95,
    cac: 40,
    ratio: 2.4,
  },
  {
    name: "New Customers",
    ltv: 185,
    cac: 56,
    ratio: 3.3,
  },
  {
    name: "Loyal Customers",
    ltv: 780,
    cac: 85,
    ratio: 9.2,
  },
]

export function CustomerSegmentsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" label={{ value: "Value ($)", angle: -90, position: "insideLeft" }} />
        <YAxis
          yAxisId="right"
          orientation="right"
          label={{ value: "LTV:CAC Ratio", angle: 90, position: "insideRight" }}
        />
        <Tooltip
          formatter={(value, name) => {
            if (name === "ltv") return [`$${value}`, "Lifetime Value"]
            if (name === "cac") return [`$${value}`, "Acquisition Cost"]
            return [`${value}x`, "LTV:CAC Ratio"]
          }}
        />
        <Legend />
        <Bar yAxisId="left" dataKey="ltv" name="Lifetime Value" fill="#8884d8" />
        <Bar yAxisId="left" dataKey="cac" name="Acquisition Cost" fill="#82ca9d" />
        <Bar yAxisId="right" dataKey="ratio" name="LTV:CAC Ratio" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  )
}

