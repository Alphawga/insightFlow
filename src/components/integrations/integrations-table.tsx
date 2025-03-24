"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Settings, Plus } from "lucide-react"

export function IntegrationsTable() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter integrations based on search term
  const filteredIntegrations = integrations.filter(
    (integration) =>
      integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      integration.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search integrations..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredIntegrations.map((integration) => (
              <TableRow key={integration.id}>
                <TableCell className="font-medium">{integration.name}</TableCell>
                <TableCell>{integration.category}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      integration.status === "Connected"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : integration.status === "Setup Required"
                          ? "bg-amber-50 text-amber-700 border-amber-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                    }
                  >
                    {integration.status}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-md">{integration.description}</TableCell>
                <TableCell className="text-right">
                  {integration.status === "Connected" ? (
                    <Button variant="outline" size="sm">
                      <Settings className="mr-2 h-4 w-4" />
                      Configure
                    </Button>
                  ) : (
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Connect
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

const integrations = [
  {
    id: "1",
    name: "Google Ads",
    category: "Advertising",
    status: "Connected",
    description: "Sync Google Ads campaign data and performance metrics",
  },
  {
    id: "2",
    name: "Facebook Ads",
    category: "Advertising",
    status: "Connected",
    description: "Sync Facebook Ads campaign data and performance metrics",
  },
  {
    id: "3",
    name: "Instagram Ads",
    category: "Advertising",
    status: "Connected",
    description: "Sync Instagram Ads campaign data and performance metrics",
  },
  {
    id: "4",
    name: "Amazon Ads",
    category: "Advertising",
    status: "Setup Required",
    description: "Sync Amazon Ads campaign data and performance metrics",
  },
  {
    id: "5",
    name: "Shopify",
    category: "E-commerce",
    status: "Connected",
    description: "Sync Shopify store data, orders, and customer information",
  },
  {
    id: "6",
    name: "Slack",
    category: "Communication",
    status: "Connected",
    description: "Send notifications and alerts to Slack channels",
  },
  {
    id: "7",
    name: "WooCommerce",
    category: "E-commerce",
    status: "Available",
    description: "Sync WooCommerce store data, orders, and customer information",
  },
  {
    id: "8",
    name: "Mailchimp",
    category: "Email Marketing",
    status: "Available",
    description: "Sync email campaign data and performance metrics",
  },
  {
    id: "9",
    name: "HubSpot",
    category: "CRM",
    status: "Available",
    description: "Sync customer data and marketing campaign information",
  },
  {
    id: "10",
    name: "Zapier",
    category: "Automation",
    status: "Available",
    description: "Connect with thousands of apps through Zapier automations",
  },
]

