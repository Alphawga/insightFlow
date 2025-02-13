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
    return new OAuth2Client({
      clientId: GOOGLE_ADS_CONFIG.client_id,
      clientSecret: GOOGLE_ADS_CONFIG.client_secret,
      redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google-ads/callback`,
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

    const { token: access_token } = await oauth2Client.getAccessToken();

    return new GoogleAdsApi({
      client_id: GOOGLE_ADS_CONFIG.client_id!,
      client_secret: GOOGLE_ADS_CONFIG.client_secret!,
      developer_token: GOOGLE_ADS_CONFIG.developer_token!,
      refresh_token: refreshToken,
      access_token: access_token as string,
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
} 