"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { trpc } from "@/lib/trpc"

interface DevicePerformanceChartProps {
  workspaceId: string
  dateRange: {
    startDate: Date
    endDate: Date
  }
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]

export function DevicePerformanceChart({ workspaceId, dateRange }: DevicePerformanceChartProps) {
  const { data: dashboardData, isLoading } = trpc.getDashboardMetrics.useQuery({
    workspaceId,
    dateRange
  })

  const formattedData = dashboardData?.deviceMetrics?.map(device => ({
    name: device.device,
    value: device.clicks || 0
  })) || []

  if (isLoading) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => [`${value} clicks`, 'Clicks']} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}

