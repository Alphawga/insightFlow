import { AdminHeader } from "@/components/admin/admin-header"
import { AdminShell } from "@/components/admin/admin-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, BarChart3, LineChart, PieChart, Activity } from "lucide-react"
import { PlatformUsageChart } from "@/components/analytics/platform-usage-chart"
import { UserEngagementChart } from "@/components/analytics/user-engagement-chart"
import { FeatureAdoptionChart } from "@/components/analytics/feature-adoption-chart"
import { UserRetentionChart } from "@/components/analytics/user-retention-chart"

export default function AdminAnalyticsPage() {
  return (
    <AdminShell>
      <AdminHeader heading="Platform Analytics" text="Analyze platform usage, engagement, and feature adoption">
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
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,024</div>
            <p className="text-xs text-muted-foreground">+156 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Session Duration</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18m 42s</div>
            <p className="text-xs text-muted-foreground">+2m 15s from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feature Adoption</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">78%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Retention</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="usage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="usage">Platform Usage</TabsTrigger>
          <TabsTrigger value="engagement">User Engagement</TabsTrigger>
          <TabsTrigger value="features">Feature Adoption</TabsTrigger>
          <TabsTrigger value="retention">User Retention</TabsTrigger>
        </TabsList>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Usage Trends</CardTitle>
              <CardDescription>Daily active users and session metrics</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <PlatformUsageChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Usage by Device</CardTitle>
                <CardDescription>Platform access by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Desktop</span>
                      <span className="text-sm font-medium">64%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[64%] rounded-full bg-primary"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Mobile</span>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[28%] rounded-full bg-primary"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Tablet</span>
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
                <CardTitle>Usage by Time of Day</CardTitle>
                <CardDescription>When users are most active</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Morning (6am-12pm)</span>
                      <span className="text-sm font-medium">22%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[22%] rounded-full bg-primary"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Afternoon (12pm-5pm)</span>
                      <span className="text-sm font-medium">45%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[45%] rounded-full bg-primary"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Evening (5pm-10pm)</span>
                      <span className="text-sm font-medium">28%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[28%] rounded-full bg-primary"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Night (10pm-6am)</span>
                      <span className="text-sm font-medium">5%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[5%] rounded-full bg-primary"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Engagement Metrics</CardTitle>
              <CardDescription>Tracking how users interact with the platform</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <UserEngagementChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Pages Per Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.4</div>
                <p className="text-xs text-muted-foreground">+0.6 from last month</p>
                <div className="mt-4 h-1 w-full rounded-full bg-muted">
                  <div className="h-1 w-[70%] rounded-full bg-primary"></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Bounce Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12.8%</div>
                <p className="text-xs text-muted-foreground">-2.3% from last month</p>
                <div className="mt-4 h-1 w-full rounded-full bg-muted">
                  <div className="h-1 w-[20%] rounded-full bg-primary"></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Actions Per Session</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">14.2</div>
                <p className="text-xs text-muted-foreground">+1.8 from last month</p>
                <div className="mt-4 h-1 w-full rounded-full bg-muted">
                  <div className="h-1 w-[75%] rounded-full bg-primary"></div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Return Frequency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.5 days</div>
                <p className="text-xs text-muted-foreground">-0.5 days from last month</p>
                <div className="mt-4 h-1 w-full rounded-full bg-muted">
                  <div className="h-1 w-[85%] rounded-full bg-primary"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Feature Adoption Rates</CardTitle>
              <CardDescription>Usage of key platform features</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <FeatureAdoptionChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feature Usage Details</CardTitle>
              <CardDescription>Detailed breakdown of feature adoption</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Dashboard Analytics</h3>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[92%] rounded-full bg-green-500"></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Core feature with high adoption across all user segments
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Custom Alerts</h3>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[78%] rounded-full bg-green-500"></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Strong adoption with recent 15% growth after UI improvements
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Predictive Analytics</h3>
                    <span className="text-sm font-medium">64%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[64%] rounded-full bg-amber-500"></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Growing adoption, primarily among Professional and Enterprise users
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Competitor Analysis</h3>
                    <span className="text-sm font-medium">52%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[52%] rounded-full bg-amber-500"></div>
                  </div>
                  <p className="text-xs text-muted-foreground">Moderate adoption, opportunity for feature education</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">Customer LTV Analysis</h3>
                    <span className="text-sm font-medium">38%</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[38%] rounded-full bg-red-500"></div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Lower adoption, primarily used by Enterprise customers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="retention" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>User Retention Analysis</CardTitle>
              <CardDescription>Cohort analysis of user retention over time</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px]">
              <UserRetentionChart />
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Retention by Plan</CardTitle>
                <CardDescription>User retention rates by subscription plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Enterprise Plan</span>
                      <span className="text-sm font-medium">96%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[96%] rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Professional Plan</span>
                      <span className="text-sm font-medium">92%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[92%] rounded-full bg-green-500"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Basic Plan</span>
                      <span className="text-sm font-medium">84%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[84%] rounded-full bg-amber-500"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Churn Reasons</CardTitle>
                <CardDescription>Primary reasons for user churn</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Price</span>
                      <span className="text-sm font-medium">38%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[38%] rounded-full bg-red-500"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Feature Limitations</span>
                      <span className="text-sm font-medium">24%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[24%] rounded-full bg-red-500"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Usability Issues</span>
                      <span className="text-sm font-medium">18%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[18%] rounded-full bg-red-500"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Switched to Competitor</span>
                      <span className="text-sm font-medium">12%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[12%] rounded-full bg-red-500"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Other</span>
                      <span className="text-sm font-medium">8%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-muted">
                      <div className="h-2 w-[8%] rounded-full bg-red-500"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </AdminShell>
  )
}

