"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Mic, Headphones, Languages } from "lucide-react";
import { motion } from "@/lib/motion";

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 dark:opacity-5">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/8892/pexels-photo.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-blue-600"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div 
            className="w-full lg:w-1/2 text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair leading-tight mb-6">
              Professional <span className="text-blue-600">Urdu</span> Language Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
              Transforming Urdu speech to text, providing translation services, 
              and offering comprehensive Urdu language solutions for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                Get Started
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </motion.div>

          <motion.div 
            className="w-full lg:w-1/2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 md:p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200 dark:bg-blue-900/30 rounded-full translate-x-1/2 -translate-y-1/2 blur-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/50 text-blue-600 rounded-full mb-6">
                  <Mic size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-4">
                  Urdu Speech-to-Text Services
                </h3>
                <p className="text-muted-foreground mb-6">
                  Our advanced technology converts your Urdu speech into accurate 
                  text. Perfect for transcriptions, documentation, and more.
                </p>
                
                <div className="space-y-4">
                  {["Accurate Transcription", "Fast Turnaround", "Professional Quality"].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 mt-1 rounded-full bg-blue-600 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Floating icons */}
        <motion.div 
          className="hidden lg:block absolute -left-16 top-1/3 w-32 h-32 text-blue-200 dark:text-blue-900/30 opacity-50"
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, 5, 0] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6,
            ease: "easeInOut" 
          }}
        >
          <Headphones size={128} />
        </motion.div>
        
        <motion.div 
          className="hidden lg:block absolute -right-8 bottom-10 w-24 h-24 text-blue-200 dark:text-blue-900/30 opacity-50"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, -5, 0] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 5,
            ease: "easeInOut" 
          }}
        >
          <Languages size={96} />
        </motion.div>
      </div>
    </section>
  );
}