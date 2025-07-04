"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { motion } from "@/lib/motion";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mic,
  Languages,
  FileText,
  BookOpen,
  VideoIcon,
  FileEdit,
  CheckCircle,
  Clock,
  Users,
  Star,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: <Mic size={28} />,
    title: "Urdu Speech-to-Text",
    description:
      "Convert spoken Urdu to accurate written text with our advanced human-powered speech recognition service.",
    features: [
      "Native Urdu speakers for accurate transcription",
      "Handles various accents and dialects",
      "Real-time processing capabilities",
      "Quality assurance by language experts",
    ],
    useCases: ["Interviews", "Meetings", "Podcasts", "Voice notes"],
    turnaround: "2-24 hours",
    accuracy: "99%+",
    badge: "Most Popular",
    serviceType: "speech-to-text",
  },
  {
    icon: <Languages size={28} />,
    title: "Urdu Translation",
    description:
      "Professional translation services between Urdu and multiple languages with cultural context preservation.",
    features: [
      "Native bilingual translators",
      "Cultural context preservation",
      "Industry-specific terminology",
      "Multiple language pairs supported",
    ],
    useCases: ["Documents", "Websites", "Marketing materials", "Legal texts"],
    turnaround: "1-3 days",
    accuracy: "100%",
    badge: "Certified",
    serviceType: "translation",
  },
  {
    icon: <FileText size={28} />,
    title: "Urdu Transcription",
    description:
      "Detailed transcription of Urdu audio and video content with timestamps and speaker identification.",
    features: [
      "Speaker identification and timestamps",
      "Background noise handling",
      "Multiple audio format support",
      "Professional editing and proofreading",
    ],
    useCases: ["Video content", "Audio recordings", "Interviews", "Lectures"],
    turnaround: "1-2 days",
    accuracy: "99%+",
    badge: "Fast Delivery",
    serviceType: "transcription",
  },
  {
    icon: <BookOpen size={28} />,
    title: "Urdu Content Creation",
    description:
      "Native Urdu content creation services for websites, marketing materials, and documentation.",
    features: [
      "SEO-optimized content",
      "Creative writing expertise",
      "Brand voice consistency",
      "Cultural relevance",
    ],
    useCases: [
      "Blog posts",
      "Marketing copy",
      "Product descriptions",
      "Social media",
    ],
    turnaround: "2-5 days",
    accuracy: "100%",
    badge: "Creative",
    serviceType: "content-creation",
  },
  {
    icon: <VideoIcon size={28} />,
    title: "Urdu Subtitling",
    description:
      "Professional Urdu subtitling services for videos, films, and multimedia content with perfect timing.",
    features: [
      "Perfect timing synchronization",
      "Cultural adaptation",
      "Multiple subtitle formats",
      "Quality review process",
    ],
    useCases: [
      "YouTube videos",
      "Films",
      "Educational content",
      "Corporate videos",
    ],
    turnaround: "2-3 days",
    accuracy: "100%",
    badge: "Precise",
    serviceType: "subtitling",
  },
  {
    icon: <FileEdit size={28} />,
    title: "Urdu Proofreading",
    description:
      "Expert proofreading and editing services for Urdu documents, ensuring perfect grammar and style.",
    features: [
      "Grammar and spelling correction",
      "Style and tone improvement",
      "Consistency checking",
      "Format optimization",
    ],
    useCases: ["Academic papers", "Business documents", "Books", "Articles"],
    turnaround: "1-2 days",
    accuracy: "100%",
    badge: "Expert",
    serviceType: "proofreading",
  },
];

export default function ServicesList() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const handleServiceClick = (serviceType: string) => {
    if (loading) return;
    
    if (isAuthenticated) {
      // If user is authenticated, redirect to submit service page
      router.push(`/submit-service?service=${serviceType}`);
    } else {
      // If user is not authenticated, redirect to login with return URL
      router.push(`/login?redirect=/submit-service?service=${serviceType}`);
    }
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
              Our <span className="text-blue-600">Human-Based</span> Services
            </h2>
            <p className="text-muted-foreground text-lg">
              Every service is delivered by native Urdu speakers with years of
              experience, ensuring the highest quality and cultural accuracy.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="h-full"
            >
              <Card className="h-full transition-all duration-300 hover:shadow-xl border border-border hover:border-blue-300 dark:hover:border-blue-800 relative overflow-hidden">
                {service.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-blue-600 text-white">
                      {service.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                      {service.icon}
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-bold">
                        {service.title}
                      </CardTitle>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {service.turnaround}
                        </div>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          {service.accuracy}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <CardDescription className="text-base text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-600" />
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="text-sm text-muted-foreground flex items-start"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 mr-2 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3 flex items-center">
                      <Users className="h-4 w-4 mr-2 text-blue-600" />
                      Perfect For
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {service.useCases.map((useCase, useCaseIndex) => (
                        <Badge
                          key={useCaseIndex}
                          variant="secondary"
                          className="text-xs"
                        >
                          {useCase}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="pt-4">
                    <Button 
                      onClick={() => handleServiceClick(service.serviceType)}
                      disabled={loading}
                      className="w-full transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      {loading ? "Loading..." : isAuthenticated ? "Get Started" : "Sign Up to Start"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
