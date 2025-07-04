"use client";

import { motion } from "@/lib/motion";
import { Shield, Lock, Eye, Database, Users, Globe, FileText, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center text-white mr-4">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Privacy Policy
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            At UrduSpeech, we are committed to protecting your privacy and ensuring the security of your data. 
            This policy explains how we collect, use, and safeguard your information when you use our Urdu language services.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <Lock className="mr-2 h-4 w-4" />
              GDPR Compliant
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              <Shield className="mr-2 h-4 w-4" />
              Data Protected
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
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
            {/* Information We Collect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Database className="mr-3 h-6 w-6 text-blue-600" />
                    Information We Collect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Personal Information</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Name and contact information (email, phone number)</li>
                      <li>• Account credentials and profile information</li>
                      <li>• Payment and billing information</li>
                      <li>• Communication preferences and settings</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Service-Related Data</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Audio files uploaded for speech-to-text conversion</li>
                      <li>• Text content submitted for translation services</li>
                      <li>• Language preferences and service usage patterns</li>
                      <li>• Quality feedback and improvement suggestions</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Technical Information</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• IP address and device information</li>
                      <li>• Browser type and operating system</li>
                      <li>• Usage analytics and performance metrics</li>
                      <li>• Cookies and similar tracking technologies</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* How We Use Your Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Users className="mr-3 h-6 w-6 text-purple-600" />
                    How We Use Your Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-600">Service Provision</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Process and convert Urdu speech to text</li>
                      <li>• Provide accurate Urdu translation services</li>
                      <li>• Deliver transcription and subtitling services</li>
                      <li>• Manage your account and billing</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-600">Service Improvement</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Enhance our AI models and algorithms</li>
                      <li>• Improve accuracy and performance</li>
                      <li>• Develop new features and capabilities</li>
                      <li>• Conduct research and analysis</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-600">Communication</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Send service updates and notifications</li>
                      <li>• Provide customer support and assistance</li>
                      <li>• Share important policy changes</li>
                      <li>• Respond to inquiries and feedback</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Security */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Lock className="mr-3 h-6 w-6 text-green-600" />
                    Data Security & Protection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">Security Measures</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• End-to-end encryption for all data transmission</li>
                      <li>• Secure cloud storage with industry-standard protocols</li>
                      <li>• Regular security audits and vulnerability assessments</li>
                      <li>• Access controls and authentication mechanisms</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">Data Retention</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Audio files are automatically deleted after processing</li>
                      <li>• Text content is retained only as long as necessary</li>
                      <li>• Account data is kept for service provision</li>
                      <li>• You can request data deletion at any time</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">Privacy Rights</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Access and review your personal data</li>
                      <li>• Request correction of inaccurate information</li>
                      <li>• Delete your account and associated data</li>
                      <li>• Opt-out of marketing communications</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Sharing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Globe className="mr-3 h-6 w-6 text-orange-600" />
                    Data Sharing & Third Parties
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-orange-600">We Do Not Sell Your Data</h3>
                    <p className="text-muted-foreground mb-4">
                      UrduSpeech does not sell, trade, or rent your personal information to third parties for marketing purposes.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-orange-600">Limited Sharing</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Service providers who assist in our operations</li>
                      <li>• Payment processors for secure transactions</li>
                      <li>• Legal authorities when required by law</li>
                      <li>• With your explicit consent</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-orange-600">International Transfers</h3>
                    <p className="text-muted-foreground">
                      Your data may be processed in countries other than your own. We ensure adequate protection 
                      through appropriate safeguards and compliance with applicable data protection laws.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-blue-600" />
                    Contact Us
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Privacy Officer</h4>
                    <p className="text-sm text-muted-foreground">privacy@urduspeech.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Data Protection</h4>
                    <p className="text-sm text-muted-foreground">dpo@urduspeech.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">General Support</h4>
                    <p className="text-sm text-muted-foreground">contact@urduspeech.com</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Key Points */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-green-600" />
                    Your Rights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Lock className="mr-2 h-4 w-4 text-green-600" />
                    <span>Access your data</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Lock className="mr-2 h-4 w-4 text-green-600" />
                    <span>Correct information</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Lock className="mr-2 h-4 w-4 text-green-600" />
                    <span>Delete your account</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Lock className="mr-2 h-4 w-4 text-green-600" />
                    <span>Opt-out of marketing</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Lock className="mr-2 h-4 w-4 text-green-600" />
                    <span>Data portability</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Compliance */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Globe className="mr-2 h-5 w-5 text-purple-600" />
                    Compliance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Badge variant="secondary" className="w-full justify-center bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                    GDPR Compliant
                  </Badge>
                  <Badge variant="secondary" className="w-full justify-center bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    CCPA Compliant
                  </Badge>
                  <Badge variant="secondary" className="w-full justify-center bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                    ISO 27001
                  </Badge>
                  <Badge variant="secondary" className="w-full justify-center bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                    SOC 2 Type II
                  </Badge>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold mb-4">Questions About Privacy?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're committed to transparency and protecting your privacy. If you have any questions 
                about this privacy policy or how we handle your data, please don't hesitate to contact us.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:privacy@urduspeech.com"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Contact Privacy Team
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                >
                  <Globe className="mr-2 h-5 w-5" />
                  General Support
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 