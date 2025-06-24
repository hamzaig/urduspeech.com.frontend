"use client";

import { motion } from "@/lib/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  FileText,
  Users,
  CheckCircle,
  Download,
  Clock,
  Shield,
  Award,
} from "lucide-react";

const processSteps = [
  {
    step: "01",
    icon: <MessageSquare size={24} />,
    title: "Initial Consultation",
    description:
      "We discuss your project requirements, timeline, and specific needs to ensure perfect alignment.",
    details: [
      "Free consultation call",
      "Project scope definition",
      "Timeline and pricing discussion",
      "Service selection guidance",
    ],
    duration: "15-30 minutes",
  },
  {
    step: "02",
    icon: <FileText size={24} />,
    title: "Project Submission",
    description:
      "Submit your files or content through our secure platform with detailed instructions.",
    details: [
      "Secure file upload",
      "Detailed instructions",
      "Format specifications",
      "Quality requirements",
    ],
    duration: "5-10 minutes",
  },
  {
    step: "03",
    icon: <Users size={24} />,
    title: "Human Expert Assignment",
    description:
      "Your project is assigned to a qualified native Urdu speaker with relevant expertise.",
    details: [
      "Expert matching",
      "Background verification",
      "Specialization alignment",
      "Quality standards review",
    ],
    duration: "1-2 hours",
  },
  {
    step: "04",
    icon: <CheckCircle size={24} />,
    title: "Quality Assurance",
    description:
      "Multiple rounds of review ensure accuracy, cultural appropriateness, and professional standards.",
    details: [
      "Primary expert review",
      "Secondary quality check",
      "Cultural accuracy verification",
      "Final approval process",
    ],
    duration: "Varies by project",
  },
  {
    step: "05",
    icon: <Download size={24} />,
    title: "Delivery & Support",
    description:
      "Receive your completed project with ongoing support for any revisions or questions.",
    details: [
      "Secure delivery",
      "Revision support",
      "Post-delivery assistance",
      "Quality guarantee",
    ],
    duration: "Immediate",
  },
];

const guarantees = [
  {
    icon: <Shield size={20} />,
    title: "100% Accuracy",
    description: "Guaranteed accuracy with free revisions",
  },
  {
    icon: <Clock size={20} />,
    title: "On-Time Delivery",
    description: "Meet deadlines or get a discount",
  },
  {
    icon: <Award size={20} />,
    title: "Quality Assured",
    description: "Multiple review rounds for perfection",
  },
];

export default function ServicesProcess() {
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
              How Our <span className="text-blue-600">Human-Based</span> Process
              Works
            </h2>
            <p className="text-muted-foreground text-lg">
              Our streamlined process ensures quality, transparency, and
              satisfaction at every step.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="h-full text-center transition-all duration-300 hover:shadow-lg border border-border hover:border-blue-300 dark:hover:border-blue-800">
                <CardHeader className="pb-4">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                        {step.icon}
                      </div>
                      <Badge className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs">
                        {step.step}
                      </Badge>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold mb-2">
                    {step.title}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground mb-3">
                    {step.description}
                  </p>
                  <div className="text-xs text-blue-600 font-medium">
                    Duration: {step.duration}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-1 text-left">
                    {step.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className="text-xs text-muted-foreground flex items-start"
                      >
                        <div className="w-1 h-1 rounded-full bg-blue-600 mt-1.5 mr-2 flex-shrink-0" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Connection lines for desktop */}
        <div className="hidden lg:block relative mb-16">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 transform -translate-y-1/2"></div>
        </div>

        {/* Guarantees Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold font-playfair mb-8">
            Our <span className="text-blue-600">Guarantees</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guarantees.map((guarantee, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="text-center p-6 border border-border hover:border-blue-300 dark:hover:border-blue-800 transition-all duration-300">
                  <div className="flex justify-center mb-4">
                    <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 flex items-center justify-center">
                      {guarantee.icon}
                    </div>
                  </div>
                  <h4 className="font-semibold mb-2">{guarantee.title}</h4>
                  <p className="text-sm text-muted-foreground">
                    {guarantee.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
