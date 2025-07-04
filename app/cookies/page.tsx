"use client";

import { motion } from "@/lib/motion";
import { Cookie, Settings, Shield, Eye, Database, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function CookiesPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-orange-600 flex items-center justify-center text-white mr-4">
              <Cookie className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Cookies Policy
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            This policy explains how UrduSpeech uses cookies and similar technologies to enhance your 
            experience with our Urdu language services and improve our platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Badge variant="secondary" className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
              <Cookie className="mr-2 h-4 w-4" />
              Cookie Management
            </Badge>
            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
              <Shield className="mr-2 h-4 w-4" />
              Privacy First
            </Badge>
            <Badge variant="secondary" className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
              <Eye className="mr-2 h-4 w-4" />
              Transparent
            </Badge>
          </div>
        </motion.div>

        {/* Last Updated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-lg"
        >
          <div className="flex items-center justify-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-orange-500" />
            <p className="text-sm text-muted-foreground">
              <strong>Last Updated:</strong> {new Date().toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What Are Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Cookie className="mr-3 h-6 w-6 text-orange-600" />
                    What Are Cookies?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">
                    Cookies are small text files that are stored on your device when you visit our website. 
                    They help us provide you with a better experience by remembering your preferences, 
                    analyzing how you use our services, and improving our platform.
                  </p>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-orange-600">How Cookies Work</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Store your language preferences for Urdu services</li>
                      <li>• Remember your login status and account settings</li>
                      <li>• Analyze website usage to improve performance</li>
                      <li>• Provide personalized content and recommendations</li>
                      <li>• Ensure security and prevent fraud</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                    <p className="text-sm text-orange-800 dark:text-orange-200">
                      <strong>Important:</strong> Cookies do not contain personal information like your name, 
                      email, or phone number. They only store technical information to improve your experience.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Types of Cookies We Use */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Settings className="mr-3 h-6 w-6 text-blue-600" />
                    Types of Cookies We Use
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Essential Cookies</h3>
                    <p className="text-muted-foreground mb-3">
                      These cookies are necessary for the website to function properly and cannot be disabled.
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Authentication and security cookies</li>
                      <li>• Session management cookies</li>
                      <li>• Load balancing and performance cookies</li>
                      <li>• CSRF protection cookies</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Functional Cookies</h3>
                    <p className="text-muted-foreground mb-3">
                      These cookies enhance your experience by remembering your preferences and settings.
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Language preference cookies (Urdu/English)</li>
                      <li>• Theme and display settings cookies</li>
                      <li>• Service preference cookies</li>
                      <li>• User interface customization cookies</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Analytics Cookies</h3>
                    <p className="text-muted-foreground mb-3">
                      These cookies help us understand how you use our services to improve them.
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Google Analytics cookies</li>
                      <li>• Service usage analytics cookies</li>
                      <li>• Performance monitoring cookies</li>
                      <li>• Error tracking cookies</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Marketing Cookies</h3>
                    <p className="text-muted-foreground mb-3">
                      These cookies help us provide relevant content and advertisements.
                    </p>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Social media integration cookies</li>
                      <li>• Advertising platform cookies</li>
                      <li>• Retargeting cookies</li>
                      <li>• Campaign tracking cookies</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cookie Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Shield className="mr-3 h-6 w-6 text-green-600" />
                    Cookie Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">Browser Settings</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Most browsers allow you to control cookie settings</li>
                      <li>• You can block or delete cookies through browser preferences</li>
                      <li>• Some features may not work if cookies are disabled</li>
                      <li>• Settings vary by browser and device</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">Our Cookie Consent</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• We show a cookie consent banner on first visit</li>
                      <li>• You can accept or decline non-essential cookies</li>
                      <li>• Essential cookies are always enabled for functionality</li>
                      <li>• You can change preferences anytime in settings</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">Third-Party Cookies</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Some third-party services may set their own cookies</li>
                      <li>• We only work with trusted, privacy-focused partners</li>
                      <li>• Third-party cookies are subject to their own policies</li>
                      <li>• You can opt-out of third-party cookies</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Collection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Database className="mr-3 h-6 w-6 text-purple-600" />
                    Data Collection & Usage
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-600">What We Collect</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Browser type and version information</li>
                      <li>• Operating system and device details</li>
                      <li>• IP address and general location</li>
                      <li>• Pages visited and time spent</li>
                      <li>• Service usage patterns and preferences</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-600">How We Use It</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Improve website performance and user experience</li>
                      <li>• Analyze service usage to enhance features</li>
                      <li>• Provide personalized content and recommendations</li>
                      <li>• Ensure security and prevent abuse</li>
                      <li>• Optimize our Urdu language services</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-600">Data Protection</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• All cookie data is encrypted and secure</li>
                      <li>• We never sell or share cookie data with third parties</li>
                      <li>• Data is used only for stated purposes</li>
                      <li>• You can request data deletion at any time</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Your Rights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Eye className="mr-3 h-6 w-6 text-blue-600" />
                    Your Cookie Rights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Control Your Cookies</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Accept or decline cookies when prompted</li>
                      <li>• Change cookie preferences anytime</li>
                      <li>• Delete existing cookies from your browser</li>
                      <li>• Block future cookies from our site</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Access Your Data</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Request information about cookies we use</li>
                      <li>• Access data collected through cookies</li>
                      <li>• Understand how your data is processed</li>
                      <li>• Receive a copy of your cookie data</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Opt-Out Options</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Opt-out of analytics cookies</li>
                      <li>• Disable marketing cookies</li>
                      <li>• Remove tracking cookies</li>
                      <li>• Request complete cookie deletion</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6">
            {/* Cookie Types Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Cookie className="mr-2 h-5 w-5 text-orange-600" />
                    Cookie Types
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>Essential (Required)</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-600" />
                    <span>Functional (Optional)</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-purple-600" />
                    <span>Analytics (Optional)</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-orange-600" />
                    <span>Marketing (Optional)</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Cookie Duration */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="mr-2 h-5 w-5 text-blue-600" />
                    Cookie Duration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <XCircle className="mr-2 h-4 w-4 text-red-600" />
                    <span>Session (Browser close)</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <XCircle className="mr-2 h-4 w-4 text-orange-600" />
                    <span>1-30 days</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <XCircle className="mr-2 h-4 w-4 text-yellow-600" />
                    <span>30-90 days</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <XCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>1-2 years</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-green-600" />
                    Cookie Support
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Privacy Team</h4>
                    <p className="text-sm text-muted-foreground">privacy@urduspeech.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Cookie Questions</h4>
                    <p className="text-sm text-muted-foreground">cookies@urduspeech.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">General Support</h4>
                    <p className="text-sm text-muted-foreground">contact@urduspeech.com</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold mb-4">Manage Your Cookies</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We respect your privacy choices. You can manage your cookie preferences anytime 
                through your browser settings or contact us for assistance.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:cookies@urduspeech.com"
                  className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
                >
                  <Cookie className="mr-2 h-5 w-5" />
                  Cookie Questions
                </a>
                <a
                  href="/privacy"
                  className="inline-flex items-center px-6 py-3 border border-orange-600 text-orange-600 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 transition-colors"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Privacy Policy
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 