"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"

const generalSettingsSchema = z.object({
  platformName: z.string().min(2, {
    message: "Platform name must be at least 2 characters.",
  }),
  supportEmail: z.string().email({
    message: "Please enter a valid email address.",
  }),
  defaultTimezone: z.string(),
  dateFormat: z.string(),
  termsOfService: z.string().min(10, {
    message: "Terms of service must be at least 10 characters.",
  }),
  privacyPolicy: z.string().min(10, {
    message: "Privacy policy must be at least 10 characters.",
  }),
})

type GeneralSettingsFormValues = z.infer<typeof generalSettingsSchema>

const defaultValues: Partial<GeneralSettingsFormValues> = {
  platformName: "InsightFlow",
  supportEmail: "support@insightflowpro.com",
  defaultTimezone: "UTC",
  dateFormat: "MM/DD/YYYY",
  termsOfService:
    "These are the terms of service for InsightFlow. By using our platform, you agree to these terms.",
  privacyPolicy:
    "This privacy policy describes how InsightFlow collects, uses, and shares your personal information.",
}

export function GeneralSettingsForm() {
  const form = useForm<GeneralSettingsFormValues>({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues,
  })

  function onSubmit(data: GeneralSettingsFormValues) {
    toast({
      title: "Settings updated",
      description: "General settings have been saved successfully.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="text-lg font-medium">Platform Information</h3>
          <p className="text-sm text-muted-foreground">Basic information about your platform</p>
          <Separator className="my-4" />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="platformName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Platform Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>The name of your platform as displayed to users</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="supportEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Support Email</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>Email address for customer support inquiries</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Regional Settings</h3>
          <p className="text-sm text-muted-foreground">Configure timezone and date format defaults</p>
          <Separator className="my-4" />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="defaultTimezone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default Timezone</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="UTC">UTC</SelectItem>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Japan Standard Time (JST)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Default timezone for new users</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="dateFormat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date Format</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select date format" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      <SelectItem value="YYYY/MM/DD">YYYY/MM/DD</SelectItem>
                      <SelectItem value="DD-MMM-YYYY">DD-MMM-YYYY</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Default date format for the platform</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium">Legal Documents</h3>
          <p className="text-sm text-muted-foreground">Manage your platform's legal documents</p>
          <Separator className="my-4" />

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="termsOfService"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Terms of Service</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[200px]" />
                  </FormControl>
                  <FormDescription>Terms of service displayed to users during signup</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="privacyPolicy"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Privacy Policy</FormLabel>
                  <FormControl>
                    <Textarea {...field} className="min-h-[200px]" />
                  </FormControl>
                  <FormDescription>Privacy policy displayed to users during signup</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button type="submit">Save General Settings</Button>
      </form>
    </Form>
  )
}

