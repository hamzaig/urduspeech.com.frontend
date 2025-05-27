"use client";

import { motion } from "@/lib/motion";
import { CheckCircle, Users, Clock, Award, Globe, Headphones } from "lucide-react";

const features = [
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "High Accuracy",
    description: "Our advanced AI technology ensures 98%+ accuracy in Urdu speech recognition and transcription."
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Native Speakers",
    description: "All our services are provided by native Urdu speakers with linguistic expertise."
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Fast Turnaround",
    description: "Quick delivery times to meet your deadlines without compromising on quality."
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Certified Quality",
    description: "Our services meet international quality standards for language processing."
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: "Regional Dialects",
    description: "Support for various Urdu dialects and regional variations."
  },
  {
    icon: <Headphones className="h-6 w-6" />,
    title: "Dedicated Support",
    description: "24/7 customer support to assist you with any queries or requirements."
  }
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
              Why Choose <span className="text-blue-600">Urdu</span>Speech?
            </h2>
            <p className="text-muted-foreground text-lg">
              Our commitment to excellence and specialized Urdu language expertise sets us apart
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