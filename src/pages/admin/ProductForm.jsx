import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../Component/admin/AdminLayout";
import axios from "axios";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    oldPrice: "",
    status: "available",
  });

  // Separate state for file handling
  const [files, setFiles] = useState({
    thumbnail: null,
    photos: []
  });

  // State for existing images (in edit mode)
  const [existingImages, setExistingImages] = useState({
    thumbnail: null,
    files: []
  });

  // State for last updated time
  const [lastUpdated, setLastUpdated] = useState(null);

  // Static categories array
  const categories = [
    "Interio Designing Service",
    "Building Construction Service",
    "Architectural Designing Service",
    "Interior Design",
    "Interior Service",
    "Office Interior Designing Service",
    "Full House Interior",
    "L Shape Modular Kitchen",
    "Modular Kitchen",
    "Modular Kitchen Service",
    "Lab Furniture & Lab Design",
    "3D Interior Rendering Service",
  ];

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  // const [activeTooltip, setActiveTooltip] = useState(null); // This state isn't used, can be removed if not needed elsewhere

  useEffect(() => {
    // If in edit mode, fetch product data
    if (isEditMode) {
      const fetchProduct = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `https://interior-designer-backend-73ri.onrender.com/api/postById/${id}`
          );
          setFormData(response.data);

          // Set existing images
          setExistingImages({
            thumbnail: response.data.thumbnail || null,
            files: response.data.files || []
          });

          // Set last updated time
          setLastUpdated(response.data.updatedAt);
        } catch (error) {
          console.error("Error fetching product:", error);
          setError("Failed to load product data");
        } finally {
          setIsLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;

    if (name === 'thumbnail') {
      setFiles(prev => ({
        ...prev,
        thumbnail: selectedFiles[0] || null
      }));
    } else if (name === 'photos') {
      setFiles(prev => ({
        ...prev,
        photos: Array.from(selectedFiles)
      }));
    }
  };

  const formatLastUpdated = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getFileNameFromUrl = (url) => {
    if (!url) return 'Unknown';
    const parts = url.split('/');
    const fileName = parts[parts.length - 1];
    return fileName.split('.')[0]; // Remove extension for cleaner display
  };

  const getCleanFileName = (fileName) => {
    if (!fileName) return 'Unknown';
    // Remove the folder prefix (thumbnails/ or photos/)
    const cleanName = fileName.replace(/^(thumbnails|photos)\//, '');
    return cleanName;
  };

  const handleImageView = (url) => {
    window.open(url, '_blank');
  };

  const handleImageDownload = async (url, fileName) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName || 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading image:', error);
      // You might want to show a user-friendly error message here
      setError("Failed to download image.");
    }
  };

  const ImageTooltip = ({ image, type, index }) => {
    const fileName = getCleanFileName(image.fileName) || getFileNameFromUrl(image.url);

    return (
      <div className="relative group">
        <div
          className="p-3 rounded-lg transition-all duration-200 hover:shadow-md"
          style={{
            backgroundColor: '#F4ECE6',
            border: '1px solid #E1DDD7'
          }}
        >
          <div className="flex items-center space-x-3">
            <div
              className="w-16 h-16 rounded-lg bg-cover bg-center flex-shrink-0 border"
              style={{
                backgroundImage: `url(${image.url})`,
                backgroundColor: '#E1DDD7',
                borderColor: '#D1CCC5'
              }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-800 truncate">
                {fileName}
              </p>
              <p className="text-xs text-gray-500 mb-2">
                {type === 'thumbnail' ? 'Thumbnail' : 'Photo'}
              </p>

              {/* Action buttons */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleImageView(image.url);
                  }}
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 hover:shadow-sm"
                  style={{
                    backgroundColor: '#D79C66',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#C9854D';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#D79C66';
                  }}
                  title="View Image"
                >
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleImageDownload(image.url, `${fileName}.jpg`);
                  }}
                  className="inline-flex items-center px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200 hover:shadow-sm"
                  style={{
                    backgroundColor: '#6B7280',
                    color: 'white'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#4B5563';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#6B7280';
                  }}
                  title="Download Image"
                >
                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Retrieve the token from localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication token not found. Please log in again.");
      setIsLoading(false);
      navigate("/admin/login"); // Redirect to login if no token
      return;
    }

    try {
      const formDataToSend = new FormData();

      // Append text fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('price', formData.price);
      if (formData.oldPrice) {
        formDataToSend.append('oldPrice', formData.oldPrice);
      }
      formDataToSend.append('status', formData.status);

      // Append new files only if selected
      if (files.thumbnail) {
        formDataToSend.append('thumbnail', files.thumbnail);
      }

      files.photos.forEach((photo) => {
        formDataToSend.append('photos', photo);
      });

      // Define headers with Authorization token
      const headers = {
        'Content-Type': 'multipart/form-data', // Axios automatically sets this with FormData
        'Authorization': `Bearer ${token}` // Add the JWT token here
      };

      if (isEditMode) {
        // Use the correct edit endpoint
        await axios.put(
          `https://interior-designer-backend-73ri.onrender.com/api/editPost/${id}`,
          formDataToSend,
          { headers } // Pass the headers
        );
      } else {
        // Use the createPost endpoint
        await axios.post(
          "https://interior-designer-backend-73ri.onrender.com/api/createPost",
          formDataToSend,
          { headers } // Pass the headers
        );
      }
      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);

      // Handle specific error messages from backend
      if (error.response?.status === 401 || error.response?.status === 403) {
          setError("Authentication failed. Please log in again.");
          localStorage.removeItem('token'); // Clear invalid token
          localStorage.removeItem('isAdminAuthenticated'); // Clear auth status
          navigate("/admin/login"); // Redirect to login
      } else if (error.response?.data?.error?.includes('validation failed')) {
        const errorMessage = error.response.data.error;
        if (errorMessage.includes('category')) {
          setError("Invalid category selected. Please choose a valid category from the dropdown.");
        } else {
          setError(`Validation error: ${errorMessage}`);
        }
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to save product. Please try again. Network error or server unreachable.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && isEditMode) {
    return (
      <AdminLayout>
        <div className="min-h-screen flex justify-center items-center" style={{backgroundColor: '#FAF8F5'}}>
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2" style={{borderColor: '#D79C66'}}></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="min-h-screen p-6" style={{backgroundColor: '#FAF8F5'}}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1
              className="text-3xl font-bold font-['Montserrat']"
              style={{color: '#2B2B2B'}}
            >
              {isEditMode ? "Edit Product" : "Add New Product"}
            </h1>

            {/* Last Updated Time */}
            {isEditMode && lastUpdated && (
              <div className="text-sm text-gray-500 font-['Poppins']">
                Last updated: {formatLastUpdated(lastUpdated)}
              </div>
            )}
          </div>

          {error && (
            <div
              className="mb-6 p-4 rounded-2xl shadow-sm"
              style={{
                backgroundColor: '#FEF2F2',
                border: '1px solid #FECACA',
                color: '#DC2626'
              }}
            >
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="rounded-2xl shadow-lg p-8"
            style={{
              backgroundColor: '#F4ECE6',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.05)'
            }}
            encType="multipart/form-data" // Ensure this is set for file uploads
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label
                    className="block text-sm font-semibold mb-2 font-['Poppins']"
                    style={{color: '#2B2B2B'}}
                  >
                    Product Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 font-['Poppins']"
                    style={{
                      backgroundColor: '#FAF8F5',
                      borderColor: '#E1DDD7',
                      color: '#2B2B2B',
                      focusRingColor: '#D79C66'
                    }}
                    placeholder="Enter product title"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-2 font-['Poppins']"
                    style={{color: '#2B2B2B'}}
                  >
                    Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 font-['Poppins']"
                    style={{
                      backgroundColor: '#FAF8F5',
                      borderColor: '#E1DDD7',
                      color: '#2B2B2B'
                    }}
                  >
                    <option value="" style={{color: '#6D6D6D'}}>Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2 font-['Poppins']"
                      style={{color: '#2B2B2B'}}
                    >
                      Price
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 font-['Poppins']"
                      style={{
                        backgroundColor: '#FAF8F5',
                        borderColor: '#E1DDD7',
                        color: '#2B2B2B'
                      }}
                      placeholder="₹0"
                    />
                  </div>
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2 font-['Poppins']"
                      style={{color: '#2B2B2B'}}
                    >
                      Old Price
                      <span style={{color: '#6D6D6D', fontWeight: 'normal'}}>(Optional)</span>
                    </label>
                    <input
                      type="text"
                      name="oldPrice"
                      value={formData.oldPrice}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 font-['Poppins']"
                      style={{
                        backgroundColor: '#FAF8F5',
                        borderColor: '#E1DDD7',
                        color: '#2B2B2B'
                      }}
                      placeholder="₹0"
                    />
                  </div>
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-2 font-['Poppins']"
                    style={{color: '#2B2B2B'}}
                  >
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 font-['Poppins']"
                    style={{
                      backgroundColor: '#FAF8F5',
                      borderColor: '#E1DDD7',
                      color: '#2B2B2B'
                    }}
                  >
                    <option value="available">Available</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="coming_soon">Coming Soon</option>
                  </select>
                </div>

                {/* Existing Images Section (only in edit mode) */}
                {isEditMode && (existingImages.thumbnail || existingImages.files.length > 0) && (
                  <div className="space-y-6">
                    <div>
                      <label
                        className="block text-sm font-semibold mb-4 font-['Poppins']"
                        style={{color: '#2B2B2B'}}
                      >
                        Current Images
                      </label>

                      {/* Current Thumbnail */}
                      {existingImages.thumbnail && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2 text-gray-700">Thumbnail:</h4>
                          <ImageTooltip
                            image={existingImages.thumbnail}
                            type="thumbnail"
                            index={0}
                          />
                        </div>
                      )}

                      {/* Current Photos */}
                      {existingImages.files.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium mb-3 text-gray-700">
                            Additional Photos ({existingImages.files.length}):
                          </h4>
                          <div className="space-y-3">
                            {existingImages.files.map((file, index) => (
                              <ImageTooltip
                                key={index}
                                image={file}
                                type="photo"
                                index={index}
                              />
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* File Upload Section */}
                <div className="space-y-6">
                  <div>
                    <label
                      className="block text-sm font-semibold mb-2 font-['Poppins']"
                      style={{color: '#2B2B2B'}}
                    >
                      {isEditMode ? "Update Thumbnail Image" : "Thumbnail Image"}
                      {!isEditMode && <span style={{color: '#DC2626'}}> *</span>}
                      {isEditMode && <span style={{color: '#6D6D6D', fontWeight: 'normal'}}> (Optional - leave empty to keep current)</span>}
                    </label>
                    <input
                      type="file"
                      name="thumbnail"
                      accept="image/*"
                      onChange={handleFileChange}
                      required={!isEditMode}
                      className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 font-['Poppins']"
                      style={{
                        backgroundColor: '#FAF8F5',
                        borderColor: '#E1DDD7',
                        color: '#2B2B2B'
                      }}
                    />
                    {files.thumbnail && (
                      <p
                        className="text-sm mt-2 font-['Poppins']"
                        style={{color: '#6D6D6D'}}
                      >
                        Selected: {files.thumbnail.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold mb-2 font-['Poppins']"
                      style={{color: '#2B2B2B'}}
                    >
                      {isEditMode ? "Add More Photos" : "Additional Photos"}
                      <span style={{color: '#6D6D6D', fontWeight: 'normal'}}> (Optional)</span>
                    </label>
                    <input
                      type="file"
                      name="photos"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 font-['Poppins']"
                      style={{
                        backgroundColor: '#FAF8F5',
                        borderColor: '#E1DDD7',
                        color: '#2B2B2B'
                      }}
                    />
                    {files.photos.length > 0 && (
                      <p
                        className="text-sm mt-2 font-['Poppins']"
                        style={{color: '#6D6D6D'}}
                      >
                        Selected: {files.photos.length} file(s)
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label
                    className="block text-sm font-semibold mb-2 font-['Poppins']"
                    style={{color: '#2B2B2B'}}
                  >
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows="16"
                    className="w-full px-4 py-3 rounded-xl border transition-all duration-200 focus:outline-none focus:ring-2 resize-none font-['Poppins']"
                    style={{
                      backgroundColor: '#FAF8F5',
                      borderColor: '#E1DDD7',
                      color: '#2B2B2B'
                    }}
                    placeholder="Enter detailed product description..."
                  ></textarea>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate("/admin/products")}
                className="px-6 py-3 rounded-xl border transition-all duration-200 hover:shadow-md font-semibold font-['Poppins']"
                style={{
                  backgroundColor: '#FAF8F5',
                  borderColor: '#E1DDD7',
                  color: '#6D6D6D'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#F4ECE6';
                  e.target.style.borderColor = '#D79C66';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#FAF8F5';
                  e.target.style.borderColor = '#E1DDD7';
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="px-6 py-3 rounded-xl transition-all duration-200 hover:shadow-lg disabled:opacity-50 font-semibold font-['Poppins']"
                style={{
                  backgroundColor: isLoading ? '#C9854D' : '#D79C66',
                  color: 'white',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.04)'
                }}
                onMouseEnter={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = '#C9854D';
                    e.target.style.boxShadow = '0 4px 16px rgba(215, 156, 102, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isLoading) {
                    e.target.style.backgroundColor = '#D79C66';
                    e.target.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)';
                  }
                }}
              >
                {isLoading
                  ? "Saving..."
                  : isEditMode
                  ? "Update Product"
                  : "Create Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductForm;