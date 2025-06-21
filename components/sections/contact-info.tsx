"use client";

import { motion } from "@/lib/motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Globe,
  Shield,
  CheckCircle,
  Star,
} from "lucide-react";
import Link from "next/link";

const contactInfo = [
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Phone",
    value: "+923057777911",
    href: "tel:+923057777911",
    description: "Call us for immediate assistance",
    primary: true,
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email",
    value: "contact@urduspeech.com",
    href: "mailto:contact@urduspeech.com",
    description: "Send us a detailed message",
    primary: false,
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Location",
    value: "Lahore, Pakistan",
    href: "#",
    description: "Serving clients worldwide",
    primary: false,
  },
];

const businessHours = [
  { day: "Monday - Friday", hours: "9:00 AM - 6:00 PM" },
  { day: "Saturday", hours: "10:00 AM - 4:00 PM" },
  { day: "Sunday", hours: "Closed" },
];

const responseTimes = [
  {
    icon: <Clock className="h-4 w-4" />,
    title: "Phone Calls",
    time: "Immediate",
    description: "Speak with our team right away",
  },
  {
    icon: <Mail className="h-4 w-4" />,
    title: "Email Response",
    time: "Within 2 hours",
    description: "Quick email replies during business hours",
  },
  {
    icon: <MessageSquare className="h-4 w-4" />,
    title: "Contact Form",
    time: "Within 4 hours",
    description: "Detailed response to your project inquiry",
  },
];

export default function ContactInfo() {
  return (
    <section className="py-20 bg-secondary/30 dark:bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
              Get in <span className="text-blue-600">Touch</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Multiple ways to reach us. We&apos;re here to help with your Urdu
              language needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={info.href}>
                  <Card
                    className={`h-full cursor-pointer transition-all duration-300 hover:scale-105 ${
                      info.primary
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                        : "hover:border-blue-300 dark:hover:border-blue-800"
                    }`}
                  >
                    <CardContent className="p-6 text-center">
                      <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                          info.primary
                            ? "bg-blue-600 text-white"
                            : "bg-blue-100 dark:bg-blue-900/30 text-blue-600"
                        }`}
                      >
                        {info.icon}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{info.title}</h3>
                      <p className="text-lg font-semibold text-blue-600 mb-2">
                        {info.value}
                      </p>
                      <p className="text-muted-foreground text-sm">
                        {info.description}
                      </p>
                      {info.primary && (
                        <Badge className="mt-3 bg-blue-600 text-white">
                          <Star className="mr-1 h-3 w-3" />
                          Recommended
                        </Badge>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Business Hours */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Business Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {businessHours.map((schedule, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center py-2 border-b border-border last:border-b-0"
                      >
                        <span className="font-medium">{schedule.day}</span>
                        <span className="text-muted-foreground">
                          {schedule.hours}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="h-4 w-4 text-blue-600" />
                      <span className="font-semibold">Global Service</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      We serve clients worldwide with flexible scheduling to
                      accommodate different time zones.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Response Times */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Response Times
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {responseTimes.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold">{item.title}</h4>
                            <Badge variant="secondary" className="text-xs">
                              {item.time}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-semibold">24/7 Support</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Emergency projects? We&apos;re available outside business
                      hours for urgent requests.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-16 text-center"
          >
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4">
                  Ready to Start Your Project?
                </h3>
                <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                  Don&apos;t wait! Contact us now and get your free
                  consultation. Our team is ready to help you with your Urdu
                  language needs.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="tel:+923057777911">
                    <Button
                      size="lg"
                      className="bg-white text-blue-600 hover:bg-gray-50"
                    >
                      <Phone className="mr-2 h-5 w-5" />
                      Call Now
                    </Button>
                  </Link>
                  <Link href="/get-started">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-blue-600"
                    >
                      Start Project
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
