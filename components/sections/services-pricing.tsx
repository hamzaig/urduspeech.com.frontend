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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star, Clock, Users, Shield } from "lucide-react";
import Link from "next/link";

const pricingPlans = [
  {
    name: "Basic",
    description: "Perfect for small projects and quick turnaround needs",
    price: "Starting at $0.10",
    unit: "per word",
    features: [
      "Native Urdu speakers",
      "Standard turnaround time",
      "Basic quality check",
      "Email support",
      "1 revision included",
    ],
    popular: false,
    icon: <Clock size={24} />,
  },
  {
    name: "Professional",
    description: "Our most popular choice for business and academic projects",
    price: "Starting at $0.15",
    unit: "per word",
    features: [
      "Expert native speakers",
      "Fast turnaround time",
      "Comprehensive quality check",
      "Priority support",
      "Unlimited revisions",
      "Cultural accuracy guarantee",
      "Format optimization",
    ],
    popular: true,
    icon: <Users size={24} />,
  },
  {
    name: "Premium",
    description:
      "For critical projects requiring the highest level of expertise",
    price: "Starting at $0.25",
    unit: "per word",
    features: [
      "Senior expert speakers",
      "Express turnaround time",
      "Multi-level quality assurance",
      "Dedicated project manager",
      "Unlimited revisions",
      "Cultural accuracy guarantee",
      "Format optimization",
      "SEO optimization (content)",
      "Certification available",
    ],
    popular: false,
    icon: <Shield size={24} />,
  },
];

const servicePricing = [
  {
    service: "Speech-to-Text",
    basic: "$0.08/min",
    professional: "$0.12/min",
    premium: "$0.18/min",
    note: "Audio quality affects pricing",
  },
  {
    service: "Translation",
    basic: "$0.10/word",
    professional: "$0.15/word",
    premium: "$0.25/word",
    note: "Technical content may cost more",
  },
  {
    service: "Transcription",
    basic: "$0.08/min",
    professional: "$0.12/min",
    premium: "$0.18/min",
    note: "Speaker identification included",
  },
  {
    service: "Content Creation",
    basic: "$0.15/word",
    professional: "$0.25/word",
    premium: "$0.40/word",
    note: "Research and SEO included",
  },
  {
    service: "Subtitling",
    basic: "$0.12/min",
    professional: "$0.18/min",
    premium: "$0.25/min",
    note: "Timing and formatting included",
  },
  {
    service: "Proofreading",
    basic: "$0.05/word",
    professional: "$0.08/word",
    premium: "$0.12/word",
    note: "Style and grammar check",
  },
];

export default function ServicesPricing() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

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
              Transparent <span className="text-blue-600">Pricing</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Fair and competitive pricing for our human-based services. No
              hidden fees, no surprises.
            </p>
          </motion.div>
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card
                className={`h-full relative transition-all duration-300 hover:shadow-xl border-2 ${
                  plan.popular
                    ? "border-blue-600 shadow-lg scale-105"
                    : "border-border hover:border-blue-300 dark:hover:border-blue-800"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-6">
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                      {plan.icon}
                    </div>
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-blue-600">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      {plan.unit}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4">
                    <Link href="/get-started">
                      <Button
                        className={`w-full ${
                          plan.popular
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-secondary hover:bg-secondary/80"
                        }`}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Service-Specific Pricing Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold font-playfair mb-8">
            Service-Specific <span className="text-blue-600">Pricing</span>
          </h3>
        </motion.div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 font-semibold">Service</th>
                <th className="text-center p-4 font-semibold">Basic</th>
                <th className="text-center p-4 font-semibold">Professional</th>
                <th className="text-center p-4 font-semibold">Premium</th>
                <th className="text-left p-4 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody>
              {servicePricing.map((service, index) => (
                <tr
                  key={index}
                  className="border-b border-border hover:bg-secondary/30 transition-colors"
                >
                  <td className="p-4 font-medium">{service.service}</td>
                  <td className="p-4 text-center text-blue-600 font-semibold">
                    {service.basic}
                  </td>
                  <td className="p-4 text-center text-blue-600 font-semibold">
                    {service.professional}
                  </td>
                  <td className="p-4 text-center text-blue-600 font-semibold">
                    {service.premium}
                  </td>
                  <td className="p-4 text-sm text-muted-foreground">
                    {service.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-12 text-center"
        >
          <div className="bg-secondary/30 dark:bg-muted/10 rounded-lg p-8 max-w-4xl mx-auto">
            <h4 className="text-xl font-semibold mb-4">Need a Custom Quote?</h4>
            <p className="text-muted-foreground mb-6">
              For large projects, bulk orders, or special requirements, we offer
              custom pricing. Contact us for a personalized quote.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Get Custom Quote
                </Button>
              </Link>
              <Link href="tel:+923057777911">
                <Button variant="outline">Call for Pricing</Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
