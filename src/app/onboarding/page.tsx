"use client"

import { OnboardingSteps } from '@/components/onboarding/onboarding-steps';
import { motion } from 'framer-motion';

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container max-w-screen-xl mx-auto"
      >
        <h1 className="text-3xl font-bold text-center mb-8">
          Set Up Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600">InsightFlow</span>
        </h1>
        
        <OnboardingSteps />
      </motion.div>
    </div>
  );
}

