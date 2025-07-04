"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { motion } from "@/lib/motion";
import { Check, Star, Mic, FileText, Video, Headphones, Zap, Shield, Clock, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function PricingPage() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  const handleAction = (serviceType?: string) => {
    if (loading) return;
    if (isAuthenticated) {
      if (serviceType) {
        router.push(`/submit-service?service=${serviceType}`);
      } else {
        router.push("/submit-service");
      }
    } else {
      if (serviceType) {
        router.push(`/login?redirect=/submit-service?service=${serviceType}`);
      } else {
        router.push(`/login?redirect=/submit-service`);
      }
    }
  };

  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "per month",
      description: "Perfect for individuals and small projects",
      features: [
        "Up to 10 hours of Urdu speech-to-text",
        "Basic translation services (5,000 words/month)",
        "Standard accuracy (95%)",
        "Email support",
        "Basic file formats (MP3, WAV, MP4)",
        "Download in TXT format",
        "7-day processing time",
        "Basic quality assurance"
      ],
      popular: false,
      icon: Mic,
      color: "blue",
      serviceType: "speech-to-text"
    },
    {
      name: "Professional",
      price: "$99",
      period: "per month",
      description: "Ideal for businesses and content creators",
      features: [
        "Up to 50 hours of Urdu speech-to-text",
        "Advanced translation services (25,000 words/month)",
        "High accuracy (98%)",
        "Priority email & phone support",
        "All file formats supported",
        "Multiple export formats (TXT, DOC, PDF)",
        "3-day processing time",
        "Advanced quality assurance",
        "Custom vocabulary training",
        "API access (limited)"
      ],
      popular: true,
      icon: FileText,
      color: "purple",
      serviceType: "transcription"
    },
    {
      name: "Enterprise",
      price: "$299",
      period: "per month",
      description: "For large organizations and high-volume needs",
      features: [
        "Unlimited Urdu speech-to-text",
        "Unlimited translation services",
        "Premium accuracy (99.5%)",
        "24/7 dedicated support",
        "All file formats + custom formats",
        "All export formats + custom formats",
        "Same-day processing",
        "Premium quality assurance",
        "Custom vocabulary & accent training",
        "Full API access",
        "Dedicated account manager",
        "Custom integrations"
      ],
      popular: false,
      icon: Video,
      color: "green",
      serviceType: "enterprise"
    }
  ];

  const payPerUse = [
    {
      service: "Urdu Speech-to-Text",
      price: "$2.99",
      unit: "per hour",
      description: "High-accuracy transcription of Urdu audio",
      features: ["95-99.5% accuracy", "Multiple speakers support", "Timestamps included", "Speaker identification"],
      serviceType: "speech-to-text"
    },
    {
      service: "Urdu Translation",
      price: "$0.08",
      unit: "per word",
      description: "Professional Urdu to English translation",
      features: ["Human-reviewed translations", "Cultural context preservation", "Technical terminology support", "Format preservation"],
      serviceType: "translation"
    },
    {
      service: "Urdu Subtitling",
      price: "$4.99",
      unit: "per minute",
      description: "Complete subtitle creation for videos",
      features: ["Transcription + translation", "Time-synchronized subtitles", "Multiple subtitle formats", "Quality assurance"],
      serviceType: "subtitling"
    },
    {
      service: "Urdu Content Creation",
      price: "$0.12",
      unit: "per word",
      description: "Original Urdu content writing",
      features: ["SEO-optimized content", "Cultural relevance", "Multiple content types", "Revision included"],
      serviceType: "content-creation"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-20 md:pt-24">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white mr-4">
              <Zap className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Pricing Plans
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Choose the perfect plan for your Urdu language needs. From individual projects to enterprise solutions, 
            we have flexible pricing options to suit every requirement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              <Shield className="mr-2 h-4 w-4" />
              No Hidden Fees
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              <Clock className="mr-2 h-4 w-4" />
              Fast Processing
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
              <Users className="mr-2 h-4 w-4" />
              Expert Support
            </Badge>
          </div>
        </motion.div>

        {/* Monthly Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Monthly Subscription Plans</h2>
            <p className="text-muted-foreground">Save up to 40% with monthly subscriptions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <Card className={`relative h-full transition-all duration-300 hover:shadow-xl ${
                  plan.popular 
                    ? 'border-2 border-purple-500 shadow-lg scale-105' 
                    : 'border border-gray-200 dark:border-gray-700'
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-1">
                        <Star className="mr-1 h-3 w-3" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-6">
                    <div className="flex justify-center mb-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-${plan.color}-600 to-${plan.color}-700 flex items-center justify-center text-white`}>
                        <plan.icon className="h-6 w-6" />
                      </div>
                    </div>
                    <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center space-x-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                    <p className="text-muted-foreground mt-2">{plan.description}</p>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className={`w-full mt-6 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700' 
                          : 'bg-blue-600 hover:bg-blue-700'
                      } text-white`}
                      onClick={() => handleAction(plan.serviceType)}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : isAuthenticated ? "Get Started" : "Sign Up to Start"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Pay Per Use Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Pay Per Use Services</h2>
            <p className="text-muted-foreground">Perfect for one-time projects or occasional needs</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {payPerUse.map((service, index) => (
              <motion.div
                key={service.service}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{service.service}</CardTitle>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">{service.price}</div>
                        <div className="text-sm text-muted-foreground">{service.unit}</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardHeader>
                  
                  <CardContent>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center space-x-2">
                          <Check className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Button 
                      className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() => handleAction(service.serviceType)}
                      disabled={loading}
                    >
                      {loading ? "Loading..." : isAuthenticated ? "Order Now" : "Sign Up to Order"}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Enterprise Solutions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-16"
        >
          <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Custom Enterprise Solutions</h2>
                  <p className="text-gray-300 mb-6">
                    Need a custom solution for your organization? We offer tailored pricing and features 
                    for large-scale deployments, government contracts, and specialized requirements.
                  </p>
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-400" />
                      <span>Custom pricing based on volume</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-400" />
                      <span>Dedicated infrastructure</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-400" />
                      <span>Custom integrations & APIs</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-400" />
                      <span>On-premise deployment options</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-400" />
                      <span>Compliance & security certifications</span>
                    </li>
                  </ul>
                  <Button 
                    className="bg-white text-gray-900 hover:bg-gray-100"
                    onClick={() => handleAction()}
                    disabled={loading}
                  >
                    {loading ? "Loading..." : isAuthenticated ? "Contact Sales Team" : "Sign Up to Contact"}
                  </Button>
                </div>
                <div className="text-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Enterprise Features</h3>
                  <p className="text-gray-300">
                    Custom SLAs, dedicated support, advanced analytics, and enterprise-grade security
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mb-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Everything you need to know about our pricing</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Can I switch plans anytime?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground text-sm">
                  We offer a 30-day money-back guarantee for all subscription plans. Pay-per-use services are non-refundable.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground text-sm">
                  We accept all major credit cards, PayPal, and bank transfers for enterprise customers.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, we offer a 7-day free trial for all subscription plans with full features included.
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="text-center"
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Choose the perfect plan for your Urdu language needs. Start your free trial today 
                and experience the power of professional Urdu speech-to-text and translation services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
                  onClick={() => handleAction()}
                  disabled={loading}
                >
                  {loading ? "Loading..." : isAuthenticated ? "Start Free Trial" : "Sign Up to Start"}
                </Button>
                <Button variant="outline" className="border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 px-8 py-3">
                  Contact Sales
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 