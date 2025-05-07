"use client"

import { ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { trpc } from "@/lib/trpc"
import Link from "next/link"

interface RecentCampaignsProps {
  workspaceId: string
}

export function RecentCampaigns({ workspaceId }: RecentCampaignsProps) {
  const { data: campaigns, isLoading } = trpc.getCampaigns.useQuery({
    workspaceId
  })

  // Sort campaigns by conversions (or another metric) and take top 4
  const topCampaigns = campaigns
    ?.sort((a, b) => (b.conversions || 0) - (a.conversions || 0))
    ?.slice(0, 4) || []

  if (isLoading) {
    return (
      <div className="space-y-8">
        {Array(4).fill(0).map((_, i) => (
          <div key={i} className="flex items-center">
            <div className="ml-4 space-y-1">
              <div className="h-4 w-32 animate-pulse bg-muted"></div>
              <div className="h-4 w-48 animate-pulse bg-muted"></div>
            </div>
            <div className="ml-auto w-16 h-4 animate-pulse bg-muted"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {topCampaigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="text-sm text-muted-foreground">No campaigns found</p>
          <Button variant="outline" className="mt-4" size="sm">
            Create Campaign
          </Button>
        </div>
      ) : (
        <>
          {topCampaigns.map((campaign) => (
            <div key={campaign.id} className="flex items-center">
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none">{campaign.name}</p>
                <p className="text-sm text-muted-foreground">
                  ROAS: {campaign.conversions && campaign.spent > 0 
                    ? ((campaign.conversions / campaign.spent) * 100).toFixed(1) 
                    : '0.0'}x • CTR: {campaign.impressions > 0 
                    ? ((campaign.clicks / campaign.impressions) * 100).toFixed(1) 
                    : '0.0'}%
                </p>
              </div>
              <div className="ml-auto font-medium">${campaign.spent?.toFixed(2) || '0.00'}</div>
            </div>
          ))}
          <Link href="/dashboard/campaigns">
            <Button variant="outline" className="w-full" size="sm">
              View All Campaigns
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </>
      )}
    </div>
  )
}

