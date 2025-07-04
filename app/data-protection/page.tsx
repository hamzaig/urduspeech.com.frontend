"use client";

import { motion } from "@/lib/motion";
import { Shield, Lock, Database, Users, Eye, CheckCircle, AlertTriangle, FileText, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function DataProtectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-indigo-600 flex items-center justify-center text-white mr-4">
              <Shield className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Data Protection
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            At UrduSpeech, we are committed to protecting your data with the highest standards of security. 
            Learn how we safeguard your information across all our Urdu language services.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <Badge variant="secondary" className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200">
              <Shield className="mr-2 h-4 w-4" />
              GDPR Compliant
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              <Lock className="mr-2 h-4 w-4" />
              End-to-End Encryption
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              <Eye className="mr-2 h-4 w-4" />
              Transparent Processing
            </Badge>
          </div>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Data Protection Principles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Shield className="mr-3 h-6 w-6 text-indigo-600" />
                    Data Protection Principles
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-indigo-600">Lawful Processing</h3>
                    <p className="text-muted-foreground mb-4">
                      We process your data only for legitimate purposes such as providing Urdu language services, 
                      improving our platform, and ensuring security.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-indigo-600">Purpose Limitation</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Data is collected for specific, legitimate purposes</li>
                      <li>• We do not use data for purposes other than stated</li>
                      <li>• Clear communication about data usage</li>
                      <li>• Regular review of processing purposes</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-indigo-600">Data Minimization</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• We collect only necessary data for services</li>
                      <li>• No excessive or irrelevant data collection</li>
                      <li>• Regular data audits and cleanup</li>
                      <li>• Minimal data retention periods</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-indigo-600">Accuracy & Integrity</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Maintain accurate and up-to-date data</li>
                      <li>• Allow users to correct inaccurate information</li>
                      <li>• Implement data validation processes</li>
                      <li>• Regular data quality checks</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Security Measures */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Lock className="mr-3 h-6 w-6 text-blue-600" />
                    Security Measures
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Encryption</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• End-to-end encryption for all data transmission</li>
                      <li>• AES-256 encryption for data at rest</li>
                      <li>• TLS 1.3 for secure communications</li>
                      <li>• Encrypted backups and storage</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Access Controls</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Role-based access control (RBAC)</li>
                      <li>• Multi-factor authentication for all accounts</li>
                      <li>• Regular access reviews and audits</li>
                      <li>• Principle of least privilege</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Infrastructure Security</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Secure cloud infrastructure with SOC 2 compliance</li>
                      <li>• Regular security assessments and penetration testing</li>
                      <li>• Intrusion detection and prevention systems</li>
                      <li>• 24/7 security monitoring and incident response</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-blue-600">Data Processing Security</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Secure processing environments for audio/text</li>
                      <li>• Isolated processing containers</li>
                      <li>• Secure API endpoints with rate limiting</li>
                      <li>• Regular vulnerability assessments</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Data Processing */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Database className="mr-3 h-6 w-6 text-purple-600" />
                    Data Processing & Retention
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-600">Audio Processing</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Audio files are processed in secure environments</li>
                      <li>• Temporary storage during processing only</li>
                      <li>• Automatic deletion after transcription completion</li>
                      <li>• No permanent storage of audio content</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-600">Text Processing</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Text content processed for translation services</li>
                      <li>• Secure transmission to translation engines</li>
                      <li>• Temporary storage for quality assurance</li>
                      <li>• User-controlled retention periods</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-600">Retention Policies</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Audio files: Deleted immediately after processing</li>
                      <li>• Text content: User-defined retention (max 2 years)</li>
                      <li>• Account data: Retained while account is active</li>
                      <li>• Analytics data: Anonymized after 12 months</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-purple-600">Data Deletion</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Automatic deletion based on retention policies</li>
                      <li>• Manual deletion upon user request</li>
                      <li>• Secure deletion methods (overwriting)</li>
                      <li>• Deletion confirmation and audit trails</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* User Rights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Users className="mr-3 h-6 w-6 text-green-600" />
                    Your Data Rights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">Right to Access</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Request a copy of your personal data</li>
                      <li>• Information about data processing purposes</li>
                      <li>• Details about data recipients and retention</li>
                      <li>• Automated decision-making information</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">Right to Rectification</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Correct inaccurate personal data</li>
                      <li>• Complete incomplete information</li>
                      <li>• Update outdated information</li>
                      <li>• Request verification of corrections</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">Right to Erasure</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Request deletion of your personal data</li>
                      <li>• Remove account and associated data</li>
                      <li>• Delete uploaded content and files</li>
                      <li>• Confirm complete data removal</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-green-600">Right to Portability</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Receive your data in structured format</li>
                      <li>• Transfer data to another service</li>
                      <li>• Export account information</li>
                      <li>• Download your content and files</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* International Transfers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl">
                    <Globe className="mr-3 h-6 w-6 text-orange-600" />
                    International Data Transfers
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-orange-600">Cross-Border Processing</h3>
                    <p className="text-muted-foreground mb-4">
                      Your data may be processed in countries other than your own. We ensure adequate protection 
                      through appropriate safeguards and compliance with applicable data protection laws.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-orange-600">Safeguards</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Standard Contractual Clauses (SCCs)</li>
                      <li>• Adequacy decisions for certain countries</li>
                      <li>• Binding corporate rules where applicable</li>
                      <li>• Additional technical and organizational measures</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-orange-600">Compliance</h3>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• GDPR compliance for EU data subjects</li>
                      <li>• CCPA compliance for California residents</li>
                      <li>• Local data protection laws compliance</li>
                      <li>• Regular compliance audits and assessments</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Quick Info */}
          <div className="space-y-6">
            {/* Compliance Badges */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="mr-2 h-5 w-5 text-indigo-600" />
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

            {/* Data Rights Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Eye className="mr-2 h-5 w-5 text-green-600" />
                    Your Rights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>Access your data</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>Correct information</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>Delete your data</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>Port your data</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                    <span>Object to processing</span>
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
                    <FileText className="mr-2 h-5 w-5 text-blue-600" />
                    Data Protection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Data Protection Officer</h4>
                    <p className="text-sm text-muted-foreground">dpo@urduspeech.com</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Privacy Team</h4>
                    <p className="text-sm text-muted-foreground">privacy@urduspeech.com</p>
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
          <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold mb-4">Exercise Your Data Rights</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                We're committed to protecting your data and respecting your rights. Contact our data protection 
                team to exercise any of your rights or learn more about our data practices.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:dpo@urduspeech.com"
                  className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  <Shield className="mr-2 h-5 w-5" />
                  Contact DPO
                </a>
                <a
                  href="/privacy"
                  className="inline-flex items-center px-6 py-3 border border-indigo-600 text-indigo-600 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors"
                >
                  <FileText className="mr-2 h-5 w-5" />
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