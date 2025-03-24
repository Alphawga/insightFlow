import { ArrowUpRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export function RecentCampaigns() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Spring Collection</p>
          <p className="text-sm text-muted-foreground">ROAS: 4.2x • CTR: 3.1%</p>
        </div>
        <div className="ml-auto font-medium">$4,200</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Summer Sale</p>
          <p className="text-sm text-muted-foreground">ROAS: 3.8x • CTR: 2.7%</p>
        </div>
        <div className="ml-auto font-medium">$3,800</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">New Arrivals</p>
          <p className="text-sm text-muted-foreground">ROAS: 3.5x • CTR: 2.5%</p>
        </div>
        <div className="ml-auto font-medium">$2,900</div>
      </div>
      <div className="flex items-center">
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Holiday Special</p>
          <p className="text-sm text-muted-foreground">ROAS: 3.2x • CTR: 2.3%</p>
        </div>
        <div className="ml-auto font-medium">$2,400</div>
      </div>
      <Button variant="outline" className="w-full" size="sm">
        View All Campaigns
        <ArrowUpRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  )
}

