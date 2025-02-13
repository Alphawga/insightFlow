export const GOOGLE_ADS_SCOPES = [
  'https://www.googleapis.com/auth/adwords',
];

export const GOOGLE_ADS_CONFIG = {
  client_id: process.env.GOOGLE_ADS_CLIENT_ID,
  client_secret: process.env.GOOGLE_ADS_CLIENT_SECRET,
  developer_token: process.env.GOOGLE_ADS_DEVELOPER_TOKEN,
};

export const SYNC_INTERVALS = {
  CAMPAIGNS: 1000 * 60 * 60, // 1 hour
  METRICS: 1000 * 60 * 60 * 4, // 4 hours
  CONVERSION_ACTIONS: 1000 * 60 * 60 * 24, // 24 hours
};

export const METRIC_FIELDS = [
  'metrics.impressions',
  'metrics.clicks',
  'metrics.cost_micros',
  'metrics.conversions',
  'metrics.conversions_value',
  'metrics.ctr',
  'metrics.average_cpc',
  'metrics.roas',
];

export const CAMPAIGN_FIELDS = [
  'campaign.id',
  'campaign.name',
  'campaign.status',
  'campaign_budget.amount_micros',
  'campaign.start_date',
  'campaign.end_date',
];

export const DEVICE_SEGMENT = 'segments.device'; 