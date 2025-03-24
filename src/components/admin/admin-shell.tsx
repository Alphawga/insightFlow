import type React from "react"
import { AdminNav } from "@/components/admin/admin-nav"

interface AdminShellProps {
  children: React.ReactNode
}

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <AdminNav />
      <main className="flex w-full flex-col overflow-hidden">
        <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
      </main>
    </div>
  )
}

