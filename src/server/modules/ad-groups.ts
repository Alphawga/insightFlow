import { z } from 'zod';
import { publicProcedure } from '../trpc';
import { db } from '@/lib/db';
import { TRPCError } from '@trpc/server';
import { GoogleAdsService } from '@/lib/services/google-ads.service';

const targetingSchema = z.object({
  locations: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  demographics: z.object({
    ageRanges: z.array(z.string()).optional(),
    genders: z.array(z.string()).optional(),
    parentalStatus: z.array(z.string()).optional(),
    householdIncome: z.array(z.string()).optional(),
  }).optional(),
  interests: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
});

const adGroupSchema = z.object({
  name: z.string().min(1),
  status: z.enum(['ENABLED', 'PAUSED']),
  cpcBid: z.number().min(0.01),
  targeting: targetingSchema.optional(),
  description: z.string().optional(),
});

export const getAdGroups = publicProcedure
  .input(
    z.object({
      campaignId: z.string(),
    })
  )
  .query(async ({ input }) => {
    const adGroups = await db.adGroup.findMany({
      where: {
        campaignId: input.campaignId,
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

    return adGroups.map((adGroup) => ({
      id: adGroup.id,
      name: adGroup.name,
      status: adGroup.status,
      cpcBid: adGroup.cpcBid,
      impressions: adGroup.metrics[0]?.impressions || 0,
      clicks: adGroup.metrics[0]?.clicks || 0,
      cost: adGroup.metrics[0]?.cost || 0,
      conversions: adGroup.metrics[0]?.conversions || 0,
    }));
  });

export const getAdGroup = publicProcedure
  .input(
    z.object({
      adGroupId: z.string(),
    })
  )
  .query(async ({ input }) => {
    const adGroup = await db.adGroup.findUnique({
      where: {
        id: input.adGroupId,
      },
    });

    if (!adGroup) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Ad group not found',
      });
    }

    return adGroup;
  });

export const createAdGroup = publicProcedure
  .input(adGroupSchema.extend({ campaignId: z.string() }))
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

    // Create ad group in Google Ads
    const googleAdsService = new GoogleAdsService(campaign.adAccount.refreshToken);
    const googleAdsAdGroup = await googleAdsService.createAdGroup({
      ...input,
      customerId: campaign.adAccount.platformAccountId,
      campaignId: campaign.platformCampaignId,
    });

    // Create ad group in database
    const adGroup = await db.adGroup.create({
      data: {
        name: input.name,
        status: input.status,
        cpcBid: input.cpcBid,
        targeting: input.targeting,
        description: input.description,
        platformAdGroupId: googleAdsAdGroup.id,
        campaignId: input.campaignId,
      },
    });

    return adGroup;
  });

export const updateAdGroup = publicProcedure
  .input(adGroupSchema.extend({ id: z.string() }))
  .mutation(async ({ input }) => {
    const adGroup = await db.adGroup.findUnique({
      where: {
        id: input.id,
      },
      include: {
        campaign: {
          include: {
            adAccount: true,
          },
        },
      },
    });

    if (!adGroup) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Ad group not found',
      });
    }

    // Update ad group in Google Ads
    const googleAdsService = new GoogleAdsService(adGroup.campaign.adAccount.refreshToken);
    await googleAdsService.updateAdGroup({
      ...input,
      customerId: adGroup.campaign.adAccount.platformAccountId,
      campaignId: adGroup.campaign.platformCampaignId,
      adGroupId: adGroup.platformAdGroupId,
    });

    // Update ad group in database
    const updatedAdGroup = await db.adGroup.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        status: input.status,
        cpcBid: input.cpcBid,
        targeting: input.targeting,
        description: input.description,
      },
    });

    return updatedAdGroup;
  });

export const updateAdGroupStatus = publicProcedure
  .input(
    z.object({
      adGroupId: z.string(),
      status: z.enum(['ENABLED', 'PAUSED', 'REMOVED']),
    })
  )
  .mutation(async ({ input }) => {
    const adGroup = await db.adGroup.findUnique({
      where: {
        id: input.adGroupId,
      },
      include: {
        campaign: {
          include: {
            adAccount: true,
          },
        },
      },
    });

    if (!adGroup) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Ad group not found',
      });
    }

    // Update ad group status in Google Ads
    const googleAdsService = new GoogleAdsService(adGroup.campaign.adAccount.refreshToken);
    await googleAdsService.updateAdGroupStatus({
      customerId: adGroup.campaign.adAccount.platformAccountId,
      campaignId: adGroup.campaign.platformCampaignId,
      adGroupId: adGroup.platformAdGroupId,
      status: input.status,
    });

    // Update ad group status in database
    const updatedAdGroup = await db.adGroup.update({
      where: {
        id: input.adGroupId,
      },
      data: {
        status: input.status,
      },
    });

    return updatedAdGroup;
  }); 