"use client";

import type React from "react";

import {
  ChevronRight,
  Cpu,
  Database,
  Lock,
  Shield,
  Wifi,
  Zap,
} from "lucide-react";
import { useState } from "react";

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
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "../Navbar";

type Upgrade = {
  id: number;
  name: string;
  description: string;
  cost: number;
  level: number;
  maxLevel: number;
  icon: React.ReactNode;
  category: "hardware" | "software" | "security" | "network";
  owned: boolean;
};

export default function Upgrades() {
  const [cryptoBalance, setCryptoBalance] = useState(1250);
  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    {
      id: 1,
      name: "CPU Upgrade",
      description: "Increases processing speed for all hacking operations.",
      cost: 500,
      level: 2,
      maxLevel: 5,
      icon: <Cpu className="h-5 w-5 text-blue-400" />,
      category: "hardware",
      owned: true,
    },
    {
      id: 2,
      name: "RAM Expansion",
      description: "Allows running more simultaneous processes.",
      cost: 350,
      level: 1,
      maxLevel: 5,
      icon: <Database className="h-5 w-5 text-blue-400" />,
      category: "hardware",
      owned: true,
    },
    {
      id: 3,
      name: "Quantum Processor",
      description:
        "Revolutionary processing unit that drastically reduces hacking time.",
      cost: 2500,
      level: 0,
      maxLevel: 3,
      icon: <Zap className="h-5 w-5 text-purple-400" />,
      category: "hardware",
      owned: false,
    },
    {
      id: 4,
      name: "Advanced Firewall",
      description: "Provides enhanced protection against server attacks.",
      cost: 800,
      level: 1,
      maxLevel: 5,
      icon: <Shield className="h-5 w-5 text-green-400" />,
      category: "security",
      owned: true,
    },
    {
      id: 5,
      name: "Encryption Suite",
      description:
        "Military-grade encryption for your data and communications.",
      cost: 1200,
      level: 0,
      maxLevel: 3,
      icon: <Lock className="h-5 w-5 text-green-400" />,
      category: "security",
      owned: false,
    },
    {
      id: 6,
      name: "Network Booster",
      description: "Increases connection speed and stability.",
      cost: 600,
      level: 1,
      maxLevel: 4,
      icon: <Wifi className="h-5 w-5 text-yellow-400" />,
      category: "network",
      owned: true,
    },
    {
      id: 7,
      name: "Stealth Module",
      description:
        "Reduces the chance of being detected during hacking operations.",
      cost: 1500,
      level: 0,
      maxLevel: 3,
      icon: <Shield className="h-5 w-5 text-purple-400" />,
      category: "software",
      owned: false,
    },
    {
      id: 8,
      name: "Crypto Miner",
      description: "Generates a small amount of HTC over time.",
      cost: 2000,
      level: 0,
      maxLevel: 5,
      icon: <Database className="h-5 w-5 text-yellow-400" />,
      category: "hardware",
      owned: false,
    },
  ]);

  const purchaseUpgrade = (upgradeId: number) => {
    setUpgrades((prevUpgrades) =>
      prevUpgrades.map((upgrade) => {
        if (upgrade.id === upgradeId) {
          if (!upgrade.owned) {
            // Purchase new upgrade
            if (cryptoBalance >= upgrade.cost) {
              setCryptoBalance((prev) => prev - upgrade.cost);
              return { ...upgrade, owned: true, level: 1 };
            }
          } else if (upgrade.level < upgrade.maxLevel) {
            // Upgrade existing item
            const upgradeCost = Math.round(
              upgrade.cost * (1 + upgrade.level * 0.5)
            );
            if (cryptoBalance >= upgradeCost) {
              setCryptoBalance((prev) => prev - upgradeCost);
              return { ...upgrade, level: upgrade.level + 1 };
            }
          }
        }
        return upgrade;
      })
    );
  };

  const getUpgradeCost = (upgrade: Upgrade) => {
    if (!upgrade.owned) return upgrade.cost;
    return Math.round(upgrade.cost * (1 + upgrade.level * 0.5));
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-green-500">
      {/* Header/Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h1 className="font-mono text-2xl font-bold">SYSTEM UPGRADES</h1>
              <p className="text-green-400/90">
                Upgrade your hardware and software to improve your hacking
                capabilities
              </p>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border border-green-900 bg-green-950/20 px-4 py-2">
              <Cpu className="h-5 w-5 text-green-400" />
              <span className="font-mono font-bold">{cryptoBalance} HTC</span>
            </div>
          </div>

          <Card className="border-green-900 bg-black">
            <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
              <CardTitle className="font-mono text-lg">
                AVAILABLE UPGRADES
              </CardTitle>
              <CardDescription className="text-green-600">
                Enhance your system with powerful upgrades
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs defaultValue="all">
                <TabsList className="w-full bg-green-950/20 sm:w-auto">
                  <TabsTrigger
                    value="all"
                    className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                  >
                    All Upgrades
                  </TabsTrigger>
                  <TabsTrigger
                    value="hardware"
                    className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                  >
                    Hardware
                  </TabsTrigger>
                  <TabsTrigger
                    value="software"
                    className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                  >
                    Software
                  </TabsTrigger>
                  <TabsTrigger
                    value="security"
                    className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                  >
                    Security
                  </TabsTrigger>
                  <TabsTrigger
                    value="network"
                    className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                  >
                    Network
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="p-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {upgrades.map((upgrade) => (
                      <UpgradeCard
                        key={upgrade.id}
                        upgrade={upgrade}
                        onPurchase={purchaseUpgrade}
                        getUpgradeCost={getUpgradeCost}
                        cryptoBalance={cryptoBalance}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="hardware" className="p-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {upgrades
                      .filter((upgrade) => upgrade.category === "hardware")
                      .map((upgrade) => (
                        <UpgradeCard
                          key={upgrade.id}
                          upgrade={upgrade}
                          onPurchase={purchaseUpgrade}
                          getUpgradeCost={getUpgradeCost}
                          cryptoBalance={cryptoBalance}
                        />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="software" className="p-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {upgrades
                      .filter((upgrade) => upgrade.category === "software")
                      .map((upgrade) => (
                        <UpgradeCard
                          key={upgrade.id}
                          upgrade={upgrade}
                          onPurchase={purchaseUpgrade}
                          getUpgradeCost={getUpgradeCost}
                          cryptoBalance={cryptoBalance}
                        />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="security" className="p-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {upgrades
                      .filter((upgrade) => upgrade.category === "security")
                      .map((upgrade) => (
                        <UpgradeCard
                          key={upgrade.id}
                          upgrade={upgrade}
                          onPurchase={purchaseUpgrade}
                          getUpgradeCost={getUpgradeCost}
                          cryptoBalance={cryptoBalance}
                        />
                      ))}
                  </div>
                </TabsContent>

                <TabsContent value="network" className="p-4">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {upgrades
                      .filter((upgrade) => upgrade.category === "network")
                      .map((upgrade) => (
                        <UpgradeCard
                          key={upgrade.id}
                          upgrade={upgrade}
                          onPurchase={purchaseUpgrade}
                          getUpgradeCost={getUpgradeCost}
                          cryptoBalance={cryptoBalance}
                        />
                      ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Card className="border-green-900 bg-black">
              <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                <CardTitle className="font-mono text-lg">
                  SYSTEM PERFORMANCE
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Cpu className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium">
                          Processing Power
                        </span>
                      </div>
                      <span className="text-sm">Level 2</span>
                    </div>
                    <Progress
                      value={40}
                      className="h-2 bg-green-950"
                      indicatorclassname="bg-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Database className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium">
                          Memory Capacity
                        </span>
                      </div>
                      <span className="text-sm">Level 1</span>
                    </div>
                    <Progress
                      value={20}
                      className="h-2 bg-green-950"
                      indicatorclassname="bg-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="h-4 w-4 text-green-400" />
                        <span className="text-sm font-medium">
                          Security Level
                        </span>
                      </div>
                      <span className="text-sm">Level 1</span>
                    </div>
                    <Progress
                      value={20}
                      className="h-2 bg-green-950"
                      indicatorclassname="bg-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Wifi className="h-4 w-4 text-yellow-400" />
                        <span className="text-sm font-medium">
                          Network Speed
                        </span>
                      </div>
                      <span className="text-sm">Level 1</span>
                    </div>
                    <Progress
                      value={20}
                      className="h-2 bg-green-950"
                      indicatorclassname="bg-yellow-500"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-900 bg-black">
              <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                <CardTitle className="font-mono text-lg">
                  UPGRADE BENEFITS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  <div className="rounded-lg border border-green-900 bg-green-950/10 p-3">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-yellow-400" />
                      <span className="font-medium">Faster Hacking</span>
                    </div>
                    <p className="mt-1 text-sm text-green-400">
                      Hardware upgrades reduce the time required to complete
                      hacking missions.
                    </p>
                  </div>

                  <div className="rounded-lg border border-green-900 bg-green-950/10 p-3">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-400" />
                      <span className="font-medium">Better Defense</span>
                    </div>
                    <p className="mt-1 text-sm text-green-400">
                      Security upgrades protect your server from attacks by
                      other players.
                    </p>
                  </div>

                  <div className="rounded-lg border border-green-900 bg-green-950/10 p-3">
                    <div className="flex items-center space-x-2">
                      <Database className="h-5 w-5 text-blue-400" />
                      <span className="font-medium">More Resources</span>
                    </div>
                    <p className="mt-1 text-sm text-green-400">
                      Memory upgrades allow you to run more simultaneous
                      processes and missions.
                    </p>
                  </div>

                  <div className="rounded-lg border border-green-900 bg-green-950/10 p-3">
                    <div className="flex items-center space-x-2">
                      <Cpu className="h-5 w-5 text-purple-400" />
                      <span className="font-medium">Advanced Capabilities</span>
                    </div>
                    <p className="mt-1 text-sm text-green-400">
                      Premium upgrades unlock special abilities and access to
                      high-level missions.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

interface UpgradeCardProps {
  upgrade: Upgrade;
  onPurchase: (id: number) => void;
  getUpgradeCost: (upgrade: Upgrade) => number;
  cryptoBalance: number;
}

function UpgradeCard({
  upgrade,
  onPurchase,
  getUpgradeCost,
  cryptoBalance,
}: UpgradeCardProps) {
  const cost = getUpgradeCost(upgrade);
  const canAfford = cryptoBalance >= cost;
  const isMaxLevel = upgrade.owned && upgrade.level >= upgrade.maxLevel;

  return (
    <Card className="border-green-900 bg-black overflow-hidden">
      <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className={`rounded-full p-2 ${
                upgrade.category === "hardware"
                  ? "bg-blue-950/50"
                  : upgrade.category === "software"
                  ? "bg-purple-950/50"
                  : upgrade.category === "security"
                  ? "bg-green-950/50"
                  : "bg-yellow-950/50"
              }`}
            >
              {upgrade.icon}
            </div>
            <CardTitle className="font-mono text-base">
              {upgrade.name}
            </CardTitle>
          </div>
          {upgrade.owned && (
            <Badge className="bg-green-600">Level {upgrade.level}</Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-green-400">{upgrade.description}</p>

        {upgrade.owned && !isMaxLevel && (
          <div className="mt-2 space-y-1">
            <div className="flex items-center justify-between text-xs">
              <span>Level {upgrade.level}</span>
              <span>Level {upgrade.maxLevel}</span>
            </div>
            <Progress
              value={(upgrade.level / upgrade.maxLevel) * 100}
              className="h-1 bg-green-950"
              indicatorclassname={`${
                upgrade.category === "hardware"
                  ? "bg-blue-500"
                  : upgrade.category === "software"
                  ? "bg-purple-500"
                  : upgrade.category === "security"
                  ? "bg-green-500"
                  : "bg-yellow-500"
              }`}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="border-t border-green-900/50 bg-green-950/10 p-4">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center space-x-1 text-green-400">
            <span className="text-sm font-bold">{cost}</span>
            <span className="text-xs">HTC</span>
          </div>

          {isMaxLevel ? (
            <Badge className="bg-blue-600">MAX LEVEL</Badge>
          ) : (
            <Button
              onClick={() => onPurchase(upgrade.id)}
              disabled={!canAfford}
              className={
                canAfford
                  ? "bg-green-600 text-black hover:bg-green-500"
                  : "bg-green-900/50 text-green-700 cursor-not-allowed"
              }
            >
              {upgrade.owned ? "Upgrade" : "Purchase"}
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
