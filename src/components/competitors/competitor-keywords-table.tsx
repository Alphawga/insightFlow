import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function CompetitorKeywordsTable() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Keyword</TableHead>
            <TableHead>Search Volume</TableHead>
            <TableHead>CPC</TableHead>
            <TableHead>Competition</TableHead>
            <TableHead>Your Position</TableHead>
            <TableHead>Competitors</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">premium widgets</TableCell>
            <TableCell>12,500</TableCell>
            <TableCell>$2.45</TableCell>
            <TableCell>High</TableCell>
            <TableCell>3</TableCell>
            <TableCell>
              <div className="flex space-x-1">
                <Badge variant="outline">A</Badge>
                <Badge variant="outline">B</Badge>
                <Badge variant="outline">C</Badge>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">best widget provider</TableCell>
            <TableCell>8,200</TableCell>
            <TableCell>$3.10</TableCell>
            <TableCell>Medium</TableCell>
            <TableCell>1</TableCell>
            <TableCell>
              <div className="flex space-x-1">
                <Badge variant="outline">A</Badge>
                <Badge variant="outline">B</Badge>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">affordable widgets</TableCell>
            <TableCell>15,300</TableCell>
            <TableCell>$1.85</TableCell>
            <TableCell>High</TableCell>
            <TableCell>5</TableCell>
            <TableCell>
              <div className="flex space-x-1">
                <Badge variant="outline">A</Badge>
                <Badge variant="outline">C</Badge>
                <Badge variant="outline">D</Badge>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">widget comparison</TableCell>
            <TableCell>6,800</TableCell>
            <TableCell>$2.25</TableCell>
            <TableCell>Medium</TableCell>
            <TableCell>2</TableCell>
            <TableCell>
              <div className="flex space-x-1">
                <Badge variant="outline">A</Badge>
                <Badge variant="outline">B</Badge>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">eco-friendly widgets</TableCell>
            <TableCell>4,200</TableCell>
            <TableCell>$1.95</TableCell>
            <TableCell>Low</TableCell>
            <TableCell>Not ranking</TableCell>
            <TableCell>
              <div className="flex space-x-1">
                <Badge variant="outline">B</Badge>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">fast delivery widgets</TableCell>
            <TableCell>3,500</TableCell>
            <TableCell>$1.65</TableCell>
            <TableCell>Low</TableCell>
            <TableCell>Not ranking</TableCell>
            <TableCell>
              <div className="flex space-x-1">
                <Badge variant="outline">None</Badge>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

