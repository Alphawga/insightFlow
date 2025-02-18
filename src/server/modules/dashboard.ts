import { z } from 'zod';
import { publicProcedure } from '../trpc';
import { db } from '@/lib/db';

export const getDashboardMetrics = publicProcedure
  .input(
    z.object({
      workspaceId: z.string(),
      dateRange: z.object({
        startDate: z.date(),
        endDate: z.date(),
      }).optional(),
    })
  )
  .query(async ({ input }) => {
    const { workspaceId, dateRange } = input;
    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));

    // Get all ad accounts for the workspace
    const adAccounts = await db.adAccount.findMany({
      where: {
        workspaceId,
        platform: 'GOOGLE_ADS',
      },
      include: {
        campaigns: {
          include: {
            metrics: {
              where: {
                date: {
                  gte: dateRange?.startDate || thirtyDaysAgo,
                  lte: dateRange?.endDate || new Date(),
                },
              },
            },
            deviceMetrics: {
              where: {
                date: {
                  gte: dateRange?.startDate || thirtyDaysAgo,
                  lte: dateRange?.endDate || new Date(),
                },
              },
            },
          },
        },
      },
    });

    // Calculate aggregate metrics
    let totalImpressions = 0;
    let totalClicks = 0;
    let totalCost = 0;
    let totalConversions = 0;
    let totalConversionValue = 0;

    // Device metrics
    const deviceMetrics = {
      DESKTOP: { impressions: 0, clicks: 0, conversions: 0, cost: 0 },
      MOBILE: { impressions: 0, clicks: 0, conversions: 0, cost: 0 },
      TABLET: { impressions: 0, clicks: 0, conversions: 0, cost: 0 },
    };

    // Campaign data
    const campaigns = adAccounts.flatMap(account => 
      account.campaigns.map(campaign => ({
        id: campaign.id,
        name: campaign.name,
        status: campaign.status,
        budget: campaign.budget || 0,
        spent: campaign.metrics.reduce((sum, m) => sum + m.cost, 0),
        impressions: campaign.metrics.reduce((sum, m) => sum + m.impressions, 0),
        clicks: campaign.metrics.reduce((sum, m) => sum + m.clicks, 0),
        conversions: campaign.metrics.reduce((sum, m) => sum + m.conversions, 0),
      }))
    );

    // Calculate totals and device metrics
    adAccounts.forEach(account => {
      account.campaigns.forEach(campaign => {
        campaign.metrics.forEach(metric => {
          totalImpressions += metric.impressions;
          totalClicks += metric.clicks;
          totalCost += metric.cost;
          totalConversions += metric.conversions;
          totalConversionValue += metric.conversionValue;
        });

        campaign.deviceMetrics.forEach(metric => {
          const device = metric.device as keyof typeof deviceMetrics;
          if (deviceMetrics[device]) {
            deviceMetrics[device].impressions += metric.impressions;
            deviceMetrics[device].clicks += metric.clicks;
            deviceMetrics[device].conversions += metric.conversions;
            deviceMetrics[device].cost += metric.cost;
          }
        });
      });
    });

    // Calculate overall metrics
    const ctr = totalImpressions > 0 ? (totalClicks / totalImpressions) * 100 : 0;
    const cpc = totalClicks > 0 ? totalCost / totalClicks : 0;
    const roas = totalCost > 0 ? totalConversionValue / totalCost : 0;

    // Calculate previous period metrics for trends
    const previousStartDate = new Date(dateRange?.startDate || thirtyDaysAgo);
    const previousEndDate = new Date(dateRange?.endDate || new Date());
    const previousPeriodLength = previousEndDate.getTime() - previousStartDate.getTime();
    
    previousStartDate.setTime(previousStartDate.getTime() - previousPeriodLength);
    previousEndDate.setTime(previousEndDate.getTime() - previousPeriodLength);

    const previousMetrics = await db.metric.groupBy({
      by: ['campaignId'],
      where: {
        campaign: {
          adAccount: {
            workspaceId,
          },
        },
        date: {
          gte: previousStartDate,
          lte: previousEndDate,
        },
      },
      _sum: {
        impressions: true,
        clicks: true,
        cost: true,
        conversions: true,
        conversionValue: true,
      },
    });

    // Calculate trends
    const previousTotalImpressions = previousMetrics.reduce((sum, m) => sum + (m._sum.impressions || 0), 0);
    const previousTotalClicks = previousMetrics.reduce((sum, m) => sum + (m._sum.clicks || 0), 0);
    const previousTotalConversions = previousMetrics.reduce((sum, m) => sum + (m._sum.conversions || 0), 0);
    const previousTotalCost = previousMetrics.reduce((sum, m) => sum + (m._sum.cost || 0), 0);
    const previousTotalValue = previousMetrics.reduce((sum, m) => sum + (m._sum.conversionValue || 0), 0);

    const previousCtr = previousTotalImpressions > 0 ? (previousTotalClicks / previousTotalImpressions) * 100 : 0;
    const previousCpc = previousTotalClicks > 0 ? previousTotalCost / previousTotalClicks : 0;
    const previousRoas = previousTotalCost > 0 ? previousTotalValue / previousTotalCost : 0;

    const calculateTrend = (current: number, previous: number) => 
      previous > 0 ? ((current - previous) / previous) * 100 : 0;

    return {
      timestamp: new Date().toISOString(),
      overview: {
        ctr: ctr.toFixed(2),
        cpc: cpc.toFixed(2),
        conversions: totalConversions,
        roas: roas.toFixed(2),
        trends: {
          ctr: calculateTrend(ctr, previousCtr),
          cpc: calculateTrend(cpc, previousCpc),
          conversions: calculateTrend(totalConversions, previousTotalConversions),
          roas: calculateTrend(roas, previousRoas),
        },
      },
      campaigns,
      deviceMetrics: Object.entries(deviceMetrics).map(([device, metrics]) => ({
        device,
        ...metrics,
        ctr: metrics.impressions > 0 ? 
          ((metrics.clicks / metrics.impressions) * 100).toFixed(2) : '0',
      })),
    };
  }); 