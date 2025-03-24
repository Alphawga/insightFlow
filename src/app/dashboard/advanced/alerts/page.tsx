import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Plus, Settings } from "lucide-react"
import { AlertsThresholdForm } from "@/components/alerts/alerts-threshold-form"
import { RealtimeAlertsList } from "@/components/alerts/realtime-alerts-list"
import { AlertsNotificationSettings } from "@/components/alerts/alerts-notification-settings"

export default function AdvancedAlertsPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Real-Time Alerts"
        text="Get notified instantly when performance metrics change significantly"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Alert
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Monitoring your campaigns</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Triggered Today</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Requiring attention</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Snoozed Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Temporarily muted</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alert Channels</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Email, In-app, Slack</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active">Active Alerts</TabsTrigger>
          <TabsTrigger value="thresholds">Alert Thresholds</TabsTrigger>
          <TabsTrigger value="notifications">Notification Settings</TabsTrigger>
          <TabsTrigger value="history">Alert History</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Real-Time Alerts</CardTitle>
              <CardDescription>Alerts that are currently monitoring your campaigns</CardDescription>
            </CardHeader>
            <CardContent>
              <RealtimeAlertsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="thresholds" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customize Alert Thresholds</CardTitle>
              <CardDescription>Set custom thresholds for when alerts should be triggered</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertsThresholdForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Configure how and when you receive alert notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertsNotificationSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert History</CardTitle>
              <CardDescription>Record of past alerts and actions taken</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {alertHistory.map((alert) => (
                  <div key={alert.id} className="rounded-lg border p-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`h-2 w-2 rounded-full mt-2 ${
                          alert.severity === "high"
                            ? "bg-red-500"
                            : alert.severity === "medium"
                              ? "bg-amber-500"
                              : "bg-blue-500"
                        }`}
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{alert.title}</h4>
                          <span className="text-xs text-muted-foreground">{alert.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{alert.description}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs font-medium">Action taken:</span>
                          <span className="text-xs text-muted-foreground">{alert.action}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

const alertHistory = [
  {
    id: "1",
    title: "CTR dropped by 25% in Spring Collection Campaign",
    description: "Click-through rate decreased from 3.2% to 2.4% in the last 24 hours.",
    severity: "high",
    date: "May 15, 2023",
    action: "Budget adjusted and ad creative updated",
  },
  {
    id: "2",
    title: "Summer Sale Campaign at 90% of budget",
    description: "Campaign has spent $3,600 of $4,000 budget. At current pace, budget will be exhausted in 3 days.",
    severity: "medium",
    date: "May 12, 2023",
    action: "Budget increased by $2,000",
  },
  {
    id: "3",
    title: "Conversion rate increased by 30% in Holiday Special Campaign",
    description: "Conversion rate increased from 2.1% to 2.7% in the last 48 hours.",
    severity: "low",
    date: "May 10, 2023",
    action: "Budget increased to capitalize on performance",
  },
  {
    id: "4",
    title: "CPC increased by 20% in Brand Awareness Campaign",
    description: "Cost per click increased from $1.25 to $1.50 in the last 72 hours.",
    severity: "high",
    date: "May 8, 2023",
    action: "Bid strategy adjusted and targeting refined",
  },
  {
    id: "5",
    title: "New Arrivals Campaign at 85% of budget",
    description: "Campaign has spent $2,975 of $3,500 budget. At current pace, budget will be exhausted in 5 days.",
    severity: "medium",
    date: "May 5, 2023",
    action: "Alert dismissed, campaign allowed to complete",
  },
]

