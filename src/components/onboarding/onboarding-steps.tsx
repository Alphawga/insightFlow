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
  TrendingUp,
  Briefcase,
  Users,
  Mail,
  ShoppingBag,
  CreditCard,
  Monitor,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ONBOARDING_STEPS } from '@/lib/constants';
import { WorkspaceForm } from './workspace-form';
import { TutorialSteps } from './tutorial-steps';
import { BusinessTypeForm } from './business-type-form';
import { GoalsForm } from './goals-form';
import { trpc } from '@/app/_providers/trpc-provider';
import { ShopifyConnectModal } from './shopify-connect-modal';

// Define interfaces for the data types
interface OnboardingStatus {
  currentStep: string;
  steps: Array<{
    step: string;
    completed: boolean;
  }>;
}

interface ConnectionResponse {
  authUrl: string | null;
  platform: string;
}

const WELCOME = 'welcome';
const WORKSPACE_SETUP = 'workspace_setup';
const BUSINESS_TYPE = 'business_type';
const GOALS = 'goals';
const CONNECT_SOURCES = 'connect_sources';
const TUTORIAL = 'tutorial';
const COMPLETE = 'complete';

const STEP_UI = [
  {
    id: WELCOME,
    title: 'Welcome to InsightFlow',
    description: "Let's get your workspace set up and understand your business goals.",
    icon: <Zap className="h-6 w-6 text-orange-500" />,
  },
  {
    id: WORKSPACE_SETUP,
    title: 'Create Your Workspace',
    description: 'A workspace helps organize your data sources and insights.',
    icon: <BarChart2 className="h-6 w-6 text-orange-500" />,
  },
  {
    id: BUSINESS_TYPE,
    title: 'Tell Us About Your Business',
    description: 'Selecting your business type helps us tailor your experience.',
    icon: <Briefcase className="h-6 w-6 text-orange-500" />,
  },
  {
    id: GOALS,
    title: 'What Are Your Goals?',
    description: 'Knowing your goals helps us surface the most relevant insights.',
    icon: <TrendingUp className="h-6 w-6 text-orange-500" />,
  },
  {
    id: CONNECT_SOURCES,
    title: 'Connect Your Data Sources',
    description: 'Connect your core sales, marketing, and analytics platforms.',
    icon: <LineChart className="h-6 w-6 text-orange-500" />,
  },
  {
    id: TUTORIAL,
    title: 'Quick Tour',
    description: "Let's take a quick tour of your dashboard and key features.",
    icon: <Zap className="h-6 w-6 text-orange-500" />,
  },
  {
    id: COMPLETE,
    title: "You're All Set!",
    description: "Your workspace is configured. Let's check out your dashboard.",
    icon: <Check className="h-6 w-6 text-orange-500" />,
  },
];

export function OnboardingSteps() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [activeWorkspaceId, setActiveWorkspaceId] = useState<string | null>(null);
  const [isConnectingShopify, setIsConnectingShopify] = useState(false);
  
  // Use @ts-ignore to bypass TypeScript errors on tRPC calls
  // @ts-ignore
  const { data: onboardingStatus, isLoading: isLoadingStatus, refetch } = 
    trpc.getOnboardingStatus.useQuery(undefined, {
      refetchOnWindowFocus: false,
    });

  // @ts-ignore
  const updateProgress = trpc.updateOnboardingProgress.useMutation({
    onSuccess: () => {
      refetch();
    },
    onError: (error: { message: string }) => {
      setError(error.message);
    }
  });

  const initConnection = trpc.initConnection.useMutation({
    onSuccess: (data: ConnectionResponse) => {
      if (data.authUrl) {
        window.location.href = data.authUrl;
      } else if (data.platform === 'SHOPIFY') {
        setIsConnectingShopify(true);
      } else {
        setError('Failed to generate authentication URL');
      }
    },
    onError: (error: { message: string }) => {
      setError(error.message);
    }
  });

  const currentStepIndex = onboardingStatus 
    ? STEP_UI.findIndex(step => step.id === onboardingStatus.currentStep)
    : 0;
    
  const progress = onboardingStatus 
    ? ((currentStepIndex + 1) / STEP_UI.length) * 100
    : 0;

  const completeStep = (stepId: string) => {
    setError(null);
    const currentStep = STEP_UI.find(s => s.id === stepId);
    if (!currentStep) return;

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
    } else if (stepId === COMPLETE) {
      updateProgress.mutate({
        step: COMPLETE,
        completed: true,
      });
   
    }
  };

  const handleConnectSource = (platform: string) => {
    setError(null);
    
    if (!activeWorkspaceId) {
      setError("No active workspace found. Please refresh and try again.");
      return;
    }
    
    // Initiate OAuth flow
    initConnection.mutate({
      platform,
      workspaceId: activeWorkspaceId,
    });
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
    if (!step) return <div>Error: Could not determine current step.</div>;

    switch (step.id) {
      case WELCOME:
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
                onClick={() => completeStep(WELCOME)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        );

      case WORKSPACE_SETUP:
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
            <WorkspaceForm onComplete={(workspaceId: string) => {
              if (workspaceId) {
                localStorage.setItem('onboarding_workspace_id', workspaceId);
                setActiveWorkspaceId(workspaceId);
              }
              completeStep(WORKSPACE_SETUP);
            }} />
          </motion.div>
        );

      case BUSINESS_TYPE:
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
            <BusinessTypeForm onComplete={() => completeStep(BUSINESS_TYPE)} />
          </motion.div>
        );

      case GOALS:
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
            <GoalsForm onComplete={() => completeStep(GOALS)} />
          </motion.div>
        );

      case CONNECT_SOURCES:
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
            
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="border transition-all hover:shadow-md">
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-lg">Shopify</CardTitle>
                   <ShoppingBag className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                 <CardContent className="pt-0">
                   <CardDescription>Connect your e-commerce store.</CardDescription>
                 </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleConnectSource('SHOPIFY')}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  >
                    Connect
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border transition-all hover:shadow-md">
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-lg">Stripe</CardTitle>
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                 <CardContent className="pt-0">
                    <CardDescription>Connect your payment processor.</CardDescription>
                 </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleConnectSource('STRIPE')}
                     className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  >
                     Connect
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border transition-all hover:shadow-md">
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-lg">Google Analytics 4</CardTitle>
                  <Monitor className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-0">
                    <CardDescription>Connect your website analytics.</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleConnectSource('GA4')}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  >
                    Connect
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border transition-all hover:shadow-md">
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-lg">Meta Ads</CardTitle>
                   <Users className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                 <CardContent className="pt-0">
                   <CardDescription>Facebook & Instagram Ads.</CardDescription>
                 </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleConnectSource('META')}
                     className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  >
                    Connect
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border transition-all hover:shadow-md">
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-lg">Mailchimp</CardTitle>
                  <Mail className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent className="pt-0">
                    <CardDescription>Connect your email marketing.</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleConnectSource('MAILCHIMP')}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  >
                    Connect
                  </Button>
                </CardFooter>
              </Card>

              <Card className="border transition-all hover:shadow-md">
                <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="text-lg">Google Ads</CardTitle>
                  <Monitor className="h-5 w-5 text-muted-foreground" /> 
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription>Connect your advertising account.</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleConnectSource('GOOGLE_ADS')}
                    className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  >
                    Connect
                  </Button>
                </CardFooter>
              </Card>
            </div>
             <div className="flex justify-center pt-6">
               <Button 
                 variant="outline"
                 onClick={() => completeStep(CONNECT_SOURCES)}
               >
                 I'll connect later / Next
               </Button>
             </div>
          </motion.div>
        );

      case TUTORIAL:
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
                onClick={() => completeStep(TUTORIAL)}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
              >
                Start Tour
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <p className="text-center text-sm text-muted-foreground pt-4">(Tour coming soon!)</p> 
             <div className="flex justify-center pt-2">
               <Button 
                 variant="outline"
                 onClick={() => completeStep(TUTORIAL)}
               >
                 Skip Tour
               </Button>
             </div>
          </motion.div>
        );

      case COMPLETE:
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
                  completeStep(COMPLETE)
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
        console.error("Invalid onboarding step ID:", step?.id);
        setError("An unexpected error occurred during onboarding. Please refresh.");
        return (
           <div className="text-center text-destructive">
              <AlertCircle className="mx-auto h-8 w-8 mb-2" />
              <p>Something went wrong. Please try refreshing the page.</p>
          </div>
        ); 
    }
  };

  useEffect(() => {
    // Try to get the workspace ID from localStorage (set during workspace creation)
    const storedWorkspaceId = localStorage.getItem('onboarding_workspace_id');
    if (storedWorkspaceId) {
      setActiveWorkspaceId(storedWorkspaceId);
    }
    
    const urlParams = new URLSearchParams(window.location.search);
    const callback = urlParams.get('callback');
    const errorParam = urlParams.get('error');
    const stepOverride = urlParams.get('step');
    const platform = urlParams.get('platform');

    if (stepOverride && STEP_UI.some((s: { id: string }) => s.id === stepOverride)) {
       console.log(`Overriding step to: ${stepOverride}`);
       updateProgress.mutate({
         step: stepOverride,
         completed: false,
       });
       const overrideIndex = STEP_UI.findIndex((s: { id: string }) => s.id === stepOverride);
       STEP_UI.slice(0, overrideIndex).forEach((prevStep: { id: string }) => {
         updateProgress.mutate({
           step: prevStep.id,
           completed: true,
         });
       });
       window.history.replaceState({}, document.title, window.location.pathname);
       refetch();
       return;
    }
    
    if (callback === 'success' && onboardingStatus?.currentStep === CONNECT_SOURCES) {
      console.log('OAuth callback success detected.');
      if (platform) {
        console.log(`Platform ${platform} connected successfully`);
      }
      completeStep(CONNECT_SOURCES);
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (errorParam) {
      setError(decodeURIComponent(errorParam));
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [refetch, onboardingStatus, updateProgress]);

  return (
    <div className="mx-auto max-w-3xl p-6">
      {isConnectingShopify && activeWorkspaceId && (
        <ShopifyConnectModal 
          isOpen={isConnectingShopify}
          onClose={() => setIsConnectingShopify(false)}
          workspaceId={activeWorkspaceId}
        />
      )}
      
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
            <div className="flex space-x-1 sm:space-x-2 md:space-x-4 lg:space-x-6 overflow-x-auto pb-2">
              {STEP_UI.map((step, index) => (
                <div 
                  key={step.id}
                  className="flex flex-col items-center flex-shrink-0 w-16 text-center"
                >
                  <div 
                    className={`
                      flex h-8 w-8 items-center justify-center rounded-full border-2 mb-1
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
                  <span className="text-xs font-medium text-muted-foreground">
                    {step.title.split(' ').slice(0,2).join(' ')} 
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