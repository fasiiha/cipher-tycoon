"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Terminal, Eye, EyeOff, Wallet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const handleWeb3Login = () => {
    setIsLoading(true)

    // Simulate Web3 login process
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col bg-black text-green-500">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black"></div>

      <div className="container relative z-10 mx-auto flex flex-1 items-center justify-center px-4 py-12">
        <div className="mx-auto w-full max-w-md space-y-6">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Terminal className="h-10 w-10 text-green-500" />
            <h1 className="font-mono text-3xl font-bold">HACKER TYCOON</h1>
            <p className="text-green-400/90">Enter your credentials to access the system</p>
          </div>

          <div className="rounded-lg border border-green-900 bg-black/80 shadow-[0_0_15px_rgba(0,255,0,0.15)]">
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-green-950/20">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="signup"
                  className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="p-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      placeholder="Enter your username"
                      required
                      className="border-green-900 bg-black text-green-400 focus-visible:ring-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="#" className="text-xs text-green-400 hover:text-green-300">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        required
                        className="border-green-900 bg-black pr-10 text-green-400 focus-visible:ring-green-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-500"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 text-black hover:bg-green-500"
                    disabled={isLoading}
                  >
                    {isLoading ? "Authenticating..." : "Login"}
                  </Button>
                </form>

                <div className="mt-6 flex items-center justify-between">
                  <Separator className="w-[30%] bg-green-900/50" />
                  <span className="text-xs text-green-600">OR CONTINUE WITH</span>
                  <Separator className="w-[30%] bg-green-900/50" />
                </div>

                <Button
                  onClick={handleWeb3Login}
                  className="mt-6 w-full justify-start border border-green-900 bg-green-950/30 text-green-400 hover:bg-green-950 hover:text-green-300"
                  disabled={isLoading}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              </TabsContent>

              <TabsContent value="signup" className="p-6">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="new-username">Username</Label>
                    <Input
                      id="new-username"
                      placeholder="Choose a username"
                      required
                      className="border-green-900 bg-black text-green-400 focus-visible:ring-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                      className="border-green-900 bg-black text-green-400 focus-visible:ring-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="new-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="new-password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        required
                        className="border-green-900 bg-black pr-10 text-green-400 focus-visible:ring-green-500"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-green-600 hover:text-green-500"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="h-4 w-4 rounded border-green-900 bg-black text-green-600 focus:ring-green-500"
                        required
                      />
                      <Label htmlFor="terms" className="text-xs">
                        I agree to the{" "}
                        <Link href="#" className="text-green-400 hover:text-green-300">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="#" className="text-green-400 hover:text-green-300">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-600 text-black hover:bg-green-500"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </Button>
                </form>

                <div className="mt-6 flex items-center justify-between">
                  <Separator className="w-[30%] bg-green-900/50" />
                  <span className="text-xs text-green-600">OR CONTINUE WITH</span>
                  <Separator className="w-[30%] bg-green-900/50" />
                </div>

                <Button
                  onClick={handleWeb3Login}
                  className="mt-6 w-full justify-start border border-green-900 bg-green-950/30 text-green-400 hover:bg-green-950 hover:text-green-300"
                  disabled={isLoading}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              </TabsContent>
            </Tabs>
          </div>

          <div className="text-center text-sm">
            <Link href="/" className="text-green-400 hover:text-green-300">
              &larr; Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

