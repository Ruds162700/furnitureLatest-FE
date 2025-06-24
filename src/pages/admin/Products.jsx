import React, { useState, useEffect } from "react";
import AdminLayout from "../../Component/admin/AdminLayout";
import { Edit, Trash2, Plus, Search, Eye, Download, ExternalLink, X, CheckCircle, Info } from "lucide-react"; // Added Info for error snackbar
import axios from "axios";
import { useNavigate } from 'react-router-dom';

// Loader Component (No change)
const Loader = ({ size = "default", overlay = false }) => {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12"
  };

  const LoaderSpinner = () => (
    <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-[#D79C66]`}></div>
  );

  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 flex flex-col items-center space-y-3">
          <LoaderSpinner />
          <span className="text-sm text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-8">
      <div className="flex flex-col items-center space-y-3">
        <LoaderSpinner />
        <span className="text-sm text-gray-600">Loading products...</span>
      </div>
    </div>
  );
};

// Snackbar Component
const Snackbar = ({ message, type, onClose }) => {
  const bgColor = type === "success" ? "bg-green-500" : "bg-red-500";
  const Icon = type === "success" ? CheckCircle : Info;

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${bgColor} text-white text-sm font-bold px-4 py-3 rounded-lg shadow-lg flex items-center`}>
      <Icon size={20} className="mr-2" />
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 p-1 rounded-full hover:bg-white hover:bg-opacity-20 transition-colors">
        <X size={16} />
      </button>
    </div>
  );
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImageViewerOpen, setIsImageViewerOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ show: false, message: "", type: "success" }); // Snackbar state

  const navigate = useNavigate();
  const BASE_URL = "https://interior-designer-backend-73ri.onrender.com/api";

  // Function to show snackbar
  const showSnackbar = (message, type = "success") => {
    setSnackbar({ show: true, message, type });
    const timer = setTimeout(() => {
      setSnackbar({ show: false, message: "", type: "success" });
    }, 3000);
    return () => clearTimeout(timer);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setInitialLoading(true);
        const token = localStorage.getItem("token");
        if (!token) {
          console.warn("No token found, redirecting to /base/admin.");
          showSnackbar("Authentication token not found. Please log in again.", "error");
          navigate("/admin"); // Redirect to /base/admin
          return;
        }

        const response = await axios.get(`${BASE_URL}/getAllPost`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        if (error.response?.status === 401 || error.response?.status === 403) {
          showSnackbar("Session expired or unauthorized. Please log in again.", "error");
          localStorage.removeItem("token");
          localStorage.removeItem("isAdminAuthenticated");
          navigate("/admin"); // Redirect to /base/admin
        } else {
          showSnackbar("Error fetching products.", "error");
        }
      } finally {
        setInitialLoading(false);
      }
    };
    fetchProducts();
  }, [navigate]);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const handleEditClick = (productId) => {
    navigate(`/admin/products/edit/${productId}`);
  };

  const handleViewClick = async (productId) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showSnackbar("Authentication token not found. Please log in.", "error");
        navigate("/admin"); // Redirect to /base/admin
        return;
      }
      const response = await axios.get(`${BASE_URL}/postById/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedProduct(response.data);
      setIsViewModalOpen(true);
    } catch (error) {
      console.error("Error fetching product details:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        showSnackbar("Authentication failed. Please log in again.", "error");
        localStorage.removeItem("token");
        localStorage.removeItem("isAdminAuthenticated");
        navigate("/admin"); // Redirect to /base/admin
      } else {
        showSnackbar("Error fetching product details.", "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageView = (index) => {
    setSelectedImageIndex(index);
    setIsImageViewerOpen(true);
  };

  const handleImageDownload = async (imageUrl, fileName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName || 'image.jpg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      showSnackbar("Error downloading image.", "error");
    }
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showSnackbar("Authentication token not found. Please log in.", "error");
        setIsDeleteModalOpen(false);
        navigate("/admin"); // Redirect to /base/admin
        return;
      }

      const productTitle = productToDelete?.title;
      await axios.delete(`${BASE_URL}/deletePost/${productToDelete._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(products.filter((p) => p._id !== productToDelete._id));
      setIsDeleteModalOpen(false);
      showSnackbar(`Product "${productTitle}" deleted successfully!`, "success");
    } catch (error) {
      console.error("Error deleting product:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        showSnackbar("Authentication failed. Please log in again.", "error");
        localStorage.removeItem("token");
        localStorage.removeItem("isAdminAuthenticated");
        setIsDeleteModalOpen(false);
        navigate("/admin"); // Redirect to /base/admin
      } else {
        showSnackbar("Error deleting product.", "error");
      }
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getDisplayImage = (product) => {
    if (product.thumbnail?.url) return product.thumbnail.url;
    if (product.files && product.files.length > 0) return product.files[0].url;
    return "https://placehold.co/100";
  };

  const getAllImages = (product) => {
    const images = [];
    if (product.thumbnail?.url) {
      images.push({ url: product.thumbnail.url, fileName: product.thumbnail.fileName, type: 'thumbnail' });
    }
    if (product.files && product.files.length > 0) {
      product.files.forEach(file => {
        images.push({ url: file.url, fileName: file.fileName, type: 'file' });
      });
    }
    return images;
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-semibold" style={{ color: '#2B2B2B' }}>
            Manage Products
          </h1>
          <button
            className="w-full sm:w-auto px-4 py-2 rounded-lg flex items-center justify-center gap-2 text-white transition-colors duration-200"
            style={{ backgroundColor: '#D79C66' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#C8956A'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#D79C66'}
            onClick={() => navigate("/admin/products/new")}
          >
            <Plus size={18} />
            Add New Product
          </button>
        </div>

        <div className="relative mb-6">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: '#8B8B8B' }}
            size={20}
          />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 rounded-lg transition-colors duration-200"
            style={{
              border: '1px solid #E1DDD7',
              backgroundColor: '#FFFFFF',
              color: '#2B2B2B'
            }}
            onFocus={(e) => e.target.style.borderColor = '#D79C66'}
            onBlur={(e) => e.target.style.borderColor = '#E1DDD7'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {initialLoading ? (
          <Loader />
        ) : (
          <>
            <div className="hidden lg:block rounded-xl shadow overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}>
              <table className="min-w-full">
                <thead style={{ backgroundColor: '#F4ECE6' }}>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#2B2B2B' }}>
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#2B2B2B' }}>
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#2B2B2B' }}>
                      Images
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#2B2B2B' }}>
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider" style={{ color: '#2B2B2B' }}>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ backgroundColor: '#FFFFFF', borderColor: '#E1DDD7' }}>
                  {filteredProducts.map((product) => (
                    <tr key={product._id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 rounded overflow-hidden">
                            <img
                              className="h-10 w-10 object-cover"
                              src={getDisplayImage(product)}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium" style={{ color: '#2B2B2B' }}>
                              {product.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm" style={{ color: '#8B8B8B' }}>
                          {product.category || 'N/A'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm" style={{ color: '#2B2B2B' }}>
                          {getAllImages(product).length} image{getAllImages(product).length !== 1 ? 's' : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white" style={{ backgroundColor: '#D79C66' }}>
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewClick(product._id)}
                          className="mr-2 p-1 rounded transition-colors duration-200 disabled:opacity-50"
                          style={{ color: '#3B82F6' }}
                          onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)')}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                          disabled={loading}
                        >
                          {loading ? <Loader size="small" /> : <Eye size={18} />}
                        </button>
                        <button
                          onClick={() => handleEditClick(product._id)}
                          className="mr-2 p-1 rounded transition-colors duration-200"
                          style={{ color: '#D79C66' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = '#F4ECE6'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(product)}
                          className="p-1 rounded transition-colors duration-200"
                          style={{ color: '#DC2626' }}
                          onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(220, 38, 38, 0.1)'}
                          onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="lg:hidden space-y-4">
              {filteredProducts.map((product) => (
              <div key={product._id} className="rounded-lg p-4 shadow" style={{ backgroundColor: '#FFFFFF', border: '1px solid \'#E1DDD7\'' }}>
                 <div className="flex items-start space-x-4">
                    <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                      <img
                        className="h-16 w-16 object-cover"
                        src={getDisplayImage(product)}
                        alt=""
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="text-lg font-medium truncate" style={{ color: '#2B2B2B' }}>
                          {product.title}
                        </h3>
                        <span className="mt-1 sm:mt-0 px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white w-fit" style={{ backgroundColor: '#D79C66' }}>
                          Active
                        </span>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-1 sm:space-y-0">
                          <span className="text-sm" style={{ color: '#8B8B8B' }}>
                            Category: {product.category || 'N/A'}
                          </span>
                          <span className="text-sm" style={{ color: '#8B8B8B' }}>
                            Images: {getAllImages(product).length}
                          </span>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewClick(product._id)}
                            className="p-2 rounded transition-colors duration-200 disabled:opacity-50"
                            style={{ color: '#3B82F6', backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
                            onMouseEnter={(e) => !loading && (e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.2)')}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(59, 130, 246, 0.1)'}
                            disabled={loading}
                          >
                            {loading ? <Loader size="small" /> : <Eye size={16} />}
                          </button>
                          <button
                            onClick={() => handleEditClick(product._id)}
                            className="p-2 rounded transition-colors duration-200"
                            style={{ color: '#D79C66', backgroundColor: '#F4ECE6' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#E1DDD7'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#F4ECE6'}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(product)}
                            className="p-2 rounded transition-colors duration-200"
                            style={{ color: '#DC2626', backgroundColor: 'rgba(220, 38, 38, 0.1)' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(220, 38, 38, 0.2)'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = 'rgba(220, 38, 38, 0.1)'}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {loading && <Loader overlay={true} />}

      {isViewModalOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto" style={{ backgroundColor: '#FFFFFF' }}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-medium" style={{ color: '#2B2B2B' }}>
                Product Details
              </h3>
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
                style={{ color: '#8B8B8B' }}
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-lg mb-2" style={{ color: '#2B2B2B' }}>
                  {selectedProduct.title}
                </h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium" style={{ color: '#2B2B2B' }}>Category:</span>
                    <span className="ml-2" style={{ color: '#8B8B8B' }}>{selectedProduct.category || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="font-medium" style={{ color: '#2B2B2B' }}>Total Images:</span>
                    <span className="ml-2" style={{ color: '#8B8B8B' }}>{getAllImages(selectedProduct).length}</span>
                  </div>
                  {selectedProduct.description && (
                    <div className="col-span-2">
                      <span className="font-medium" style={{ color: '#2B2B2B' }}>Description:</span>
                      <p className="mt-1" style={{ color: '#8B8B8B' }}>{selectedProduct.description}</p>
                    </div>
                  )}
                  {selectedProduct.createdAt && (
                    <div>
                      <span className="font-medium" style={{ color: '#2B2B2B' }}>Created:</span>
                      <span className="ml-2" style={{ color: '#8B8B8B' }}>
                        {new Date(selectedProduct.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {selectedProduct.updatedAt && (
                    <div>
                      <span className="font-medium" style={{ color: '#2B2B2B' }}>Updated:</span>
                      <span className="ml-2" style={{ color: '#8B8B8B' }}>
                        {new Date(selectedProduct.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {getAllImages(selectedProduct).length > 0 && (
                <div>
                  <h5 className="font-medium text-lg mb-3" style={{ color: '#2B2B2B' }}>
                    Images ({getAllImages(selectedProduct).length})
                  </h5>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {getAllImages(selectedProduct).map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={image.url}
                            alt={`Image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 rounded-lg flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex space-x-2">
                            <button
                              onClick={() => handleImageView(index)}
                              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
                              title="View Image"
                            >
                              <ExternalLink size={16} style={{ color: '#2B2B2B' }} />
                            </button>
                            <button
                              onClick={() => handleImageDownload(image.url, image.fileName)}
                              className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
                              title="Download Image"
                            >
                              <Download size={16} style={{ color: '#2B2B2B' }} />
                            </button>
                          </div>
                        </div>

                        {image.type === 'thumbnail' && (
                          <div className="absolute top-2 left-2 px-2 py-1 text-xs font-medium text-white rounded" style={{ backgroundColor: '#D79C66' }}>
                            Thumbnail
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-4 py-2 rounded-lg transition-colors duration-200"
                style={{
                  border: '1px solid #E1DDD7',
                  color: '#2B2B2B',
                  backgroundColor: '#FFFFFF'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#F4ECE6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {isImageViewerOpen && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60] p-4">
          <div className="relative max-w-full max-h-full">
            <button
              onClick={() => setIsImageViewerOpen(false)}
              className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors duration-200 z-10"
            >
              <X size={24} className="text-white" />
            </button>

            <img
              src={getAllImages(selectedProduct)[selectedImageIndex]?.url}
              alt={`Image ${selectedImageIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {getAllImages(selectedProduct).length > 1 && (
              <>
                <button
                  onClick={() => setSelectedImageIndex(prev => prev === 0 ? getAllImages(selectedProduct).length - 1 : prev - 1)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors duration-200"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => setSelectedImageIndex(prev => prev === getAllImages(selectedProduct).length - 1 ? 0 : prev + 1)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white bg-opacity-20 rounded-full hover:bg-opacity-30 transition-colors duration-200"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black bg-opacity-50 rounded-full text-white text-sm">
              {selectedImageIndex + 1} / {getAllImages(selectedProduct).length}
            </div>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="rounded-lg p-6 max-w-md w-full" style={{ backgroundColor: '#FFFFFF' }}>
            <h3 className="text-lg font-medium mb-4" style={{ color: '#2B2B2B' }}>
              Confirm Deletion
            </h3>
            <p className="mb-6" style={{ color: '#8B8B8B' }}>
              Are you sure you want to delete "<span className="font-semibold">{productToDelete?.title}</span>"? This
              action cannot be undone.
            </p>
            <div className="flex flex-col sm:flex-row justify-end gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 rounded-lg transition-colors duration-200"
                style={{
                  border: '1px solid #E1DDD7',
                  color: '#2B2B2B',
                  backgroundColor: '#FFFFFF'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#F4ECE6'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#FFFFFF'}
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-white rounded-lg transition-colors duration-200"
                style={{ backgroundColor: '#DC2626' }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#B91C1C'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#DC2626'}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Snackbar is conditionally rendered here */}
      {snackbar.show && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar({ show: false, message: "", type: "success" })}
        />
      )}
    </AdminLayout>
  );
};

export default Products;