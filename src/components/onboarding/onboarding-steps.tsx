'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ArrowRight, 
  AlertCircle, 
  Check, 
  BarChart2, 
  Zap, 
  LineChart,
  TrendingUp
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ONBOARDING_STEPS } from '@/lib/constants';
import { WorkspaceForm } from './workspace-form';
import { ConversionSelector } from './conversion-selector';
import { TutorialSteps } from './tutorial-steps';
import { trpc } from '@/app/_providers/trpc-provider';


const STEP_UI = [
  {
    id: ONBOARDING_STEPS[0], // welcome
    title: 'Welcome to InsightFlow',
    description: "Let's get you set up with your account and start tracking your ad performance.",
    icon: <Zap className="h-6 w-6 text-orange-500" />,
  },
  {
    id: ONBOARDING_STEPS[1], // workspace
    title: 'Create Your Workspace',
    description: 'Create a workspace to organize your ad accounts and collaborate with your team.',
    icon: <BarChart2 className="h-6 w-6 text-orange-500" />,
  },
  {
    id: ONBOARDING_STEPS[2], // connect-ads
    title: 'Connect Your Ad Platforms',
    description: 'Connect your advertising accounts to start tracking performance.',
    icon: <LineChart className="h-6 w-6 text-orange-500" />,
  },
  {
    id: ONBOARDING_STEPS[3], // conversion
    title: 'Select Key Conversions',
    description: 'Choose which conversion actions are most important for your business.',
    icon: <TrendingUp className="h-6 w-6 text-orange-500" />,
  },
  {
    id: ONBOARDING_STEPS[4], // tutorial
    title: 'Quick Tour',
    description: "Let's take a quick tour of your dashboard and key features.",
    icon: <Zap className="h-6 w-6 text-orange-500" />,
  },
  {
    id: ONBOARDING_STEPS[5], // complete
    title: "You're All Set!",
    description: 'Your account is now configured and ready to use.',
    icon: <Check className="h-6 w-6 text-orange-500" />,
  },
];

export function OnboardingSteps() {4
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  
  // Get onboarding status from tRPC
  const { data: onboardingStatus, isLoading: isLoadingStatus, refetch } = 
    trpc.getOnboardingStatus.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });

 
  const updateProgress = trpc.updateOnboardingProgress.useMutation({
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      setError(error.message);
    }
  });


  const { data: authUrl } = trpc.getAuthUrl.useQuery();
  

  const currentStepIndex = onboardingStatus 
    ? STEP_UI.findIndex(step => step.id === onboardingStatus.currentStep)
    : 0;
    

  const progress = onboardingStatus 
    ? ((currentStepIndex + 1) / STEP_UI.length) * 100
    : 0;



  const completeStep = (stepId: string) => {
    updateProgress.mutate({
      step: stepId,
      completed: true,
    });
    
   
    const currentIndex = STEP_UI.findIndex(step => step.id === stepId);
    if (currentIndex < STEP_UI.length - 1) {
      const nextStep = STEP_UI[currentIndex + 1];
      updateProgress.mutate({
        step: nextStep.id,
        completed: false,
      });
    }
  };


  const handleGoogleAdsConnect = () => {
    if (authUrl?.url) {
     
      const workspaceId = localStorage.getItem('onboarding_workspace_id');
      if (!workspaceId) {
        setError('Workspace not found. Please try again.');
        return;
      }

    
      const url = new URL(authUrl.url);
      url.searchParams.set('state', workspaceId);
      window.location.href = url.toString();
    }
  };

  const renderStepContent = () => {
    if (isLoadingStatus || !onboardingStatus) {
      return (
        <div className="flex items-center justify-center py-10">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-orange-500" />
        </div>
      );
    }

    const step = STEP_UI[currentStepIndex];

    switch (step.id) {
      case ONBOARDING_STEPS[0]: // welcome
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 mx-auto mb-4">
              {step.icon}
            </div>
            <h2 className="text-2xl font-bold text-center">{step.title}</h2>
            <p className="text-muted-foreground text-center">{step.description}</p>
            <div className="flex justify-center pt-4">
              <Button 
                onClick={() => completeStep(ONBOARDING_STEPS[0])}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        );

      case ONBOARDING_STEPS[1]: // workspace
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 mx-auto mb-4">
              {step.icon}
            </div>
            <h2 className="text-2xl font-bold text-center">{step.title}</h2>
            <p className="text-muted-foreground text-center">{step.description}</p>
            <WorkspaceForm onComplete={() => completeStep(ONBOARDING_STEPS[1])} />
          </motion.div>
        );

      case ONBOARDING_STEPS[2]: // connect-ads
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 mx-auto mb-4">
              {step.icon}
            </div>
            <h2 className="text-2xl font-bold text-center">{step.title}</h2>
            <p className="text-muted-foreground text-center mb-6">{step.description}</p>
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card className="border transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Google Ads</CardTitle>
                  <CardDescription>Connect your Google Ads account to analyze campaign performance</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    onClick={handleGoogleAdsConnect}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  >
                    Connect
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border transition-all hover:shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Facebook & Instagram Ads</CardTitle>
                  <CardDescription>Connect your Facebook & Instagram Ads accounts</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      // In the future, we'll implement this
                      // For now, just move to the next step
                      completeStep(ONBOARDING_STEPS[2]);
                    }}
                  >
                    Skip for now
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </motion.div>
        );

      case ONBOARDING_STEPS[3]: // conversion
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 mx-auto mb-4">
              {step.icon}
            </div>
            <h2 className="text-2xl font-bold text-center">{step.title}</h2>
            <p className="text-muted-foreground text-center">{step.description}</p>
            <ConversionSelector onComplete={() => completeStep(ONBOARDING_STEPS[3])} />
          </motion.div>
        );

      case ONBOARDING_STEPS[4]: // tutorial
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10 mx-auto mb-4">
              {step.icon}
            </div>
            <h2 className="text-2xl font-bold text-center">{step.title}</h2>
            <p className="text-muted-foreground text-center">{step.description}</p>
            <div className="flex justify-center pt-4">
              <Button 
                onClick={() => completeStep(ONBOARDING_STEPS[4])}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                Start Tour
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <TutorialSteps />
          </motion.div>
        );

      case ONBOARDING_STEPS[5]: // complete
        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600 mx-auto mb-4">
              <Check className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-bold">{step.title}</h2>
            <p className="text-muted-foreground">{step.description}</p>
            <div className="flex justify-center pt-4">
              <Button 
                onClick={() => {
                  completeStep(ONBOARDING_STEPS[5]);
                  router.push('/dashboard');
                }}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                Go to Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    // Check for URL parameters on component mount
    const urlParams = new URLSearchParams(window.location.search);
    const callback = urlParams.get('callback');
    const errorParam = urlParams.get('error');
    
    if (callback === 'success') {
      // Just refetch the onboarding status - the DB has already been updated
      refetch();
      
      // Clear URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    if (errorParam) {
      setError(decodeURIComponent(errorParam));
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [refetch]);

  return (
    <div className="mx-auto max-w-3xl p-6">
      <Card className="overflow-hidden">
        {error && (
          <Alert variant="destructive" className="m-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        
        <div className="relative">
          <Progress value={progress} className="h-2 w-full" />
        </div>
        
        <CardContent className="pt-8 pb-6">
          <div className="flex justify-center mb-6">
            <div className="flex space-x-2 md:space-x-6">
              {STEP_UI.map((step, index) => (
                <div 
                  key={step.id}
                  className="flex flex-col items-center"
                >
                  <div 
                    className={`
                      flex h-8 w-8 items-center justify-center rounded-full border-2
                      ${index === currentStepIndex 
                        ? 'border-orange-500 text-orange-500' 
                        : index < currentStepIndex 
                          ? 'border-orange-500 bg-orange-500 text-white' 
                          : 'border-muted text-muted-foreground'
                      }
                    `}
                  >
                    {index < currentStepIndex ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  <span className="mt-2 hidden text-xs font-medium md:block">
                    {step.title.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {renderStepContent()}
        </CardContent>
      </Card>
    </div>
  );
} 