import { AuthForm } from "@/components/auth/auth-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reset Password | InsightFlow Pro",
  description: "Reset your InsightFlow Pro account password",
};

export default function ResetPasswordPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <AuthForm type="reset" />
      </div>
    </div>
  );
} 