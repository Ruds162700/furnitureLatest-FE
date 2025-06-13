import React, { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import { Menu, X } from "lucide-react";

// AdminLayout Component
const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FAF8F5' }}>
      {/* Sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64">
        <AdminSidebar />
      </div>
      
      {/* Mobile sidebar overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        >
          <div 
            className="fixed left-0 top-0 h-full w-64 z-50"
            style={{ backgroundColor: '#F4ECE6' }}
            onClick={(e) => e.stopPropagation()}
          >
            <AdminSidebar mobile onClose={() => setIsSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top navbar */}
        <header 
          className="sticky top-0 z-30 px-4 py-3 shadow-sm border-b"
          style={{ 
            backgroundColor: '#FAF8F5',
            borderColor: '#E1DDD7',
            boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.04)'
          }}
        >
          <div className="flex items-center justify-between">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 rounded-lg lg:hidden transition-colors duration-200"
              style={{ 
                backgroundColor: 'transparent',
                color: '#2B2B2B'
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#F4ECE6'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            
            <h1 
              className="text-xl font-semibold lg:hidden"
              style={{ color: '#2B2B2B' }}
            >
              Admin Panel
            </h1>
            
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium"
                  style={{ 
                    backgroundColor: '#D79C66',
                    color: 'white'
                  }}
                >
                  A
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-6">
          <div 
            className="rounded-2xl p-6 shadow-sm"
            style={{ 
              backgroundColor: '#F4ECE6',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
            }}
          >
            {children || (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold mb-4" style={{ color: '#2B2B2B' }}>
                  Welcome to Admin Panel
                </h2>
                <p style={{ color: '#666' }}>
                  Select a menu item from the sidebar to get started.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;