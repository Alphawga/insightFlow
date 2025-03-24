import type React from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, FileText } from "lucide-react"
import { BillingForm } from "@/components/billing/billing-form"
import { InvoicesList } from "@/components/billing/invoices-list"
import { SubscriptionUsage } from "@/components/billing/subscription-usage"

export default function BillingPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Billing & Subscription" text="Manage your subscription and payment details">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download Invoices
          </Button>
        </div>
      </DashboardHeader>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Subscription</TabsTrigger>
          <TabsTrigger value="payment">Payment Method</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Current Plan</CardTitle>
              <CardDescription>Your current subscription plan and details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Professional Plan</h3>
                    <p className="text-sm text-muted-foreground">$99/month, billed monthly</p>
                  </div>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Active
                  </Badge>
                </div>
                <Separator className="my-4" />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Next billing date</span>
                    <span className="font-medium">June 15, 2023</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Billing cycle</span>
                    <span className="font-medium">Monthly</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Payment method</span>
                    <span className="font-medium">Visa ending in 4242</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm font-medium">Plan Features</h4>
                <ul className="grid gap-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    <span>Multi-channel analytics (Google, Facebook, Instagram, Amazon)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    <span>Unlimited campaigns and ad groups</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    <span>Geographic performance tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    <span>Custom alerts and notifications</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    <span>Competitor analysis</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    <span>Customer lifetime value tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon className="h-4 w-4 text-primary" />
                    <span>Email and in-app support</span>
                  </li>
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2 md:flex-row md:justify-between md:space-x-0">
              <Button variant="outline">Change Plan</Button>
              <Button variant="ghost" className="text-red-500 hover:text-red-500 hover:bg-red-50">
                Cancel Subscription
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Update your billing information and payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <BillingForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>View and download your billing history</CardDescription>
              </div>
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Download All
              </Button>
            </CardHeader>
            <CardContent>
              <InvoicesList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="usage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Usage & Limits</CardTitle>
              <CardDescription>Monitor your subscription usage and limits</CardDescription>
            </CardHeader>
            <CardContent>
              <SubscriptionUsage />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

