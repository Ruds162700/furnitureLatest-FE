import React from "react";
import { Star, Globe, Users, Briefcase, Award, Building, Zap, Shield } from "lucide-react";

const TrustedCarousel = () => {
  const trustedCompanies = [
    {
      name: "GlobalCorp",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&auto=format",
    },
    {
      name: "StarTech Solutions",
      image: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=80&h=80&fit=crop&auto=format",
    },
    {
      name: "Humanify Spaces", 
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=80&h=80&fit=crop&auto=format",
    },
    {
      name: "ProConsult Group",
      image: "https://images.unsplash.com/photo-1560472354-a3ec8f0946eb?w=80&h=80&fit=crop&auto=format",
    },
    {
      name: "EliteBuilders Co",
      image: "https://images.unsplash.com/photo-1560472355-536de3962603?w=80&h=80&fit=crop&auto=format",
    },
    {
      name: "InnoDesign Studio",
      image: "https://images.unsplash.com/photo-1560472354-ca1785fb6e69?w=80&h=80&fit=crop&auto=format",
    },
    {
      name: "TrustHome Partners",
      image: "https://images.unsplash.com/photo-1560472355-109703aa3edc?w=80&h=80&fit=crop&auto=format",
    },
    {
      name: "AwardWorks Design",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=80&h=80&fit=crop&auto=format",
    }
  ];

  return (
    <section className="py-16 overflow-hidden" style={{ backgroundColor: '#F4ECE6' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4" 
               style={{ backgroundColor: '#FAF8F5', border: '1px solid #E1DDD7' }}>
            <Star className="w-4 h-4" style={{ color: '#D79C66' }} />
            <span className="text-sm font-medium" style={{ color: '#6D6D6D' }}>Trusted Partners</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: '#2B2B2B' }}>
            Industry Leaders Trust Us
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: '#6D6D6D' }}>
            Building excellence with innovative companies worldwide
          </p>
        </div>

        {/* Infinite Scrolling Logo Carousel */}
        <div className="relative">
          <div className="logo-scroll-container">
            <div className="logo-scroll-track">
              {/* First set of logos */}
              {trustedCompanies.map((company, index) => (
                <div key={index} className="logo-item">
                  <div className="logo-card">
                    <div className="logo-image-container">
                      <img 
                        src={company.image} 
                        alt={company.name}
                        className="logo-image"
                      />
                      <div className="logo-overlay"></div>
                    </div>
                    <h3 className="logo-name">{company.name}</h3>
                  </div>
                </div>
              ))}
              {/* Duplicate set for seamless loop */}
              {trustedCompanies.map((company, index) => (
                <div key={`duplicate-${index}`} className="logo-item">
                  <div className="logo-card">
                    <div className="logo-image-container">
                      <img 
                        src={company.image} 
                        alt={company.name}
                        className="logo-image"
                      />
                      <div className="logo-overlay"></div>
                    </div>
                    <h3 className="logo-name">{company.name}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: "500+", label: "Projects" },
            { value: "50+", label: "Partners" },
            { value: "15+", label: "Years" },
            { value: "98%", label: "Satisfaction" }
          ].map((stat, index) => (
            <div key={index} 
                 className="text-center p-4 bg-white rounded-lg border border-gray-100">
              <div className="text-2xl font-bold mb-1" style={{ color: '#D79C66' }}>
                {stat.value}
              </div>
              <div className="text-sm" style={{ color: '#6D6D6D' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Infinite Scroll Styles */}
      <style jsx>{`
        .logo-scroll-container {
          overflow: hidden;
          white-space: nowrap;
          position: relative;
          background: linear-gradient(135deg, #FAF8F5 0%, #F4ECE6 100%);
          border-radius: 20px;
          padding: 2rem 0;
          box-shadow: inset 0 2px 10px rgba(215, 156, 102, 0.1);
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .logo-scroll-track {
          display: inline-flex;
          animation: scroll 35s linear infinite;
          gap: 2.5rem;
          padding: 0 2rem;
        }

        .logo-scroll-track:hover {
          animation-play-state: paused;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .logo-item {
          flex-shrink: 0;
          width: 220px;
          padding: 0 0.5rem;
        }

        .logo-card {
          background: linear-gradient(145deg, #ffffff 0%, #fefefe 100%);
          border-radius: 16px;
          padding: 2rem 1.5rem;
          text-align: center;
          border: 2px solid transparent;
          background-clip: padding-box;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.08),
            0 1px 3px rgba(0, 0, 0, 0.1);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          height: 140px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .logo-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(145deg, 
            rgba(215, 156, 102, 0.1) 0%, 
            rgba(215, 156, 102, 0.05) 50%,
            transparent 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .logo-card:hover::before {
          opacity: 1;
        }

        .logo-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 
            0 20px 40px rgba(215, 156, 102, 0.2),
            0 8px 16px rgba(0, 0, 0, 0.1);
          border-color: rgba(215, 156, 102, 0.3);
        }

        .logo-image-container {
          position: relative;
          margin-bottom: 1rem;
          width: 60px;
          height: 60px;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transition: all 0.3s ease;
        }

        .logo-card:hover .logo-image-container {
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(215, 156, 102, 0.3);
        }

        .logo-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.3s ease;
        }

        .logo-card:hover .logo-image {
          transform: scale(1.05);
        }

        .logo-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, 
            rgba(215, 156, 102, 0.1) 0%, 
            rgba(215, 156, 102, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .logo-card:hover .logo-overlay {
          opacity: 1;
        }

        .logo-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #2B2B2B;
          line-height: 1.3;
          transition: all 0.3s ease;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }

        .logo-card:hover .logo-name {
          color: #D79C66;
          transform: translateY(-2px);
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .logo-scroll-container {
            padding: 1.5rem 0;
          }
          
          .logo-scroll-track {
            animation-duration: 28s;
            gap: 2rem;
          }
          
          .logo-item {
            width: 180px;
          }
          
          .logo-card {
            padding: 1.5rem 1rem;
            height: 120px;
          }
          
          .logo-image-container {
            width: 50px;
            height: 50px;
          }
          
          .logo-name {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .logo-scroll-container {
            padding: 1rem 0;
          }
          
          .logo-scroll-track {
            animation-duration: 22s;
            gap: 1.5rem;
          }
          
          .logo-item {
            width: 160px;
          }
          
          .logo-card {
            padding: 1rem 0.75rem;
            height: 100px;
          }
          
          .logo-image-container {
            width: 45px;
            height: 45px;
          }
          
          .logo-name {
            font-size: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
};

export default TrustedCarousel;