"use client";

import { useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    <section className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center">
      {/* Logo Icon */}
      <div className="mb-12">
        <Image
          src="/logo.png"
          alt="Noto Logo"
          width={64}
          height={64}
          className="w-16 h-16 object-contain mx-auto"
        />
      </div>

      {/* Main Heading */}
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 max-w-4xl">
        Welcome to{" "}
        <span className="text-blue-500">Noto</span>
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
      <div className="w-full max-w-md">
        <h3 className="text-2xl font-semibold text-gray-900 mb-4">
          Join our waitlist
        </h3>
        
        <p className="text-gray-600 mb-8">
          Be the first to experience Noto. Join the waitlist today for early access 
          and updates.
        </p>

        {isSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium">
              Thanks for joining! We'll be in touch soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
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