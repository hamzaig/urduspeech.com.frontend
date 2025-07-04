"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mic, Headphones, Languages, Check, Star } from "lucide-react";
import { motion } from "@/lib/motion";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGetStarted = () => {
    if (loading) return;
    
    if (isAuthenticated) {
      // If user is authenticated, redirect to submit service page
      router.push("/submit-service");
    } else {
      // If user is not authenticated, redirect to login with return URL
      router.push("/login?redirect=/submit-service");
    }
  };

  if (!mounted) return null;

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="secondary"
              className="mb-4 text-sm font-medium py-1 px-3"
            >
              <Star className="w-4 h-4 mr-2 text-yellow-400 fill-current" />
              99%+ Accuracy with Human-Powered Services
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair leading-tight mb-6">
              High-Quality <span className="text-blue-600">Urdu</span> Language
              Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Get fast, accurate, and culturally-aware Urdu speech-to-text,
              translation, and transcription services, all powered by native
              human experts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                onClick={handleGetStarted}
                disabled={loading}
              >
                {loading ? "Loading..." : isAuthenticated ? "Get Started" : "Sign Up to Start"}
              </Button>
              <Link href="/services">
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-3 text-lg"
                >
                  Explore Services
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Trusted by researchers, businesses, and content creators
              worldwide.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Floating icons */}
      <motion.div
        className="hidden lg:block absolute -left-16 top-1/3 w-32 h-32 text-blue-200 dark:text-blue-900/30 opacity-10"
        animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
      >
        <Headphones size={128} />
      </motion.div>
      <motion.div
        className="hidden lg:block absolute -right-8 bottom-10 w-24 h-24 text-blue-200 dark:text-blue-900/30 opacity-10"
        animate={{ y: [0, -15, 0], rotate: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
      >
        <Languages size={96} />
      </motion.div>
    </section>
  );
}
