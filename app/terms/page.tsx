"use client";

import { motion } from "@/lib/motion";
import { FileText, Scale, Users, Shield, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center text-white mr-4">
              <FileText className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Terms of Service
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            These terms govern your use of UrduSpeech services. By using our platform, you agree to these terms 
            and our commitment to providing high-quality Urdu language services.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              <Scale className="mr-2 h-4 w-4" />
              Legal Agreement
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              <Shield className="mr-2 h-4 w-4" />
              User Protection
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <CheckCircle className="mr-2 h-4 w-4" />
              Fair Terms
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
            {/* Acceptance of Terms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <CheckCircle className="mr-3 h-6 w-6 text-green-600" />
                    Acceptance of Terms
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    By accessing and using UrduSpeech services, you acknowledge that you have read, understood, 
                    and agree to be bound by these Terms of Service. If you do not agree to these terms, 
                    please do not use our services.
                  </p>
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Important:</strong> These terms apply to all users of UrduSpeech services, 
                      including speech-to-text, translation, transcription, and related language services.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Service Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Users className="mr-3 h-6 w-6 text-blue-600" />
                    Service Description
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Our Services</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Urdu speech-to-text conversion and transcription</li>
                      <li>• Urdu translation and localization services</li>
                      <li>• Audio and video subtitle generation</li>
                      <li>• Content creation and editing services</li>
                      <li>• Language consulting and support</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Service Availability</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• 24/7 online platform availability</li>
                      <li>• Professional support during business hours</li>
                      <li>• Regular maintenance and updates</li>
                      <li>• Service quality monitoring and improvement</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* User Responsibilities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Shield className="mr-3 h-6 w-6 text-purple-600" />
                    User Responsibilities
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-600">Account Security</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Maintain the confidentiality of your account credentials</li>
                      <li>• Notify us immediately of any unauthorized access</li>
                      <li>• Use strong passwords and enable two-factor authentication</li>
                      <li>• Log out from shared devices</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-600">Content Guidelines</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Ensure you have rights to upload and process content</li>
                      <li>• Do not upload illegal, harmful, or inappropriate material</li>
                      <li>• Respect intellectual property rights</li>
                      <li>• Comply with applicable laws and regulations</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-600">Prohibited Activities</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Attempting to reverse engineer our services</li>
                      <li>• Interfering with service functionality</li>
                      <li>• Sharing account access with unauthorized users</li>
                      <li>• Using services for malicious purposes</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment and Billing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Scale className="mr-3 h-6 w-6 text-orange-600" />
                    Payment and Billing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-orange-600">Pricing and Payment</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Service pricing is clearly displayed on our website</li>
                      <li>• Payment is required before service delivery</li>
                      <li>• We accept major credit cards and digital payments</li>
                      <li>• All prices are in USD unless otherwise specified</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-orange-600">Refunds and Cancellations</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Refunds available for service failures or errors</li>
                      <li>• Cancellation policies vary by service type</li>
                      <li>• Processing fees may apply to refunds</li>
                      <li>• Contact support for refund requests</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Intellectual Property */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <FileText className="mr-3 h-6 w-6 text-green-600" />
                    Intellectual Property
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">Your Content</h3>
                    <p className="text-muted-foreground mb-4">
                      You retain ownership of content you upload to our services. We only process your content 
                      to provide the requested services and do not claim ownership of your intellectual property.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">Our Services</h3>
                    <p className="text-muted-foreground mb-4">
                      UrduSpeech retains ownership of our platform, technology, and service infrastructure. 
                      Our trademarks, logos, and brand elements are protected intellectual property.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">Service Output</h3>
                    <p className="text-muted-foreground">
                      Processed content (transcriptions, translations) is delivered to you for your use. 
                      We may use anonymized data to improve our services, but never your original content.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Limitation of Liability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <XCircle className="mr-3 h-6 w-6 text-red-600" />
                    Limitation of Liability
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                    <p className="text-sm text-red-800 dark:text-red-200">
                      <strong>Important Notice:</strong> Our liability is limited to the amount paid for the specific service. 
                      We are not liable for indirect, incidental, or consequential damages.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-red-600">Service Limitations</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Services are provided "as is" without warranties</li>
                      <li>• We strive for accuracy but cannot guarantee 100% perfection</li>
                      <li>• Service availability may be affected by maintenance</li>
                      <li>• Technical issues may occasionally occur</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6">
            {/* Key Points */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-600" />
                    What You Can Do
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>Use services for legitimate purposes</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>Own your uploaded content</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>Request refunds for service issues</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>Cancel services with notice</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* What You Cannot Do */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <XCircle className="mr-2 h-5 w-5 text-red-600" />
                    What You Cannot Do
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <XCircle className="mr-2 h-4 w-4 text-red-600" />
                    <span>Share account credentials</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <XCircle className="mr-2 h-4 w-4 text-red-600" />
                    <span>Upload illegal content</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <XCircle className="mr-2 h-4 w-4 text-red-600" />
                    <span>Reverse engineer services</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <XCircle className="mr-2 h-4 w-4 text-red-600" />
                    <span>Use for malicious purposes</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5 text-blue-600" />
                    Legal Contact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Legal Department</h4>
                    <p className="text-sm text-muted-foreground">legal@urduspeech.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Terms Questions</h4>
                    <p className="text-sm text-muted-foreground">terms@urduspeech.com</p>
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
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-12 text-center"
        >
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold mb-4">Questions About Terms?</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're committed to fair and transparent terms. If you have any questions about these terms 
                or need clarification, please contact our legal team.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:legal@urduspeech.com"
                  className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  Contact Legal Team
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors"
                >
                  <Users className="mr-2 h-5 w-5" />
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