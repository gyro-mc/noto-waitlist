"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const inputRowRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state - hide all elements with blur
      gsap.set([titleRef.current, subtitleRef.current, inputRowRef.current, textareaRef.current, buttonRef.current], {
        opacity: 0,
        y: 30,
        filter: "blur(8px)"
      });

      // Sequential animation timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
        }
      });

      // Animate elements sequentially with faster timing
      tl.to(titleRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.4,
        ease: "power2.out"
      })
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.1")
      .to(inputRowRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.15")
      .to(textareaRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.1")
      .to(buttonRef.current, {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.4,
        ease: "power2.out"
      }, "-=0.1");

      // Hover animation for the "Stay Connected" span
      const connectSpan = headerRef.current?.querySelector('.connect-span');
      if (connectSpan) {
        connectSpan.addEventListener('mouseenter', () => {
          gsap.to(connectSpan, {
            scale: 1.05,
            duration: 0.2,
            ease: "power2.out"
          });
        });
        
        connectSpan.addEventListener('mouseleave', () => {
          gsap.to(connectSpan, {
            scale: 1,
            duration: 0.2,
            ease: "power2.out"
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (isSubmitted && successRef.current) {
      gsap.fromTo(successRef.current, 
        {
          opacity: 0,
          scale: 0.8,
          y: 20,
          filter: "blur(8px)"
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.4,
          ease: "back.out(1.7)"
        }
      );
    }
  }, [isSubmitted]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Animate form out with blur
    if (formRef.current) {
      gsap.to(formRef.current, {
        opacity: 0.7,
        scale: 0.98,
        filter: "blur(2px)",
        duration: 0.2
      });
    }
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Contact form submitted:", formData);
    setIsSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-white" id="connect">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <div ref={headerRef} className="text-center mb-12">
          <h2 ref={titleRef} className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Let's <span className="text-blue-500 connect-span cursor-pointer">Stay Connected</span>
          </h2>
          <p ref={subtitleRef} className="text-lg text-gray-600">
            Have questions or feedback? Reach out, and we'll get back to you in no time.
          </p>
        </div>

        {/* Contact Form */}
        {isSubmitted ? (
          <div ref={successRef} className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h3 className="text-xl font-semibold text-green-800 mb-2">
              Message Sent Successfully!
            </h3>
            <p className="text-green-700">
              Thanks for reaching out. We'll get back to you within 24 hours.
            </p>
          </div>
        ) : (
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div ref={inputRowRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bubble-shadow-border border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bubble-shadow-border px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Message */}
            <div ref={textareaRef}>
              <textarea
                name="message"
                placeholder="Your message..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 bubble-shadow-border border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              ref={buttonRef}
              type="submit"
              disabled={isSubmitting}
              className="w-full cursor-pointer  bg-blue-500 text-white py-4 rounded-4xl hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                "Submit"
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}