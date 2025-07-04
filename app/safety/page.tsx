"use client";

import { motion } from "@/lib/motion";
import { Shield, AlertTriangle, Users, Lock, Eye, CheckCircle, XCircle, Phone, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SafetyGuidelinesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center text-white mr-4">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Safety Guidelines
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            At UrduSpeech, your safety and security are our top priorities. These guidelines ensure a safe 
            and secure experience while using our Urdu language services.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <Shield className="mr-2 h-4 w-4" />
              User Safety
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              <Lock className="mr-2 h-4 w-4" />
              Data Security
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              <Eye className="mr-2 h-4 w-4" />
              Content Protection
            </Badge>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Account Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Lock className="mr-3 h-6 w-6 text-blue-600" />
                    Account Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Password Security</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Use strong, unique passwords (minimum 8 characters)</li>
                      <li>• Include uppercase, lowercase, numbers, and symbols</li>
                      <li>• Never share your password with anyone</li>
                      <li>• Change your password regularly</li>
                      <li>• Use different passwords for different accounts</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Two-Factor Authentication</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Enable 2FA for additional account protection</li>
                      <li>• Use authenticator apps or SMS verification</li>
                      <li>• Keep backup codes in a secure location</li>
                      <li>• Regularly review and update 2FA settings</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Account Monitoring</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Regularly review your account activity</li>
                      <li>• Monitor login locations and devices</li>
                      <li>• Report suspicious activity immediately</li>
                      <li>• Keep your contact information updated</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Content Safety */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Eye className="mr-3 h-6 w-6 text-purple-600" />
                    Content Safety
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-600">Safe Content Guidelines</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Only upload content you own or have permission to use</li>
                      <li>• Ensure content complies with local laws and regulations</li>
                      <li>• Avoid uploading sensitive personal information</li>
                      <li>• Respect intellectual property rights</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-600">Prohibited Content</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Illegal or harmful material</li>
                      <li>• Copyrighted content without permission</li>
                      <li>• Personal information of others</li>
                      <li>• Malicious software or code</li>
                      <li>• Content that promotes violence or discrimination</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-600">Audio/Video Safety</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Ensure audio quality for accurate transcription</li>
                      <li>• Remove background noise when possible</li>
                      <li>• Use appropriate file formats (MP3, WAV, MP4)</li>
                      <li>• Keep file sizes within platform limits</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Protection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Shield className="mr-3 h-6 w-6 text-green-600" />
                    Data Protection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">Personal Information</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Never share personal information in public forums</li>
                      <li>• Use secure connections (HTTPS) when accessing our services</li>
                      <li>• Be cautious when sharing contact information</li>
                      <li>• Regularly review and update your privacy settings</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">File Security</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Scan files for malware before uploading</li>
                      <li>• Use strong file names that don't reveal sensitive information</li>
                      <li>• Delete files from our servers when no longer needed</li>
                      <li>• Keep local backups of important content</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">Communication Safety</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Be cautious when sharing personal details in support requests</li>
                      <li>• Verify email addresses before responding to support</li>
                      <li>• Report suspicious communications immediately</li>
                      <li>• Use official channels for all communications</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Reporting Issues */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <AlertTriangle className="mr-3 h-6 w-6 text-orange-600" />
                    Reporting Safety Issues
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-orange-600">What to Report</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Suspicious account activity</li>
                      <li>• Unauthorized access attempts</li>
                      <li>• Inappropriate or harmful content</li>
                      <li>• Technical security vulnerabilities</li>
                      <li>• Phishing attempts or scams</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-orange-600">How to Report</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Contact our security team immediately</li>
                      <li>• Provide detailed information about the issue</li>
                      <li>• Include relevant screenshots or evidence</li>
                      <li>• Follow up if you don't receive a response</li>
                    </ul>
                  </div>

                  <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                    <p className="text-sm text-orange-800 dark:text-orange-200">
                      <strong>Emergency:</strong> If you believe your account has been compromised, 
                      contact us immediately at security@urduspeech.com or call our support line.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Best Practices */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <CheckCircle className="mr-3 h-6 w-6 text-green-600" />
                    Best Practices
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">General Safety</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Keep your software and browsers updated</li>
                      <li>• Use antivirus software on your devices</li>
                      <li>• Be cautious when using public Wi-Fi networks</li>
                      <li>• Log out from shared or public computers</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">Service Usage</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Review processed content for accuracy</li>
                      <li>• Keep backups of important files</li>
                      <li>• Use appropriate file formats for best results</li>
                      <li>• Follow our service guidelines and limits</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">Privacy Awareness</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Regularly review your privacy settings</li>
                      <li>• Be mindful of what you share online</li>
                      <li>• Understand how your data is used</li>
                      <li>• Exercise your privacy rights when needed</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6">
            {/* Emergency Contacts */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="mr-2 h-5 w-5 text-red-600" />
                    Emergency Contacts
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Security Team</h4>
                    <p className="text-sm text-muted-foreground">security@urduspeech.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">24/7 Support</h4>
                    <p className="text-sm text-muted-foreground">+923057777911</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">General Support</h4>
                    <p className="text-sm text-muted-foreground">contact@urduspeech.com</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Safety Checklist */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                    Safety Checklist
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>Strong password set</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>2FA enabled</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>Privacy settings reviewed</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>Antivirus updated</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>Backups created</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Warning Signs */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <XCircle className="mr-2 h-5 w-5 text-red-600" />
                    Warning Signs
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <XCircle className="mr-2 h-4 w-4 text-red-600" />
                    <span>Unexpected login attempts</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <XCircle className="mr-2 h-4 w-4 text-red-600" />
                    <span>Unusual account activity</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <XCircle className="mr-2 h-4 w-4 text-red-600" />
                    <span>Suspicious emails</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <XCircle className="mr-2 h-4 w-4 text-red-600" />
                    <span>Unauthorized charges</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <XCircle className="mr-2 h-4 w-4 text-red-600" />
                    <span>Content you didn't upload</span>
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
          <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold mb-4">Need Help with Safety?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Your safety is our priority. If you have any safety concerns or need assistance, 
                our security team is here to help 24/7.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:security@urduspeech.com"
                  className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Contact Security Team
                </a>
                <a
                  href="tel:+923057777911"
                  className="inline-flex items-center px-6 py-3 border border-green-600 text-green-600 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Emergency Support
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 