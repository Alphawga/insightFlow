import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const TUTORIAL_STEPS = [
  {
    id: 'dashboard',
    title: 'Welcome to Your Dashboard',
    description: 'This is your command center for monitoring all your Google Ads performance.',
    position: { top: '50%', left: '50%' },
  },
  {
    id: 'campaigns',
    title: 'Campaign Overview',
    description: 'View and manage all your advertising campaigns in one place.',
    position: { top: '30%', left: '20%' },
  },
  {
    id: 'metrics',
    title: 'Key Metrics',
    description: 'Track important metrics like CTR, CPC, and ROAS in real-time.',
    position: { top: '40%', left: '60%' },
  },
  {
    id: 'reports',
    title: 'Generate Reports',
    description: 'Create and export custom reports for your campaigns.',
    position: { top: '60%', left: '40%' },
  },
];

export function TutorialSteps() {
  const [currentStep, setCurrentStep] = useState(0);
  const progress = ((currentStep + 1) / TUTORIAL_STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Tutorial complete - redirect to dashboard
      window.location.href = '/dashboard';
    }
  };

  const step = TUTORIAL_STEPS[currentStep];

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-0 pointer-events-none" />
      <Card 
        className="absolute p-6 w-[400px] space-y-4"
        style={{ 
          top: step.position.top, 
          left: step.position.left, 
          transform: 'translate(-50%, -50%)' 
        }}
      >
        <Progress value={progress} className="h-2" />
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{step.title}</h3>
          <p className="text-sm text-muted-foreground">{step.description}</p>
        </div>
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button onClick={handleNext}>
            {currentStep === TUTORIAL_STEPS.length - 1 ? 'Finish' : 'Next'}
          </Button>
        </div>
      </Card>
    </div>
  );
} 