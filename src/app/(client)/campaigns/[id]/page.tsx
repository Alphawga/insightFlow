'use client';

import { useState } from "react";
import { useParams } from "next/navigation";
import { AdGroupList } from "@/components/campaigns/ad-group-list";
import { AdGroupForm } from "@/components/campaigns/ad-group-form";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { trpc } from "@/app/_providers/trpc-provider";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

const statusColors = {
  ENABLED: "bg-green-500",
  PAUSED: "bg-yellow-500",
  REMOVED: "bg-red-500",
};

export default function CampaignDetailsPage() {
  const params = useParams();
  const campaignId = params.id as string;

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editAdGroupId, setEditAdGroupId] = useState<string | null>(null);

  const { data: campaign, isLoading } = trpc.getCampaign.useQuery(
    { campaignId },
    { enabled: !!campaignId }
  );

  const handleCreateSuccess = () => {
    setIsCreateDialogOpen(false);
  };

  const handleEditSuccess = () => {
    setEditAdGroupId(null);
  };

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid gap-4">
          <Skeleton className="h-[400px]" />
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Campaign not found</h2>
          <p className="text-muted-foreground">
            The campaign you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight">
            {campaign.name}
          </h2>
          <div className="flex items-center space-x-2">
            <Badge
              variant="secondary"
              className={statusColors[campaign.status]}
            >
              {campaign.status.toLowerCase()}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Daily Budget: ${campaign.budget.toLocaleString()}
            </span>
          </div>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <Icons.plus className="mr-2 h-4 w-4" />
          New Ad Group
        </Button>
      </div>

      <AdGroupList
        campaignId={campaignId}
        onCreateClick={() => setIsCreateDialogOpen(true)}
        onEditClick={(id) => setEditAdGroupId(id)}
      />

      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create Ad Group</DialogTitle>
          </DialogHeader>
          <AdGroupForm
            campaignId={campaignId}
            onSuccess={handleCreateSuccess}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!editAdGroupId}
        onOpenChange={() => setEditAdGroupId(null)}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Ad Group</DialogTitle>
          </DialogHeader>
          {editAdGroupId && (
            <AdGroupForm
              campaignId={campaignId}
              adGroupId={editAdGroupId}
              onSuccess={handleEditSuccess}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 