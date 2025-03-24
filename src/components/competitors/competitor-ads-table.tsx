import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export function CompetitorAdsTable() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Competitor</TableHead>
            <TableHead>Ad Copy</TableHead>
            <TableHead>Landing Page</TableHead>
            <TableHead>First Seen</TableHead>
            <TableHead>Keywords</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Competitor A</TableCell>
            <TableCell className="max-w-md">
              <div className="space-y-1">
                <p className="font-medium text-blue-600">Premium Widgets - Industry Leading Quality</p>
                <p className="text-sm">
                  Experience the difference with our premium widgets. Trusted by professionals worldwide. Free shipping
                  on orders over $50.
                </p>
              </div>
            </TableCell>
            <TableCell>competitora.com/premium</TableCell>
            <TableCell>Mar 15, 2023</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">premium</Badge>
                <Badge variant="outline">quality</Badge>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Competitor B</TableCell>
            <TableCell className="max-w-md">
              <div className="space-y-1">
                <p className="font-medium text-blue-600">Eco-Friendly Widgets - Sustainable Choice</p>
                <p className="text-sm">
                  Our eco-friendly widgets are made from 100% recycled materials. Join us in protecting the planet while
                  enjoying top performance.
                </p>
              </div>
            </TableCell>
            <TableCell>competitorb.com/eco</TableCell>
            <TableCell>Apr 2, 2023</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">eco-friendly</Badge>
                <Badge variant="outline">sustainable</Badge>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Competitor C</TableCell>
            <TableCell className="max-w-md">
              <div className="space-y-1">
                <p className="font-medium text-blue-600">Widgets at Unbeatable Prices - 15% Off</p>
                <p className="text-sm">
                  Why pay more? Get the same quality widgets at prices that won't break the bank. Limited time offer:
                  15% off all products.
                </p>
              </div>
            </TableCell>
            <TableCell>competitorc.com/sale</TableCell>
            <TableCell>May 10, 2023</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">affordable</Badge>
                <Badge variant="outline">discount</Badge>
              </div>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Competitor A</TableCell>
            <TableCell className="max-w-md">
              <div className="space-y-1">
                <p className="font-medium text-blue-600">New Collection: Advanced Widgets 2023</p>
                <p className="text-sm">
                  Introducing our latest innovation in widget technology. More power, less energy, better results.
                  Pre-order now for early access.
                </p>
              </div>
            </TableCell>
            <TableCell>competitora.com/new</TableCell>
            <TableCell>Jun 5, 2023</TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1">
                <Badge variant="outline">new</Badge>
                <Badge variant="outline">advanced</Badge>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

