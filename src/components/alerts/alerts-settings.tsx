"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"

const alertsFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(true),
  budgetThresholds: z.boolean().default(true),
  budgetThreshold80: z.boolean().default(true),
  budgetThreshold90: z.boolean().default(true),
  budgetThreshold100: z.boolean().default(true),
  performanceAlerts: z.boolean().default(true),
  ctrThreshold: z.string().default("15"),
  cpcThreshold: z.string().default("20"),
  conversionThreshold: z.string().default("25"),
  alertFrequency: z.string().default("daily"),
})

type AlertsFormValues = z.infer<typeof alertsFormSchema>

const defaultValues: Partial<AlertsFormValues> = {
  emailNotifications: true,
  pushNotifications: true,
  budgetThresholds: true,
  budgetThreshold80: true,
  budgetThreshold90: true,
  budgetThreshold100: true,
  performanceAlerts: true,
  ctrThreshold: "15",
  cpcThreshold: "20",
  conversionThreshold: "25",
  alertFrequency: "daily",
}

export function AlertsSettings() {
  const form = useForm<AlertsFormValues>({
    resolver: zodResolver(alertsFormSchema),
    defaultValues,
  })

  function onSubmit(data: AlertsFormValues) {
    toast({
      title: "Alert settings updated",
      description: "Your alert preferences have been saved successfully.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="text-lg font-medium">Notification Preferences</h3>
          <p className="text-sm text-muted-foreground">Choose how you want to receive alerts</p>
          <Separator className="my-4" />
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="emailNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Email Notifications</FormLabel>
                    <FormDescription>Receive alerts via email</FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pushNotifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Push Notifications</FormLabel>
                    <FormDescription>Receive alerts in the app</FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="alertFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Alert Frequency</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="hourly">Hourly digest</SelectItem>
                      <SelectItem value="daily">Daily digest</SelectItem>
                      <SelectItem value="weekly">Weekly digest</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>How often you want to receive alert notifications</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Budget Alerts</h3>
          <p className="text-sm text-muted-foreground">Configure budget threshold alerts</p>
          <Separator className="my-4" />
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="budgetThresholds"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Enable Budget Alerts</FormLabel>
                    <FormDescription>Get notified when campaigns reach budget thresholds</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="ml-8 space-y-4">
              <FormField
                control={form.control}
                name="budgetThreshold80"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!form.watch("budgetThresholds")}
                      />
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
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!form.watch("budgetThresholds")}
                      />
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
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={!form.watch("budgetThresholds")}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">Alert at 100% of budget</FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Performance Alerts</h3>
          <p className="text-sm text-muted-foreground">Configure alerts for significant performance changes</p>
          <Separator className="my-4" />
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="performanceAlerts"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Enable Performance Alerts</FormLabel>
                    <FormDescription>Get notified when performance metrics change significantly</FormDescription>
                  </div>
                </FormItem>
              )}
            />

            <div className="ml-8 space-y-4">
              <FormField
                control={form.control}
                name="ctrThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CTR Change Threshold (%)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} disabled={!form.watch("performanceAlerts")} />
                    </FormControl>
                    <FormDescription>Alert when CTR changes by this percentage</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cpcThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CPC Change Threshold (%)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} disabled={!form.watch("performanceAlerts")} />
                    </FormControl>
                    <FormDescription>Alert when CPC changes by this percentage</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="conversionThreshold"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Conversion Rate Change Threshold (%)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} disabled={!form.watch("performanceAlerts")} />
                    </FormControl>
                    <FormDescription>Alert when conversion rate changes by this percentage</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        <Button type="submit">Save Alert Settings</Button>
      </form>
    </Form>
  )
}

