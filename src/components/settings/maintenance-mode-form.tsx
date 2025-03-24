"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/hooks/use-toast"
import { AlertTriangle } from "lucide-react"

const maintenanceModeSchema = z.object({
  maintenanceMode: z.boolean().default(false),
  scheduledStart: z.string().optional(),
  scheduledEnd: z.string().optional(),
  maintenanceMessage: z
    .string()
    .min(10, {
      message: "Maintenance message must be at least 10 characters.",
    })
    .optional(),
  allowAdminAccess: z.boolean().default(true),
  redirectUrl: z
    .string()
    .url({
      message: "Please enter a valid URL.",
    })
    .optional(),
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

  function onSubmit(data: MaintenanceModeFormValues) {
    toast({
      title: "Maintenance settings updated",
      description: "Maintenance mode settings have been saved successfully.",
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
          <FormField
            control={form.control}
            name="maintenanceMode"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Enable Maintenance Mode</FormLabel>
                  <FormDescription>
                    Put the platform in maintenance mode, restricting user access
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
          
          {form.watch("maintenanceMode") && (
            <div className="mt-4 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 mt-0\

