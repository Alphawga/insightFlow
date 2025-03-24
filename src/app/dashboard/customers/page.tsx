import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Download, Filter, Users } from "lucide-react"
import { CustomerLTVChart } from "@/components/customers/customer-ltv-chart"
import { CustomerSegmentsChart } from "@/components/customers/customer-segments-chart"
import { CustomerCohortTable } from "@/components/customers/customer-cohort-table"

export default function CustomersPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Customer Lifetime Value" text="Track and analyze customer value over time">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 12 Months
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average LTV</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$487</div>
            <p className="text-xs text-muted-foreground">+12% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Repeat Purchase Rate</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">38%</div>
            <p className="text-xs text-muted-foreground">+5% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customer Retention</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-muted-foreground">+3% from last year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acquisition Cost</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$56</div>
            <p className="text-xs text-muted-foreground">-8% from last year</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">LTV Overview</TabsTrigger>
          <TabsTrigger value="segments">Customer Segments</TabsTrigger>
          <TabsTrigger value="cohorts">Cohort Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Lifetime Value Trend</CardTitle>
              <CardDescription>Average customer value over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <CustomerLTVChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>LTV to CAC Ratio</CardTitle>
                <CardDescription>Ratio of customer lifetime value to customer acquisition cost</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center space-y-2 py-6">
                  <div className="text-5xl font-bold">8.7x</div>
                  <p className="text-sm text-muted-foreground">Industry benchmark: 3.0x</p>
                  <div className="h-2 w-full max-w-md rounded-full bg-muted mt-4">
                    <div className="h-2 w-[87%] rounded-full bg-primary"></div>
                  </div>
                  <div className="flex w-full max-w-md justify-between text-xs text-muted-foreground">
                    <span>0x</span>
                    <span>5x</span>
                    <span>10x</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Journey Value</CardTitle>
                <CardDescription>Value generated at each stage of the customer journey</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">First Purchase</span>
                      <span className="text-sm font-medium">$85</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[17%] rounded-full bg-primary"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Second Purchase</span>
                      <span className="text-sm font-medium">$120</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[25%] rounded-full bg-primary"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Recurring Customer</span>
                      <span className="text-sm font-medium">$282</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[58%] rounded-full bg-primary"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>LTV by Customer Segment</CardTitle>
              <CardDescription>Lifetime value across different customer segments</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <CustomerSegmentsChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>High Value</CardTitle>
                <CardDescription>Top 20% of customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,245</div>
                <p className="text-xs text-muted-foreground">Average lifetime value</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Purchases</p>
                    <p className="font-medium">8.3 avg</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Retention</p>
                    <p className="font-medium">92%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Mid Value</CardTitle>
                <CardDescription>Middle 50% of customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$425</div>
                <p className="text-xs text-muted-foreground">Average lifetime value</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Purchases</p>
                    <p className="font-medium">3.7 avg</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Retention</p>
                    <p className="font-medium">68%</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Low Value</CardTitle>
                <CardDescription>Bottom 30% of customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$95</div>
                <p className="text-xs text-muted-foreground">Average lifetime value</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Purchases</p>
                    <p className="font-medium">1.2 avg</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Retention</p>
                    <p className="font-medium">24%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="cohorts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Cohort Analysis</CardTitle>
              <CardDescription>Retention and value by acquisition cohort</CardDescription>
            </CardHeader>
            <CardContent>
              <CustomerCohortTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

