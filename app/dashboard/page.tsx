"use client";

import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "@/lib/motion";
import { User, Mail, Calendar, FileText, Mic, Settings } from "lucide-react";
import Link from "next/link";

function formatDate(dateValue?: string | Date) {
  if (!dateValue) return "N/A";
  const date = typeof dateValue === "string" ? new Date(dateValue) : dateValue;
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function formatDateTime(dateValue?: string | Date) {
  if (!dateValue) return "N/A";
  const date = typeof dateValue === "string" ? new Date(dateValue) : dateValue;
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Welcome Message */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Your Dashboard Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your UrduSpeech account and services
          </p>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Profile Information */}
          <Card className="rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Profile Information
              </CardTitle>
              <CardDescription>Your account details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Name:</span> {user?.name}
                </div>
                <div>
                  <span className="font-medium">Email:</span> {user?.email}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Status */}
          <Card className="rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                Account Status
              </CardTitle>
              <CardDescription>Your account status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div>
                  <span className="font-medium">Status:</span>{" "}
                  <span className="text-green-600 font-semibold">Active</span>
                </div>
                <div>
                  <span className="font-medium">Member since:</span>{" "}
                  {formatDate(user?.createdAt)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" />
                Recent Activity
              </CardTitle>
              <CardDescription>Your recent account activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Account updated: {formatDate(user?.updatedAt)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Services Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {/* Transcription Services */}
          <Card className="rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mic className="mr-2 h-5 w-5" />
                Transcription Services
              </CardTitle>
              <CardDescription>Your Urdu transcription projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Projects:</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Completed:</span>
                  <span className="text-green-600 font-semibold">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>In Progress:</span>
                  <span className="text-blue-600 font-semibold">0</span>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Start New Project
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Translation Services */}
          <Card className="rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Translation Services
              </CardTitle>
              <CardDescription>Your Urdu translation projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Total Projects:</span>
                  <span className="font-semibold">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Completed:</span>
                  <span className="text-green-600 font-semibold">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>In Progress:</span>
                  <span className="text-blue-600 font-semibold">0</span>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Start New Translation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions Section */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 mb-4">
          <h2 className="text-2xl font-semibold mb-2">Quick Actions</h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Common actions you can take
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/settings">
              <Button
                className="py-3 text-base font-semibold w-full"
                variant="default"
              >
                <User className="mr-2 h-4 w-4" />
                View Profile
              </Button>
            </Link>
            <Link href="/settings">
              <Button
                className="py-3 text-base font-semibold w-full"
                variant="secondary"
              >
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
              </Button>
            </Link>
            <Button
              className="py-3 text-base font-semibold"
              variant="outline"
            >
              <Mic className="mr-2 h-4 w-4" />
              New Transcription
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
