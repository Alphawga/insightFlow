import { AdminHeader } from "@/components/admin/admin-header"
import { AdminShell } from "@/components/admin/admin-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, CreditCard, DollarSign, TrendingUp, Users } from "lucide-react"
import { RevenueOverviewChart } from "@/components/revenue/revenue-overview-chart"
import { SubscriptionBreakdownChart } from "@/components/revenue/subscription-breakdown-chart"
import { BillingHistoryTable } from "@/components/revenue/billing-history-table"
import { SubscriptionGrowthChart } from "@/components/revenue/subscription-growth-chart"

export default function AdminRevenuePage() {
  return (
    <AdminShell>
      <AdminHeader heading="Revenue & Billing" text="Monitor platform revenue, subscriptions, and billing">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </AdminHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$83,358</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">842</div>
            <p className="text-xs text-muted-foreground">+68 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Revenue Per User</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$99</div>
            <p className="text-xs text-muted-foreground">+$4 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Annual Recurring Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1.02M</div>
            <p className="text-xs text-muted-foreground">+15% from last year</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Revenue Overview</TabsTrigger>
          <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
          <TabsTrigger value="billing">Billing History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trends</CardTitle>
              <CardDescription>Monthly revenue breakdown by plan type</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <RevenueOverviewChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Metrics</CardTitle>
                <CardDescription>Key financial indicators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Customer Acquisition Cost</p>
                      <p className="text-xl font-bold">$42</p>
                      <p className="text-xs text-muted-foreground">-8% from last quarter</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Lifetime Value</p>
                      <p className="text-xl font-bold">$1,240</p>
                      <p className="text-xs text-muted-foreground">+15% from last quarter</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">LTV:CAC Ratio</p>
                      <p className="text-xl font-bold">29.5:1</p>
                      <p className="text-xs text-muted-foreground">+25% from last quarter</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Churn Rate</p>
                      <p className="text-xl font-bold">4.2%</p>
                      <p className="text-xs text-muted-foreground">-0.3% from last quarter</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">MRR Growth Rate</p>
                      <p className="text-xl font-bold">12%</p>
                      <p className="text-xs text-muted-foreground">+2% from last quarter</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">Revenue Retention</p>
                      <p className="text-xl font-bold">108%</p>
                      <p className="text-xs text-muted-foreground">+3% from last quarter</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Plan</CardTitle>
                <CardDescription>Distribution of revenue across subscription plans</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <SubscriptionBreakdownChart />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="subscriptions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Subscription Growth</CardTitle>
              <CardDescription>Monthly active subscriptions by plan</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <SubscriptionGrowthChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Professional Plan</CardTitle>
                <CardDescription>$99/month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-muted-foreground">Active subscriptions</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Monthly Revenue</p>
                    <p className="font-medium">$56,727</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Churn Rate</p>
                    <p className="font-medium">3.8%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Basic Plan</CardTitle>
                <CardDescription>$49/month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">202</div>
                <p className="text-xs text-muted-foreground">Active subscriptions</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Monthly Revenue</p>
                    <p className="font-medium">$9,898</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Churn Rate</p>
                    <p className="font-medium">5.2%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Enterprise Plan</CardTitle>
                <CardDescription>$299/month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">67</div>
                <p className="text-xs text-muted-foreground">Active subscriptions</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Monthly Revenue</p>
                    <p className="font-medium">$20,033</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Churn Rate</p>
                    <p className="font-medium">1.5%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Subscription Metrics</CardTitle>
              <CardDescription>Key subscription performance indicators</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">New Subscriptions</h3>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">84</div>
                    <div className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800">+12%</div>
                  </div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Upgrades</h3>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">28</div>
                    <div className="rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-800">+8%</div>
                  </div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Downgrades</h3>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">12</div>
                    <div className="rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-800">+3%</div>
                  </div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Cancellations</h3>
                  <div className="flex items-center gap-2">
                    <div className="text-2xl font-bold">35</div>
                    <div className="rounded-md bg-amber-100 px-2 py-1 text-xs font-medium text-amber-800">-2%</div>
                  </div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Billing History</CardTitle>
              <CardDescription>Recent transactions and payment history</CardDescription>
            </CardHeader>
            <CardContent>
              <BillingHistoryTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminShell>
  )
}

