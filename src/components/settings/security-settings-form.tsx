"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/hooks/use-toast"

const securitySettingsSchema = z.object({
  // Password settings
  minPasswordLength: z.string().min(1, {
    message: "Please enter a minimum password length.",
  }),
  requireUppercase: z.boolean().default(true),
  requireNumbers: z.boolean().default(true),
  requireSpecialChars: z.boolean().default(true),
  passwordExpiryDays: z.string().min(1, {
    message: "Please enter password expiry days.",
  }),

  // Authentication settings
  mfaEnabled: z.boolean().default(true),
  mfaRequired: z.boolean().default(false),
  sessionTimeout: z.string().min(1, {
    message: "Please enter session timeout minutes.",
  }),

  // IP restrictions
  ipRestrictionEnabled: z.boolean().default(false),
  allowedIPs: z.string().optional(),

  // Login attempts
  maxLoginAttempts: z.string().min(1, {
    message: "Please enter maximum login attempts.",
  }),
  lockoutDuration: z.string().min(1, {
    message: "Please enter account lockout duration.",
  }),
})

type SecuritySettingsFormValues = z.infer<typeof securitySettingsSchema>

const defaultValues: Partial<SecuritySettingsFormValues> = {
  minPasswordLength: "8",
  requireUppercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  passwordExpiryDays: "90",

  mfaEnabled: true,
  mfaRequired: false,
  sessionTimeout: "30",

  ipRestrictionEnabled: false,
  allowedIPs: "",

  maxLoginAttempts: "5",
  lockoutDuration: "30",
}

export function SecuritySettingsForm() {
  const form = useForm<SecuritySettingsFormValues>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues,
  })

  function onSubmit(data: SecuritySettingsFormValues) {
    toast({
      title: "Settings updated",
      description: "Security settings have been saved successfully.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <h3 className="text-lg font-medium">Password Requirements</h3>
          <p className="text-sm text-muted-foreground">
            Configure password security requirements
          </p>
          <Separator className="my-4" />
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="minPasswordLength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Password Length</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="6" max="32" />
                  </FormControl>
                  <FormDescription>
                    Minimum number of characters required for passwords
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="requireUppercase"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Require Uppercase Letters</FormLabel>
                    <FormDescription>
                      Require at least one uppercase letter in passwords
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="requireNumbers"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Require Numbers</FormLabel>
                    <FormDescription>
                      Require at least one number in passwords
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="requireSpecialChars"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Require Special Characters</FormLabel>
                    <FormDescription>
                      Require at least one special character in passwords
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="passwordExpiryDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Expiry (Days)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" max="365" />
                  </FormControl>
                  <FormDescription>
                    Number of days before passwords expire (0 for never)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium">Authentication Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure multi-factor authentication and session settings
          </p>
          <Separator className="my-4" />
          
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="mfaEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Enable Multi-Factor Authentication</FormLabel>
                    <FormDescription>
                      Allow users to set up multi-factor authentication\

