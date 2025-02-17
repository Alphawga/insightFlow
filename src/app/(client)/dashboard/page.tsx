'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { trpc } from '@/app/_providers/trpc-provider';
import type { AdAccount } from '@prisma/client';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { data: userWorkspace } = trpc.getUserWorkspace.useQuery(
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

    const hasGoogleAds = userWorkspace.workspace.adAccounts.some(
      (account: AdAccount) => account.platform === 'GOOGLE_ADS'
    );
      
      if (!hasGoogleAds) {
      redirect('/onboarding');
    }
  }, [status, userWorkspace]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Dashboard content */}
    </div>
  );
}

