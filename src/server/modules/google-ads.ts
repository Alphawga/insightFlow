import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { GoogleAdsClient } from '@/lib/utils/google-ads-client';
import { GoogleAdsService } from '@/lib/services/google-ads.service';
import { publicProcedure } from '../trpc';

export const getAuthUrl = publicProcedure.query(async () => {
  return {
    url: GoogleAdsClient.getInstance().getAuthUrl(),
  };
});

export const connectAccount = publicProcedure
  .input(
    z.object({
      workspaceId: z.string(),
      code: z.string(),
      name: z.string(),

    })
  )
  .mutation(async ({ input, ctx }) => {
    try {
      console.log('Connecting account with code', input.code.substring(0, 10) + '...');
      
      const googleAdsClient = GoogleAdsClient.getInstance();
      
      // 1. Exchange the one-time code for tokens
      const { refresh_token, access_token } = await googleAdsClient.getAccessToken(input.code);
      console.log('Tokens received successfully');

      // 2. Retrieve the actual customer ID using the just-obtained access token
      const customerId = await googleAdsClient.getCustomerId(access_token);

      // 3. Store in the DB with the real customer ID
      await ctx.db.adAccount.create({
        data: {
          workspaceId: input.workspaceId,
          platform: 'GOOGLE_ADS',
          refreshToken: refresh_token,
          accountId: customerId,                // Now using the real ID
          name: input.name || '',
          status: 'ACTIVE',
        }
      });

      // Get the user ID from the session
      const userId = ctx.session?.user?.id;
      if (!userId) {
        throw new TRPCError({ code: 'UNAUTHORIZED' });
      }

      // Mark the connect-ads step as completed
      const connectStep = await ctx.db.onboardingProgress.upsert({
        where: { 
          userId_step: { userId, step: 'connect-ads' } 
        },
        update: {
          completed: true,
          completedAt: new Date(),
        },
        create: {
          userId,
          step: 'connect-ads',
          completed: true,
          completedAt: new Date(),
        },
      });

      // Set the next step (conversion) as current
      await ctx.db.onboardingProgress.upsert({
        where: { 
          userId_step: { userId, step: 'conversion' } 
        },
        update: {
          completed: false,
          completedAt: null,
        },
        create: {
          userId,
          step: 'conversion',
          completed: false,
          completedAt: null,
        },
      });

      return { success: true };
    } catch (error) {
      console.error('Detailed connection error:', error);
      

      if (error instanceof Error && 'response' in error) {
        const err = error as any;
        console.error('Error response data:', err.response?.data);
        console.error('Error response status:', err.response?.status);
      }
      
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error instanceof Error ? error.message : 'Failed to connect Google Ads account',
      });
    }
  });

export const syncAccount = publicProcedure
  .input(
    z.object({
      adAccountId: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    try {
      await GoogleAdsService.getInstance().syncAccountData(input.adAccountId);
      return { success: true };
    } catch (error) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error instanceof Error ? error.message : 'Failed to sync Google Ads account',
      });
    }
  });

export const getConversionActions = publicProcedure
  .input(
    z.object({
      adAccountId: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const conversionActions = await ctx.db.conversionAction.findMany({
      where: {
        adAccountId: input.adAccountId,
        status: 'ENABLED',
      },
      orderBy: {
        name: 'asc',
      },
    });

    return { conversionActions };
  });

export const setPrimaryConversion = publicProcedure
  .input(
    z.object({
      adAccountId: z.string(),
      conversionActionId: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    // Reset all conversion actions to non-primary
    await ctx.db.conversionAction.updateMany({
      where: {
        adAccountId: input.adAccountId,
      },
      data: {
        isPrimary: false,
      },
    });

    // Set the selected conversion action as primary
    await ctx.db.conversionAction.update({
      where: {
        id: input.conversionActionId,
      },
      data: {
        isPrimary: true,
      },
    });

    return { success: true };
  });

export const getConnectedAccount = publicProcedure
  .input(
    z.object({
      workspaceId: z.string(),
    })
  )
  .query(async ({ ctx, input }) => {
    const account = await ctx.db.adAccount.findFirst({
      where: {
        workspaceId: input.workspaceId,
        platform: 'GOOGLE_ADS',
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!account) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No connected Google Ads account found',
      });
    }

    return account;
  }); 