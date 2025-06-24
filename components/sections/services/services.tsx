"use client";

import { useState } from "react";
import { motion } from "@/lib/motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Mic,
  Languages,
  FileText,
  BookOpen,
  VideoIcon,
  FileEdit,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  {
    icon: <Mic size={24} />,
    title: "Urdu Speech-to-Text",
    description:
      "Convert spoken Urdu to accurate written text with our advanced speech recognition technology.",
  },
  {
    icon: <Languages size={24} />,
    title: "Urdu Translation",
    description:
      "Professional translation services between Urdu and multiple languages including English, Arabic, and more.",
  },
  {
    icon: <FileText size={24} />,
    title: "Urdu Transcription",
    description:
      "Detailed transcription of Urdu audio and video content with excellent accuracy and fast turnaround.",
  },
  {
    icon: <BookOpen size={24} />,
    title: "Urdu Content Creation",
    description:
      "Native Urdu content creation services for websites, marketing materials, and documentation.",
  },
  {
    icon: <VideoIcon size={24} />,
    title: "Urdu Subtitling",
    description:
      "Professional Urdu subtitling services for videos, films, and multimedia content.",
  },
  {
    icon: <FileEdit size={24} />,
    title: "Urdu Proofreading",
    description:
      "Expert proofreading and editing services for Urdu documents, ensuring perfect grammar and style.",
  },
];

export default function Services() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="services" className="py-20 bg-secondary/30 dark:bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
              Our <span className="text-blue-600">Urdu</span> Services
            </h2>
            <p className="text-muted-foreground text-lg">
              Comprehensive Urdu language solutions tailored to meet your
              specific needs
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <Card className="h-full transition-all duration-300 hover:shadow-lg border border-border hover:border-blue-300 dark:hover:border-blue-800">
                <CardHeader>
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 mb-4">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/services">
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
            >
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
