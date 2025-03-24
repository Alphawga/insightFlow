import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export function CustomerCohortTable() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Cohort</TableHead>
            <TableHead>Month 1</TableHead>
            <TableHead>Month 2</TableHead>
            <TableHead>Month 3</TableHead>
            <TableHead>Month 6</TableHead>
            <TableHead>Month 12</TableHead>
            <TableHead>Avg LTV</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Jan 2023</TableCell>
            <TableCell className="bg-green-50">100%</TableCell>
            <TableCell className="bg-green-50">78%</TableCell>
            <TableCell className="bg-green-50">65%</TableCell>
            <TableCell className="bg-green-50">52%</TableCell>
            <TableCell className="bg-green-50">38%</TableCell>
            <TableCell>$512</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Feb 2023</TableCell>
            <TableCell className="bg-green-50">100%</TableCell>
            <TableCell className="bg-green-50">75%</TableCell>
            <TableCell className="bg-green-50">62%</TableCell>
            <TableCell className="bg-green-50">48%</TableCell>
            <TableCell className="bg-green-50">35%</TableCell>
            <TableCell>$485</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Mar 2023</TableCell>
            <TableCell className="bg-green-50">100%</TableCell>
            <TableCell className="bg-green-50">80%</TableCell>
            <TableCell className="bg-green-50">68%</TableCell>
            <TableCell className="bg-green-50">55%</TableCell>
            <TableCell>-</TableCell>
            <TableCell>$470</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Apr 2023</TableCell>
            <TableCell className="bg-green-50">100%</TableCell>
            <TableCell className="bg-green-50">82%</TableCell>
            <TableCell className="bg-green-50">70%</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>$425</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">May 2023</TableCell>
            <TableCell className="bg-green-50">100%</TableCell>
            <TableCell className="bg-green-50">85%</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>$380</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Jun 2023</TableCell>
            <TableCell className="bg-green-50">100%</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>-</TableCell>
            <TableCell>$210</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

