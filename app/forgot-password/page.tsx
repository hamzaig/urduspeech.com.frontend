"use client";

import { useState } from "react";
import AuthForm from "@/components/auth/auth-form";
import { motion } from "@/lib/motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [copied, setCopied] = useState(false);

  const handleForgotPassword = async (data: { email: string }) => {
    setLoading(true);
    setError("");
    setSuccess("");
    setResetToken("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send reset link");
      }

      setSuccess(result.message);

      // Store reset token for development
      if (result.resetToken) {
        setResetToken(result.resetToken);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const copyResetLink = async () => {
    if (resetToken) {
      const resetUrl = `${window.location.origin}/reset-password?token=${resetToken}`;
      try {
        await navigator.clipboard.writeText(resetUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4 relative overflow-hidden pt-20 md:pt-24">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-indigo-400/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md relative z-10 space-y-6"
      >
        <AuthForm
          type="forgot-password"
          onSubmit={handleForgotPassword}
          loading={loading}
          error={error}
          success={success}
        />

        {/* Development Reset Token Display */}
        {resetToken && process.env.NODE_ENV === "development" && (
          <Card className="border-2 border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-800">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200">
                    Development Mode - Reset Token
                  </h3>
                </div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">
                  In production, this would be sent via email. For testing, use this token:
                </p>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <code className="flex-1 p-2 bg-white dark:bg-gray-800 rounded text-sm font-mono text-gray-800 dark:text-gray-200 break-all">
                      {resetToken}
                    </code>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={copyResetLink}
                      className="shrink-0"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-yellow-600 dark:text-yellow-400">
                    Click copy to get the full reset link
                  </p>
                </div>
                <div className="pt-2">
                  <Link href={`/reset-password?token=${resetToken}`}>
                    <Button className="w-full" size="sm">
                      Test Reset Password
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success Message */}
        {success && !resetToken && (
          <Alert>
            <AlertDescription className="text-center">
              {success}
              <br />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Please check your email for the password reset link.
              </span>
            </AlertDescription>
          </Alert>
        )}
      </motion.div>
    </div>
  );
}
