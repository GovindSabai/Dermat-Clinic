import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SectionHeading } from '../components/SectionHeading';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-border py-4">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-text-primary pr-4">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-text-secondary transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pt-4 text-text-secondary leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const faqs = [
    {
      question: "Do I need an appointment?",
      answer: "Yes, we recommend booking an appointment to ensure you receive timely care. You can easily request one through our online booking system or by calling our clinic."
    },
    {
      question: "What should I bring to my consultation?",
      answer: "Please bring a list of any medications or skincare products you are currently using, along with relevant past medical records or test results if you have them."
    },
    {
      question: "How long does a consultation take?",
      answer: "An initial consultation typically lasts between 20 to 30 minutes, allowing our dermatologists enough time to understand your concerns and formulate a personalized treatment plan."
    },
    {
      question: "Do you offer cosmetic dermatology?",
      answer: "Yes, we offer a wide range of cosmetic dermatology services including chemical peels, laser treatments, and skin rejuvenation procedures."
    },
    {
      question: "Can I request a follow-up?",
      answer: "Absolutely. Follow-up appointments are a crucial part of many treatment plans. You can schedule these with our reception team or via your patient portal."
    },
    {
      question: "How do I contact the clinic?",
      answer: "You can reach us by phone, email, or through the Contact page on this website. Our team is available Monday through Saturday during operating hours."
    },
    {
      question: "Are online consultations available?",
      answer: "We currently offer online consultations for certain follow-up appointments and mild conditions. Please contact us to see if your concern is suitable for a virtual visit."
    }
  ];

  return (
    <>
      <Helmet>
        <title>FAQ | Dermat Clinic</title>
        <meta name="description" content="Frequently asked questions about Dermat Clinic's services and appointments." />
      </Helmet>

      <section className="py-20 bg-background min-h-[calc(100vh-200px)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading 
            title="Frequently Asked Questions" 
            subtitle="Patient Information"
            centered
          />
          
          <div className="bg-surface rounded-2xl p-6 md:p-8 shadow-sm border border-border mt-8">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
                isOpen={openIndex === index}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
