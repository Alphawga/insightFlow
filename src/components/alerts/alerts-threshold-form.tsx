"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"

const alertsThresholdSchema = z.object({
  // Performance metrics
  ctrEnabled: z.boolean().default(true),
  ctrThreshold: z.string().default("15"),
  ctrDirection: z.string().default("both"),

  cpcEnabled: z.boolean().default(true),
  cpcThreshold: z.string().default("20"),
  cpcDirection: z.string().default("increase"),

  conversionEnabled: z.boolean().default(true),
  conversionThreshold: z.string().default("25"),
  conversionDirection: z.string().default("both"),

  roasEnabled: z.boolean().default(true),
  roasThreshold: z.string().default("30"),
  roasDirection: z.string().default("decrease"),

  // Budget thresholds
  budgetEnabled: z.boolean().default(true),
  budgetThreshold80: z.boolean().default(true),
  budgetThreshold90: z.boolean().default(true),
  budgetThreshold100: z.boolean().default(true),

  // Time periods
  timeWindow: z.string().default("24h"),

  // Campaign selection
  allCampaigns: z.boolean().default(true),
  selectedCampaigns: z.array(z.string()).default([]),
})

type AlertsThresholdFormValues = z.infer<typeof alertsThresholdSchema>

const defaultValues: Partial<AlertsThresholdFormValues> = {
  ctrEnabled: true,
  ctrThreshold: "15",
  ctrDirection: "both",

  cpcEnabled: true,
  cpcThreshold: "20",
  cpcDirection: "increase",

  conversionEnabled: true,
  conversionThreshold: "25",
  conversionDirection: "both",

  roasEnabled: true,
  roasThreshold: "30",
  roasDirection: "decrease",

  budgetEnabled: true,
  budgetThreshold80: true,
  budgetThreshold90: true,
  budgetThreshold100: true,

  timeWindow: "24h",

  allCampaigns: true,
  selectedCampaigns: [],
}

export function AlertsThresholdForm() {
  const form = useForm<AlertsThresholdFormValues>({
    resolver: zodResolver(alertsThresholdSchema),
    defaultValues,
  })

  function onSubmit(data: AlertsThresholdFormValues) {
    toast({
      title: "Alert thresholds updated",
      description: "Your alert threshold settings have been saved successfully.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="text-lg font-medium">Performance Metric Thresholds</h3>
          <p className="text-sm text-muted-foreground">
            Set thresholds for when performance metric alerts should be triggered
          </p>
          <Separator className="my-4" />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="ctrEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Click-Through Rate (CTR)</FormLabel>
                    <FormDescription>Alert when CTR changes significantly</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("ctrEnabled") && (
              <div className="ml-6 grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="ctrThreshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Threshold (%)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>Percentage change to trigger alert</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ctrDirection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Direction</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select direction" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="increase">Increase only</SelectItem>
                          <SelectItem value="decrease">Decrease only</SelectItem>
                          <SelectItem value="both">Both directions</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Which direction of change triggers the alert</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="cpcEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Cost Per Click (CPC)</FormLabel>
                    <FormDescription>Alert when CPC changes significantly</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("cpcEnabled") && (
              <div className="ml-6 grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cpcThreshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Threshold (%)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>Percentage change to trigger alert</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpcDirection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Direction</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select direction" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="increase">Increase only</SelectItem>
                          <SelectItem value="decrease">Decrease only</SelectItem>
                          <SelectItem value="both">Both directions</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Which direction of change triggers the alert</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="conversionEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Conversion Rate</FormLabel>
                    <FormDescription>Alert when conversion rate changes significantly</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("conversionEnabled") && (
              <div className="ml-6 grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="conversionThreshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Threshold (%)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>Percentage change to trigger alert</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="conversionDirection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Direction</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select direction" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="increase">Increase only</SelectItem>
                          <SelectItem value="decrease">Decrease only</SelectItem>
                          <SelectItem value="both">Both directions</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Which direction of change triggers the alert</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="roasEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Return on Ad Spend (ROAS)</FormLabel>
                    <FormDescription>Alert when ROAS changes significantly</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("roasEnabled") && (
              <div className="ml-6 grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="roasThreshold"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Threshold (%)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} />
                      </FormControl>
                      <FormDescription>Percentage change to trigger alert</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="roasDirection"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Direction</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select direction" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="increase">Increase only</SelectItem>
                          <SelectItem value="decrease">Decrease only</SelectItem>
                          <SelectItem value="both">Both directions</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Which direction of change triggers the alert</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Budget Thresholds</h3>
          <p className="text-sm text-muted-foreground">Configure alerts for campaign budget usage</p>
          <Separator className="my-4" />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="budgetEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Budget Alerts</FormLabel>
                    <FormDescription>Alert when campaign budget reaches certain thresholds</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("budgetEnabled") && (
              <div className="ml-6 space-y-4">
                <FormField
                  control={form.control}
                  name="budgetThreshold80"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="font-normal">Alert at 80% of budget</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budgetThreshold90"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="font-normal">Alert at 90% of budget</FormLabel>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="budgetThreshold100"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <FormLabel className="font-normal">Alert at 100% of budget</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Time Window & Campaign Selection</h3>
          <p className="text-sm text-muted-foreground">
            Configure the time period for measuring changes and which campaigns to monitor
          </p>
          <Separator className="my-4" />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="timeWindow"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time Window</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select time window" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="6h">Last 6 hours</SelectItem>
                      <SelectItem value="12h">Last 12 hours</SelectItem>
                      <SelectItem value="24h">Last 24 hours</SelectItem>
                      <SelectItem value="48h">Last 48 hours</SelectItem>
                      <SelectItem value="7d">Last 7 days</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Time period over which to measure metric changes</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allCampaigns"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Apply to all campaigns</FormLabel>
                    <FormDescription>Monitor all active campaigns for these alert conditions</FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit">Save Alert Thresholds</Button>
      </form>
    </Form>
  )
}

import { Checkbox } from "@/components/ui/checkbox"

