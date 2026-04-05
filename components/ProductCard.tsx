"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, GitCompare, Zap, Wind, Battery } from "lucide-react";
import { useStore, CompareItem } from "@/lib/store";
import { urlFor } from "@/lib/sanity";
import toast from "react-hot-toast";

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
    maxLoad?: number;
    chargingTime?: number;
    waterResistance?: string;
    tireSize?: number;
    brakes?: string;
    suspension?: string;
  };
  description?: string;
  badge?: string;
  inStock?: boolean;
  featured?: boolean;
}

interface ProductCardProps {
  scooter: Scooter;
}

const badgeColors: Record<string, string> = {
  New: "bg-blue-600",
  "Best Seller": "bg-amber-500",
  "Hot Deal": "bg-red-600",
  Limited: "bg-purple-600",
  Sale: "bg-green-600",
};

export function ProductCard({ scooter }: ProductCardProps) {
  const { addToCart, addToCompare, setCartOpen, compareItems } = useStore();

  const isInCompare = compareItems.some((i) => i.id === scooter._id);
  const discount = scooter.salePrice
    ? Math.round(((scooter.price - scooter.salePrice) / scooter.price) * 100)
    : 0;

  const imageUrl = scooter.image
    ? urlFor(scooter.image).width(600).height(400).url()
    : null;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: scooter._id,
      name: scooter.name,
      price: scooter.price,
      salePrice: scooter.salePrice,
      image: imageUrl || undefined,
      type: "scooter",
      slug: scooter.slug.current,
    });
    toast.success(`${scooter.name} added to cart!`);
    setCartOpen(true);
  };

  const handleAddToCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (compareItems.length >= 3 && !isInCompare) {
      toast.error("You can compare up to 3 scooters at a time.");
      return;
    }
    const compareItem: CompareItem = {
      id: scooter._id,
      name: scooter.name,
      brand: scooter.brand,
      price: scooter.price,
      salePrice: scooter.salePrice,
      image: imageUrl || undefined,
      slug: scooter.slug.current,
      specs: scooter.specs || {},
    };
    addToCompare(compareItem);
    toast.success(`${scooter.name} added to compare!`);
  };

  return (
    <Link href={`/scooters/${scooter.slug.current}`} className="group block">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden card-hover h-full flex flex-col">
        {/* Image */}
        <div className="relative bg-gray-50 aspect-[4/3] overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={scooter.image?.alt || scooter.name}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Zap className="w-16 h-16 text-gray-200" />
            </div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {scooter.badge && (
              <span
                className={`${badgeColors[scooter.badge] || "bg-gray-600"} text-white text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wide`}
              >
                {scooter.badge}
              </span>
            )}
            {discount > 0 && (
              <span className="bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                -{discount}%
              </span>
            )}
            {!scooter.inStock && (
              <span className="bg-gray-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                Out of Stock
              </span>
            )}
          </div>

          {/* Compare button */}
          <button
            onClick={handleAddToCompare}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
              isInCompare
                ? "bg-red-600 text-white"
                : "bg-white text-gray-600 hover:bg-red-600 hover:text-white opacity-0 group-hover:opacity-100"
            }`}
            title={isInCompare ? "In compare list" : "Add to compare"}
          >
            <GitCompare className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-1">
          {/* Brand */}
          <p className="text-xs font-bold text-red-600 uppercase tracking-widest mb-1">
            {scooter.brand}
          </p>

          {/* Name */}
          <h3 className="font-display font-semibold text-gray-900 text-lg leading-tight mb-2 group-hover:text-red-600 transition-colors line-clamp-2">
            {scooter.name}
          </h3>

          {/* Key Specs */}
          {scooter.specs && (
            <div className="flex gap-3 mb-3">
              {scooter.specs.topSpeed && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Zap className="w-3.5 h-3.5 text-red-500" />
                  <span className="font-medium">{scooter.specs.topSpeed} km/h</span>
                </div>
              )}
              {scooter.specs.range && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Wind className="w-3.5 h-3.5 text-blue-500" />
                  <span className="font-medium">{scooter.specs.range} km</span>
                </div>
              )}
              {scooter.specs.motor && (
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Battery className="w-3.5 h-3.5 text-green-500" />
                  <span className="font-medium">{scooter.specs.motor}W</span>
                </div>
              )}
            </div>
          )}

          {/* Price */}
          <div className="mt-auto flex items-end justify-between">
            <div>
              {scooter.salePrice ? (
                <>
                  <p className="text-2xl font-display font-bold text-red-600">
                    ${scooter.salePrice.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-400 line-through">
                    ${scooter.price.toLocaleString()}
                  </p>
                </>
              ) : (
                <p className="text-2xl font-display font-bold text-gray-900">
                  ${scooter.price.toLocaleString()}
                </p>
              )}
            </div>

            {scooter.inStock !== false && (
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-3.5 py-2 rounded-lg transition-colors"
              >
                <ShoppingCart className="w-4 h-4" />
                <span className="hidden sm:inline">Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
