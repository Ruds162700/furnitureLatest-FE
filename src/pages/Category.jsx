import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Component/Sidebar";
import ProductGrid from "../Component/ProductGrid";
import { Filter } from "lucide-react";

const Category = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true); // for both categories and products

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://interior-designer-backend-73ri.onrender.com/api/getCategories");
        // Format for Sidebar (expects name + count)
        const formatted = res.data.map(cat => ({
          name: cat.category,
          count: cat.postCount
        }));
        setCategories(formatted);
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products when selectedCategories change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.post(
          "https://interior-designer-backend-73ri.onrender.com/api/postByCategory",
          { categories: selectedCategories }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategories]);

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: '#FAF8F5' }}>
      <div className="flex flex-col lg:flex-row p-4 md:p-8 gap-8">
        <Sidebar
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Main Content */}
        <main className="flex-1 rounded-3xl p-6 lg:p-8 shadow-sm border" style={{
          backgroundColor: '#F4ECE6',
          borderColor: '#E1DDD7'
        }}>
          <div className="px-6 py-4 rounded-2xl inline-block mb-8 shadow-md" style={{
            backgroundColor: '#FAF8F5',
            border: '1px solid #E1DDD7'
          }}>
            <h2 className="text-xl font-semibold" style={{ color: '#2B2B2B' }}>
              {selectedCategories.length > 0
                ? `Selected Categories (${selectedCategories.length})`
                : "All Categories"}
            </h2>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="w-12 h-12 border-4 border-[#D79C66] border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <ProductGrid products={products} />
          )}
        </main>
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg lg:hidden z-40 transition-all group hover:scale-110"
        style={{ backgroundColor: '#D79C66' }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = '#C9854D';
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = '#D79C66';
        }}
        aria-label="Open filters"
      >
        <Filter className="w-5 h-5 text-white transform group-hover:rotate-180 transition-transform" />
      </button>
    </div>
  );
};

export default Category;
