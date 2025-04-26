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
      await axios.post('http://localhost:8080/api/sendQuery', {
        emailId: formData.email,
        contactNo: formData.contact,
        postId: productId,
        additionalInfo: formData.additionalInfo
      });

      setIsSuccess(true);
      if (onSubmit) onSubmit(formData);

      // Reset form
      setTimeout(() => {
        setIsSuccess(false);
        setFormData({ email: "", contact: "", additionalInfo: "" });
        onClose();
      }, 3000);
    } catch (error) {
      setErrors({
        submit: error.response?.data?.message || "Failed to submit inquiry. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 rounded-2xl w-full max-w-md shadow-2xl transform transition-all border border-zinc-200 dark:border-zinc-800">
        <div className="relative p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            disabled={isLoading}
            className="absolute right-4 top-4 p-2 bg-zinc-100 dark:bg-zinc-800 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all disabled:opacity-50"
          >
            <X className="w-4 h-4 text-zinc-600 dark:text-zinc-300" />
          </button>

          {isSuccess ? (
            // Success Message
            <div className="py-8 text-center">
              <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4 animate-bounce">
                <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                Thank You!
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Your inquiry has been submitted successfully. We'll get back to you soon.
              </p>
            </div>
          ) : (
            // Form Content
            <>
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                  Submit Inquiry
                </h2>
                {productTitle && (
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    for {productTitle}
                  </p>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {errors.submit && (
                  <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                      <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
                    </div>
                  </div>
                )}

                <div className="space-y-1.5">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
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
                    className={`w-full px-4 py-3 bg-white dark:bg-zinc-800 border ${
                      errors.email 
                        ? 'border-red-300 dark:border-red-700 focus:ring-red-500 dark:focus:ring-red-400' 
                        : 'border-zinc-200 dark:border-zinc-700 focus:ring-blue-500 dark:focus:ring-blue-400'
                    } rounded-xl focus:outline-none focus:ring-2 text-zinc-900 dark:text-zinc-100 text-sm transition-all disabled:opacity-60`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="contact"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
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
                    className={`w-full px-4 py-3 bg-white dark:bg-zinc-800 border ${
                      errors.contact 
                        ? 'border-red-300 dark:border-red-700 focus:ring-red-500 dark:focus:ring-red-400' 
                        : 'border-zinc-200 dark:border-zinc-700 focus:ring-blue-500 dark:focus:ring-blue-400'
                    } rounded-xl focus:outline-none focus:ring-2 text-zinc-900 dark:text-zinc-100 text-sm transition-all disabled:opacity-60`}
                    placeholder="Enter your contact number"
                  />
                  {errors.contact && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.contact}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label
                    htmlFor="additionalInfo"
                    className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
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
                    className={`w-full px-4 py-3 bg-white dark:bg-zinc-800 border ${
                      errors.additionalInfo 
                        ? 'border-red-300 dark:border-red-700 focus:ring-red-500 dark:focus:ring-red-400' 
                        : 'border-zinc-200 dark:border-zinc-700 focus:ring-blue-500 dark:focus:ring-blue-400'
                    } rounded-xl focus:outline-none focus:ring-2 text-zinc-900 dark:text-zinc-100 text-sm transition-all disabled:opacity-60`}
                    placeholder="Enter any additional information or requirements"
                  />
                  {errors.additionalInfo && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">{errors.additionalInfo}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 rounded-xl text-sm font-medium text-white transition-all disabled:opacity-60 transform hover:scale-[0.98] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
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