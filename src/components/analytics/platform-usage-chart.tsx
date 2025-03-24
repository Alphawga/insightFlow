"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Week 1",
    activeUsers: 720,
    sessions: 1450,
    avgDuration: 16.2,
  },
  {
    name: "Week 2",
    activeUsers: 780,
    sessions: 1580,
    avgDuration: 16.8,
  },
  {
    name: "Week 3",
    activeUsers: 840,
    sessions: 1720,
    avgDuration: 17.3,
  },
  {
    name: "Week 4",
    activeUsers: 920,
    sessions: 1880,
    avgDuration: 17.9,
  },
  {
    name: "Week 5",
    activeUsers: 980,
    sessions: 2050,
    avgDuration: 18.2,
  },
  {
    name: "Week 6",
    activeUsers: 1024,
    sessions: 2180,
    avgDuration: 18.7,
  },
]

export function PlatformUsageChart() {
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
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="activeUsers"
          name="Active Users"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line yAxisId="left" type="monotone" dataKey="sessions" name="Sessions" stroke="#82ca9d" />
        <Line yAxisId="right" type="monotone" dataKey="avgDuration" name="Avg. Duration (min)" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  )
}

