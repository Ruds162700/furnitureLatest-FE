import React, { useState, useEffect } from "react";
import AdminLayout from "../../Component/admin/AdminLayout";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await axios.get("https://interior-designer-backend-73ri.onrender.com/api/getAllPost");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `https://interior-designer-backend-73ri.onrender.com/api/products/${productToDelete._id}`
      );
      setProducts(products.filter((p) => p._id !== productToDelete._id));
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            onClick={() => (window.location.href = "/admin/products/new")}
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

        {/* Desktop Table View */}
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
                  Price
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
                          src={product.image || "https://placehold.co/100"}
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
                      {product.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm" style={{ color: '#2B2B2B' }}>
                      {product.price}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full text-white" style={{ backgroundColor: '#D79C66' }}>
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() =>
                        (window.location.href = `/admin/products/edit/${product._id}`)
                      }
                      className="mr-4 p-1 rounded transition-colors duration-200"
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

        {/* Mobile/Tablet Card View */}
        <div className="lg:hidden space-y-4">
          {filteredProducts.map((product) => (
            <div key={product._id} className="rounded-lg p-4 shadow" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E1DDD7' }}>
              <div className="flex items-start space-x-4">
                <div className="h-16 w-16 flex-shrink-0 rounded overflow-hidden">
                  <img
                    className="h-16 w-16 object-cover"
                    src={product.image || "https://placehold.co/100"}
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
                        Category: {product.category}
                      </span>
                      <span className="text-sm font-medium" style={{ color: '#2B2B2B' }}>
                        Price: {product.price}
                      </span>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          (window.location.href = `/admin/products/edit/${product._id}`)
                        }
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
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="rounded-lg p-6 max-w-md w-full" style={{ backgroundColor: '#FFFFFF' }}>
            <h3 className="text-lg font-medium mb-4" style={{ color: '#2B2B2B' }}>
              Confirm Deletion
            </h3>
            <p className="mb-6" style={{ color: '#8B8B8B' }}>
              Are you sure you want to delete "{productToDelete?.title}"? This
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
    </AdminLayout>
  );
};

export default Products;