'use client';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/icons";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { trpc } from "@/app/_providers/trpc-provider";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUserSchema, loginUserSchema, forgotPasswordSchema, resetPasswordSchema } from "@/lib/dto";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { motion } from "framer-motion";
import type { z } from "zod";
import { toast } from "sonner";

interface AuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: "login" | "register" | "reset";
}

export function AuthForm({ className, type, ...props }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const verified = searchParams.get("verified");
  const token = searchParams.get("token");

  const getSchema = () => {
    switch (type) {
      case "login":
        return loginUserSchema;
      case "register":
        return registerUserSchema;
      case "reset":
        return token ? resetPasswordSchema : forgotPasswordSchema;
    }
  };

  type FormData = z.infer<ReturnType<typeof getSchema>>;

  const form = useForm<FormData>({
    resolver: zodResolver(getSchema()),
    defaultValues: {
      email: "",
      password: "",
      ...(type === "register" && { name: "", confirmPassword: "" }),
      ...(type === "reset" && token && { token, confirmPassword: "" }),
    },
  });

  // tRPC mutations
  const registerMutation = trpc.registerUser.useMutation({
    onSuccess: () => {
      setSuccess("Registration successful! Please check your email to verify your account.");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const resetPasswordMutation = trpc.resetPassword.useMutation({
    onSuccess: () => {
      setSuccess("Password reset successful! You can now login with your new password.");
      setTimeout(() => router.push("/auth/login"), 2000);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const forgotPasswordMutation = trpc.forgotPassword.useMutation({
    onSuccess: () => {
      setSuccess("If an account exists, you will receive a password reset email.");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  async function onSubmit(data: FormData) {
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      if (type === "login") {
        const loginData = data as z.infer<typeof loginUserSchema>;
        const result = await signIn("credentials", {
          email: loginData.email,
          password: loginData.password,
          redirect: false,
        });

        if (result?.error) {
          setError("Invalid email or password");
          return;
        }
        toast.success("Login successful! Redirecting to dashboard...");
        router.push("/dashboard");
      } else if (type === "register") {
        const registerData = data as z.infer<typeof registerUserSchema>;
        await registerMutation.mutateAsync(registerData);
      } else if (type === "reset") {
        if (token) {
          const resetData = data as z.infer<typeof resetPasswordSchema>;
          await resetPasswordMutation.mutateAsync({
            token,
            password: resetData.password,
          });
        } else {
          const forgotData = data as z.infer<typeof forgotPasswordSchema>;
          await forgotPasswordMutation.mutateAsync({
            email: forgotData.email,
          });
        }
      }
    } catch (error) {
      // Error handling is now done in the mutation callbacks
    } finally {
      setIsLoading(false);
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      setIsGoogleLoading(true);
      setError("");
      
      const result = await signIn("google", {
        redirect: true,
        callbackUrl: "/dashboard"
      });

      // Note: This code won't execute for successful sign-ins due to the redirect
      if (result?.error) {
        setError("Failed to sign in with Google");
        setIsGoogleLoading(false);
      }
    } catch (error) {
      setError("An unexpected error occurred");
      setIsGoogleLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={cn("w-[400px] border-cool-grey/20 shadow-lg", className)} {...props}>
        <div className="flex flex-col items-center pt-8 pb-4 space-y-2">
          <div className="text-3xl font-bold">
            Insight<span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-600">Flow</span>
          </div>
          <div className="text-sm text-muted-foreground">Analytics & Insights Platform</div>
        </div>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold tracking-tight">
            {type === "login" && "Welcome back"}
            {type === "register" && "Create your account"}
            {type === "reset" && (token ? "Reset Password" : "Forgot Password")}
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            {type === "login" && "Enter your credentials to access your account"}
            {type === "register" && "Enter your details to create your account"}
            {type === "reset" && (token 
              ? "Enter your new password below" 
              : "Enter your email to reset your password")}
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {type === "register" && (
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="John Doe" 
                          {...field} 
                          disabled={isLoading} 
                          className="focus:border-orange-500 focus:ring-orange-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {(type === "login" || type === "register" || (type === "reset" && !token)) && (
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="m@example.com" 
                          {...field} 
                          disabled={isLoading}
                          className="focus:border-orange-500 focus:ring-orange-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {(type === "login" || type === "register" || (type === "reset" && token)) && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{type === "reset" ? "New Password" : "Password"}</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          {...field} 
                          disabled={isLoading}
                          className="focus:border-orange-500 focus:ring-orange-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {(type === "register" || (type === "reset" && token)) && (
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input 
                          type="password" 
                          {...field} 
                          disabled={isLoading}
                          className="focus:border-orange-500 focus:ring-orange-500"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-red-500 bg-red-50 p-3 rounded-md"
                >
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-green-500 bg-green-50 p-3 rounded-md"
                >
                  {success}
                </motion.div>
              )}
              {type === "login" && verified && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-green-500 bg-green-50 p-3 rounded-md"
                >
                  Email verified successfully! You can now sign in.
                </motion.div>
              )}
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white"
                disabled={isLoading || isGoogleLoading}
              >
                {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                {type === "login" && "Sign In"}
                {type === "register" && "Create Account"}
                {type === "reset" && (token ? "Reset Password" : "Send Reset Link")}
              </Button>
              
              <div className="text-sm text-center space-y-2 text-muted-foreground">
                {type === "login" && (
                  <>
                    <p>
                      <Link href="/auth/register" className="hover:underline text-orange-600 hover:text-orange-700">
                        Don't have an account? Sign up
                      </Link>
                    </p>
                    <p>
                      <Link href="/auth/reset-password" className="hover:underline text-orange-600 hover:text-orange-700">
                        Forgot your password?
                      </Link>
                    </p>
                  </>
                )}
                {type === "register" && (
                  <p>
                    <Link href="/auth/login" className="hover:underline text-orange-600 hover:text-orange-700">
                      Already have an account? Sign in
                    </Link>
                  </p>
                )}
                {type === "reset" && (
                  <p>
                    <Link href="/auth/login" className="hover:underline text-orange-600 hover:text-orange-700">
                      Remember your password? Sign in
                    </Link>
                  </p>
                )}
              </div>

              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-cool-grey/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                className="w-full border hover:bg-orange-50"
                onClick={handleGoogleSignIn}
                disabled={isLoading || isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Icons.google className="mr-2 h-4 w-4" />
                )}
                Google
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </motion.div>
  );
} 