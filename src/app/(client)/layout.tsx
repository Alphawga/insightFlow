'use client';


import { 
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SessionWrapper from '@/components/auth/session-wrapper';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SessionWrapper>
      <SidebarProvider>
      
          <Sidebar
            variant="sidebar"
            collapsible="icon"
            className="border-r border-sidebar-border"
          >
            <SidebarContent>
              {/* Sidebar Header */}
              <SidebarGroup className="px-4 py-4">
                <div className="flex items-center gap-2">
               
                  <span className="font-semibold text-sidebar-primary">
                    <Link href="/dashboard">InsightFlow Pro</Link>
                  </span>
                </div>
              </SidebarGroup>

              {/* Navigation Menu */}
              <SidebarGroup>
                <SidebarGroupLabel className="px-2">Navigation</SidebarGroupLabel>
                <SidebarMenu>
                  {[
                    { 
                      href: '/dashboard',
                      label: 'Dashboard',
                      icon: <Icons.layoutDashboard className="h-4 w-4" />
                    },
                    {
                      href: '/campaigns',
                      label: 'Campaigns',
                      icon: <Icons.megaphone className="h-4 w-4" />
                    },
                    {
                      href: '/analytics',
                      label: 'Analytics',
                      icon: <Icons.lineChart className="h-4 w-4" />
                    },
                    {
                      href: '/reports',
                      label: 'Reports',
                      icon: <Icons.fileText className="h-4 w-4" />
                    }
                  ].map((item) => (
                    <SidebarMenuItem key={item.href}>
                      <SidebarMenuButton
                        asChild
                        isActive={pathname === item.href}
                        tooltip={item.label}
                      >
                        <Link href={item.href}>
                          {item.icon}
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          {/* Main Content Area */}
          <div className="flex flex-1 flex-col overflow-hidden">
            {/* Header */}
            <header className="flex h-16 items-center justify-between border-b bg-background px-6">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="md:hidden">
                  <Icons.menu className="h-5 w-5" />
                </SidebarTrigger>
                <h1 className="text-lg font-semibold">Dashboard</h1>
              </div>
              
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut()}
                  className="border-sidebar-border hover:bg-sidebar-accent/20"
                >
                  Logout
                </Button>
              </div>
            </header>

            {/* Page Content */}
            <main className="flex-1 overflow-auto bg-muted/10 p-6">
              {children}
            </main>
          </div>
      
      </SidebarProvider>
    </SessionWrapper>
  );
} 