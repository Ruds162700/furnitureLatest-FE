import React from "react";
import { Heart, Share2, ArrowRight } from "lucide-react";

const ProductGrid = ({ products }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-4 md:p-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="group bg-white dark:bg-zinc-900 rounded-xl md:rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Image Container */}
            <div className="relative aspect-[16/10] overflow-hidden">
              <img
                src={`https://placehold.co/800x500`}
                alt={product.title}
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
              />

              {/* Overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Category Tag */}
              <div className="absolute top-2 md:top-4 left-2 md:left-4">
                <span className="px-2 md:px-3 py-0.5 md:py-1 bg-white/90 dark:bg-zinc-900/90 text-zinc-800 dark:text-zinc-200 text-xs font-medium rounded-full">
                  {product.category}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="absolute top-2 md:top-4 right-2 md:right-4 space-x-1.5 md:space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button className="p-1.5 md:p-2 bg-white/90 dark:bg-zinc-900/90 rounded-full hover:bg-white dark:hover:bg-zinc-800 transition-colors">
                  <Heart className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-800 dark:text-zinc-200" />
                </button>
                <button className="p-1.5 md:p-2 bg-white/90 dark:bg-zinc-900/90 rounded-full hover:bg-white dark:hover:bg-zinc-800 transition-colors">
                  <Share2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-zinc-800 dark:text-zinc-200" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-4 md:p-6 flex flex-col flex-grow">
              <h3 className="text-base md:text-xl font-medium text-zinc-900 dark:text-zinc-100 mb-1.5 md:mb-2 line-clamp-2 leading-tight">
                {product.title}
              </h3>

              <p className="text-xs md:text-sm text-zinc-600 dark:text-zinc-400 mb-4 md:mb-6 line-clamp-2">
                {product.description}
              </p>

              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg md:text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-xs md:text-sm text-zinc-500 line-through">
                      {product.oldPrice}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                <span className="px-2 py-0.5 md:py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs font-medium rounded">
                  Available
                </span>
              </div>

              <button
                onClick={() => window.location.href = `/product/${product._id}`}
                className="w-full px-4 md:px-6 py-2.5 md:py-3 bg-zinc-900 dark:bg-zinc-100 hover:bg-zinc-800 dark:hover:bg-zinc-200 rounded-lg md:rounded-xl text-xs md:text-sm font-medium text-white dark:text-zinc-900 transition-colors flex items-center justify-center space-x-1.5 md:space-x-2 group mt-auto"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;