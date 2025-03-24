"use client"

import { useEffect } from "react"
import Link from "next/link"
import { motion, useAnimation } from "framer-motion"
import { ArrowRight, BarChart2, Globe, LineChart, PieChart, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function Home() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }))
  }, [controls])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-bold text-xl"
              >
                InsightFlow
              </motion.span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                >
                  Start Free Trial
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col justify-center space-y-4"
              >
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Transform Your Ad Performance
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Unlock actionable insights across all your marketing channels. Make data-driven decisions that boost
                    your ROAS.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                    >
                      Start 14-Day Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/demo">
                    <Button size="lg" variant="outline">
                      Watch Demo
                    </Button>
                  </Link>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex items-center justify-center lg:justify-end"
              >
                <div className="relative">
                  <div className="absolute -top-4 -left-4 h-72 w-72 bg-orange-500/10 rounded-full blur-3xl" />
                  <img
                    src="/placeholder.svg?height=500&width=500"
                    alt="InsightFlow Dashboard Preview"
                    className="relative rounded-lg shadow-2xl"
                    width={500}
                    height={500}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              custom={0}
              className="grid grid-cols-2 gap-4 md:grid-cols-4"
            >
              <Card className="p-6 text-center">
                <h3 className="text-3xl font-bold">120K+</h3>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </Card>
              <Card className="p-6 text-center">
                <h3 className="text-3xl font-bold">4.8</h3>
                <p className="text-sm text-muted-foreground">User Rating</p>
              </Card>
              <Card className="p-6 text-center">
                <h3 className="text-3xl font-bold">$2.5B</h3>
                <p className="text-sm text-muted-foreground">Ad Spend Analyzed</p>
              </Card>
              <Card className="p-6 text-center">
                <h3 className="text-3xl font-bold">35%</h3>
                <p className="text-sm text-muted-foreground">Avg. ROAS Increase</p>
              </Card>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              custom={1}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Everything You Need to Scale
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Powerful features to optimize your advertising campaigns
                </p>
              </div>
            </motion.div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={controls}
                  custom={i + 2}
                  className="flex flex-col items-center space-y-2 rounded-lg border p-6 backdrop-blur-sm"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                  <p className="text-center text-muted-foreground">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* App Preview Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              custom={5}
              className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12"
            >
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Take Control Anywhere</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Monitor your campaigns, receive alerts, and make adjustments on the go with our powerful mobile app.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" variant="outline" className="gap-2">
                    <img src="/app-store.svg" alt="App Store" className="h-5" />
                    Download for iOS
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <img src="/play-store.svg" alt="Play Store" className="h-5" />
                    Download for Android
                  </Button>
                </div>
              </div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={controls}
                custom={6}
                className="relative mx-auto max-w-[300px]"
              >
                <div className="absolute -top-4 -right-4 h-72 w-72 bg-orange-500/10 rounded-full blur-3xl" />
                <img
                  src="/placeholder.svg?height=600&width=300"
                  alt="InsightFlow Mobile App"
                  className="relative rounded-[2.5rem] shadow-2xl"
                  width={300}
                  height={600}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={controls}
              custom={7}
              className="flex flex-col items-center justify-center space-y-4 text-center"
            >
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Optimize Your Ad Spend?</h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join thousands of marketers who have already transformed their advertising performance.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700"
                  >
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline">
                  Schedule a Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2025 InsightFlow. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/terms" className="text-sm text-muted-foreground underline underline-offset-4">
              Terms
            </Link>
            <Link href="/privacy" className="text-sm text-muted-foreground underline underline-offset-4">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

const features = [
  {
    title: "Multi-Channel Analytics",
    description: "View performance data from all your ad platforms in one unified dashboard",
    icon: <Globe className="h-6 w-6 text-orange-500" />,
  },
  {
    title: "Real-time Insights",
    description: "Track key metrics like CTR, CPC, and ROAS as they happen",
    icon: <Zap className="h-6 w-6 text-orange-500" />,
  },
  {
    title: "Smart Reporting",
    description: "Generate beautiful, customizable reports with just a few clicks",
    icon: <BarChart2 className="h-6 w-6 text-orange-500" />,
  },
  {
    title: "Predictive Analytics",
    description: "Forecast future performance to optimize your campaigns",
    icon: <LineChart className="h-6 w-6 text-orange-500" />,
  },
  {
    title: "Custom Dashboards",
    description: "Build personalized views for different team members and goals",
    icon: <PieChart className="h-6 w-6 text-orange-500" />,
  },
  {
    title: "Automated Alerts",
    description: "Get notified instantly when important metrics change",
    icon: <Zap className="h-6 w-6 text-orange-500" />,
  },
]

