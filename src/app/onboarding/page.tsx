import { OnboardingSteps } from '@/components/onboarding/onboarding-steps';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function OnboardingPage() {
  const session = await getServerSession();

  if (!session?.user) {
    redirect('/auth/login');
  }

  return (
    <main className="min-h-screen bg-background">
      <OnboardingSteps />
    </main>
  );
} 