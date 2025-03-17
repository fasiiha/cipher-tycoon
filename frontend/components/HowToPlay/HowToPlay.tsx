import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Award,
  ChevronRight,
  Cpu,
  Database,
  Globe,
  Lock,
  Server,
  Shield,
  Terminal,
  Wifi,
  Zap,
} from "lucide-react";
import Link from "next/link";
import LandingNavbar from "../LandingNavbar";

export default function HowToPlay() {
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
                HOW TO PLAY
              </h1>
              <p className="text-lg text-green-400/90">
                Master the art of hacking with our comprehensive guide to Hacker
                Tycoon
              </p>
            </div>
          </div>
        </section>

        {/* Tutorial Tabs */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <Tabs defaultValue="getting-started">
                <div className="flex justify-center">
                  <TabsList className="mb-8 bg-green-950/20">
                    <TabsTrigger
                      value="getting-started"
                      className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                    >
                      Getting Started
                    </TabsTrigger>
                    <TabsTrigger
                      value="missions"
                      className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                    >
                      Missions
                    </TabsTrigger>
                    <TabsTrigger
                      value="upgrades"
                      className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                    >
                      Upgrades
                    </TabsTrigger>
                    <TabsTrigger
                      value="pvp"
                      className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                    >
                      PvP
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="getting-started" className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="font-mono text-2xl font-bold">
                      WELCOME TO HACKER TYCOON
                    </h2>
                    <p className="text-green-400/90">
                      Hacker Tycoon is a text-based hacking simulation game
                      where you build your digital empire, complete missions,
                      and compete with other players. This guide will help you
                      get started on your journey to becoming the ultimate
                      hacker.
                    </p>
                  </div>

                  <div className="rounded-lg border border-green-900 bg-green-950/10 p-6">
                    <h3 className="mb-4 font-mono text-xl font-bold">
                      STEP 1: CREATE YOUR ACCOUNT
                    </h3>
                    <div className="space-y-4">
                      <p className="text-green-400/90">
                        Start by creating your account. Choose a unique username
                        that will represent you in the hacking world.
                      </p>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-start">
                          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-950 text-sm font-bold">
                            1
                          </div>
                          <p className="text-green-400/90">
                            Click the "Play Now" button at the top of the page
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-950 text-sm font-bold">
                            2
                          </div>
                          <p className="text-green-400/90">
                            Select "Sign Up" on the login page
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-950 text-sm font-bold">
                            3
                          </div>
                          <p className="text-green-400/90">
                            Fill in your details and create a secure password
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-950 text-sm font-bold">
                            4
                          </div>
                          <p className="text-green-400/90">
                            Optionally, connect your crypto wallet for Web3
                            features
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-green-900 bg-green-950/10 p-6">
                    <h3 className="mb-4 font-mono text-xl font-bold">
                      STEP 2: NAVIGATE THE DASHBOARD
                    </h3>
                    <div className="space-y-4">
                      <p className="text-green-400/90">
                        After logging in, you'll be taken to your dashboard.
                        This is your command center for all hacking operations.
                      </p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Terminal className="h-5 w-5 text-green-500" />
                            <h4 className="font-bold">Terminal</h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            Use the terminal to interact with the game through
                            text commands. Type 'help' to see available
                            commands.
                          </p>
                        </div>
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Server className="h-5 w-5 text-green-500" />
                            <h4 className="font-bold">Mission Status</h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            View your current mission progress, rewards, and
                            time remaining.
                          </p>
                        </div>
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Shield className="h-5 w-5 text-green-500" />
                            <h4 className="font-bold">System Stats</h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            Monitor your CPU, memory, network, and security
                            levels.
                          </p>
                        </div>
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Zap className="h-5 w-5 text-green-500" />
                            <h4 className="font-bold">Quick Actions</h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            Access frequently used functions like quick missions
                            and security boosts.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-green-900 bg-green-950/10 p-6">
                    <h3 className="mb-4 font-mono text-xl font-bold">
                      STEP 3: COMPLETE YOUR FIRST MISSION
                    </h3>
                    <div className="space-y-4">
                      <p className="text-green-400/90">
                        Missions are the primary way to earn cryptocurrency
                        (HTC) and gain experience in the game.
                      </p>
                      <div className="flex flex-col space-y-2">
                        <div className="flex items-start">
                          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-950 text-sm font-bold">
                            1
                          </div>
                          <p className="text-green-400/90">
                            Click "Quick Mission" in the dashboard or navigate
                            to the Missions page
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-950 text-sm font-bold">
                            2
                          </div>
                          <p className="text-green-400/90">
                            Select a mission appropriate for your skill level
                            (start with "Data Extraction")
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-950 text-sm font-bold">
                            3
                          </div>
                          <p className="text-green-400/90">
                            Follow the on-screen instructions to complete the
                            mission
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-950 text-sm font-bold">
                            4
                          </div>
                          <p className="text-green-400/90">
                            Collect your rewards upon successful completion
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-green-900 bg-green-950/10 p-6">
                    <h3 className="mb-4 font-mono text-xl font-bold">
                      TERMINAL COMMANDS
                    </h3>
                    <div className="space-y-4">
                      <p className="text-green-400/90">
                        The terminal is your primary interface for interacting
                        with the game. Here are some essential commands:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-green-950/30 text-xs uppercase">
                            <tr>
                              <th scope="col" className="px-6 py-3">
                                Command
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Description
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-green-900/30">
                              <td className="px-6 py-4 font-mono">help</td>
                              <td className="px-6 py-4">
                                Show available commands
                              </td>
                            </tr>
                            <tr className="border-b border-green-900/30">
                              <td className="px-6 py-4 font-mono">status</td>
                              <td className="px-6 py-4">
                                Show system status and balance
                              </td>
                            </tr>
                            <tr className="border-b border-green-900/30">
                              <td className="px-6 py-4 font-mono">scan</td>
                              <td className="px-6 py-4">
                                Scan for vulnerabilities and mission
                                opportunities
                              </td>
                            </tr>
                            <tr className="border-b border-green-900/30">
                              <td className="px-6 py-4 font-mono">
                                mission start [id]
                              </td>
                              <td className="px-6 py-4">
                                Start a mission with the specified ID
                              </td>
                            </tr>
                            <tr className="border-b border-green-900/30">
                              <td className="px-6 py-4 font-mono">clear</td>
                              <td className="px-6 py-4">
                                Clear the terminal screen
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="missions" className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="font-mono text-2xl font-bold">
                      MISSION SYSTEM
                    </h2>
                    <p className="text-green-400/90">
                      Missions are the core gameplay element in Hacker Tycoon.
                      They represent various hacking tasks that you can complete
                      to earn rewards and advance in the game.
                    </p>
                  </div>

                  <div className="rounded-lg border border-green-900 bg-green-950/10 p-6">
                    <h3 className="mb-4 font-mono text-xl font-bold">
                      MISSION TYPES
                    </h3>
                    <div className="space-y-4">
                      <p className="text-green-400/90">
                        There are several types of missions available, each with
                        different difficulty levels and rewards:
                      </p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Database className="h-5 w-5 text-blue-400" />
                            <h4 className="font-bold">Data Extraction</h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            Extract valuable data from unsecured or lightly
                            secured systems. Perfect for beginners.
                          </p>
                        </div>
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Server className="h-5 w-5 text-yellow-400" />
                            <h4 className="font-bold">
                              Corporate Infiltration
                            </h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            Break into corporate networks to steal sensitive
                            information. Moderate difficulty.
                          </p>
                        </div>
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Shield className="h-5 w-5 text-green-400" />
                            <h4 className="font-bold">Security Audit</h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            Perform security audits for clients to identify
                            vulnerabilities. Legal missions with good rewards.
                          </p>
                        </div>
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Lock className="h-5 w-5 text-red-400" />
                            <h4 className="font-bold">Banking System Breach</h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            Infiltrate banking systems to transfer funds. High
                            difficulty, high risk, but substantial rewards.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-green-900 bg-green-950/10 p-6">
                    <h3 className="mb-4 font-mono text-xl font-bold">
                      MISSION DIFFICULTY
                    </h3>
                    <div className="space-y-4">
                      <p className="text-green-400/90">
                        Missions are categorized by difficulty level, which
                        affects both the challenge and the rewards:
                      </p>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <div className="rounded-full bg-green-600 px-2 py-1 text-xs font-bold text-black">
                            Easy
                          </div>
                          <p className="text-green-400/90">
                            Suitable for beginners. Low security, short
                            completion time, modest rewards.
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="rounded-full bg-yellow-600 px-2 py-1 text-xs font-bold text-black">
                            Medium
                          </div>
                          <p className="text-green-400/90">
                            Requires some experience. Moderate security, longer
                            completion time, better rewards.
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="rounded-full bg-orange-600 px-2 py-1 text-xs font-bold text-black">
                            Hard
                          </div>
                          <p className="text-green-400/90">
                            For experienced hackers. High security, significant
                            time investment, substantial rewards.
                          </p>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-black">
                            Extreme
                          </div>
                          <p className="text-green-400/90">
                            For elite hackers only. Maximum security, lengthy
                            completion time, exceptional rewards.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-green-900 bg-green-950/10 p-6">
                    <h3 className="mb-4 font-mono text-xl font-bold">
                      MISSION REWARDS
                    </h3>
                    <div className="space-y-4">
                      <p className="text-green-400/90">
                        Successfully completing missions provides various
                        rewards:
                      </p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Database className="h-5 w-5 text-green-500" />
                            <h4 className="font-bold">Cryptocurrency (HTC)</h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            The primary reward, used to purchase upgrades and
                            equipment.
                          </p>
                        </div>
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Award className="h-5 w-5 text-yellow-500" />
                            <h4 className="font-bold">Experience Points</h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            Increases your hacker level, unlocking new missions
                            and features.
                          </p>
                        </div>
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Cpu className="h-5 w-5 text-blue-500" />
                            <h4 className="font-bold">Rare Equipment</h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            Some missions reward special equipment that can't be
                            purchased normally.
                          </p>
                        </div>
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Globe className="h-5 w-5 text-purple-500" />
                            <h4 className="font-bold">Reputation</h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            Increases your standing in the hacker community,
                            affecting mission availability.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-green-900 bg-green-950/10 p-6">
                    <h3 className="mb-4 font-mono text-xl font-bold">
                      MISSION TIPS
                    </h3>
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-green-500" />
                          <p className="text-green-400/90">
                            <span className="font-bold">Start small:</span>{" "}
                            Begin with easy missions to build up your resources
                            and experience.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-green-500" />
                          <p className="text-green-400/90">
                            <span className="font-bold">
                              Upgrade strategically:
                            </span>{" "}
                            Invest in upgrades that will help you complete more
                            difficult missions.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-green-500" />
                          <p className="text-green-400/90">
                            <span className="font-bold">
                              Balance risk and reward:
                            </span>{" "}
                            Illegal missions offer higher rewards but come with
                            greater risks.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-green-500" />
                          <p className="text-green-400/90">
                            <span className="font-bold">Watch the timer:</span>{" "}
                            Missions have time limits. Make sure you can
                            complete them before starting.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-green-500" />
                          <p className="text-green-400/90">
                            <span className="font-bold">Use the terminal:</span>{" "}
                            Many missions can be optimized by using specific
                            terminal commands.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="upgrades" className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="font-mono text-2xl font-bold">
                      UPGRADE SYSTEM
                    </h2>
                    <p className="text-green-400/90">
                      Upgrades are essential for progressing in Hacker Tycoon.
                      They improve your capabilities, allowing you to take on
                      more challenging missions and defend against other
                      players.
                    </p>
                  </div>

                  <div className="rounded-lg border border-green-900 bg-green-950/10 p-6">
                    <h3 className="mb-4 font-mono text-xl font-bold">
                      UPGRADE CATEGORIES
                    </h3>
                    <div className="space-y-4">
                      <p className="text-green-400/90">
                        There are four main categories of upgrades:
                      </p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Cpu className="h-5 w-5 text-blue-400" />
                            <h4 className="font-bold">Hardware</h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            Physical components like CPUs, RAM, and storage that
                            improve processing speed and capacity.
                          </p>
                          <div className="mt-3 space-y-1 text-xs text-green-600">
                            <div>• CPU Upgrade</div>
                            <div>• RAM Expansion</div>
                            <div>• Quantum Processor</div>
                            <div>• Crypto Miner</div>
                          </div>
                        </div>
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Terminal className="h-5 w-5 text-purple-400" />
                            <h4 className="font-bold">Software</h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            Programs and tools that enhance your hacking
                            capabilities and efficiency.
                          </p>
                          <div className="mt-3 space-y-1 text-xs text-green-600">
                            <div>• Encryption Breaker</div>
                            <div>• Stealth Module</div>
                            <div>• Advanced Compiler</div>
                            <div>• Virus Toolkit</div>
                          </div>
                        </div>
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Shield className="h-5 w-5 text-green-400" />
                            <h4 className="font-bold">Security</h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            Defensive measures that protect your system from
                            attacks by other players.
                          </p>
                          <div className="mt-3 space-y-1 text-xs text-green-600">
                            <div>• Advanced Firewall</div>
                            <div>• Encryption Suite</div>
                            <div>• Intrusion Detection</div>
                            <div>• Honeypot System</div>
                          </div>
                        </div>
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Wifi className="h-5 w-5 text-yellow-400" />
                            <h4 className="font-bold">Network</h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            Infrastructure that improves your connection speed
                            and stability.
                          </p>
                          <div className="mt-3 space-y-1 text-xs text-green-600">
                            <div>• Network Booster</div>
                            <div>• VPN Service</div>
                            <div>• Proxy Chain</div>
                            <div>• Satellite Uplink</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-green-900 bg-green-950/10 p-6">
                    <h3 className="mb-4 font-mono text-xl font-bold">
                      UPGRADE LEVELS
                    </h3>
                    <div className="space-y-4">
                      <p className="text-green-400/90">
                        Most upgrades have multiple levels, with each level
                        providing increased benefits:
                      </p>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                          <thead className="bg-green-950/30 text-xs uppercase">
                            <tr>
                              <th scope="col" className="px-6 py-3">
                                Level
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Cost Multiplier
                              </th>
                              <th scope="col" className="px-6 py-3">
                                Benefit
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-b border-green-900/30">
                              <td className="px-6 py-4">Level 1</td>
                              <td className="px-6 py-4">Base Cost</td>
                              <td className="px-6 py-4">Basic functionality</td>
                            </tr>
                            <tr className="border-b border-green-900/30">
                              <td className="px-6 py-4">Level 2</td>
                              <td className="px-6 py-4">1.5x Base Cost</td>
                              <td className="px-6 py-4">+25% effectiveness</td>
                            </tr>
                            <tr className="border-b border-green-900/30">
                              <td className="px-6 py-4">Level 3</td>
                              <td className="px-6 py-4">2x Base Cost</td>
                              <td className="px-6 py-4">+50% effectiveness</td>
                            </tr>
                            <tr className="border-b border-green-900/30">
                              <td className="px-6 py-4">Level 4</td>
                              <td className="px-6 py-4">3x Base Cost</td>
                              <td className="px-6 py-4">+75% effectiveness</td>
                            </tr>
                            <tr className="border-b border-green-900/30">
                              <td className="px-6 py-4">Level 5</td>
                              <td className="px-6 py-4">5x Base Cost</td>
                              <td className="px-6 py-4">+100% effectiveness</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-green-900 bg-green-950/10 p-6">
                    <h3 className="mb-4 font-mono text-xl font-bold">
                      UPGRADE STRATEGY
                    </h3>
                    <div className="space-y-4">
                      <p className="text-green-400/90">
                        Developing an effective upgrade strategy is crucial for
                        success in Hacker Tycoon:
                      </p>
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-green-500" />
                          <p className="text-green-400/90">
                            <span className="font-bold">
                              Balance your upgrades:
                            </span>{" "}
                            Don't focus exclusively on one category. A
                            well-rounded system is more effective.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-green-500" />
                          <p className="text-green-400/90">
                            <span className="font-bold">
                              Prioritize based on playstyle:
                            </span>{" "}
                            If you focus on missions, prioritize hardware and
                            software. If you engage in PvP, focus on security.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-green-500" />
                          <p className="text-green-400/90">
                            <span className="font-bold">
                              Invest in passive income:
                            </span>{" "}
                            The Crypto Miner upgrade provides a steady stream of
                            HTC, which can be valuable in the long run.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-green-500" />
                          <p className="text-green-400/90">
                            <span className="font-bold">
                              Upgrade incrementally:
                            </span>{" "}
                            It's often better to have multiple Level 2-3
                            upgrades than a single Level 5 upgrade.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-green-500" />
                          <p className="text-green-400/90">
                            <span className="font-bold">
                              Save for special upgrades:
                            </span>{" "}
                            Some high-tier upgrades like the Quantum Processor
                            are expensive but provide significant advantages.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="pvp" className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="font-mono text-2xl font-bold">PVP SYSTEM</h2>
                    <p className="text-green-400/90">
                      Player versus Player (PvP) combat is an exciting aspect of
                      Hacker Tycoon that allows you to test your skills against
                      other players, earn rewards, and climb the global
                      rankings.
                    </p>
                  </div>

                  <div className="rounded-lg border border-green-900 bg-green-950/10 p-6">
                    <h3 className="mb-4 font-mono text-xl font-bold">
                      ATTACKING OTHER PLAYERS
                    </h3>
                    <div className="space-y-4">
                      <p className="text-green-400/90">
                        You can attack other players' servers to steal
                        cryptocurrency and gain reputation:
                      </p>
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-start">
                          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-950 text-sm font-bold">
                            1
                          </div>
                          <p className="text-green-400/90">
                            Navigate to the PvP page from your dashboard
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-950 text-sm font-bold">
                            2
                          </div>
                          <p className="text-green-400/90">
                            Browse the list of available targets
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-950 text-sm font-bold">
                            3
                          </div>
                          <p className="text-green-400/90">
                            Select a target based on their security level and
                            potential rewards
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-950 text-sm font-bold">
                            4
                          </div>
                          <p className="text-green-400/90">
                            Click "Attack Server" to initiate the attack
                          </p>
                        </div>
                        <div className="flex items-start">
                          <div className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-green-950 text-sm font-bold">
                            5
                          </div>
                          <p className="text-green-400/90">
                            Monitor the attack progress and collect rewards if
                            successful
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-green-900 bg-green-950/10 p-6">
                    <h3 className="mb-4 font-mono text-xl font-bold">
                      DEFENDING YOUR SERVER
                    </h3>
                    <div className="space-y-4">
                      <p className="text-green-400/90">
                        Protecting your server from attacks is just as important
                        as launching your own attacks:
                      </p>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Shield className="h-5 w-5 text-green-400" />
                            <h4 className="font-bold">Security Upgrades</h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            Invest in security upgrades like firewalls and
                            encryption to make your server harder to breach.
                          </p>
                        </div>
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Lock className="h-5 w-5 text-yellow-400" />
                            <h4 className="font-bold">Fix Vulnerabilities</h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            Regularly scan your system for vulnerabilities and
                            fix them to prevent exploitation.
                          </p>
                        </div>
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Terminal className="h-5 w-5 text-blue-400" />
                            <h4 className="font-bold">Security Logs</h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            Monitor your security logs to identify patterns in
                            attacks and strengthen weak points.
                          </p>
                        </div>
                        <div className="rounded-lg border border-green-900 bg-black p-4">
                          <div className="flex items-center space-x-2">
                            <Zap className="h-5 w-5 text-red-400" />
                            <h4 className="font-bold">Countermeasures</h4>
                          </div>
                          <p className="mt-2 text-sm text-green-400/90">
                            Set up active countermeasures like honeypots to trap
                            attackers and trace their location.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-green-900 bg-green-950/10 p-6">
                    <h3 className="mb-4 font-mono text-xl font-bold">
                      PVP REWARDS AND PENALTIES
                    </h3>
                    <div className="space-y-4">
                      <div className="grid gap-6 md:grid-cols-2">
                        <div>
                          <h4 className="mb-3 font-bold">
                            Successful Attack Rewards
                          </h4>
                          <ul className="space-y-2 text-sm text-green-400/90">
                            <li className="flex items-start">
                              <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                              <span>
                                Cryptocurrency stolen from the target (based on
                                their balance)
                              </span>
                            </li>
                            <li className="flex items-start">
                              <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                              <span>
                                Reputation points in the hacker community
                              </span>
                            </li>
                            <li className="flex items-start">
                              <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                              <span>PvP ranking points</span>
                            </li>
                            <li className="flex items-start">
                              <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                              <span>
                                Occasionally, rare items or information
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="mb-3 font-bold">
                            Failed Attack Penalties
                          </h4>
                          <ul className="space-y-2 text-sm text-green-400/90">
                            <li className="flex items-start">
                              <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-red-500" />
                              <span>Loss of cryptocurrency (attack costs)</span>
                            </li>
                            <li className="flex items-start">
                              <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-red-500" />
                              <span>Potential reputation damage</span>
                            </li>
                            <li className="flex items-start">
                              <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-red-500" />
                              <span>PvP ranking point reduction</span>
                            </li>
                            <li className="flex items-start">
                              <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-red-500" />
                              <span>
                                Your IP may be exposed to the defender
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg border border-green-900 bg-green-950/10 p-6">
                    <h3 className="mb-4 font-mono text-xl font-bold">
                      PVP TIPS AND STRATEGIES
                    </h3>
                    <div className="space-y-4">
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-green-500" />
                          <p className="text-green-400/90">
                            <span className="font-bold">
                              Choose targets carefully:
                            </span>{" "}
                            Look for players with high cryptocurrency balances
                            but moderate security levels.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-green-500" />
                          <p className="text-green-400/90">
                            <span className="font-bold">Timing matters:</span>{" "}
                            Attack when players are likely to be offline and
                            unable to respond to security alerts.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-green-500" />
                          <p className="text-green-400/90">
                            <span className="font-bold">
                              Invest in stealth:
                            </span>{" "}
                            Stealth upgrades reduce the chance of being detected
                            during an attack.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-green-500" />
                          <p className="text-green-400/90">
                            <span className="font-bold">
                              Balance offense and defense:
                            </span>{" "}
                            Don't focus solely on attacking; make sure your own
                            server is well-protected.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-green-500" />
                          <p className="text-green-400/90">
                            <span className="font-bold">
                              Learn from failures:
                            </span>{" "}
                            If an attack fails, analyze what went wrong and
                            improve your strategy.
                          </p>
                        </div>
                        <div className="flex items-start">
                          <ChevronRight className="mr-2 h-5 w-5 text-green-500" />
                          <p className="text-green-400/90">
                            <span className="font-bold">Form alliances:</span>{" "}
                            Collaborate with other players for mutual protection
                            and shared intelligence.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-950/10">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-2xl space-y-6">
              <h2 className="font-mono text-3xl font-bold">
                READY TO START YOUR HACKING CAREER?
              </h2>
              <p className="text-lg text-green-400/90">
                Now that you understand the basics, it's time to put your skills
                to the test in Hacker Tycoon.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
                <Link href="/dashboard">
                  <Button className="w-full bg-green-600 text-black hover:bg-green-500 sm:w-auto">
                    Play Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/community">
                  <Button
                    variant="outline"
                    className="w-full border-green-600 text-green-500 hover:bg-green-950 hover:text-green-400 sm:w-auto"
                  >
                    Join Community
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
