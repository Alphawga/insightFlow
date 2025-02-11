import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | InsightFlow Pro",
  description: "Login to your InsightFlow Pro account",
};

import { AuthForm } from "@/components/auth/auth-form";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Suspense fallback="Loading...">
          <AuthForm type="login" />
        </Suspense>
      </div>
    </div>
  );
} 