"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail } from "lucide-react";
// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isNavbarCollapsed, setIsNavbarCollapsed] = useState<boolean>(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const logoTextRef = useRef<HTMLSpanElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const buttonTextRef = useRef<HTMLSpanElement>(null);
  const buttonIconRef = useRef<HTMLDivElement>(null);
  const buttonIconRefAn = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // Simple scroll handler to detect active section
    const handleScroll = () => {
      const sections = ["benefits", "integrations", "connect", "faq"];

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          // Check if section is in the middle of the viewport
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    // Add event listeners
    window.addEventListener("scroll", handleScroll);

    // Check initial state
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
        if (window.innerWidth >= 1024) {
          collapseTimeline.play();
          setIsNavbarCollapsed(true);
        }
      },
      onLeave: () => {
        if (window.innerWidth >= 1024) {
          collapseTimeline.reverse();
          setIsNavbarCollapsed(false);
        }
      },
      onEnterBack: () => {
        if (window.innerWidth >= 1024) {
          collapseTimeline.play();
          setIsNavbarCollapsed(true);
        }
      },
      onLeaveBack: () => {
        if (window.innerWidth >= 1024) {
          collapseTimeline.reverse();
          setIsNavbarCollapsed(false);
        }
      },
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  // Handle the hover animation for the "Mail us" button
  useEffect(() => {
    const button = buttonRef.current;
    const buttonText = buttonTextRef.current;
    const buttonIcon = buttonIconRefAn.current;
    const staticIcon = buttonIconRef.current;

    if (!button || !buttonText || !buttonIcon || !staticIcon) return;

    // Set initial state for animated icon
    gsap.set(buttonIcon, {
      x: -30,
      rotation: -180,
      scale: 0.8,
    });

    const handleMouseEnter = () => {
      if (isNavbarCollapsed) {
        // Simple hover effect when collapsed - just change colors
        gsap.to(button, {
          backgroundColor: "#60a5fa", // blue-400
          duration: 0.2,
          ease: "power2.out",
        });
        gsap.to(staticIcon, {
          color: "#ffffff", // white
          duration: 0.2,
          ease: "power2.out",
        });
      } else {
        // Complex animation when expanded
        const tl = gsap.timeline();

        // Animate text out and background change
        tl.to(buttonText, {
          opacity: 0,
          x: 20,
          duration: 0.2,
          ease: "power2.out",
        })
          // Change background color
          .to(
            button,
            {
              backgroundColor: "#60a5fa", // blue-400
              duration: 0.3,
              ease: "power2.out",
            },
            0
          )
          // Animate icon in from left with rotation
          .to(
            buttonIcon,
            {
              opacity: 1,
              x: 0,
              rotation: 0,
              scale: 1,
              duration: 0.4,
              ease: "back.out(1.7)",
            },
            0.1
          );
      }
    };

    const handleMouseLeave = () => {
      if (isNavbarCollapsed) {
        // Simple hover effect when collapsed - reset colors
        gsap.to(button, {
          backgroundColor: "transparent",
          duration: 0.2,
          ease: "power2.out",
        });
        gsap.to(staticIcon, {
          color: "#000000", // black
          duration: 0.2,
          ease: "power2.out",
        });
      } else {
        // Complex animation when expanded
        const tl = gsap.timeline();

        // Animate icon out
        tl.to(buttonIcon, {
          opacity: 0,
          x: 30,
          rotation: 180,
          scale: 0.8,
          duration: 0.2,
          ease: "power2.in",
        })
          // Reset background color
          .to(
            button,
            {
              backgroundColor: "transparent",
              duration: 0.3,
              ease: "power2.out",
            },
            0
          )
          // Animate text back in
          .to(
            buttonText,
            {
              opacity: 1,
              x: 0,
              duration: 0.3,
              ease: "power2.out",
            },
            0.1
          );
      }
    };

    const handleClick = () => {
      const contactSection = document.getElementById("connect");
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    };

    button.addEventListener("click", handleClick);
    
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("click", handleClick);
    };
  }, [isNavbarCollapsed]);

  // Simple helper to get link classes
  const isActive = (sectionId: string) => activeSection === sectionId;

  return (
    <nav
      ref={navRef}
      className="hidden lg:flex max-w-7xl h-20 fixed w-300 right-1/2 mt-7 rounded-[44px] z-50 translate-x-1/2 px-6 py-4 items-center justify-between bubble-shadow-border bg-background"
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
        className="flex items-center gap-2 font-medium overflow-hidden"
      >
        <Link
          href="#benefits"
          className={`whitespace-nowrap link-bubble px-3 py-2 rounded-full transition-all duration-300 ${
            isActive("benefits")
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Benefits
        </Link>
        <Link
          href="#integrations"
          className={`whitespace-nowrap link-bubble px-3 py-2 rounded-full transition-all duration-300 ${
            isActive("integrations")
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Integrations
        </Link>
        <Link
          href="#faq"
          className={`whitespace-nowrap link-bubble px-3 py-2 rounded-full transition-all duration-300 ${
            isActive("faq")
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          FAQ
        </Link>
        <Link
          href="#connect"
          className={`whitespace-nowrap link-bubble px-3 py-2 rounded-full transition-all duration-300 ${
            isActive("connect")
              ? "bg-blue-500 text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          Connect
        </Link>
      </div>

      {/* Desktop CTA Button */}

      <button
        ref={buttonRef}
        className="cursor-pointer  flex text-black bg-background px-6 py-2 border-buble-shadow rounded-4xl items-center justify-center relative overflow-hidden transition-colors duration-300"
      >
        <span ref={buttonTextRef} className="whitespace-nowrap">
          Mail us
        </span>
        <div
          ref={buttonIconRef}
          className="absolute inset-0 flex items-center justify-center opacity-0"
        >
          <Mail size={16} />
        </div>
        <div
          ref={buttonIconRefAn}
          className="absolute inset-0 flex items-center justify-center opacity-0"
        >
          <Mail size={16} />
        </div>
      </button>
    </nav>
  );
}
