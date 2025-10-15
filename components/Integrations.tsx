"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Integrations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Animate icons with subtle floating effect
    iconsRef.current.forEach((icon, index) => {
      if (icon) {
        gsap.to(icon, {
          y: Math.sin(index * 0.5) * 8,
          rotation: Math.cos(index * 0.3) * 3,
          duration: 3 + index * 0.15,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        });
      }
    });
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !iconsRef.current.includes(el)) {
      iconsRef.current.push(el);
    }
  };

  return (
    <section id="integrations" className="py-20 px-6 bg-gray-100">
      <div ref={containerRef} className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <div className="mb-16">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 font-deco">
            <span className="text-blue-500">Everything you need</span>, Talking
            Together
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Your apps, your workflows, perfectly in sync. Just the way it should
            be
          </p>
        </div>

        {/* Integration Icons Layout */}
        <div className="relative max-w-5xl mx-auto h-[500px]">
          {/* Top Center - Purple Diamond */}
          <div
            ref={addToRefs}
            className="absolute top-12 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <div className="w-8 h-8 bg-white rounded-lg transform rotate-45"></div>
          </div>

          {/* Second Row - Left and Right */}
          <div
            ref={addToRefs}
            className="absolute top-24 left-1/4 w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <div className="flex flex-col space-y-1">
              <div className="w-8 h-1 bg-white rounded"></div>
              <div className="w-8 h-1 bg-white rounded"></div>
              <div className="w-8 h-1 bg-white rounded"></div>
            </div>
          </div>

          <div
            ref={addToRefs}
            className="absolute top-24 right-1/4 w-14 h-14 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <div className="w-8 h-8 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-white rounded"></div>
              <div className="absolute w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Third Row - Three Icons */}
          <div
            ref={addToRefs}
            className="absolute top-40 left-1/6 w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-indigo-500 rounded-lg"></div>
            </div>
          </div>

          <div
            ref={addToRefs}
            className="absolute top-40 left-1/2 transform -translate-x-1/2 w-18 h-18 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
            </div>
          </div>

          <div
            ref={addToRefs}
            className="absolute top-40 right-1/6 w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
              <div className="w-6 h-6 bg-blue-600 rounded-full border-2 border-white"></div>
            </div>
          </div>

          {/* Fourth Row - Left and Right */}
          <div
            ref={addToRefs}
            className="absolute top-56 left-1/4 w-14 h-14 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded grid grid-cols-2 gap-0.5">
                <div className="bg-white rounded-sm"></div>
                <div className="bg-black rounded-sm"></div>
                <div className="bg-black rounded-sm"></div>
                <div className="bg-white rounded-sm"></div>
              </div>
            </div>
          </div>

          <div
            ref={addToRefs}
            className="absolute top-56 right-1/4 w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <div className="w-5 h-5 bg-purple-600 rounded-full"></div>
            </div>
          </div>

          {/* Bottom Center */}
          <div
            ref={addToRefs}
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-all duration-300 cursor-pointer"
          >
            <div className="w-10 h-3 bg-white rounded-full"></div>
          </div>

          {/* Subtle Connection Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-10">
            <defs>
              <linearGradient
                id="connectionGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="50%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#6366F1" />
              </linearGradient>
            </defs>
            {/* Connecting paths */}
            <path
              d="M 250 80 Q 400 120 550 80"
              stroke="url(#connectionGradient)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="3,6"
            />
            <path
              d="M 150 180 Q 400 220 650 180"
              stroke="url(#connectionGradient)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="3,6"
            />
            <path
              d="M 400 60 L 400 420"
              stroke="url(#connectionGradient)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="3,6"
            />
            <path
              d="M 200 160 Q 400 300 600 160"
              stroke="url(#connectionGradient)"
              strokeWidth="1.5"
              fill="none"
              strokeDasharray="3,6"
            />
          </svg>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 space-y-6">
          <p className="text-gray-600 text-lg">
            Seamlessly connect with 100+ popular tools and platforms
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <span className="px-3 py-1 bg-white rounded-full">Slack</span>
            <span className="px-3 py-1 bg-white rounded-full">Notion</span>
            <span className="px-3 py-1 bg-white rounded-full">Figma</span>
            <span className="px-3 py-1 bg-white rounded-full">GitHub</span>
            <span className="px-3 py-1 bg-white rounded-full">Trello</span>
            <span className="px-3 py-1 bg-white rounded-full">+95 more</span>
          </div>
          <button className="px-8 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors font-medium shadow-lg hover:shadow-xl">
            Explore All Integrations
          </button>
        </div>
      </div>
    </section>
  );
}
