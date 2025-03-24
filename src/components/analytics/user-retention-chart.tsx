"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Week 1",
    cohort1: 100,
    cohort2: 100,
    cohort3: 100,
  },
  {
    name: "Week 2",
    cohort1: 92,
    cohort2: 90,
    cohort3: 94,
  },
  {
    name: "Week 3",
    cohort1: 86,
    cohort2: 84,
    cohort3: 90,
  },
  {
    name: "Week 4",
    cohort1: 82,
    cohort2: 80,
    cohort3: 88,
  },
  {
    name: "Week 5",
    cohort1: 78,
    cohort2: 76,
    cohort3: 85,
  },
  {
    name: "Week 6",
    cohort1: 75,
    cohort2: 72,
    cohort3: 82,
  },
]

export function UserRetentionChart() {
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
        <YAxis tickFormatter={(value) => `${value}%`} />
        <Tooltip formatter={(value) => [`${value}%`, ""]} />
        <Legend />
        <Line type="monotone" dataKey="cohort1" name="Apr 2023 Cohort" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="cohort2" name="May 2023 Cohort" stroke="#82ca9d" />
        <Line type="monotone" dataKey="cohort3" name="Jun 2023 Cohort" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  )
}

