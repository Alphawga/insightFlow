"use client"

import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

const markers = [
  { name: "New York", coordinates: [-74.006, 40.7128], value: 1200 },
  { name: "Los Angeles", coordinates: [-118.2437, 34.0522], value: 900 },
  { name: "Chicago", coordinates: [-87.6298, 41.8781], value: 700 },
  { name: "London", coordinates: [-0.1278, 51.5074], value: 800 },
  { name: "Paris", coordinates: [2.3522, 48.8566], value: 600 },
]

export function GeographicPerformanceMap() {
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

