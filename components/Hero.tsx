"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);
  const mainHeadingRef = useRef<HTMLHeadingElement>(null);
  const subHeadingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const waitlistRef = useRef<HTMLDivElement>(null);

  // Function to wrap text in spans for line-by-line animation
  const wrapTextForAnimation = (element: HTMLElement): void => {
    // Get the original HTML content to preserve spans
    const originalHTML = element.innerHTML;

    // Create wrapper spans for each logical line
    const firstPart =
      "Noto brings all your courses and notes together in one intelligent space";
    const secondPart =
      "helping you stay organized, focused, and ready to learn.";

    // Clear the element
    element.innerHTML = "";

    // Create first line span
    const firstLine = document.createElement("span");
    firstLine.className = "subtitle-line";
    firstLine.style.display = "block";
    firstLine.textContent = firstPart;

    // Create second line span with responsive behavior
    const secondLine = document.createElement("span");
    secondLine.className = "subtitle-line";
    secondLine.innerHTML = `<span class="hidden sm:inline"> — </span>${secondPart}`;
    secondLine.style.display = "block";

    // Add both lines to the element
    element.appendChild(firstLine);
    element.appendChild(secondLine);
  };

  useEffect(() => {
    // Initial setup - hide all elements
    const elements = [
      logoRef.current,
      mainHeadingRef.current,
      subHeadingRef.current,
      subtitleRef.current,
      waitlistRef.current,
    ];
    elements.forEach((el) => {
      if (el) {
        gsap.set(el, { y: 50, opacity: 0 });
      }
    });

    // Create main timeline for entrance animations
    const tl = gsap.timeline();

    // Logo entrance and floating animation
    if (logoRef.current) {
      tl.to(logoRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)",
      });

      // Main floating motion with figure-8 pattern (starts after entrance)
      const floatTl = gsap.timeline({ repeat: -1, delay: 1 });
      floatTl
        .to(logoRef.current, {
          x: 8,
          y: -12,
          rotation: 5,
          scale: 1.08,
          duration: 1.5,
          ease: "power2.inOut",
        })
        .to(logoRef.current, {
          x: -8,
          y: -8,
          rotation: -3,
          scale: 1.05,
          duration: 1.8,
          ease: "power2.inOut",
        })
        .to(logoRef.current, {
          x: 6,
          y: 10,
          rotation: 4,
          scale: 1.1,
          duration: 2,
          ease: "power2.inOut",
        })
        .to(logoRef.current, {
          x: -6,
          y: 8,
          rotation: -2,
          scale: 1.03,
          duration: 1.7,
          ease: "power2.inOut",
        })
        .to(logoRef.current, {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          duration: 2,
          ease: "power2.inOut",
        });

      // Subtle wobble on hover simulation
      const wobbleTl = gsap.timeline({ repeat: -1, repeatDelay: 3, delay: 2 });
      wobbleTl
        .to(logoRef.current, {
          rotationX: 5,
          rotationY: 3,
          duration: 0.3,
          ease: "back.out(1.7)",
        })
        .to(logoRef.current, {
          rotationX: -3,
          rotationY: -2,
          duration: 0.4,
          ease: "back.out(1.7)",
        })
        .to(logoRef.current, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.5,
          ease: "back.out(1.7)",
        });
    }

    // Main heading with word-by-word animation for "Noto"
    if (mainHeadingRef.current) {
      tl.to(
        mainHeadingRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );

      // Animate "Noto" word by word after the main heading appears
      const notoSpans = mainHeadingRef.current.querySelectorAll(".noto-word");
      if (notoSpans.length > 0) {
        gsap.set(notoSpans, { opacity: 0, y: 20 });
        tl.to(
          notoSpans,
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.2,
            ease: "back.out(1.7)",
          },
          "-=0.2"
        );
      }
    }

    // Sub heading
    if (subHeadingRef.current) {
      tl.to(
        subHeadingRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }

    // Subtitle - animate line by line
    if (subtitleRef.current) {
      const subtitleText = subtitleRef.current.querySelector(".subtitle-text");
      if (subtitleText) {
        // Make container visible but prepare lines for animation
        gsap.set(subtitleRef.current, { opacity: 1, y: 0 });

        // Wrap text in animated spans
        wrapTextForAnimation(subtitleText as HTMLElement);

        // Get the created line elements
        const lines = subtitleText.querySelectorAll(".subtitle-line");

        // Set initial state for lines
        gsap.set(lines, { opacity: 0, y: 30 });

        // Animate each line with stagger
        tl.to(
          lines,
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.3,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }
    }

    // Waitlist section
    if (waitlistRef.current) {
      tl.to(
        waitlistRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      );
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send the email to your backend
      console.log("Email submitted:", email);
      setIsSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="relative flex-1 flex  flex-col items-center justify-center px-6 py-20 text-center font-deco overflow-hidden">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-cyan-400/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-l from-purple-400/15 to-pink-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-t from-indigo-400/10 to-blue-400/15 rounded-full blur-3xl animate-pulse delay-2000"></div>

        {/* Medium Floating Orbs */}
        <div className="absolute top-32 right-1/3 w-40 h-40 bg-gradient-to-br from-cyan-300/20 to-blue-300/15 rounded-full blur-2xl animate-float delay-500"></div>
        <div className="absolute bottom-40 right-20 w-32 h-32 bg-gradient-to-tl from-purple-300/25 to-pink-300/20 rounded-full blur-2xl animate-drift delay-1500"></div>

        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/3 w-3 h-3 bg-blue-500/40 rounded-full animate-bounce delay-500 shadow-lg shadow-blue-500/20"></div>
        <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-purple-500/50 rounded-full animate-bounce delay-1000 shadow-lg shadow-purple-500/20"></div>
        <div className="absolute bottom-1/3 left-1/5 w-2 h-2 bg-pink-500/60 rounded-full animate-bounce delay-1500 shadow-lg shadow-pink-500/20"></div>
        <div className="absolute top-2/3 right-1/3 w-3.5 h-3.5 bg-indigo-500/45 rounded-full animate-bounce delay-700 shadow-lg shadow-indigo-500/20"></div>
        <div className="absolute top-1/5 right-1/5 w-2.5 h-2.5 bg-cyan-500/50 rounded-full animate-float delay-300 shadow-lg shadow-cyan-500/20"></div>
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-teal-500/40 rounded-full animate-drift delay-2000 shadow-lg shadow-teal-500/20"></div>

        {/* Geometric Shapes */}
        <div className="absolute top-16 right-16 w-8 h-8 border-2 border-blue-300/40 rotate-45 animate-spin-slow shadow-lg shadow-blue-300/10"></div>
        <div className="absolute bottom-32 left-16 w-6 h-6 border-2 border-purple-300/50 animate-pulse shadow-lg shadow-purple-300/10"></div>
        <div className="absolute top-1/2 left-8 w-5 h-5 bg-gradient-to-r from-blue-400/30 to-purple-400/25 rotate-12 animate-ping delay-2000 rounded-sm"></div>
        <div className="absolute bottom-16 right-1/4 w-7 h-7 border-2 border-pink-300/35 rotate-12 animate-spin-slow delay-1000 rounded-full"></div>
        <div className="absolute top-3/4 left-1/4 w-4 h-4 bg-gradient-to-bl from-cyan-400/40 to-indigo-400/30 animate-pulse delay-500 rounded-full"></div>

        {/* Subtle Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/5 via-transparent to-purple-50/5"></div>
        <div className="absolute inset-0 bg-gradient-to-tl from-transparent via-cyan-50/3 to-transparent"></div>

        {/* Radial Gradient Background */}
        <div className="absolute inset-0 bg-radial-gradient from-white/10 via-transparent to-transparent"></div>
      </div>

      {/* Logo Icon */}
      <div ref={logoRef} className="mb-10 mt-20">
        <Image
          src="/logo.png"
          alt="Noto Logo"
          width={96}
          height={96}
          className="w-24 h-24 object-contain mx-auto"
        />
      </div>

      {/* Main Heading */}
      <h1
        ref={mainHeadingRef}
        className="text-4xl md:text-6xl lg:text-8xl font-bold text-gray-900 mb-6 max-w-4xl "
      >
        Welcome to{" "}
        <span className="text-blue-500">
          <span className="noto-word">N</span>
          <span className="noto-word">o</span>
          <span className="noto-word">t</span>
          <span className="noto-word">o</span>
        </span>
      </h1>

      <h2
        ref={subHeadingRef}
        className="text-3xl md:text-5xl font-bold text-gray-700 mb-8 max-w-4xl"
      >
        the study tool that makes student life easier.
      </h2>

      {/* Subtitle */}
      <div
        ref={subtitleRef}
        className="text-lg md:text-xl text-gray-600 mb-16 max-w-2xl leading-relaxed"
      >
        <p className="subtitle-text">
          Noto brings all your courses and notes together in one intelligent
          space
          <span className="hidden sm:inline"> — </span>
          <span className="block sm:inline">
            helping you stay organized, focused, and ready to learn.
          </span>
        </p>
      </div>

      {/* Waitlist Section */}
      <div
        ref={waitlistRef}
        className="w-full max-w-md  border-buble-shadow  lg:max-w-[50%] p-5 lg:p-20 rounded-[50px] space-y-2"
      >
        <h3 className="text-2xl lg:text-5xl  text-gray-900 mb-4">
          Join our waitlist
        </h3>

        <p className="text-gray-600 mb-8">
          Be the first to experience Noto. Join the waitlist today for early
          access and updates.
        </p>

        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">
              Thanks for joining! We'll be in touch soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex flex-col items-center"
          >
            <input
              type="email"
              placeholder="Enter your email (preferably your school email)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent lg:w-[60%] bubble-shadow-border rounded-4xl "
            />
            <button
              type="submit"
              className="w-full   py-5 cursor-pointer hover:bg-gray-200 transition-colors hover:text-blue-white lg:w-[100px] border-buble-shadow bg-background text-black rounded-4xl "
            >
              Join
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
