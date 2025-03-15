"use client";

import {
  AlertTriangle,
  Award,
  Clock,
  Cpu,
  Crosshair,
  LogOut,
  Server,
  Shield,
  Target,
  Terminal,
  User,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type Player = {
  id: number;
  username: string;
  level: number;
  securityLevel: number;
  lastActive: string;
  attackSuccess: number;
  defenseSuccess: number;
  isOnline: boolean;
};

type AttackLog = {
  id: number;
  attacker: string;
  defender: string;
  result: "success" | "failed";
  timestamp: string;
  reward: number;
};

export default function PvP() {
  const [cryptoBalance, setCryptoBalance] = useState(1250);
  const [searchQuery, setSearchQuery] = useState("");
  const [attackCooldown, setAttackCooldown] = useState(0);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [attackInProgress, setAttackInProgress] = useState(false);
  const [attackProgress, setAttackProgress] = useState(0);

  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      username: "DarkByte",
      level: 25,
      securityLevel: 85,
      lastActive: "2 minutes ago",
      attackSuccess: 92,
      defenseSuccess: 78,
      isOnline: true,
    },
    {
      id: 2,
      username: "CyberPhantom",
      level: 22,
      securityLevel: 80,
      lastActive: "5 minutes ago",
      attackSuccess: 88,
      defenseSuccess: 82,
      isOnline: true,
    },
    {
      id: 3,
      username: "NullPointer",
      level: 18,
      securityLevel: 75,
      lastActive: "10 minutes ago",
      attackSuccess: 85,
      defenseSuccess: 70,
      isOnline: false,
    },
    {
      id: 4,
      username: "HexHunter",
      level: 15,
      securityLevel: 65,
      lastActive: "1 hour ago",
      attackSuccess: 80,
      defenseSuccess: 60,
      isOnline: false,
    },
    {
      id: 5,
      username: "BinaryBaron",
      level: 12,
      securityLevel: 60,
      lastActive: "3 hours ago",
      attackSuccess: 75,
      defenseSuccess: 55,
      isOnline: false,
    },
    {
      id: 6,
      username: "CodeRed",
      level: 10,
      securityLevel: 50,
      lastActive: "1 day ago",
      attackSuccess: 70,
      defenseSuccess: 50,
      isOnline: false,
    },
  ]);

  const [attackLogs, setAttackLogs] = useState<AttackLog[]>([
    {
      id: 1,
      attacker: "Player213",
      defender: "CodeRed",
      result: "success",
      timestamp: "2 hours ago",
      reward: 250,
    },
    {
      id: 2,
      attacker: "DarkByte",
      defender: "Player213",
      result: "failed",
      timestamp: "5 hours ago",
      reward: 0,
    },
    {
      id: 3,
      attacker: "Player213",
      defender: "HexHunter",
      result: "failed",
      timestamp: "1 day ago",
      reward: 0,
    },
    {
      id: 4,
      attacker: "CyberPhantom",
      defender: "Player213",
      result: "failed",
      timestamp: "2 days ago",
      reward: 0,
    },
  ]);

  // Simulate cooldown timer
  useEffect(() => {
    if (attackCooldown > 0) {
      const timer = setTimeout(() => {
        setAttackCooldown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [attackCooldown]);

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.username
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const startAttack = (player: Player) => {
    if (attackCooldown > 0 || attackInProgress) return;

    setSelectedPlayer(player);
    setAttackInProgress(true);
    setAttackProgress(0);

    const interval = setInterval(() => {
      setAttackProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          completeAttack(player);
          return 100;
        }
        return prev + 5;
      });
    }, 200);
  };

  const completeAttack = (player: Player) => {
    // Calculate attack success chance based on security levels
    const successChance = Math.max(
      10,
      Math.min(90, 100 - player.securityLevel + 30)
    );
    const isSuccess = Math.random() * 100 < successChance;

    const reward = isSuccess ? Math.floor(player.level * 10) : 0;

    // Create new attack log
    const newLog: AttackLog = {
      id: attackLogs.length + 1,
      attacker: "Player213",
      defender: player.username,
      result: isSuccess ? "success" : "failed",
      timestamp: "Just now",
      reward: reward,
    };

    setAttackLogs((prev) => [newLog, ...prev]);

    // Update crypto balance if successful
    if (isSuccess) {
      setCryptoBalance((prev) => prev + reward);
    }

    // Set cooldown
    setAttackCooldown(60);
    setAttackInProgress(false);
    setSelectedPlayer(null);
  };

  const cancelAttack = () => {
    setAttackInProgress(false);
    setSelectedPlayer(null);
    setAttackProgress(0);
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
                  <Link href="/upgrades">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-500 hover:bg-green-950 hover:text-green-400"
                    >
                      <Cpu className="h-5 w-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Upgrades</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/security">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-green-500 hover:bg-green-950 hover:text-green-400"
                    >
                      <Shield className="h-5 w-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Security</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/pvp">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="bg-green-950/50 text-green-400"
                    >
                      <Crosshair className="h-5 w-5" />
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>PvP</p>
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
                      className="text-green-500 hover:bg-green-950 hover:text-green-400"
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
              <h1 className="font-mono text-2xl font-bold">PVP ARENA</h1>
              <p className="text-green-400/90">
                Attack other players' servers or defend your own
              </p>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border border-green-900 bg-green-950/20 px-4 py-2">
              <Target className="h-5 w-5 text-green-400" />
              <span className="font-mono font-bold">{cryptoBalance} HTC</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Player List */}
            <Card className="border-green-900 bg-black md:col-span-2">
              <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                  <CardTitle className="font-mono text-lg">
                    AVAILABLE TARGETS
                  </CardTitle>
                  <div className="relative">
                    <Input
                      placeholder="Search players..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full border-green-900 bg-black pl-9 text-green-400 focus-visible:ring-green-500 sm:w-auto"
                    />
                    <Target className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {filteredPlayers.map((player) => (
                    <div
                      key={player.id}
                      className="flex flex-col justify-between gap-4 rounded-lg border border-green-900 bg-green-950/10 p-4 sm:flex-row sm:items-center"
                    >
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-bold">{player.username}</h3>
                          {player.isOnline && (
                            <Badge className="bg-green-600">Online</Badge>
                          )}
                        </div>
                        <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
                          <div className="flex items-center space-x-2">
                            <User className="h-4 w-4 text-blue-400" />
                            <span>Level {player.level}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 text-green-400" />
                            <span>Security {player.securityLevel}%</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Zap className="h-4 w-4 text-yellow-400" />
                            <span>Attack {player.attackSuccess}%</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Shield className="h-4 w-4 text-blue-400" />
                            <span>Defense {player.defenseSuccess}%</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end">
                        <div className="text-xs text-green-600 mb-2">
                          Last active: {player.lastActive}
                        </div>
                        <Button
                          onClick={() => startAttack(player)}
                          className="bg-red-600 text-white hover:bg-red-500"
                          disabled={attackCooldown > 0 || attackInProgress}
                        >
                          <Crosshair className="mr-2 h-4 w-4" />
                          Attack Server
                        </Button>
                      </div>
                    </div>
                  ))}

                  {filteredPlayers.length === 0 && (
                    <div className="flex h-40 flex-col items-center justify-center rounded-lg border border-green-900 bg-black/80 p-6">
                      <p className="text-center text-green-400">
                        No players found matching your search criteria.
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Attack Status */}
            <Card className="border-green-900 bg-black md:col-span-1">
              <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                <CardTitle className="font-mono text-lg">
                  ATTACK STATUS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                {attackInProgress && selectedPlayer ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="font-mono text-lg font-bold">
                        Attacking {selectedPlayer.username}
                      </h3>
                      <p className="text-sm text-green-400">
                        Attempting to breach security systems...
                      </p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs">PROGRESS</span>
                        <span className="text-xs">{attackProgress}%</span>
                      </div>
                      <Progress
                        value={attackProgress}
                        className="h-2 bg-green-950"
                        indicatorclassname="bg-red-500"
                      />
                    </div>

                    <div className="rounded-lg border border-green-900 bg-green-950/10 p-3">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-green-400" />
                        <span className="text-sm">
                          Target Security: {selectedPlayer.securityLevel}%
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={cancelAttack}
                      className="w-full bg-red-900/50 text-red-400 hover:bg-red-900 hover:text-red-300"
                    >
                      Abort Attack
                    </Button>
                  </div>
                ) : attackCooldown > 0 ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="font-mono text-lg font-bold">
                        Attack Cooldown
                      </h3>
                      <p className="text-sm text-green-400">
                        You must wait before attacking again
                      </p>
                    </div>

                    <div className="flex items-center justify-center space-x-2 rounded-lg border border-green-900 bg-green-950/10 p-6 text-center">
                      <Clock className="h-6 w-6 text-yellow-500" />
                      <span className="font-mono text-2xl font-bold">
                        {attackCooldown}s
                      </span>
                    </div>

                    <p className="text-center text-sm text-green-600">
                      Your attack systems are recharging. Please wait.
                    </p>
                  </div>
                ) : (
                  <div className="flex h-full flex-col items-center justify-center space-y-4 py-8 text-center">
                    <div className="rounded-full bg-green-950/30 p-3">
                      <Crosshair className="h-8 w-8 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-mono text-lg font-bold">
                        No Active Attack
                      </h3>
                      <p className="text-sm text-green-600">
                        Select a player from the list to start an attack
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Attack Logs */}
            <Card className="border-green-900 bg-black md:col-span-3">
              <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                <CardTitle className="font-mono text-lg">ATTACK LOGS</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {attackLogs.map((log) => (
                    <div
                      key={log.id}
                      className="flex flex-col justify-between gap-4 rounded-lg border border-green-900 bg-green-950/10 p-4 sm:flex-row sm:items-center"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`rounded-full p-2 ${
                            log.result === "success"
                              ? "bg-green-950/50"
                              : "bg-red-950/50"
                          }`}
                        >
                          {log.result === "success" ? (
                            <Zap className="h-5 w-5 text-green-400" />
                          ) : (
                            <AlertTriangle className="h-5 w-5 text-red-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">
                            {log.attacker === "Player213"
                              ? "You"
                              : log.attacker}{" "}
                            attacked{" "}
                            {log.defender === "Player213"
                              ? "your"
                              : `${log.defender}'s`}{" "}
                            server
                          </p>
                          <div className="flex items-center space-x-2">
                            <Badge
                              className={
                                log.result === "success"
                                  ? "bg-green-600"
                                  : "bg-red-600"
                              }
                            >
                              {log.result}
                            </Badge>
                            <span className="text-xs text-green-600">
                              {log.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>

                      {log.result === "success" && (
                        <div className="font-mono font-bold text-green-400">
                          +{log.reward} HTC
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
