"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Jan",
    basic: 6200,
    professional: 42500,
    enterprise: 15000,
  },
  {
    name: "Feb",
    basic: 7100,
    professional: 45800,
    enterprise: 15600,
  },
  {
    name: "Mar",
    basic: 8200,
    professional: 48900,
    enterprise: 16200,
  },
  {
    name: "Apr",
    basic: 8800,
    professional: 51200,
    enterprise: 17400,
  },
  {
    name: "May",
    basic: 9300,
    professional: 53600,
    enterprise: 18200,
  },
  {
    name: "Jun",
    basic: 9900,
    professional: 56700,
    enterprise: 20000,
  },
]

export function RevenueOverviewChart() {
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
        <YAxis tickFormatter={(value) => `$${value / 1000}k`} />
        <Tooltip
          formatter={(value) => [`$${value.toLocaleString()}`, ""]}
          labelFormatter={(label) => `${label} 2023`}
        />
        <Legend />
        <Bar dataKey="basic" name="Basic Plan" stackId="a" fill="#8884d8" />
        <Bar dataKey="professional" name="Professional Plan" stackId="a" fill="#82ca9d" />
        <Bar dataKey="enterprise" name="Enterprise Plan" stackId="a" fill="#ffc658" />
      </BarChart>
    </ResponsiveContainer>
  )
}

