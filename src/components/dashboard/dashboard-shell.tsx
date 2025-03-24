import type React from "react"
import { DashboardNav } from "@/components/dashboard/dashboard-nav"

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <DashboardNav />
      <main className="flex w-full flex-col overflow-hidden">
        <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
      </main>
    </div>
  )
}

