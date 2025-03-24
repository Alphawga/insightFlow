"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", ltv: 120 },
  { month: "Feb", ltv: 180 },
  { month: "Mar", ltv: 220 },
  { month: "Apr", ltv: 270 },
  { month: "May", ltv: 310 },
  { month: "Jun", ltv: 340 },
  { month: "Jul", ltv: 380 },
  { month: "Aug", ltv: 410 },
  { month: "Sep", ltv: 430 },
  { month: "Oct", ltv: 450 },
  { month: "Nov", ltv: 470 },
  { month: "Dec", ltv: 487 },
]

export function CustomerLTVChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis
          label={{ value: "Customer LTV ($)", angle: -90, position: "insideLeft" }}
          domain={[0, "dataMax + 100"]}
        />
        <Tooltip formatter={(value) => [`$${value}`, "Lifetime Value"]} />
        <Legend />
        <Line
          type="monotone"
          dataKey="ltv"
          name="Lifetime Value"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

