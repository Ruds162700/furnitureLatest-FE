import React from "react";
import { Home, Facebook, Instagram, Youtube, Twitter, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-[#F4ECE6] text-[#2B2B2B]">
      {/* Top Accent Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-[#D79C66]" />

      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        {/* Brand Logo + Name */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="p-3 rounded-xl bg-[#FAF8F5] shadow-md">
            <Home className="w-7 h-7 text-[#D79C66]" />
          </div>
          <h2 className="text-2xl font-extrabold tracking-tight">ANKIT INTERIOR</h2>
          <p className="text-sm text-[#6D6D6D] max-w-lg">
            Designing stunning spaces with elegance, detail, and creativity.
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center flex-wrap gap-4">
          {[
            { Icon: Facebook, href: "#" },
            { Icon: Instagram, href: "#" },
            { Icon: Youtube, href: "#" },
            { Icon: Twitter, href: "#" },
            { Icon: Phone, href: "tel:+1234567890" },
            { Icon: Mail, href: "mailto:example@mail.com" }
          ].map(({ Icon, href }, i) => (
            <a
              key={i}
              href={href}
              aria-label="Social"
              className="p-3 rounded-full bg-[#FAF8F5] shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
            >
              <Icon className="w-5 h-5 text-[#D79C66]" />
            </a>
          ))}
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-5 text-sm font-medium">
          {["Home", "Category", "About Us", "Contact"].map((label, i) => (
            <React.Fragment key={label}>
              <a
                href={`/${label.toLowerCase().replace(/\s/g, '')}`}
                className="hover:text-[#D79C66] transition relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#D79C66] hover:after:w-full after:transition-all after:duration-300"
              >
                {label}
              </a>
              {i < 3 && <span className="text-[#E1DDD7] hidden md:inline">•</span>}
            </React.Fragment>
          ))}
        </nav>

        {/* Legal Links */}
        <div className="flex flex-wrap justify-center gap-4 text-xs text-[#6D6D6D]">
          {["Terms & Conditions", "Privacy Policy", "Legal Notice"].map((label, i) => (
            <React.Fragment key={label}>
              <a
                href={`/${label.toLowerCase().replace(/ &| /g, '')}`}
                className="hover:text-[#D79C66] transition"
              >
                {label}
              </a>
              {i < 2 && <span className="hidden md:inline">•</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-center text-xs text-[#6D6D6D] pt-2">
          © 2024 Ankit Interior • Made with ❤️ for beautiful spaces
        </p>
      </div>

      {/* Bottom Decorative Line */}
      <div className="absolute bottom-0 left-0 w-full h-1" style={{
        background: 'linear-gradient(90deg, #D79C66 0%, #E1DDD7 50%, #D79C66 100%)'
      }} />
    </footer>
  );
};

export default Footer;
