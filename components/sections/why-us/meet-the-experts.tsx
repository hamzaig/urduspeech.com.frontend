"use client";

import { motion } from "@/lib/motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, Mic, Languages } from "lucide-react";

const experts = [
  {
    name: "Ayesha Khan",
    title: "Lead Translator & Linguist",
    avatar: "AK",
    specialties: ["Legal Translation", "Literary Analysis"],
    experience: "12+ years",
    icon: <Languages className="h-5 w-5" />,
  },
  {
    name: "Bilal Ahmed",
    title: "Senior Transcriptionist",
    avatar: "BA",
    specialties: ["Medical Transcription", "Dialect Coaching"],
    experience: "10+ years",
    icon: <Mic className="h-5 w-5" />,
  },
  {
    name: "Fatima Noor",
    title: "Content & SEO Strategist",
    avatar: "FN",
    specialties: ["SEO Writing", "Brand Storytelling"],
    experience: "8+ years",
    icon: <BookOpen className="h-5 w-5" />,
  },
];

export default function MeetTheExperts() {
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
              Meet Our <span className="text-blue-600">Experts</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Our team is composed of passionate, experienced professionals
              dedicated to the art and science of language.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {experts.map((expert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="text-center bg-gray-50 dark:bg-gray-800/50 p-8 rounded-lg h-full">
                <Avatar className="h-24 w-24 mx-auto mb-4 border-4 border-white shadow-lg">
                  <AvatarFallback className="text-3xl bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                    {expert.avatar}
                  </AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">{expert.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 mb-4">
                  {expert.title}
                </p>

                <div className="text-sm text-muted-foreground mb-4">
                  <span className="font-semibold">Experience:</span>{" "}
                  {expert.experience}
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {expert.specialties.map((spec, i) => (
                    <Badge key={i} variant="secondary">
                      {spec}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
