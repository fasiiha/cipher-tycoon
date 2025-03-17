import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Award,
  ChevronRight,
  Cpu,
  Database,
  Globe,
  Lock,
  Shield,
  Terminal,
  Users,
  Zap,
} from "lucide-react";
import Link from "next/link";
import LandingNavbar from "../LandingNavbar";

export default function Features() {
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
                GAME FEATURES
              </h1>
              <p className="text-lg text-green-400/90">
                Explore the comprehensive features that make Hacker Tycoon the
                ultimate hacking simulation game
              </p>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-8 font-mono text-2xl font-bold text-center">
                CORE FEATURES
              </h2>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="border-green-900 bg-black">
                  <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                    <div className="flex items-center space-x-2">
                      <Terminal className="h-5 w-5 text-green-500" />
                      <CardTitle className="font-mono text-lg">
                        HACKING MISSIONS
                      </CardTitle>
                    </div>
                    <CardDescription className="text-green-600">
                      Complete challenging missions to earn rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2 text-sm text-green-400/90">
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>
                          Variety of mission types from data extraction to
                          corporate infiltration
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>
                          Increasing difficulty levels with greater rewards
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>Time-based challenges that test your skills</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>Special missions with unique rewards</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-900 bg-black">
                  <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                    <div className="flex items-center space-x-2">
                      <Cpu className="h-5 w-5 text-green-500" />
                      <CardTitle className="font-mono text-lg">
                        SYSTEM UPGRADES
                      </CardTitle>
                    </div>
                    <CardDescription className="text-green-600">
                      Enhance your hacking capabilities
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2 text-sm text-green-400/90">
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>Hardware upgrades for faster processing</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>
                          Software tools to unlock new hacking methods
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>Network infrastructure improvements</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>Specialized equipment for advanced missions</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-900 bg-black">
                  <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-5 w-5 text-green-500" />
                      <CardTitle className="font-mono text-lg">
                        SECURITY SYSTEMS
                      </CardTitle>
                    </div>
                    <CardDescription className="text-green-600">
                      Protect your digital assets
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2 text-sm text-green-400/90">
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>Advanced firewalls to prevent intrusions</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>Encryption systems for data protection</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>Intrusion detection and prevention</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>Security logs and vulnerability management</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-900 bg-black">
                  <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-green-500" />
                      <CardTitle className="font-mono text-lg">
                        PVP HACKING
                      </CardTitle>
                    </div>
                    <CardDescription className="text-green-600">
                      Compete against other players
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2 text-sm text-green-400/90">
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>Attack other players' servers for rewards</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>Defend your systems from rival hackers</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>Form alliances with other players</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>Competitive ranking system</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-900 bg-black">
                  <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                    <div className="flex items-center space-x-2">
                      <Award className="h-5 w-5 text-green-500" />
                      <CardTitle className="font-mono text-lg">
                        ACHIEVEMENTS
                      </CardTitle>
                    </div>
                    <CardDescription className="text-green-600">
                      Track your progress and earn rewards
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2 text-sm text-green-400/90">
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>Hundreds of achievements to unlock</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>
                          Special rewards for completing achievement sets
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>
                          Unique titles and badges to showcase your skills
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>Leaderboards to compare your progress</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-green-900 bg-black">
                  <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                    <div className="flex items-center space-x-2">
                      <Database className="h-5 w-5 text-green-500" />
                      <CardTitle className="font-mono text-lg">
                        CRYPTOCURRENCY
                      </CardTitle>
                    </div>
                    <CardDescription className="text-green-600">
                      In-game economy and transactions
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-4">
                    <ul className="space-y-2 text-sm text-green-400/90">
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>
                          Earn HTC (Hacker Tycoon Coin) through missions
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>
                          Invest in mining operations for passive income
                        </span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>Trade with other players in the marketplace</span>
                      </li>
                      <li className="flex items-start">
                        <ChevronRight className="mr-2 h-4 w-4 mt-0.5 text-green-500" />
                        <span>
                          Web3 integration for cryptocurrency transactions
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Game Modes */}
        <section className="py-12 bg-green-950/10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl space-y-8">
              <div className="text-center">
                <h2 className="font-mono text-2xl font-bold">GAME MODES</h2>
                <p className="mt-2 text-green-400/90">
                  Hacker Tycoon offers multiple ways to play, catering to
                  different playstyles
                </p>
              </div>

              <div className="space-y-6">
                <div className="rounded-lg border border-green-900 bg-black p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-950/50 md:mb-0">
                      <Terminal className="h-8 w-8 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-mono text-lg font-bold">
                        CAREER MODE
                      </h3>
                      <p className="mt-2 text-green-400/90">
                        Build your hacking empire from scratch, starting with
                        basic equipment and working your way up to become the
                        most notorious hacker in the world. Complete missions,
                        upgrade your systems, and defend against rival hackers
                        in this comprehensive single-player experience.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-green-900 bg-black p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-950/50 md:mb-0">
                      <Users className="h-8 w-8 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-mono text-lg font-bold">
                        MULTIPLAYER MODE
                      </h3>
                      <p className="mt-2 text-green-400/90">
                        Compete or collaborate with other players in real-time.
                        Form hacking collectives, engage in server wars, and
                        climb the global leaderboards. Multiplayer mode features
                        regular events, tournaments, and exclusive rewards for
                        top performers.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="rounded-lg border border-green-900 bg-black p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                    <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-950/50 md:mb-0">
                      <Zap className="h-8 w-8 text-green-500" />
                    </div>
                    <div>
                      <h3 className="font-mono text-lg font-bold">
                        CHALLENGE MODE
                      </h3>
                      <p className="mt-2 text-green-400/90">
                        Test your skills in time-limited scenarios with specific
                        objectives and constraints. Challenge mode offers unique
                        puzzles and hacking scenarios that require creative
                        thinking and expert knowledge. Perfect for experienced
                        players looking to push their abilities to the limit.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Features */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl space-y-8">
              <div className="text-center">
                <h2 className="font-mono text-2xl font-bold">
                  TECHNICAL FEATURES
                </h2>
                <p className="mt-2 text-green-400/90">
                  Built with cutting-edge technology for an immersive experience
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-green-900 bg-black p-6">
                  <div className="flex items-center space-x-3">
                    <Globe className="h-5 w-5 text-green-500" />
                    <h3 className="font-mono text-lg font-bold">
                      REAL-TIME MULTIPLAYER
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-green-400/90">
                    Our advanced networking infrastructure ensures smooth,
                    lag-free multiplayer experiences with players from around
                    the world.
                  </p>
                </div>

                <div className="rounded-lg border border-green-900 bg-black p-6">
                  <div className="flex items-center space-x-3">
                    <Lock className="h-5 w-5 text-green-500" />
                    <h3 className="font-mono text-lg font-bold">
                      SECURE TRANSACTIONS
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-green-400/90">
                    All in-game transactions are secured with advanced
                    encryption, ensuring your digital assets remain safe at all
                    times.
                  </p>
                </div>

                <div className="rounded-lg border border-green-900 bg-black p-6">
                  <div className="flex items-center space-x-3">
                    <Cpu className="h-5 w-5 text-green-500" />
                    <h3 className="font-mono text-lg font-bold">ADVANCED AI</h3>
                  </div>
                  <p className="mt-2 text-sm text-green-400/90">
                    Our proprietary AI system creates dynamic challenges that
                    adapt to your skill level, ensuring a constantly evolving
                    gameplay experience.
                  </p>
                </div>

                <div className="rounded-lg border border-green-900 bg-black p-6">
                  <div className="flex items-center space-x-3">
                    <Database className="h-5 w-5 text-green-500" />
                    <h3 className="font-mono text-lg font-bold">
                      WEB3 INTEGRATION
                    </h3>
                  </div>
                  <p className="mt-2 text-sm text-green-400/90">
                    Connect your crypto wallet for seamless integration with the
                    game's economy, allowing for real cryptocurrency
                    transactions and NFT ownership.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-green-950/10">
          <div className="container mx-auto px-4 text-center">
            <div className="mx-auto max-w-2xl space-y-6">
              <h2 className="font-mono text-3xl font-bold">
                EXPERIENCE THE FUTURE OF HACKING GAMES
              </h2>
              <p className="text-lg text-green-400/90">
                Join thousands of players already building their digital empires
                in Hacker Tycoon.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0">
                <Link href="/dashboard">
                  <Button className="w-full bg-green-600 text-black hover:bg-green-500 sm:w-auto">
                    Play Now
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/how-to-play">
                  <Button
                    variant="outline"
                    className="w-full border-green-600 text-green-500 hover:bg-green-950 hover:text-green-400 sm:w-auto"
                  >
                    How to Play
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
