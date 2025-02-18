import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { trpc } from "@/app/_providers/trpc-provider";
import { Skeleton } from "@/components/ui/skeleton";
import { useDateRange } from "./date-range-context";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  trend?: number;
  icon: keyof typeof Icons;
}

function MetricCard({ title, value, description, trend, icon }: MetricCardProps) {
  const Icon = Icons[icon];
  const trendColor = trend && trend > 0 ? "text-green-500" : "text-red-500";

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
        {trend && (
          <div className={`text-xs mt-1 ${trendColor}`}>
            {trend > 0 ? "+" : ""}{trend.toFixed(1)}% from last period
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function MetricCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-16 mb-2" />
        <Skeleton className="h-3 w-32" />
      </CardContent>
    </Card>
  );
}

export function MetricsOverview() {
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Click-Through Rate"
        value={`${metrics?.overview.ctr}%`}
        description="Average CTR across all campaigns"
        trend={metrics?.overview.trends.ctr}
        icon="lineChart"
      />
      <MetricCard
        title="Cost Per Click"
        value={`$${metrics?.overview.cpc}`}
        description="Average CPC across all campaigns"
        trend={metrics?.overview.trends.cpc}
        icon="layoutDashboard"
      />
      <MetricCard
        title="Conversions"
        value={metrics?.overview.conversions.toLocaleString() || "0"}
        description="Total conversions this period"
        trend={metrics?.overview.trends.conversions}
        icon="megaphone"
      />
      <MetricCard
        title="ROAS"
        value={`${metrics?.overview.roas}x`}
        description="Return on ad spend"
        trend={metrics?.overview.trends.roas}
        icon="lineChart"
      />
    </div>
  );
} 