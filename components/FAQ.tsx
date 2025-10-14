"use client";

import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "When will I gain access to Noto?",
      answer: "We're planning to launch early access in January 2025. Join the waitlist, and you'll be one of the first to try it out!"
    },
    {
      question: "Is Noto free to use?",
      answer: "Noto offers both free and premium plans. Our free tier includes core collaboration features, while premium plans unlock advanced automation, integrations, and enterprise-grade security features."
    },
    {
      question: "What makes Noto different from other tools?",
      answer: "Noto combines the best of project management, communication, and automation in one seamless platform. Our AI-powered workflows and intuitive design make collaboration effortless, while our robust integration ecosystem ensures it works with your existing tools."
    },
    {
      question: "How do I know if Noto is for me?",
      answer: "Noto is perfect for teams of any size looking to streamline their workflow and boost productivity. Whether you're a startup, growing business, or enterprise, our scalable solutions adapt to your needs. Try our free tier to see if it's the right fit!"
    },
    {
      question: "Will Noto integrate with the tools I already use?",
      answer: "Yes! Noto integrates with over 100+ popular tools including Slack, Google Workspace, Microsoft 365, Trello, Asana, GitHub, and many more. Our API also allows for custom integrations to fit your specific workflow needs."
    },
    {
      question: "Can I invite my team to join Noto?",
      answer: "Absolutely! Noto is built for teams. You can invite unlimited team members on our premium plans, set up different permission levels, and create shared workspaces. Team collaboration is at the heart of what we do."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6">
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Got Questions? <span className="text-blue-500">We've Got Answers.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quick, clear answers to help you get started with Noto.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 pr-4">
                  {faq.question}
                </span>
                {openIndex === index ? (
                  <ChevronDown className="w-5 h-5 text-gray-500 transform rotate-180 transition-transform" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-500 transition-transform" />
                )}
              </button>

              {/* Answer */}
              {openIndex === index && (
                <div className="px-6 pb-5">
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}