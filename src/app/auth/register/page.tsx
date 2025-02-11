import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Register | InsightFlow Pro",
  description: "Create your InsightFlow Pro account",
};

import { AuthForm } from "@/components/auth/auth-form";
import { Suspense } from "react";

export default function RegisterPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <Suspense fallback="Loading...">
          <AuthForm type="register" />
        </Suspense>
      </div>
    </div>
  );
} 