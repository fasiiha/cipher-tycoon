"use client";

import { Clock, Search, Server, TrendingUp, Trophy } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "../Navbar";

type Player = {
  id: number;
  username: string;
  rank: number;
  score: number;
  missions: number;
  successRate: number;
  isCurrentUser: boolean;
};

export default function Leaderboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [players, setPlayers] = useState<Player[]>([
    {
      id: 1,
      username: "DarkByte",
      rank: 1,
      score: 25750,
      missions: 124,
      successRate: 98,
      isCurrentUser: false,
    },
    {
      id: 2,
      username: "CyberPhantom",
      rank: 2,
      score: 24200,
      missions: 118,
      successRate: 95,
      isCurrentUser: false,
    },
    {
      id: 3,
      username: "NullPointer",
      rank: 3,
      score: 22800,
      missions: 110,
      successRate: 92,
      isCurrentUser: false,
    },
    {
      id: 4,
      username: "HexHunter",
      rank: 4,
      score: 21500,
      missions: 105,
      successRate: 90,
      isCurrentUser: false,
    },
    {
      id: 5,
      username: "BinaryBaron",
      rank: 5,
      score: 19800,
      missions: 98,
      successRate: 88,
      isCurrentUser: false,
    },
    {
      id: 6,
      username: "CodeRed",
      rank: 6,
      score: 18200,
      missions: 92,
      successRate: 86,
      isCurrentUser: false,
    },
    {
      id: 7,
      username: "ShadowScript",
      rank: 7,
      score: 17500,
      missions: 89,
      successRate: 85,
      isCurrentUser: false,
    },
    {
      id: 8,
      username: "QuantumBreaker",
      rank: 8,
      score: 16800,
      missions: 84,
      successRate: 82,
      isCurrentUser: false,
    },
    {
      id: 9,
      username: "CipherSage",
      rank: 9,
      score: 15200,
      missions: 78,
      successRate: 80,
      isCurrentUser: false,
    },
    {
      id: 10,
      username: "Player213",
      rank: 10,
      score: 14500,
      missions: 75,
      successRate: 78,
      isCurrentUser: true,
    },
    {
      id: 11,
      username: "ByteMaster",
      rank: 11,
      score: 13800,
      missions: 72,
      successRate: 76,
      isCurrentUser: false,
    },
    {
      id: 12,
      username: "HackSavvy",
      rank: 12,
      score: 12500,
      missions: 68,
      successRate: 74,
      isCurrentUser: false,
    },
  ]);

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.username
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="flex min-h-screen flex-col bg-black text-green-500">
      {/* Header/Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <h1 className="font-mono text-2xl font-bold">GLOBAL LEADERBOARD</h1>
            <p className="text-green-400/90">
              See how you rank against the best hackers in the world
            </p>
          </div>

          <div className="mb-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-green-600" />
              <Input
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-green-900 bg-black pl-9 text-green-400 focus-visible:ring-green-500"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {/* Leaderboard Table */}
            <Card className="col-span-3 border-green-900 bg-black">
              <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                <CardTitle className="font-mono text-lg">TOP HACKERS</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="score">
                  <TabsList className="w-full bg-green-950/20">
                    <TabsTrigger
                      value="score"
                      className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                    >
                      <TrendingUp className="mr-2 h-4 w-4" />
                      By Score
                    </TabsTrigger>
                    <TabsTrigger
                      value="missions"
                      className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                    >
                      <Server className="mr-2 h-4 w-4" />
                      By Missions
                    </TabsTrigger>
                    <TabsTrigger
                      value="weekly"
                      className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      This Week
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="score" className="p-0">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-green-950/30 text-xs uppercase">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Rank
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Score
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Missions
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Success Rate
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPlayers.map((player) => (
                            <tr
                              key={player.id}
                              className={`border-b border-green-900/30 ${
                                player.isCurrentUser
                                  ? "bg-green-950/40"
                                  : "hover:bg-green-950/20"
                              }`}
                            >
                              <td className="px-6 py-4">
                                {player.rank <= 3 ? (
                                  <div className="flex items-center">
                                    <Trophy
                                      className={`mr-1 h-4 w-4 ${
                                        player.rank === 1
                                          ? "text-yellow-500"
                                          : player.rank === 2
                                          ? "text-gray-400"
                                          : "text-amber-700"
                                      }`}
                                    />
                                    {player.rank}
                                  </div>
                                ) : (
                                  player.rank
                                )}
                              </td>
                              <td className="px-6 py-4 font-medium">
                                {player.username}
                                {player.isCurrentUser && (
                                  <Badge className="ml-2 bg-green-600">
                                    You
                                  </Badge>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                {player.score.toLocaleString()}
                              </td>
                              <td className="px-6 py-4">{player.missions}</td>
                              <td className="px-6 py-4">
                                {player.successRate}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="missions" className="p-0">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-green-950/30 text-xs uppercase">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Rank
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Missions
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Score
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Success Rate
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...filteredPlayers]
                            .sort((a, b) => b.missions - a.missions)
                            .map((player, index) => (
                              <tr
                                key={player.id}
                                className={`border-b border-green-900/30 ${
                                  player.isCurrentUser
                                    ? "bg-green-950/40"
                                    : "hover:bg-green-950/20"
                                }`}
                              >
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4 font-medium">
                                  {player.username}
                                  {player.isCurrentUser && (
                                    <Badge className="ml-2 bg-green-600">
                                      You
                                    </Badge>
                                  )}
                                </td>
                                <td className="px-6 py-4">{player.missions}</td>
                                <td className="px-6 py-4">
                                  {player.score.toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                  {player.successRate}%
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>

                  <TabsContent value="weekly" className="p-0">
                    <div className="relative overflow-x-auto">
                      <table className="w-full text-left text-sm">
                        <thead className="bg-green-950/30 text-xs uppercase">
                          <tr>
                            <th scope="col" className="px-6 py-3">
                              Rank
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Username
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Weekly Score
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Weekly Missions
                            </th>
                            <th scope="col" className="px-6 py-3">
                              Change
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[...filteredPlayers]
                            .sort(() => Math.random() - 0.5) // Randomize for weekly ranking example
                            .map((player, index) => (
                              <tr
                                key={player.id}
                                className={`border-b border-green-900/30 ${
                                  player.isCurrentUser
                                    ? "bg-green-950/40"
                                    : "hover:bg-green-950/20"
                                }`}
                              >
                                <td className="px-6 py-4">{index + 1}</td>
                                <td className="px-6 py-4 font-medium">
                                  {player.username}
                                  {player.isCurrentUser && (
                                    <Badge className="ml-2 bg-green-600">
                                      You
                                    </Badge>
                                  )}
                                </td>
                                <td className="px-6 py-4">
                                  {Math.floor(
                                    player.score / 10
                                  ).toLocaleString()}
                                </td>
                                <td className="px-6 py-4">
                                  {Math.floor(player.missions / 10)}
                                </td>
                                <td className="px-6 py-4">
                                  <div
                                    className={`flex items-center ${
                                      Math.random() > 0.5
                                        ? "text-green-500"
                                        : "text-red-500"
                                    }`}
                                  >
                                    {Math.random() > 0.5 ? (
                                      <>
                                        <TrendingUp className="mr-1 h-4 w-4" />+
                                        {Math.floor(Math.random() * 5)}
                                      </>
                                    ) : (
                                      <>
                                        <TrendingUp className="mr-1 h-4 w-4 rotate-180" />
                                        -{Math.floor(Math.random() * 5)}
                                      </>
                                    )}
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <div className="space-y-6">
              <Card className="border-green-900 bg-black">
                <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                  <CardTitle className="font-mono text-lg">
                    YOUR STATS
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-400">
                        Current Rank
                      </span>
                      <span className="font-mono text-lg font-bold">10</span>
                    </div>
                    <Separator className="bg-green-900/50" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-400">
                        Total Score
                      </span>
                      <span className="font-mono text-lg font-bold">
                        14,500
                      </span>
                    </div>
                    <Separator className="bg-green-900/50" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-400">
                        Missions Completed
                      </span>
                      <span className="font-mono text-lg font-bold">75</span>
                    </div>
                    <Separator className="bg-green-900/50" />
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-400">
                        Success Rate
                      </span>
                      <span className="font-mono text-lg font-bold">78%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-900 bg-black">
                <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                  <CardTitle className="font-mono text-lg">
                    NEXT MILESTONE
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="rounded-lg border border-green-900/50 bg-green-950/20 p-4 text-center">
                      <div className="mb-2 text-sm text-green-400">
                        Top 5 Hacker
                      </div>
                      <div className="font-mono text-lg font-bold">
                        5,300 points to go
                      </div>
                    </div>

                    <Button className="w-full bg-green-600 text-black hover:bg-green-500">
                      View All Achievements
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
