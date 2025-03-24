import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Download, Plus, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { CompetitorKeywordsTable } from "@/components/competitors/competitor-keywords-table"
import { CompetitorAdsTable } from "@/components/competitors/competitor-ads-table"
import { CompetitorShareChart } from "@/components/competitors/competitor-share-chart"

export default function CompetitorsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Competitor Analysis" text="Track and analyze your competitors' advertising strategies">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            Add Competitor
          </Button>
        </div>
      </DashboardHeader>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search competitors..." className="pl-8" />
        </div>
        <Button variant="outline" size="sm">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tracked Competitors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">In your industry</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Share of Voice</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Keyword Overlap</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">68%</div>
            <p className="text-xs text-muted-foreground">With top competitor</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground">Not targeted by competitors</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Market Overview</TabsTrigger>
          <TabsTrigger value="keywords">Keywords</TabsTrigger>
          <TabsTrigger value="ads">Ad Creatives</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Share Analysis</CardTitle>
              <CardDescription>Share of voice in your industry</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <CompetitorShareChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Competitors</CardTitle>
                <CardDescription>Based on ad spend and visibility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Competitor A</span>
                      <span className="text-sm font-medium">42%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[42%] rounded-full bg-primary"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Competitor B</span>
                      <span className="text-sm font-medium">32%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[32%] rounded-full bg-primary"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Your Company</span>
                      <span className="text-sm font-medium">32%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[32%] rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Competitor C</span>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[18%] rounded-full bg-primary"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Competitor D</span>
                      <span className="text-sm font-medium">8%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[8%] rounded-full bg-primary"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Competitive Insights</CardTitle>
                <CardDescription>Key findings from competitor analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="rounded-lg border p-3">
                    <h4 className="font-medium">Competitor A increased ad spend by 25%</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      They're focusing on "premium quality" messaging in their new campaign.
                    </p>
                  </div>

                  <div className="rounded-lg border p-3">
                    <h4 className="font-medium">Competitor B launched a new product line</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Their ads are targeting the eco-friendly segment with sustainability messaging.
                    </p>
                  </div>

                  <div className="rounded-lg border p-3">
                    <h4 className="font-medium">Opportunity: Underserved keywords</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      "Fast delivery" and "customer support" have low competition but high search volume.
                    </p>
                  </div>

                  <div className="rounded-lg border p-3">
                    <h4 className="font-medium">Threat: Price competition</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Competitor C has reduced prices by 15% and is highlighting this in their ads.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="keywords" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Competitor Keywords</CardTitle>
              <CardDescription>Keywords your competitors are bidding on</CardDescription>
            </CardHeader>
            <CardContent>
              <CompetitorKeywordsTable />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ads" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Competitor Ad Creatives</CardTitle>
              <CardDescription>Recent ads from your competitors</CardDescription>
            </CardHeader>
            <CardContent>
              <CompetitorAdsTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

