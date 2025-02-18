'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { useState } from "react";

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <Icons.logo />
              <span className="text-xl font-bold text-foreground">InsightFlow Pro</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                Features
              </Link>
              <Link href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">
                Pricing
              </Link>
              <Link href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>Get Started</Button>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <Icons.x className="h-6 w-6" />
              ) : (
                <Icons.menu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="#features"
                  className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Features
                </Link>
                <Link
                  href="#pricing"
                  className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Pricing
                </Link>
                <Link
                  href="#about"
                  className="text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About
                </Link>
                <div className="flex flex-col space-y-2 px-2">
                  <Link href="/auth/login">
                    <Button variant="ghost" className="w-full justify-start">Sign In</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button className="w-full justify-start">Get Started</Button>
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Add margin-top to account for fixed header */}
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/10 to-transparent" />
          <div className="relative max-w-7xl mx-auto">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground">
                Optimize Your Google Ads
                <span className="text-primary block">With InsightFlow Pro</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
                Advanced analytics, real-time monitoring, and AI-powered optimization for your Google Ads campaigns. Take control of your advertising performance.
              </p>
              <div className="mt-10 flex gap-4 justify-center">
                <Link href="/auth/signup">
                  <Button size="lg" className="h-12 px-8">
                    Get Started
                    <Icons.arrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button size="lg" variant="outline" className="h-12 px-8">
                    Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-muted/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-foreground">
                Powerful Features for Better Results
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything you need to manage and optimize your advertising campaigns
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Real-Time Analytics",
                  description: "Monitor your campaign performance with live metrics and instant updates",
                  icon: <Icons.lineChart className="h-6 w-6" />,
                },
                {
                  title: "Smart Campaign Management",
                  description: "Create, manage, and optimize campaigns with our intuitive interface",
                  icon: <Icons.megaphone className="h-6 w-6" />,
                },
                {
                  title: "Advanced Targeting",
                  description: "Reach your ideal audience with precise demographic and interest targeting",
                  icon: <Icons.target className="h-6 w-6" />,
                },
                {
                  title: "Performance Insights",
                  description: "Get actionable insights and recommendations to improve your ROI",
                  icon: <Icons.lightbulb className="h-6 w-6" />,
                },
                {
                  title: "Automated Reporting",
                  description: "Generate comprehensive reports with key metrics and trends",
                  icon: <Icons.fileText className="h-6 w-6" />,
                },
                {
                  title: "Team Collaboration",
                  description: "Work together seamlessly with role-based access and shared workspaces",
                  icon: <Icons.users className="h-6 w-6" />,
                },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="relative p-6 bg-background rounded-lg border hover:border-primary/50 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {[
                { value: "50%", label: "Average CTR Improvement" },
                { value: "30%", label: "Cost Reduction" },
                { value: "2x", label: "ROAS Increase" },
              ].map((stat, i) => (
                <div key={i} className="p-6">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Optimize Your Ad Campaigns?
            </h2>
            <p className="text-lg mb-10 opacity-90">
              Join thousands of marketers who are getting better results with InsightFlow Pro
            </p>
            <Link href="/auth/signup">
              <Button
                size="lg"
                variant="secondary"
                className="h-12 px-8 bg-background text-primary hover:bg-background/90"
              >
                Start Free Trial
                <Icons.arrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Product</h3>
                <ul className="space-y-3">
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">Features</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">Pricing</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">Case Studies</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Company</h3>
                <ul className="space-y-3">
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">About</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">Blog</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Resources</h3>
                <ul className="space-y-3">
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">Documentation</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">Help Center</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">API Reference</Link></li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-4">Legal</h3>
                <ul className="space-y-3">
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">Privacy</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">Terms</Link></li>
                  <li><Link href="#" className="text-muted-foreground hover:text-foreground">Security</Link></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t text-center text-muted-foreground">
              <p>© 2024 InsightFlow Pro. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
