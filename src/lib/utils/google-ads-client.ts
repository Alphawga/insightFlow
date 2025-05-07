import { GoogleAdsApi } from 'google-ads-api';
import { OAuth2Client } from 'google-auth-library';
import { GOOGLE_ADS_CONFIG, GOOGLE_ADS_SCOPES } from '../constants/google-ads';

export class GoogleAdsClient {
  private static instance: GoogleAdsClient;
  private clientId: string;
  private clientSecret: string;
  private redirectUri: string;
  private developerToken: string;
  private oauth2Client: OAuth2Client;

  private constructor() {
    this.clientId = process.env.GOOGLE_CLIENT_ID || '';
    this.clientSecret = process.env.GOOGLE_CLIENT_SECRET || '';
    this.redirectUri = `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/google-ads/callback`;
    this.developerToken = process.env.GOOGLE_ADS_DEVELOPER_TOKEN || '';

    if (!this.clientId || !this.clientSecret || !this.developerToken) {
      throw new Error('Missing Google Ads API credentials in environment variables');
    }

    this.oauth2Client = new OAuth2Client(
      this.clientId,
      this.clientSecret,
      this.redirectUri
    );
  }

  public static getInstance(): GoogleAdsClient {
    if (!GoogleAdsClient.instance) {
      GoogleAdsClient.instance = new GoogleAdsClient();
    }
    return GoogleAdsClient.instance;
  }

  public getOAuth2Client(): OAuth2Client {
    return this.oauth2Client;
  }

  public getAuthUrl(state?: string): string {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/adwords'],
      prompt: 'consent',
      state: state,
    });
  }

  public async getClient(refreshToken: string): Promise<GoogleAdsApi> {
    const oauth2Client = this.getOAuth2Client();
    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    return new GoogleAdsApi({
      client_id: this.clientId,
      client_secret: this.clientSecret,
      developer_token: this.developerToken,
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
    const accessibleCustomers = await this.listAccessibleCustomers(accessToken);
    if (!accessibleCustomers || accessibleCustomers.length === 0) {
        throw new Error('No accessible Google Ads customer accounts found.');
    }
    const customerId = accessibleCustomers[0].split('/')[1];
    return customerId;
  }

  public async listAccessibleCustomers(accessToken: string): Promise<string[]> {
    const url = 'https://googleads.googleapis.com/v16/customers:listAccessibleCustomers';
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'developer-token': this.developerToken,
    };

    const response = await fetch(url, { method: 'GET', headers });
    if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Failed to list accessible customers: ${response.status} ${errorData}`);
    }
    const data = await response.json();
    return data.resourceNames || [];
  }

  public async getCustomerDetails(customerId: string, accessToken: string): Promise<{ descriptiveName?: string, [key: string]: any } | null> {
    const loginCustomerId = this.getLoginCustomerId();
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'developer-token': this.developerToken,
        'login-customer-id': loginCustomerId || customerId,
    };
    const query = `SELECT customer.descriptive_name, customer.id FROM customer WHERE customer.id = '${customerId}'`;
    const url = `https://googleads.googleapis.com/v16/customers/${customerId}/googleAds:searchStream`;

    const body = JSON.stringify({ query });

    try {
        const response = await fetch(url, { 
            method: 'POST', 
            headers: { ...headers, 'Content-Type': 'application/json' },
            body 
        });
        if (!response.ok) {
            const errorData = await response.text();
            console.error(`Failed to fetch customer details for ${customerId}: ${response.status} ${errorData}`);
            return null;
        }
        const results = await response.json();
        if (results && results.length > 0 && results[0].results && results[0].results.length > 0) {
            return results[0].results[0].customer;
        }
        return null;
    } catch (error) {
        console.error("Error fetching customer details:", error);
        return null;
    }
  }

  public getLoginCustomerId(): string | undefined {
    return undefined;
  }
} 