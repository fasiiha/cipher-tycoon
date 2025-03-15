"use client";

import {
  AlertTriangle,
  Award,
  Cpu,
  Eye,
  LogOut,
  RefreshCw,
  Server,
  Shield,
  Terminal,
  User,
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

type SecurityLog = {
  id: number;
  type: "intrusion" | "scan" | "defense" | "system";
  message: string;
  timestamp: string;
  severity: "low" | "medium" | "high" | "critical";
  resolved: boolean;
};

type SecuritySystem = {
  id: number;
  name: string;
  description: string;
  status: "active" | "inactive" | "compromised";
  level: number;
  effectiveness: number;
};

export default function Security() {
  const [cryptoBalance, setCryptoBalance] = useState(1250);
  const [securityLevel, setSecurityLevel] = useState(76);
  const [securityLogs, setSecurityLogs] = useState<SecurityLog[]>([
    {
      id: 1,
      type: "intrusion",
      message: "Intrusion attempt detected from IP 45.67.89.123",
      timestamp: "10 minutes ago",
      severity: "high",
      resolved: true,
    },
    {
      id: 2,
      type: "scan",
      message: "Port scan detected from multiple IPs",
      timestamp: "1 hour ago",
      severity: "medium",
      resolved: true,
    },
    {
      id: 3,
      type: "defense",
      message: "Firewall blocked suspicious connection",
      timestamp: "2 hours ago",
      severity: "low",
      resolved: true,
    },
    {
      id: 4,
      type: "system",
      message: "Security system updated to version 2.1.4",
      timestamp: "1 day ago",
      severity: "low",
      resolved: true,
    },
    {
      id: 5,
      type: "intrusion",
      message: "Brute force attack on authentication system",
      timestamp: "2 days ago",
      severity: "critical",
      resolved: true,
    },
  ]);

  const [securitySystems, setSecuritySystems] = useState<SecuritySystem[]>([
    {
      id: 1,
      name: "Advanced Firewall",
      description: "Blocks unauthorized access attempts to your system.",
      status: "active",
      level: 2,
      effectiveness: 85,
    },
    {
      id: 2,
      name: "Intrusion Detection",
      description: "Monitors network traffic for suspicious activity.",
      status: "active",
      level: 1,
      effectiveness: 60,
    },
    {
      id: 3,
      name: "Encryption System",
      description: "Encrypts your data to prevent unauthorized access.",
      status: "active",
      level: 1,
      effectiveness: 70,
    },
    {
      id: 4,
      name: "Anti-Virus",
      description: "Protects against malware and viruses.",
      status: "active",
      level: 2,
      effectiveness: 90,
    },
    {
      id: 5,
      name: "Honeypot System",
      description: "Decoy system to trap and analyze attack methods.",
      status: "inactive",
      level: 0,
      effectiveness: 0,
    },
  ]);

  const [vulnerabilities, setVulnerabilities] = useState([
    {
      id: 1,
      name: "Outdated Authentication Protocol",
      risk: "high",
      status: "unresolved",
      fixCost: 350,
    },
    {
      id: 2,
      name: "Weak Encryption on Database",
      risk: "medium",
      status: "unresolved",
      fixCost: 250,
    },
    {
      id: 3,
      name: "Open Port 8080",
      risk: "low",
      status: "resolved",
      fixCost: 0,
    },
  ]);

  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const runSecurityScan = () => {
    setIsScanning(true);
    setScanProgress(0);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);

          // Add a new security log
          const newLog: SecurityLog = {
            id: securityLogs.length + 1,
            type: "scan",
            message: "Security scan completed. 2 vulnerabilities found.",
            timestamp: "Just now",
            severity: "medium",
            resolved: false,
          };

          setSecurityLogs((prev) => [newLog, ...prev]);

          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const fixVulnerability = (id: number) => {
    const vulnerability = vulnerabilities.find((v) => v.id === id);

    if (vulnerability && vulnerability.status === "unresolved") {
      if (cryptoBalance >= vulnerability.fixCost) {
        setCryptoBalance((prev) => prev - vulnerability.fixCost);

        setVulnerabilities((prev) =>
          prev.map((v) => (v.id === id ? { ...v, status: "resolved" } : v))
        );

        // Add a security log
        const newLog: SecurityLog = {
          id: securityLogs.length + 1,
          type: "system",
          message: `Vulnerability "${vulnerability.name}" has been fixed.`,
          timestamp: "Just now",
          severity: "low",
          resolved: true,
        };

        setSecurityLogs((prev) => [newLog, ...prev]);

        // Increase security level
        setSecurityLevel((prev) =>
          Math.min(
            100,
            prev +
              (vulnerability.risk === "high"
                ? 10
                : vulnerability.risk === "medium"
                ? 5
                : 2)
          )
        );
      }
    }
  };

  const upgradeSecuritySystem = (id: number) => {
    const system = securitySystems.find((s) => s.id === id);

    if (system) {
      const upgradeCost =
        system.status === "inactive" ? 500 : 300 * (system.level + 1);

      if (cryptoBalance >= upgradeCost) {
        setCryptoBalance((prev) => prev - upgradeCost);

        setSecuritySystems((prev) =>
          prev.map((s) =>
            s.id === id
              ? {
                  ...s,
                  status: "active",
                  level: s.status === "inactive" ? 1 : s.level + 1,
                  effectiveness:
                    s.status === "inactive"
                      ? 50
                      : Math.min(100, s.effectiveness + 15),
                }
              : s
          )
        );

        // Add a security log
        const newLog: SecurityLog = {
          id: securityLogs.length + 1,
          type: "system",
          message: `Security system "${system.name}" has been ${
            system.status === "inactive"
              ? "activated"
              : "upgraded to level " + (system.level + 1)
          }.`,
          timestamp: "Just now",
          severity: "low",
          resolved: true,
        };

        setSecurityLogs((prev) => [newLog, ...prev]);

        // Increase security level
        setSecurityLevel((prev) => Math.min(100, prev + 5));
      }
    }
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
                      className="bg-green-950/50 text-green-400"
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
              <h1 className="font-mono text-2xl font-bold">SECURITY CENTER</h1>
              <p className="text-green-400/90">
                Protect your system from attacks and monitor security threats
              </p>
            </div>
            <div className="flex items-center space-x-2 rounded-lg border border-green-900 bg-green-950/20 px-4 py-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="font-mono font-bold">{cryptoBalance} HTC</span>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {/* Security Status */}
            <Card className="border-green-900 bg-black md:col-span-1">
              <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                <CardTitle className="font-mono text-lg">
                  SECURITY STATUS
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="relative mx-auto h-32 w-32">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="font-mono text-2xl font-bold">
                          {securityLevel}%
                        </div>
                      </div>
                      <svg className="h-full w-full" viewBox="0 0 100 100">
                        <circle
                          className="stroke-green-950"
                          strokeWidth="8"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                        <circle
                          className={`${
                            securityLevel >= 80
                              ? "stroke-green-500"
                              : securityLevel >= 50
                              ? "stroke-yellow-500"
                              : "stroke-red-500"
                          }`}
                          strokeWidth="8"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${
                            2 * Math.PI * 40 * (1 - securityLevel / 100)
                          }`}
                          strokeLinecap="round"
                          transform="rotate(-90 50 50)"
                        />
                      </svg>
                    </div>
                    <div className="mt-2 text-sm text-green-400">
                      {securityLevel >= 80
                        ? "Your system is well protected"
                        : securityLevel >= 50
                        ? "Your system has adequate protection"
                        : "Your system is vulnerable to attacks"}
                    </div>
                  </div>

                  <Button
                    onClick={runSecurityScan}
                    disabled={isScanning}
                    className="w-full bg-green-600 text-black hover:bg-green-500"
                  >
                    {isScanning ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Scanning... {scanProgress}%
                      </>
                    ) : (
                      <>
                        <Eye className="mr-2 h-4 w-4" />
                        Run Security Scan
                      </>
                    )}
                  </Button>

                  {isScanning && (
                    <Progress
                      value={scanProgress}
                      className="h-1 bg-green-950"
                      indicatorclassname="bg-green-500"
                    />
                  )}

                  <div className="space-y-2">
                    <h3 className="font-mono text-sm font-bold">
                      ACTIVE THREATS
                    </h3>
                    <div className="rounded-lg border border-green-900 bg-green-950/10 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm">Vulnerabilities</span>
                        </div>
                        <Badge
                          className={
                            vulnerabilities.filter(
                              (v) => v.status === "unresolved"
                            ).length > 0
                              ? "bg-yellow-600"
                              : "bg-green-600"
                          }
                        >
                          {
                            vulnerabilities.filter(
                              (v) => v.status === "unresolved"
                            ).length
                          }
                        </Badge>
                      </div>
                    </div>

                    <div className="rounded-lg border border-green-900 bg-green-950/10 p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span className="text-sm">
                            Intrusion Attempts (24h)
                          </span>
                        </div>
                        <Badge className="bg-red-600">3</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Main Content */}
            <Card className="border-green-900 bg-black md:col-span-2">
              <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                <CardTitle className="font-mono text-lg">
                  SECURITY MANAGEMENT
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="systems">
                  <TabsList className="w-full bg-green-950/20">
                    <TabsTrigger
                      value="systems"
                      className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Security Systems
                    </TabsTrigger>
                    <TabsTrigger
                      value="vulnerabilities"
                      className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                    >
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Vulnerabilities
                    </TabsTrigger>
                    <TabsTrigger
                      value="logs"
                      className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                    >
                      <Terminal className="mr-2 h-4 w-4" />
                      Security Logs
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="systems" className="p-4">
                    <div className="space-y-4">
                      {securitySystems.map((system) => (
                        <div
                          key={system.id}
                          className={`rounded-lg border p-4 ${
                            system.status === "active"
                              ? "border-green-900 bg-green-950/10"
                              : system.status === "inactive"
                              ? "border-yellow-900/50 bg-yellow-950/10"
                              : "border-red-900/50 bg-red-950/10"
                          }`}
                        >
                          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-bold">{system.name}</h3>
                                <Badge
                                  className={
                                    system.status === "active"
                                      ? "bg-green-600"
                                      : system.status === "inactive"
                                      ? "bg-yellow-600"
                                      : "bg-red-600"
                                  }
                                >
                                  {system.status}
                                </Badge>
                              </div>
                              <p className="mt-1 text-sm text-green-400">
                                {system.description}
                              </p>

                              {system.status === "active" && (
                                <div className="mt-2 space-y-1">
                                  <div className="flex items-center justify-between text-xs">
                                    <span>Effectiveness</span>
                                    <span>{system.effectiveness}%</span>
                                  </div>
                                  <Progress
                                    value={system.effectiveness}
                                    className="h-1 bg-green-950"
                                    indicatorclassname="bg-green-500"
                                  />
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col items-end">
                              {system.status === "active" &&
                                system.level < 5 && (
                                  <div className="text-right text-xs text-green-600 mb-2">
                                    Level {system.level} / 5
                                  </div>
                                )}

                              <Button
                                onClick={() => upgradeSecuritySystem(system.id)}
                                className="bg-green-600 text-black hover:bg-green-500"
                                disabled={
                                  system.level >= 5 &&
                                  system.status === "active"
                                }
                              >
                                {system.status === "inactive"
                                  ? "Activate"
                                  : system.level >= 5
                                  ? "Max Level"
                                  : "Upgrade"}
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="vulnerabilities" className="p-4">
                    <div className="space-y-4">
                      {vulnerabilities.map((vulnerability) => (
                        <div
                          key={vulnerability.id}
                          className={`rounded-lg border p-4 ${
                            vulnerability.status === "resolved"
                              ? "border-green-900 bg-green-950/10"
                              : vulnerability.risk === "high"
                              ? "border-red-900/50 bg-red-950/10"
                              : vulnerability.risk === "medium"
                              ? "border-yellow-900/50 bg-yellow-950/10"
                              : "border-blue-900/50 bg-blue-950/10"
                          }`}
                        >
                          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                              <div className="flex items-center space-x-2">
                                <h3 className="font-bold">
                                  {vulnerability.name}
                                </h3>
                                <Badge
                                  className={
                                    vulnerability.status === "resolved"
                                      ? "bg-green-600"
                                      : vulnerability.risk === "high"
                                      ? "bg-red-600"
                                      : vulnerability.risk === "medium"
                                      ? "bg-yellow-600"
                                      : "bg-blue-600"
                                  }
                                >
                                  {vulnerability.status === "resolved"
                                    ? "Fixed"
                                    : vulnerability.risk}
                                </Badge>
                              </div>

                              {vulnerability.status === "unresolved" && (
                                <p className="mt-1 text-sm text-green-400">
                                  This vulnerability puts your system at risk.
                                  Fix it to improve your security.
                                </p>
                              )}
                            </div>

                            <div>
                              {vulnerability.status === "unresolved" ? (
                                <div className="flex flex-col items-end">
                                  <div className="mb-2 text-right text-xs text-green-600">
                                    Cost to fix: {vulnerability.fixCost} HTC
                                  </div>
                                  <Button
                                    onClick={() =>
                                      fixVulnerability(vulnerability.id)
                                    }
                                    className="bg-green-600 text-black hover:bg-green-500"
                                    disabled={
                                      cryptoBalance < vulnerability.fixCost
                                    }
                                  >
                                    Fix Now
                                  </Button>
                                </div>
                              ) : (
                                <div className="text-right text-sm text-green-400">
                                  Fixed
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="logs" className="p-4">
                    <div className="space-y-4">
                      {securityLogs.map((log) => (
                        <div
                          key={log.id}
                          className="flex items-center justify-between rounded-lg border border-green-900 bg-green-950/10 p-4"
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`rounded-full p-2 ${
                                log.type === "intrusion"
                                  ? "bg-red-950/50"
                                  : log.type === "scan"
                                  ? "bg-blue-950/50"
                                  : log.type === "defense"
                                  ? "bg-green-950/50"
                                  : "bg-yellow-950/50"
                              }`}
                            >
                              {log.type === "intrusion" ? (
                                <AlertTriangle className="h-5 w-5 text-red-400" />
                              ) : log.type === "scan" ? (
                                <Eye className="h-5 w-5 text-blue-400" />
                              ) : log.type === "defense" ? (
                                <Shield className="h-5 w-5 text-green-400" />
                              ) : (
                                <Terminal className="h-5 w-5 text-yellow-400" />
                              )}
                            </div>
                            <div>
                              <p className="font-medium">{log.message}</p>
                              <div className="flex items-center space-x-2">
                                <Badge
                                  className={
                                    log.severity === "critical"
                                      ? "bg-red-600"
                                      : log.severity === "high"
                                      ? "bg-orange-600"
                                      : log.severity === "medium"
                                      ? "bg-yellow-600"
                                      : "bg-blue-600"
                                  }
                                >
                                  {log.severity}
                                </Badge>
                                <span className="text-xs text-green-600">
                                  {log.timestamp}
                                </span>
                              </div>
                            </div>
                          </div>

                          {log.resolved && (
                            <Badge
                              variant="outline"
                              className="border-green-600 text-green-500"
                            >
                              Resolved
                            </Badge>
                          )}
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
