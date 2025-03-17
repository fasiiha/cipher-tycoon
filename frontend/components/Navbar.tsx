"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Award,
  Cpu,
  Crosshair,
  LogOut,
  Server,
  Shield,
  Terminal,
  User,
} from "lucide-react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <header className="border-b border-green-900/50 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/50">
      <div className="flex h-14 items-center px-4">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Terminal className="h-6 w-6 text-green-500" />
            <span className="font-mono text-xl font-bold">HACKER TYCOON</span>
          </div>
        </Link>
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
  );
};

export default Navbar;
