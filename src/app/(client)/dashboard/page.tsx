'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { trpc } from '@/app/_providers/trpc-provider';
import type { AdAccount } from '@prisma/client';
import { MetricsOverview } from '@/components/dashboard/metrics-overview';
import { CampaignBreakdown } from '@/components/dashboard/campaign-breakdown';
import { DevicePerformance } from '@/components/dashboard/device-performance';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

function LoadingState() {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="mt-4 h-8 w-24" />
          </Card>
        ))}
      </div>
      <Card className="p-6">
        <Skeleton className="h-4 w-48 mb-4" />
        <Skeleton className="h-32 w-full" />
      </Card>
      <Card className="p-6">
        <Skeleton className="h-4 w-48 mb-4" />
        <div className="grid gap-4 md:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full" />
          ))}
        </div>
      </Card>
    </div>
  );
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { data: userWorkspace, isLoading } = trpc.getUserWorkspace.useQuery(
    undefined,
    {
      enabled: !!session?.user,
    }
  );

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/auth/login');
    }

    if (!userWorkspace) {
      redirect('/onboarding');
    }

    const hasGoogleAds = userWorkspace?.workspace.adAccounts.some(
      (account: AdAccount) => account.platform === 'GOOGLE_ADS'
    );
      
    if (!hasGoogleAds) {
      redirect('/onboarding');
    }
  }, [status, userWorkspace]);

  if (status === 'loading' || isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date().toLocaleString()}
        </p>
      </div>

      <MetricsOverview />
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="md:col-span-4">
          <CampaignBreakdown />
        </div>
        <div className="md:col-span-3">
          <DevicePerformance />
        </div>
      </div>
    </div>
  );
}

