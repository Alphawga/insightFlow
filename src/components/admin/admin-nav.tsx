"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Bell, CreditCard, Globe, Home, LogOut, Settings, Shield, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AdminNav() {
  const pathname = usePathname()

  return (
    <div className="flex h-full w-full flex-col border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <Shield className="h-6 w-6" />
          <span className="text-lg font-bold">Admin Panel</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link href="/admin">
            <Button variant={pathname === "/admin" ? "secondary" : "ghost"} className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/users">
            <Button variant={pathname === "/admin/users" ? "secondary" : "ghost"} className="w-full justify-start">
              <Users className="mr-2 h-4 w-4" />
              User Management
            </Button>
          </Link>
          <Link href="/admin/revenue">
            <Button variant={pathname === "/admin/revenue" ? "secondary" : "ghost"} className="w-full justify-start">
              <CreditCard className="mr-2 h-4 w-4" />
              Revenue & Billing
            </Button>
          </Link>
          <Link href="/admin/analytics">
            <Button variant={pathname === "/admin/analytics" ? "secondary" : "ghost"} className="w-full justify-start">
              <BarChart3 className="mr-2 h-4 w-4" />
              Analytics
            </Button>
          </Link>
          <Link href="/admin/integrations">
            <Button
              variant={pathname === "/admin/integrations" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Globe className="mr-2 h-4 w-4" />
              Integrations
            </Button>
          </Link>
          <Link href="/admin/notifications">
            <Button
              variant={pathname === "/admin/notifications" ? "secondary" : "ghost"}
              className="w-full justify-start"
            >
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant={pathname === "/admin/settings" ? "secondary" : "ghost"} className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" />
              System Settings
            </Button>
          </Link>
        </nav>
      </div>
      <div className="mt-auto p-4">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/logout">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Link>
        </Button>
      </div>
    </div>
  )
}

