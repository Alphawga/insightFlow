import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { trpc } from "@/app/_providers/trpc-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { useDateRange } from "./date-range-context";

const deviceIcons: Record<string, keyof typeof Icons> = {
  DESKTOP: "monitor",
  MOBILE: "smartphone",
  TABLET: "tablet",
};

const deviceNames: Record<string, string> = {
  DESKTOP: "Desktop",
  MOBILE: "Mobile",
  TABLET: "Tablet",
};

function DeviceMetricsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col space-y-2 p-4 border rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-4 w-20" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[...Array(4)].map((_, j) => (
              <div key={j}>
                <Skeleton className="h-3 w-16 mb-1" />
                <Skeleton className="h-4 w-12" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function DevicePerformance() {
  const { dateRange } = useDateRange();
  const { data: userWorkspace } = trpc.getUserWorkspace.useQuery();
  const { data: metrics, isLoading } = trpc.getDashboardMetrics.useQuery(
    {
      workspaceId: userWorkspace?.workspace.id!,
      dateRange: {
        startDate: dateRange.from,
        endDate: dateRange.to,
      },
    },
    {
      enabled: !!userWorkspace?.workspace.id,
    }
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Device Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <DeviceMetricsSkeleton />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Device Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-3">
          {metrics?.deviceMetrics.map((metric) => {
            const Icon = Icons[deviceIcons[metric.device]];
            return (
              <div
                key={metric.device}
                className="flex flex-col space-y-2 p-4 border rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5 text-muted-foreground" />
                  <h3 className="text-sm font-medium">
                    {deviceNames[metric.device]}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-muted-foreground">Impressions</p>
                    <p className="font-medium">
                      {metric.impressions.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Clicks</p>
                    <p className="font-medium">
                      {metric.clicks.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Conversions</p>
                    <p className="font-medium">
                      {metric.conversions.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">CTR</p>
                    <p className="font-medium">{metric.ctr}%</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
} 