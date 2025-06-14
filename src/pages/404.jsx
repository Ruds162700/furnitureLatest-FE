import React, { useState, useEffect } from 'react';

const NotFoundPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div
      className="min-h-screen flex items-center justify-center overflow-hidden relative"
      style={{ backgroundColor: '#FAF8F5' }}
    >
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
        <div className="floating-shape shape-4"></div>
        <div className="floating-shape shape-5"></div>
        <div className="floating-shape shape-6"></div>
      </div>

      {/* Main Content */}
      <div
        className={`text-center relative z-10 w-full max-w-2xl mx-4 p-6 sm:p-10 md:p-12 rounded-3xl transition-all duration-1000 ${
          isVisible ? 'animate-fade-in' : 'opacity-0 translate-y-10'
        }`}
        style={{
          backgroundColor: '#F4ECE6',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.06)',
        }}
      >
        {/* 404 Number */}
        <div className="relative mb-6 md:mb-8">
          <h1
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold mb-2 md:mb-4 animate-bounce-glow"
            style={{
              color: '#D79C66',
              fontFamily: 'Montserrat, sans-serif',
              textShadow: '0 4px 8px rgba(215, 156, 102, 0.3)',
            }}
          >
            404
          </h1>
          <div className="absolute -top-2 -right-2 w-6 h-6 md:w-8 md:h-8 bg-gradient-to-r from-orange-300 to-orange-400 rounded-full animate-ping"></div>
        </div>

        {/* Title */}
        <h2
          className={`text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 md:mb-6 transition-all duration-700 delay-300 ${
            isVisible ? 'animate-slide-in-left' : 'opacity-0 -translate-x-10'
          }`}
          style={{
            color: '#2B2B2B',
            fontFamily: 'Montserrat, sans-serif',
          }}
        >
          Oops! Room Not Found
        </h2>

        {/* Subtitle */}
        <p
          className={`text-base sm:text-lg md:text-xl mb-6 md:mb-8 leading-relaxed transition-all duration-700 delay-500 ${
            isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-10'
          }`}
          style={{ color: '#6D6D6D' }}
        >
          It seems like you've wandered into an unfinished space. Let’s take you
          back to our beautifully designed areas.
        </p>

        {/* Decorative Divider */}
        <div className="flex justify-center items-center mb-6 md:mb-8 space-x-4">
          <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent animate-pulse"></div>
          <div
            className="w-2.5 md:w-3 h-2.5 md:h-3 rounded-full animate-bounce"
            style={{ backgroundColor: '#D79C66' }}
          ></div>
          <div className="w-12 md:w-16 h-1 bg-gradient-to-r from-transparent via-orange-300 to-transparent animate-pulse"></div>
        </div>

        {/* Button */}
        <button
          className={`px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-lg rounded-full font-semibold transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-orange-200 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
          style={{
            backgroundColor: '#D79C66',
            color: 'white',
            boxShadow: '0 4px 15px rgba(215, 156, 102, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#C9854D';
            e.target.style.boxShadow = '0 8px 25px rgba(215, 156, 102, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#D79C66';
            e.target.style.boxShadow = '0 4px 15px rgba(215, 156, 102, 0.3)';
          }}
          onClick={() => (window.location.href = '/')}
        >
          Return to Our Showroom
        </button>

        {/* Contact Text */}
        <div className="mt-6 md:mt-8 text-sm opacity-60" style={{ color: '#6D6D6D' }}>
          <p>Need help? Contact our design team</p>
        </div>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Poppins:wght@300;400;500;600&display=swap');

        .floating-shape {
          position: absolute;
          border-radius: 50%;
          animation: float 6s ease-in-out infinite;
          opacity: 0.7;
        }

        .shape-1 {
          width: 80px;
          height: 80px;
          background: linear-gradient(45deg, #d79c66, #e1b076);
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 60px;
          height: 60px;
          background: linear-gradient(45deg, #f4ece6, #e1ddd7);
          top: 20%;
          right: 15%;
          animation-delay: 1s;
        }

        .shape-3 {
          width: 100px;
          height: 100px;
          background: linear-gradient(45deg, #d79c66, #c9854d);
          bottom: 15%;
          left: 20%;
          animation-delay: 2s;
        }

        .shape-4 {
          width: 70px;
          height: 70px;
          background: linear-gradient(45deg, #e1ddd7, #f4ece6);
          bottom: 20%;
          right: 10%;
          animation-delay: 3s;
        }

        .shape-5 {
          width: 90px;
          height: 90px;
          background: linear-gradient(135deg, #d79c66, #f4ece6);
          top: 50%;
          left: 5%;
          animation-delay: 4s;
        }

        .shape-6 {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #c9854d, #e1ddd7);
          top: 60%;
          right: 5%;
          animation-delay: 5s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg) scale(1);
            opacity: 0.9;
          }
          50% {
            transform: translateY(-20px) rotate(180deg) scale(1.05);
            opacity: 1;
          }
        }

        @keyframes bounce-glow {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0);
            text-shadow: 0 4px 8px rgba(215, 156, 102, 0.3);
          }
          40% {
            transform: translateY(-10px);
            text-shadow: 0 8px 20px rgba(215, 156, 102, 0.5);
          }
          60% {
            transform: translateY(-5px);
            text-shadow: 0 6px 15px rgba(215, 156, 102, 0.4);
          }
        }

        @keyframes slide-in-left {
          0% {
            opacity: 0;
            transform: translateX(-50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          0% {
            opacity: 0;
            transform: translateX(50px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-bounce-glow {
          animation: bounce-glow 2s infinite;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out 0.8s both;
        }

        @media (max-width: 768px) {
          .floating-shape {
            opacity: 0.4;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
