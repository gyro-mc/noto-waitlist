import Link from "next/link";
import { Twitter, Linkedin, Instagram, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Benefits", href: "#benefits" },
    { name: "Integrations", href: "#integrations" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
    { name: "Contact", href: "#contact" },
    { name: "404", href: "/404" }
  ];

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "#" },
    { name: "LinkedIn", icon: Linkedin, href: "#" },
    { name: "Instagram", icon: Instagram, href: "#" },
    { name: "Facebook", icon: Facebook, href: "#" }
  ];

  return (
    <footer className="bg-gray-50 py-12 px-6" >
      <div className="max-w-6xl mx-auto">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">N</span>
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

        {/* Copyright */}
        <div className="text-center mb-6">
          <p className="text-gray-500 text-sm">
            © {currentYear} All Rights Reserved
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.name}
                href={social.href}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:text-blue-500 hover:bg-blue-50 transition-colors shadow-sm"
                aria-label={social.name}
              >
                <IconComponent className="w-5 h-5" />
              </a>
            );
          })}
        </div>

        {/* Made in France Badge */}
        <div className="text-center mt-8">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white text-gray-600 shadow-sm">
            🇫🇷 Made in France
          </span>
        </div>
      </div>
    </footer>
  );
}