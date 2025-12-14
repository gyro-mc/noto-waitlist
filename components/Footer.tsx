"use client"
import Image from "next/image";
import Link from "next/link";
import { X, Linkedin, Instagram, Github } from "lucide-react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const socialRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const footerLinks = [
    { name: "Benefits", href: "#benefits" },
    { name: "Integrations", href: "#integrations" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
    { name: "404", href: "/404" },
  ];

  const socialLinks = [
    { name: "X (Twitter)", icon: X, href: "https://x.com/ADilmi38503" },
    { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/in/dilmi-abderrahmane-861366390/" },
    { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/abdelrahman.dlm/" },
    { name: "GitHub", icon: Github, href: "https://github.com/gyro-mc" },
  ];

  // Handle hover animations for social icons
  useEffect(() => {
    const socialElements = socialRefs.current;

    socialElements.forEach((element) => {
      if (!element) return;

      const handleMouseEnter = () => {
        gsap.to(element, {
          backgroundColor: "#60a5fa", // blue-400
          duration: 0.2,
          ease: "power2.out",
        });

        const icon = element.querySelector("svg");
        if (icon) {
          gsap.to(icon, {
            color: "#ffffff", // white
            duration: 0.2,
            ease: "power2.out",
          });
        }
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          backgroundColor: "transparent",
          duration: 0.2,
          ease: "power2.out",
        });

        const icon = element.querySelector("svg");
        if (icon) {
          gsap.to(icon, {
            color: "#6b7280", // gray-600
            duration: 0.2,
            ease: "power2.out",
          });
        }
      };

      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup function for this specific element
      return () => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    });

    // Return cleanup function for all elements
    return () => {
      socialElements.forEach((element) => {
        if (element) {
          element.removeEventListener("mouseenter", () => { });
          element.removeEventListener("mouseleave", () => { });
        }
      });
    };
  }, []);

  return (
    <footer className="bg-gray-50 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-24 h-24  rounded-full flex items-center justify-center mx-auto mb-4">
            <Image src={"/logo.png"} alt={"logo"} height={80} width={80} />
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
            >
              {link.name}
            </Link>
          ))}
        </div>
        {/* Copyright and Social Links in one line */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © {currentYear} All Rights Reserved
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  ref={(el) => {
                    socialRefs.current[index] = el;
                  }}
                  href={social.href}
                  className="w-14 h-14 border-buble-shadow rounded-2xl flex items-center justify-center text-gray-600 shadow-sm cursor-pointer transition-colors duration-300"
                  aria-label={social.name}
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
