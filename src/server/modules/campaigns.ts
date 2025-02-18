import { z } from 'zod';
import { publicProcedure } from '../trpc';
import { db } from '@/lib/db';
import { TRPCError } from '@trpc/server';
import { GoogleAdsService } from '@/lib/services/google-ads.service';

const campaignSchema = z.object({
  name: z.string().min(1),
  status: z.enum(['ENABLED', 'PAUSED']),
  budget: z.number().min(1),
  startDate: z.date(),
  endDate: z.date().optional(),
  description: z.string().optional(),
  targetAudience: z.string().optional(),
  bidStrategy: z.enum(['MANUAL_CPC', 'TARGET_CPA', 'MAXIMIZE_CONVERSIONS']),
});

export const getCampaigns = publicProcedure
  .input(
    z.object({
      workspaceId: z.string(),
    })
  )
  .query(async ({ input }) => {
    const campaigns = await db.campaign.findMany({
      where: {
        adAccount: {
          workspaceId: input.workspaceId,
        },
      },
      include: {
        metrics: {
          orderBy: {
            date: 'desc',
          },
          take: 1,
        },
      },
    });

    return campaigns.map((campaign) => ({
      id: campaign.id,
      name: campaign.name,
      status: campaign.status,
      budget: campaign.budget,
      spent: campaign.metrics[0]?.cost || 0,
      impressions: campaign.metrics[0]?.impressions || 0,
      clicks: campaign.metrics[0]?.clicks || 0,
      conversions: campaign.metrics[0]?.conversions || 0,
    }));
  });

export const getCampaign = publicProcedure
  .input(
    z.object({
      campaignId: z.string(),
    })
  )
  .query(async ({ input }) => {
    const campaign = await db.campaign.findUnique({
      where: {
        id: input.campaignId,
      },
    });

    if (!campaign) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Campaign not found',
      });
    }

    return campaign;
  });

export const createCampaign = publicProcedure
  .input(campaignSchema)
  .mutation(async ({ input, ctx }) => {
    const workspace = await db.workspace.findFirst({
      where: {
        users: {
          some: {
            userId: ctx.session?.user?.id,
          },
        },
      },
      include: {
        adAccounts: {
          where: {
            platform: 'GOOGLE_ADS',
          },
        },
      },
    });

    if (!workspace) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Workspace not found',
      });
    }

    const adAccount = workspace.adAccounts[0];
    if (!adAccount) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'No Google Ads account found',
      });
    }

    // Create campaign in Google Ads
    const googleAdsService = new GoogleAdsService(adAccount.refreshToken);
    const googleAdsCampaign = await googleAdsService.createCampaign({
      ...input,
      customerId: adAccount.platformAccountId,
    });

    // Create campaign in database
    const campaign = await db.campaign.create({
      data: {
        name: input.name,
        status: input.status,
        budget: input.budget,
        startDate: input.startDate,
        endDate: input.endDate,
        description: input.description,
        targetAudience: input.targetAudience,
        bidStrategy: input.bidStrategy,
        platformCampaignId: googleAdsCampaign.id,
        adAccountId: adAccount.id,
      },
    });

    return campaign;
  });

export const updateCampaign = publicProcedure
  .input(campaignSchema.extend({ id: z.string() }))
  .mutation(async ({ input }) => {
    const campaign = await db.campaign.findUnique({
      where: {
        id: input.id,
      },
      include: {
        adAccount: true,
      },
    });

    if (!campaign) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Campaign not found',
      });
    }

    // Update campaign in Google Ads
    const googleAdsService = new GoogleAdsService(campaign.adAccount.refreshToken);
    await googleAdsService.updateCampaign({
      ...input,
      customerId: campaign.adAccount.platformAccountId,
      campaignId: campaign.platformCampaignId,
    });

    // Update campaign in database
    const updatedCampaign = await db.campaign.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        status: input.status,
        budget: input.budget,
        startDate: input.startDate,
        endDate: input.endDate,
        description: input.description,
        targetAudience: input.targetAudience,
        bidStrategy: input.bidStrategy,
      },
    });

    return updatedCampaign;
  });

export const updateCampaignStatus = publicProcedure
  .input(
    z.object({
      campaignId: z.string(),
      status: z.enum(['ENABLED', 'PAUSED', 'REMOVED']),
    })
  )
  .mutation(async ({ input }) => {
    const campaign = await db.campaign.findUnique({
      where: {
        id: input.campaignId,
      },
      include: {
        adAccount: true,
      },
    });

    if (!campaign) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Campaign not found',
      });
    }

    // Update campaign status in Google Ads
    const googleAdsService = new GoogleAdsService(campaign.adAccount.refreshToken);
    await googleAdsService.updateCampaignStatus({
      customerId: campaign.adAccount.platformAccountId,
      campaignId: campaign.platformCampaignId,
      status: input.status,
    });

    // Update campaign status in database
    const updatedCampaign = await db.campaign.update({
      where: {
        id: input.campaignId,
      },
      data: {
        status: input.status,
      },
    });

    return updatedCampaign;
  }); 