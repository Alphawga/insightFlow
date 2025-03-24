import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

export function InvoicesList() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.invoice}</TableCell>
              <TableCell>{invoice.date}</TableCell>
              <TableCell>${invoice.amount}</TableCell>
              <TableCell>
                <div
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    invoice.status === "Paid"
                      ? "bg-green-100 text-green-800"
                      : invoice.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {invoice.status}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                  <span className="sr-only">Download</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

const invoices = [
  {
    id: "1",
    invoice: "INV-001",
    date: "May 15, 2023",
    amount: "99.00",
    status: "Paid",
  },
  {
    id: "2",
    invoice: "INV-002",
    date: "Apr 15, 2023",
    amount: "99.00",
    status: "Paid",
  },
  {
    id: "3",
    invoice: "INV-003",
    date: "Mar 15, 2023",
    amount: "99.00",
    status: "Paid",
  },
  {
    id: "4",
    invoice: "INV-004",
    date: "Feb 15, 2023",
    amount: "99.00",
    status: "Paid",
  },
  {
    id: "5",
    invoice: "INV-005",
    date: "Jan 15, 2023",
    amount: "99.00",
    status: "Paid",
  },
  {
    id: "6",
    invoice: "INV-006",
    date: "Dec 15, 2022",
    amount: "99.00",
    status: "Paid",
  },
]

