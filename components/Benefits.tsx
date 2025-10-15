"use client"
import {
  BookOpenIcon,
  CpuChipIcon,
  BuildingLibraryIcon,
  MoonIcon,
  PencilSquareIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

export default function Benefits() {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate cards one by one with delay
          benefits.forEach((_, index) => {
            setTimeout(() => {
              setVisibleCards((prev) => [...prev, index]);
            }, 200 + index * 150); // Start after header animation, then stagger
          });
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: (
        <CpuChipIcon className="flex flex-row justify-center items-center w-20 h-20 bubble-shadow-border text-blue-400 text-sm font-light  p-4 rounded-full" />
      ),
      title: "AI-Powered Learning",
      description:
        "Get smart suggestions and create notes effortlessly with AI.",
    },
    {
      icon: (
        <PuzzlePieceIcon className="flex flex-row justify-center items-center w-20 h-20 bubble-shadow-border text-blue-400 text-sm font-light  p-4 rounded-full" />
      ),
      title: "Interactive Quizzes",
      description:
        "Test your knowledge, track progress, and make learning fun.",
    },
    {
      icon: (
        <BuildingLibraryIcon className="flex flex-row justify-center items-center w-20 h-20 bubble-shadow-border text-blue-400 text-sm font-light  p-4 rounded-full" />
      ),
      title: "Course Organization",
      description:
        "Keep all your lectures, materials, and notes neatly structured in one place.",
    },
    {
      icon: (
        <BookOpenIcon className="flex flex-row justify-center items-center w-20 h-20 bubble-shadow-border text-blue-400 text-sm font-light  p-4 rounded-full" />
      ),
      title: "Smart Study Space",
      description:
        "Combine your notes, quizzes, and materials for a smoother learning experience.",
    },
    {
      icon: (
        <PencilSquareIcon className="flex flex-row justify-center items-center w-20 h-20 bubble-shadow-border text-blue-400 text-sm font-light  p-4 rounded-full" />
      ),
      title: "Effortless Note-Taking",
      description:
        "Capture ideas, lecture highlights, and study notes all in one organized space.",
    },
    {
      icon: (
        <MoonIcon className="flex flex-row justify-center items-center w-20 h-20 bubble-shadow-border text-blue-400 text-sm font-light  p-4 rounded-full" />
      ),
      title: "Clean & Distraction-Free",
      description:
        "A modern, minimal interface built to help you focus on what matters.",
    },
  ];

  return (
    <section ref={sectionRef} id="benefits" className="py-20 px-6 ">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6 bubble-shadow-border opacity-100">
            Benefits
          </div>
          <h2
            className={`text-3xl md:text-4xl font-bold text-gray-900 mb-4 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Why Choose <span className="text-blue-500">Noto</span>?
          </h2>
          <p
            className={`text-lg text-gray-600 max-w-2xl mx-auto transition-all duration-700 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Because learning should be organized, intelligent, and effortless —
            powered by AI.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-4xl hover:bg-gray-200 transition-all duration-700 benefit-shadow ${
                visibleCards.includes(index)
                  ? "opacity-100 translate-y-0 blur-0"
                  : "opacity-0 translate-y-12 blur-sm"
              }`}
            >
              {/* Icon */}
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 bubble-shadow-border">
                {benefit.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
