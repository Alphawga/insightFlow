import { z } from 'zod';
import { publicProcedure, protectedProcedure } from '@/server/trpc';
import { TRPCError } from '@trpc/server';
import { db } from '@/lib/db';

export const getOnboardingStatus = protectedProcedure.query(async ({ ctx }) => {
  const userId = ctx.session.user.id;

  try {
    const steps = await db.onboardingProgress.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (steps.length === 0) {
      // User hasn't started onboarding yet, create initial step
      await db.onboardingProgress.create({
        data: {
          userId,
          step: 'welcome',
          completed: false,
        },
      });

      return {
        currentStep: 'welcome',
        steps: [{
          step: 'welcome',
          completed: false,
        }],
      };
    }

    // Find the first incomplete step, or the last step if all are complete
    const currentStep = steps.find((step) => !step.completed) || steps[steps.length - 1];

    return {
      currentStep: currentStep.step,
      steps,
      isComplete: steps.every((step) => step.completed),
    };
  } catch (error) {
    console.error('Error getting onboarding status:', error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to get onboarding status',
    });
  }
});

export const updateOnboardingProgress = protectedProcedure
  .input(
    z.object({
      step: z.string(),
      completed: z.boolean(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userId = ctx.session.user.id;
    const { step, completed } = input;

    try {
      const existingStep = await db.onboardingProgress.findFirst({
        where: {
          userId,
          step,
        },
      });

      if (existingStep) {
        // Update existing step
        return await db.onboardingProgress.update({
          where: {
            id: existingStep.id,
          },
          data: {
            completed,
            completedAt: completed ? new Date() : null,
          },
        });
      }

      // Create new step
      return await db.onboardingProgress.create({
        data: {
          userId,
          step,
          completed,
          completedAt: completed ? new Date() : null,
        },
      });
    } catch (error) {
      console.error('Error updating onboarding progress:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Failed to update onboarding progress',
      });
    }
  }); 