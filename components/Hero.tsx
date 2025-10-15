"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logoRef.current) {
      // Main floating motion with figure-8 pattern
      const floatTl = gsap.timeline({ repeat: -1 });
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
      const wobbleTl = gsap.timeline({ repeat: -1, repeatDelay: 3 });
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

      return () => {
        floatTl.kill();
        wobbleTl.kill();
      };
    }
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
    <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center font-deco ">
      {/* Logo Icon */}
      <div ref={logoRef} className="mb-10 ">
        <Image
          src="/logo.png"
          alt="Noto Logo"
          width={96}
          height={96}
          className="w-24 h-24 object-contain mx-auto"
        />
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold text-gray-900 mb-6 max-w-4xl ">
        Welcome to <span className="text-blue-500">Noto</span>
      </h1>

      <h2 className="text-3xl md:text-5xl font-bold text-gray-700 mb-8 max-w-4xl">
        The Next Era of Collaboration
      </h2>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-600 mb-16 max-w-2xl leading-relaxed">
        Say goodbye to chaos and hello to efficiency. Noto is your ultimate
        productivity partner, built to help teams work smarter, not harder.
      </p>

      {/* Waitlist Section */}
      <div className="w-full max-w-md  border-buble-shadow  lg:max-w-[50%] p-20 rounded-[50px] space-y-2">
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
          <form onSubmit={handleSubmit} className="space-y-4 flex flex-col items-center" >
            <input  
              type="email"
              placeholder="Enter your email"
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

      {/* Footer Badge */}
      <div className="mt-20">
        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-600">
          🇫🇷 Made in France
        </span>
      </div>
    </section>
  );
}
