"use client";

import { motion } from "@/lib/motion";
import { Users, CheckCircle, Award, Globe, Heart, Zap } from "lucide-react";

const features = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "100% Human-Powered",
    description:
      "Our services are exclusively delivered by native Urdu speakers, ensuring authentic and culturally-aware results that AI cannot replicate.",
  },
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "99%+ Accuracy Guaranteed",
    description:
      "We guarantee the highest level of accuracy through a multi-level quality assurance process conducted by expert human reviewers.",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Certified Professional Quality",
    description:
      "Our team consists of certified professionals with years of experience in their respective fields, from translation to content creation.",
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Comprehensive Dialect Support",
    description:
      "We understand the nuances of the Urdu language, providing full support for regional dialects and local variations.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Cultural Context Preservation",
    description:
      "Our human experts ensure that all content is not just translated, but also culturally adapted to resonate with your target audience.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Fast & Reliable Turnaround",
    description:
      "Get your projects delivered on time, every time, with efficient workflows and dedicated project management.",
  },
];

export default function Features() {
  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
              Why Choose Our <span className="text-blue-600">Human-Based</span>{" "}
              Services?
            </h2>
            <p className="text-muted-foreground text-lg">
              Our commitment to human expertise ensures unparalleled quality,
              accuracy, and cultural relevance.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex items-start space-x-4"
            >
              <div className="flex-shrink-0 mt-1">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                  {feature.icon}
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
