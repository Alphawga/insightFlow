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
  ad_group?: GoogleAdsAdGroup;
}

interface GoogleAdsAdGroup {
  id: string;
  name: string;
  status: string;
  cpc_bid_micros?: string;
}

interface CreateAdGroupParams {
  customerId: string;
  campaignId: string;
  name: string;
  status: string;
  cpcBid: number;
  targeting?: {
    locations?: string[];
    languages?: string[];
    demographics?: {
      ageRanges?: string[];
      genders?: string[];
      parentalStatus?: string[];
      householdIncome?: string[];
    };
    interests?: string[];
    keywords?: string[];
  };
  description?: string;
  refreshToken: string;
}

interface UpdateAdGroupParams extends CreateAdGroupParams {
  adGroupId: string;
}

interface UpdateAdGroupStatusParams {
  customerId: string;
  campaignId: string;
  adGroupId: string;
  status: string;
  refreshToken: string;
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
        this.syncAdGroups(account),
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

  private async syncAdGroups(account: AdAccount) {
    const client = await GoogleAdsClient.getInstance().getClient(account.refreshToken!);
    const customer = client.Customer({ 
      customer_id: account.accountId,
      refresh_token: account.refreshToken!
    });

    const query = `
      SELECT 
        campaign.id,
        ad_group.id,
        ad_group.name,
        ad_group.status,
        ad_group.cpc_bid_micros
      FROM ad_group
      WHERE ad_group.status != 'REMOVED'
    `;

    const response = await customer.query<GoogleAdsResponse[]>(query);

    // Process and store ad groups
    await Promise.all(
      response.map(async (row: GoogleAdsResponse) => {
        try {
          if (!row.campaign || !row.ad_group) return;
          
          const adGroup = row.ad_group;
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

          return db.adGroup.upsert({
            where: {
              platformAdGroupId_campaignId: {
                platformAdGroupId: adGroup.id,
                campaignId: campaign.id,
              },
            },
            create: {
              campaignId: campaign.id,
              name: adGroup.name,
              status: adGroup.status,
              cpcBid: adGroup.cpc_bid_micros ? Number(adGroup.cpc_bid_micros) / 1_000_000 : 0,
              platformAdGroupId: adGroup.id,
            },
            update: {
              name: adGroup.name,
              status: adGroup.status,
              cpcBid: adGroup.cpc_bid_micros ? Number(adGroup.cpc_bid_micros) / 1_000_000 : 0,
            },
          });
        } catch (error) {
          console.error('Error processing ad group:', error);
        }
      })
    );
  }

  public async createAdGroup(params: CreateAdGroupParams) {
    try {
      const client = await GoogleAdsClient.getInstance().getClient(params.refreshToken);
      const customer = client.Customer({ 
        customer_id: params.customerId,
        refresh_token: params.refreshToken
      });
      
      // Create ad group in Google Ads with minimal required fields
      // Using as any to bypass the type checking since the actual API accepts these fields
      const adGroup = {
        name: params.name,
        status: params.status,
        campaign: `customers/${params.customerId}/campaigns/${params.campaignId}`,
        cpc_bid_micros: Math.round(params.cpcBid * 1_000_000).toString()
      } as any;
      
      const response = await customer.adGroups.create([adGroup]);
      
      if (!response || !response.results || response.results.length === 0) {
        throw new Error('Failed to create ad group');
      }
      
      const newAdGroup = response.results[0];
      // Handle possible null or undefined
      const resourceName = newAdGroup.resource_name || '';
      const adGroupId = resourceName.split('/').pop() || '';
      
      // Apply targeting criteria if provided
      if (params.targeting) {
        await this.applyTargetingCriteria({
          customerId: params.customerId,
          refreshToken: params.refreshToken,
          adGroupId,
          targeting: params.targeting
        });
      }
      
      return {
        id: adGroupId,
        name: params.name,
        status: params.status,
      };
    } catch (error) {
      console.error('Error creating ad group:', error);
      throw error;
    }
  }

  public async updateAdGroup(params: UpdateAdGroupParams) {
    try {
      const client = await GoogleAdsClient.getInstance().getClient(params.refreshToken);
      const customer = client.Customer({ 
        customer_id: params.customerId,
        refresh_token: params.refreshToken
      });
      
      // Update ad group with minimal required fields
      // Using as any to bypass the type checking since the actual API accepts these fields
      const adGroup = {
        resource_name: `customers/${params.customerId}/adGroups/${params.adGroupId}`,
        name: params.name,
        status: params.status,
        cpc_bid_micros: Math.round(params.cpcBid * 1_000_000).toString()
      } as any;
      
      await customer.adGroups.update([adGroup], {
        update_mask: {
          paths: ['name', 'status', 'cpc_bid_micros']
        }
      } as any);
      
      // Update targeting criteria if provided
      if (params.targeting) {
        // Remove existing targeting criteria
        await this.removeTargetingCriteria({
          customerId: params.customerId,
          refreshToken: params.refreshToken,
          adGroupId: params.adGroupId
        });
        
        // Apply new targeting criteria
        await this.applyTargetingCriteria({
          customerId: params.customerId,
          refreshToken: params.refreshToken,
          adGroupId: params.adGroupId,
          targeting: params.targeting
        });
      }
      
      return {
        id: params.adGroupId,
        name: params.name,
        status: params.status,
      };
    } catch (error) {
      console.error('Error updating ad group:', error);
      throw error;
    }
  }

  public async updateAdGroupStatus(params: UpdateAdGroupStatusParams) {
    try {
      const client = await GoogleAdsClient.getInstance().getClient(params.refreshToken);
      const customer = client.Customer({ 
        customer_id: params.customerId,
        refresh_token: params.refreshToken
      });
      
      // Update status with minimal required fields
      // Using as any to bypass the type checking since the actual API accepts these fields
      const adGroup = {
        resource_name: `customers/${params.customerId}/adGroups/${params.adGroupId}`,
        status: params.status
      } as any;
      
      await customer.adGroups.update([adGroup], {
        update_mask: {
          paths: ['status']
        }
      } as any);
      
      return {
        id: params.adGroupId,
        status: params.status,
      };
    } catch (error) {
      console.error('Error updating ad group status:', error);
      throw error;
    }
  }

  private async applyTargetingCriteria({ customerId, refreshToken, adGroupId, targeting }: { 
    customerId: string, 
    refreshToken: string,
    adGroupId: string, 
    targeting: CreateAdGroupParams['targeting'] 
  }) {
    // Implementation would handle applying all targeting criteria types:
    // - Location targeting
    // - Language targeting
    // - Demographic targeting
    // - Interest targeting
    // - Keyword targeting
    
    // This is a placeholder for the actual implementation
    const client = await GoogleAdsClient.getInstance().getClient(customerId);
    const customer = client.Customer({ 
      customer_id: customerId,
      refresh_token: refreshToken
    });
    
    const operations: any[] = [];
    
    // Handle each targeting type...
    // (Implementation details would go here)
    
    if (operations.length > 0) {
      await customer.adGroupCriteria.create(operations);
    }
  }

  private async removeTargetingCriteria({ customerId, refreshToken, adGroupId }: { 
    customerId: string, 
    refreshToken: string,
    adGroupId: string 
  }) {
    // Implementation would remove existing targeting criteria
    // This is a placeholder for the actual implementation
    const client = await GoogleAdsClient.getInstance().getClient(customerId);
    const customer = client.Customer({ 
      customer_id: customerId,
      refresh_token: refreshToken
    });
    
    // Query existing criteria
    const query = `
      SELECT 
        ad_group_criterion.criterion_id,
        ad_group_criterion.type
      FROM ad_group_criterion
      WHERE ad_group_criterion.ad_group = 'customers/${customerId}/adGroups/${adGroupId}'
    `;
    
    const response = await customer.query(query);
    
    // Remove all found criteria
    const removeOperations = response.map((row: any) => 
      `customers/${customerId}/adGroupCriteria/${adGroupId}_${row.ad_group_criterion.criterion_id}`
    );
    
    if (removeOperations.length > 0) {
      await customer.adGroupCriteria.remove(removeOperations);
    }
  }
} 