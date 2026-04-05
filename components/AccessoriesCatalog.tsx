"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { useStore } from "@/lib/store";
import toast from "react-hot-toast";
import { ShoppingCart, Package } from "lucide-react";
import Link from "next/link";

interface Accessory {
  _id: string;
  name: string;
  slug: { current: string };
  category: string;
  price: number;
  image?: { asset: { _ref: string } };
  description?: string;
  inStock?: boolean;
}

const CATEGORIES = ["All", "Helmets", "Locks", "Bags", "Lights", "Chargers", "Protection", "Other"];

export function AccessoriesCatalog({ accessories }: { accessories: Accessory[] }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { addToCart, setCartOpen } = useStore();

  const filtered = useMemo(() => {
    if (selectedCategory === "All") return accessories;
    return accessories.filter(
      (a) => a.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  }, [accessories, selectedCategory]);

  const handleAddToCart = (item: Accessory, e: React.MouseEvent) => {
    e.preventDefault();
    const imageUrl = item.image ? urlFor(item.image).width(200).url() : undefined;
    addToCart({
      id: item._id,
      name: item.name,
      price: item.price,
      image: imageUrl,
      type: "accessory",
      slug: item.slug.current,
    });
    toast.success(`${item.name} added to cart!`);
    setCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-500 font-bold text-sm uppercase tracking-widest mb-2">
            Gear Up
          </p>
          <h1 className="font-display font-bold text-5xl uppercase">Accessories</h1>
          <p className="text-gray-400 mt-2">{filtered.length} items</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                selectedCategory === cat
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filtered.map((item) => {
            const imageUrl = item.image ? urlFor(item.image).width(400).height(400).url() : null;
            return (
              <div
                key={item._id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover group"
              >
                {/* Image */}
                <div className="relative aspect-square bg-gray-50 overflow-hidden">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={item.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-12 h-12 text-gray-200" />
                    </div>
                  )}
                  {!item.inStock && (
                    <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
                      <span className="bg-gray-800 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-3">
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-1 capitalize">
                    {item.category}
                  </p>
                  <h3 className="font-semibold text-sm text-gray-900 leading-tight mb-2 line-clamp-2">
                    {item.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <p className="font-display font-bold text-lg text-gray-900">
                      ${item.price}
                    </p>
                    {item.inStock !== false && (
                      <button
                        onClick={(e) => handleAddToCart(item, e)}
                        className="w-8 h-8 bg-red-600 hover:bg-red-700 text-white rounded-lg flex items-center justify-center transition-colors"
                      >
                        <ShoppingCart className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
