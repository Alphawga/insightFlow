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
    })
  )
  .mutation(async ({ input }) => {
    try {
      const accounts = await GoogleAdsService.getInstance().connectAccount(
        input.workspaceId,
        input.code
      );
      return { accounts };
    } catch (error) {
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