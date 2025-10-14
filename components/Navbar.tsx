import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between ">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image
          src="/logo.png"
          alt="Noto Logo"
          width={32}
          height={32}
          className="w-8 h-8 object-contain"
        />
        <span className="text-xl font-semibold text-gray-900">Noto</span>
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center gap-8">
        <Link 
          href="#benefits" 
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Benefits
        </Link>
        <Link 
          href="#integrations" 
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Integrations
        </Link>
        <Link 
          href="#testimonials" 
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          Testimonials
        </Link>
        <Link 
          href="#faq" 
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          FAQ
        </Link>
      </div>

      {/* CTA Button */}
      <button className="bg-gray-900 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition-colors">
        Book a call
      </button>
    </nav>
  );
}