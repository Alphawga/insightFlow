import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, LineChart, TrendingUp } from "lucide-react"
import { ForecastChart } from "@/components/forecasting/forecast-chart"
import { ScenarioAnalysis } from "@/components/forecasting/scenario-analysis"
import { ForecastMetrics } from "@/components/forecasting/forecast-metrics"

export default function AdvancedForecastingPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Predictive Analytics"
        text="Forecast future performance to plan your budget and campaigns"
      >
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Forecast
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forecasted Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$24,500</div>
            <p className="text-xs text-muted-foreground">Next 30 days (±8%)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forecasted ROAS</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3.8x</div>
            <p className="text-xs text-muted-foreground">Next 30 days (±0.4x)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forecasted Conversions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,250</div>
            <p className="text-xs text-muted-foreground">Next 30 days (±120)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Optimal Budget</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$6,450</div>
            <p className="text-xs text-muted-foreground">Recommended for next 30 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Forecast Overview</TabsTrigger>
          <TabsTrigger value="scenarios">Scenario Analysis</TabsTrigger>
          <TabsTrigger value="metrics">Detailed Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Forecast</CardTitle>
              <CardDescription>Machine learning-based forecast for the next 90 days</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ForecastChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Forecast Methodology</CardTitle>
                <CardDescription>How our predictive analytics work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium">Machine Learning Model</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Our forecasts use advanced machine learning algorithms trained on your historical data and
                      industry benchmarks.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium">Confidence Intervals</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      The shaded areas represent 80% confidence intervals, indicating the range of likely outcomes.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium">Seasonality & Trends</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Our models account for seasonal patterns, market trends, and your campaign history.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4">
                    <h4 className="font-medium">Weekly Updates</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Forecasts are automatically updated weekly with new data to improve accuracy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>What our predictive model is telling us</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-4 bg-green-50">
                    <h4 className="font-medium">Growth Opportunity</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Increasing your budget by 15% could yield a 22% increase in conversions based on current
                      performance.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4 bg-blue-50">
                    <h4 className="font-medium">Seasonal Trend</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Expect a 10-15% increase in conversion rates during the upcoming holiday season.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4 bg-amber-50">
                    <h4 className="font-medium">Budget Allocation</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Shifting 20% of budget from Campaign A to Campaign C could improve overall ROAS by 0.5x.
                    </p>
                  </div>

                  <div className="rounded-lg border p-4 bg-red-50">
                    <h4 className="font-medium">Risk Alert</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      CPC is predicted to increase by 12% in the next 60 days due to increased competition.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Scenario Analysis</CardTitle>
              <CardDescription>Explore different budget scenarios and their predicted outcomes</CardDescription>
            </CardHeader>
            <CardContent>
              <ScenarioAnalysis />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Forecast Metrics</CardTitle>
              <CardDescription>Comprehensive breakdown of forecasted performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ForecastMetrics />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

