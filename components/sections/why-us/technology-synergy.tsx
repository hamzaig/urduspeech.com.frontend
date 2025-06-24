"use client";

import { motion } from "@/lib/motion";
import { Users, Cpu, Zap } from "lucide-react";

export default function TechnologySynergy() {
  return (
    <section className="py-20 bg-secondary/30 dark:bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
              The Perfect Blend of{" "}
              <span className="text-blue-600">
                Technology & Human Expertise
              </span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6">
              While we champion the irreplaceable value of human intellect, we
              leverage technology to enhance our workflow, ensuring efficiency
              and consistency without compromising quality.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-4 mt-1">
                  <Cpu size={16} />
                </div>
                <div>
                  <h4 className="font-semibold">
                    Streamlined Project Management
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    Our custom-built platform allows for seamless project
                    submission, tracking, and communication, keeping you in the
                    loop at all times.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-4 mt-1">
                  <Zap size={16} />
                </div>
                <div>
                  <h4 className="font-semibold">Efficient Workflows</h4>
                  <p className="text-muted-foreground text-sm">
                    We use advanced tools to assist our experts with repetitive
                    tasks, allowing them to focus on what they do best:
                    providing nuanced and accurate language services.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center mr-4 mt-1">
                  <Users size={16} />
                </div>
                <div>
                  <h4 className="font-semibold">Human-in-the-Loop AI</h4>
                  <p className="text-muted-foreground text-sm">
                    We are exploring ethical AI to assist in our quality checks,
                    but a human expert always has the final say, ensuring our
                    commitment to human-powered quality.
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative h-80"
          >
            <div className="absolute inset-0 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Users className="text-blue-400 dark:text-blue-600" size={120} />
            </div>
            <div className="absolute top-1/4 left-1/4">
              <Cpu className="text-blue-300 dark:text-blue-700" size={60} />
            </div>
            <div className="absolute bottom-1/4 right-1/4">
              <Zap className="text-blue-300 dark:text-blue-700" size={60} />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
