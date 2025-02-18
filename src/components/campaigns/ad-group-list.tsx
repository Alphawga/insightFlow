import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { trpc } from "@/app/_providers/trpc-provider";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusColors = {
  ENABLED: "bg-green-500",
  PAUSED: "bg-yellow-500",
  REMOVED: "bg-red-500",
};

interface AdGroupListProps {
  campaignId: string;
  onCreateClick: () => void;
  onEditClick: (id: string) => void;
}

function AdGroupTableSkeleton() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead><Skeleton className="h-4 w-24" /></TableHead>
          <TableHead><Skeleton className="h-4 w-16" /></TableHead>
          <TableHead><Skeleton className="h-4 w-16" /></TableHead>
          <TableHead><Skeleton className="h-4 w-16" /></TableHead>
          <TableHead><Skeleton className="h-4 w-20" /></TableHead>
          <TableHead><Skeleton className="h-4 w-16" /></TableHead>
          <TableHead><Skeleton className="h-4 w-16" /></TableHead>
          <TableHead><Skeleton className="h-4 w-12" /></TableHead>
          <TableHead><Skeleton className="h-4 w-8" /></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[...Array(3)].map((_, i) => (
          <TableRow key={i}>
            <TableCell><Skeleton className="h-4 w-32" /></TableCell>
            <TableCell><Skeleton className="h-4 w-16" /></TableCell>
            <TableCell><Skeleton className="h-4 w-16" /></TableCell>
            <TableCell><Skeleton className="h-4 w-16" /></TableCell>
            <TableCell><Skeleton className="h-4 w-20" /></TableCell>
            <TableCell><Skeleton className="h-4 w-16" /></TableCell>
            <TableCell><Skeleton className="h-4 w-16" /></TableCell>
            <TableCell><Skeleton className="h-4 w-12" /></TableCell>
            <TableCell><Skeleton className="h-4 w-8" /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export function AdGroupList({ campaignId, onCreateClick, onEditClick }: AdGroupListProps) {
  const { data: adGroups, isLoading } = trpc.getAdGroups.useQuery(
    { campaignId },
    { enabled: !!campaignId }
  );

  const updateAdGroupStatus = trpc.updateAdGroupStatus.useMutation({
    onSuccess: () => {
      // Refetch ad groups after status update
      queryClient.invalidateQueries(["getAdGroups", { campaignId }]);
    },
  });

  if (isLoading) {
    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Ad Groups</CardTitle>
          <Button disabled>
            <Icons.plus className="mr-2 h-4 w-4" />
            New Ad Group
          </Button>
        </CardHeader>
        <CardContent>
          <AdGroupTableSkeleton />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Ad Groups</CardTitle>
        <Button onClick={onCreateClick}>
          <Icons.plus className="mr-2 h-4 w-4" />
          New Ad Group
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ad Group</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>CPC Bid</TableHead>
              <TableHead>Impressions</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>CTR</TableHead>
              <TableHead>Avg. CPC</TableHead>
              <TableHead>Conversions</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adGroups?.map((adGroup) => {
              const ctr = ((adGroup.clicks / adGroup.impressions) * 100).toFixed(2);
              const avgCpc = (adGroup.cost / adGroup.clicks).toFixed(2);
              
              return (
                <TableRow key={adGroup.id}>
                  <TableCell className="font-medium">{adGroup.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={statusColors[adGroup.status]}>
                      {adGroup.status.toLowerCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>${adGroup.cpcBid.toFixed(2)}</TableCell>
                  <TableCell>{adGroup.impressions.toLocaleString()}</TableCell>
                  <TableCell>{adGroup.clicks.toLocaleString()}</TableCell>
                  <TableCell>{ctr}%</TableCell>
                  <TableCell>${avgCpc}</TableCell>
                  <TableCell>{adGroup.conversions.toLocaleString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Icons.moreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditClick(adGroup.id)}>
                          Edit
                        </DropdownMenuItem>
                        {adGroup.status === "ENABLED" ? (
                          <DropdownMenuItem
                            onClick={() =>
                              updateAdGroupStatus.mutate({
                                adGroupId: adGroup.id,
                                status: "PAUSED",
                              })
                            }
                          >
                            Pause
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() =>
                              updateAdGroupStatus.mutate({
                                adGroupId: adGroup.id,
                                status: "ENABLED",
                              })
                            }
                          >
                            Enable
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() =>
                            updateAdGroupStatus.mutate({
                              adGroupId: adGroup.id,
                              status: "REMOVED",
                            })
                          }
                          className="text-red-600"
                        >
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
} 