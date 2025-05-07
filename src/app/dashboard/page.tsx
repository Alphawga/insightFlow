"use client"

import { ArrowUpRight, BarChart3, DollarSign, LineChart, PieChart, TrendingUp, Users } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { CampaignPerformanceChart } from "@/components/dashboard/campaign-performance-chart"
import { DevicePerformanceChart } from "@/components/dashboard/device-performance-chart"
import { GeographicPerformanceMap } from "@/components/dashboard/geographic-performance-map"
import { RecentCampaigns } from "@/components/dashboard/recent-campaigns"
import { DateRangeSelector } from "@/components/dashboard/date-range-selector"
import { DateRangeProvider, useDateRange } from "@/components/dashboard/date-range-context"
import { trpc } from "../_providers/trpc-provider"
import { useWorkspace } from "@/lib/hooks/use-workspace"


export default function DashboardPage() {
  const router = useRouter()
  const { workspaceId, isLoading: isLoadingWorkspace, error: workspaceError } = useWorkspace()
  
  // Redirect to onboarding if user doesn't have a workspace
  useEffect(() => {
    if (!isLoadingWorkspace && workspaceError) {
      router.push('/onboarding')
    }
  }, [isLoadingWorkspace, workspaceError, router])

  return (
    <DateRangeProvider>
      <DashboardContent workspaceId={workspaceId} isLoadingWorkspace={isLoadingWorkspace} />
    </DateRangeProvider>
  )
}

// Separate component to access DateRangeContext inside child component
function DashboardContent({ 
  workspaceId, 
  isLoadingWorkspace
}: { 
  workspaceId: string | null
  isLoadingWorkspace: boolean 
}) {
  const { dateRange } = useDateRange()
  const [queryDateRange, setQueryDateRange] = useState<{
    startDate: Date;
    endDate: Date;
  }>({
    startDate: dateRange.from || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: dateRange.to || new Date()
  })
  
  // Update query date range when dateRange context changes
  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      setQueryDateRange({
        startDate: dateRange.from,
        endDate: dateRange.to
      })
    }
  }, [dateRange])
  
  const { data: dashboardData, isLoading: isLoadingDashboard } = trpc.getDashboardMetrics.useQuery({
    workspaceId: workspaceId || "",
    dateRange: queryDateRange
  }, {
    enabled: !!workspaceId,
  })
  
  const handleDateRangeChange = (startDate: Date, endDate: Date) => {
    setQueryDateRange({ startDate, endDate })
  }

  // Show loading state while workspace is loading
  if (isLoadingWorkspace) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Overview of your advertising performance">
        <div className="flex items-center gap-2">
          <DateRangeSelector onDateRangeChange={handleDateRangeChange} />
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
          {(isLoadingDashboard || !workspaceId) ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Array(4).fill(0).map((_, i) => (
                <Card key={i}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="h-4 w-32 animate-pulse bg-muted"></CardTitle>
                    <div className="h-4 w-4 animate-pulse bg-muted"></div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-8 w-24 animate-pulse bg-muted"></div>
                    <div className="mt-2 h-4 w-32 animate-pulse bg-muted"></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${dashboardData?.overview?.cpc ? 
                      (parseFloat(dashboardData.overview.cpc) * dashboardData.overview.conversions).toFixed(2) : 
                      "0.00"
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData?.overview?.trends?.cpc ? 
                      `${dashboardData.overview.trends.cpc > 0 ? '+' : ''}${dashboardData.overview.trends.cpc.toFixed(0)}% from last period` : 
                      "No previous data"
                    }
                  </p>
                  {/* Budget progress bar - ideally should use campaign budget data */}
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
                  <div className="text-2xl font-bold">{dashboardData?.overview?.conversions || 0}</div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData?.overview?.trends?.conversions ? 
                      `${dashboardData.overview.trends.conversions > 0 ? '+' : ''}${dashboardData.overview.trends.conversions.toFixed(0)}% from last period` : 
                      "No previous data"
                    }
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">ROAS</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData?.overview?.roas || 0}x</div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData?.overview?.trends?.roas ? 
                      `${dashboardData.overview.trends.roas > 0 ? '+' : ''}${dashboardData.overview.trends.roas.toFixed(1)}x from last period` : 
                      "No previous data"
                    }
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">CTR</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData?.overview?.ctr || 0}%</div>
                  <p className="text-xs text-muted-foreground">
                    {dashboardData?.overview?.trends?.ctr ? 
                      `${dashboardData.overview.trends.ctr > 0 ? '+' : ''}${dashboardData.overview.trends.ctr.toFixed(1)}% from last period` : 
                      "No previous data"
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Performance metrics over the selected period</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                {workspaceId && (
                  <CampaignPerformanceChart 
                    workspaceId={workspaceId} 
                    dateRange={queryDateRange} 
                  />
                )}
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Device Performance</CardTitle>
                <CardDescription>Breakdown by device type</CardDescription>
              </CardHeader>
              <CardContent>
                {workspaceId && (
                  <DevicePerformanceChart 
                    workspaceId={workspaceId} 
                    dateRange={queryDateRange} 
                  />
                )}
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
                {workspaceId && (
                  <GeographicPerformanceMap 
                    workspaceId={workspaceId} 
                    dateRange={queryDateRange} 
                  />
                )}
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Campaigns</CardTitle>
                <CardDescription>Your top performing campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                {workspaceId && (
                  <RecentCampaigns 
                    workspaceId={workspaceId} 
                  />
                )}
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

