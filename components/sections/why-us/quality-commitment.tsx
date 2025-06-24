"use client";

import { motion } from "@/lib/motion";
import { CheckCircle, Users, Edit, FileCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const qualityProcess = [
  {
    step: "01",
    title: "Expert Assignment",
    description:
      "Your project is matched with a native speaker who has relevant subject matter expertise.",
    icon: <Users className="h-6 w-6 text-white" />,
  },
  {
    step: "02",
    title: "Initial Draft & Peer Review",
    description:
      "The initial work is completed and then reviewed by a second expert to catch any errors and ensure consistency.",
    icon: <Edit className="h-6 w-6 text-white" />,
  },
  {
    step: "03",
    title: "Final Quality Check",
    description:
      "A senior editor performs a final review to verify accuracy, formatting, and adherence to your guidelines.",
    icon: <FileCheck className="h-6 w-6 text-white" />,
  },
  {
    step: "04",
    title: "Client Feedback & Revisions",
    description:
      "We deliver the project and remain available for any feedback or revisions to ensure your complete satisfaction.",
    icon: <CheckCircle className="h-6 w-6 text-white" />,
  },
];

export default function QualityCommitment() {
  return (
    <section className="py-20 bg-secondary/30 dark:bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
              Our Commitment to <span className="text-blue-600">Quality</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              We follow a rigorous, multi-step process to ensure every project
              meets the highest standards of quality and accuracy.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {qualityProcess.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-4 inline-block">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-600 text-white border-4 border-white dark:border-secondary">
                    {item.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center text-sm font-bold">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
