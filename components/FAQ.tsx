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
      "We’re planning to launch the beta version at the beginning of January 2026. If you join the waitlist, you’ll get early access to try it out!",
  },
  {
    question: "Is Noto free to use?",
    answer:
      "Noto has two plans: a free plan that includes the core features for students, and a premium plan that unlocks additional advanced features such as AI-assisted tools for studying.",
  },
  {
    question: "What makes Noto different from other tools?",
    answer:
      "Noto combines all the tools students need to study effectively across the globe and adds AI-powered enhancements. If you’re a student struggling to keep up or aiming for top grades, Noto is built for you.",
  },
  {
    question: "How do I know if Noto is for me?",
    answer:
      "If you’re a student looking to improve your study efficiency and achieve better results, Noto is perfect for you. Start with the free plan to see how it fits your workflow.",
  },
  {
    question: "Will Noto integrate with the tools I already use?",
    answer:
      "Absolutely! Noto integrates easily with your university’s LMS, including popular platforms like Google Classroom. The integration is seamless—just a single click and it’s ready.",
  },
  {
    question: "Can I invite my team to join Noto?",
    answer:
      "For now, Noto is a single-user app. In the future, we may add team invitations and multi-user collaboration features.",
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
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6 bubble-shadow-border">
            FAQ
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 font-deco">
            Got Questions?{" "}
            <span className="text-blue-500">We&apos;ve Got Answers.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Quick, clear answers to help you get started with Noto.
          </p>
        </div>

        {/* FAQ Accordion - Single Container */}
        <div className=" rounded-4xl border border-gray-200 overflow-hidden bubble-shadow-border max-w-4xl mx-auto">
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
                  <span className=" text-gray-900 pr-4 group-hover:text-blue-600 transition-colors font-semibold">
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
