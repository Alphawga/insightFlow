"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, MoreHorizontal } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function NotificationLogsTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter logs based on search term and status filter
  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.template.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.channel.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || log.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search logs..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="opened">Opened</SelectItem>
              <SelectItem value="clicked">Clicked</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Template</TableHead>
              <TableHead>Channel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell>{log.timestamp}</TableCell>
                <TableCell className="font-medium">{log.recipient}</TableCell>
                <TableCell>{log.template}</TableCell>
                <TableCell>
                  <Badge variant="outline">{log.channel}</Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      log.status === "delivered"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : log.status === "opened" || log.status === "clicked"
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "bg-red-50 text-red-700 border-red-200"
                    }
                  >
                    {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
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
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem>Resend</DropdownMenuItem>
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

const logs = [
  {
    id: "1",
    timestamp: "Jun 15, 2023 14:32:15",
    recipient: "sarah@example.com",
    template: "Welcome Email",
    channel: "Email",
    status: "opened",
  },
  {
    id: "2",
    timestamp: "Jun 15, 2023 13:45:22",
    recipient: "michael@example.com",
    template: "Password Reset",
    channel: "Email",
    status: "delivered",
  },
  {
    id: "3",
    timestamp: "Jun 15, 2023 11:28:05",
    recipient: "emily@example.com",
    template: "Subscription Confirmation",
    channel: "Email",
    status: "clicked",
  },
  {
    id: "4",
    timestamp: "Jun 15, 2023 10:15:47",
    recipient: "david@example.com",
    template: "Campaign Performance Alert",
    channel: "In-App",
    status: "delivered",
  },
  {
    id: "5",
    timestamp: "Jun 14, 2023 16:52:33",
    recipient: "jessica@example.com",
    template: "Budget Threshold Alert",
    channel: "Email",
    status: "delivered",
  },
  {
    id: "6",
    timestamp: "Jun 14, 2023 15:10:19",
    recipient: "robert@example.com",
    template: "Weekly Performance Report",
    channel: "Email",
    status: "failed",
  },
  {
    id: "7",
    timestamp: "Jun 14, 2023 14:05:42",
    recipient: "lisa@example.com",
    template: "New Feature Announcement",
    channel: "In-App",
    status: "delivered",
  },
  {
    id: "8",
    timestamp: "Jun 14, 2023 11:30:08",
    recipient: "james@example.com",
    template: "Account Upgrade Offer",
    channel: "Email",
    status: "opened",
  },
]

