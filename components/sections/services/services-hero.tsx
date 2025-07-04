"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { motion } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Shield, Clock, Award } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Human Experts",
    description: "Native Urdu speakers with years of experience",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Quality Guaranteed",
    description: "100% accuracy with our quality assurance process",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Fast Turnaround",
    description: "Quick delivery without compromising quality",
  },
  {
    icon: <Award className="h-6 w-6" />,
    title: "Professional Service",
    description: "Industry-standard processes and tools",
  },
];

export default function ServicesHero() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

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

  return (
    <section className="pt-40 pb-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold font-playfair mb-8">
              Professional <span className="text-blue-600">Human-Based</span>{" "}
              Urdu Services
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
              Submit Your Service Request
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground mb-10 leading-relaxed">
              Experience the difference that human expertise makes. Our native
              Urdu speakers deliver exceptional quality in every project,
              ensuring cultural accuracy and natural language flow.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                onClick={handleGetStarted}
                disabled={loading}
              >
                {loading ? "Loading..." : isAuthenticated ? "Submit Your Service Request" : "Sign Up to Submit Request"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Link href="tel:+923057777911">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-lg"
                >
                  Call Us Now
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="font-semibold text-sm md:text-base mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
