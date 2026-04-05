"use client";

import { useState, useMemo } from "react";
import { ProductCard } from "@/components/ProductCard";
import { SlidersHorizontal, X, ChevronDown } from "lucide-react";

interface Scooter {
  _id: string;
  name: string;
  brand: string;
  category: string;
  slug: { current: string };
  price: number;
  salePrice?: number;
  image?: { asset: { _ref: string }; alt?: string };
  specs?: {
    topSpeed?: number;
    range?: number;
    motor?: number;
    battery?: number;
    weight?: number;
  };
  description?: string;
  badge?: string;
  inStock?: boolean;
  featured?: boolean;
}

const BRANDS = ["All", "Segway", "Ninebot", "Xiaomi", "Vsett", "Kaabo", "Zero"];
const CATEGORIES = ["All", "City", "Off-Road", "Performance", "Folding"];
const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Name A-Z", value: "name_asc" },
];

export function ScootersCatalog({ scooters }: { scooters: Scooter[] }) {
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const maxPrice = Math.max(...scooters.map((s) => s.price), 5000);

  const filtered = useMemo(() => {
    let result = [...scooters];

    if (selectedBrand !== "All") {
      result = result.filter(
        (s) => s.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
    }

    if (selectedCategory !== "All") {
      result = result.filter(
        (s) => s.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    result = result.filter(
      (s) => (s.salePrice ?? s.price) >= priceRange[0] && (s.salePrice ?? s.price) <= priceRange[1]
    );

    if (inStockOnly) {
      result = result.filter((s) => s.inStock !== false);
    }

    switch (sortBy) {
      case "price_asc":
        result.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case "price_desc":
        result.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case "name_asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return result;
  }, [scooters, selectedBrand, selectedCategory, sortBy, priceRange, inStockOnly]);

  const activeFiltersCount = [
    selectedBrand !== "All",
    selectedCategory !== "All",
    inStockOnly,
    priceRange[0] > 0 || priceRange[1] < maxPrice,
  ].filter(Boolean).length;

  const clearFilters = () => {
    setSelectedBrand("All");
    setSelectedCategory("All");
    setPriceRange([0, maxPrice]);
    setInStockOnly(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Page Header */}
      <div className="bg-gray-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-500 font-bold text-sm uppercase tracking-widest mb-2">
            Our Collection
          </p>
          <h1 className="font-display font-bold text-5xl uppercase">All Scooters</h1>
          <p className="text-gray-400 mt-2">{filtered.length} models available</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Brand pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          {BRANDS.map((brand) => (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedBrand === brand
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-6">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${
              showFilters || activeFiltersCount > 0
                ? "bg-red-600 border-red-600 text-white"
                : "border-gray-200 text-gray-700 hover:border-red-300"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {activeFiltersCount > 0 && (
              <span className="w-5 h-5 bg-white text-red-600 rounded-full text-xs flex items-center justify-center font-bold">
                {activeFiltersCount}
              </span>
            )}
          </button>

          {activeFiltersCount > 0 && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium"
            >
              <X className="w-4 h-4" />
              Clear filters
            </button>
          )}

          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-gray-500 hidden sm:block">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-lg pl-3 pr-8 py-2.5 font-medium cursor-pointer focus:outline-none focus:border-red-500"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-gray-50 rounded-2xl p-5 mb-6 border border-gray-100 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                Category
              </p>
              <div className="flex flex-col gap-1.5">
                {CATEGORIES.map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="accent-red-600"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-red-600 transition-colors">
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                Max Price: ${priceRange[1].toLocaleString()}
              </p>
              <input
                type="range"
                min={0}
                max={maxPrice}
                step={50}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full accent-red-600"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>$0</span>
                <span>${maxPrice.toLocaleString()}</span>
              </div>
            </div>

            {/* Stock */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">
                Availability
              </p>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="accent-red-600 w-4 h-4"
                />
                <span className="text-sm text-gray-700">In stock only</span>
              </label>
            </div>
          </div>
        )}

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl font-display text-gray-400 uppercase">No scooters found</p>
            <p className="text-gray-400 mt-2 text-sm">Try adjusting your filters</p>
            <button
              onClick={clearFilters}
              className="mt-4 bg-red-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((scooter) => (
              <ProductCard key={scooter._id} scooter={scooter} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
