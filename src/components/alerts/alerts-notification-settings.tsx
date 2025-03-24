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

const notificationSchema = z.object({
  emailEnabled: z.boolean().default(true),
  emailAddress: z.string().email().optional(),

  inAppEnabled: z.boolean().default(true),

  slackEnabled: z.boolean().default(false),
  slackWebhook: z.string().optional(),

  highPriorityOnly: z.boolean().default(false),

  digestFrequency: z.string().default("realtime"),

  workingHoursOnly: z.boolean().default(false),
  workHoursStart: z.string().default("09:00"),
  workHoursEnd: z.string().default("17:00"),
  workDays: z.array(z.string()).default(["mon", "tue", "wed", "thu", "fri"]),
})

type NotificationFormValues = z.infer<typeof notificationSchema>

const defaultValues: Partial<NotificationFormValues> = {
  emailEnabled: true,
  emailAddress: "user@example.com",

  inAppEnabled: true,

  slackEnabled: false,
  slackWebhook: "",

  highPriorityOnly: false,

  digestFrequency: "realtime",

  workingHoursOnly: false,
  workHoursStart: "09:00",
  workHoursEnd: "17:00",
  workDays: ["mon", "tue", "wed", "thu", "fri"],
}

export function AlertsNotificationSettings() {
  const form = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues,
  })

  function onSubmit(data: NotificationFormValues) {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved successfully.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="text-lg font-medium">Notification Channels</h3>
          <p className="text-sm text-muted-foreground">Choose how you want to receive alert notifications</p>
          <Separator className="my-4" />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="emailEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Email Notifications</FormLabel>
                    <FormDescription>Receive alert notifications via email</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("emailEnabled") && (
              <div className="ml-6">
                <FormField
                  control={form.control}
                  name="emailAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Email address to receive notifications</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="inAppEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">In-App Notifications</FormLabel>
                    <FormDescription>Receive alert notifications within the application</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slackEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Slack Notifications</FormLabel>
                    <FormDescription>Receive alert notifications in your Slack workspace</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("slackEnabled") && (
              <div className="ml-6">
                <FormField
                  control={form.control}
                  name="slackWebhook"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slack Webhook URL</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>Webhook URL for your Slack channel</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Notification Preferences</h3>
          <p className="text-sm text-muted-foreground">Configure when and how you receive notifications</p>
          <Separator className="my-4" />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="highPriorityOnly"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">High Priority Only</FormLabel>
                    <FormDescription>Only receive notifications for high priority alerts</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="digestFrequency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notification Frequency</FormLabel>
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
                    </SelectContent>
                  </Select>
                  <FormDescription>How often you want to receive notifications</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="workingHoursOnly"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Working Hours Only</FormLabel>
                    <FormDescription>Only receive notifications during specified working hours</FormDescription>
                  </div>
                  <FormControl>
                    <Switch checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                </FormItem>
              )}
            />

            {form.watch("workingHoursOnly") && (
              <div className="ml-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="workHoursStart"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Start Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="workHoursEnd"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>End Time</FormLabel>
                        <FormControl>
                          <Input type="time" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        <Button type="submit">Save Notification Settings</Button>
      </form>
    </Form>
  )
}

