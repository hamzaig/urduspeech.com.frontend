"use client";

import Link from "next/link";
import { motion } from "@/lib/motion";
import { Phone, Mail, MapPin, Mic, ChevronRight, Facebook, Twitter, Instagram, Linkedin, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function Footer() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Handle theme mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
                <Mic className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl">
                <span className="text-blue-600">Urdu</span>Speech
              </span>
            </div>
            <p className="text-muted-foreground mb-6">
              Professional Urdu language services including speech-to-text, translation, transcription, and more.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="rounded-full border-blue-200 dark:border-blue-800 text-blue-600">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-blue-200 dark:border-blue-800 text-blue-600">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-blue-200 dark:border-blue-800 text-blue-600">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-blue-200 dark:border-blue-800 text-blue-600">
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-bold mb-6">Services</h4>
            <ul className="space-y-3">
              {[
                { label: "Urdu Speech-to-Text", href: "#services" },
                { label: "Urdu Translation", href: "#services" },
                { label: "Urdu Transcription", href: "#services" },
                { label: "Urdu Content Creation", href: "#services" },
                { label: "Urdu Subtitling", href: "#services" },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="flex items-center text-muted-foreground hover:text-blue-600 transition-colors"
                  >
                    <ChevronRight className="mr-2 h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "#features" },
                { label: "Testimonials", href: "#testimonials" },
                { label: "FAQ", href: "#faq" },
                { label: "Contact", href: "#contact" },
              ].map((link, index) => (
                <li key={index}>
                  <Link 
                    href={link.href} 
                    className="flex items-center text-muted-foreground hover:text-blue-600 transition-colors"
                  >
                    <ChevronRight className="mr-2 h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li>
                <Link href="tel:+923057777911" className="flex items-start space-x-3 text-muted-foreground hover:text-blue-600 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <Phone className="h-4 w-4" />
                  </div>
                  <span>+923057777911</span>
                </Link>
              </li>
              <li>
                <Link href="mailto:contact@urduspeech.com" className="flex items-start space-x-3 text-muted-foreground hover:text-blue-600 transition-colors">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <Mail className="h-4 w-4" />
                  </div>
                  <span>contact@urduspeech.com</span>
                </Link>
              </li>
              <li>
                <div className="flex items-start space-x-3 text-muted-foreground">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <span>Lahore, Pakistan</span>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground mb-4 md:mb-0">
              © {new Date().getFullYear()} UrduSpeech. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                aria-label="Toggle theme"
                className="text-muted-foreground"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
                <span className="ml-2 text-sm">
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}