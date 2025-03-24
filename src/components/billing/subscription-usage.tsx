import { Progress } from "@/components/ui/progress"

export function SubscriptionUsage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Campaigns</p>
            <p className="text-xs text-muted-foreground">5 of 25 campaigns used</p>
          </div>
          <p className="text-sm font-medium">20%</p>
        </div>
        <Progress value={20} className="h-2" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Ad Accounts</p>
            <p className="text-xs text-muted-foreground">2 of 5 ad accounts connected</p>
          </div>
          <p className="text-sm font-medium">40%</p>
        </div>
        <Progress value={40} className="h-2" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Custom Alerts</p>
            <p className="text-xs text-muted-foreground">12 of 20 custom alerts created</p>
          </div>
          <p className="text-sm font-medium">60%</p>
        </div>
        <Progress value={60} className="h-2" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Competitor Tracking</p>
            <p className="text-xs text-muted-foreground">5 of 10 competitors tracked</p>
          </div>
          <p className="text-sm font-medium">50%</p>
        </div>
        <Progress value={50} className="h-2" />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Report Exports</p>
            <p className="text-xs text-muted-foreground">8 of 50 monthly exports used</p>
          </div>
          <p className="text-sm font-medium">16%</p>
        </div>
        <Progress value={16} className="h-2" />
      </div>
    </div>
  )
}

