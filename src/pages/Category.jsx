import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Component/Sidebar";
import ProductGrid from "../Component/ProductGrid";
import { Filter } from "lucide-react";

const Category = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);

  const categories = [
    { name: "Interior Designing Service", count: 45 },
    { name: "Building Construction Services", count: 32 },
    { name: "Architectural Designing Services", count: 28 },
    { name: "Interior Design", count: 56 },
    { name: "Interior Service", count: 41 },
    { name: "Office Interior Designing Service", count: 23 },
    { name: "Full House Interior", count: 19 },
    { name: "L Shape Modular Kitchen", count: 15 },
    { name: "Modular Kitchen", count: 37 },
    { name: "Modular Kitchen Service", count: 29 },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/postByCategory",
          { categories: selectedCategories }
        );
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [selectedCategories]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      <div className="flex flex-col lg:flex-row p-4 md:p-8 gap-8">
        <Sidebar
          categories={categories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        {/* Main Content */}
        <main className="flex-1 bg-gradient-to-b from-zinc-900 to-zinc-950 rounded-3xl p-6 lg:p-8 border border-zinc-800/50">
          <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 px-6 py-3 rounded-2xl inline-block mb-8 shadow-lg">
            <h2 className="text-lg font-semibold bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
              {selectedCategories.length > 0
                ? `Selected Categories (${selectedCategories.length})`
                : "All Categories"}
            </h2>
          </div>
          <ProductGrid products={products} />
        </main>
      </div>

      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsMobileMenuOpen(true)}
        className="fixed bottom-6 right-6 p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full shadow-lg lg:hidden z-30 hover:from-blue-600 hover:to-purple-600 transition-all group"
        aria-label="Open filters"
      >
        <Filter className="w-4 h-4 text-white transform group-hover:rotate-180 transition-transform" />
      </button>
    </div>
  );
};

export default Category;
