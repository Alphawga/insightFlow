'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { api } from '@/lib/trpc/client';
import { WorkspaceForm } from './workspace-form';
import { ConversionSelector } from './conversion-selector';
import { useSearchParams } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

const STEPS = [
  {
    id: 'welcome',
    title: 'Welcome to InsightFlow Pro',
    description: "Let's get you set up with your account and start tracking your Google Ads performance.",
  },
  {
    id: 'workspace',
    title: 'Create Your Workspace',
    description: 'Create a workspace to organize your ad accounts and collaborate with your team.',
  },
  {
    id: 'connect-ads',
    title: 'Connect Google Ads',
    description: 'Connect your Google Ads account to start tracking performance.',
  },
  {
    id: 'conversion',
    title: 'Select Key Conversions',
    description: 'Choose which conversion actions are most important for your business.',
  },
  {
    id: 'complete',
    title: "You're All Set!",
    description: 'Your account is now configured and ready to use.',
  },
];

export function OnboardingSteps() {
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const progress = ((currentStep + 1) / STEPS.length) * 100;
  const searchParams = useSearchParams();

  const { data: authUrl } = api.getAuthUrl.useQuery();

  // Handle URL parameters for navigation and errors
  useEffect(() => {
    const step = searchParams.get('step');
    const error = searchParams.get('error');

    if (error) {
      setError(decodeURIComponent(error));
    }

    if (step) {
      const stepIndex = STEPS.findIndex((s) => s.id === step);
      if (stepIndex !== -1) {
        setCurrentStep(stepIndex);
      }
    }
  }, [searchParams]);

  const handleGoogleAdsConnect = () => {
    if (authUrl?.url) {
      // Get workspace ID from localStorage
      const workspaceId = localStorage.getItem('onboarding_workspace_id');
      if (!workspaceId) {
        setError('Workspace not found. Please try again.');
        return;
      }

      // Add workspace ID as state parameter
      const url = new URL(authUrl.url);
      url.searchParams.set('state', workspaceId);
      window.location.href = url.toString();
    }
  };

  const renderStepContent = () => {
    const step = STEPS[currentStep];

    switch (step.id) {
      case 'welcome':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{step.title}</h2>
            <p className="text-muted-foreground">{step.description}</p>
            <Button onClick={() => setCurrentStep(1)}>Get Started</Button>
          </div>
        );

      case 'workspace':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{step.title}</h2>
            <p className="text-muted-foreground">{step.description}</p>
            <WorkspaceForm onComplete={() => setCurrentStep(2)} />
          </div>
        );

      case 'connect-ads':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{step.title}</h2>
            <p className="text-muted-foreground">{step.description}</p>
            <Button onClick={handleGoogleAdsConnect}>
              Connect Google Ads
            </Button>
          </div>
        );

      case 'conversion':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{step.title}</h2>
            <p className="text-muted-foreground">{step.description}</p>
            <ConversionSelector onComplete={() => setCurrentStep(4)} />
          </div>
        );

      case 'complete':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">{step.title}</h2>
            <p className="text-muted-foreground">{step.description}</p>
            <Button onClick={() => window.location.href = '/dashboard'}>
              Go to Dashboard
            </Button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Card className="p-6">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <p className="mt-2 text-sm text-muted-foreground">
            Step {currentStep + 1} of {STEPS.length}
          </p>
        </div>
        {renderStepContent()}
      </Card>
    </div>
  );
} 