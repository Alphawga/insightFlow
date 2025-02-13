import { GoogleAdsClient } from '../utils/google-ads-client';
import { prisma } from '../prisma';
import { CAMPAIGN_FIELDS, DEVICE_SEGMENT, METRIC_FIELDS } from '../constants/google-ads';
import { AdAccount, Campaign } from '@prisma/client';

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
      const customers = await client.listAccessibleCustomers();
      
      if (!customers.length) {
        throw new Error('No accessible Google Ads accounts found');
      }

      // Create AdAccount records for each accessible account
      const accounts = await Promise.all(
        customers.map(async (customerId) => {
          const customer = await client.getCustomer(customerId);
          
          return prisma.adAccount.create({
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
    const account = await prisma.adAccount.findUnique({
      where: { id: adAccountId },
    });

    if (!account || !account.refreshToken) {
      throw new Error('Account not found or missing refresh token');
    }

    try {
      await prisma.adAccount.update({
        where: { id: adAccountId },
        data: { syncStatus: 'SYNCING' },
      });

      await Promise.all([
        this.syncCampaigns(account),
        this.syncMetrics(account),
        this.syncConversionActions(account),
      ]);

      await prisma.adAccount.update({
        where: { id: adAccountId },
        data: {
          syncStatus: 'SUCCESS',
          lastSyncedAt: new Date(),
        },
      });
    } catch (error) {
      await prisma.adAccount.update({
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
    const customer = client.getCustomer(account.accountId);

    const query = `
      SELECT 
        ${CAMPAIGN_FIELDS.join(', ')}
      FROM campaign
      WHERE campaign.status != 'REMOVED'
    `;

    const response = await customer.query(query);

    // Process and store campaigns
    await Promise.all(
      response.map(async (row) => {
        const campaign = row.campaign;
        return prisma.campaign.upsert({
          where: {
            adAccountId_externalId: {
              adAccountId: account.id,
              externalId: campaign.id.toString(),
            },
          },
          create: {
            adAccountId: account.id,
            externalId: campaign.id.toString(),
            name: campaign.name,
            status: campaign.status,
            budget: row.campaign_budget?.amount_micros
              ? Number(row.campaign_budget.amount_micros) / 1_000_000
              : null,
            startDate: campaign.start_date ? new Date(campaign.start_date) : null,
            endDate: campaign.end_date ? new Date(campaign.end_date) : null,
          },
          update: {
            name: campaign.name,
            status: campaign.status,
            budget: row.campaign_budget?.amount_micros
              ? Number(row.campaign_budget.amount_micros) / 1_000_000
              : null,
            startDate: campaign.start_date ? new Date(campaign.start_date) : null,
            endDate: campaign.end_date ? new Date(campaign.end_date) : null,
          },
        });
      })
    );
  }

  private async syncMetrics(account: AdAccount) {
    const client = await GoogleAdsClient.getInstance().getClient(account.refreshToken!);
    const customer = client.getCustomer(account.accountId);

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

    const response = await customer.query(query);

    // Process and store metrics
    await Promise.all(
      response.map(async (row) => {
        const metrics = row.metrics;
        const device = row.segments.device;
        const campaignId = row.campaign.id.toString();

        // Find the campaign
        const campaign = await prisma.campaign.findUnique({
          where: {
            adAccountId_externalId: {
              adAccountId: account.id,
              externalId: campaignId,
            },
          },
        });

        if (!campaign) return;

        // Store device-specific metrics
        await prisma.deviceMetrics.create({
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
        await prisma.adMetrics.create({
          data: {
            adAccountId: account.id,
            campaignId: campaign.id,
            date: new Date(row.segments.date),
            impressions: Number(metrics.impressions),
            clicks: Number(metrics.clicks),
            cost: Number(metrics.cost_micros) / 1_000_000,
            conversions: Number(metrics.conversions),
            conversionValue: Number(metrics.conversions_value),
            ctr: Number(metrics.ctr),
            cpc: Number(metrics.average_cpc) / 1_000_000,
            roas: Number(metrics.roas),
          },
        });
      })
    );
  }

  private async syncConversionActions(account: AdAccount) {
    const client = await GoogleAdsClient.getInstance().getClient(account.refreshToken!);
    const customer = client.getCustomer(account.accountId);

    const query = `
      SELECT 
        conversion_action.id,
        conversion_action.name,
        conversion_action.status,
        conversion_action.type,
        conversion_action.category
      FROM conversion_action
    `;

    const response = await customer.query(query);

    // Process and store conversion actions
    await Promise.all(
      response.map(async (row) => {
        const conversion = row.conversion_action;
        return prisma.conversionAction.upsert({
          where: {
            adAccountId_externalId: {
              adAccountId: account.id,
              externalId: conversion.id.toString(),
            },
          },
          create: {
            adAccountId: account.id,
            externalId: conversion.id.toString(),
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