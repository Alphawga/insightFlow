"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

const systemNotificationsSchema = z.object({
  // Email settings
  emailEnabled: z.boolean().default(true),
  emailFromName: z.string().min(2, {
    message: "From name must be at least 2 characters.",
  }),
  emailFromAddress: z.string().email({
    message: "Please enter a valid email address.",
  }),
  emailReplyToAddress: z.string().email({
    message: "Please enter a valid email address.",
  }),

  // In-app notification settings
  inAppEnabled: z.boolean().default(true),
  inAppRetentionDays: z.string().default("30"),

  // Slack settings
  slackEnabled: z.boolean().default(true),
  slackWebhook: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional(),

  // Rate limiting
  rateLimitEnabled: z.boolean().default(true),
  rateLimitPerHour: z.string().default("50"),

  // Email footer
  emailFooterText: z.string().max(500).optional(),
})

type SystemNotificationsFormValues = z.infer<typeof systemNotificationsSchema>

const defaultValues: Partial<SystemNotificationsFormValues> = {
  emailEnabled: true,
  emailFromName: "InsightFlow",
  emailFromAddress: "notifications@insightflowpro.com",
  emailReplyToAddress: "support@insightflowpro.com",

  inAppEnabled: true,
  inAppRetentionDays: "30",

  slackEnabled: true,
  slackWebhook: "https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX",

  rateLimitEnabled: true,
  rateLimitPerHour: "50",

  emailFooterText:
    "© 2023 InsightFlow. All rights reserved. You're receiving this email because you have an account with us.",
}

export function SystemNotificationsForm() {
  const form = useForm<SystemNotificationsFormValues>({
    resolver: zodResolver(systemNotificationsSchema),
    defaultValues,
  })

  function onSubmit(data: SystemNotificationsFormValues) {
    toast({
      title: "Settings updated",
      description: "System notification settings have been saved successfully.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="text-lg font-medium">Email Notification Settings</h3>
          <p className="text-sm text-muted-foreground">Configure system-wide email notification settings</p>
          <Separator className="my-4" />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="emailEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Email Notifications</FormLabel>
                    <FormDescription>Enable or disable all email notifications</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("emailEnabled") && (
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="emailFromName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Name displayed as the sender of emails</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailFromAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>From Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Email address used as the sender</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailReplyToAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reply-To Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Email address for replies</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailFooterText"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Footer Text</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter text to appear in the footer of all emails"
                          className="min-h-[100px]"
                        />
                      </FormControl>
                      <FormDescription>
                        Text that appears at the bottom of all emails (max 500 characters)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">In-App Notification Settings</h3>
          <p className="text-sm text-muted-foreground">Configure system-wide in-app notification settings</p>
          <Separator className="my-4" />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="inAppEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">In-App Notifications</FormLabel>
                    <FormDescription>Enable or disable all in-app notifications</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("inAppEnabled") && (
              <FormField
                control={form.control}
                name="inAppRetentionDays"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notification Retention (Days)</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select retention period" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="60">60 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription>How long to keep in-app notifications before automatic deletion</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Slack Integration Settings</h3>
          <p className="text-sm text-muted-foreground">Configure Slack webhook for system notifications</p>
          <Separator className="my-4" />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="slackEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Slack Notifications</FormLabel>
                    <FormDescription>Enable or disable Slack notifications</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("slackEnabled") && (
              <FormField
                control={form.control}
                name="slackWebhook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slack Webhook URL</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormDescription>Webhook URL for your Slack workspace</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Rate Limiting</h3>
          <p className="text-sm text-muted-foreground">
            Configure notification rate limits to prevent overwhelming users
          </p>
          <Separator className="my-4" />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="rateLimitEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Rate Limiting</FormLabel>
                    <FormDescription>Limit the number of notifications a user can receive</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("rateLimitEnabled") && (
              <FormField
                control={form.control}
                name="rateLimitPerHour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Maximum Notifications Per Hour</FormLabel>
                    <FormControl>
                      <Input {...field} type="number" />
                    </FormControl>
                    <FormDescription>Maximum number of notifications a user can receive per hour</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        <Button type="submit">Save Settings</Button>
      </form>
    </Form>
  )
}

