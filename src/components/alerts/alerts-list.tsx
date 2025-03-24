import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function AlertsList() {
  return (
    <div className="space-y-4">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`rounded-lg border p-4 ${
            alert.severity === "high"
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
                alert.severity === "high"
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
                <h4 className="font-medium">{alert.title}</h4>
                <Badge variant="outline">{alert.type}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button variant="ghost" size="sm">
                    Dismiss
                  </Button>
                </div>
                <span className="text-xs text-muted-foreground">{alert.time}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const alerts = [
  {
    id: "1",
    title: "CTR dropped by 25% in Spring Collection Campaign",
    description: "Click-through rate decreased from 3.2% to 2.4% in the last 24 hours.",
    severity: "high",
    type: "Performance",
    time: "2 hours ago",
  },
  {
    id: "2",
    title: "Summer Sale Campaign at 90% of budget",
    description: "Campaign has spent $3,600 of $4,000 budget. At current pace, budget will be exhausted in 3 days.",
    severity: "medium",
    type: "Budget",
    time: "5 hours ago",
  },
  {
    id: "3",
    title: "Conversion rate increased by 30% in Holiday Special Campaign",
    description: "Conversion rate increased from 2.1% to 2.7% in the last 48 hours.",
    severity: "positive",
    type: "Performance",
    time: "1 day ago",
  },
  {
    id: "4",
    title: "New Arrivals Campaign at 85% of budget",
    description: "Campaign has spent $2,975 of $3,500 budget. At current pace, budget will be exhausted in 5 days.",
    severity: "medium",
    type: "Budget",
    time: "1 day ago",
  },
  {
    id: "5",
    title: "CPC increased by 20% in Brand Awareness Campaign",
    description: "Cost per click increased from $1.25 to $1.50 in the last 72 hours.",
    severity: "high",
    type: "Performance",
    time: "2 days ago",
  },
]

