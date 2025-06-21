import React, { useState, useEffect } from "react";
import AdminLayout from "../../Component/admin/AdminLayout";
import { Search } from "lucide-react"; // Only Search is needed now

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state
  const [error, setError] = useState(null); // Added error state

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          "https://interior-designer-backend-73ri.onrender.com/api/getCategories" // Updated API endpoint
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        // Map the response data to fit the existing structure if necessary,
        // or directly use 'category' as 'name' and 'postCount' as 'count'
        const formattedCategories = data.map(item => ({
          name: item.category,
          count: item.postCount
        }));
        setCategories(formattedCategories);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- Removed all modal-related states and functions (isDeleteModalOpen, categoryToDelete, isFormModalOpen, formData, handleDeleteClick, confirmDelete, handleEditClick, handleAddNew, handleFormSubmit) ---

  if (loading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold" style={{ color: '#2B2B2B' }}>Manage Categories</h1>
          </div>
          <div className="relative mb-6 animate-pulse">
            <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
          </div>
          <div className="bg-white rounded-xl shadow overflow-hidden animate-pulse">
            <div className="h-12 bg-gray-100"></div>
            <div className="divide-y divide-gray-200">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-white"></div>
              ))}
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="p-6 flex items-center justify-center min-h-[calc(100vh-200px)]">
          <div className="text-center text-red-600">
            <p className="text-lg font-medium mb-2">Error loading categories:</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={() => window.location.reload()} // Simple refresh to retry
              className="mt-4 px-4 py-2 text-white rounded-lg transition-colors duration-200"
              style={{ backgroundColor: '#D79C66' }} // Light theme button color
              onMouseEnter={(e) => e.target.style.backgroundColor = '#C8956A'}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#D79C66'}
            >
              Retry
            </button>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold" style={{ color: '#2B2B2B' }}>Categories Overview</h1> {/* Changed title */}
          {/* Removed Add New Category button */}
        </div>

        <div className="relative mb-6">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: '#8B8B8B' }} // Light theme search icon color
            size={20}
          />
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-10 pr-4 py-2 rounded-lg transition-colors duration-200"
            style={{
              border: '1px solid #E1DDD7', // Light theme border color
              backgroundColor: '#FFFFFF', // Light theme background
              color: '#2B2B2B' // Light theme text color
            }}
            onFocus={(e) => e.target.style.borderColor = '#D79C66'} // Focus color remains similar
            onBlur={(e) => e.target.style.borderColor = '#E1DDD7'} // Blur color reverts
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="rounded-xl shadow overflow-hidden" style={{ backgroundColor: '#FFFFFF' }}> {/* Light theme background */}
          <table className="min-w-full">
            <thead style={{ backgroundColor: '#F4ECE6' }}> {/* Light theme header background */}
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#2B2B2B' }}> {/* Light theme header text */}
                  Category Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider" style={{ color: '#2B2B2B' }}> {/* Light theme header text */}
                  Products Count
                </th>
                {/* Removed Actions header */}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ backgroundColor: '#FFFFFF', borderColor: '#E1DDD7' }}> {/* Light theme body background and divider */}
              {filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-center" style={{ color: '#8B8B8B' }}> {/* Light theme text color */}
                    No categories found.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category, index) => ( // Added index for key if _id is not available
                  <tr key={category.name || index}> {/* Using category.name as key, fallback to index */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium" style={{ color: '#2B2B2B' }}> {/* Light theme text color */}
                        {category.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm" style={{ color: '#2B2B2B' }}> {/* Light theme text color */}
                        {category.count}
                      </div>
                    </td>
                    {/* Removed Actions column */}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Categories;