import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { publicProcedure } from '../trpc';
import { ONBOARDING_STEPS } from '@/lib/constants';


export const getOnboardingStatus = publicProcedure
  .query(async ({ ctx }) => {
    const userId = ctx.session?.user?.id;
    console.log('userId:', userId);
    if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' });
    
    const steps = await ctx.db.onboardingProgress.findMany({
      where: { userId },
      orderBy: { createdAt: 'asc' },
    });
    console.log('steps:', steps);
    
    const isComplete = ONBOARDING_STEPS.every(step => 
      steps.some(s => s.step === step && s.completed)
    );
    

    let currentStep = ONBOARDING_STEPS[0]; 
    if (steps.length > 0) {
      const incompleteStep = steps.find(s => !s.completed);
      if (incompleteStep) {
        currentStep = incompleteStep.step;
      } else if (isComplete) {
        currentStep = ONBOARDING_STEPS[ONBOARDING_STEPS.length - 1]; // Last step (complete)
      }
    }
    
    console.log('currentStep:', currentStep);
    return { 
      steps,
      isComplete,
      currentStep
    };
  });

export const updateOnboardingProgress = publicProcedure
  .input(z.object({
    step: z.string(),
    completed: z.boolean().default(true),
  }))
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session?.user?.id;
    if (!userId) throw new TRPCError({ code: 'UNAUTHORIZED' });
 
    
    const progress = await ctx.db.onboardingProgress.upsert({
      where: { 
        userId_step: { userId, step: input.step } 
      },
      update: {
        completed: input.completed,
        completedAt: input.completed ? new Date() : null,
      },
      create: {
        userId,
        step: input.step,
        completed: input.completed,
        completedAt: input.completed ? new Date() : null,
      },
    });

    
    return progress;
  }); 