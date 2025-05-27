"use client";

import { useState } from "react";
import { motion } from "@/lib/motion";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    quote: "The Urdu speech-to-text service provided by UrduSpeech is outstanding. The accuracy and speed of conversion have greatly improved our workflow.",
    author: "Ahmed Khan",
    position: "Content Manager, PakMedia",
    avatar: "AK"
  },
  {
    quote: "As a researcher working with Urdu language materials, the transcription services from UrduSpeech have been invaluable. Highly recommend!",
    author: "Fatima Ali",
    position: "Research Professor, University of Karachi",
    avatar: "FA"
  },
  {
    quote: "The translation quality is excellent. Our international communications have improved significantly since using UrduSpeech's services.",
    author: "Saad Mahmood",
    position: "International Relations, Tech Pakistan",
    avatar: "SM"
  },
  {
    quote: "I'm impressed by the attention to regional dialects and cultural nuances in their translations. It shows their deep understanding of the language.",
    author: "Zainab Hussain",
    position: "Documentary Producer",
    avatar: "ZH"
  },
  {
    quote: "Fast turnaround times and excellent customer service. The team at UrduSpeech is professional and responsive to our needs.",
    author: "Omar Farooq",
    position: "Project Manager, Global Communications",
    avatar: "OF"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemsPerView = { mobile: 1, tablet: 2, desktop: 3 };
  
  const nextSlide = () => {
    setActiveIndex((prev) => 
      prev + 1 >= testimonials.length ? 0 : prev + 1
    );
  };
  
  const prevSlide = () => {
    setActiveIndex((prev) => 
      prev - 1 < 0 ? testimonials.length - 1 : prev - 1
    );
  };

  return (
    <section id="testimonials" className="py-20 bg-secondary/30 dark:bg-muted/10">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
              What Our Clients Say
            </h2>
            <p className="text-muted-foreground text-lg">
              Hear from satisfied clients who have experienced our Urdu language services
            </p>
          </motion.div>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${activeIndex * (100 / itemsPerView.mobile)}%)`,
              }}
            >
              {testimonials.map((testimonial, index) => (
                <div 
                  key={index} 
                  className="w-full md:w-1/2 lg:w-1/3 flex-shrink-0 px-4"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="h-full"
                  >
                    <Card className="h-full border border-border hover:border-blue-300 dark:hover:border-blue-800">
                      <CardContent className="p-6">
                        <div className="text-blue-600 mb-4">
                          <Quote size={28} />
                        </div>
                        <p className="mb-6 text-foreground italic">"{testimonial.quote}"</p>
                        <div className="flex items-center">
                          <Avatar className="h-10 w-10 mr-4">
                            <AvatarFallback className="bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200">
                              {testimonial.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold">{testimonial.author}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevSlide}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextSlide}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}