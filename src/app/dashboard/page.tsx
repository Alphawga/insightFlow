import { ArrowUpRight, BarChart3, Calendar, DollarSign, LineChart, PieChart, TrendingUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { CampaignPerformanceChart } from "@/components/dashboard/campaign-performance-chart"
import { DevicePerformanceChart } from "@/components/dashboard/device-performance-chart"
import { GeographicPerformanceMap } from "@/components/dashboard/geographic-performance-map"
import { RecentCampaigns } from "@/components/dashboard/recent-campaigns"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Overview of your advertising performance">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button size="sm">
            <ArrowUpRight className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </DashboardHeader>
      <Tabs defaultValue="google-ads" className="space-y-4">
        <TabsList>
          <TabsTrigger value="google-ads">Google Ads</TabsTrigger>
          <TabsTrigger value="facebook">Facebook</TabsTrigger>
          <TabsTrigger value="instagram">Instagram</TabsTrigger>
          <TabsTrigger value="amazon">Amazon</TabsTrigger>
        </TabsList>
        <TabsContent value="google-ads" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,345</div>
                <p className="text-xs text-muted-foreground">+15% from last month</p>
                <div className="mt-4 h-1 w-full rounded-full bg-muted">
                  <div className="h-1 w-4/5 rounded-full bg-primary"></div>
                </div>
                <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                  <span>$0</span>
                  <span>Budget: $15,000</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversions</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+8% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ROAS</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2x</div>
                <p className="text-xs text-muted-foreground">+0.5x from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">CTR</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.4%</div>
                <p className="text-xs text-muted-foreground">+0.3% from last month</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Performance metrics over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <CampaignPerformanceChart />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Device Performance</CardTitle>
                <CardDescription>Breakdown by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <DevicePerformanceChart />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Geographic Performance</CardTitle>
                <CardDescription>Conversion distribution by region</CardDescription>
              </CardHeader>
              <CardContent>
                <GeographicPerformanceMap />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Campaigns</CardTitle>
                <CardDescription>Your top performing campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentCampaigns />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="facebook" className="space-y-4">
          <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <LineChart className="h-10 w-10 text-muted-foreground" />
              <h3 className="font-medium">Connect Facebook Ads</h3>
              <p className="text-sm text-muted-foreground">Connect your Facebook Ads account to view analytics</p>
              <Button size="sm" className="mt-2">
                Connect Account
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="instagram" className="space-y-4">
          <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <PieChart className="h-10 w-10 text-muted-foreground" />
              <h3 className="font-medium">Connect Instagram Ads</h3>
              <p className="text-sm text-muted-foreground">Connect your Instagram Ads account to view analytics</p>
              <Button size="sm" className="mt-2">
                Connect Account
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="amazon" className="space-y-4">
          <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
            <div className="flex flex-col items-center justify-center space-y-2 text-center">
              <BarChart3 className="h-10 w-10 text-muted-foreground" />
              <h3 className="font-medium">Connect Amazon Ads</h3>
              <p className="text-sm text-muted-foreground">Connect your Amazon Ads account to view analytics</p>
              <Button size="sm" className="mt-2">
                Connect Account
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

