"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { month: "Jan", users: 620 },
  { month: "Feb", users: 680 },
  { month: "Mar", users: 750 },
  { month: "Apr", users: 810 },
  { month: "May", users: 880 },
  { month: "Jun", users: 940 },
  { month: "Jul", users: 1020 },
  { month: "Aug", users: 1080 },
  { month: "Sep", users: 1140 },
  { month: "Oct", users: 1190 },
  { month: "Nov", users: 1230 },
  { month: "Dec", users: 1280 },
]

export function UserGrowthChart() {
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
        <YAxis label={{ value: "Total Users", angle: -90, position: "insideLeft" }} />
        <Tooltip formatter={(value) => [`${value}`, "Users"]} />
        <Legend />
        <Line
          type="monotone"
          dataKey="users"
          name="Total Users"
          stroke="#82ca9d"
          activeDot={{ r: 8 }}
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

