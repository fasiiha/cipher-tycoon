import { Button } from "@/components/ui/button";
import { ChevronRight, Server, Shield, Terminal, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-green-500">
      <header className="border-b border-green-900/50 bg-black/90 backdrop-blur supports-[backdrop-filter]:bg-black/50">
        <div className="container flex h-14 items-center">
          <div className="flex items-center space-x-2">
            <Terminal className="h-6 w-6 text-green-500" />
            <span className="font-mono text-xl font-bold">HACKER TYCOON</span>
          </div>

          <nav className="ml-auto flex items-center space-x-4">
            <Link href="#" className="text-sm font-medium hover:text-green-400">
              About
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-green-400">
              Features
            </Link>
            <Link href="#" className="text-sm font-medium hover:text-green-400">
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

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-green-900/20 via-black to-black"></div>

          <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="mx-auto max-w-3xl space-y-8">
              <h1 className="font-mono text-4xl font-bold tracking-tight text-green-500 sm:text-6xl">
                HACKER TYCOON
                <span className="mt-2 block text-2xl font-medium text-green-400 sm:text-3xl">
                  THE DARK WEB CHALLENGE
                </span>
              </h1>

              <p className="text-lg text-green-400/90">
                Build your hacking empire, complete missions, upgrade your
                tools, and compete with players worldwide in this immersive
                hacking simulation game.
              </p>

              <div className="flex flex-col items-center justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link href="/dashboard">
                  <Button className="w-full bg-green-600 text-black hover:bg-green-500 sm:w-auto">
                    Play Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  className="w-full border-green-600 text-green-500 hover:bg-green-950 hover:text-green-400 sm:w-auto"
                >
                  How to Play
                </Button>
              </div>

              <div className="relative mx-auto mt-12 aspect-video w-full max-w-4xl overflow-hidden rounded-lg border border-green-900/50 bg-black/80 shadow-[0_0_15px_rgba(0,255,0,0.15)]">
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                  <div className="font-mono text-sm text-green-500">
                    <div className="mb-4 text-center">
                      <span className="text-lg font-bold">TERMINAL ACCESS</span>
                    </div>
                    <div className="space-y-1 text-left">
                      <p>&gt; Initializing system...</p>
                      <p>&gt; Connecting to secure server...</p>
                      <p>&gt; Connection established.</p>
                      <p>&gt; Welcome to Hacker Tycoon Terminal v3.1.4</p>
                      <p>&gt; Loading game environment...</p>
                      <p className="animate-pulse">&gt; _</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center font-mono text-3xl font-bold">
              GAME FEATURES
            </h2>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-green-900 bg-black/80 p-6 transition-all hover:border-green-600 hover:shadow-[0_0_15px_rgba(0,255,0,0.15)]">
                <div className="mb-4 rounded-full bg-green-950/50 p-3 w-fit">
                  <Terminal className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="mb-2 font-mono text-xl font-bold">
                  Hacking Missions
                </h3>
                <p className="text-green-400/90">
                  Complete various hacking challenges from simple data
                  extraction to complex corporate infiltrations. Each mission
                  offers unique rewards and challenges.
                </p>
              </div>

              <div className="rounded-lg border border-green-900 bg-black/80 p-6 transition-all hover:border-green-600 hover:shadow-[0_0_15px_rgba(0,255,0,0.15)]">
                <div className="mb-4 rounded-full bg-green-950/50 p-3 w-fit">
                  <Server className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="mb-2 font-mono text-xl font-bold">
                  Server Upgrades
                </h3>
                <p className="text-green-400/90">
                  Upgrade your hardware and software to take on more challenging
                  missions. Better equipment means faster hacking and improved
                  security.
                </p>
              </div>

              <div className="rounded-lg border border-green-900 bg-black/80 p-6 transition-all hover:border-green-600 hover:shadow-[0_0_15px_rgba(0,255,0,0.15)]">
                <div className="mb-4 rounded-full bg-green-950/50 p-3 w-fit">
                  <Shield className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="mb-2 font-mono text-xl font-bold">
                  PvP Hacking
                </h3>
                <p className="text-green-400/90">
                  Attack other players' servers or defend your own. Build your
                  reputation in the hacking community through strategic offense
                  and defense.
                </p>
              </div>

              <div className="rounded-lg border border-green-900 bg-black/80 p-6 transition-all hover:border-green-600 hover:shadow-[0_0_15px_rgba(0,255,0,0.15)]">
                <div className="mb-4 rounded-full bg-green-950/50 p-3 w-fit">
                  <Users className="h-6 w-6 text-green-500" />
                </div>
                <h3 className="mb-2 font-mono text-xl font-bold">
                  Global Leaderboard
                </h3>
                <p className="text-green-400/90">
                  Compete with hackers worldwide to climb the global rankings.
                  Earn achievements and special rewards for your hacking
                  prowess.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-950/10">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-2xl space-y-6">
              <h2 className="font-mono text-3xl font-bold">
                JOIN THE ELITE HACKERS
              </h2>
              <p className="text-lg text-green-400/90">
                Ready to test your skills in the digital underground? Create
                your account now and start building your hacking empire.
              </p>
              <Link href="/dashboard">
                <Button className="bg-green-600 text-black hover:bg-green-500">
                  Start Hacking Now
                </Button>
              </Link>
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
