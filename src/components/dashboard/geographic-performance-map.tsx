"use client"

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { trpc } from "@/lib/trpc"

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

// For now, we'll use static markers but in a real app, 
// this would come from your geographic data
const defaultMarkers = [
  { name: "New York", coordinates: [-74.006, 40.7128] as [number, number], value: 1200 },
  { name: "Los Angeles", coordinates: [-118.2437, 34.0522] as [number, number], value: 900 },
  { name: "Chicago", coordinates: [-87.6298, 41.8781] as [number, number], value: 700 },
  { name: "London", coordinates: [-0.1278, 51.5074] as [number, number], value: 800 },
  { name: "Paris", coordinates: [2.3522, 48.8566] as [number, number], value: 600 },
]

interface GeographicPerformanceMapProps {
  workspaceId: string
  dateRange: {
    startDate: Date
    endDate: Date
  }
}

export function GeographicPerformanceMap({ workspaceId, dateRange }: GeographicPerformanceMapProps) {
  const { data: dashboardData, isLoading } = trpc.getDashboardMetrics.useQuery({
    workspaceId,
    dateRange
  })

  // In a real application, you would transform geographic data from your API
  // For now, we're using the static markers but adjusting their values based on campaign data
  const markers = defaultMarkers.map((marker, index) => {
    if (!dashboardData?.campaigns || dashboardData.campaigns.length === 0) {
      return marker
    }
    
    // Distribute conversions across markers as a demonstration
    // In a real app, you'd use actual geographic data
    const campaignIndex = index % dashboardData.campaigns.length
    const campaign = dashboardData.campaigns[campaignIndex]
    
    return {
      ...marker,
      value: campaign.conversions || marker.value
    }
  })

  if (isLoading) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="h-[300px] w-full">
      <ComposableMap>
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => <Geography key={geo.rsmKey} geography={geo} fill="#EAEAEC" stroke="#D6D6DA" />)
          }
        </Geographies>
        {markers.map(({ name, coordinates, value }) => (
          <Marker key={name} coordinates={coordinates}>
            <circle r={Math.sqrt(value) / 10} fill="#F53" />
            <text textAnchor="middle" y={-10} style={{ fontFamily: "system-ui", fill: "#5D5A6D", fontSize: "8px" }}>
              {name}
            </text>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  )
}

