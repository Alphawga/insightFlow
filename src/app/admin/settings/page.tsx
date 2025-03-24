import { AdminHeader } from "@/components/admin/admin-header"
import { AdminShell } from "@/components/admin/admin-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Save } from "lucide-react"
import { GeneralSettingsForm } from "@/components/settings/general-settings-form"
import { SecuritySettingsForm } from "@/components/settings/security-settings-form"
import { FeatureTogglesForm } from "@/components/settings/feature-toggles-form"
import { MaintenanceModeForm } from "@/components/settings/maintenance-mode-form"

export default function AdminSettingsPage() {
  return (
    <AdminShell>
      <AdminHeader heading="System Settings" text="Configure platform-wide settings and preferences">
        <div className="flex items-center gap-2">
          <Button size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save All Changes
          </Button>
        </div>
      </AdminHeader>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="features">Feature Toggles</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic platform settings</CardDescription>
            </CardHeader>
            <CardContent>
              <GeneralSettingsForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Configure platform security settings</CardDescription>
            </CardHeader>
            <CardContent>
              <SecuritySettingsForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Toggles</CardTitle>
              <CardDescription>Enable or disable platform features</CardDescription>
            </CardHeader>
            <CardContent>
              <FeatureTogglesForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="maintenance" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Maintenance Mode</CardTitle>
                  <CardDescription>Configure platform maintenance settings</CardDescription>
                </div>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Platform Online
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <MaintenanceModeForm />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>Current platform version and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Platform Version</h3>
                    <p className="text-sm">v2.5.3</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
                    <p className="text-sm">June 10, 2023</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Database Status</h3>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-sm">Healthy</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Cache Status</h3>
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                      <p className="text-sm">Healthy</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Storage Usage</h3>
                    <p className="text-sm">42% (420GB / 1TB)</p>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-muted-foreground">Memory Usage</h3>
                    <p className="text-sm">38% (6.1GB / 16GB)</p>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="text-sm font-medium mb-2">Upcoming Maintenance</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="text-sm">Database Optimization</p>
                      <Badge variant="outline">Scheduled</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      June 20, 2023 - 02:00 UTC (Expected downtime: 30 minutes)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminShell>
  )
}

