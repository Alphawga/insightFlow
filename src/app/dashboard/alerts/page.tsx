import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, Plus, Settings } from "lucide-react"
import { AlertsList } from "@/components/alerts/alerts-list"
import { AlertsSettings } from "@/components/alerts/alerts-settings"

export default function AlertsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Custom Alerts" text="Get notified when performance metrics change significantly">
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
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across all campaigns</p>
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
            <CardTitle className="text-sm font-medium">Budget Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">Campaigns near budget limit</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Metrics outside normal range</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Alerts</TabsTrigger>
          <TabsTrigger value="budget">Budget</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="settings">Alert Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>Alerts triggered in the last 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Alerts</CardTitle>
              <CardDescription>Notifications about campaign spending</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4 bg-amber-50">
                  <div className="flex items-start gap-4">
                    <Bell className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Summer Sale Campaign at 90% of budget</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Campaign has spent $3,600 of $4,000 budget. At current pace, budget will be exhausted in 3 days.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Increase Budget
                        </Button>
                        <Button variant="ghost" size="sm">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-amber-50">
                  <div className="flex items-start gap-4">
                    <Bell className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">New Arrivals Campaign at 85% of budget</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Campaign has spent $2,975 of $3,500 budget. At current pace, budget will be exhausted in 5 days.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          Increase Budget
                        </Button>
                        <Button variant="ghost" size="sm">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Alerts</CardTitle>
              <CardDescription>Notifications about significant metric changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4 bg-red-50">
                  <div className="flex items-start gap-4">
                    <Bell className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">CTR dropped by 25% in Spring Collection Campaign</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Click-through rate decreased from 3.2% to 2.4% in the last 24 hours.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Campaign
                        </Button>
                        <Button variant="ghost" size="sm">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-green-50">
                  <div className="flex items-start gap-4">
                    <Bell className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Conversion rate increased by 30% in Holiday Special Campaign</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Conversion rate increased from 2.1% to 2.7% in the last 48 hours.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Campaign
                        </Button>
                        <Button variant="ghost" size="sm">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4 bg-red-50">
                  <div className="flex items-start gap-4">
                    <Bell className="h-5 w-5 text-red-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">CPC increased by 20% in Brand Awareness Campaign</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Cost per click increased from $1.25 to $1.50 in the last 72 hours.
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          View Campaign
                        </Button>
                        <Button variant="ghost" size="sm">
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert Configuration</CardTitle>
              <CardDescription>Customize when and how you receive alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <AlertsSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

