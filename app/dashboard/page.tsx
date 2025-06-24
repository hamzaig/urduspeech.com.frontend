"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
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
import { LogOut, User, Mail, Calendar } from "lucide-react";

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
  const { user, loading, logout, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login");
    }
  }, [loading, isAuthenticated, router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome, {user?.name}!
            </h1>
            <Button onClick={handleLogout} variant="outline">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>

          {/* Top Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* Profile Information */}
            <Card className="rounded-xl shadow-md">
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
            <Card className="rounded-xl shadow-md">
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
            <Card className="rounded-xl shadow-md">
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

          {/* Quick Actions Section */}
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 mb-4">
            <h2 className="text-2xl font-semibold mb-2">Quick Actions</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Common actions you can take
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button
                className="flex-1 py-3 text-base font-semibold"
                variant="default"
              >
                View Profile
              </Button>
              <Button
                className="flex-1 py-3 text-base font-semibold"
                variant="secondary"
              >
                Change Password
              </Button>
              <Button
                className="flex-1 py-3 text-base font-semibold"
                variant="outline"
              >
                Account Settings
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
