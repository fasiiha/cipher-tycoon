"use client"

import { useState } from "react"
import Link from "next/link"
import { Terminal, Server, Shield, Award, User, LogOut, Filter, Search, AlertTriangle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type Mission = {
  id: number
  title: string
  description: string
  difficulty: "Easy" | "Medium" | "Hard" | "Extreme"
  reward: number
  type: "Legal" | "Illegal"
  timeRequired: number
  isAvailable: boolean
}

export default function MissionsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 1,
      title: "Data Extraction",
      description: "Extract customer data from an unsecured database. Low risk, perfect for beginners.",
      difficulty: "Easy",
      reward: 250,
      type: "Legal",
      timeRequired: 30,
      isAvailable: true,
    },
    {
      id: 2,
      title: "Corporate Database Infiltration",
      description: "Gain access to a corporate database and extract valuable information without being detected.",
      difficulty: "Medium",
      reward: 500,
      type: "Illegal",
      timeRequired: 60,
      isAvailable: true,
    },
    {
      id: 3,
      title: "Security Audit",
      description: "Perform a security audit for a client. Find and document vulnerabilities in their system.",
      difficulty: "Medium",
      reward: 450,
      type: "Legal",
      timeRequired: 45,
      isAvailable: true,
    },
    {
      id: 4,
      title: "Banking System Breach",
      description: "Infiltrate a banking system and transfer funds without triggering security protocols.",
      difficulty: "Hard",
      reward: 1200,
      type: "Illegal",
      timeRequired: 120,
      isAvailable: true,
    },
    {
      id: 5,
      title: "Social Media Account Recovery",
      description: "Help a client recover their hacked social media account by bypassing security measures.",
      difficulty: "Easy",
      reward: 300,
      type: "Legal",
      timeRequired: 25,
      isAvailable: true,
    },
    {
      id: 6,
      title: "Government Database Hack",
      description: "Access classified government information. Extremely high risk with maximum security measures.",
      difficulty: "Extreme",
      reward: 5000,
      type: "Illegal",
      timeRequired: 240,
      isAvailable: false,
    },
  ])

  const startMission = (missionId: number) => {
    // In a real app, this would navigate to the mission or update state
    console.log(`Starting mission ${missionId}`)
  }

  const filteredMissions = missions.filter((mission) => {
    const matchesSearch =
      mission.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mission.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

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
                    <Button variant="ghost" size="icon" className="bg-green-950/50 text-green-400">
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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-green-500 hover:bg-green-950 hover:text-green-400"
                  >
                    <Award className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Leaderboard</p>
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
                    <User className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Separator orientation="vertical" className="mx-1 h-6 bg-green-900/50" />

            <Button variant="ghost" size="icon" className="text-green-500 hover:bg-green-950 hover:text-green-400">
              <LogOut className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <h1 className="font-mono text-2xl font-bold">AVAILABLE MISSIONS</h1>
            <p className="text-green-400/90">Select a mission to start hacking and earn cryptocurrency</p>
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" />
              <Input
                placeholder="Search missions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-green-900 bg-black pl-9 text-green-400 focus-visible:ring-green-500"
              />
            </div>
            <Button
              variant="outline"
              className="border-green-900 bg-green-950/30 text-green-400 hover:bg-green-950 hover:text-green-300"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <Tabs defaultValue="all">
            <TabsList className="w-full bg-green-950/20 sm:w-auto">
              <TabsTrigger value="all" className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300">
                All Missions
              </TabsTrigger>
              <TabsTrigger
                value="legal"
                className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
              >
                Legal
              </TabsTrigger>
              <TabsTrigger
                value="illegal"
                className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
              >
                Illegal
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredMissions.map((mission) => (
                  <Card key={mission.id} className="border-green-900 bg-black">
                    <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="font-mono text-lg">{mission.title}</CardTitle>
                        <Badge
                          variant="outline"
                          className={
                            mission.type === "Legal" ? "border-blue-600 text-blue-500" : "border-red-600 text-red-500"
                          }
                        >
                          {mission.type}
                        </Badge>
                      </div>
                      <CardDescription className="text-green-600">
                        {mission.difficulty} • {mission.timeRequired}s
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="p-4">
                      <p className="text-sm text-green-400">{mission.description}</p>
                    </CardContent>
                    <CardFooter className="border-t border-green-900/50 bg-green-950/10 p-4">
                      <div className="flex w-full items-center justify-between">
                        <div className="flex items-center space-x-1 text-green-400">
                          <span className="text-sm font-bold">+{mission.reward}</span>
                          <span className="text-xs">HTC</span>
                        </div>
                        {mission.isAvailable ? (
                          <Button
                            onClick={() => startMission(mission.id)}
                            className="bg-green-600 text-black hover:bg-green-500"
                          >
                            Start Mission
                          </Button>
                        ) : (
                          <Button disabled className="cursor-not-allowed bg-red-900/50 text-red-300">
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Locked
                          </Button>
                        )}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {filteredMissions.length === 0 && (
                <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-green-900 bg-black/80 p-6">
                  <p className="text-center text-green-400">No missions found matching your search criteria.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="legal" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredMissions
                  .filter((mission) => mission.type === "Legal")
                  .map((mission) => (
                    <Card key={mission.id} className="border-green-900 bg-black">
                      <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="font-mono text-lg">{mission.title}</CardTitle>
                          <Badge variant="outline" className="border-blue-600 text-blue-500">
                            {mission.type}
                          </Badge>
                        </div>
                        <CardDescription className="text-green-600">
                          {mission.difficulty} • {mission.timeRequired}s
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        <p className="text-sm text-green-400">{mission.description}</p>
                      </CardContent>
                      <CardFooter className="border-t border-green-900/50 bg-green-950/10 p-4">
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center space-x-1 text-green-400">
                            <span className="text-sm font-bold">+{mission.reward}</span>
                            <span className="text-xs">HTC</span>
                          </div>
                          {mission.isAvailable ? (
                            <Button
                              onClick={() => startMission(mission.id)}
                              className="bg-green-600 text-black hover:bg-green-500"
                            >
                              Start Mission
                            </Button>
                          ) : (
                            <Button disabled className="cursor-not-allowed bg-red-900/50 text-red-300">
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              Locked
                            </Button>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
              </div>

              {filteredMissions.filter((mission) => mission.type === "Legal").length === 0 && (
                <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-green-900 bg-black/80 p-6">
                  <p className="text-center text-green-400">No legal missions found matching your search criteria.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="illegal" className="mt-6">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredMissions
                  .filter((mission) => mission.type === "Illegal")
                  .map((mission) => (
                    <Card key={mission.id} className="border-green-900 bg-black">
                      <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                        <div className="flex items-center justify-between">
                          <CardTitle className="font-mono text-lg">{mission.title}</CardTitle>
                          <Badge variant="outline" className="border-red-600 text-red-500">
                            {mission.type}
                          </Badge>
                        </div>
                        <CardDescription className="text-green-600">
                          {mission.difficulty} • {mission.timeRequired}s
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-4">
                        <p className="text-sm text-green-400">{mission.description}</p>
                      </CardContent>
                      <CardFooter className="border-t border-green-900/50 bg-green-950/10 p-4">
                        <div className="flex w-full items-center justify-between">
                          <div className="flex items-center space-x-1 text-green-400">
                            <span className="text-sm font-bold">+{mission.reward}</span>
                            <span className="text-xs">HTC</span>
                          </div>
                          {mission.isAvailable ? (
                            <Button
                              onClick={() => startMission(mission.id)}
                              className="bg-green-600 text-black hover:bg-green-500"
                            >
                              Start Mission
                            </Button>
                          ) : (
                            <Button disabled className="cursor-not-allowed bg-red-900/50 text-red-300">
                              <AlertTriangle className="mr-2 h-4 w-4" />
                              Locked
                            </Button>
                          )}
                        </div>
                      </CardFooter>
                    </Card>
                  ))}
              </div>

              {filteredMissions.filter((mission) => mission.type === "Illegal").length === 0 && (
                <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-green-900 bg-black/80 p-6">
                  <p className="text-center text-green-400">No illegal missions found matching your search criteria.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

