import React, { useState } from "react";
import { X, Check, Loader2, AlertCircle } from "lucide-react";
import axios from "axios";

const InquiryModal = ({ isOpen, onClose, onSubmit, productTitle, productId }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    contact: "",
    additionalInfo: ""
  });

  if (!isOpen) return null;

  // Validation patterns
  const validationPatterns = {
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    contact: /^(?:\+?\d{1,3}[-. ]?)?\d{10}$/
  };

  // Validation messages
  const validationMessages = {
    email: {
      required: "Email is required",
      pattern: "Please enter a valid email address"
    },
    contact: {
      required: "Contact number is required",
      pattern: "Please enter a valid 10-digit phone number"
    },
    additionalInfo: {
      required: "Additional information is required",
      minLength: "Please provide more details (minimum 10 characters)"
    }
  };

  const validateField = (name, value) => {
    if (!value) {
      return validationMessages[name].required;
    }

    if (validationPatterns[name] && !validationPatterns[name].test(value)) {
      return validationMessages[name].pattern;
    }

    if (name === 'additionalInfo' && value.length < 10) {
      return validationMessages[name].minLength;
    }

    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    try {
      // Updated API call to match your backend
      const response = await axios.post('https://interior-designer-backend-73ri.onrender.com/api/queries/sendQuery', {
        emailId: formData.email,
        contactNo: formData.contact,
        postId: productId,
        query: formData.additionalInfo || "Want to Contact your firm"
      });

      setIsSuccess(true);
      if (onSubmit) onSubmit(formData);

      // Reset form
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ email: "", contact: "", additionalInfo: "" });
        setErrors({});
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      
      // Handle different types of errors
      let errorMessage = "Failed to submit inquiry. Please try again.";
      
      if (error.response) {
        // Server responded with error status
        errorMessage = error.response.data?.message || `Server error: ${error.response.status}`;
      } else if (error.request) {
        // Request was made but no response received
        errorMessage = "Network error. Please check your connection.";
      }
      
      setErrors({
        submit: errorMessage
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-white to-gray-50 rounded-2xl w-full max-w-md shadow-2xl transform transition-all border border-gray-200">
        <div className="relative p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            disabled={isLoading}
            className="absolute right-4 top-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-all disabled:opacity-50"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>

          {isSuccess ? (
            // Success Message
            <div className="py-8 text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Thank You!
              </h2>
              <p className="text-sm text-gray-600">
                Your inquiry has been submitted successfully. We'll get back to you soon.
              </p>
            </div>
          ) : (
            // Form Content
            <>
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">
                  Submit Inquiry
                </h2>
                {productTitle && (
                  <p className="mt-2 text-sm text-gray-600">
                    for {productTitle}
                  </p>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {errors.submit && (
                  <div className="p-3 bg-red-100 border border-red-200 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-600" />
                      <p className="text-sm text-red-600">{errors.submit}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`w-full px-4 py-3 bg-white border ${
                      errors.email 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-200 focus:ring-blue-500'
                    } rounded-xl focus:outline-none focus:ring-2 text-gray-900 text-sm transition-all disabled:opacity-60`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    disabled={isLoading}
                    className={`w-full px-4 py-3 bg-white border ${
                      errors.contact 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-200 focus:ring-blue-500'
                    } rounded-xl focus:outline-none focus:ring-2 text-gray-900 text-sm transition-all disabled:opacity-60`}
                    placeholder="Enter your contact number"
                  />
                  {errors.contact && (
                    <p className="text-sm text-red-600 mt-1">{errors.contact}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="additionalInfo"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Additional Information
                  </label>
                  <textarea
                    id="additionalInfo"
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleChange}
                    disabled={isLoading}
                    rows="4"
                    className={`w-full px-4 py-3 bg-white border ${
                      errors.additionalInfo 
                        ? 'border-red-300 focus:ring-red-500' 
                        : 'border-gray-200 focus:ring-blue-500'
                    } rounded-xl focus:outline-none focus:ring-2 text-gray-900 text-sm transition-all disabled:opacity-60`}
                    placeholder="Enter any additional information or requirements"
                  />
                  {errors.additionalInfo && (
                    <p className="text-sm text-red-600 mt-1">{errors.additionalInfo}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl text-sm font-medium text-white transition-all disabled:opacity-60 transform hover:scale-[0.98] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting...</span>
                    </div>
                  ) : (
                    <span>Submit Inquiry</span>
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default InquiryModal;