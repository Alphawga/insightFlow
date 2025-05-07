import { NextRequest, NextResponse } from 'next/server';
import { storeIntegrationAccount } from '@/server/services/integrations';
import { db } from '@/lib/db';
import { GoogleAdsClient } from '@/lib/utils/google-ads-client';

async function handleShopifyCallback(
  code: string, 
  state: any, 
  shopUrl: string
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const { workspaceId } = state;
    
    // Exchange code for access token
    const tokenResponse = await fetch(`https://${shopUrl}/admin/oauth/access_token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.SHOPIFY_CLIENT_ID,
        client_secret: process.env.SHOPIFY_CLIENT_SECRET,
        code,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Shopify token exchange failed: ${tokenResponse.statusText}`);
    }

    const tokenData = await tokenResponse.json();
    
    // Get shop info to store name
    const shopResponse = await fetch(`https://${shopUrl}/admin/api/2023-07/shop.json`, {
      headers: {
        'X-Shopify-Access-Token': tokenData.access_token,
      },
    });

    if (!shopResponse.ok) {
      throw new Error(`Failed to fetch shop data: ${shopResponse.statusText}`);
    }

    const shopData = await shopResponse.json();
    
    // Store in database
    await storeIntegrationAccount(
      workspaceId,
      'SHOPIFY',
      shopData.shop.id.toString(),
      shopData.shop.name,
      {
        access_token: tokenData.access_token,
        scope: tokenData.scope,
        shop: shopUrl,
      }
    );

    return { success: true };
  } catch (error) {
    console.error('Shopify OAuth error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

async function handleStripeCallback(
  code: string, 
  state: any
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const { workspaceId } = state;
    
    // Exchange code for access token
    const tokenResponse = await fetch('https://connect.stripe.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_secret: process.env.STRIPE_SECRET_KEY || '',
        grant_type: 'authorization_code',
        code,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Stripe token exchange failed: ${tokenResponse.statusText}`);
    }

    const tokenData = await tokenResponse.json();
    
    // Store in database
    await storeIntegrationAccount(
      workspaceId,
      'STRIPE',
      tokenData.stripe_user_id,
      tokenData.stripe_publishable_key ? `Stripe ${tokenData.stripe_publishable_key.slice(-4)}` : 'Stripe Account',
      {
        access_token: tokenData.access_token,
        refresh_token: tokenData.refresh_token,
        stripe_publishable_key: tokenData.stripe_publishable_key,
        stripe_user_id: tokenData.stripe_user_id,
      }
    );

    return { success: true };
  } catch (error) {
    console.error('Stripe OAuth error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

async function handleGoogleCallback(
  code: string, 
  state: any
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const { workspaceId, platform } = state;
    
    if (!workspaceId || !platform) {
        throw new Error('Invalid state received from Google callback');
    }
    
    // Exchange code for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID || '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET || '',
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/callback/google`,
        grant_type: 'authorization_code',
      }),
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(`Google token exchange failed: ${tokenResponse.status} ${errorText}`);
    }

    const tokenData = await tokenResponse.json();
    const { access_token, refresh_token, id_token, expiry_date } = tokenData;

    if (!access_token) {
      throw new Error('Failed to retrieve access token from Google');
    }

    // --- Platform Specific Logic --- 
    let accountId: string;
    let accountName: string;
    let specificPlatform: string;
    let credentials: any = { // Base credentials
        access_token: access_token,
        refresh_token: refresh_token, // Make sure refresh token is stored
        id_token: id_token,
        expiry_date: expiry_date,
    };

    if (platform === 'GOOGLE_ADS') {
        specificPlatform = 'GOOGLE_ADS';
        const googleAdsClient = GoogleAdsClient.getInstance();
        
        // Get Customer ID (Account ID)
        accountId = await googleAdsClient.getCustomerId(access_token);
        
        // Get Customer Details (for Name)
        const customerDetails = await googleAdsClient.getCustomerDetails(accountId, access_token);
        accountName = customerDetails?.descriptiveName || `Google Ads ${accountId}`;

        // Add any Google Ads specific credentials if needed
        credentials.login_customer_id = googleAdsClient.getLoginCustomerId();

    } else if (platform === 'GA4') { 
        specificPlatform = 'GA4';
        // Get user info to identify GA4 connection (might represent the Google Account itself)
        const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        if (!userResponse.ok) {
          throw new Error(`Failed to fetch Google user data: ${userResponse.statusText}`);
        }
        const userData = await userResponse.json();
        accountId = userData.id; // Use Google user ID as the identifier
        accountName = userData.email || 'Google Analytics Account';
        
    } else {
        throw new Error(`Unsupported Google platform type in state: ${platform}`);
    }

    // Store in database using the determined platform and details
    await storeIntegrationAccount(
      workspaceId,
      specificPlatform, 
      accountId,
      accountName,
      credentials
    );

    return { success: true };

  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

async function handleMetaCallback(
  code: string, 
  state: any
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const { workspaceId } = state;
    
    // Exchange code for access token
    const tokenResponse = await fetch('https://graph.facebook.com/v17.0/oauth/access_token', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        code,
        client_id: process.env.META_CLIENT_ID || '',
        client_secret: process.env.META_CLIENT_SECRET || '',
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/callback/meta`,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Meta token exchange failed: ${tokenResponse.statusText}`);
    }

    const tokenData = await tokenResponse.json();
    
    // Get Ad accounts
    const accountsResponse = await fetch('https://graph.facebook.com/v17.0/me/adaccounts?fields=name,id', {
      headers: {
        Authorization: `Bearer ${tokenData.access_token}`,
      },
    });

    if (!accountsResponse.ok) {
      throw new Error(`Failed to fetch Meta ad accounts: ${accountsResponse.statusText}`);
    }

    const accountsData = await accountsResponse.json();
    
    // Store the first ad account (in a real app, you'd let the user select)
    if (accountsData.data && accountsData.data.length > 0) {
      const adAccount = accountsData.data[0];
      
      await storeIntegrationAccount(
        workspaceId,
        'META',
        adAccount.id,
        adAccount.name || 'Meta Ads Account',
        {
          access_token: tokenData.access_token,
          expires_in: tokenData.expires_in,
          ad_account_id: adAccount.id,
        }
      );
    } else {
      throw new Error('No Meta ad accounts found');
    }

    return { success: true };
  } catch (error) {
    console.error('Meta OAuth error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

async function handleMailchimpCallback(
  code: string, 
  state: any
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const { workspaceId } = state;
    
    // Exchange code for access token
    const tokenResponse = await fetch('https://login.mailchimp.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${process.env.MAILCHIMP_CLIENT_ID}:${process.env.MAILCHIMP_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: `${process.env.NEXT_PUBLIC_APP_URL}/api/oauth/callback/mailchimp`,
      }),
    });

    if (!tokenResponse.ok) {
      throw new Error(`Mailchimp token exchange failed: ${tokenResponse.statusText}`);
    }

    const tokenData = await tokenResponse.json();
    
    // Get metadata
    const metadataResponse = await fetch('https://login.mailchimp.com/oauth2/metadata', {
      headers: {
        Authorization: `OAuth ${tokenData.access_token}`,
      },
    });

    if (!metadataResponse.ok) {
      throw new Error(`Failed to fetch Mailchimp metadata: ${metadataResponse.statusText}`);
    }

    const metadataData = await metadataResponse.json();
    
    // Store in database
    await storeIntegrationAccount(
      workspaceId,
      'MAILCHIMP',
      metadataData.login.email,
      metadataData.accountname || 'Mailchimp Account',
      {
        access_token: tokenData.access_token,
        dc: metadataData.dc,
        api_endpoint: metadataData.api_endpoint,
      }
    );

    return { success: true };
  } catch (error) {
    console.error('Mailchimp OAuth error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

export async function GET(request: NextRequest, { params }: { params: { platform: string } }) {
  const platformFromUrl = params.platform.toUpperCase();
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get('code');
  const stateParam = searchParams.get('state');
  const error = searchParams.get('error');
  
  // Handle errors from OAuth provider
  if (error) {
    const errorDescription = searchParams.get('error_description') || 'Unknown error';
    const redirectUrl = `/onboarding?callback=error&error=${encodeURIComponent(errorDescription)}`;
    return NextResponse.redirect(new URL(redirectUrl, process.env.NEXT_PUBLIC_APP_URL));
  }
  
  // Validate required parameters
  if (!code || !stateParam) {
    const redirectUrl = `/onboarding?callback=error&error=${encodeURIComponent('Missing required parameters')}`;
    return NextResponse.redirect(new URL(redirectUrl, process.env.NEXT_PUBLIC_APP_URL));
  }
  
  // Parse state parameter
  let state;
  try {
    state = JSON.parse(Buffer.from(stateParam, 'base64').toString());
    if (!state.workspaceId || !state.platform) {
        throw new Error('Invalid state content');
    }
  } catch (error) {
    const redirectUrl = `/onboarding?callback=error&error=${encodeURIComponent('Invalid state parameter')}`;
    return NextResponse.redirect(new URL(redirectUrl, process.env.NEXT_PUBLIC_APP_URL));
  }
  
  // Use the platform from the STATE object to determine the handler
  const platformFromState = state.platform.toUpperCase();
  
  let result: { success: boolean; data?: any; error?: string };
  
  switch (platformFromState) {
    case 'SHOPIFY':
      result = await handleShopifyCallback(code, state, state.shopUrl);
      break;
    case 'STRIPE':
      result = await handleStripeCallback(code, state);
      break;
    case 'GA4':
    case 'GOOGLE_ADS':
      result = await handleGoogleCallback(code, state);
      break;
    case 'META':
      result = await handleMetaCallback(code, state);
      break;
    case 'MAILCHIMP':
      result = await handleMailchimpCallback(code, state);
      break;
    default:
      result = { 
        success: false, 
        error: `Unsupported platform in state: ${platformFromState}` 
      };
  }
  
  // Redirect back to onboarding with status
  const redirectUrl = result.success
    ? `/onboarding?callback=success&platform=${platformFromState.toLowerCase()}`
    : `/onboarding?callback=error&error=${encodeURIComponent(result.error || 'Unknown error')}`;
  
  return NextResponse.redirect(new URL(redirectUrl, process.env.NEXT_PUBLIC_APP_URL));
} 