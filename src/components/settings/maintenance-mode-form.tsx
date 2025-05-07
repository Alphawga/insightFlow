"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { AlertTriangle, Save } from "lucide-react"
import { Separator } from "@/components/ui/separator"

const maintenanceModeSchema = z.object({
  maintenanceMode: z.boolean().default(false),
  scheduledStart: z.string().optional(),
  scheduledEnd: z.string().optional(),
  maintenanceMessage: z
    .string()
    .min(10, {
      message: "Maintenance message must be at least 10 characters.",
    })
    .max(500, { message: "Message cannot exceed 500 characters."})
    .optional(),
  allowAdminAccess: z.boolean().default(true),
  redirectUrl: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional()
    .or(z.literal('')),
})

type MaintenanceModeFormValues = z.infer<typeof maintenanceModeSchema>

const defaultValues: Partial<MaintenanceModeFormValues> = {
  maintenanceMode: false,
  scheduledStart: "",
  scheduledEnd: "",
  maintenanceMessage: "We're currently performing scheduled maintenance. Please check back soon.",
  allowAdminAccess: true,
  redirectUrl: "",
}

export function MaintenanceModeForm() {
  const form = useForm<MaintenanceModeFormValues>({
    resolver: zodResolver(maintenanceModeSchema),
    defaultValues,
  })

  const isMaintenanceModeEnabled = form.watch("maintenanceMode");

  function onSubmit(data: MaintenanceModeFormValues) {
    console.log("Maintenance Settings Data:", data);
    toast({
      title: "Maintenance settings updated",
      description: "Maintenance mode settings have been saved successfully.",
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="maintenanceMode"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Enable Maintenance Mode</FormLabel>
                <FormDescription>
                  Put the platform in maintenance mode, restricting user access.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-label="Toggle Maintenance Mode"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {isMaintenanceModeEnabled && (
          <div className="space-y-8 rounded-lg border p-4 md:p-6">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-600 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-amber-800">Maintenance Mode Enabled</h3>
                  <p className="text-sm text-amber-700">
                    When enabled, most users will be blocked or redirected based on these settings. Ensure you configure the message and access rules correctly.
                  </p>
                </div>
              </div>
            </div>
            
            <Separator />

            <FormField
              control={form.control}
              name="maintenanceMessage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maintenance Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter the message to display to users during maintenance..."
                      className="min-h-[100px] resize-y"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    This message will be shown on the maintenance page.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="scheduledStart"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scheduled Start Time (Optional)</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormDescription>When maintenance should automatically start.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="scheduledEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scheduled End Time (Optional)</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormDescription>When maintenance should automatically end.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Separator />

            <FormField
              control={form.control}
              name="allowAdminAccess"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel>Allow Admin Access</FormLabel>
                    <FormDescription>
                      Allow users with admin roles to bypass maintenance mode.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-label="Allow Admin Access"
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="redirectUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Redirect URL (Optional)</FormLabel>
                  <FormControl>
                    <Input 
                      type="url" 
                      placeholder="https://status.example.com" 
                      {...field} 
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>
                    If set, users will be redirected here instead of seeing the maintenance message.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}

        <Button type="submit" disabled={form.formState.isSubmitting}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </form>
    </Form>
  )
}

