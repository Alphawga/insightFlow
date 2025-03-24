"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Professional Plan", value: 56727 },
  { name: "Basic Plan", value: 9898 },
  { name: "Enterprise Plan", value: 20033 },
]

const COLORS = ["#82ca9d", "#8884d8", "#ffc658"]

export function SubscriptionBreakdownChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

