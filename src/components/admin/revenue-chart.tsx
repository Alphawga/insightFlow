"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", revenue: 65400 },
  { month: "Feb", revenue: 67800 },
  { month: "Mar", revenue: 70200 },
  { month: "Apr", revenue: 72500 },
  { month: "May", revenue: 75100 },
  { month: "Jun", revenue: 77800 },
  { month: "Jul", revenue: 79500 },
  { month: "Aug", revenue: 81200 },
  { month: "Sep", revenue: 82900 },
  { month: "Oct", revenue: 84600 },
  { month: "Nov", revenue: 86300 },
  { month: "Dec", revenue: 88000 },
]

export function RevenueChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
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
          tickFormatter={(value) => `$${value / 1000}k`}
          label={{ value: "Revenue ($)", angle: -90, position: "insideLeft" }}
        />
        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
        <Legend />
        <Bar dataKey="revenue" name="Monthly Revenue" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  )
}

