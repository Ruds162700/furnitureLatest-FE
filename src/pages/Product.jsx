import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import InquiryModal from "../Component/InquiryModal";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [showAllImages, setShowAllImages] = useState(false);
  const [magnifierPosition, setMagnifierPosition] = useState({ x: 0, y: 0 });
  const [backgroundPosition, setBackgroundPosition] = useState("0% 0%");
  const [showMagnifier, setShowMagnifier] = useState(false);
  const imageRef = useRef(null);

  const VISIBLE_THUMBNAILS = 4;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://interior-designer-backend-73ri.onrender.com/api/postById/${id}`
        );
        const data = response.data;
        setProduct(data);
        setSelectedImage(data.files[0]?.url || "");
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate lens position
    const lensSize = 120;
    const lensX = Math.max(
      lensSize / 2,
      Math.min(x, rect.width - lensSize / 2)
    );
    const lensY = Math.max(
      lensSize / 2,
      Math.min(y, rect.height - lensSize / 2)
    );

    setMagnifierPosition({ x: lensX - lensSize / 2, y: lensY - lensSize / 2 });

    // Calculate background position for zoom effect
    const bgX = (x / rect.width) * 100;
    const bgY = (y / rect.height) * 100;
    setBackgroundPosition(`${bgX}% ${bgY}%`);
  };

  const handleMouseEnter = () => {
    setShowMagnifier(true);
  };

  const handleMouseLeave = () => {
    setShowMagnifier(false);
  };

  const getVisibleThumbnails = () => {
    if (!product?.files) return [];

    if (showAllImages || product.files.length <= VISIBLE_THUMBNAILS) {
      return product.files;
    }

    return product.files.slice(0, VISIBLE_THUMBNAILS - 1);
  };

  const getRemainingCount = () => {
    if (!product?.files) return 0;
    return Math.max(0, product.files.length - (VISIBLE_THUMBNAILS - 1));
  };

  if (!product) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#FAF8F5" }}
      >
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4"
            style={{ borderColor: "#D79C66" }}
          ></div>
          <div className="text-gray-600 text-lg">Loading product...</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full min-h-screen"
      style={{
        background: `linear-gradient(135deg, #FAF8F5 0%, #F5F1EC 100%)`,
        color: `#2B2B2B`,
        paddingTop: "100px",
      }}
    >
      {/* Main Container */}
      <div className="px-4 sm:px-6 lg:px-8 pb-12">
        <div className="flex flex-col lg:flex-row items-start max-w-7xl mx-auto gap-8 lg:gap-12">
          {/* Image Section */}
          <div className="flex flex-col items-center lg:w-1/2 w-full">
            {/* Main Image with Lens Magnifier */}
            <div
              className="relative p-4 sm:p-6 rounded-2xl shadow-lg overflow-hidden w-full max-w-md lg:max-w-lg"
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E8E3DD",
              }}
            >
              <div
                className="relative overflow-hidden rounded-xl"
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <img
                  ref={imageRef}
                  className="rounded-xl w-full h-64 sm:h-80 lg:h-96 object-contain transition-transform duration-300 cursor-crosshair bg-white"
                  src={selectedImage}
                  alt="Selected Product"
                />

                {/* Lens Magnifier */}
                {showMagnifier && (
                  <div
                    className="absolute border-2 border-white shadow-lg rounded-full pointer-events-none hidden lg:block"
                    style={{
                      width: "120px",
                      height: "120px",
                      left: `${magnifierPosition.x}px`,
                      top: `${magnifierPosition.y}px`,
                      backgroundImage: `url(${selectedImage})`,
                      backgroundSize: "400% 400%",
                      backgroundPosition: backgroundPosition,
                      boxShadow:
                        "0 0 0 2px rgba(215, 156, 102, 0.8), inset 0 0 0 2px rgba(255,255,255,0.8)",
                      backgroundColor: "#FFFFFF",
                    }}
                  />
                )}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex flex-wrap justify-center mt-6 gap-2 sm:gap-3 max-w-md lg:max-w-lg">
              {getVisibleThumbnails().map((file, index) => (
                <div
                  key={index}
                  className={`h-12 w-12 sm:h-16 sm:w-16 lg:h-18 lg:w-18 cursor-pointer rounded-lg overflow-hidden border-2 hover:scale-105 transition-all duration-300 shadow-sm`}
                  style={{
                    borderColor:
                      selectedImage === file.url ? "#D79C66" : "#E1DDD7",
                    boxShadow:
                      selectedImage === file.url
                        ? "0 2px 8px rgba(215, 156, 102, 0.3)"
                        : "0 1px 4px rgba(0,0,0,0.1)",
                  }}
                  onClick={() => setSelectedImage(file.url)}
                >
                  <img
                    className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
                    src={file.url}
                    alt={`Gallery ${index + 1}`}
                  />
                </div>
              ))}

              {/* Show More Button */}
              {!showAllImages && product.files.length > VISIBLE_THUMBNAILS && (
                <div
                  className="h-12 w-12 sm:h-16 sm:w-16 lg:h-18 lg:w-18 cursor-pointer rounded-lg border-2 border-dashed hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-sm"
                  style={{
                    borderColor: "#D79C66",
                    backgroundColor: "#FFF8F5",
                  }}
                  onClick={() => setShowAllImages(true)}
                >
                  <div className="text-center">
                    <div
                      className="text-sm sm:text-base font-bold"
                      style={{ color: "#D79C66" }}
                    >
                      +{getRemainingCount()}
                    </div>
                  </div>
                </div>
              )}

              {/* Show Less Button */}
              {showAllImages && product.files.length > VISIBLE_THUMBNAILS && (
                <div
                  className="h-12 w-12 sm:h-16 sm:w-16 lg:h-18 lg:w-18 cursor-pointer rounded-lg border-2 hover:scale-105 transition-all duration-300 flex items-center justify-center shadow-sm"
                  style={{
                    borderColor: "#6D6D6D",
                    backgroundColor: "#F5F5F5",
                  }}
                  onClick={() => setShowAllImages(false)}
                >
                  <div
                    className="text-sm sm:text-base font-bold"
                    style={{ color: "#6D6D6D" }}
                  >
                    ×
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="flex flex-col lg:w-1/2 w-full text-center lg:text-left">
            {/* Product Title */}
            <h1
              className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight"
              style={{ color: "#2B2B2B" }}
            >
              {product.title}
            </h1>

            {/* Category Badge */}
            <div className="flex justify-center lg:justify-start mb-6">
              <span
                className="text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md"
                style={{ backgroundColor: "#D79C66" }}
              >
                {product.category}
              </span>
            </div>

            {/* Description */}
            <div
              className="leading-relaxed mb-6 text-base sm:text-lg"
              style={{ color: "#6D6D6D" }}
            >
              <p>{product.description}</p>
            </div>

            {/* Key Features */}
            <div className="mb-8">
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "#2B2B2B" }}
              >
                Key Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#D79C66" }}
                  ></div>
                  <span className="text-sm" style={{ color: "#6D6D6D" }}>
                    Premium Quality
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#D79C66" }}
                  ></div>
                  <span className="text-sm" style={{ color: "#6D6D6D" }}>
                    Fast Delivery
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#D79C66" }}
                  ></div>
                  <span className="text-sm" style={{ color: "#6D6D6D" }}>
                    Easy Installation
                  </span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: "#D79C66" }}
                  ></div>
                  <span className="text-sm" style={{ color: "#6D6D6D" }}>
                    1 Year Warranty
                  </span>
                </div>
              </div>
            </div>

            {/* Price Section - Responsive sizing */}
            <div
              className="mb-8 p-4 rounded-xl"
              style={{
                backgroundColor: "#FFF8F5",
                border: "1px solid #E8E3DD",
              }}
            >
              <div
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2"
                style={{ color: "#D79C66" }}
              >
                ₹{product.price.toLocaleString()}
              </div>
              <div className="text-sm flex items-center justify-center lg:justify-start gap-2">
                <span className="line-through" style={{ color: "#6D6D6D" }}>
                  ₹{(product.price * 1.2).toLocaleString()}
                </span>
                <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 rounded text-xs">
                  Save 20%
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4 mb-8">
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-white px-6 py-3 rounded-xl text-base sm:text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                style={{ backgroundColor: "#D79C66" }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#C9854D")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#D79C66")}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                Inquire Now
              </button>
              <button
                className="text-white px-6 py-3 rounded-xl text-base sm:text-lg font-semibold shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
                style={{ backgroundColor: "#6D6D6D" }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#5A5A5A")
                }
                onMouseOut={(e) => (e.target.style.backgroundColor = "#6D6D6D")}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6.5-5v5a2 2 0 01-2 2H9a2 2 0 01-2-2v-5m8-5V8a2 2 0 00-2-2H9a2 2 0 00-2 2v1"
                  />
                </svg>
                Add to Cart
              </button>
            </div>

            {/* Trust Badges */}
            <div
              className="flex flex-wrap justify-center lg:justify-start items-center gap-4 sm:gap-6 pt-6 border-t"
              style={{ borderColor: "#E8E3DD" }}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  style={{ color: "#D79C66" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span
                  className="text-xs sm:text-sm"
                  style={{ color: "#6D6D6D" }}
                >
                  Secure Payment
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  style={{ color: "#D79C66" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                <span
                  className="text-xs sm:text-sm"
                  style={{ color: "#6D6D6D" }}
                >
                  Free Shipping
                </span>
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  style={{ color: "#D79C66" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clipRule="evenodd"
                  />
                </svg>
                <span
                  className="text-xs sm:text-sm"
                  style={{ color: "#6D6D6D" }}
                >
                  Easy Returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Modal */}
      <InquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(data) => {
          console.log("Form data:", data);
          // Add your API call or data handling logic here
        }}
      />
    </div>
  );
};

export default Product;
