"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Phone, Menu, X } from "lucide-react";

export default function MobileNavbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="lg:hidden w-full fixed top-0 left-0 right-0 z-50 px-4 py-3 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Noto Logo"
              width={32}
              height={32}
              className="object-contain"
            />
            <span className="text-lg font-medium text-gray-900">Noto</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? (
              <X size={20} className="text-gray-600" />
            ) : (
              <Menu size={20} className="text-gray-600" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-16 left-0 right-0 bg-white border-b border-gray-200 z-40 transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
      >
        <div className="px-4 py-4 space-y-1">
          <Link
            href="#benefits"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
          >
            Benefits
          </Link>
          <Link
            href="#integrations"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
          >
            Integrations
          </Link>
          <Link
            href="#faq"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
          >
            FAQ
          </Link>
          <Link
            href="#connect"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
          >
            Connect
          </Link>
          <div className="pt-2 mt-2 border-t border-gray-200">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <Phone size={16} />
              Book a call
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-black bg-opacity-20 z-30 transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
