"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Terminal } from "lucide-react";
import Link from "next/link";

const LandingNavbar: React.FC = () => {
  return (
    <header className="border-b border-green-900/50 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/50">
      <div className="container flex h-14 items-center">
        <Link href="/">
          <div className="flex items-center space-x-2">
            <Terminal className="h-6 w-6 text-green-500" />
            <span className="font-mono text-xl font-bold">HACKER TYCOON</span>
          </div>
        </Link>
        <nav className="ml-auto flex items-center space-x-4">
          <Link
            href="/about"
            className="text-sm font-medium hover:text-green-400"
          >
            About
          </Link>
          <Link
            href="/features"
            className="text-sm font-medium hover:text-green-400"
          >
            Features
          </Link>
          <Link
            href="/community"
            className="text-sm font-medium hover:text-green-400"
          >
            Community
          </Link>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="border-green-900 bg-green-950/30 text-green-400 hover:bg-green-950 hover:text-green-300"
            >
              Play Now
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default LandingNavbar;
