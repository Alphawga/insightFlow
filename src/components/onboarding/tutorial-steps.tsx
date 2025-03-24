import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, ChevronLeft, ChevronRight, Check, LineChart, BarChart2, Zap, PieChart } from 'lucide-react';

const TUTORIAL_STEPS = [
  {
    id: 'dashboard',
    title: 'Welcome to Your Dashboard',
    description: 'This is your command center for monitoring all your ad performance.',
    position: { top: '50%', left: '50%' },
    icon: <Zap className="h-5 w-5 text-orange-500" />,
  },
  {
    id: 'campaigns',
    title: 'Campaign Overview',
    description: 'View and manage all your advertising campaigns in one place.',
    position: { top: '30%', left: '20%' },
    icon: <LineChart className="h-5 w-5 text-orange-500" />,
  },
  {
    id: 'metrics',
    title: 'Key Metrics',
    description: 'Track important metrics like CTR, CPC, and ROAS in real-time.',
    position: { top: '40%', left: '60%' },
    icon: <BarChart2 className="h-5 w-5 text-orange-500" />,
  },
  {
    id: 'reports',
    title: 'Generate Reports',
    description: 'Create and export custom reports for your campaigns.',
    position: { top: '60%', left: '40%' },
    icon: <PieChart className="h-5 w-5 text-orange-500" />,
  },
];

export function TutorialSteps() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const progress = ((currentStep + 1) / TUTORIAL_STEPS.length) * 100;

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Tutorial complete
      setIsVisible(false);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const step = TUTORIAL_STEPS[currentStep];

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      >
        <div className="fixed inset-0 pointer-events-none" />
        <motion.div
          key={step.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', damping: 15 }}
          className="absolute p-6 w-[400px] space-y-4 shadow-lg rounded-lg bg-card text-card-foreground"
          style={{ 
            top: step.position.top, 
            left: step.position.left, 
            transform: 'translate(-50%, -50%)' 
          }}
        >
          <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white text-xs">
            {currentStep + 1}
          </div>
          
          <Progress value={progress} className="h-2" />
          
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500/10">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
            </div>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
          
          <div className="flex justify-between pt-2">
            {currentStep > 0 ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                className="flex items-center space-x-1"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </Button>
            ) : (
              <div /> // Empty div to maintain spacing
            )}
            
            <Button 
              size="sm"
              onClick={handleNext}
              className={`
                flex items-center space-x-1
                ${currentStep === TUTORIAL_STEPS.length - 1 
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'}
              `}
            >
              {currentStep === TUTORIAL_STEPS.length - 1 ? (
                <>
                  <Check className="h-4 w-4 mr-1" />
                  <span>Finish</span>
                </>
              ) : (
                <>
                  <span>Next</span>
                  <ChevronRight className="h-4 w-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
} 