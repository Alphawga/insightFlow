"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Edit, Copy, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function NotificationTemplatesTable() {
  const [searchTerm, setSearchTerm] = useState("")

  // Filter templates based on search term
  const filteredTemplates = templates.filter(
    (template) =>
      template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      template.channel.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search templates..."
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
              <TableHead>Template Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTemplates.map((template) => (
              <TableRow key={template.id}>
                <TableCell className="font-medium">{template.name}</TableCell>
                <TableCell>{template.type}</TableCell>
                <TableCell>
                  <Badge variant="outline">{template.channel}</Badge>
                </TableCell>
                <TableCell>{template.lastUpdated}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      template.status === "Active"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }
                  >
                    {template.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Template
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="mr-2 h-4 w-4" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>Preview</DropdownMenuItem>
                      <DropdownMenuItem>Send Test</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

const templates = [
  {
    id: "1",
    name: "Welcome Email",
    type: "Onboarding",
    channel: "Email",
    lastUpdated: "Jun 10, 2023",
    status: "Active",
  },
  {
    id: "2",
    name: "Password Reset",
    type: "Account",
    channel: "Email",
    lastUpdated: "Jun 5, 2023",
    status: "Active",
  },
  {
    id: "3",
    name: "Subscription Confirmation",
    type: "Billing",
    channel: "Email",
    lastUpdated: "May 28, 2023",
    status: "Active",
  },
  {
    id: "4",
    name: "Campaign Performance Alert",
    type: "Alert",
    channel: "Email",
    lastUpdated: "May 20, 2023",
    status: "Active",
  },
  {
    id: "5",
    name: "Budget Threshold Alert",
    type: "Alert",
    channel: "In-App",
    lastUpdated: "May 15, 2023",
    status: "Active",
  },
  {
    id: "6",
    name: "Weekly Performance Report",
    type: "Report",
    channel: "Email",
    lastUpdated: "May 10, 2023",
    status: "Active",
  },
  {
    id: "7",
    name: "Account Upgrade Offer",
    type: "Marketing",
    channel: "Email",
    lastUpdated: "May 5, 2023",
    status: "Draft",
  },
  {
    id: "8",
    name: "New Feature Announcement",
    type: "Product",
    channel: "In-App",
    lastUpdated: "May 1, 2023",
    status: "Active",
  },
]

