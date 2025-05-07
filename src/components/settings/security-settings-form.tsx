"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/hooks/use-toast"
import { Save } from "lucide-react"

const securitySettingsSchema = z.object({
  // Password settings
  minPasswordLength: z.coerce.number().min(6).max(32), // Coerce to number for validation
  requireUppercase: z.boolean().default(true),
  requireNumbers: z.boolean().default(true),
  requireSpecialChars: z.boolean().default(true),
  passwordExpiryDays: z.coerce.number().min(0).max(365), // Coerce to number, 0 means never

  // Authentication settings
  mfaEnabled: z.boolean().default(true), // Allow users to enable MFA
  mfaRequired: z.boolean().default(false), // Force users to use MFA
  sessionTimeout: z.coerce.number().min(5).max(1440), // In minutes (5 mins to 24 hours)

  // IP restrictions
  ipRestrictionEnabled: z.boolean().default(false),
  allowedIPs: z.string().optional(), // Could add validation for CIDR/IP formats if needed

  // Login attempts
  maxLoginAttempts: z.coerce.number().min(1).max(20),
  lockoutDuration: z.coerce.number().min(1).max(120), // In minutes
})

type SecuritySettingsFormValues = z.infer<typeof securitySettingsSchema>

// Fetch actual settings in a real app
const defaultValues: Partial<SecuritySettingsFormValues> = {
  minPasswordLength: 8,
  requireUppercase: true,
  requireNumbers: true,
  requireSpecialChars: true,
  passwordExpiryDays: 90,

  mfaEnabled: true,
  mfaRequired: false,
  sessionTimeout: 30,

  ipRestrictionEnabled: false,
  allowedIPs: "",

  maxLoginAttempts: 5,
  lockoutDuration: 30,
}

export function SecuritySettingsForm() {
  const form = useForm<SecuritySettingsFormValues>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues, // Fetch real values in production
  })

  const isIpRestrictionEnabled = form.watch("ipRestrictionEnabled");

  function onSubmit(data: SecuritySettingsFormValues) {
    // TODO: Implement API call to save security settings
    console.log("Security Settings Data:", data);
    toast({
      title: "Settings updated",
      description: "Security settings have been saved successfully.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12"> {/* Increased spacing */}
        {/* Password Requirements Section */}
        <div>
          <h3 className="text-lg font-medium">Password Requirements</h3>
          <p className="text-sm text-muted-foreground">
            Configure password security requirements for user accounts.
          </p>
          <Separator className="my-4" />
          
          <div className="space-y-6"> {/* Consistent spacing */}
            <FormField
              control={form.control}
              name="minPasswordLength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Password Length</FormLabel>
                  <FormControl>
                    {/* Keep type="number" for browser validation aids */}
                    <Input {...field} type="number" min="6" max="32" onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} /> 
                  </FormControl>
                  <FormDescription>
                    Minimum number of characters (6-32).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3"> {/* Switches in a grid */}
              <FormField
                control={form.control}
                name="requireUppercase"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Require Uppercase</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-label="Require Uppercase Letters"
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
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-label="Require Numbers"
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
                      <FormLabel className="text-base">Require Special Chars</FormLabel>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        aria-label="Require Special Characters"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="passwordExpiryDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password Expiry (Days)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="0" max="365" onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} />
                  </FormControl>
                  <FormDescription>
                    Days before passwords expire (0 = never).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Authentication Settings Section */}
        <div>
          <h3 className="text-lg font-medium">Authentication Settings</h3>
          <p className="text-sm text-muted-foreground">
            Configure multi-factor authentication and session behavior.
          </p>
          <Separator className="my-4" />
          
          <div className="space-y-6"> 
            <FormField
              control={form.control}
              name="mfaEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Allow Multi-Factor Authentication</FormLabel>
                    <FormDescription>
                      Permit users to enable MFA for their accounts.
                    </FormDescription> // Close FormDescription
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-label="Allow Multi-Factor Authentication"
                    />
                  </FormControl>
                </FormItem> // Close FormItem
              )}
            />

            <FormField
              control={form.control}
              name="mfaRequired"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Require Multi-Factor Authentication</FormLabel>
                    <FormDescription>
                      Force all users (except perhaps specific roles) to use MFA.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-label="Require Multi-Factor Authentication"
                      disabled={!form.watch('mfaEnabled')} // Cannot require if not enabled
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sessionTimeout"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Session Timeout (Minutes)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="5" max="1440" onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} />
                  </FormControl>
                  <FormDescription>
                    Idle time before users are automatically logged out (5-1440 mins).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* IP Restrictions Section */}
        <div>
          <h3 className="text-lg font-medium">IP Address Restrictions</h3>
          <p className="text-sm text-muted-foreground">
            Restrict access to the platform based on IP address.
          </p>
          <Separator className="my-4" />

          <div className="space-y-6">
            <FormField
              control={form.control}
              name="ipRestrictionEnabled"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Enable IP Address Restriction</FormLabel>
                    <FormDescription>
                      Only allow access from specified IP addresses or ranges.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-label="Enable IP Address Restriction"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            {isIpRestrictionEnabled && (
              <FormField
                control={form.control}
                name="allowedIPs"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Allowed IP Addresses / Ranges</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter IPs or CIDR ranges, one per line (e.g., 192.168.1.100, 10.0.0.0/16)"
                        className="min-h-[100px] resize-y font-mono text-sm"
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter one IP address or CIDR range per line.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>

        {/* Login Security Section */}
        <div>
          <h3 className="text-lg font-medium">Login Security</h3>
          <p className="text-sm text-muted-foreground">
            Configure account lockout policies after failed login attempts.
          </p>
          <Separator className="my-4" />

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="maxLoginAttempts"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Login Attempts</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="1" max="20" onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} />
                  </FormControl>
                  <FormDescription>
                    Attempts before account lockout (1-20).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lockoutDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lockout Duration (Minutes)</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" min="1" max="120" onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} />
                  </FormControl>
                  <FormDescription>
                    Duration account remains locked out (1-120 mins).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        
        {/* Submit Button */}
        <Button type="submit" disabled={form.formState.isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          Save Security Settings
        </Button>
      </form>
    </Form>
  )
}

