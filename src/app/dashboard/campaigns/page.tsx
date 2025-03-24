import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ArrowUpDown, ChevronDown, Download, Filter, MoreHorizontal, Plus, Search } from "lucide-react"

export default function CampaignsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Campaigns" text="Manage and analyze your advertising campaigns">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Campaign
        </Button>
      </DashboardHeader>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search campaigns..." className="pl-8" />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Status</DropdownMenuItem>
                <DropdownMenuItem>Platform</DropdownMenuItem>
                <DropdownMenuItem>Budget</DropdownMenuItem>
                <DropdownMenuItem>Performance</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">
                  <div className="flex items-center space-x-1">
                    <span>Campaign Name</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <span>Platform</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <span>Status</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <span>Budget</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <span>Spend</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <span>ROAS</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead>
                  <div className="flex items-center space-x-1">
                    <span>CTR</span>
                    <ArrowUpDown className="h-4 w-4" />
                  </div>
                </TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>{campaign.platform}</TableCell>
                  <TableCell>
                    <div
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        campaign.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : campaign.status === "Paused"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {campaign.status}
                    </div>
                  </TableCell>
                  <TableCell>${campaign.budget.toLocaleString()}</TableCell>
                  <TableCell>${campaign.spend.toLocaleString()}</TableCell>
                  <TableCell>{campaign.roas}x</TableCell>
                  <TableCell>{campaign.ctr}%</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View details</DropdownMenuItem>
                        <DropdownMenuItem>Edit campaign</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Pause campaign</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">Delete campaign</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardShell>
  )
}

const campaigns = [
  {
    id: "1",
    name: "Spring Collection Launch",
    platform: "Google Ads",
    status: "Active",
    budget: 5000,
    spend: 3245,
    roas: 4.2,
    ctr: 3.1,
  },
  {
    id: "2",
    name: "Summer Sale Promotion",
    platform: "Google Ads",
    status: "Active",
    budget: 4000,
    spend: 2800,
    roas: 3.8,
    ctr: 2.7,
  },
  {
    id: "3",
    name: "New Arrivals Campaign",
    platform: "Google Ads",
    status: "Paused",
    budget: 3500,
    spend: 1200,
    roas: 3.5,
    ctr: 2.5,
  },
  {
    id: "4",
    name: "Holiday Special",
    platform: "Google Ads",
    status: "Scheduled",
    budget: 6000,
    spend: 0,
    roas: 0,
    ctr: 0,
  },
  {
    id: "5",
    name: "Brand Awareness",
    platform: "Google Ads",
    status: "Active",
    budget: 2500,
    spend: 1800,
    roas: 2.1,
    ctr: 1.9,
  },
]

