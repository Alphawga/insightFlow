import { AdminHeader } from "@/components/admin/admin-header"
import { AdminShell } from "@/components/admin/admin-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Globe, Plus, RefreshCw, Settings } from "lucide-react"
import { IntegrationsTable } from "@/components/integrations/integrations-table"
import { ApiUsageChart } from "@/components/integrations/api-usage-chart"
import { ApiKeysTable } from "@/components/integrations/api-keys-table"

export default function AdminIntegrationsPage() {
  return (
    <AdminShell>
      <AdminHeader heading="Integrations & API" text="Manage platform integrations and API settings">
        <div className="flex items-center gap-2">
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Integration
          </Button>
        </div>
      </AdminHeader>

      <Tabs defaultValue="integrations" className="space-y-4">
        <TabsList>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="api">API Management</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
        </TabsList>

        <TabsContent value="integrations" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Google Ads</CardTitle>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Connected
                  </Badge>
                </div>
                <CardDescription>Sync Google Ads campaign data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-muted-foreground">Status:</div>
                    <div>Active</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-muted-foreground">Last Sync:</div>
                    <div>10 minutes ago</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-muted-foreground">Accounts:</div>
                    <div>12 connected</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync Now
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Facebook Ads</CardTitle>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Connected
                  </Badge>
                </div>
                <CardDescription>Sync Facebook Ads campaign data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-muted-foreground">Status:</div>
                    <div>Active</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-muted-foreground">Last Sync:</div>
                    <div>15 minutes ago</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-muted-foreground">Accounts:</div>
                    <div>8 connected</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync Now
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Instagram Ads</CardTitle>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Connected
                  </Badge>
                </div>
                <CardDescription>Sync Instagram Ads campaign data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-muted-foreground">Status:</div>
                    <div>Active</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-muted-foreground">Last Sync:</div>
                    <div>15 minutes ago</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-muted-foreground">Accounts:</div>
                    <div>5 connected</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync Now
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Amazon Ads</CardTitle>
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Setup Required
                  </Badge>
                </div>
                <CardDescription>Sync Amazon Ads campaign data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="text-muted-foreground">
                    Connect your Amazon Ads account to sync campaign data and analytics.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Connect Amazon Ads
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Shopify</CardTitle>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Connected
                  </Badge>
                </div>
                <CardDescription>Sync Shopify store data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-muted-foreground">Status:</div>
                    <div>Active</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-muted-foreground">Last Sync:</div>
                    <div>5 minutes ago</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-muted-foreground">Stores:</div>
                    <div>3 connected</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Sync Now
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Slack</CardTitle>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Connected
                  </Badge>
                </div>
                <CardDescription>Send notifications to Slack</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-muted-foreground">Status:</div>
                    <div>Active</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-muted-foreground">Workspace:</div>
                    <div>Acme Inc</div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 py-1">
                    <div className="text-muted-foreground">Channels:</div>
                    <div>2 connected</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure
                </Button>
                <Button variant="outline" size="sm">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Test
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Integrations</CardTitle>
              <CardDescription>Manage all available platform integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <IntegrationsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>API Usage</CardTitle>
              <CardDescription>Monitor API request volume and performance</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ApiUsageChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>API Keys</CardTitle>
                <CardDescription>Manage API access credentials</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Generate New Key
              </Button>
            </CardHeader>
            <CardContent>
              <ApiKeysTable />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>Resources for developers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">API Reference</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Complete documentation of all available API endpoints, parameters, and responses.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" size="sm">
                      <Globe className="mr-2 h-4 w-4" />
                      View Documentation
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">SDK Libraries</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Client libraries for JavaScript, Python, Ruby, PHP, and more.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" size="sm">
                      <Globe className="mr-2 h-4 w-4" />
                      View Libraries
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">Code Examples</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Sample code and integration examples for common use cases.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" size="sm">
                      <Globe className="mr-2 h-4 w-4" />
                      View Examples
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Webhooks</CardTitle>
                <CardDescription>Configure event notifications via webhooks</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Webhook
              </Button>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Endpoint URL</TableHead>
                      <TableHead>Events</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Triggered</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">https://example.com/webhooks/insightflow</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline">user.created</Badge>
                          <Badge variant="outline">subscription.updated</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>Jun 10, 2023</TableCell>
                      <TableCell>10 minutes ago</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">https://api.acmeinc.com/webhooks/analytics</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline">report.generated</Badge>
                          <Badge variant="outline">alert.triggered</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Active
                        </Badge>
                      </TableCell>
                      <TableCell>May 28, 2023</TableCell>
                      <TableCell>2 hours ago</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">https://hooks.zapier.com/12345/abcdef</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline">campaign.created</Badge>
                          <Badge variant="outline">campaign.completed</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          Failed
                        </Badge>
                      </TableCell>
                      <TableCell>May 15, 2023</TableCell>
                      <TableCell>1 day ago</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Settings className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Webhook Events</CardTitle>
              <CardDescription>Available events for webhook subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">User Events</h3>
                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline">user.created</Badge>
                      <span className="text-sm text-muted-foreground">Triggered when a new user is created</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline">user.updated</Badge>
                      <span className="text-sm text-muted-foreground">Triggered when user details are updated</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline">user.deleted</Badge>
                      <span className="text-sm text-muted-foreground">Triggered when a user is deleted</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline">user.login</Badge>
                      <span className="text-sm text-muted-foreground">Triggered when a user logs in</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Subscription Events</h3>
                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline">subscription.created</Badge>
                      <span className="text-sm text-muted-foreground">
                        Triggered when a new subscription is created
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline">subscription.updated</Badge>
                      <span className="text-sm text-muted-foreground">Triggered when a subscription is updated</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline">subscription.canceled</Badge>
                      <span className="text-sm text-muted-foreground">Triggered when a subscription is canceled</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline">payment.succeeded</Badge>
                      <span className="text-sm text-muted-foreground">Triggered when a payment is successful</span>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="font-medium mb-2">Campaign Events</h3>
                  <div className="grid gap-2 md:grid-cols-2">
                    <div className="flex items-start gap-2">
                      <Badge variant="outline">campaign.created</Badge>
                      <span className="text-sm text-muted-foreground">Triggered when a new campaign is created</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline">campaign.updated</Badge>
                      <span className="text-sm text-muted-foreground">Triggered when a campaign is updated</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline">campaign.completed</Badge>
                      <span className="text-sm text-muted-foreground">Triggered when a campaign ends</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Badge variant="outline">alert.triggered</Badge>
                      <span className="text-sm text-muted-foreground">Triggered when an alert is fired</span>
                    </div>
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

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

