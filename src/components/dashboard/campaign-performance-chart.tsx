"use client"

import { useState } from "react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { trpc } from "@/lib/trpc"

interface CampaignPerformanceChartProps {
  workspaceId: string
  dateRange: {
    startDate: Date
    endDate: Date
  }
}

export function CampaignPerformanceChart({ workspaceId, dateRange }: CampaignPerformanceChartProps) {
  const { data: dashboardData, isLoading } = trpc.getDashboardMetrics.useQuery({
    workspaceId,
    dateRange
  })
  
  const [selectedMetric, setSelectedMetric] = useState<'clicks' | 'impressions' | 'conversions'>('clicks')

  // Example of how to transform the data
  // In a real app, you would need to transform your data properly based on your schema
  
  // If we don't have actual time-series data yet, we'll create some from the campaign data
  const formattedData = dashboardData?.campaigns?.map((campaign, index) => {
    // Create a date point based on the index (not ideal but works for demonstration)
    const date = new Date(dateRange.startDate)
    date.setDate(date.getDate() + Math.floor(index * (30 / (dashboardData.campaigns.length || 1))))
    
    return {
      name: campaign.name?.substring(0, 10) || `Campaign ${index + 1}`,
      date: date.toLocaleDateString(),
      clicks: campaign.clicks || 0,
      impressions: campaign.impressions || 0,
      conversions: campaign.conversions || 0,
    }
  }) || []

  if (isLoading) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <div className="mb-4 flex justify-end gap-2">
        <button 
          onClick={() => setSelectedMetric('clicks')}
          className={`rounded px-2 py-1 text-xs ${selectedMetric === 'clicks' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
        >
          Clicks
        </button>
        <button 
          onClick={() => setSelectedMetric('impressions')}
          className={`rounded px-2 py-1 text-xs ${selectedMetric === 'impressions' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
        >
          Impressions
        </button>
        <button 
          onClick={() => setSelectedMetric('conversions')}
          className={`rounded px-2 py-1 text-xs ${selectedMetric === 'conversions' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}
        >
          Conversions
        </button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={formattedData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedMetric === 'clicks' && (
            <Line type="monotone" dataKey="clicks" stroke="#8884d8" activeDot={{ r: 8 }} />
          )}
          {selectedMetric === 'impressions' && (
            <Line type="monotone" dataKey="impressions" stroke="#82ca9d" />
          )}
          {selectedMetric === 'conversions' && (
            <Line type="monotone" dataKey="conversions" stroke="#ff7300" />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

