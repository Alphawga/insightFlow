import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Separator } from "@/components/ui/separator"
import { ProfileForm } from "@/components/settings/profile-form"
import { NotificationsForm } from "@/components/settings/notifications-form"

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your account settings and preferences." />
      <div className="grid gap-10">
        <div>
          <h3 className="text-lg font-medium">Profile</h3>
          <p className="text-sm text-muted-foreground">
            Update your personal information and how others see you on the platform.
          </p>
          <Separator className="my-6" />
          <ProfileForm />
        </div>
        <div>
          <h3 className="text-lg font-medium">Notifications</h3>
          <p className="text-sm text-muted-foreground">Configure how you receive notifications and alerts.</p>
          <Separator className="my-6" />
          <NotificationsForm />
        </div>
      </div>
    </DashboardShell>
  )
}

