"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Download, Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function BillingHistoryTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter transactions based on search term and status filter
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.email.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
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
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="refunded">Refunded</SelectItem>
            </SelectContent>
          </Select>
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
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="font-medium">{transaction.id}</TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.customer}</TableCell>
                <TableCell>{transaction.email}</TableCell>
                <TableCell>${transaction.amount}</TableCell>
                <TableCell>{transaction.plan}</TableCell>
                <TableCell>
                  <div
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      transaction.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : transaction.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : transaction.status === "failed"
                            ? "bg-red-100 text-red-800"
                            : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

const transactions = [
  {
    id: "INV-001-28756",
    date: "Jun 15, 2023",
    customer: "Sarah Johnson",
    email: "sarah@example.com",
    amount: "99.00",
    plan: "Professional",
    status: "completed",
  },
  {
    id: "INV-001-28755",
    date: "Jun 15, 2023",
    customer: "Michael Chen",
    email: "michael@example.com",
    amount: "99.00",
    plan: "Professional",
    status: "completed",
  },
  {
    id: "INV-001-28754",
    date: "Jun 14, 2023",
    customer: "Emily Rodriguez",
    email: "emily@example.com",
    amount: "299.00",
    plan: "Enterprise",
    status: "completed",
  },
  {
    id: "INV-001-28753",
    date: "Jun 14, 2023",
    customer: "David Kim",
    email: "david@example.com",
    amount: "49.00",
    plan: "Basic",
    status: "pending",
  },
  {
    id: "INV-001-28752",
    date: "Jun 13, 2023",
    customer: "Jessica Patel",
    email: "jessica@example.com",
    amount: "99.00",
    plan: "Professional",
    status: "completed",
  },
  {
    id: "INV-001-28751",
    date: "Jun 13, 2023",
    customer: "Robert Wilson",
    email: "robert@example.com",
    amount: "49.00",
    plan: "Basic",
    status: "failed",
  },
  {
    id: "INV-001-28750",
    date: "Jun 12, 2023",
    customer: "Lisa Thompson",
    email: "lisa@example.com",
    amount: "99.00",
    plan: "Professional",
    status: "completed",
  },
  {
    id: "INV-001-28749",
    date: "Jun 12, 2023",
    customer: "James Anderson",
    email: "james@example.com",
    amount: "299.00",
    plan: "Enterprise",
    status: "refunded",
  },
  {
    id: "INV-001-28748",
    date: "Jun 11, 2023",
    customer: "Jennifer Martinez",
    email: "jennifer@example.com",
    amount: "99.00",
    plan: "Professional",
    status: "completed",
  },
  {
    id: "INV-001-28747",
    date: "Jun 11, 2023",
    customer: "Daniel Taylor",
    email: "daniel@example.com",
    amount: "49.00",
    plan: "Basic",
    status: "completed",
  },
]

