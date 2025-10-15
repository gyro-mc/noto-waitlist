"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

export default function Integrations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Create wave animation
    if (waveRef.current) {
      gsap.to(waveRef.current, {
        rotation: 360,
        duration: 20,
        repeat: -1,
        ease: "none",
      });
    }
  }, []);

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

        <div className="h-[700px]  flex flex-row justify-center items-center">
          <div
            className="h-[600px] w-[600px]  flex flex-row justify-center items-center rounded-full bubble-shadow-border "
            style={{ border: "8px solid #f1f1f7 !important" }}
          >
            <div className="w-25 h-25 relative rounded-full bg-[#F9FFFF] border-buble-shadow">

            <Image src={"/logo.png"} alt="logo.png" fill className="object-contain" />
            </div>
          </div>
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
