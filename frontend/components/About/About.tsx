import { Button } from "@/components/ui/button";
import { ChevronRight, Code, Database, Globe, Terminal } from "lucide-react";
import Link from "next/link";
import LandingNavbar from "../LandingNavbar";

export default function About() {
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
                ABOUT HACKER TYCOON
              </h1>
              <p className="text-lg text-green-400/90">
                The ultimate hacking simulation game that puts you in control of
                your own digital empire
              </p>
            </div>
          </div>
        </section>

        {/* Game Story */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl space-y-8">
              <div className="space-y-4">
                <h2 className="font-mono text-2xl font-bold">THE STORY</h2>
                <p className="text-green-400/90">
                  In a world where information is the most valuable currency,
                  you emerge as a skilled hacker looking to make your mark on
                  the digital underground. Starting with nothing but a basic
                  computer setup and your wits, you must build your reputation,
                  complete increasingly complex missions, and defend against
                  rival hackers.
                </p>
                <p className="text-green-400/90">
                  As you progress, you'll upgrade your systems, form alliances,
                  and potentially become the most feared and respected hacker in
                  the world. But be careful – the higher you climb, the bigger
                  target you become for both rival hackers and law enforcement
                  agencies.
                </p>
              </div>

              <div className="rounded-lg border border-green-900 bg-green-950/10 p-6">
                <div className="flex flex-col items-center space-y-4 text-center">
                  <Terminal className="h-12 w-12 text-green-500" />
                  <h3 className="font-mono text-xl font-bold">
                    THE DARK WEB CHALLENGE
                  </h3>
                  <p className="text-green-400/90">
                    The Dark Web Challenge is the ultimate test of your hacking
                    skills. Navigate the shadowy corners of the internet,
                    complete high-risk missions, and compete against the best
                    hackers in the world. Do you have what it takes to become
                    the ultimate Hacker Tycoon?
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Development Team */}
        <section className="py-12 bg-green-950/10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl space-y-8">
              <div className="text-center">
                <h2 className="font-mono text-2xl font-bold">
                  DEVELOPMENT TEAM
                </h2>
                <p className="mt-2 text-green-400/90">
                  Hacker Tycoon is developed by a passionate team of
                  cybersecurity enthusiasts and game developers
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-lg border border-green-900 bg-black p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-950/50">
                    <Code className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="font-mono text-lg font-bold">DEVELOPMENT</h3>
                  <p className="mt-2 text-sm text-green-400/90">
                    Our development team brings years of experience in game
                    design and cybersecurity to create an authentic hacking
                    experience.
                  </p>
                </div>

                <div className="rounded-lg border border-green-900 bg-black p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-950/50">
                    <Database className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="font-mono text-lg font-bold">
                    SECURITY EXPERTS
                  </h3>
                  <p className="mt-2 text-sm text-green-400/90">
                    Real-world cybersecurity professionals consult on our game
                    mechanics to ensure an authentic and educational experience.
                  </p>
                </div>

                <div className="rounded-lg border border-green-900 bg-black p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-950/50">
                    <Globe className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="font-mono text-lg font-bold">
                    COMMUNITY TEAM
                  </h3>
                  <p className="mt-2 text-sm text-green-400/90">
                    Our dedicated community managers work to create an engaging
                    environment for players to connect and compete.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Game Philosophy */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl space-y-8">
              <div className="space-y-4">
                <h2 className="font-mono text-2xl font-bold">OUR PHILOSOPHY</h2>
                <p className="text-green-400/90">
                  At Hacker Tycoon, we believe in creating games that are not
                  only entertaining but also educational. Our goal is to provide
                  players with an authentic hacking experience while teaching
                  them about cybersecurity concepts in a safe, simulated
                  environment.
                </p>
                <p className="text-green-400/90">
                  We're committed to regular updates, community engagement, and
                  creating a balanced gameplay experience that rewards skill and
                  strategy over pay-to-win mechanics.
                </p>
              </div>

              <div className="rounded-lg border border-green-900 bg-green-950/10 p-6">
                <div className="flex flex-col space-y-4">
                  <h3 className="font-mono text-xl font-bold">DISCLAIMER</h3>
                  <p className="text-green-400/90">
                    Hacker Tycoon is a work of fiction and is intended for
                    entertainment purposes only. The game does not teach actual
                    hacking techniques and should not be used as a guide for any
                    illegal activities. We promote ethical hacking and
                    cybersecurity education.
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
                READY TO START YOUR JOURNEY?
              </h2>
              <p className="text-lg text-green-400/90">
                Join thousands of players already building their hacking empires
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
