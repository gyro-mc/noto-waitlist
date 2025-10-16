"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Integrations() {
  const containerRef = useRef<HTMLDivElement>(null);
  const waveCenterRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const bottomSectionRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLParagraphElement>(null);
  const tagsContainerRef = useRef<HTMLDivElement>(null);
  const bottomButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states
      gsap.set(headerRef.current, { y: 50, opacity: 0 });
      gsap.set(animationContainerRef.current, {
        y: 100,
        opacity: 0,
        scale: 0.8,
      });
      gsap.set(bottomSectionRef.current, { y: 50, opacity: 0 });

      // Set initial states for bottom section elements
      gsap.set(bottomTextRef.current, {
        y: 30,
        opacity: 0,
        filter: "blur(10px)",
      });
      gsap.set(tagsContainerRef.current?.children || [], {
        y: 20,
        opacity: 0,
        filter: "blur(5px)",
      });
      gsap.set(bottomButtonRef.current, {
        y: 30,
        opacity: 0,
        filter: "blur(10px)",
      });

      // Create main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Add animations to timeline with original header timing
      tl.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
      })
        .to(
          animationContainerRef.current,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "power2.out",
          },
          "+=0.4"
        );

      // Integration icons animation
      const integrationIcons =
        animationContainerRef.current?.querySelectorAll(".integration-icon");
      if (integrationIcons) {
        gsap.set(integrationIcons, { y: 30, opacity: 0, scale: 0.8 });

        gsap.to(integrationIcons, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.4,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: animationContainerRef.current,
            start: "top 70%",
            end: "bottom 30%",
            toggleActions: "play none none reverse",
          },
        });
      }

      // Separate bottom section animation with its own scroll trigger
      const bottomTl = gsap.timeline({
        scrollTrigger: {
          trigger: bottomSectionRef.current,
          start: "top 110%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Bottom section container appears first
      bottomTl.to(bottomSectionRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      })
      // Then animate paragraph
      .to(bottomTextRef.current, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.3,
        ease: "power2.out",
      }, "-=0.1")
      // Then animate tags one by one
      .to(tagsContainerRef.current?.children || [], {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.2,
        stagger: 0.03,
        ease: "power2.out",
      }, "-=0.05")
      // Finally animate button
      .to(bottomButtonRef.current, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.3,
        ease: "power2.out",
      }, "+=0.05");
    }, containerRef);

    // Wave animation (existing)
    const waveElements = document.querySelectorAll("#wave");

    if (waveElements.length > 0) {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2, delay: 3 });

      // Set initial state for waves
      gsap.set(waveElements, {
        width: "100px",
        height: "100px",
        opacity: 0.8,
      });

      tl.to(waveCenterRef.current, {
        scale: 0.9,
        duration: 1,
        ease: "power2.out",
      })
        .to(
          waveElements,
          {
            width: "600px",
            height: "600px",
            opacity: 0,
            duration: 2,
            stagger: 0.3,
            ease: "power2.out",
          },
          "-=0.1"
        )
        .to(
          waveCenterRef.current,
          {
            scale: 1,
            duration: 1,
            ease: "power2.out",
          },
          "-=1"
        )
        .set(waveElements, {
          width: "80px",
          height: "80px",
          opacity: 0.8,
        });

      return () => {
        tl.kill();
        ctx.revert(); // Clean up ScrollTrigger instances
      };
    }
  }, []);

  return (
    <section id="integrations" className="py-20 px-6 bg-gray-100">
      <div ref={containerRef} className="max-w-6xl mx-auto text-center">
        {/* Header */}
        <div ref={headerRef} className="mb-16">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-6 bubble-shadow-border opacity-100">
            Integrations
          </div>
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
            className="h-[600px] w-[600px] relative  flex flex-row justify-center items-center rounded-full bubble-shadow-border    "
            style={{ border: "8px solid #f1f1f7 !important" }}
          >
            <div
              id="wave"
              className=" h-25 w-25 wave-shadow rounded-full absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2"
            />
            <div
              id="wave"
              className=" h-25 w-25 wave-shadow rounded-full absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2"
            />
            <div
              id="wave"
              className=" h-25 w-25 wave-shadow rounded-full absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2"
            />
            <div
              id="wave"
              className=" h-25 w-25 wave-shadow rounded-full absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2"
            />
            <div
              id="wave"
              className=" h-25 w-25 wave-shadow rounded-full absolute top-1/2 -translate-y-1/2 right-1/2 translate-x-1/2"
            />

            <div className="absolute -top-8 right-1/2 translate-x-1/2 p-4  bg-[#EBECF1] rounded-2xl border-buble-shadow">
              <Image
                src={"/integrations/google-classroom.svg"}
                width={50}
                height={50}
                alt="Google Classroom Integration"
              />
            </div>
            <div className="absolute -bottom-10 right-1/2 translate-x-1/2 p-4  bg-[#EBECF1] rounded-2xl border-buble-shadow">
              <Image
                src={"/integrations/moodle.svg"}
                width={50}
                height={50}
                alt="Moodle Integration"
              />
            </div>

            <div className="absolute top-1/2 -right-10 -translate-y-1/2 p-4  bg-[#EBECF1] rounded-2xl border-buble-shadow">
              <Image
                src={"/integrations/blackboard.svg"}
                width={50}
                height={50}
                alt="Blackboard Integration"
              />
            </div>

            <div className="absolute top-1/2 -left-10 -translate-y-1/2 p-4  bg-[#EBECF1] rounded-2xl border-buble-shadow">
              <Image
                src={"/integrations/google-drive.svg"}
                width={50}
                height={50}
                alt="Google Drive Integration"
              />
            </div>

            <div
              className="w-25 h-25  relative rounded-full bg-[#F9FFFF] border-buble-shadow"
              ref={waveCenterRef}
            >
              <Image
                src={"/logo.png"}
                alt="logo.png"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div ref={bottomSectionRef} className="mt-16 space-y-6">
          <p ref={bottomTextRef} className="text-gray-600 text-lg">
            Seamlessly connect with 100+ popular tools and platforms
          </p>
          <div
            ref={tagsContainerRef}
            className="flex flex-wrap justify-center gap-4 text-sm text-gray-500"
          >
            <span className="px-3 py-1 bg-white rounded-full">Classroom</span>
            <span className="px-3 py-1 bg-white rounded-full">BlackBoard</span>
            <span className="px-3 py-1 bg-white rounded-full">Moodle</span>
            <span className="px-3 py-1 bg-white rounded-full">
              Google drive
            </span>
            <span className="px-3 py-1 bg-white rounded-full">+10 more</span>
          </div>
          <button
            ref={bottomButtonRef}
            className="px-8 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors font-medium shadow-lg hover:shadow-xl"
          >
            Explore All Integrations
          </button>
        </div>
      </div>
    </section>
  );
}
