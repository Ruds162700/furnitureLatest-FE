import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

// Navbar Component
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "/" },
    { name: "Category", href: "/category" },
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className="w-full h-20 flex items-center justify-between px-6 lg:px-12 bg-[#1c1c1c] text-white z-50">
      {/* Logo */}
      <div className="text-3xl font-bold">
        H<span className="text-orange-400">🛖</span>NIAN
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 text-lg font-medium">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="hover:text-orange-400 transition duration-300"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Hamburger Icon for Mobile */}
      <button className="md:hidden z-50" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <></> : <AiOutlineMenu size={30} />}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#1c1c1c] flex flex-col items-center justify-center transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-40`}
      >
        {/* Close button inside mobile menu */}
        <button
          className="absolute top-5 right-5 text-white z-50"
          onClick={() => setMenuOpen(false)}
        >
          <AiOutlineClose size={30} />
        </button>

        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="text-2xl text-white py-2 hover:text-orange-400 transition duration-300"
            onClick={() => setMenuOpen(false)} // Close menu when an item is clicked
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Register Button */}
      <button className="hidden md:block border-2 border-white text-white px-6 py-2 rounded-full font-medium hover:bg-white hover:text-black transition duration-300">
        Register
      </button>
    </nav>
  );
};

export default Navbar;
