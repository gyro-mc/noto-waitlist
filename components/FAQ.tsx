"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const answerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  const faqs = [
    {
      question: "When will I gain access to Noto?",
      answer:
        "We're planning to launch early access in January 2025. Join the waitlist, and you'll be one of the first to try it out!",
    },
    {
      question: "Is Noto free to use?",
      answer:
        "Noto offers both free and premium plans. Our free tier includes core collaboration features, while premium plans unlock advanced automation, integrations, and enterprise-grade security features.",
    },
    {
      question: "What makes Noto different from other tools?",
      answer:
        "Noto combines the best of project management, communication, and automation in one seamless platform. Our AI-powered workflows and intuitive design make collaboration effortless, while our robust integration ecosystem ensures it works with your existing tools.",
    },
    {
      question: "How do I know if Noto is for me?",
      answer:
        "Noto is perfect for teams of any size looking to streamline their workflow and boost productivity. Whether you're a startup, growing business, or enterprise, our scalable solutions adapt to your needs. Try our free tier to see if it's the right fit!",
    },
    {
      question: "Will Noto integrate with the tools I already use?",
      answer:
        "Yes! Noto integrates with over 100+ popular tools including Slack, Google Workspace, Microsoft 365, Trello, Asana, GitHub, and many more. Our API also allows for custom integrations to fit your specific workflow needs.",
    },
    {
      question: "Can I invite my team to join Noto?",
      answer:
        "Absolutely! Noto is built for teams. You can invite unlimited team members on our premium plans, set up different permission levels, and create shared workspaces. Team collaboration is at the heart of what we do.",
    },
  ];

  useEffect(() => {
    // Initialize all answers as closed except the first one
    answerRefs.current.forEach((ref, index) => {
      if (ref) {
        if (index === 0) {
          gsap.set(ref, { height: "auto", opacity: 1 });
        } else {
          gsap.set(ref, { height: 0, opacity: 0 });
        }
      }
    });

    // Initialize icons
    iconRefs.current.forEach((ref, index) => {
      if (ref) {
        if (index === 0) {
          gsap.set(ref, { rotation: 180 });
        } else {
          gsap.set(ref, { rotation: 0 });
        }
      }
    });
  }, []);

  const toggleFAQ = (index: number) => {
    const isCurrentlyOpen = openIndex === index;
    const newOpenIndex = isCurrentlyOpen ? null : index;

    // Close all answers first
    answerRefs.current.forEach((ref, i) => {
      if (ref && i !== index) {
        gsap.to(ref, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    });

    // Rotate all icons to closed state first
    iconRefs.current.forEach((ref, i) => {
      if (ref && i !== index) {
        gsap.to(ref, {
          rotation: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    });

    // Handle the clicked item
    const currentAnswer = answerRefs.current[index];
    const currentIcon = iconRefs.current[index];

    if (currentAnswer && currentIcon) {
      if (isCurrentlyOpen) {
        // Close the current item
        gsap.to(currentAnswer, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
        gsap.to(currentIcon, {
          rotation: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });
      } else {
        // Open the current item
        gsap.set(currentAnswer, { height: "auto" });
        const autoHeight = currentAnswer.offsetHeight;
        gsap.set(currentAnswer, { height: 0 });

        gsap.to(currentAnswer, {
          height: autoHeight,
          opacity: 1,
          duration: 0.4,
          ease: "power2.inOut",
        });
        gsap.to(currentIcon, {
          rotation: 180,
          duration: 0.3,
          ease: "power2.inOut",
        });
      }
    }

    setOpenIndex(newOpenIndex);
  };

  return (
    <section id="faq" className="py-20 px-6 bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2  text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6 bubble-shadow-border">
            FAQ
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Got Questions?{" "}
            <span className="text-blue-500">We've Got Answers.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Quick, clear answers to help you get started with Noto.
          </p>
        </div>

        {/* FAQ Accordion - Single Container */}
        <div className=" rounded-4xl border border-gray-200 overflow-hidden bubble-shadow-border lg:w-[900px]">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-100 last:border-b-0"
            >
              <div
                onClick={() => toggleFAQ(index)}
                className={`cursor-pointer transition-colors group m-2 rounded-4xl ${
                  openIndex === index ? "bubble-shadow-border" : ""
                }`}
              >
                {/* Question */}
                <div className="px-6 py-5 flex items-center justify-between">
                  <span className=" text-gray-900 pr-4 group-hover:text-blue-600 transition-colors font-semibold" >
                    {faq.question}
                  </span>
                  <div
                    ref={(el) => {
                      iconRefs.current[index] = el;
                    }}
                    className="flex-shrink-0"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-500 group-hover:text-blue-600 transition-colors" />
                  </div>
                </div>

                {/* Answer */}
                <div
                  ref={(el) => {
                    answerRefs.current[index] = el;
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-5">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
