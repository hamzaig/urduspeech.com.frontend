"use client";

import { motion } from "@/lib/motion";
import { Users, Shield, Award, Globe, Heart, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const differentiators = [
  {
    icon: <Users className="h-8 w-8 text-blue-600" />,
    title: "100% Human-Powered",
    description:
      "We don't use AI. Every project is handled by native Urdu speakers, ensuring authentic, culturally-aware results that machine translation simply cannot match.",
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-600" />,
    title: "Uncompromising Quality",
    description:
      "Our multi-level quality assurance process, conducted by expert human reviewers, guarantees a minimum of 99% accuracy on all projects.",
  },
  {
    icon: <Award className="h-8 w-8 text-blue-600" />,
    title: "Certified Professionalism",
    description:
      "Our team consists of certified linguists and subject matter experts with years of experience in their respective fields, from legal to marketing.",
  },
  {
    icon: <Heart className="h-8 w-8 text-blue-600" />,
    title: "Cultural Nuance",
    description:
      "We understand that language is more than words. We preserve and adapt cultural context, idioms, and tone to resonate with your target audience.",
  },
];

export default function CoreDifferentiators() {
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
              What Sets <span className="text-blue-600">Us Apart</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Our core principles are built on a foundation of human expertise
              and a commitment to excellence.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {differentiators.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full border-0 shadow-none">
                <CardContent className="p-6 flex items-start space-x-6">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30">
                      {item.icon}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
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
