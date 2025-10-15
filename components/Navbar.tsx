"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Phone, Menu, X } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const logoTextRef = useRef<HTMLSpanElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonTextRef = useRef<HTMLSpanElement>(null);
  const buttonIconRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple scroll handler to detect active section
    const handleScroll = () => {
      const sections = ['benefits', 'integrations', 'testimonials', 'faq'];
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in the middle of the viewport
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    // Check initial state
    handleScroll();

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Create collapse timeline (only for desktop)
    const collapseTimeline = gsap.timeline({ paused: true });

    collapseTimeline
      // Step 1: Collapse "Book a call" button first
      .to(buttonTextRef.current, {
        opacity: 0,
        duration: 0.25,
        ease: "power2.out",
      })
      .to(
        buttonRef.current,
        {
          width: 40,
          height: 40,
          paddingLeft: "12px",
          paddingRight: "12px",
          paddingTop: "8px",
          paddingBottom: "8px",
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.1"
      )
      .to(
        buttonIconRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.2,
          ease: "back.out(1.7)",
        },
        "-=0.1"
      )

      // Step 2: Then collapse "Noto" text and logo
      .to(
        logoTextRef.current,
        {
          opacity: 0,
          width: 0,
          marginRight: 0,
          duration: 0.3,
          ease: "power2.out",
        },
        "+=0.1"
      )
      .to(
        logoRef.current,
        {
          width: 40,
          height: 40,
          duration: 0.3,
          ease: "power2.out",
        },
        "-=0.2"
      )

      // Step 3: Finally reduce navbar width and padding
      .to(
        navRef.current,
        {
          paddingLeft: "16px",
          paddingRight: "16px",
          paddingTop: "8px",
          paddingBottom: "8px",
          width: "700px",
          duration: 0.4,
          ease: "power2.out",
        },
        "+=0.1"
      );

    // Create ScrollTrigger (only for desktop)
    ScrollTrigger.create({
      trigger: "body",
      start: "20% top",
      onEnter: () => {
        if (window.innerWidth >= 768) collapseTimeline.play();
      },
      onLeave: () => {
        if (window.innerWidth >= 768) collapseTimeline.reverse();
      },
      onEnterBack: () => {
        if (window.innerWidth >= 768) collapseTimeline.play();
      },
      onLeaveBack: () => {
        if (window.innerWidth >= 768) collapseTimeline.reverse();
      },
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);

    if (mobileMenuRef.current) {
      if (!isMobileMenuOpen) {
        // Open menu
        gsap.fromTo(
          mobileMenuRef.current,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
        );
      } else {
        // Close menu
        gsap.to(mobileMenuRef.current, {
          opacity: 0,
          y: -20,
          duration: 0.2,
          ease: "power2.in",
        });
      }
    }
  };

  // Simple helper to get link classes
  const isActive = (sectionId: string) => activeSection === sectionId;

  return (
    <>
      <nav
        ref={navRef}
        className="w-full lg:h-20 fixed lg:w-300 right-1/2 mt-7 rounded-[44px] z-50 translate-x-1/2 px-6 py-4 flex items-center justify-between bubble-shadow-border bg-background"
      >
        {/* Logo */}
        <div className="flex items-center gap-2 font-deco">
          <Image
            ref={logoRef}
            src="/logo.png"
            alt="Noto Logo"
            width={50}
            height={50}
            className="object-contain"
          />
          <span
            ref={logoTextRef}
            className="text-2xl font-medium overflow-hidden whitespace-nowrap"
          >
            Noto
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div
          ref={navLinksRef}
          className="hidden md:flex items-center gap-2 font-medium overflow-hidden"
        >
          <Link
            href="#benefits"
            className={`whitespace-nowrap link-bubble px-3 py-2 rounded-full transition-all duration-300 ${
              isActive('benefits') 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600  '
            }`}
          >
            Benefits
          </Link>
          <Link
            href="#integrations"
            className={`whitespace-nowrap link-bubble px-3 py-2 rounded-full transition-all duration-300 ${
              isActive('integrations') 
                ? 'bg-blue-500 text-white ' 
                : 'text-gray-600 hover:text-gray-900 '
            }`}
          >
            Integrations
          </Link>
          <Link
            href="#testimonials"
            className={`whitespace-nowrap link-bubble px-3 py-2 rounded-full transition-all duration-300 ${
              isActive('testimonials') 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 hover:text-gray-900 '
            }`}
          >
            Testimonials
          </Link>
          <Link
            href="#faq"
            className={`whitespace-nowrap link-bubble px-3 py-2 rounded-full transition-all duration-300 ${
              isActive('faq') 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-600 hover:text-gray-900 '
            }`}
          >
            FAQ
          </Link>
        </div>

        {/* Desktop CTA Button */}
        <button
          ref={buttonRef}
          className="hidden md:flex text-black bg-background px-6 py-2 border-buble-shadow rounded-4xl items-center justify-center relative overflow-hidden"
        >
          <span ref={buttonTextRef} className="whitespace-nowrap">
            Book a call
          </span>
          <div
            ref={buttonIconRef}
            className="absolute inset-0 flex items-center justify-center opacity-0 "
          >
            <Phone size={16} />
          </div>
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-full border-buble-shadow bg-background"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed top-24 left-1/2 transform -translate-x-1/2 w-11/12 max-w-sm bg-background rounded-2xl bubble-shadow-border z-40 md:hidden"
        >
          <div className="p-6 space-y-2">
            <Link
              href="#benefits"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`link-bubble block px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive('benefits') 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:text-gray-900 '
              }`}
            >
              Benefits
            </Link>
            <Link
              href="#integrations"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`link-bubble block px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive('integrations') 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:text-gray-900 '
              }`}
            >
              Integrations
            </Link>
            <Link
              href="#testimonials"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`link-bubble block px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive('testimonials') 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:text-gray-900 '
              }`}
            >
              Testimonials
            </Link>
            <Link
              href="#faq"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`link-bubble block px-4 py-3 rounded-lg transition-all duration-300 ${
                isActive('faq') 
                  ? 'bg-blue-500 text-white' 
                  : 'text-gray-600 hover:text-gray-900 '
              }`}
            >
              FAQ
            </Link>
            <div className="pt-4 border-t border-gray-200 cursor-pointer">
              <button className="w-full text-black bg-background px-6 py-3 border-buble-shadow">
                <Phone size={16} />
                Book a call
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
