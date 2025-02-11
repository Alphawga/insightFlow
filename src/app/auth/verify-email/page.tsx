import { verifyEmail } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Verify Email | InsightFlow Pro",
  description: "Verify your email address",
};

interface PageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function VerifyEmailPage({ searchParams }: PageProps) {
  const token = searchParams.token;

  if (!token || typeof token !== "string") {
    redirect("/auth/login");
  }

  try {
    await verifyEmail(token);
    redirect("/auth/login?verified=true");
  } catch (error) {
    return (
      <div className="container flex h-screen w-screen flex-col items-center justify-center">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Email Verification Failed
            </h1>
            <p className="text-sm text-muted-foreground mt-2">
              The verification link is invalid or has expired. Please try again or contact support.
            </p>
          </div>
        </div>
      </div>
    );
  }
} 