"use client";

import {
  AlertTriangle,
  Bell,
  Key,
  Lock,
  Save,
  User,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "../Navbar";

export default function AccountSettings() {
  const [email, setEmail] = useState("user@example.com");
  const [username, setUsername] = useState("Player213");
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    securityAlerts: true,
    marketingEmails: false,
    gameUpdates: true,
    communityMessages: true,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = () => {
    setIsSaving(true);

    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
    }, 1500);
  };

  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-black text-green-500">
      {/* Header/Navigation */}
      <Navbar />
      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-6">
            <h1 className="font-mono text-2xl font-bold">ACCOUNT SETTINGS</h1>
            <p className="text-green-400/90">
              Manage your account preferences and security settings
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {/* Sidebar */}
            <Card className="border-green-900 bg-black md:col-span-1">
              <CardContent className="p-4">
                <div className="flex flex-col items-center space-y-4 py-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="/placeholder.svg?height=80&width=80" />
                    <AvatarFallback className="bg-green-950 text-green-400 text-xl">
                      P2
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{username}</h2>
                    <p className="text-sm text-green-400">{email}</p>
                  </div>
                </div>

                <Separator className="my-2 bg-green-900/50" />

                <nav className="flex flex-col space-y-1">
                  <Link href="#profile">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-green-400 hover:bg-green-950 hover:text-green-300"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                  </Link>
                  <Link href="#security">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-green-400 hover:bg-green-950 hover:text-green-300"
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Security
                    </Button>
                  </Link>
                  <Link href="#notifications">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-green-400 hover:bg-green-950 hover:text-green-300"
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                  </Link>
                  <Link href="#wallet">
                    <Button
                      variant="ghost"
                      className="w-full justify-start text-green-400 hover:bg-green-950 hover:text-green-300"
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      Wallet
                    </Button>
                  </Link>
                </nav>
              </CardContent>
            </Card>

            {/* Main Settings */}
            <Card className="border-green-900 bg-black md:col-span-3">
              <CardHeader className="border-b border-green-900/50 bg-green-950/20 pb-2">
                <CardTitle className="font-mono text-lg">SETTINGS</CardTitle>
                <CardDescription className="text-green-600">
                  Manage your account preferences and security
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue="profile">
                  <TabsList className="w-full bg-green-950/20">
                    <TabsTrigger
                      value="profile"
                      className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger
                      value="security"
                      className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Security
                    </TabsTrigger>
                    <TabsTrigger
                      value="notifications"
                      className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </TabsTrigger>
                    <TabsTrigger
                      value="wallet"
                      className="data-[state=active]:bg-green-950 data-[state=active]:text-green-300"
                    >
                      <Wallet className="mr-2 h-4 w-4" />
                      Wallet
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="profile" className="p-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold">
                          Profile Information
                        </h3>
                        <p className="text-sm text-green-400/90">
                          Update your account information and how others see you
                          in the game.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                              id="username"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              className="border-green-900 bg-black text-green-400 focus-visible:ring-green-500"
                            />
                            <p className="text-xs text-green-600">
                              Your username is visible to other players in the
                              game.
                            </p>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="border-green-900 bg-black text-green-400 focus-visible:ring-green-500"
                            />
                            <p className="text-xs text-green-600">
                              Your email is used for account recovery and
                              notifications.
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="avatar">Avatar</Label>
                          <div className="flex items-center space-x-4">
                            <Avatar className="h-16 w-16">
                              <AvatarImage src="/placeholder.svg?height=64&width=64" />
                              <AvatarFallback className="bg-green-950 text-green-400 text-xl">
                                P2
                              </AvatarFallback>
                            </Avatar>
                            <Button
                              variant="outline"
                              className="border-green-900 bg-green-950/30 text-green-400 hover:bg-green-950 hover:text-green-300"
                            >
                              Change Avatar
                            </Button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          <textarea
                            id="bio"
                            rows={4}
                            placeholder="Tell other hackers about yourself..."
                            className="w-full resize-none rounded-md border border-green-900 bg-black p-2 text-green-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                          ></textarea>
                          <p className="text-xs text-green-600">
                            Your bio is visible on your public profile.
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                          className="bg-green-600 text-black hover:bg-green-500"
                        >
                          {isSaving ? (
                            <>
                              <Save className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Changes
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="security" className="p-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold">Security Settings</h3>
                        <p className="text-sm text-green-400/90">
                          Manage your account security and password settings.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                              <h4 className="font-bold">Change Password</h4>
                              <p className="text-sm text-green-400">
                                Update your password to keep your account
                                secure.
                              </p>
                            </div>
                            <Link href="/reset-password">
                              <Button className="bg-green-600 text-black hover:bg-green-500">
                                <Key className="mr-2 h-4 w-4" />
                                Change Password
                              </Button>
                            </Link>
                          </div>
                        </div>

                        <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                              <h4 className="font-bold">
                                Two-Factor Authentication
                              </h4>
                              <p className="text-sm text-green-400">
                                Add an extra layer of security to your account.
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              className="border-green-900 bg-green-950/30 text-green-400 hover:bg-green-950 hover:text-green-300"
                            >
                              Enable 2FA
                            </Button>
                          </div>
                        </div>

                        <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                              <h4 className="font-bold">Session Management</h4>
                              <p className="text-sm text-green-400">
                                View and manage your active sessions.
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              className="border-green-900 bg-green-950/30 text-green-400 hover:bg-green-950 hover:text-green-300"
                            >
                              View Sessions
                            </Button>
                          </div>
                        </div>

                        <div className="rounded-lg border border-red-900/50 bg-red-950/10 p-4">
                          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                              <h4 className="font-bold text-red-400">
                                Delete Account
                              </h4>
                              <p className="text-sm text-red-400/90">
                                Permanently delete your account and all
                                associated data.
                              </p>
                            </div>
                            <Button
                              variant="destructive"
                              className="bg-red-900/50 text-red-400 hover:bg-red-900 hover:text-red-300"
                            >
                              Delete Account
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="notifications" className="p-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold">
                          Notification Preferences
                        </h3>
                        <p className="text-sm text-green-400/90">
                          Control how and when you receive notifications.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <h4 className="font-bold">Email Notifications</h4>
                              <p className="text-sm text-green-400">
                                Receive notifications via email.
                              </p>
                            </div>
                            <Switch
                              checked={notificationSettings.emailNotifications}
                              onCheckedChange={() =>
                                handleNotificationChange("emailNotifications")
                              }
                              className="data-[state=checked]:bg-green-600"
                            />
                          </div>
                        </div>

                        <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <h4 className="font-bold">Security Alerts</h4>
                              <p className="text-sm text-green-400">
                                Get notified about security events like login
                                attempts.
                              </p>
                            </div>
                            <Switch
                              checked={notificationSettings.securityAlerts}
                              onCheckedChange={() =>
                                handleNotificationChange("securityAlerts")
                              }
                              className="data-[state=checked]:bg-green-600"
                            />
                          </div>
                        </div>

                        <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <h4 className="font-bold">Game Updates</h4>
                              <p className="text-sm text-green-400">
                                Receive notifications about game updates and new
                                features.
                              </p>
                            </div>
                            <Switch
                              checked={notificationSettings.gameUpdates}
                              onCheckedChange={() =>
                                handleNotificationChange("gameUpdates")
                              }
                              className="data-[state=checked]:bg-green-600"
                            />
                          </div>
                        </div>

                        <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <h4 className="font-bold">Community Messages</h4>
                              <p className="text-sm text-green-400">
                                Get notified when you receive messages from
                                other players.
                              </p>
                            </div>
                            <Switch
                              checked={notificationSettings.communityMessages}
                              onCheckedChange={() =>
                                handleNotificationChange("communityMessages")
                              }
                              className="data-[state=checked]:bg-green-600"
                            />
                          </div>
                        </div>

                        <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <h4 className="font-bold">Marketing Emails</h4>
                              <p className="text-sm text-green-400">
                                Receive promotional emails and special offers.
                              </p>
                            </div>
                            <Switch
                              checked={notificationSettings.marketingEmails}
                              onCheckedChange={() =>
                                handleNotificationChange("marketingEmails")
                              }
                              className="data-[state=checked]:bg-green-600"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          onClick={handleSaveProfile}
                          disabled={isSaving}
                          className="bg-green-600 text-black hover:bg-green-500"
                        >
                          {isSaving ? (
                            <>
                              <Save className="mr-2 h-4 w-4 animate-spin" />
                              Saving...
                            </>
                          ) : (
                            <>
                              <Save className="mr-2 h-4 w-4" />
                              Save Preferences
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="wallet" className="p-6">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-lg font-bold">
                          Wallet Integration
                        </h3>
                        <p className="text-sm text-green-400/90">
                          Connect your cryptocurrency wallet for Web3 features.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                              <h4 className="font-bold">Connect Wallet</h4>
                              <p className="text-sm text-green-400">
                                Link your cryptocurrency wallet to enable Web3
                                features.
                              </p>
                            </div>
                            <Button className="bg-green-600 text-black hover:bg-green-500">
                              <Wallet className="mr-2 h-4 w-4" />
                              Connect Wallet
                            </Button>
                          </div>
                        </div>

                        <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                              <h4 className="font-bold">Transaction History</h4>
                              <p className="text-sm text-green-400">
                                View your cryptocurrency transaction history.
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              className="border-green-900 bg-green-950/30 text-green-400 hover:bg-green-950 hover:text-green-300"
                            >
                              View History
                            </Button>
                          </div>
                        </div>

                        <div className="rounded-lg border border-green-900 bg-green-950/10 p-4">
                          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                            <div>
                              <h4 className="font-bold">NFT Collection</h4>
                              <p className="text-sm text-green-400">
                                View and manage your in-game NFT collection.
                              </p>
                            </div>
                            <Button
                              variant="outline"
                              className="border-green-900 bg-green-950/30 text-green-400 hover:bg-green-950 hover:text-green-300"
                            >
                              View Collection
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-lg border border-yellow-900/50 bg-yellow-950/10 p-4">
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                          <p className="text-sm text-yellow-500">
                            Web3 features are optional. Your game progress and
                            achievements are stored securely regardless of
                            wallet connection.
                          </p>
                        </div>
                      </div>
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
