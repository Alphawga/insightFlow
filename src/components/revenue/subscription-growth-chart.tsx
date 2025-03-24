"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Jan",
    basic: 150,
    professional: 420,
    enterprise: 45,
  },
  {
    name: "Feb",
    basic: 165,
    professional: 450,
    enterprise: 48,
  },
  {
    name: "Mar",
    basic: 175,
    professional: 480,
    enterprise: 52,
  },
  {
    name: "Apr",
    basic: 185,
    professional: 510,
    enterprise: 58,
  },
  {
    name: "May",
    basic: 195,
    professional: 540,
    enterprise: 62,
  },
  {
    name: "Jun",
    basic: 202,
    professional: 573,
    enterprise: 67,
  },
]

export function SubscriptionGrowthChart() {
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
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip formatter={(value) => [value, ""]} labelFormatter={(label) => `${label} 2023`} />
        <Legend />
        <Line type="monotone" dataKey="basic" name="Basic Plan" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="professional" name="Professional Plan" stroke="#82ca9d" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="enterprise" name="Enterprise Plan" stroke="#ffc658" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

