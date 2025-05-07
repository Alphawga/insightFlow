import { db } from '@/lib/db';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';

// OAuth configuration types
interface OAuthConfig {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  authUrl: string;
  tokenUrl: string;
  scopes: string[];
}

// Platform-specific OAuth configurations
const oauthConfigs: Record<string, OAuthConfig> = {
  SHOPIFY: {
    clientId: process.env.SHOPIFY_CLIENT_ID || '',
    clientSecret: process.env.SHOPIFY_CLIENT_SECRET || '',
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/callback/shopify`,
    authUrl: 'https://shop-url.myshopify.com/admin/oauth/authorize', // Placeholder - will be dynamic
    tokenUrl: 'https://shop-url.myshopify.com/admin/oauth/access_token', // Placeholder - will be dynamic
    scopes: ['read_products', 'read_orders', 'read_customers']
  },
  STRIPE: {
    clientId: process.env.STRIPE_CLIENT_ID || '',
    clientSecret: process.env.STRIPE_SECRET_KEY || '',
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/callback/stripe`,
    authUrl: 'https://connect.stripe.com/oauth/authorize',
    tokenUrl: 'https://connect.stripe.com/oauth/token',
    scopes: ['read_only']
  },
  GA4: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/callback/google`,
    authUrl: 'https://accounts.google.com/o/oauth2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: ['https://www.googleapis.com/auth/analytics.readonly']
  },
  GOOGLE_ADS: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/callback/google`,
    authUrl: 'https://accounts.google.com/o/oauth2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: ['https://www.googleapis.com/auth/adwords']
  },
  META: {
    clientId: process.env.META_CLIENT_ID || '',
    clientSecret: process.env.META_CLIENT_SECRET || '',
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/callback/meta`,
    authUrl: 'https://www.facebook.com/v17.0/dialog/oauth',
    tokenUrl: 'https://graph.facebook.com/v17.0/oauth/access_token',
    scopes: ['ads_read', 'ads_management']
  },
  MAILCHIMP: {
    clientId: process.env.MAILCHIMP_CLIENT_ID || '',
    clientSecret: process.env.MAILCHIMP_CLIENT_SECRET || '',
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/callback/mailchimp`,
    authUrl: 'https://login.mailchimp.com/oauth2/authorize',
    tokenUrl: 'https://login.mailchimp.com/oauth2/token',
    scopes: ['']
  }
};

// Initialize OAuth flow for a platform
export async function initOAuthFlow(platform: string, workspaceId: string) {
  const config = oauthConfigs[platform];
  
  if (!config) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: `Unsupported platform: ${platform}`
    });
  }
  
  // For Shopify, we need the shop URL
  if (platform === 'SHOPIFY') {
    return {
      authUrl: null, // We'll need to get the shop URL from the client first
      platform
    };
  }
  
  // Include platform in the state for differentiation in the callback
  const state = Buffer.from(JSON.stringify({ workspaceId, platform })).toString('base64');
  
  // Construct authorization URL
  const authUrl = new URL(config.authUrl);
  authUrl.searchParams.append('client_id', config.clientId);
  authUrl.searchParams.append('redirect_uri', config.redirectUri);
  authUrl.searchParams.append('response_type', 'code');
  authUrl.searchParams.append('scope', config.scopes.join(' '));
  authUrl.searchParams.append('state', state);
  // Crucial for getting refresh token from Google
  if (platform === 'GA4' || platform === 'GOOGLE_ADS') { 
    authUrl.searchParams.append('access_type', 'offline');
    authUrl.searchParams.append('prompt', 'consent'); 
  }
  
  return {
    authUrl: authUrl.toString(),
    platform
  };
}

// Handle Shopify shop URL and initiate OAuth
export async function initShopifyOAuth(shopUrl: string, workspaceId: string) {
  const config = oauthConfigs.SHOPIFY;
  
  // Validate shop URL format
  if (!shopUrl.match(/^[a-zA-Z0-9][a-zA-Z0-9\-]*\.myshopify\.com$/)) {
    throw new TRPCError({
      code: 'BAD_REQUEST',
      message: 'Invalid Shopify shop URL. It should be in the format: your-store.myshopify.com'
    });
  }
  
  // Generate state parameter for security
  const state = Buffer.from(JSON.stringify({ workspaceId, platform: 'SHOPIFY', shopUrl })).toString('base64');
  
  // Construct authorization URL with the specific shop
  const authUrl = new URL(`https://${shopUrl}/admin/oauth/authorize`);
  authUrl.searchParams.append('client_id', config.clientId);
  authUrl.searchParams.append('redirect_uri', config.redirectUri);
  authUrl.searchParams.append('scope', config.scopes.join(','));
  authUrl.searchParams.append('state', state);
  
  return {
    authUrl: authUrl.toString(),
    platform: 'SHOPIFY'
  };
}

// Store integration account in database
export async function storeIntegrationAccount(
  workspaceId: string,
  platform: string,
  accountId: string,
  name: string,
  credentials: any
) {
  try {
    // Check if integration already exists for this workspace and platform+accountId
    const existingIntegration = await db.integrationAccount.findFirst({
      where: {
        workspaceId,
        platform,
        accountId
      }
    });
    
    if (existingIntegration) {
      // Update the existing integration
      return await db.integrationAccount.update({
        where: {
          id: existingIntegration.id
        },
        data: {
          name,
          status: 'ACTIVE',
          credentials,
          updatedAt: new Date(),
          lastSyncedAt: new Date(),
          syncStatus: 'SUCCESS'
        }
      });
    }
    
    // Create a new integration
    return await db.integrationAccount.create({
      data: {
        workspaceId,
        platform,
        accountId,
        name,
        status: 'ACTIVE',
        credentials,
        lastSyncedAt: new Date(),
        syncStatus: 'SUCCESS'
      }
    });
  } catch (error) {
    console.error('Error storing integration account:', error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to store integration account'
    });
  }
}

// Get integration accounts for workspace
export async function getIntegrationAccounts(workspaceId: string) {
  try {
    return await db.integrationAccount.findMany({
      where: {
        workspaceId
      },
      select: {
        id: true,
        platform: true,
        accountId: true,
        name: true,
        status: true,
        lastSyncedAt: true,
        syncStatus: true,
        syncError: true
      }
    });
  } catch (error) {
    console.error('Error fetching integration accounts:', error);
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to fetch integration accounts'
    });
  }
} 