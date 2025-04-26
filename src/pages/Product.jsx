  import React, { useState, useEffect } from "react";
  import { useParams } from "react-router-dom";
  import axios from "axios";
  import InquiryModal from "../Component/InquiryModal";

  const Product = () => {
    const { id } = useParams(); // Get product ID from route params
    const [product, setProduct] = useState(null); // Product data
    const [isModalOpen, setIsModalOpen] = useState(false); // Inquiry modal state
    const [selectedImage, setSelectedImage] = useState(""); // Selected image

    useEffect(() => {
      // Fetch product data
      const fetchProduct = async () => {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/postById/${id}`
          );
          const data = response.data;
          setProduct(data);
          setSelectedImage(data.files[0]?.url || ""); // Set default image
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };

      fetchProduct();
    }, [id]);

    if (!product) {
      return <div className="text-gray-100 text-center py-20">Loading...</div>;
    }

    return (
      <div
        className="px-4 w-full min-h-screen pt-20 text-gray-100"
        style={{
          background: `linear-gradient(145deg, #1C1C1C, #121212 40%, #2A2A2A)`,
        }}
      >
        {/* Main Container */}
        <div className="flex flex-col md:flex-row items-center md:items-start max-w-6xl mx-auto">
          {/* Enlarged Image */}
          <div className="flex flex-col items-center md:w-1/2">
            <div className="p-4 border-4 border-gray-600 rounded-lg shadow-lg">
              <img
                className="rounded-lg h-56 w-56 md:h-80 md:w-80 transition-transform duration-300 hover:scale-105"
                src={selectedImage}
                alt="Selected"
              />
            </div>

            {/* Thumbnails */}
            <div className="flex flex-row mt-4 md:mt-8 gap-4">
              {product.files.map((file, index) => (
                <div
                  key={index}
                  className={`h-16 w-16 md:h-24 md:w-24 cursor-pointer rounded-lg overflow-hidden border-2 ${
                    selectedImage === file.url
                      ? "border-white-600"
                      : "border-gray-600"
                  } hover:scale-110 transition-transform`}
                  onClick={() => setSelectedImage(file.url)}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={file.url}
                    alt={`Gallery ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Description Section */}
          <div className="flex flex-col md:ml-12 p-4 md:w-1/2 text-center md:text-left">
            {/* Product Title */}
            <h2 className="text-3xl font-extrabold text-amber-600 mb-4">
              {product.title}
            </h2>

            {/* Category and Created At */}
            <div className="flex justify-center md:justify-start items-center gap-4 mb-6 text-sm">
              <span className="bg-amber-600 text-white px-4 py-1 rounded-full">
                {product.category}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-400 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Price */}
            <div className="text-4xl font-bold text-amber-600 mb-6">
              ₹{product.price}
            </div>

            {/* CTA Buttons */}
            <div className="flex justify-center md:justify-start gap-6">
              {/* Add this before closing div */}
              <InquiryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={(data) => {
                  // Handle form submission
                  console.log("Form data:", data);
                  // Add your API call or data handling logic here
                }}
              />

              {/* Update your Inquire Now button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-amber-600 hover:bg-amber-600 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transform hover:scale-105 transition-transform"
              >
                Inquire Now
              </button>
              <button className="bg-gray-700 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transform hover:scale-105 transition-transform">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Product;