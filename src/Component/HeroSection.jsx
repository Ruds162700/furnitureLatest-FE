import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ArrowRight,
  Star,
  Home,
  Sparkles,
  Heart,
} from "lucide-react";

// Hero Section Component
const HeroSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const categories = [
    {
      title: "Living Room",
      description: "Cozy spaces for family moments",
      icon: <Home className="w-6 h-6" />,
      accent: "#E8D5C4",
      features: ["Comfortable Seating", "Ambient Lighting", "Smart Storage"],
    },
    {
      title: "Kitchen Set",
      description: "Functional beauty for culinary arts",
      icon: <Sparkles className="w-6 h-6" />,
      accent: "#D4C4B0",
      features: ["Modern Appliances", "Elegant Counters", "Smart Organization"],
    },
    {
      title: "Bedroom",
      description: "Peaceful retreats for restful nights",
      icon: <Heart className="w-6 h-6" />,
      accent: "#C9B8A8",
      features: ["Luxurious Comfort", "Serene Ambiance", "Custom Storage"],
    },
  ];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    setIsVisible(true);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full" style={{ backgroundColor: "#FDFCFA" }}>
      <div className="relative min-h-screen flex flex-col">
        {/* Enhanced Background with Modern Gradient */}
        <div className="absolute inset-0">
          {/* Beautiful Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')`,
              backgroundPosition: "center",
              filter: "brightness(0.4) saturate(0.7) contrast(1.2)",
            }}
          />

          {/* Strong Overlay for Better Text Contrast */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(135deg, 
                rgba(0, 0, 0, 0.7) 0%, 
                rgba(61, 53, 48, 0.75) 20%,
                rgba(107, 91, 79, 0.6) 40%,
                rgba(61, 53, 48, 0.65) 60%,
                rgba(0, 0, 0, 0.7) 80%,
                rgba(0, 0, 0, 0.8) 100%)`,
            }}
          />

          {/* Animated Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute top-20 left-10 w-32 h-32 rounded-full opacity-10 animate-pulse"
              style={{
                background:
                  "radial-gradient(circle, rgba(139, 115, 85, 0.3) 0%, transparent 70%)",
                animationDuration: "4s",
              }}
            />
            <div
              className="absolute top-40 right-20 w-24 h-24 rounded-full opacity-10 animate-pulse"
              style={{
                background:
                  "radial-gradient(circle, rgba(201, 184, 168, 0.4) 0%, transparent 70%)",
                animationDuration: "3s",
                animationDelay: "1s",
              }}
            />
            <div
              className="absolute bottom-32 left-1/4 w-20 h-20 rounded-full opacity-10 animate-pulse"
              style={{
                background:
                  "radial-gradient(circle, rgba(228, 213, 196, 0.3) 0%, transparent 70%)",
                animationDuration: "5s",
                animationDelay: "2s",
              }}
            />
          </div>
        </div>

        {/* Hero Content - Adjusted Flex Layout */}
        <div className="relative z-10 flex-1 flex flex-col">
          <div
            className={`flex-1 flex flex-col items-start justify-center px-6 md:px-12 lg:px-20 transition-all duration-1200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
            style={{ paddingTop: "8rem", paddingBottom: "2rem" }}
          >
            <div className="max-w-2xl">
              <span
                className="inline-block text-sm md:text-base font-semibold mb-8 px-6 py-3 rounded-full backdrop-blur-sm border transition-all duration-300 hover:shadow-lg hover:scale-105"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  borderColor: "rgba(201, 184, 168, 0.6)",
                  color: "#3D3530",
                  fontFamily:
                    '"Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  fontWeight: "600",
                }}
              >
                ✨ Welcome to Ankit Interior
              </span>

              <div className="space-y-6 mb-12">
                <h2
                  className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-wide"
                  style={{
                    color: "#FDFCFA",
                    fontFamily:
                      '"Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                    textShadow: "2px 2px 8px rgba(0,0,0,0.7)",
                    fontWeight: "500",
                  }}
                >
                  Customize Your
                </h2>
                <h1
                  className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
                  style={{
                    color: "#FDFCFA",
                    fontFamily:
                      '"Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                    textShadow: "3px 3px 12px rgba(0,0,0,0.8)",
                    fontWeight: "800",
                  }}
                >
                  <span
                    style={{
                      background:
                        "linear-gradient(135deg, #E8D5C4 0%, #F5E6D3 50%, #FFF8F0 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      textShadow: "none",
                    }}
                  >
                    DREAM
                  </span>{" "}
                  <span style={{ color: "#FDFCFA" }}>HOUSE</span>
                </h1>
                <p
                  className="text-lg md:text-xl leading-relaxed font-medium max-w-lg mt-8"
                  style={{
                    color: "#E8D5C4",
                    fontFamily:
                      '"Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                    textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
                    fontWeight: "500",
                  }}
                >
                  Transform your living space into a harmonious sanctuary with
                  our thoughtful design solutions
                </p>
              </div>

              <button
                onClick={() => (window.location.href = `/category`)}
                className="group relative inline-flex items-center gap-3 px-10 py-5 rounded-full transition-all duration-300 hover:shadow-2xl hover:scale-105 font-bold text-lg"
                style={{
                  background:
                    "linear-gradient(135deg, #8B7355 0%, #A68B5B 50%, #C9B8A8 100%)",
                  color: "#FDFCFA",
                  boxShadow: "0 10px 30px rgba(139, 115, 85, 0.4)",
                  fontFamily:
                    '"Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                  fontWeight: "700",
                  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                }}
              >
                Explore Designs
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Enhanced Category Cards - Positioned Higher */}
          {!isMobile && (
            <div className="relative z-20 w-full px-4 pb-12">
              <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className={`group relative overflow-hidden rounded-3xl backdrop-blur-lg transition-all duration-700 hover:shadow-2xl hover:-translate-y-3 cursor-pointer ${
                        isVisible
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-6"
                      }`}
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "2px solid rgba(201, 184, 168, 0.4)",
                        transitionDelay: `${index * 150}ms`,
                        boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
                      }}
                    >
                      {/* Card Header */}
                      <div className="p-8">
                        <div className="flex items-start gap-5 mb-6">
                          <div
                            className="p-4 rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                            style={{
                              background: `linear-gradient(135deg, ${category.accent} 0%, rgba(255,255,255,0.9) 100%)`,
                              boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
                            }}
                          >
                            <div style={{ color: "#3D3530" }}>
                              {category.icon}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3
                              className="text-2xl font-bold mb-3 group-hover:text-opacity-90 transition-all"
                              style={{
                                color: "#3D3530",
                                fontFamily:
                                  '"Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                                fontWeight: "700",
                              }}
                            >
                              {category.title}
                            </h3>
                            <p
                              className="text-lg leading-relaxed font-medium"
                              style={{
                                color: "#6B5B4F",
                                fontFamily:
                                  '"Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                                fontWeight: "500",
                              }}
                            >
                              {category.description}
                            </p>
                          </div>
                        </div>

                        {/* Features List */}
                        <div className="space-y-3">
                          {category.features.map((feature, featureIndex) => (
                            <div
                              key={featureIndex}
                              className="flex items-center gap-4 text-base opacity-80 group-hover:opacity-100 transition-opacity font-medium"
                              style={{ color: "#6B5B4F" }}
                            >
                              <Star
                                className="w-4 h-4 fill-current"
                                style={{ color: "#8B7355" }}
                              />
                              <span
                                style={{
                                  fontFamily:
                                    '"Segoe UI", -apple-system, BlinkMacSystemFont, system-ui, sans-serif',
                                  fontWeight: "500",
                                }}
                              >
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Enhanced Hover Effects */}
                      <div
                        className="absolute bottom-0 left-0 w-full h-2 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"
                        style={{
                          background:
                            "linear-gradient(135deg, #8B7355 0%, #A68B5B 100%)",
                        }}
                      />

                      {/* Gentle Glow Effect on Hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 rounded-3xl"
                        style={{ backgroundColor: category.accent }}
                      />

                      {/* Shimmer Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                          style={{ width: "50%" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Scroll Indicator */}
          <div className="relative z-30 pb-6 flex justify-center">
            <div className="animate-bounce">
              <ChevronDown
                size={28}
                style={{ color: "#E8D5C4" }}
                className="opacity-70 hover:opacity-100 transition-opacity filter drop-shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
