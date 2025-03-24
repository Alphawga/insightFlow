import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Download } from "lucide-react"
import { GeographicPerformanceMap } from "@/components/dashboard/geographic-performance-map"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function GeoPerformancePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Geographic Performance" text="Analyze your ad performance by location">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-2 h-4 w-4" />
            Last 30 Days
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </DashboardHeader>

      <Tabs defaultValue="map" className="space-y-4">
        <TabsList>
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="table">Table View</TabsTrigger>
          <TabsTrigger value="regions">Top Regions</TabsTrigger>
        </TabsList>

        <TabsContent value="map" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Conversion Distribution</CardTitle>
              <CardDescription>Geographic distribution of conversions across regions</CardDescription>
            </CardHeader>
            <CardContent className="h-[500px]">
              <GeographicPerformanceMap />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="table" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance by Country</CardTitle>
              <CardDescription>Detailed metrics for each country</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Country</TableHead>
                    <TableHead>Impressions</TableHead>
                    <TableHead>Clicks</TableHead>
                    <TableHead>Conversions</TableHead>
                    <TableHead>Spend</TableHead>
                    <TableHead>ROAS</TableHead>
                    <TableHead>CTR</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">United States</TableCell>
                    <TableCell>125,432</TableCell>
                    <TableCell>12,543</TableCell>
                    <TableCell>1,254</TableCell>
                    <TableCell>$6,271</TableCell>
                    <TableCell>4.2x</TableCell>
                    <TableCell>10.0%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">United Kingdom</TableCell>
                    <TableCell>45,678</TableCell>
                    <TableCell>4,567</TableCell>
                    <TableCell>456</TableCell>
                    <TableCell>$2,283</TableCell>
                    <TableCell>3.8x</TableCell>
                    <TableCell>10.0%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Canada</TableCell>
                    <TableCell>35,789</TableCell>
                    <TableCell>3,578</TableCell>
                    <TableCell>357</TableCell>
                    <TableCell>$1,789</TableCell>
                    <TableCell>3.5x</TableCell>
                    <TableCell>10.0%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Australia</TableCell>
                    <TableCell>25,678</TableCell>
                    <TableCell>2,567</TableCell>
                    <TableCell>256</TableCell>
                    <TableCell>$1,283</TableCell>
                    <TableCell>3.2x</TableCell>
                    <TableCell>10.0%</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Germany</TableCell>
                    <TableCell>20,456</TableCell>
                    <TableCell>2,045</TableCell>
                    <TableCell>204</TableCell>
                    <TableCell>$1,022</TableCell>
                    <TableCell>3.0x</TableCell>
                    <TableCell>10.0%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regions" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>United States</CardTitle>
                <CardDescription>Top performing region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,254 Conversions</div>
                <p className="text-xs text-muted-foreground">ROAS: 4.2x • CTR: 10.0%</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Top City</p>
                    <p className="font-medium">New York</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Spend</p>
                    <p className="font-medium">$6,271</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>United Kingdom</CardTitle>
                <CardDescription>Second best region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">456 Conversions</div>
                <p className="text-xs text-muted-foreground">ROAS: 3.8x • CTR: 10.0%</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Top City</p>
                    <p className="font-medium">London</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Spend</p>
                    <p className="font-medium">$2,283</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Canada</CardTitle>
                <CardDescription>Third best region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">357 Conversions</div>
                <p className="text-xs text-muted-foreground">ROAS: 3.5x • CTR: 10.0%</p>
                <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Top City</p>
                    <p className="font-medium">Toronto</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Spend</p>
                    <p className="font-medium">$1,789</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

