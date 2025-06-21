"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "@/lib/motion";
import {
  Mic,
  Headphones,
  Languages,
  FileText,
  Upload,
  Download,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  Play,
  Settings,
  Users,
  Shield,
  Zap,
  UserCheck,
  MessageSquare,
  Calendar,
  Award,
} from "lucide-react";
import Link from "next/link";

export default function GetStartedPage() {
  const [activeTab, setActiveTab] = useState("transcription");

  const services = [
    {
      id: "transcription",
      title: "Manual Transcription",
      description: "Professional human transcription of Urdu audio",
      icon: Mic,
      features: [
        "100% human transcriptionists",
        "Native Urdu speakers",
        "Context-aware accuracy",
        "Professional editing included",
      ],
      steps: [
        {
          title: "Submit Audio",
          description: "Upload your Urdu audio file in any format",
          icon: Upload,
        },
        {
          title: "Human Review",
          description:
            "Our native Urdu speakers listen and transcribe manually",
          icon: Users,
        },
        {
          title: "Quality Check",
          description: "Multiple rounds of human review for accuracy",
          icon: CheckCircle,
        },
        {
          title: "Final Delivery",
          description: "Receive your professionally transcribed document",
          icon: Download,
        },
      ],
    },
    {
      id: "translation",
      title: "Human Translation",
      description:
        "Professional human translation services - From any language to Urdu and vice versa",
      icon: Languages,
      features: [
        "Native Urdu translators",
        "Cultural context preservation",
        "Subject matter experts",
        "Certified translations available",
        "Bidirectional translation (Any language ↔ Urdu)",
      ],
      steps: [
        {
          title: "Submit Document",
          description: "Upload your document for translation",
          icon: Upload,
        },
        {
          title: "Expert Assignment",
          description: "We assign your project to qualified native speakers",
          icon: UserCheck,
        },
        {
          title: "Human Translation",
          description: "Professional translators work on your content",
          icon: Languages,
        },
        {
          title: "Quality Assurance",
          description: "Multiple human reviewers ensure accuracy",
          icon: Award,
        },
      ],
      supportedLanguages: [
        "Urdu",
        "English",
        "Arabic",
        "Spanish",
        "French",
        "German",
        "Italian",
        "Portuguese",
        "Russian",
        "Chinese (Mandarin)",
        "Japanese",
        "Korean",
        "Hindi",
        "Bengali",
        "Punjabi",
        "Persian",
        "Turkish",
        "Dutch",
        "Swedish",
        "Norwegian",
        "Danish",
        "Finnish",
        "Polish",
        "Czech",
        "Slovak",
        "Hungarian",
        "Romanian",
        "Bulgarian",
        "Greek",
        "Hebrew",
        "Thai",
        "Vietnamese",
        "Indonesian",
        "Malay",
        "Filipino",
        "Swahili",
        "Amharic",
        "Yoruba",
        "Igbo",
        "Hausa",
        "Zulu",
        "Xhosa",
        "Afrikaans",
        "Dutch",
        "Flemish",
        "Catalan",
        "Basque",
        "Galician",
        "Welsh",
        "Irish",
        "Scottish Gaelic",
        "Breton",
        "Icelandic",
        "Faroese",
        "Estonian",
        "Latvian",
        "Lithuanian",
        "Albanian",
        "Macedonian",
        "Serbian",
        "Croatian",
        "Bosnian",
        "Montenegrin",
        "Slovenian",
        "Maltese",
        "Georgian",
        "Armenian",
        "Azerbaijani",
        "Kazakh",
        "Uzbek",
        "Kyrgyz",
        "Tajik",
        "Turkmen",
        "Mongolian",
        "Tibetan",
        "Nepali",
        "Sinhala",
        "Burmese",
        "Khmer",
        "Lao",
        "Malayalam",
        "Tamil",
        "Telugu",
        "Kannada",
        "Gujarati",
        "Marathi",
        "Odia",
        "Assamese",
        "Kashmiri",
        "Sindhi",
        "Pashto",
        "Dari",
        "Kurdish",
        "Balochi",
        "Saraiki",
        "Hindko",
        "Brahui",
        "Shina",
        "Balti",
        "Wakhi",
      ],
    },
    {
      id: "voice-over",
      title: "Voice-Over Services",
      description: "Professional Urdu voice-over and audio services",
      icon: Headphones,
      features: [
        "Native Urdu voice artists",
        "Professional recording studios",
        "Multiple voice options",
        "Audio editing and mixing",
      ],
      steps: [
        {
          title: "Project Consultation",
          description: "Discuss your voice-over requirements with our team",
          icon: MessageSquare,
        },
        {
          title: "Voice Artist Selection",
          description:
            "Choose from our pool of professional Urdu voice artists",
          icon: Users,
        },
        {
          title: "Professional Recording",
          description:
            "Record in our professional studio with expert direction",
          icon: Play,
        },
        {
          title: "Audio Production",
          description: "Professional editing, mixing, and final delivery",
          icon: Settings,
        },
      ],
    },
  ];

  const pricing = [
    {
      name: "Standard",
      price: "$2.50",
      unit: "per minute",
      description: "Perfect for basic transcription needs",
      features: [
        "Human transcription",
        "Basic editing",
        "48-hour turnaround",
        "Email support",
        "Standard accuracy",
      ],
    },
    {
      name: "Professional",
      price: "$4.00",
      unit: "per minute",
      description: "Ideal for business and professional use",
      features: [
        "Expert human transcription",
        "Professional editing",
        "24-hour turnaround",
        "Priority support",
        "High accuracy guarantee",
        "Multiple format options",
      ],
      popular: true,
    },
    {
      name: "Premium",
      price: "$6.00",
      unit: "per minute",
      description: "For critical and time-sensitive projects",
      features: [
        "Senior expert transcription",
        "Dedicated project manager",
        "Same-day turnaround",
        "24/7 support",
        "Highest accuracy guarantee",
        "Custom formatting",
      ],
    },
  ];

  const whyChooseUs = [
    {
      icon: Users,
      title: "Native Urdu Speakers",
      description:
        "All our transcriptionists and translators are native Urdu speakers with deep cultural understanding",
    },
    {
      icon: Award,
      title: "Professional Expertise",
      description:
        "Years of experience in Urdu language services with proven track record",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description:
        "100% human review process ensures the highest quality and accuracy",
    },
    {
      icon: Clock,
      title: "Reliable Turnaround",
      description:
        "Consistent delivery times with clear communication throughout the process",
    },
  ];

  const trialServices = [
    {
      service: "Transcription Trial",
      duration: "1 minute of audio",
      description: "Free trial transcription of your Urdu audio file",
      icon: Mic,
      features: [
        "Native speaker transcription",
        "Professional quality",
        "Quick turnaround",
        "No obligation",
      ],
    },
    {
      service: "Translation Trial",
      duration: "100 words",
      description:
        "Free trial translation from any language to Urdu or vice versa",
      icon: Languages,
      features: [
        "Certified translator",
        "Cultural accuracy",
        "Professional formatting",
        "Quality assurance",
      ],
    },
    {
      service: "Voice-Over Trial",
      duration: "30 seconds",
      description: "Free trial voice-over recording in Urdu",
      icon: Headphones,
      features: [
        "Professional voice artist",
        "Studio quality",
        "Multiple voice options",
        "Quick delivery",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-4">
              Professional Human Services
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair leading-tight mb-6">
              Expert <span className="text-blue-600">Human</span> Urdu Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Professional native Urdu speakers providing manual transcription,
              translation, and voice-over services with guaranteed quality and
              accuracy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Human Services?
            </h2>
            <p className="text-lg text-muted-foreground">
              Experience the difference that human expertise makes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg mb-4 mx-auto">
                      <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Trial Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-4">
              Free Trial Available
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Try Our Services Free
            </h2>
            <p className="text-lg text-muted-foreground">
              Experience our quality with free trials - no obligation, no
              commitment
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {trialServices.map((trial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-2 border-blue-200 dark:border-blue-800">
                  <CardHeader className="text-center">
                    <div className="flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full mb-4 mx-auto">
                      <trial.icon className="w-8 h-8 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">{trial.service}</CardTitle>
                    <div className="flex items-center justify-center gap-2">
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700 border-green-200"
                      >
                        FREE TRIAL
                      </Badge>
                      <Badge variant="secondary">{trial.duration}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center mb-4">
                      {trial.description}
                    </p>
                    <ul className="space-y-2 mb-6">
                      {trial.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2 text-sm"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="#contact">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                        Start Free Trial
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 border-green-200 dark:border-green-800">
              <CardContent className="pt-6 pb-6">
                <div className="flex items-center justify-center gap-2 mb-3">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-semibold text-green-800 dark:text-green-200">
                    One-Time Free Trial Per Service
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Each customer can avail one free trial per service. No hidden
                  charges, no commitment required.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Services Tabs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Human-Based Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Professional services delivered by native Urdu speakers
            </p>
          </motion.div>

          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3 mb-8">
              {services.map((service) => (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className="flex items-center gap-2"
                >
                  <service.icon className="w-4 h-4" />
                  {service.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {services.map((service) => (
              <TabsContent
                key={service.id}
                value={service.id}
                className="space-y-8"
              >
                <motion.div
                  className="grid lg:grid-cols-2 gap-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Service Overview */}
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg flex items-center justify-center">
                          <service.icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <CardTitle className="text-2xl">
                            {service.title}
                          </CardTitle>
                          <CardDescription>
                            {service.description}
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <h4 className="font-semibold text-lg">Key Features:</h4>
                        <ul className="space-y-2">
                          {service.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Supported Languages for Translation */}
                        {service.id === "translation" &&
                          service.supportedLanguages && (
                            <div className="mt-6">
                              <h4 className="font-semibold text-lg mb-3">
                                Supported Languages (100+ Languages):
                              </h4>
                              <p className="text-sm text-muted-foreground mb-3">
                                We provide professional translation services
                                from all these languages to Urdu and from Urdu
                                to all these languages.
                              </p>
                              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                                {service.supportedLanguages.map(
                                  (language, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800 rounded"
                                    >
                                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                      <span>{language}</span>
                                    </div>
                                  )
                                )}
                              </div>
                              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                                  🔄 Bidirectional Translation Available
                                </p>
                                <p className="text-xs text-blue-700 dark:text-blue-300">
                                  Any language ↔ Urdu translation with native
                                  speakers and certified translators
                                </p>
                              </div>
                              <p className="text-xs text-muted-foreground mt-3">
                                * All translations are performed by native
                                speakers and certified translators
                              </p>
                            </div>
                          )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Process Steps */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold">Our Human Process</h3>
                    <div className="space-y-4">
                      {service.steps.map((step, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                            <step.icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">
                              {index + 1}. {step.title}
                            </h4>
                            <p className="text-muted-foreground text-sm">
                              {step.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transparent Human Service Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Fair pricing for professional human expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricing.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card
                  className={`h-full ${
                    plan.popular ? "ring-2 ring-blue-600" : ""
                  }`}
                >
                  {plan.popular && (
                    <div className="bg-blue-600 text-white text-center py-2 rounded-t-lg">
                      <Badge
                        variant="secondary"
                        className="bg-white text-blue-600"
                      >
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">
                        /{plan.unit}
                      </span>
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href="#contact">
                      <Button
                        className={`w-full ${
                          plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""
                        }`}
                        variant={plan.popular ? "default" : "outline"}
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardContent className="pt-12 pb-12">
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 mx-auto">
                  <Users className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Work with Human Experts?
                </h2>
                <p className="text-lg mb-8 opacity-90">
                  Experience the quality and accuracy that only native Urdu
                  speakers can provide.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/get-started">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="bg-white text-blue-600 hover:bg-gray-100"
                    >
                      Start Your Project
                    </Button>
                  </Link>
                  <Link href="#contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10"
                    >
                      Contact Our Team
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
