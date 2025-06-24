"use client";

import { motion } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";

const contactMethods = [
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Call Us",
    description: "Speak directly with our team",
    action: "+923057777911",
    href: "tel:+923057777911",
    primary: true,
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Us",
    description: "Send us a detailed message",
    action: "contact@urduspeech.com",
    href: "mailto:contact@urduspeech.com",
    primary: false,
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Get Started",
    description: "Submit your project online",
    action: "Start Project",
    href: "/get-started",
    primary: false,
  },
];

export default function ContactHero() {
  return (
    <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex justify-center items-center gap-2 mb-4">
              <MessageSquare className="text-blue-600" />
              <span className="text-blue-600 font-semibold">Contact</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-6">
              Get in <span className="text-blue-600">Touch</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Ready to start your Urdu language project? We&apos;re here to help
              you choose the right service and get started today.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={method.href}>
                    <Button
                      variant={method.primary ? "default" : "outline"}
                      size="lg"
                      className={`w-full h-auto p-6 flex flex-col items-center gap-3 ${
                        method.primary
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      }`}
                    >
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600">
                        {method.icon}
                      </div>
                      <div className="text-center">
                        <div className="font-semibold text-lg">
                          {method.title}
                        </div>
                        <div className="text-sm opacity-80">
                          {method.description}
                        </div>
                        <div className="font-bold mt-1">{method.action}</div>
                      </div>
                    </Button>
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/get-started">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-lg"
                >
                  Explore Services
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
