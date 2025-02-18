import { format } from "date-fns";
import { useState, useEffect } from "react";
import { MetricsOverview } from "./metrics-overview";
import { CampaignBreakdown } from "./campaign-breakdown";
import { DevicePerformance } from "./device-performance";
import { DateRangeProvider } from "./date-range-context";
import { DateRangeSelector } from "./date-range-selector";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";

const AUTO_REFRESH_INTERVAL = 30000; // 30 seconds

export function DashboardPage() {
  const [isAutoRefresh, setIsAutoRefresh] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const queryClient = useQueryClient();

  const handleRefresh = () => {
    queryClient.invalidateQueries(["getDashboardMetrics"]);
    queryClient.invalidateQueries(["getUserWorkspace"]);
    setLastUpdated(new Date());
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isAutoRefresh) {
      interval = setInterval(() => {
        handleRefresh();
      }, AUTO_REFRESH_INTERVAL);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isAutoRefresh, queryClient]);

  return (
    <DateRangeProvider>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex flex-col space-y-2 md:flex-row md:items-center md:space-x-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <Switch
                id="auto-refresh"
                checked={isAutoRefresh}
                onCheckedChange={setIsAutoRefresh}
              />
              <Label htmlFor="auto-refresh">Auto-refresh</Label>
            </div>
            <DateRangeSelector
              onChange={() => {
                // The date range context will handle the state
              }}
            />
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              className="h-9 w-9"
            >
              <Icons.refresh className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-end">
          <p className="text-sm text-muted-foreground">
            Last updated: {format(lastUpdated, "MMM d, yyyy HH:mm:ss")}
          </p>
        </div>
        <div className="space-y-4">
          <MetricsOverview />
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
            <div className="col-span-1 md:col-span-2 lg:col-span-4">
              <CampaignBreakdown />
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <DevicePerformance />
            </div>
          </div>
        </div>
      </div>
    </DateRangeProvider>
  );
} 