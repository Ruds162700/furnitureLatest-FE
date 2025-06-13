import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Tag,
  MessageSquare,
  Settings,
  LogOut,
  X,
  Menu,
} from "lucide-react";

// AdminSidebar Component
const AdminSidebar = ({ mobile, onClose, isSidebarOpen, setIsSidebarOpen }) => {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/admin" },
    {
      name: "Products",
      icon: <ShoppingBag size={20} />,
      path: "/admin/products",
    },
    { name: "Categories", icon: <Tag size={20} />, path: "/admin/categories" },
    {
      name: "Inquiries",
      icon: <MessageSquare size={20} />,
      path: "/admin/inquiries",
    },
    { name: "Settings", icon: <Settings size={20} />, path: "/admin/settings" },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    // Handle sidebar closing for mobile
    if (onClose) {
      onClose();
    } else if (setIsSidebarOpen && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handleCloseClick = () => {
    if (onClose) {
      onClose();
    } else if (setIsSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  // For mobile overlay version
  if (mobile) {
    return (
      <div className="flex flex-col h-full">
        {/* Sidebar header with close button */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: '#E1DDD7' }}>
          <h2 className="text-xl font-bold" style={{ color: '#2B2B2B' }}>
            Interior Design
          </h2>
          <button
            onClick={handleCloseClick}
            className="p-1 rounded-md transition-colors duration-200"
            style={{ color: '#2B2B2B' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#E1DDD7'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation menu */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 text-left block
                    ${
                      isActive(item.path)
                        ? "text-white"
                        : "hover:bg-white hover:bg-opacity-20"
                    }`}
                  style={{
                    backgroundColor: isActive(item.path) ? '#D79C66' : 'transparent',
                    color: isActive(item.path) ? 'white' : '#2B2B2B',
                  }}
                  onClick={handleLinkClick}
                >
                  <span className="mr-3">{item.icon}</span>
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 border-t" style={{ borderColor: '#E1DDD7' }}>
          <Link
            to="/"
            className="w-full flex items-center p-3 rounded-lg transition-colors duration-200 text-left block"
            style={{ color: '#DC2626' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(220, 38, 38, 0.1)'}
            onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            onClick={handleLinkClick}
          >
            <LogOut size={20} className="mr-3" />
            <span>Back to Site</span>
          </Link>
        </div>
      </div>
    );
  }

  // For desktop sidebar or when using the alternative prop pattern
  return (
    <>
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 shadow-lg transition-all duration-300 ease-in-out
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:translate-x-0 lg:static lg:z-auto`}
        style={{ backgroundColor: '#F4ECE6' }}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: '#E1DDD7' }}>
            <h2 className="text-xl font-bold" style={{ color: '#2B2B2B' }}>
              Interior Design
            </h2>
            <button
              onClick={handleCloseClick}
              className="p-1 rounded-md transition-colors duration-200 lg:hidden"
              style={{ color: '#2B2B2B' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#E1DDD7'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation menu */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-1">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`w-full flex items-center p-3 rounded-lg transition-colors duration-200 text-left block
                      ${
                        isActive(item.path)
                          ? "text-white"
                          : "hover:bg-white hover:bg-opacity-20"
                      }`}
                    style={{
                      backgroundColor: isActive(item.path) ? '#D79C66' : 'transparent',
                      color: isActive(item.path) ? 'white' : '#2B2B2B',
                    }}
                    onClick={handleLinkClick}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t" style={{ borderColor: '#E1DDD7' }}>
            <Link
              to="/"
              className="w-full flex items-center p-3 rounded-lg transition-colors duration-200 text-left block"
              style={{ color: '#DC2626' }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(220, 38, 38, 0.1)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              onClick={handleLinkClick}
            >
              <LogOut size={20} className="mr-3" />
              <span>Back to Site</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;