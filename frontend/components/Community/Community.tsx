import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChevronRight,
  Clock,
  Globe,
  MessageSquare,
  Search,
  Shield,
  Star,
  Terminal,
  Users,
} from "lucide-react";
import Link from "next/link";
import LandingNavbar from "../LandingNavbar";

export default function Community() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-green-500">
      {/* Header/Navigation */}
      <LandingNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-16">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black"></div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="mx-auto max-w-3xl space-y-6 text-center">
              <h1 className="font-mono text-4xl font-bold tracking-tight text-green-500">
                HACKER COMMUNITY
              </h1>
              <p className="text-lg text-green-400/90">
                Connect with fellow hackers, share strategies, and stay updated
                on the latest game news
              </p>
            </div>
          </div>
        </section>

        {/* Community Hub */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <h2 className="font-mono text-2xl font-bold">COMMUNITY HUB</h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" />
                  <Input
                    placeholder="Search forums..."
                    className="w-full border-green-900 bg-black pl-9 text-green-400 focus-visible:ring-green-500 sm:w-64"
                  />
                </div>
              </div>

              <Tabs defaultValue="forums">
                <TabsList className="w-full bg-green-950/20 sm:w-auto">
                  <TabsTrigger
                    value="forums"
                    className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    Forums
                  </TabsTrigger>
                  <TabsTrigger
                    value="events"
                    className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                  >
                    <Clock className="mr-2 h-4 w-4" />
                    Events
                  </TabsTrigger>
                  <TabsTrigger
                    value="leaderboards"
                    className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                  >
                    <Star className="mr-2 h-4 w-4" />
                    Leaderboards
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="forums" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-green-900 bg-black">
                      <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Terminal className="h-5 w-5 text-green-500" />
                            <CardTitle className="font-mono text-lg">
                              GENERAL DISCUSSION
                            </CardTitle>
                          </div>
                          <Badge className="bg-green-600">Active</Badge>
                        </div>
                        <CardDescription className="text-green-600">
                          Discuss anything related to Hacker Tycoon
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="rounded-lg border border-green-900 bg-green-950/10 p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                  <AvatarFallback className="bg-green-950 text-green-400">
                                    DB
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                  Welcome to Hacker Tycoon!
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-green-600">
                                <Users className="h-3 w-3" />
                                <span>245</span>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-lg border border-green-900 bg-green-950/10 p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                  <AvatarFallback className="bg-green-950 text-green-400">
                                    CP
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                  Tips for beginners
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-green-600">
                                <Users className="h-3 w-3" />
                                <span>189</span>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-lg border border-green-900 bg-green-950/10 p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                  <AvatarFallback className="bg-green-950 text-green-400">
                                    NP
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                  Game suggestions
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-green-600">
                                <Users className="h-3 w-3" />
                                <span>132</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-green-900/50 bg-green-950/10 p-4">
                        <Button className="w-full bg-green-600 text-black hover:bg-green-500">
                          View All Threads
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="border-green-900 bg-black">
                      <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Shield className="h-5 w-5 text-green-500" />
                            <CardTitle className="font-mono text-lg">
                              STRATEGY & TACTICS
                            </CardTitle>
                          </div>
                          <Badge className="bg-green-600">Hot</Badge>
                        </div>
                        <CardDescription className="text-green-600">
                          Share your strategies and learn from others
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="rounded-lg border border-green-900 bg-green-950/10 p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                  <AvatarFallback className="bg-green-950 text-green-400">
                                    HH
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                  Best security setup guide
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-green-600">
                                <Users className="h-3 w-3" />
                                <span>312</span>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-lg border border-green-900 bg-green-950/10 p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                  <AvatarFallback className="bg-green-950 text-green-400">
                                    BB
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                  PvP attack strategies
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-green-600">
                                <Users className="h-3 w-3" />
                                <span>278</span>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-lg border border-green-900 bg-green-950/10 p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                  <AvatarFallback className="bg-green-950 text-green-400">
                                    CR
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                  Mission walkthrough: Corporate Database
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-green-600">
                                <Users className="h-3 w-3" />
                                <span>201</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-green-900/50 bg-green-950/10 p-4">
                        <Button className="w-full bg-green-600 text-black hover:bg-green-500">
                          View All Threads
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="border-green-900 bg-black">
                      <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Globe className="h-5 w-5 text-green-500" />
                            <CardTitle className="font-mono text-lg">
                              ANNOUNCEMENTS
                            </CardTitle>
                          </div>
                          <Badge className="bg-red-600">Official</Badge>
                        </div>
                        <CardDescription className="text-green-600">
                          Official announcements from the development team
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="rounded-lg border border-green-900 bg-green-950/10 p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                  <AvatarFallback className="bg-red-950 text-red-400">
                                    HT
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                  Update 2.1.4 Release Notes
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-green-600">
                                <Clock className="h-3 w-3" />
                                <span>2 days ago</span>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-lg border border-green-900 bg-green-950/10 p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                  <AvatarFallback className="bg-red-950 text-red-400">
                                    HT
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                  Server Maintenance - June 15
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-green-600">
                                <Clock className="h-3 w-3" />
                                <span>1 week ago</span>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-lg border border-green-900 bg-green-950/10 p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                  <AvatarFallback className="bg-red-950 text-red-400">
                                    HT
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                  New Mission Pack: Corporate Espionage
                                </span>
                              </div>
                              <div className="flex items-center space-x-2 text-xs text-green-600">
                                <Clock className="h-3 w-3" />
                                <span>2 weeks ago</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-green-900/50 bg-green-950/10 p-4">
                        <Button className="w-full bg-green-600 text-black hover:bg-green-500">
                          View All Announcements
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="border-green-900 bg-black">
                      <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Terminal className="h-5 w-5 text-green-500" />
                            <CardTitle className="font-mono text-lg">
                              TECHNICAL SUPPORT
                            </CardTitle>
                          </div>
                          <Badge className="bg-yellow-600">Help</Badge>
                        </div>
                        <CardDescription className="text-green-600">
                          Get help with technical issues and bugs
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="rounded-lg border border-green-900 bg-green-950/10 p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                  <AvatarFallback className="bg-green-950 text-green-400">
                                    SS
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                  Game crashes during PvP attacks
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className="border-yellow-600 text-yellow-500"
                              >
                                Investigating
                              </Badge>
                            </div>
                          </div>

                          <div className="rounded-lg border border-green-900 bg-green-950/10 p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                  <AvatarFallback className="bg-green-950 text-green-400">
                                    QB
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                  Login issues after update
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className="border-green-600 text-green-500"
                              >
                                Resolved
                              </Badge>
                            </div>
                          </div>

                          <div className="rounded-lg border border-green-900 bg-green-950/10 p-3">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                                  <AvatarFallback className="bg-green-950 text-green-400">
                                    CS
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">
                                  Missing rewards from missions
                                </span>
                              </div>
                              <Badge
                                variant="outline"
                                className="border-green-600 text-green-500"
                              >
                                Resolved
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-green-900/50 bg-green-950/10 p-4">
                        <Button className="w-full bg-green-600 text-black hover:bg-green-500">
                          View All Support Tickets
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="events" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-green-900 bg-black">
                      <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="font-mono text-lg">
                            UPCOMING EVENTS
                          </CardTitle>
                          <Badge className="bg-green-600">Live</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                            <div className="flex flex-col space-y-2">
                              <div className="flex items-center justify-between">
                                <h3 className="font-bold">
                                  Global Hacking Tournament
                                </h3>
                                <Badge className="bg-red-600">
                                  Major Event
                                </Badge>
                              </div>
                              <p className="text-sm text-green-400">
                                Compete against the best hackers in the world
                                for massive prizes and exclusive rewards.
                              </p>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2 text-green-600">
                                  <Clock className="h-4 w-4" />
                                  <span>Starts in 3 days</span>
                                </div>
                                <Button
                                  size="sm"
                                  className="bg-green-600 text-black hover:bg-green-500"
                                >
                                  Register
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                            <div className="flex flex-col space-y-2">
                              <div className="flex items-center justify-between">
                                <h3 className="font-bold">Double XP Weekend</h3>
                                <Badge className="bg-yellow-600">Special</Badge>
                              </div>
                              <p className="text-sm text-green-400">
                                Earn double experience points for all missions
                                and activities during this special weekend
                                event.
                              </p>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2 text-green-600">
                                  <Clock className="h-4 w-4" />
                                  <span>Starts in 1 week</span>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-green-600 text-green-500 hover:bg-green-950 hover:text-green-400"
                                >
                                  Remind Me
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                            <div className="flex flex-col space-y-2">
                              <div className="flex items-center justify-between">
                                <h3 className="font-bold">
                                  Developer Q&A Session
                                </h3>
                                <Badge className="bg-blue-600">Community</Badge>
                              </div>
                              <p className="text-sm text-green-400">
                                Join our development team for a live Q&A session
                                about upcoming features and game changes.
                              </p>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2 text-green-600">
                                  <Clock className="h-4 w-4" />
                                  <span>Starts in 2 weeks</span>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-green-600 text-green-500 hover:bg-green-950 hover:text-green-400"
                                >
                                  Add to Calendar
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-green-900 bg-black">
                      <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="font-mono text-lg">
                            PAST EVENTS
                          </CardTitle>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="space-y-4">
                          <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                            <div className="flex flex-col space-y-2">
                              <div className="flex items-center justify-between">
                                <h3 className="font-bold">
                                  Spring Hacking Challenge
                                </h3>
                                <Badge
                                  variant="outline"
                                  className="border-green-600 text-green-500"
                                >
                                  Completed
                                </Badge>
                              </div>
                              <p className="text-sm text-green-400">
                                A series of increasingly difficult hacking
                                challenges with exclusive rewards.
                              </p>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2 text-green-600">
                                  <Clock className="h-4 w-4" />
                                  <span>2 months ago</span>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-green-600 text-green-500 hover:bg-green-950 hover:text-green-400"
                                >
                                  View Results
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                            <div className="flex flex-col space-y-2">
                              <div className="flex items-center justify-between">
                                <h3 className="font-bold">
                                  Crypto Mining Event
                                </h3>
                                <Badge
                                  variant="outline"
                                  className="border-green-600 text-green-500"
                                >
                                  Completed
                                </Badge>
                              </div>
                              <p className="text-sm text-green-400">
                                Special event focused on cryptocurrency mining
                                with boosted rewards and unique challenges.
                              </p>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2 text-green-600">
                                  <Clock className="h-4 w-4" />
                                  <span>3 months ago</span>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-green-600 text-green-500 hover:bg-green-950 hover:text-green-400"
                                >
                                  View Results
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                            <div className="flex flex-col space-y-2">
                              <div className="flex items-center justify-between">
                                <h3 className="font-bold">
                                  Game Launch Celebration
                                </h3>
                                <Badge
                                  variant="outline"
                                  className="border-green-600 text-green-500"
                                >
                                  Completed
                                </Badge>
                              </div>
                              <p className="text-sm text-green-400">
                                The official launch event for Hacker Tycoon with
                                special guests and exclusive rewards.
                              </p>
                              <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-2 text-green-600">
                                  <Clock className="h-4 w-4" />
                                  <span>6 months ago</span>
                                </div>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-green-600 text-green-500 hover:bg-green-950 hover:text-green-400"
                                >
                                  View Highlights
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="leaderboards" className="mt-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <Card className="border-green-900 bg-black">
                      <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="font-mono text-lg">
                            GLOBAL RANKINGS
                          </CardTitle>
                          <Badge className="bg-green-600">Season 3</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="relative overflow-x-auto">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-green-950/30 text-xs uppercase">
                              <tr>
                                <th scope="col" className="px-6 py-3">
                                  Rank
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Player
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Score
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Missions
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-green-900/30 hover:bg-green-950/20">
                                <td className="px-6 py-4">1</td>
                                <td className="px-6 py-4 font-medium">
                                  DarkByte
                                </td>
                                <td className="px-6 py-4">25,750</td>
                                <td className="px-6 py-4">124</td>
                              </tr>
                              <tr className="border-b border-green-900/30 hover:bg-green-950/20">
                                <td className="px-6 py-4">2</td>
                                <td className="px-6 py-4 font-medium">
                                  CyberPhantom
                                </td>
                                <td className="px-6 py-4">24,200</td>
                                <td className="px-6 py-4">118</td>
                              </tr>
                              <tr className="border-b border-green-900/30 hover:bg-green-950/20">
                                <td className="px-6 py-4">3</td>
                                <td className="px-6 py-4 font-medium">
                                  NullPointer
                                </td>
                                <td className="px-6 py-4">22,800</td>
                                <td className="px-6 py-4">110</td>
                              </tr>
                              <tr className="border-b border-green-900/30 hover:bg-green-950/20">
                                <td className="px-6 py-4">4</td>
                                <td className="px-6 py-4 font-medium">
                                  HexHunter
                                </td>
                                <td className="px-6 py-4">21,500</td>
                                <td className="px-6 py-4">105</td>
                              </tr>
                              <tr className="border-b border-green-900/30 hover:bg-green-950/20">
                                <td className="px-6 py-4">5</td>
                                <td className="px-6 py-4 font-medium">
                                  BinaryBaron
                                </td>
                                <td className="px-6 py-4">19,800</td>
                                <td className="px-6 py-4">98</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-green-900/50 bg-green-950/10 p-4">
                        <Button className="w-full bg-green-600 text-black hover:bg-green-500">
                          View Full Leaderboard
                        </Button>
                      </CardFooter>
                    </Card>

                    <Card className="border-green-900 bg-black">
                      <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="font-mono text-lg">
                            PVP RANKINGS
                          </CardTitle>
                          <Badge className="bg-red-600">Competitive</Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="relative overflow-x-auto">
                          <table className="w-full text-left text-sm">
                            <thead className="bg-green-950/30 text-xs uppercase">
                              <tr>
                                <th scope="col" className="px-6 py-3">
                                  Rank
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Player
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Wins
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Win Rate
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr className="border-b border-green-900/30 hover:bg-green-950/20">
                                <td className="px-6 py-4">1</td>
                                <td className="px-6 py-4 font-medium">
                                  ShadowScript
                                </td>
                                <td className="px-6 py-4">187</td>
                                <td className="px-6 py-4">92%</td>
                              </tr>
                              <tr className="border-b border-green-900/30 hover:bg-green-950/20">
                                <td className="px-6 py-4">2</td>
                                <td className="px-6 py-4 font-medium">
                                  DarkByte
                                </td>
                                <td className="px-6 py-4">165</td>
                                <td className="px-6 py-4">89%</td>
                              </tr>
                              <tr className="border-b border-green-900/30 hover:bg-green-950/20">
                                <td className="px-6 py-4">3</td>
                                <td className="px-6 py-4 font-medium">
                                  QuantumBreaker
                                </td>
                                <td className="px-6 py-4">152</td>
                                <td className="px-6 py-4">85%</td>
                              </tr>
                              <tr className="border-b border-green-900/30 hover:bg-green-950/20">
                                <td className="px-6 py-4">4</td>
                                <td className="px-6 py-4 font-medium">
                                  CipherSage
                                </td>
                                <td className="px-6 py-4">143</td>
                                <td className="px-6 py-4">82%</td>
                              </tr>
                              <tr className="border-b border-green-900/30 hover:bg-green-950/20">
                                <td className="px-6 py-4">5</td>
                                <td className="px-6 py-4 font-medium">
                                  CyberPhantom
                                </td>
                                <td className="px-6 py-4">138</td>
                                <td className="px-6 py-4">80%</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </CardContent>
                      <CardFooter className="border-t border-green-900/50 bg-green-950/10 p-4">
                        <Button className="w-full bg-green-600 text-black hover:bg-green-500">
                          View Full Leaderboard
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* Community Stats */}
        <section className="py-12 bg-green-950/10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 font-mono text-2xl font-bold text-center">
                COMMUNITY STATS
              </h2>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-lg border border-green-900 bg-black p-6 text-center">
                  <div className="text-3xl font-bold">25,000+</div>
                  <div className="mt-2 text-sm text-green-400">
                    Active Players
                  </div>
                </div>

                <div className="rounded-lg border border-green-900 bg-black p-6 text-center">
                  <div className="text-3xl font-bold">10,000+</div>
                  <div className="mt-2 text-sm text-green-400">Forum Posts</div>
                </div>

                <div className="rounded-lg border border-green-900 bg-black p-6 text-center">
                  <div className="text-3xl font-bold">500+</div>
                  <div className="mt-2 text-sm text-green-400">
                    Daily Missions
                  </div>
                </div>

                <div className="rounded-lg border border-green-900 bg-black p-6 text-center">
                  <div className="text-3xl font-bold">50+</div>
                  <div className="mt-2 text-sm text-green-400">Countries</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-2xl space-y-6">
              <h2 className="font-mono text-3xl font-bold">
                JOIN OUR COMMUNITY
              </h2>
              <p className="text-lg text-green-400/90">
                Connect with fellow hackers, share strategies, and stay updated
                on the latest game news.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
                <Link href="/dashboard">
                  <Button className="w-full bg-green-600 text-black hover:bg-green-500 sm:w-auto">
                    Play Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    variant="outline"
                    className="w-full border-green-600 text-green-500 hover:bg-green-950 hover:text-green-400 sm:w-auto"
                  >
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-green-900/50 py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center space-x-2">
              <Terminal className="h-5 w-5 text-green-500" />
              <span className="font-mono text-sm font-bold">HACKER TYCOON</span>
            </div>

            <div className="flex gap-6">
              <Link
                href="#"
                className="text-xs text-green-500 hover:text-green-400"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-xs text-green-500 hover:text-green-400"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-xs text-green-500 hover:text-green-400"
              >
                Contact
              </Link>
            </div>

            <div className="text-xs text-green-600">
              &copy; {new Date().getFullYear()} Hacker Tycoon. All rights
              reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
