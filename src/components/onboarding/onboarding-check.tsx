'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { trpc } from '@/app/_providers/trpc-provider';

interface OnboardingCheckProps {
  children: React.ReactNode;
}

export function OnboardingCheck({ children }: OnboardingCheckProps) {
  const router = useRouter();
  const { status, data: session } = useSession();
  

  const { data: onboardingStatus, isLoading } = trpc.getOnboardingStatus.useQuery(
    undefined,
    { 
      enabled: status === 'authenticated',
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
   console.log("onboardingStatus", onboardingStatus);
    if (
      status === 'authenticated' && 
      !isLoading && 
      onboardingStatus && 
      !onboardingStatus.isComplete
    ) {
      router.push(`/onboarding?step=${onboardingStatus.currentStep}`);
    }
  }, [status, isLoading, onboardingStatus, router]);


  if (status === 'loading' || (status === 'authenticated' && isLoading)) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-orange-500" />
      </div>
    );
  }

  
  if (status === 'unauthenticated') {
    router.push('/auth/login');
    return null;
  }


  return <>{children}</>;
} 