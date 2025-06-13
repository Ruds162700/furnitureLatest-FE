import React, { useState } from "react";
import { Search, X } from "lucide-react";

const Sidebar = ({
  categories,
  selectedCategories,
  setSelectedCategories,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryToggle = (categoryName) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryName)
        ? prev.filter((cat) => cat !== categoryName)
        : [...prev, categoryName]
    );
  };

  return (
    <>
      <aside
        className={`fixed lg:relative lg:block inset-y-0 left-0 
          w-[85vw] lg:w-[300px] h-full z-40
          transform transition-all duration-500 ease-in-out
          ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }`}
        style={{ top: isMobileMenuOpen ? '80px' : '0', height: isMobileMenuOpen ? 'calc(100vh - 80px)' : '100%' }}
      >
        <div className="h-full rounded-r-3xl lg:rounded-3xl shadow-lg border" style={{ 
          backgroundColor: '#F4ECE6',
          borderColor: '#E1DDD7'
        }}>
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between p-6">
              <div className="px-6 py-3 rounded-2xl shadow-md border" style={{ 
                backgroundColor: '#FAF8F5',
                borderColor: '#E1DDD7'
              }}>
                <h3 className="text-lg font-semibold" style={{ color: '#2B2B2B' }}>
                  Categories
                </h3>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden p-2 rounded-xl transition-all hover:scale-105"
                style={{ backgroundColor: '#E1DDD7' }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#D79C66';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#E1DDD7';
                }}
              >
                <X className="w-6 h-6" style={{ color: '#2B2B2B' }} />
              </button>
            </div>

            {/* Search and Categories */}
            <div className="flex-1 overflow-y-auto px-6 pb-6 space-y-6 scrollbar-thin scrollbar-track-transparent" 
                 style={{ scrollbarColor: '#D79C66 transparent' }}>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#6D6D6D' }} />
                <input
                  type="text"
                  placeholder="Search categories..."
                  className="w-full rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 transition-all border"
                  style={{ 
                    backgroundColor: '#FAF8F5',
                    borderColor: '#E1DDD7',
                    color: '#2B2B2B'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#D79C66';
                    e.target.style.boxShadow = '0 0 0 2px rgba(215, 156, 102, 0.2)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#E1DDD7';
                    e.target.style.boxShadow = 'none';
                  }}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="space-y-3">
                {filteredCategories.map((category, index) => (
                  <div key={index} className="group relative">
                    <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" 
                         style={{ backgroundColor: 'rgba(215, 156, 102, 0.1)' }} />
                    <div className="relative flex items-center space-x-4 p-4 rounded-2xl transition-all border"
                         style={{ 
                           backgroundColor: '#FAF8F5',
                           borderColor: '#E1DDD7'
                         }}
                         onMouseEnter={(e) => {
                           e.target.style.borderColor = '#D79C66';
                           e.target.style.backgroundColor = '#F4ECE6';
                         }}
                         onMouseLeave={(e) => {
                           e.target.style.borderColor = '#E1DDD7';
                           e.target.style.backgroundColor = '#FAF8F5';
                         }}>
                      <div className="flex-shrink-0">
                        <input
                          type="checkbox"
                          id={`category-${index}`}
                          className="appearance-none w-5 h-5 rounded-lg border-2 transition-all cursor-pointer"
                          style={{ 
                            borderColor: selectedCategories.includes(category.name) ? '#D79C66' : '#6D6D6D',
                            backgroundColor: selectedCategories.includes(category.name) ? '#D79C66' : 'transparent'
                          }}
                          checked={selectedCategories.includes(category.name)}
                          onChange={() => handleCategoryToggle(category.name)}
                        />
                        <svg
                          className={`absolute w-3 h-3 left-5 top-[22px] pointer-events-none transition-opacity ${
                            selectedCategories.includes(category.name)
                              ? "opacity-100"
                              : "opacity-0"
                          }`}
                          viewBox="0 0 17 12"
                          fill="none"
                        >
                          <path
                            d="M1 4.5L6 9.5L15.5 1"
                            stroke="white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <label
                        htmlFor={`category-${index}`}
                        className="flex-1 flex items-center justify-between cursor-pointer"
                      >
                        <span className="text-sm font-medium" style={{ color: '#2B2B2B' }}>
                          {category.name}
                        </span>
                        <span className="text-sm px-2 py-1 rounded-lg" style={{ 
                          color: '#6D6D6D',
                          backgroundColor: '#E1DDD7'
                        }}>
                          {category.count}
                        </span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-sm z-30 lg:hidden"
          style={{ backgroundColor: 'rgba(43, 43, 43, 0.6)' }}
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;