"use client";

import type React from "react";

import {
  AlertTriangle,
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  Key,
  Mail,
  Terminal,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
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
import { Label } from "@/components/ui/label";

export default function ResetPassword() {
  const router = useRouter();
  const [step, setStep] = useState<
    "email" | "code" | "newPassword" | "success"
  >("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("code");
    }, 1500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!code) {
      setError("Please enter the verification code");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("newPassword");
    }, 1500);
  };

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Please enter a new password");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setStep("success");
    }, 1500);
  };

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-green-500">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black"></div>

      <div className="container relative z-10 mx-auto flex flex-1 items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Terminal className="h-10 w-10 text-green-500" />
            <h1 className="font-mono text-3xl font-bold">HACKER TYCOON</h1>
            <p className="text-green-400/90">
              Reset your password to regain access to your account
            </p>
          </div>

          <Card className="border-green-900 bg-black/80 shadow-[0_0_15px_rgba(0,255,0,0.15)]">
            <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
              <CardTitle className="font-mono text-lg">
                {step === "email" && "Reset Password"}
                {step === "code" && "Verify Code"}
                {step === "newPassword" && "Create New Password"}
                {step === "success" && "Password Reset Complete"}
              </CardTitle>
              <CardDescription className="text-green-600">
                {step === "email" &&
                  "Enter your email to receive a verification code"}
                {step === "code" &&
                  "Enter the verification code sent to your email"}
                {step === "newPassword" &&
                  "Create a new secure password for your account"}
                {step === "success" &&
                  "Your password has been successfully reset"}
              </CardDescription>
            </CardHeader>

            <CardContent className="p-6">
              {error && (
                <Alert
                  variant="destructive"
                  className="mb-4 border-red-900 bg-red-950/20 text-red-400"
                >
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {step === "email" && (
                <form onSubmit={handleSendCode} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="border-green-900 bg-black text-green-400 focus-visible:ring-green-500"
                      disabled={isLoading}
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 text-black hover:bg-green-500"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Mail className="mr-2 h-4 w-4 animate-spin" />
                        Sending Code...
                      </>
                    ) : (
                      <>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Verification Code
                      </>
                    )}
                  </Button>
                </form>
              )}

              {step === "code" && (
                <form onSubmit={handleVerifyCode} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Verification Code</Label>
                    <Input
                      id="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter the 6-digit code"
                      required
                      className="border-green-900 bg-black text-green-400 focus-visible:ring-green-500"
                      disabled={isLoading}
                    />
                    <p className="text-xs text-green-600">
                      A verification code has been sent to {email}
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-green-900 bg-green-950/30 text-green-400 hover:bg-green-950 hover:text-green-300"
                      onClick={() => setStep("email")}
                      disabled={isLoading}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>

                    <Button
                      type="submit"
                      className="flex-1 bg-green-600 text-black hover:bg-green-500"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Key className="mr-2 h-4 w-4 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        <>
                          <Key className="mr-2 h-4 w-4" />
                          Verify Code
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}

              {step === "newPassword" && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">New Password</Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Create a new password"
                        required
                        className="border-green-900 bg-black pr-10 text-green-400 focus-visible:ring-green-500"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-500"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-green-600">
                      Password must be at least 8 characters long
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your new password"
                        required
                        className="border-green-900 bg-black pr-10 text-green-400 focus-visible:ring-green-500"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-500"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 border-green-900 bg-green-950/30 text-green-400 hover:bg-green-950 hover:text-green-300"
                      onClick={() => setStep("code")}
                      disabled={isLoading}
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>

                    <Button
                      type="submit"
                      className="flex-1 bg-green-600 text-black hover:bg-green-500"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Key className="mr-2 h-4 w-4 animate-spin" />
                          Resetting...
                        </>
                      ) : (
                        <>
                          <Key className="mr-2 h-4 w-4" />
                          Reset Password
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              )}

              {step === "success" && (
                <div className="flex flex-col items-center space-y-4 py-4 text-center">
                  <div className="rounded-full bg-green-950/50 p-3">
                    <Check className="h-8 w-8 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      Password Reset Successful
                    </h3>
                    <p className="mt-2 text-sm text-green-400">
                      Your password has been successfully reset. You can now log
                      in with your new password.
                    </p>
                  </div>
                  <Button
                    onClick={handleGoToLogin}
                    className="mt-4 bg-green-600 text-black hover:bg-green-500"
                  >
                    Go to Login
                  </Button>
                </div>
              )}
            </CardContent>

            <CardFooter className="border-t border-green-900/50 bg-green-950/10 p-4 text-center">
              <div className="w-full text-sm">
                Remember your password?{" "}
                <Link
                  href="/login"
                  className="text-green-400 hover:text-green-300"
                >
                  Back to Login
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
