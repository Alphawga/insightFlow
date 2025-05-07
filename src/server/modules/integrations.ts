import { z } from 'zod';
import { publicProcedure, protectedProcedure } from '@/server/trpc';
import { TRPCError } from '@trpc/server';
import { 
  initOAuthFlow, 
  initShopifyOAuth, 
  getIntegrationAccounts,
} from '@/server/services/integrations';
import { GoogleAdsClient } from '@/lib/utils/google-ads-client'; // Import the client

export const initConnection = protectedProcedure
  .input(
    z.object({
      platform: z.string(),
      workspaceId: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    try {
      const { platform, workspaceId } = input;
      return await initOAuthFlow(platform, workspaceId);
    } catch (error) {
      console.error('Error initializing OAuth flow:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error instanceof Error ? error.message : 'Failed to initialize connection',
      });
    }
  });
  
export const initShopifyConnect = protectedProcedure
  .input(
    z.object({
      shopUrl: z.string(),
      workspaceId: z.string(),
    })
  )
  .mutation(async ({ input }) => {
    try {
      const { shopUrl, workspaceId } = input;
      return await initShopifyOAuth(shopUrl, workspaceId);
    } catch (error) {
      console.error('Error initializing Shopify OAuth:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error instanceof Error ? error.message : 'Failed to initialize Shopify connection',
      });
    }
  });
  
export const getIntegrations = protectedProcedure
  .input(
    z.object({
      workspaceId: z.string(),
    })
  )
  .query(async ({ input }) => {
    try {
      const { workspaceId } = input;
      return await getIntegrationAccounts(workspaceId);
    } catch (error) {
      console.error('Error fetching integrations:', error);
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: error instanceof Error ? error.message : 'Failed to fetch integrations',
      });
    }
  });