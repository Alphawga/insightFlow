"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Jan",
    pageViews: 45000,
    interactions: 28000,
    conversions: 1200,
  },
  {
    name: "Feb",
    pageViews: 52000,
    interactions: 32000,
    conversions: 1350,
  },
  {
    name: "Mar",
    pageViews: 58000,
    interactions: 36000,
    conversions: 1480,
  },
  {
    name: "Apr",
    pageViews: 64000,
    interactions: 40000,
    conversions: 1620,
  },
  {
    name: "May",
    pageViews: 72000,
    interactions: 45000,
    conversions: 1780,
  },
  {
    name: "Jun",
    pageViews: 78000,
    interactions: 49000,
    conversions: 1950,
  },
]

export function UserEngagementChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area type="monotone" dataKey="pageViews" name="Page Views" stackId="1" stroke="#8884d8" fill="#8884d8" />
        <Area type="monotone" dataKey="interactions" name="Interactions" stackId="2" stroke="#82ca9d" fill="#82ca9d" />
        <Area type="monotone" dataKey="conversions" name="Conversions" stackId="3" stroke="#ffc658" fill="#ffc658" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

