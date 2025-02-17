import { GoogleAdsClient } from '../utils/google-ads-client';
import { CAMPAIGN_FIELDS, DEVICE_SEGMENT, METRIC_FIELDS } from '../constants/google-ads';
import { AdAccount } from '@prisma/client';
import { db } from '../db';

interface GoogleAdsCustomer {
  descriptiveName: string;
  id: string;
}

interface GoogleAdsCampaign {
  id: string;
  name: string;
  status: string;
  start_date?: string;
  end_date?: string;
  campaign_budget?: {
    amount_micros: string;
  };
}

interface GoogleAdsMetrics {
  impressions: string;
  clicks: string;
  cost_micros: string;
  conversions: string;
  conversions_value: string;
  ctr: string;
  average_cpc: string;
  roas: string;
}

interface GoogleAdsConversionAction {
  id: string;
  name: string;
  status: string;
  category: string;
  type: string;
}

interface GoogleAdsResponse {
  campaign?: GoogleAdsCampaign;
  metrics?: GoogleAdsMetrics;
  segments?: {
    device: string;
    date: string;
  };
  conversion_action?: GoogleAdsConversionAction;
}

export class GoogleAdsService {
  private static instance: GoogleAdsService;
  private constructor() {}

  public static getInstance(): GoogleAdsService {
    if (!GoogleAdsService.instance) {
      GoogleAdsService.instance = new GoogleAdsService();
    }
    return GoogleAdsService.instance;
  }

  public async connectAccount(workspaceId: string, code: string) {
    try {
      // Get tokens from OAuth flow
      const googleAdsClient = GoogleAdsClient.getInstance();
      const { refresh_token, access_token } = await googleAdsClient.getAccessToken(code);

      // Initialize Google Ads API client
      const client = await googleAdsClient.getClient(refresh_token);

      // Get customer account info
      const { resource_names: resourceNames } = await client.listAccessibleCustomers(
        process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID!
      );
      
      if (!resourceNames?.length) {
        throw new Error('No accessible Google Ads accounts found');
      }

      // Create AdAccount records for each accessible account
      const accounts = await Promise.all(
        resourceNames.map(async (resourceName: string) => {
          const customerId = resourceName.split('/').pop() || '';
          const customer = await client.Customer({ 
            customer_id: customerId,
            refresh_token: refresh_token
          }) as unknown as GoogleAdsCustomer;
          
          return db.adAccount.create({
            data: {
              workspaceId,
              platform: 'GOOGLE_ADS',
              accountId: customerId,
              name: customer.descriptiveName || `Account ${customerId}`,
              status: 'ACTIVE',
              customerName: customer.descriptiveName,
              refreshToken: refresh_token,
              credentials: {
                access_token,
              },
            },
          });
        })
      );

      // Start initial sync for each account
      accounts.forEach((account) => {
        this.syncAccountData(account.id).catch(console.error);
      });

      return accounts;
    } catch (error) {
      console.error('Error connecting Google Ads account:', error);
      throw error;
    }
  }

  public async syncAccountData(adAccountId: string) {
    const account = await db.adAccount.findUnique({
      where: { id: adAccountId },
    });

    if (!account || !account.refreshToken) {
      throw new Error('Account not found or missing refresh token');
    }

    try {
      await db.adAccount.update({
        where: { id: adAccountId },
        data: { syncStatus: 'SYNCING' },
      });

      await Promise.all([
        this.syncCampaigns(account),
        this.syncMetrics(account),
        this.syncConversionActions(account),
      ]);

      await db.adAccount.update({
        where: { id: adAccountId },
        data: {
          syncStatus: 'SUCCESS',
          lastSyncedAt: new Date(),
        },
      });
    } catch (error) {
      await db.adAccount.update({
        where: { id: adAccountId },
        data: {
          syncStatus: 'ERROR',
          syncError: error instanceof Error ? error.message : 'Unknown error',
        },
      });
      throw error;
    }
  }

  private async syncCampaigns(account: AdAccount) {
    const client = await GoogleAdsClient.getInstance().getClient(account.refreshToken!);
    const customer = client.Customer({ 
      customer_id: account.accountId,
      refresh_token: account.refreshToken!
    });

    const query = `
      SELECT 
        ${CAMPAIGN_FIELDS.join(', ')}
      FROM campaign
      WHERE campaign.status != 'REMOVED'
    `;

    const response = await customer.query<GoogleAdsResponse[]>(query);

    // Process and store campaigns
    await Promise.all(
      response.map(async (row: GoogleAdsResponse) => {
        try {
          if (!row.campaign) return;
          
          const campaign = row.campaign;
          return db.campaign.upsert({
            where: {
              adAccountId_externalId: {
                adAccountId: account.id,
                externalId: campaign.id,
              },
            },
            create: {
              adAccountId: account.id,
              externalId: campaign.id,
              name: campaign.name,
              status: campaign.status,
              budget: campaign.campaign_budget?.amount_micros
                ? Number(campaign.campaign_budget.amount_micros) / 1_000_000
                : null,
              budgetType: 'DAILY',
              startDate: campaign.start_date ? new Date(campaign.start_date) : null,
              endDate: campaign.end_date ? new Date(campaign.end_date) : null,
            },
            update: {
              name: campaign.name,
              status: campaign.status,
              budget: campaign.campaign_budget?.amount_micros
                ? Number(campaign.campaign_budget.amount_micros) / 1_000_000
                : null,
              budgetType: 'DAILY',
              startDate: campaign.start_date ? new Date(campaign.start_date) : null,
              endDate: campaign.end_date ? new Date(campaign.end_date) : null,
            },
          });
        } catch (error) {
          console.error('Error processing campaign:', error);
        }
      })
    );
  }

  private async syncMetrics(account: AdAccount) {
    const client = await GoogleAdsClient.getInstance().getClient(account.refreshToken!);
    const customer = client.Customer({ 
      customer_id: account.accountId,
      refresh_token: account.refreshToken!
    });

    const query = `
      SELECT 
        campaign.id,
        ${METRIC_FIELDS.join(', ')},
        ${DEVICE_SEGMENT}
      FROM campaign
      WHERE 
        campaign.status != 'REMOVED'
        AND segments.date DURING LAST_30_DAYS
    `;

    const response = await customer.query<GoogleAdsResponse[]>(query);

    // Process and store metrics
    await Promise.all(
      response.map(async (row: GoogleAdsResponse) => {
        try {
          if (!row.campaign || !row.metrics || !row.segments) return;

          const metrics = row.metrics;
          const device = row.segments.device;
          const campaignId = row.campaign.id;

          // Find the campaign
          const campaign = await db.campaign.findUnique({
            where: {
              adAccountId_externalId: {
                adAccountId: account.id,
                externalId: campaignId,
              },
            },
          });

          if (!campaign) return;

          // Store device-specific metrics
          await db.deviceMetrics.create({
            data: {
              campaignId: campaign.id,
              date: new Date(row.segments.date),
              device: device,
              impressions: Number(metrics.impressions),
              clicks: Number(metrics.clicks),
              cost: Number(metrics.cost_micros) / 1_000_000,
              conversions: Number(metrics.conversions),
              conversionValue: Number(metrics.conversions_value),
            },
          });

          // Store campaign-level metrics
          await db.adMetrics.create({
            data: {
              adAccountId: account.id,
              campaignId: campaign.id,
              date: new Date(row.segments.date),
              impressions: Number(metrics.impressions),
              clicks: Number(metrics.clicks),
              cost: Number(metrics.cost_micros) / 1_000_000,
              conversions: Number(metrics.conversions),
              conversionValue: Number(metrics.conversions_value),
              ctr: Number(metrics.ctr) || 0,
              cpc: Number(metrics.average_cpc) / 1_000_000 || 0,
              roas: Number(metrics.roas) || 0,
            },
          });
        } catch (error) {
          console.error('Error processing metrics:', error);
        }
      })
    );
  }

  private async syncConversionActions(account: AdAccount) {
    const client = await GoogleAdsClient.getInstance().getClient(account.refreshToken!);
    const customer = client.Customer({ 
      customer_id: account.accountId,
      refresh_token: account.refreshToken!
    });

    const query = `
      SELECT 
        conversion_action.id,
        conversion_action.name,
        conversion_action.status,
        conversion_action.type,
        conversion_action.category
      FROM conversion_action
    `;

    const response = await customer.query<GoogleAdsResponse[]>(query);

    // Process and store conversion actions
    await Promise.all(
      response.map(async (row: GoogleAdsResponse) => {
        if (!row.conversion_action) return;

        const conversion = row.conversion_action;
        return db.conversionAction.upsert({
          where: {
            adAccountId_externalId: {
              adAccountId: account.id,
              externalId: conversion.id,
            },
          },
          create: {
            adAccountId: account.id,
            externalId: conversion.id,
            name: conversion.name,
            category: conversion.category,
            status: conversion.status,
          },
          update: {
            name: conversion.name,
            category: conversion.category,
            status: conversion.status,
          },
        });
      })
    );
  }
} 