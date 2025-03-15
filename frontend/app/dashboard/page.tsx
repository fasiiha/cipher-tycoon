"use client";

import type React from "react";

import {
  AlertTriangle,
  Award,
  Clock,
  Cpu,
  DollarSign,
  LogOut,
  Server,
  Shield,
  Terminal,
  User,
  Wifi,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Dashboard() {
  const router = useRouter();
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    "Initializing system...",
    "Connecting to secure server...",
    "Connection established.",
    "Welcome to Hacker Tycoon Terminal v3.1.4",
    "Type 'help' for available commands.",
    "> _",
  ]);
  const [terminalInput, setTerminalInput] = useState("");
  const [activeMission, setActiveMission] = useState<null | {
    title: string;
    description: string;
    difficulty: string;
    reward: number;
    progress: number;
    timeRemaining: number;
  }>(null);
  const [cryptoBalance, setCryptoBalance] = useState(1250);
  const [serverStatus, setServerStatus] = useState({
    cpu: 45,
    memory: 32,
    network: 28,
    security: 76,
  });
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "New mission available: Corporate Database Infiltration",
      read: false,
    },
    { id: 2, message: "Server upgrade available", read: false },
    {
      id: 3,
      message: "Player 'DarkByte' attempted to breach your server",
      read: true,
    },
  ]);

  // Simulate mission progress
  useEffect(() => {
    if (activeMission) {
      const timer = setInterval(() => {
        setActiveMission((prev) => {
          if (!prev) return null;

          const newProgress = prev.progress + 5;
          const newTimeRemaining = prev.timeRemaining - 5;

          if (newProgress >= 100) {
            // Mission complete
            addToTerminal(`Mission "${prev.title}" completed successfully!`);
            addToTerminal(`Earned ${prev.reward} HTC`);
            setCryptoBalance((balance) => balance + prev.reward);
            clearInterval(timer);
            return null;
          }

          return {
            ...prev,
            progress: newProgress,
            timeRemaining: newTimeRemaining,
          };
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [activeMission]);

  const addToTerminal = (text: string) => {
    setTerminalOutput((prev) => [
      ...prev.slice(0, prev.length - 1),
      text,
      "> _",
    ]);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!terminalInput.trim()) return;

    // Remove the cursor line
    setTerminalOutput((prev) => prev.slice(0, prev.length - 1));

    // Add user input to terminal
    addToTerminal(`> ${terminalInput}`);

    // Process commands
    processCommand(terminalInput);

    // Clear input
    setTerminalInput("");
  };

  const processCommand = (command: string) => {
    const cmd = command.toLowerCase().trim();

    if (cmd === "help") {
      addToTerminal("Available commands:");
      addToTerminal("  help - Show this help message");
      addToTerminal("  status - Show system status");
      addToTerminal("  scan - Scan for vulnerabilities");
      addToTerminal("  mission start [id] - Start a mission");
      addToTerminal("  clear - Clear terminal");
    } else if (cmd === "status") {
      addToTerminal("System Status:");
      addToTerminal(`  CPU: ${serverStatus.cpu}%`);
      addToTerminal(`  Memory: ${serverStatus.memory}%`);
      addToTerminal(`  Network: ${serverStatus.network}%`);
      addToTerminal(`  Security: ${serverStatus.security}%`);
      addToTerminal(`  Balance: ${cryptoBalance} HTC`);
    } else if (cmd === "scan") {
      addToTerminal("Scanning for vulnerabilities...");

      setTimeout(() => {
        addToTerminal("Scan complete. Found 3 potential targets:");
        addToTerminal("  1. Corporate Database (Difficulty: Medium)");
        addToTerminal("  2. Banking System (Difficulty: Hard)");
        addToTerminal("  3. Social Media Platform (Difficulty: Easy)");
        addToTerminal("Use 'mission start [id]' to begin a mission.");
      }, 1500);
    } else if (cmd.startsWith("mission start")) {
      const missionId = cmd.split(" ")[2];

      if (missionId === "1") {
        if (activeMission) {
          addToTerminal("Error: Mission already in progress.");
          return;
        }

        addToTerminal("Starting mission: Corporate Database Infiltration");
        addToTerminal("Establishing connection...");

        setTimeout(() => {
          addToTerminal(
            "Connection established. Beginning infiltration sequence."
          );
          setActiveMission({
            title: "Corporate Database Infiltration",
            description:
              "Gain access to the corporate database and extract valuable information.",
            difficulty: "Medium",
            reward: 500,
            progress: 0,
            timeRemaining: 60,
          });
        }, 1000);
      } else if (missionId === "2" || missionId === "3") {
        addToTerminal(`Starting mission ${missionId}...`);
        addToTerminal("This mission is not available in the demo version.");
      } else {
        addToTerminal(`Error: Invalid mission ID "${missionId}".`);
      }
    } else if (cmd === "clear") {
      setTerminalOutput(["Terminal cleared.", "> _"]);
    } else {
      addToTerminal(`Command not recognized: ${command}`);
    }
  };

  const startQuickMission = () => {
    if (activeMission) {
      addToTerminal("Error: Mission already in progress.");
      return;
    }

    addToTerminal("Starting quick mission: Data Extraction");
    addToTerminal("Establishing connection...");

    setTimeout(() => {
      addToTerminal("Connection established. Beginning extraction sequence.");
      setActiveMission({
        title: "Data Extraction",
        description: "Extract data from an unsecured server.",
        difficulty: "Easy",
        reward: 250,
        progress: 0,
        timeRemaining: 30,
      });
    }, 1000);
  };

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
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-green-500 hover:bg-green-950 hover:text-green-400"
                  >
                    <Server className="h-5 w-5" />
                  </Button>
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
                    <Cpu className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upgrades</p>
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
      <main className="flex flex-1 flex-col md:flex-row">
        {/* Left Sidebar */}
        <div className="w-full border-r border-green-900/50 bg-black/80 p-4 md:w-64">
          <div className="mb-6 space-y-2">
            <h2 className="font-mono text-lg font-bold">PLAYER STATS</h2>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-4 w-4 text-green-400" />
              <span className="font-mono">{cryptoBalance} HTC</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs">CPU</span>
                <span className="text-xs">{serverStatus.cpu}%</span>
              </div>
              <Progress
                value={serverStatus.cpu}
                className="h-1 bg-green-950"
                indicatorclassname="bg-green-500"
              />

              <div className="flex items-center justify-between">
                <span className="text-xs">MEMORY</span>
                <span className="text-xs">{serverStatus.memory}%</span>
              </div>
              <Progress
                value={serverStatus.memory}
                className="h-1 bg-green-950"
                indicatorclassname="bg-green-500"
              />

              <div className="flex items-center justify-between">
                <span className="text-xs">NETWORK</span>
                <span className="text-xs">{serverStatus.network}%</span>
              </div>
              <Progress
                value={serverStatus.network}
                className="h-1 bg-green-950"
                indicatorclassname="bg-green-500"
              />

              <div className="flex items-center justify-between">
                <span className="text-xs">SECURITY</span>
                <span className="text-xs">{serverStatus.security}%</span>
              </div>
              <Progress
                value={serverStatus.security}
                className="h-1 bg-green-950"
                indicatorclassname="bg-green-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="font-mono text-lg font-bold">QUICK ACTIONS</h2>
            <div className="grid gap-2">
              <Button
                variant="outline"
                className="justify-start border-green-900 bg-green-950/30 text-green-400 hover:bg-green-950 hover:text-green-300"
                onClick={startQuickMission}
              >
                <Zap className="mr-2 h-4 w-4" />
                Quick Mission
              </Button>
              <Button
                variant="outline"
                className="justify-start border-green-900 bg-green-950/30 text-green-400 hover:bg-green-950 hover:text-green-300"
              >
                <Shield className="mr-2 h-4 w-4" />
                Boost Security
              </Button>
              <Button
                variant="outline"
                className="justify-start border-green-900 bg-green-950/30 text-green-400 hover:bg-green-950 hover:text-green-300"
              >
                <Server className="mr-2 h-4 w-4" />
                Server Status
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4">
          <div className="grid gap-4 md:grid-cols-3">
            {/* Terminal Section - Spans 2 columns */}
            <Card className="col-span-3 border-green-900 bg-black md:col-span-2">
              <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                <CardTitle className="font-mono text-lg">TERMINAL</CardTitle>
                <CardDescription className="text-green-600">
                  Enter commands to interact with the system
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="flex h-[400px] flex-col">
                  <ScrollArea className="flex-1 p-4">
                    <div className="font-mono text-sm">
                      {terminalOutput.map((line, index) => (
                        <div
                          key={index}
                          className={
                            line.startsWith(">")
                              ? "text-green-300"
                              : "text-green-500"
                          }
                        >
                          {line}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                  <form
                    onSubmit={handleTerminalSubmit}
                    className="border-t border-green-900/50 p-2"
                  >
                    <input
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      className="w-full bg-transparent font-mono text-sm text-green-300 outline-none placeholder:text-green-900"
                      placeholder="Enter command..."
                      autoComplete="off"
                    />
                  </form>
                </div>
              </CardContent>
            </Card>

            {/* Mission Status */}
            <Card className="col-span-3 border-green-900 bg-black md:col-span-1">
              <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                <CardTitle className="font-mono text-lg">
                  MISSION STATUS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {activeMission ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-mono text-lg font-bold">
                        {activeMission.title}
                      </h3>
                      <p className="text-sm text-green-400">
                        {activeMission.description}
                      </p>
                      <div className="mt-2 flex items-center space-x-2">
                        <Badge
                          variant="outline"
                          className="border-yellow-600 text-yellow-500"
                        >
                          {activeMission.difficulty}
                        </Badge>
                        <Badge
                          variant="outline"
                          className="border-green-600 text-green-500"
                        >
                          +{activeMission.reward} HTC
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">PROGRESS</span>
                        <span className="text-xs">
                          {activeMission.progress}%
                        </span>
                      </div>
                      <Progress
                        value={activeMission.progress}
                        className="h-2 bg-green-950"
                        indicatorclassname="bg-green-500"
                      />
                    </div>

                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="h-4 w-4" />
                      <span>
                        {Math.max(0, activeMission.timeRemaining)}s remaining
                      </span>
                    </div>

                    <Button
                      variant="destructive"
                      className="w-full bg-red-900/50 text-red-400 hover:bg-red-900 hover:text-red-300"
                      onClick={() => setActiveMission(null)}
                    >
                      Abort Mission
                    </Button>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center space-y-4 py-8 text-center">
                    <div className="rounded-full bg-green-950/30 p-3">
                      <Terminal className="h-8 w-8 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-mono text-lg font-bold">
                        No Active Mission
                      </h3>
                      <p className="text-sm text-green-600">
                        Use the terminal to start a mission or click Quick
                        Mission
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      className="border-green-900 bg-green-950/30 text-green-400 hover:bg-green-950 hover:text-green-300"
                      onClick={startQuickMission}
                    >
                      Start Quick Mission
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Network Activity & Notifications */}
            <Card className="col-span-3 border-green-900 bg-black">
              <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                <CardTitle className="font-mono text-lg">
                  NETWORK ACTIVITY
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="activity">
                  <TabsList className="grid w-full grid-cols-2 bg-green-950/20">
                    <TabsTrigger
                      value="activity"
                      className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                    >
                      Activity
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                    >
                      Notifications
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="activity" className="p-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between rounded-md border border-green-900 bg-green-950/10 p-3">
                        <div className="flex items-center space-x-3">
                          <div className="rounded-full bg-green-950/50 p-2">
                            <Wifi className="h-4 w-4 text-green-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Outgoing Connection
                            </p>
                            <p className="text-xs text-green-600">
                              192.168.1.45:8080
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-green-600">Active</Badge>
                      </div>

                      <div className="flex items-center justify-between rounded-md border border-green-900 bg-green-950/10 p-3">
                        <div className="flex items-center space-x-3">
                          <div className="rounded-full bg-yellow-950/50 p-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Intrusion Attempt
                            </p>
                            <p className="text-xs text-green-600">
                              45.67.89.123 (Blocked)
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-yellow-600">Warning</Badge>
                      </div>

                      <div className="flex items-center justify-between rounded-md border border-green-900 bg-green-950/10 p-3">
                        <div className="flex items-center space-x-3">
                          <div className="rounded-full bg-green-950/50 p-2">
                            <Wifi className="h-4 w-4 text-green-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">Secure Tunnel</p>
                            <p className="text-xs text-green-600">
                              VPN Connection Active
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-green-600">Active</Badge>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="notifications" className="p-4">
                    <div className="space-y-2">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`rounded-md border p-3 ${
                            notification.read
                              ? "border-green-900/50 bg-green-950/5"
                              : "border-green-500/50 bg-green-950/20"
                          }`}
                        >
                          <p className="text-sm">{notification.message}</p>
                        </div>
                      ))}
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
