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

  useEffect(() => {
    // If in edit mode, fetch product data
    if (isEditMode) {
      const fetchProduct = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(
            `https://interior-designer-backend-73ri.onrender.com/api/products/${id}`
          );
          setFormData(response.data);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (isEditMode) {
        // For edit mode, use PUT request with JSON data (assuming no file upload in edit)
        await axios.put(
          `https://interior-designer-backend-73ri.onrender.com/api/products/${id}`, 
          formData
        );
      } else {
        // For create mode, use FormData to handle file uploads
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

        // Append files
        if (files.thumbnail) {
          formDataToSend.append('thumbnail', files.thumbnail);
        }
        
        files.photos.forEach((photo) => {
          formDataToSend.append('photos', photo);
        });

        // Use the createPost endpoint
        const response = await axios.post(
          "https://interior-designer-backend-73ri.onrender.com/api/createPost", 
          formDataToSend,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
      }
      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
      
      // Handle validation errors specifically
      if (error.response?.data?.error?.includes('validation failed')) {
        const errorMessage = error.response.data.error;
        if (errorMessage.includes('category')) {
          setError("Invalid category selected. Please choose a valid category from the dropdown.");
        } else {
          setError(`Validation error: ${errorMessage}`);
        }
      } else if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to save product. Please try again.");
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
          <h1 
            className="text-3xl font-bold mb-8 font-['Montserrat']" 
            style={{color: '#2B2B2B'}}
          >
            {isEditMode ? "Edit Product" : "Add New Product"}
          </h1>

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
            encType="multipart/form-data"
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

                {/* File Upload Section */}
                <div className="space-y-6">
                  <div>
                    <label 
                      className="block text-sm font-semibold mb-2 font-['Poppins']"
                      style={{color: '#2B2B2B'}}
                    >
                      Thumbnail Image
                    </label>
                    <input
                      type="file"
                      name="thumbnail"
                      accept="image/*"
                      onChange={handleFileChange}
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
                      Additional Photos
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