"use client";

import { motion } from "@/lib/motion";
import { Upload, Users, CheckCircle, Download } from "lucide-react";

const processSteps = [
  {
    icon: <Upload size={28} />,
    title: "1. Submit Your Project",
    description:
      "Upload your audio, video, or text files through our secure portal with your specific requirements.",
  },
  {
    icon: <Users size={28} />,
    title: "2. Human Experts Get to Work",
    description:
      "Our qualified native Urdu speakers are assigned to your project to ensure the highest quality and cultural accuracy.",
  },
  {
    icon: <CheckCircle size={28} />,
    title: "3. Quality Assurance Review",
    description:
      "Every project undergoes a multi-level review process to guarantee 99%+ accuracy and adherence to your guidelines.",
  },
  {
    icon: <Download size={28} />,
    title: "4. Receive Your Files",
    description:
      "Get your professionally completed files on time, with ongoing support for any revisions or questions.",
  },
];

export default function HowItWorks() {
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
              How It <span className="text-blue-600">Works</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              A simple, transparent, and efficient process to get your projects
              done right.
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-700 transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative mb-4 inline-block">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600 border-4 border-white dark:border-gray-900">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
