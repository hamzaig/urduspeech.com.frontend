"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "@/lib/motion";
import {
  Mic,
  Headphones,
  Languages,
  FileText,
  Upload,
  Download,
  CheckCircle,
  Clock,
  Star,
  ArrowRight,
  Play,
  Settings,
  Users,
  Shield,
  Zap,
  UserCheck,
  MessageSquare,
  Calendar,
  Award,
  Check,
  Phone,
  Mail,
  Globe,
  Target,
  TrendingUp,
  Award as AwardIcon,
  ThumbsUp,
  Eye,
  Heart,
  UserPlus,
  Lock,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function GetStartedPage() {
  const [activeTab, setActiveTab] = useState("speech-to-text");
  const [showSignup, setShowSignup] = useState(false);
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignupLoading(true);
    setSignupError("");

    if (signupData.password !== signupData.confirmPassword) {
      setSignupError("Passwords don't match");
      setSignupLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: signupData.name,
          email: signupData.email,
          password: signupData.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Registration failed");
      }

      // Use the auth context to login
      login(result.token, result.user);

      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setSignupError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSignupLoading(false);
    }
  };

  const services = [
    {
      id: "speech-to-text",
      title: "Urdu Speech-to-Text",
      description:
        "Convert spoken Urdu to accurate written text with our advanced human-powered speech recognition service. Perfect for interviews, meetings, podcasts, and voice notes.",
      icon: Mic,
      features: [
        "Native Urdu speakers for accurate transcription",
        "Handles various accents and dialects",
        "Real-time processing capabilities",
        "Quality assurance by language experts",
        "Multiple audio format support",
        "Speaker identification available",
      ],
      steps: [
        {
          title: "Submit Audio",
          description:
            "Upload your Urdu audio file in any format (MP3, WAV, M4A, etc.)",
          icon: Upload,
        },
        {
          title: "Human Processing",
          description:
            "Our native Urdu speakers listen and convert speech to text with cultural context",
          icon: Users,
        },
        {
          title: "Quality Check",
          description: "Multiple rounds of human review for 99%+ accuracy",
          icon: CheckCircle,
        },
        {
          title: "Final Delivery",
          description:
            "Receive your professionally converted text document with timestamps",
          icon: Download,
        },
      ],
      useCases: [
        "Interviews",
        "Meetings",
        "Podcasts",
        "Voice notes",
        "Lectures",
        "Presentations",
      ],
      turnaround: "2-24 hours",
      accuracy: "99%+",
    },
    {
      id: "translation",
      title: "Urdu Translation",
      description:
        "Professional translation services between Urdu and 80+ languages with cultural context preservation. Certified translations available for legal and official documents.",
      icon: Languages,
      features: [
        "Native bilingual translators",
        "Cultural context preservation",
        "Industry-specific terminology",
        "Multiple language pairs supported",
        "Certified translations available",
        "Bidirectional translation support",
      ],
      steps: [
        {
          title: "Submit Document",
          description:
            "Upload your document for translation with specific requirements",
          icon: Upload,
        },
        {
          title: "Expert Assignment",
          description:
            "We assign your project to qualified native speakers with relevant expertise",
          icon: UserCheck,
        },
        {
          title: "Human Translation",
          description:
            "Professional translators work on your content with cultural sensitivity",
          icon: Languages,
        },
        {
          title: "Quality Assurance",
          description:
            "Multiple human reviewers ensure accuracy and cultural appropriateness",
          icon: Award,
        },
      ],
      supportedLanguages: [
        "Urdu",
        "English",
        "Arabic",
        "Spanish",
        "French",
        "German",
        "Italian",
        "Portuguese",
        "Russian",
        "Chinese (Mandarin)",
        "Japanese",
        "Korean",
        "Hindi",
        "Bengali",
        "Punjabi",
        "Persian",
        "Turkish",
        "Dutch",
        "Swedish",
        "Norwegian",
        "Danish",
        "Finnish",
        "Polish",
        "Czech",
        "Slovak",
        "Hungarian",
        "Romanian",
        "Bulgarian",
        "Greek",
        "Hebrew",
        "Thai",
        "Vietnamese",
        "Indonesian",
        "Malay",
        "Filipino",
        "Swahili",
        "Amharic",
        "Yoruba",
        "Igbo",
        "Hausa",
        "Zulu",
        "Xhosa",
        "Afrikaans",
        "Dutch",
        "Flemish",
        "Catalan",
        "Basque",
        "Galician",
        "Welsh",
        "Irish",
        "Scottish Gaelic",
        "Breton",
        "Icelandic",
        "Faroese",
        "Estonian",
        "Latvian",
        "Lithuanian",
        "Albanian",
        "Macedonian",
        "Serbian",
        "Croatian",
        "Bosnian",
        "Montenegrin",
        "Slovenian",
        "Maltese",
        "Georgian",
        "Armenian",
        "Azerbaijani",
        "Kazakh",
        "Uzbek",
        "Kyrgyz",
        "Tajik",
        "Turkmen",
        "Mongolian",
        "Tibetan",
        "Nepali",
        "Sinhala",
        "Burmese",
        "Khmer",
        "Lao",
        "Malayalam",
        "Tamil",
        "Telugu",
        "Kannada",
        "Gujarati",
        "Marathi",
        "Odia",
        "Assamese",
        "Kashmiri",
        "Sindhi",
        "Pashto",
        "Dari",
        "Kurdish",
        "Balochi",
        "Saraiki",
        "Hindko",
        "Brahui",
        "Shina",
        "Balti",
        "Wakhi",
      ],
      useCases: [
        "Documents",
        "Websites",
        "Marketing materials",
        "Legal texts",
        "Academic papers",
        "Business content",
      ],
      turnaround: "1-3 days",
      accuracy: "100%",
    },
    {
      id: "transcription",
      title: "Urdu Transcription",
      description:
        "Detailed transcription of Urdu audio and video content with timestamps and speaker identification. Ideal for research, legal proceedings, and content creation.",
      icon: FileText,
      features: [
        "Speaker identification and timestamps",
        "Background noise handling",
        "Multiple audio format support",
        "Professional editing and proofreading",
        "Custom formatting options",
        "Verbatim or clean transcription",
      ],
      steps: [
        {
          title: "Submit Audio/Video",
          description:
            "Upload your Urdu audio or video file in any format with specific requirements",
          icon: Upload,
        },
        {
          title: "Human Transcription",
          description:
            "Our native Urdu speakers transcribe with accurate timestamps and speaker identification",
          icon: Users,
        },
        {
          title: "Quality Check",
          description:
            "Multiple rounds of human review for accuracy and completeness",
          icon: CheckCircle,
        },
        {
          title: "Final Delivery",
          description:
            "Receive your professionally transcribed document in your preferred format",
          icon: Download,
        },
      ],
      useCases: [
        "Video content",
        "Audio recordings",
        "Interviews",
        "Lectures",
        "Legal proceedings",
        "Research data",
      ],
      turnaround: "1-2 days",
      accuracy: "99%+",
    },
    {
      id: "content-creation",
      title: "Urdu Content Creation",
      description:
        "Native Urdu content creation services for websites, marketing materials, and documentation. SEO-optimized content that resonates with Urdu-speaking audiences.",
      icon: FileText,
      features: [
        "SEO-optimized content",
        "Creative writing expertise",
        "Brand voice consistency",
        "Cultural relevance",
        "Keyword optimization",
        "Content strategy planning",
      ],
      steps: [
        {
          title: "Project Brief",
          description:
            "Discuss your content requirements, target audience, and SEO goals",
          icon: MessageSquare,
        },
        {
          title: "Content Creation",
          description:
            "Native Urdu writers create engaging, culturally relevant content",
          icon: FileText,
        },
        {
          title: "Review & Edit",
          description:
            "Professional editing, SEO optimization, and cultural review",
          icon: CheckCircle,
        },
        {
          title: "Final Delivery",
          description:
            "Receive your professionally written content ready for publication",
          icon: Download,
        },
      ],
      useCases: [
        "Blog posts",
        "Marketing copy",
        "Product descriptions",
        "Social media",
        "Website content",
        "Email campaigns",
      ],
      turnaround: "2-5 days",
      accuracy: "100%",
    },
    {
      id: "subtitling",
      title: "Urdu Subtitling",
      description:
        "Professional Urdu subtitling services for videos, films, and multimedia content with perfect timing. Support for multiple subtitle formats and platforms.",
      icon: FileText,
      features: [
        "Perfect timing synchronization",
        "Cultural adaptation",
        "Multiple subtitle formats",
        "Quality review process",
        "Platform-specific optimization",
        "Closed captions available",
      ],
      steps: [
        {
          title: "Submit Video",
          description:
            "Upload your video file for subtitling with format specifications",
          icon: Upload,
        },
        {
          title: "Timing & Translation",
          description:
            "Create perfectly timed Urdu subtitles with cultural adaptation",
          icon: Clock,
        },
        {
          title: "Quality Check",
          description: "Review timing, cultural accuracy, and readability",
          icon: CheckCircle,
        },
        {
          title: "Final Delivery",
          description:
            "Receive your subtitled video or subtitle file in multiple formats",
          icon: Download,
        },
      ],
      useCases: [
        "YouTube videos",
        "Films",
        "Educational content",
        "Corporate videos",
        "Social media",
        "Streaming platforms",
      ],
      turnaround: "2-3 days",
      accuracy: "100%",
    },
    {
      id: "proofreading",
      title: "Urdu Proofreading",
      description:
        "Expert proofreading and editing services for Urdu documents, ensuring perfect grammar, style, and consistency. Ideal for academic, business, and publishing needs.",
      icon: FileText,
      features: [
        "Grammar and spelling correction",
        "Style and tone improvement",
        "Consistency checking",
        "Format optimization",
        "Cultural accuracy review",
        "Academic citation formatting",
      ],
      steps: [
        {
          title: "Submit Document",
          description:
            "Upload your Urdu document for proofreading with specific requirements",
          icon: Upload,
        },
        {
          title: "Expert Review",
          description:
            "Native Urdu experts review your content for accuracy and quality",
          icon: Users,
        },
        {
          title: "Editing & Correction",
          description:
            "Professional editing, grammar correction, and style improvement",
          icon: CheckCircle,
        },
        {
          title: "Final Delivery",
          description:
            "Receive your perfectly edited document with tracked changes",
          icon: Download,
        },
      ],
      useCases: [
        "Academic papers",
        "Business documents",
        "Books",
        "Articles",
        "Reports",
        "Publications",
      ],
      turnaround: "1-2 days",
      accuracy: "100%",
    },
  ];

  const pricing = [
    {
      name: "Basic",
      description: "Perfect for small projects and quick turnaround needs",
      price: "Starting at $0.04",
      unit: "per word",
      features: [
        "Native Urdu speakers",
        "Standard turnaround time",
        "Basic quality check",
        "Email support",
        "1 revision included",
      ],
      popular: false,
    },
    {
      name: "Professional",
      description: "Our most popular choice for business and academic projects",
      price: "Starting at $0.06",
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
    },
    {
      name: "Premium",
      description:
        "For critical projects requiring the highest level of expertise",
      price: "Starting at $0.10",
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
    },
  ];

  const servicePricing = [
    {
      service: "Speech-to-Text",
      basic: "$0.032/min",
      professional: "$0.048/min",
      premium: "$0.072/min",
      note: "Audio quality affects pricing",
    },
    {
      service: "Translation",
      basic: "$0.04/word",
      professional: "$0.06/word",
      premium: "$0.10/word",
      note: "Technical content may cost more",
    },
    {
      service: "Transcription",
      basic: "$0.032/min",
      professional: "$0.048/min",
      premium: "$0.072/min",
      note: "Speaker identification included",
    },
    {
      service: "Content Creation",
      basic: "$0.06/word",
      professional: "$0.10/word",
      premium: "$0.16/word",
      note: "Research and SEO included",
    },
    {
      service: "Subtitling",
      basic: "$0.048/min",
      professional: "$0.072/min",
      premium: "$0.10/min",
      note: "Timing and formatting included",
    },
    {
      service: "Proofreading",
      basic: "$0.02/word",
      professional: "$0.032/word",
      premium: "$0.048/word",
      note: "Style and grammar check",
    },
  ];

  const whyChooseUs = [
    {
      icon: Users,
      title: "Native Urdu Speakers",
      description:
        "All our transcriptionists and translators are native Urdu speakers with deep cultural understanding and linguistic expertise",
    },
    {
      icon: Award,
      title: "Professional Expertise",
      description:
        "Years of experience in Urdu language services with proven track record and certified professionals",
    },
    {
      icon: Shield,
      title: "Quality Guarantee",
      description:
        "100% human review process ensures the highest quality and accuracy with satisfaction guarantee",
    },
    {
      icon: Clock,
      title: "Reliable Turnaround",
      description:
        "Consistent delivery times with clear communication throughout the process and deadline guarantees",
    },
  ];

  const benefits = [
    {
      icon: Target,
      title: "Cultural Accuracy",
      description:
        "Native speakers ensure cultural nuances and context are preserved",
    },
    {
      icon: TrendingUp,
      title: "SEO Optimization",
      description:
        "Content creation includes keyword optimization for better search rankings",
    },
    {
      icon: Globe,
      title: "Global Reach",
      description:
        "Support for 80+ languages with certified translation services",
    },
    {
      icon: ThumbsUp,
      title: "Quality Assurance",
      description:
        "Multiple review rounds ensure 99%+ accuracy in all services",
    },
  ];

  const statistics = [
    {
      number: "99%+",
      label: "Accuracy Rate",
      description: "Guaranteed accuracy across all services",
    },
    {
      number: "80+",
      label: "Languages Supported",
      description: "Comprehensive language coverage",
    },
    {
      number: "24hrs",
      label: "Fastest Turnaround",
      description: "Express service available",
    },
    {
      number: "100%",
      label: "Human Quality",
      description: "No AI, only human experts",
    },
  ];

  const testimonials = [
    {
      name: "Dr. Ahmed Khan",
      role: "Academic Researcher",
      content:
        "The Urdu transcription service was exceptional. The accuracy and attention to cultural context made my research much more reliable.",
      rating: 5,
    },
    {
      name: "Fatima Ali",
      role: "Marketing Manager",
      content:
        "Our Urdu content creation helped us reach a wider audience. The SEO optimization and cultural relevance were spot on.",
      rating: 5,
    },
    {
      name: "Muhammad Hassan",
      role: "Business Owner",
      content:
        "Professional translation services that helped us expand into new markets. The certified translations were accepted everywhere.",
      rating: 5,
    },
  ];

  const faq = [
    {
      question: "How accurate are your Urdu speech-to-text services?",
      answer:
        "Our Urdu speech-to-text services achieve 99%+ accuracy through native speakers and multiple quality review rounds. We handle various accents and dialects with cultural context understanding.",
    },
    {
      question: "Do you provide certified translations for legal documents?",
      answer:
        "Yes, we provide certified translations for legal and official documents. Our translations are accepted by government agencies, courts, and educational institutions worldwide.",
    },
    {
      question: "What file formats do you support for transcription?",
      answer:
        "We support all major audio and video formats including MP3, WAV, M4A, MP4, AVI, MOV, and more. We can also handle large files and multiple speaker identification.",
    },
    {
      question: "How long does content creation take?",
      answer:
        "Content creation typically takes 2-5 days depending on the project scope. We offer express services for urgent projects and include SEO optimization and cultural review.",
    },
    {
      question: "Do you offer bulk discounts for large projects?",
      answer:
        "Yes, we offer competitive pricing for bulk orders and large projects. Contact us for a custom quote and we'll provide the best rates for your specific needs.",
    },
    {
      question: "Can you handle technical and specialized content?",
      answer:
        "Absolutely! We have experts in various fields including medical, legal, technical, academic, and business content. Our translators are subject matter experts in their respective domains.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="secondary" className="mb-4">
              Professional Human Services
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair leading-tight mb-6">
              Expert <span className="text-blue-600">Human</span> Urdu Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              Professional native Urdu speakers providing comprehensive language
              services including speech-to-text, translation, transcription,
              content creation, subtitling, and proofreading. Experience 99%+
              accuracy with cultural context preservation and SEO optimization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link href="#services">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                >
                  Explore Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="tel:+923057777911">
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-lg"
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
          >
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-border">
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="font-semibold text-sm mb-1">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {stat.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Signup Section */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6 mx-auto">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get Started with{" "}
              <span className="text-blue-600">Human-Powered</span> Services
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Create your account to access our professional Urdu language
              services. Get started in minutes and experience the difference
              human expertise makes.
            </p>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Signup Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-2 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="text-2xl font-bold text-center text-blue-600">
                      Create Your Account
                    </CardTitle>
                    <CardDescription className="text-center">
                      Join thousands of satisfied customers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSignup} className="space-y-4">
                      {signupError && (
                        <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                          <p className="text-red-600 dark:text-red-400 text-sm">
                            {signupError}
                          </p>
                        </div>
                      )}

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <input
                          type="text"
                          value={signupData.name}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              name: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your full name"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={signupData.email}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              email: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Enter your email"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Password</label>
                        <input
                          type="password"
                          value={signupData.password}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              password: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Create a strong password"
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          value={signupData.confirmPassword}
                          onChange={(e) =>
                            setSignupData({
                              ...signupData,
                              confirmPassword: e.target.value,
                            })
                          }
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Confirm your password"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-semibold"
                        disabled={signupLoading}
                      >
                        {signupLoading ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                            Creating Account...
                          </div>
                        ) : (
                          "Create Account"
                        )}
                      </Button>

                      <p className="text-sm text-center text-muted-foreground">
                        Already have an account?{" "}
                        <Link
                          href="/login"
                          className="text-blue-600 hover:underline font-medium"
                        >
                          Sign in here
                        </Link>
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="space-y-6"
              >
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
                    Why Create an Account?
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Track Your Projects
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Monitor progress and access completed work
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Priority Support
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Get faster responses and dedicated assistance
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Special Pricing
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Access member-only discounts and bulk rates
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          Secure & Private
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Your data is protected with enterprise-grade security
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-3 mb-4">
                    <Lock className="w-6 h-6 text-blue-600" />
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      100% Secure
                    </h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Your information is encrypted and protected. We never share
                    your data with third parties.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-secondary/30 dark:bg-muted/10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our <span className="text-blue-600">Human-Based</span>{" "}
              Services?
            </h2>
            <p className="text-lg text-muted-foreground">
              Experience the difference that human expertise makes in Urdu
              language services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg mb-4 mx-auto">
                      <benefit.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Human Services?
            </h2>
            <p className="text-lg text-muted-foreground">
              Experience the difference that human expertise makes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {whyChooseUs.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full text-center">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/50 rounded-lg mb-4 mx-auto">
                      <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Tabs */}
      <section id="services" className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our <span className="text-blue-600">Human-Based</span> Services
            </h2>
            <p className="text-lg text-muted-foreground">
              Professional services delivered by native Urdu speakers
            </p>
          </motion.div>

          <Tabs
            defaultValue="speech-to-text"
            className="w-full"
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 gap-4 mb-8 h-auto">
              {services.map((service) => (
                <TabsTrigger
                  key={service.id}
                  value={service.id}
                  className="py-4 px-2 text-sm md:text-base h-full"
                >
                  <service.icon className="w-5 h-5 mr-2" />
                  {service.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {services.map((service) => (
              <TabsContent key={service.id} value={service.id}>
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800/50 p-6 md:p-8 rounded-xl shadow-lg border"
                >
                  <Card className="mb-8 border-0 shadow-none">
                    <CardContent className="p-0">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h3 className="text-xl font-bold mb-4 flex items-center">
                            <service.icon className="w-6 h-6 mr-3 text-blue-600" />
                            Service Overview
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {service.description}
                          </p>

                          <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                              <div className="text-lg font-bold text-blue-600">
                                {service.turnaround}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Turnaround Time
                              </div>
                            </div>
                            <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                              <div className="text-lg font-bold text-green-600">
                                {service.accuracy}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                Accuracy Rate
                              </div>
                            </div>
                          </div>

                          <h4 className="font-semibold mb-3">Perfect For:</h4>
                          <div className="flex flex-wrap gap-2">
                            {service.useCases.map((useCase, useCaseIndex) => (
                              <Badge
                                key={useCaseIndex}
                                variant="secondary"
                                className="text-xs"
                              >
                                {useCase}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-xl font-bold mb-4">
                            Key Features
                          </h3>
                          <ul className="space-y-3">
                            {service.features.map((feature, featureIndex) => (
                              <li
                                key={featureIndex}
                                className="flex items-start"
                              >
                                <Check className="h-5 w-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Supported Languages for Translation */}
                      {service.id === "translation" &&
                        service.supportedLanguages && (
                          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <h4 className="font-semibold text-lg mb-3">
                              Supported Languages (80+ Languages):
                            </h4>
                            <p className="text-sm text-muted-foreground mb-4">
                              We provide professional translation services from
                              all these languages to Urdu and from Urdu to all
                              these languages.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-2 text-sm">
                              {service.supportedLanguages.map(
                                (language, index) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 rounded"
                                  >
                                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                    <span>{language}</span>
                                  </div>
                                )
                              )}
                            </div>
                            <div className="mt-4 p-3 bg-blue-100 dark:bg-blue-800/30 rounded-lg">
                              <p className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-1">
                                🔄 Bidirectional Translation Available
                              </p>
                              <p className="text-xs text-blue-700 dark:text-blue-300">
                                Any language ↔ Urdu translation with native
                                speakers and certified translators
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground mt-3">
                              * All translations are performed by native
                              speakers and certified translators
                            </p>
                          </div>
                        )}
                    </CardContent>
                  </Card>

                  {/* Process Steps */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold">Our Human Process</h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {service.steps.map((step, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.6, delay: index * 0.1 }}
                        >
                          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center">
                            <step.icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">
                              {index + 1}. {step.title}
                            </h4>
                            <p className="text-muted-foreground text-sm">
                              {step.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Transparent Human Service Pricing
            </h2>
            <p className="text-lg text-muted-foreground">
              Fair pricing for professional human expertise
            </p>
          </motion.div>

          {/* Pricing Plans */}
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
            {pricing.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
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
                      <Link href="/contact">
                        <Button
                          className={`w-full ${
                            plan.popular
                              ? "bg-blue-600 hover:bg-blue-700 text-white"
                              : "bg-secondary hover:bg-secondary/80"
                          }`}
                        >
                          Get Started
                          <ArrowRight className="w-4 h-4 ml-2" />
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
            animate={{ opacity: 1, y: 0 }}
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
                  <th className="text-center p-4 font-semibold">
                    Professional
                  </th>
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
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mt-12 text-center"
          >
            <div className="bg-secondary/30 dark:bg-muted/10 rounded-lg p-8 max-w-4xl mx-auto">
              <h4 className="text-xl font-semibold mb-4">
                Need a Custom Quote?
              </h4>
              <p className="text-muted-foreground mb-6">
                For large projects, bulk orders, or special requirements, we
                offer custom pricing. Contact us for a personalized quote.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
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

      {/* Testimonials Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our <span className="text-blue-600">Clients Say</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Real feedback from satisfied customers who trust our human-based
              services
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      &ldquo;{testimonial.content}&rdquo;
                    </p>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-secondary/30 dark:bg-muted/10">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked <span className="text-blue-600">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Get answers to common questions about our Urdu language services
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faq.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3 text-blue-600">
                      {item.question}
                    </h3>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardContent className="pt-12 pb-12">
                <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6 mx-auto">
                  <Users className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Work with Human Experts?
                </h2>
                <p className="text-lg mb-8 opacity-90">
                  Experience the quality and accuracy that only native Urdu
                  speakers can provide.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/get-started">
                    <Button
                      size="lg"
                      variant="secondary"
                      className="bg-white text-blue-600 hover:bg-gray-100"
                    >
                      Start Your Project
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700 text-white border-white hover:border-blue-700"
                    >
                      Contact Our Team
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
