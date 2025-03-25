import { GoogleAdsApi } from 'google-ads-api';
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_ADS_CONFIG, GOOGLE_ADS_SCOPES } from '../constants/google-ads';

export class GoogleAdsClient {
  private static instance: GoogleAdsClient;
  private constructor() {}

  public static getInstance(): GoogleAdsClient {
    if (!GoogleAdsClient.instance) {
      GoogleAdsClient.instance = new GoogleAdsClient();
    }
    return GoogleAdsClient.instance;
  }

  public getOAuth2Client(): OAuth2Client {
    const redirectUri = process.env.NODE_ENV === 'production' 
      ? `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google-ads/callback`
      : 'http://localhost:3000/api/auth/google-ads/callback';
      
    return new OAuth2Client({
      clientId: GOOGLE_ADS_CONFIG.client_id,
      clientSecret: GOOGLE_ADS_CONFIG.client_secret,
      redirectUri: redirectUri,
    });
  }

  public getAuthUrl(): string {
    const oauth2Client = this.getOAuth2Client();
    return oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: GOOGLE_ADS_SCOPES,
      prompt: 'consent',
    });
  }

  public async getClient(refreshToken: string): Promise<GoogleAdsApi> {
    const oauth2Client = this.getOAuth2Client();
    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    return new GoogleAdsApi({
      client_id: GOOGLE_ADS_CONFIG.client_id!,
      client_secret: GOOGLE_ADS_CONFIG.client_secret!,
      developer_token: GOOGLE_ADS_CONFIG.developer_token!,
    });
  }

  public async getAccessToken(code: string): Promise<{
    refresh_token: string;
    access_token: string;
  }> {
    const oauth2Client = this.getOAuth2Client();
    const { tokens } = await oauth2Client.getToken(code);
    
    if (!tokens.refresh_token || !tokens.access_token) {
      throw new Error('Failed to get refresh token or access token');
    }

    return {
      refresh_token: tokens.refresh_token,
      access_token: tokens.access_token,
    };
  }

  public async getCustomerId(accessToken: string): Promise<string> {
    try {
      const oauth2Client = this.getOAuth2Client();
      oauth2Client.setCredentials({ access_token: accessToken });
      
      interface CustomerResponse {
        resourceNames: string[];
      }
      
      const response = await oauth2Client.request<CustomerResponse>({
        url: 'https://googleads.googleapis.com/v16/customers:listAccessibleCustomers',
        method: 'GET',
        headers: {
          'developer-token': GOOGLE_ADS_CONFIG.developer_token
        }
      });
      
      if (response.data?.resourceNames?.length > 0) {
        const customerResourceName = response.data.resourceNames[0];
        return customerResourceName.split('/')[1];
      }
      
      return `temp_${Date.now()}`;
    } catch (error) {
      console.error('Error retrieving Google Ads customer ID:', error);
      return `temp_${Date.now()}`;
    }
  }
} 