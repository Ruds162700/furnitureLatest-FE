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
    <nav className="w-full h-20 flex items-center justify-between px-6 lg:px-12 bg-[#FAF8F5] text-[#2B2B2B] z-50 fixed top-0 left-0 shadow-sm border-b border-[#E1DDD7]">
      {/* Logo */}
      <div className="text-4xl font-bold">  {/* Increased from text-3xl */}
        H<span className="text-[#D79C66]">🛖</span>NIAN
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex gap-6 text-xl font-medium">  {/* Increased from text-lg */}
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.href}
            className="hover:text-[#D79C66] hover:scale-105 transition duration-300"
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Hamburger Icon for Mobile */}
      <button className="md:hidden z-50 text-[#2B2B2B] hover:text-[#D79C66] transition duration-300" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <></> : <AiOutlineMenu size={35} />}  {/* Increased from size={30} */}
      </button>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-[#FAF8F5] flex flex-col items-center justify-center transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-40`}
      >
        {/* Close button inside mobile menu */}
        <button
          className="absolute top-5 right-5 text-[#2B2B2B] hover:text-[#D79C66] transition duration-300"
          onClick={() => setMenuOpen(false)}
        >
          <AiOutlineClose size={35} />  {/* Increased from size={30} */}
        </button>

        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="text-3xl text-[#2B2B2B] py-3 hover:text-[#D79C66] hover:scale-105 transition duration-300"  
            onClick={() => setMenuOpen(false)}
          >
            {item.name}
          </Link>
        ))}
      </div>

      {/* Register Button */}
      <button className="hidden md:block border-2 border-[#D79C66] text-[#D79C66] px-6 py-2 rounded-full text-lg font-medium hover:bg-[#D79C66] hover:text-white transition duration-300">  {/* Added text-lg */}
        Register
      </button>
    </nav>
  );
};

export default Navbar;