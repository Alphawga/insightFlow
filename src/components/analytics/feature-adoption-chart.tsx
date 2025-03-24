"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  {
    name: "Dashboard",
    current: 92,
    previous: 88,
  },
  {
    name: "Custom Alerts",
    current: 78,
    previous: 63,
  },
  {
    name: "Predictive Analytics",
    current: 64,
    previous: 52,
  },
  {
    name: "Competitor Analysis",
    current: 52,
    previous: 45,
  },
  {
    name: "Customer LTV",
    current: 38,
    previous: 30,
  },
  {
    name: "Geo Performance",
    current: 72,
    previous: 65,
  },
]

export function FeatureAdoptionChart() {
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
        <YAxis tickFormatter={(value) => `${value}%`} />
        <Tooltip formatter={(value) => [`${value}%`, ""]} />
        <Legend />
        <Bar dataKey="current" name="Current Month" fill="#8884d8" />
        <Bar dataKey="previous" name="Previous Month" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  )
}

