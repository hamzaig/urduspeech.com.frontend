"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { motion } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  Phone,
  MessageSquare,
  Clock,
  CheckCircle,
  Star,
} from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    icon: <CheckCircle className="h-6 w-6" />,
    title: "100% Human Quality",
    description: "Every project handled by native Urdu speakers",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Fast Turnaround",
    description: "Quick delivery without compromising quality",
  },
  {
    icon: <Star className="h-6 w-6" />,
    title: "Satisfaction Guaranteed",
    description: "Unlimited revisions until you're completely satisfied",
  },
];

export default function ServicesCTA() {
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

  const contactMethods = [
    {
      icon: <Phone className="h-5 w-5" />,
      title: "Call Us",
      description: "Speak directly with our team",
      action: "+923057777911",
      href: "tel:+923057777911",
      primary: true,
      onClick: null,
    },
    {
      icon: <MessageSquare className="h-5 w-5" />,
      title: "Get Started",
      description: "Submit your project online",
      action: loading ? "Loading..." : isAuthenticated ? "Start Project" : "Sign Up to Start",
      href: "#",
      primary: false,
      onClick: handleGetStarted,
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold font-playfair mb-6">
              Ready to Experience{" "}
              <span className="text-yellow-300">Human-Based</span> Quality?
            </h2>
            <p className="text-xl md:text-2xl text-blue-100 mb-12 leading-relaxed">
              Join hundreds of satisfied clients who trust us with their Urdu
              language needs. Get started today and see the difference human
              expertise makes.
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 text-white">
                  <CardContent className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                        {benefit.icon}
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-blue-100">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Methods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              >
                {method.onClick ? (
                  <Card
                    className={`h-full transition-all duration-300 hover:scale-105 cursor-pointer ${
                      method.primary
                        ? "bg-white text-blue-600 hover:bg-gray-50"
                        : "bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                    }`}
                    onClick={method.onClick}
                  >
                    <CardContent className="p-8 text-center">
                      <div className="flex justify-center mb-4">
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center ${
                            method.primary
                              ? "bg-blue-600 text-white"
                              : "bg-white/20 text-white"
                          }`}
                        >
                          {method.icon}
                        </div>
                      </div>
                      <h3 className="font-semibold text-xl mb-2">
                        {method.title}
                      </h3>
                      <p
                        className={`mb-4 ${
                          method.primary ? "text-gray-600" : "text-blue-100"
                        }`}
                      >
                        {method.description}
                      </p>
                      <Button
                        className={`w-full ${
                          method.primary
                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                            : "bg-white text-blue-600 hover:bg-gray-50"
                        }`}
                        disabled={loading}
                      >
                        {method.action}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <Link href={method.href}>
                    <Card
                      className={`h-full transition-all duration-300 hover:scale-105 cursor-pointer ${
                        method.primary
                          ? "bg-white text-blue-600 hover:bg-gray-50"
                          : "bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                      }`}
                    >
                      <CardContent className="p-8 text-center">
                        <div className="flex justify-center mb-4">
                          <div
                            className={`w-16 h-16 rounded-full flex items-center justify-center ${
                              method.primary
                                ? "bg-blue-600 text-white"
                                : "bg-white/20 text-white"
                            }`}
                          >
                            {method.icon}
                          </div>
                        </div>
                        <h3 className="font-semibold text-xl mb-2">
                          {method.title}
                        </h3>
                        <p
                          className={`mb-4 ${
                            method.primary ? "text-gray-600" : "text-blue-100"
                          }`}
                        >
                          {method.description}
                        </p>
                        <Button
                          className={`w-full ${
                            method.primary
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-white text-blue-600 hover:bg-gray-50"
                          }`}
                        >
                          {method.action}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>

          {/* Final CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
              <h3 className="text-2xl font-bold mb-4">Still Have Questions?</h3>
              <p className="text-blue-100 mb-6">
                Our team is here to help you choose the right service and get
                your project started. We offer free consultations to ensure we
                understand your needs perfectly.
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
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white border-white hover:border-blue-700"
                  onClick={handleGetStarted}
                  disabled={loading}
                >
                  {loading ? "Loading..." : isAuthenticated ? "Start Your Project" : "Sign Up to Start"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
