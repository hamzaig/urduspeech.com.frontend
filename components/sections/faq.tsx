"use client";

import { motion } from "@/lib/motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What services does UrduSpeech provide?",
    answer: "UrduSpeech offers a comprehensive range of Urdu language services including speech-to-text conversion, translation, transcription, content creation, subtitling, and proofreading services."
  },
  {
    question: "How accurate is your Urdu speech-to-text service?",
    answer: "Our Urdu speech-to-text service achieves over 98% accuracy through a combination of advanced AI technology and human verification by native Urdu speakers."
  },
  {
    question: "What file formats do you accept for Urdu transcription?",
    answer: "We accept a wide range of audio and video formats including MP3, WAV, MP4, AVI, and more. If you have a specific format, please contact us to confirm compatibility."
  },
  {
    question: "How quickly can you deliver Urdu translation services?",
    answer: "Our turnaround times depend on the project size and complexity. For standard projects, we typically deliver within 24-48 hours. Rush services are available for urgent needs."
  },
  {
    question: "Do you support regional Urdu dialects?",
    answer: "Yes, our team includes experts in various regional Urdu dialects and can accommodate specific regional language requirements in all our services."
  },
  {
    question: "How do I get started with your services?",
    answer: "Simply contact us via phone at +923057777911 to discuss your specific needs. We'll provide you with a tailored solution and quote based on your requirements."
  }
];

export default function FAQ() {
  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-muted-foreground text-lg">
              Find answers to common questions about our Urdu language services
            </p>
          </motion.div>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <AccordionItem value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium text-lg">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}