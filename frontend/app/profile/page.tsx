"use client";

import {
  Award,
  Clock,
  Edit,
  LogOut,
  Server,
  Settings,
  Shield,
  Terminal,
  Trophy,
  User,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function ProfilePage() {
  const [cryptoBalance, setCryptoBalance] = useState(1250);
  const [recentActivities, setRecentActivities] = useState([
    {
      id: 1,
      type: "mission",
      title: "Data Extraction",
      result: "success",
      reward: 250,
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      type: "attack",
      title: "Server Attack on CyberPhantom",
      result: "failed",
      reward: -50,
      timestamp: "5 hours ago",
    },
    {
      id: 3,
      type: "defense",
      title: "Defended against DarkByte",
      result: "success",
      reward: 100,
      timestamp: "1 day ago",
    },
    {
      id: 4,
      type: "mission",
      title: "Corporate Database Infiltration",
      result: "success",
      reward: 500,
      timestamp: "2 days ago",
    },
    {
      id: 5,
      type: "upgrade",
      title: "Purchased Advanced Firewall",
      result: "purchased",
      reward: -800,
      timestamp: "3 days ago",
    },
  ]);

  const [achievements, setAchievements] = useState([
    {
      id: 1,
      title: "First Hack",
      description: "Complete your first hacking mission",
      progress: 100,
      reward: 100,
      completed: true,
    },
    {
      id: 2,
      title: "Hacking Apprentice",
      description: "Complete 10 hacking missions",
      progress: 100,
      reward: 250,
      completed: true,
    },
    {
      id: 3,
      title: "Hacking Expert",
      description: "Complete 50 hacking missions",
      progress: 100,
      reward: 500,
      completed: true,
    },
    {
      id: 4,
      title: "Hacking Master",
      description: "Complete 100 hacking missions",
      progress: 75,
      reward: 1000,
      completed: false,
    },
    {
      id: 5,
      title: "Millionaire",
      description: "Accumulate 1,000,000 HTC",
      progress: 12,
      reward: 5000,
      completed: false,
    },
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-black text-green-500">
      {/* Header/Navigation */}
      <header className="border-b border-green-900/50 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/50">
        <div className="flex h-14 items-center px-4">
          <div className="flex items-center space-x-2">
            <Terminal className="h-6 w-6 text-green-500" />
            <span className="font-mono text-xl font-bold">HACKER TYCOON</span>
          </div>

          <nav className="ml-auto flex items-center space-x-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/dashboard">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-500 hover:bg-green-950 hover:text-green-400"
                    >
                      <Terminal className="h-5 w-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Dashboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/missions">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-500 hover:bg-green-950 hover:text-green-400"
                    >
                      <Server className="h-5 w-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Missions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-green-500 hover:bg-green-950 hover:text-green-400"
                  >
                    <Shield className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Security</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/leaderboard">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-500 hover:bg-green-950 hover:text-green-400"
                    >
                      <Award className="h-5 w-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Leaderboard</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/profile">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-green-950/50 text-green-400"
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Separator
              orientation="vertical"
              className="mx-1 h-6 bg-green-900/50"
            />

            <Button
              variant="ghost"
              size="icon"
              className="text-green-500 hover:bg-green-950 hover:text-green-400"
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="font-mono text-2xl font-bold">HACKER PROFILE</h1>
              <p className="text-green-400/90">
                Manage your profile and view your stats
              </p>
            </div>
            <Button className="bg-green-600 text-black hover:bg-green-500">
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Profile Card */}
            <Card className="border-green-900 bg-black md:col-span-1">
              <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                <CardTitle className="font-mono text-lg">PLAYER INFO</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-green-950 text-4xl">
                      👨‍💻
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute bottom-0 right-0 h-8 w-8 rounded-full border-green-900 bg-green-950/50 text-green-400 hover:bg-green-950 hover:text-green-300"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="text-center">
                    <h2 className="text-xl font-bold">Player213</h2>
                    <p className="text-sm text-green-400">
                      Rank: 10 • Member since 2023
                    </p>
                  </div>

                  <Separator className="bg-green-900/50" />

                  <div className="w-full space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-400">
                        Total Score
                      </span>
                      <span className="font-mono font-bold">14,500</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-400">
                        Missions Completed
                      </span>
                      <span className="font-mono font-bold">75</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-400">
                        Success Rate
                      </span>
                      <span className="font-mono font-bold">78%</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-400">Reputation</span>
                      <Badge className="bg-green-600">Trusted</Badge>
                    </div>
                  </div>

                  <div className="flex w-full items-center justify-between rounded-lg border border-green-900 bg-green-950/20 p-4">
                    <div className="flex items-center">
                      <Wallet className="mr-2 h-5 w-5" />
                      <span className="font-mono font-bold">
                        {cryptoBalance} HTC
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="border-green-900 bg-green-950/30 text-green-400 hover:bg-green-950 hover:text-green-300"
                    >
                      Connect Wallet
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content */}
            <Card className="border-green-900 bg-black md:col-span-2">
              <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                <CardTitle className="font-mono text-lg">
                  HACKER STATS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="activity">
                  <TabsList className="w-full bg-green-950/20">
                    <TabsTrigger
                      value="activity"
                      className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      Recent Activity
                    </TabsTrigger>
                    <TabsTrigger
                      value="achievements"
                      className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                    >
                      <Trophy className="mr-2 h-4 w-4" />
                      Achievements
                    </TabsTrigger>
                    <TabsTrigger
                      value="inventory"
                      className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                    >
                      <Server className="mr-2 h-4 w-4" />
                      Inventory
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="activity" className="p-4">
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="flex items-center justify-between rounded-lg border border-green-900 bg-green-950/10 p-4"
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`rounded-full p-2 ${
                                activity.type === "mission"
                                  ? "bg-blue-950/50"
                                  : activity.type === "attack"
                                  ? "bg-red-950/50"
                                  : activity.type === "defense"
                                  ? "bg-green-950/50"
                                  : "bg-yellow-950/50"
                              }`}
                            >
                              {activity.type === "mission" ? (
                                <Terminal className="h-5 w-5 text-blue-400" />
                              ) : activity.type === "attack" ? (
                                <Shield className="h-5 w-5 text-red-400" />
                              ) : activity.type === "defense" ? (
                                <Shield className="h-5 w-5 text-green-400" />
                              ) : (
                                <Server className="h-5 w-5 text-yellow-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{activity.title}</p>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  className={
                                    activity.result === "success"
                                      ? "bg-green-600"
                                      : activity.result === "failed"
                                      ? "bg-red-600"
                                      : "bg-yellow-600"
                                  }
                                >
                                  {activity.result}
                                </Badge>
                                <span className="text-xs text-green-600">
                                  {activity.timestamp}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`font-mono font-bold ${
                              activity.reward > 0
                                ? "text-green-400"
                                : "text-red-400"
                            }`}
                          >
                            {activity.reward > 0 ? "+" : ""}
                            {activity.reward} HTC
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="achievements" className="p-4">
                    <div className="space-y-4">
                      {achievements.map((achievement) => (
                        <div
                          key={achievement.id}
                          className={`rounded-lg border p-4 ${
                            achievement.completed
                              ? "border-green-600 bg-green-950/20"
                              : "border-green-900 bg-green-950/10"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h3 className="font-bold">{achievement.title}</h3>
                              <p className="text-sm text-green-400">
                                {achievement.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <div
                                className={`font-mono font-bold ${
                                  achievement.completed
                                    ? "text-green-400"
                                    : "text-green-600"
                                }`}
                              >
                                +{achievement.reward} HTC
                              </div>
                              <div className="text-xs text-green-600">
                                {achievement.completed
                                  ? "Completed"
                                  : `${achievement.progress}% Complete`}
                              </div>
                            </div>
                          </div>

                          {!achievement.completed && (
                            <div className="mt-2">
                              <Progress
                                value={achievement.progress}
                                className="h-1 bg-green-950"
                                indicatorclassname="bg-green-500"
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="inventory" className="p-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                        <div className="mb-2 flex items-center space-x-2">
                          <Shield className="h-5 w-5 text-green-400" />
                          <h3 className="font-bold">Advanced Firewall</h3>
                        </div>
                        <p className="text-sm text-green-400">
                          Provides enhanced protection against server attacks.
                        </p>
                        <div className="mt-2 text-xs text-green-600">
                          Purchased 3 days ago
                        </div>
                      </div>

                      <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                        <div className="mb-2 flex items-center space-x-2">
                          <Terminal className="h-5 w-5 text-green-400" />
                          <h3 className="font-bold">Encryption Breaker</h3>
                        </div>
                        <p className="text-sm text-green-400">
                          Allows you to break through basic encryption systems.
                        </p>
                        <div className="mt-2 text-xs text-green-600">
                          Purchased 1 week ago
                        </div>
                      </div>

                      <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                        <div className="mb-2 flex items-center space-x-2">
                          <Server className="h-5 w-5 text-green-400" />
                          <h3 className="font-bold">High-Performance Server</h3>
                        </div>
                        <p className="text-sm text-green-400">
                          Increases processing speed for all hacking operations.
                        </p>
                        <div className="mt-2 text-xs text-green-600">
                          Purchased 2 weeks ago
                        </div>
                      </div>

                      <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                        <div className="mb-2 flex items-center space-x-2">
                          <Wallet className="h-5 w-5 text-green-400" />
                          <h3 className="font-bold">Crypto Miner</h3>
                        </div>
                        <p className="text-sm text-green-400">
                          Generates a small amount of HTC over time.
                        </p>
                        <div className="mt-2 text-xs text-green-600">
                          Purchased 1 month ago
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex justify-end">
                      <Button className="bg-green-600 text-black hover:bg-green-500">
                        Visit Marketplace
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
