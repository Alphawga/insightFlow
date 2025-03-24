import { AdminHeader } from "@/components/admin/admin-header"
import { AdminShell } from "@/components/admin/admin-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Bell, Download, Plus, Send } from "lucide-react"
import { NotificationTemplatesTable } from "@/components/notifications/notification-templates-table"
import { NotificationLogsTable } from "@/components/notifications/notification-logs-table"
import { SystemNotificationsForm } from "@/components/notifications/system-notifications-form"

export default function AdminNotificationsPage() {
  return (
    <AdminShell>
      <AdminHeader heading="Notifications" text="Manage system notifications and user communication">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Logs
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </div>
      </AdminHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Notifications</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,816</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <Send className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">99.2%</div>
            <p className="text-xs text-muted-foreground">+0.3% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68.5%</div>
            <p className="text-xs text-muted-foreground">+2.1% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Templates</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Across all channels</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">Notification Templates</TabsTrigger>
          <TabsTrigger value="logs">Notification Logs</TabsTrigger>
          <TabsTrigger value="system">System Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Email & In-App Notification Templates</CardTitle>
              <CardDescription>Manage templates for user communications</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationTemplatesTable />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Template Variables</CardTitle>
                <CardDescription>Available variables for notification templates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">User Variables</h3>
                    <div className="grid gap-2">
                      <div className="flex items-start gap-2">
                        <Badge variant="outline">{`{{user.name}}`}</Badge>
                        <span className="text-sm text-muted-foreground">User's full name</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline">{`{{user.email}}`}</Badge>
                        <span className="text-sm text-muted-foreground">User's email address</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline">{`{{user.company}}`}</Badge>
                        <span className="text-sm text-muted-foreground">User's company name</span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h3 className="font-medium mb-2">Subscription Variables</h3>
                    <div className="grid gap-2">
                      <div className="flex items-start gap-2">
                        <Badge variant="outline">{`{{subscription.plan}}`}</Badge>
                        <span className="text-sm text-muted-foreground">Subscription plan name</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline">{`{{subscription.price}}`}</Badge>
                        <span className="text-sm text-muted-foreground">Subscription price</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <Badge variant="outline">{`{{subscription.next_billing}}`}</Badge>
                        <span className="text-sm text-muted-foreground">Next billing date</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Channels</CardTitle>
                <CardDescription>Available notification delivery methods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge>Email</Badge>
                        <h3 className="font-medium">Email Notifications</h3>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Active
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Send notifications via email using our transactional email service.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge>In-App</Badge>
                        <h3 className="font-medium">In-App Notifications</h3>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Active
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Display notifications within the application interface.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge>Slack</Badge>
                        <h3 className="font-medium">Slack Notifications</h3>
                      </div>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Active
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Send notifications to connected Slack channels.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge>SMS</Badge>
                        <h3 className="font-medium">SMS Notifications</h3>
                      </div>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Setup Required
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Send text message notifications (requires additional configuration).
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Delivery Logs</CardTitle>
              <CardDescription>History of all sent notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationLogsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Notification Settings</CardTitle>
              <CardDescription>Configure platform-wide notification settings</CardDescription>
            </CardHeader>
            <CardContent>
              <SystemNotificationsForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminShell>
  )
}

