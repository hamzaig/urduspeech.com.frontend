"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { motion } from "@/lib/motion";
import { 
  Upload, 
  FileText, 
  Mic, 
  Languages, 
  BookOpen, 
  VideoIcon, 
  FileEdit,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

const serviceTypes = [
  {
    value: "speech-to-text",
    label: "Urdu Speech-to-Text",
    icon: <Mic className="h-5 w-5" />,
    description: "Convert spoken Urdu to written text",
    turnaround: "2-24 hours",
    price: "Starting from $0.50/minute"
  },
  {
    value: "translation",
    label: "Urdu Translation",
    icon: <Languages className="h-5 w-5" />,
    description: "Translate between Urdu and other languages",
    turnaround: "1-3 days",
    price: "Starting from $0.10/word"
  },
  {
    value: "transcription",
    label: "Urdu Transcription",
    icon: <FileText className="h-5 w-5" />,
    description: "Detailed transcription with timestamps",
    turnaround: "1-2 days",
    price: "Starting from $0.75/minute"
  },
  {
    value: "content-creation",
    label: "Urdu Content Creation",
    icon: <BookOpen className="h-5 w-5" />,
    description: "Create original Urdu content",
    turnaround: "2-5 days",
    price: "Starting from $50/page"
  },
  {
    value: "subtitling",
    label: "Urdu Subtitling",
    icon: <VideoIcon className="h-5 w-5" />,
    description: "Add Urdu subtitles to videos",
    turnaround: "2-3 days",
    price: "Starting from $1.00/minute"
  },
  {
    value: "proofreading",
    label: "Urdu Proofreading",
    icon: <FileEdit className="h-5 w-5" />,
    description: "Edit and proofread Urdu content",
    turnaround: "1-2 days",
    price: "Starting from $0.05/word"
  }
];

export default function SubmitServicePage() {
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    serviceType: "",
    projectTitle: "",
    description: "",
    urgency: "normal",
    additionalNotes: "",
    contactPhone: "",
    budget: ""
  });
  const [files, setFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login?redirect=/submit-service");
    }
  }, [loading, isAuthenticated, router]);

  useEffect(() => {
    // Set service type from URL parameter
    const serviceType = searchParams.get("service");
    if (serviceType && serviceTypes.some(st => st.value === serviceType)) {
      setFormData(prev => ({ ...prev, serviceType }));
    }
  }, [searchParams]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // Get auth token
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authentication required");
      }

      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("serviceType", formData.serviceType);
      formDataToSend.append("projectTitle", formData.projectTitle);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("urgency", formData.urgency);
      formDataToSend.append("additionalNotes", formData.additionalNotes);
      formDataToSend.append("contactPhone", formData.contactPhone);
      formDataToSend.append("budget", formData.budget);
      formDataToSend.append("userId", user?._id || "");

      // Append files
      files.forEach((file, index) => {
        formDataToSend.append(`file-${index}`, file);
      });

      const response = await fetch("/api/services/submit", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit service request");
      }

      setSuccess(true);
      // Reset form
      setFormData({
        serviceType: "",
        projectTitle: "",
        description: "",
        urgency: "normal",
        additionalNotes: "",
        contactPhone: "",
        budget: ""
      });
      setFiles([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Service Request Submitted!</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Thank you for submitting your service request. Our team will review it and contact you within 24 hours.
              </p>
              <div className="space-y-3">
                <Link href="/dashboard">
                  <Button className="w-full">Go to Dashboard</Button>
                </Link>
                <Link href="/">
                  <Button variant="outline" className="w-full">Back to Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 pt-32 pb-8">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
              Submit Your <span className="text-blue-600">Service Request</span>
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Tell us about your project and upload your files. Our team will review your request and get back to you with a quote and timeline.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Service Type Selection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Choose Your Service
                  </CardTitle>
                  <CardDescription>
                    Select the type of service you need
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {serviceTypes.map((service) => (
                      <div
                        key={service.value}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          formData.serviceType === service.value
                            ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                        }`}
                        onClick={() => setFormData(prev => ({ ...prev, serviceType: service.value }))}
                      >
                        <div className="flex items-center space-x-3">
                          <div className="text-blue-600">{service.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold">{service.label}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{service.description}</p>
                            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                              <span className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {service.turnaround}
                              </span>
                              <span className="flex items-center">
                                <DollarSign className="h-3 w-3 mr-1" />
                                {service.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Project Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                  <CardDescription>
                    Provide information about your project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="projectTitle">Project Title *</Label>
                    <Input
                      id="projectTitle"
                      value={formData.projectTitle}
                      onChange={(e) => setFormData(prev => ({ ...prev, projectTitle: e.target.value }))}
                      placeholder="Enter your project title"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Project Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your project requirements in detail"
                      rows={4}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="urgency">Urgency</Label>
                      <Select value={formData.urgency} onValueChange={(value) => setFormData(prev => ({ ...prev, urgency: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low (1-2 weeks)</SelectItem>
                          <SelectItem value="normal">Normal (3-5 days)</SelectItem>
                          <SelectItem value="high">High (1-2 days)</SelectItem>
                          <SelectItem value="urgent">Urgent (Same day)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="budget">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-100">Under $100</SelectItem>
                          <SelectItem value="100-500">$100 - $500</SelectItem>
                          <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                          <SelectItem value="1000-5000">$1,000 - $5,000</SelectItem>
                          <SelectItem value="over-5000">Over $5,000</SelectItem>
                          <SelectItem value="discuss">Let's discuss</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData(prev => ({ ...prev, contactPhone: e.target.value }))}
                      placeholder="Your phone number for urgent matters"
                    />
                  </div>

                  <div>
                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                    <Textarea
                      id="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={(e) => setFormData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                      placeholder="Any additional requirements or special instructions"
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* File Upload */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Upload className="mr-2 h-5 w-5" />
                    Upload Files
                  </CardTitle>
                  <CardDescription>
                    Upload your audio, video, or document files (Max 10 files, 50MB each)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <Button variant="outline" className="mb-2">
                        Choose Files
                      </Button>
                    </Label>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="audio/*,video/*,.pdf,.doc,.docx,.txt"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <p className="text-sm text-gray-500">
                      Drag and drop files here, or click to browse
                    </p>
                  </div>

                  {/* File List */}
                  {files.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <h4 className="font-semibold">Uploaded Files:</h4>
                      {files.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-800 rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFile(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Error Message */}
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <div className="text-center">
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting || !formData.serviceType || !formData.projectTitle || !formData.description}
                  className="px-8"
                >
                  {submitting ? "Submitting..." : "Submit Service Request"}
                </Button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 