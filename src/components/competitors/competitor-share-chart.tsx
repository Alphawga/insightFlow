"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"

const data = [
  { name: "Your Company", value: 32 },
  { name: "Competitor A", value: 42 },
  { name: "Competitor B", value: 18 },
  { name: "Competitor C", value: 8 },
]

const COLORS = ["#10B981", "#8884D8", "#82CA9D", "#FFBB28", "#FF8042"]

export function CompetitorShareChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => [`${value}%`, "Market Share"]} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  )
}

