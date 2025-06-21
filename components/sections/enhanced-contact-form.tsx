"use client";

import { useState } from "react";
import { motion } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Send, Clock, Shield, Users, Phone } from "lucide-react";

const services = [
  "Speech-to-Text",
  "Translation",
  "Transcription",
  "Content Creation",
  "Subtitling",
  "Proofreading",
];

const urgencyOptions = [
  {
    value: "standard",
    label: "Standard (3-5 days)",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    value: "rush",
    label: "Rush (24-48 hours)",
    icon: <Clock className="h-4 w-4" />,
  },
  {
    value: "express",
    label: "Express (Same day)",
    icon: <Clock className="h-4 w-4" />,
  },
];

export default function EnhancedContactForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [urgency, setUrgency] = useState("standard");

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
              Send Us a <span className="text-blue-600">Message</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Tell us about your project and we&apos;ll get back to you with a
              personalized quote
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Card className="border border-border hover:border-blue-300 dark:hover:border-blue-800">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5 text-blue-600" />
                    Project Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input
                          id="company"
                          placeholder="Enter your company name"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Services Needed *</Label>
                      <div className="flex flex-wrap gap-2">
                        {services.map((service) => (
                          <Badge
                            key={service}
                            variant={
                              selectedServices.includes(service)
                                ? "default"
                                : "outline"
                            }
                            className={`cursor-pointer transition-colors ${
                              selectedServices.includes(service)
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            }`}
                            onClick={() => toggleService(service)}
                          >
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Project Urgency</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {urgencyOptions.map((option) => (
                          <div
                            key={option.value}
                            className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                              urgency === option.value
                                ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                                : "border-border hover:border-blue-300"
                            }`}
                            onClick={() => setUrgency(option.value)}
                          >
                            <div className="flex items-center gap-2">
                              {option.icon}
                              <span className="text-sm font-medium">
                                {option.label}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Project Details *</Label>
                      <Textarea
                        id="message"
                        placeholder="Describe your project, requirements, timeline, and any specific needs..."
                        rows={6}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Budget Range (Optional)</Label>
                      <select
                        id="budget"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-100">Under $100</option>
                        <option value="100-500">$100 - $500</option>
                        <option value="500-1000">$500 - $1,000</option>
                        <option value="1000-5000">$1,000 - $5,000</option>
                        <option value="over-5000">Over $5,000</option>
                        <option value="custom">Custom Quote</option>
                      </select>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Why Choose Us?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-semibold">Native Speakers</h4>
                        <p className="text-sm text-muted-foreground">
                          100% human-powered by native Urdu speakers
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-semibold">Quality Guaranteed</h4>
                        <p className="text-sm text-muted-foreground">
                          99%+ accuracy with unlimited revisions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-semibold">Fast Turnaround</h4>
                        <p className="text-sm text-muted-foreground">
                          Quick delivery without compromising quality
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Free Consultation
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Get a free consultation and quote for your project. No
                    obligation, no pressure.
                  </p>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <Phone className="mr-2 h-4 w-4" />
                    Call Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
