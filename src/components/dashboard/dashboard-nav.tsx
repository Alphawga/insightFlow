"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Bell, CreditCard, Globe, Home, LineChart, LogOut, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-full flex-col border-r bg-muted/40 max-h-screen ">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-lg font-bold">InsightFlow</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link href="/dashboard">
            <Button variant={pathname === "/dashboard" ? "secondary" : "ghost"} className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/campaigns">
            <Button
              variant={pathname === "/dashboard/campaigns" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Campaigns
            </Button>
          </Link>
          <Link href="/dashboard/geo">
            <Button variant={pathname === "/dashboard/geo" ? "secondary" : "ghost"} className="w-full justify-start">
              <Globe className="mr-2 h-4 w-4" />
              Geo Performance
            </Button>
          </Link>
          <Link href="/dashboard/customers">
            <Button
              variant={pathname === "/dashboard/customers" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Users className="mr-2 h-4 w-4" />
              Customer LTV
            </Button>
          </Link>
          <Link href="/dashboard/competitors">
            <Button
              variant={pathname === "/dashboard/competitors" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <LineChart className="mr-2 h-4 w-4" />
              Competitors
            </Button>
          </Link>
          <Link href="/dashboard/alerts">
            <Button variant={pathname === "/dashboard/alerts" ? "secondary" : "ghost"} className="w-full justify-start">
              <Bell className="mr-2 h-4 w-4" />
              Alerts
            </Button>
          </Link>
          <Link href="/dashboard/billing">
            <Button
              variant={pathname === "/dashboard/billing" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <CreditCard className="mr-2 h-4 w-4" />
              Billing
            </Button>
          </Link>
          <Link href="/dashboard/settings">
            <Button
              variant={pathname === "/dashboard/settings" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/auth/login">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Link>
        </Button>
      </div>
    </div>
  )
}

