"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"

const featureTogglesSchema = z.object({
  // Core features
  multiChannelAnalytics: z.boolean().default(true),
  customAlerts: z.boolean().default(true),
  predictiveAnalytics: z.boolean().default(true),
  competitorAnalysis: z.boolean().default(true),
  customerLTV: z.boolean().default(true),
  geoPerformance: z.boolean().default(true),

  // Beta features
  aiRecommendations: z.boolean().default(false),
  automatedBidding: z.boolean().default(false),
  advancedSegmentation: z.boolean().default(false),

  // Integrations
  googleAdsIntegration: z.boolean().default(true),
  facebookAdsIntegration: z.boolean().default(true),
  instagramAdsIntegration: z.boolean().default(true),
  amazonAdsIntegration: z.boolean().default(true),
  shopifyIntegration: z.boolean().default(true),
  slackIntegration: z.boolean().default(true),
})

type FeatureTogglesFormValues = z.infer<typeof featureTogglesSchema>

const defaultValues: Partial<FeatureTogglesFormValues> = {
  // Core features
  multiChannelAnalytics: true,
  customAlerts: true,
  predictiveAnalytics: true,
  competitorAnalysis: true,
  customerLTV: true,
  geoPerformance: true,

  // Beta features
  aiRecommendations: false,
  automatedBidding: false,
  advancedSegmentation: false,

  // Integrations
  googleAdsIntegration: true,
  facebookAdsIntegration: true,
  instagramAdsIntegration: true,
  amazonAdsIntegration: true,
  shopifyIntegration: true,
  slackIntegration: true,
}

export function FeatureTogglesForm() {
  const form = useForm<FeatureTogglesFormValues>({
    resolver: zodResolver(featureTogglesSchema),
    defaultValues,
  })

  function onSubmit(data: FeatureTogglesFormValues) {
    toast({
      title: "Feature toggles updated",
      description: "Feature toggle settings have been saved successfully.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="text-lg font-medium">Core Features</h3>
          <p className="text-sm text-muted-foreground">Enable or disable core platform features</p>
          <Separator className="my-4" />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="multiChannelAnalytics"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <FormLabel className="text-base">Multi-Channel Analytics</FormLabel>
                      <Badge>Core</Badge>
                    </div>
                    <FormDescription>
                      View performance data from all ad platforms in one unified dashboard
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customAlerts"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <FormLabel className="text-base">Custom Alerts</FormLabel>
                      <Badge>Core</Badge>
                    </div>
                    <FormDescription>Get notified when performance metrics change significantly</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="predictiveAnalytics"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <FormLabel className="text-base">Predictive Analytics</FormLabel>
                      <Badge>Core</Badge>
                    </div>
                    <FormDescription>Forecast future performance to plan budgets and campaigns</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="competitorAnalysis"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <FormLabel className="text-base">Competitor Analysis</FormLabel>
                      <Badge>Core</Badge>
                    </div>
                    <FormDescription>Track and analyze competitors' advertising strategies</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerLTV"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <FormLabel className="text-base">Customer LTV Analysis</FormLabel>
                      <Badge>Core</Badge>
                    </div>
                    <FormDescription>Track and analyze customer value over time</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="geoPerformance"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <FormLabel className="text-base">Geographic Performance</FormLabel>
                      <Badge>Core</Badge>
                    </div>
                    <FormDescription>
                      See which regions drive the most conversions with interactive maps
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Beta Features</h3>
          <p className="text-sm text-muted-foreground">Enable or disable experimental features</p>
          <Separator className="my-4" />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="aiRecommendations"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <FormLabel className="text-base">AI-Powered Recommendations</FormLabel>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Beta
                      </Badge>
                    </div>
                    <FormDescription>Get AI-powered recommendations for campaign optimization</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="automatedBidding"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <FormLabel className="text-base">Automated Bidding Strategies</FormLabel>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Beta
                      </Badge>
                    </div>
                    <FormDescription>Automatically adjust bids based on performance goals</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="advancedSegmentation"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <FormLabel className="text-base">Advanced Audience Segmentation</FormLabel>
                      <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                        Beta
                      </Badge>
                    </div>
                    <FormDescription>Create and analyze custom audience segments</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Integrations</h3>
          <p className="text-sm text-muted-foreground">Enable or disable platform integrations</p>
          <Separator className="my-4" />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="googleAdsIntegration"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Google Ads Integration</FormLabel>
                    <FormDescription>Connect with Google Ads for campaign data</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="facebookAdsIntegration"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Facebook Ads Integration</FormLabel>
                    <FormDescription>Connect with Facebook Ads for campaign data</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="instagramAdsIntegration"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Instagram Ads Integration</FormLabel>
                    <FormDescription>Connect with Instagram Ads for campaign data</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="amazonAdsIntegration"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Amazon Ads Integration</FormLabel>
                    <FormDescription>Connect with Amazon Ads for campaign data</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shopifyIntegration"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Shopify Integration</FormLabel>
                    <FormDescription>Connect with Shopify for e-commerce data</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slackIntegration"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Slack Integration</FormLabel>
                    <FormDescription>Connect with Slack for notifications</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit">Save Feature Toggles</Button>
      </form>
    </Form>
  )
}

