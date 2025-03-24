"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const data = [
  { name: "Mar 1", clicks: 400, impressions: 2400, conversions: 24 },
  { name: "Mar 5", clicks: 300, impressions: 1398, conversions: 22 },
  { name: "Mar 10", clicks: 200, impressions: 9800, conversions: 18 },
  { name: "Mar 15", clicks: 278, impressions: 3908, conversions: 28 },
  { name: "Mar 20", clicks: 189, impressions: 4800, conversions: 20 },
  { name: "Mar 25", clicks: 239, impressions: 3800, conversions: 25 },
  { name: "Mar 30", clicks: 349, impressions: 4300, conversions: 30 },
]

export function CampaignPerformanceChart() {
  return (
    <div className="h-[300px] w-full">
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
          <Line yAxisId="left" type="monotone" dataKey="clicks" stroke="#8884d8" activeDot={{ r: 8 }} />
          <Line yAxisId="left" type="monotone" dataKey="impressions" stroke="#82ca9d" />
          <Line yAxisId="right" type="monotone" dataKey="conversions" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

