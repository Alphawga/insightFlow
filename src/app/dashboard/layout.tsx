import { OnboardingCheck } from '@/components/onboarding/onboarding-check';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <OnboardingCheck>
      {children}
    </OnboardingCheck>
  );
}
