"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Clock, MoreHorizontal } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export function RealtimeAlertsList() {
  const [alerts, setAlerts] = useState(initialAlerts)

  const handleSnooze = (id: string, duration: string) => {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id ? { ...alert, snoozed: true, snoozeInfo: `Snoozed for ${duration}` } : alert,
      ),
    )
    toast({
      title: "Alert snoozed",
      description: `This alert has been snoozed for ${duration}.`,
    })
  }

  const handleDismiss = (id: string) => {
    setAlerts(alerts.filter((alert) => alert.id !== id))
    toast({
      title: "Alert dismissed",
      description: "This alert has been dismissed and won't appear again.",
    })
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`rounded-lg border p-4 ${
            alert.snoozed
              ? "bg-muted/50"
              : alert.severity === "high"
                ? "bg-red-50"
                : alert.severity === "medium"
                  ? "bg-amber-50"
                  : alert.severity === "positive"
                    ? "bg-green-50"
                    : ""
          }`}
        >
          <div className="flex items-start gap-4">
            <div
              className={`h-2 w-2 rounded-full mt-2 ${
                alert.snoozed
                  ? "bg-muted-foreground"
                  : alert.severity === "high"
                    ? "bg-red-500"
                    : alert.severity === "medium"
                      ? "bg-amber-500"
                      : alert.severity === "positive"
                        ? "bg-green-500"
                        : "bg-blue-500"
              }`}
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h4 className={`font-medium ${alert.snoozed ? "text-muted-foreground" : ""}`}>{alert.title}</h4>
                  <Badge variant="outline">{alert.type}</Badge>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => window.open("/dashboard/campaigns", "_blank")}>
                      View Campaign
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Snooze</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleSnooze(alert.id, "1 hour")}>For 1 hour</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSnooze(alert.id, "24 hours")}>For 24 hours</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleSnooze(alert.id, "1 week")}>For 1 week</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600" onClick={() => handleDismiss(alert.id)}>
                      Dismiss
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <p className={`text-sm mt-1 ${alert.snoozed ? "text-muted-foreground" : "text-muted-foreground"}`}>
                {alert.description}
              </p>
              {alert.snoozed && (
                <div className="mt-2 flex items-center text-xs text-muted-foreground">
                  <Clock className="mr-1 h-3 w-3" />
                  {alert.snoozeInfo}
                </div>
              )}
              {!alert.snoozed && (
                <div className="mt-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => window.open("/dashboard/campaigns", "_blank")}>
                      View Details
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDismiss(alert.id)}>
                      Dismiss
                    </Button>
                  </div>
                  <span className="text-xs text-muted-foreground">{alert.time}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const initialAlerts = [
  {
    id: "1",
    title: "CTR dropped by 25% in Spring Collection Campaign",
    description: "Click-through rate decreased from 3.2% to 2.4% in the last 24 hours.",
    severity: "high",
    type: "Performance",
    time: "2 hours ago",
    snoozed: false,
    snoozeInfo: "",
  },
  {
    id: "2",
    title: "Summer Sale Campaign at 90% of budget",
    description: "Campaign has spent $3,600 of $4,000 budget. At current pace, budget will be exhausted in 3 days.",
    severity: "medium",
    type: "Budget",
    time: "5 hours ago",
    snoozed: false,
    snoozeInfo: "",
  },
  {
    id: "3",
    title: "Conversion rate increased by 30% in Holiday Special Campaign",
    description: "Conversion rate increased from 2.1% to 2.7% in the last 48 hours.",
    severity: "positive",
    type: "Performance",
    time: "1 day ago",
    snoozed: true,
    snoozeInfo: "Snoozed for 24 hours",
  },
  {
    id: "4",
    title: "New Arrivals Campaign at 85% of budget",
    description: "Campaign has spent $2,975 of $3,500 budget. At current pace, budget will be exhausted in 5 days.",
    severity: "medium",
    type: "Budget",
    time: "1 day ago",
    snoozed: false,
    snoozeInfo: "",
  },
  {
    id: "5",
    title: "CPC increased by 20% in Brand Awareness Campaign",
    description: "Cost per click increased from $1.25 to $1.50 in the last 72 hours.",
    severity: "high",
    type: "Performance",
    time: "2 days ago",
    snoozed: false,
    snoozeInfo: "",
  },
]

