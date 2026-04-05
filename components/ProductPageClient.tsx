"use client";

import { useState } from "react";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";
import { useStore, CompareItem } from "@/lib/store";
import toast from "react-hot-toast";
import {
  ShoppingCart,
  MessageCircle,
  GitCompare,
  ChevronLeft,
  ChevronRight,
  Zap,
  Wind,
  Battery,
  Weight,
  Shield,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import Link from "next/link";

interface Scooter {
  _id: string;
  name: string;
  brand: string;
  category: string;
  slug: { current: string };
  price: number;
  salePrice?: number;
  images?: Array<{ asset: { _ref: string }; alt?: string }>;
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
    displayType?: string;
  };
  description?: string;
  badge?: string;
  inStock?: boolean;
}

const specLabels: Record<string, { label: string; unit: string; icon: React.ReactNode }> = {
  topSpeed: { label: "Top Speed", unit: "km/h", icon: <Zap className="w-4 h-4 text-red-500" /> },
  range: { label: "Range", unit: "km", icon: <Wind className="w-4 h-4 text-blue-500" /> },
  motor: { label: "Motor Power", unit: "W", icon: <Zap className="w-4 h-4 text-amber-500" /> },
  battery: { label: "Battery", unit: "Wh", icon: <Battery className="w-4 h-4 text-green-500" /> },
  weight: { label: "Weight", unit: "kg", icon: <Weight className="w-4 h-4 text-purple-500" /> },
  maxLoad: { label: "Max Load", unit: "kg", icon: <Weight className="w-4 h-4 text-gray-500" /> },
  chargingTime: { label: "Charging Time", unit: "h", icon: <Battery className="w-4 h-4 text-yellow-500" /> },
  waterResistance: { label: "Water Resistance", unit: "", icon: <Shield className="w-4 h-4 text-cyan-500" /> },
  tireSize: { label: "Tire Size", unit: '"', icon: <Wind className="w-4 h-4 text-gray-500" /> },
  brakes: { label: "Brakes", unit: "", icon: <Shield className="w-4 h-4 text-red-500" /> },
  suspension: { label: "Suspension", unit: "", icon: <Wind className="w-4 h-4 text-indigo-500" /> },
  displayType: { label: "Display", unit: "", icon: <Zap className="w-4 h-4 text-gray-500" /> },
};

export function ProductPageClient({ scooter }: { scooter: Scooter }) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, addToCompare, setCartOpen, compareItems } = useStore();

  const images = scooter.images && scooter.images.length > 0 ? scooter.images : scooter.image ? [scooter.image] : [];
  const isInCompare = compareItems.some((i) => i.id === scooter._id);
  const discount = scooter.salePrice
    ? Math.round(((scooter.price - scooter.salePrice) / scooter.price) * 100)
    : 0;

  const currentPrice = scooter.salePrice ?? scooter.price;
  const currentImageUrl =
    images.length > 0 ? urlFor(images[activeImage]).width(800).height(600).url() : null;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: scooter._id,
        name: scooter.name,
        price: scooter.price,
        salePrice: scooter.salePrice,
        image: currentImageUrl || undefined,
        type: "scooter",
        slug: scooter.slug.current,
      });
    }
    toast.success(`${scooter.name} added to cart!`);
    setCartOpen(true);
  };

  const buildWhatsAppMessage = () => {
    const msg = `Hi! I'm interested in: ${scooter.name} (x${quantity})\nPrice: $${(currentPrice * quantity).toLocaleString()}\n\nPlease provide more details.`;
    return encodeURIComponent(msg);
  };

  const handleAddToCompare = () => {
    if (compareItems.length >= 3 && !isInCompare) {
      toast.error("You can compare up to 3 scooters at a time.");
      return;
    }
    const item: CompareItem = {
      id: scooter._id,
      name: scooter.name,
      brand: scooter.brand,
      price: scooter.price,
      salePrice: scooter.salePrice,
      image: currentImageUrl || undefined,
      slug: scooter.slug.current,
      specs: scooter.specs || {},
    };
    addToCompare(item);
    toast.success(`Added to compare!`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-100 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/scooters" className="hover:text-red-600 transition-colors">Scooters</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{scooter.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            {/* Main image */}
            <div className="relative bg-gray-50 rounded-2xl overflow-hidden aspect-[4/3] mb-4 border border-gray-100">
              {currentImageUrl ? (
                <Image
                  src={currentImageUrl}
                  alt={scooter.name}
                  fill
                  className="object-contain p-8"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Zap className="w-24 h-24 text-gray-200" />
                </div>
              )}

              {/* Badges */}
              {scooter.badge && (
                <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full uppercase">
                  {scooter.badge}
                </span>
              )}
              {discount > 0 && (
                <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                  -{discount}%
                </span>
              )}

              {/* Navigation arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImage((prev) => (prev - 1 + images.length) % images.length)}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImage((prev) => (prev + 1) % images.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === idx ? "border-red-600" : "border-gray-100 hover:border-gray-300"
                    }`}
                  >
                    <Image
                      src={urlFor(img).width(160).height(160).url()}
                      alt={`${scooter.name} ${idx + 1}`}
                      width={80}
                      height={80}
                      className="object-contain w-full h-full p-1"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <p className="text-red-600 text-sm font-bold uppercase tracking-widest mb-2">
              {scooter.brand}
            </p>
            <h1 className="font-display font-bold text-4xl text-gray-900 uppercase leading-tight mb-3">
              {scooter.name}
            </h1>

            {/* Stock status */}
            <div className="flex items-center gap-2 mb-4">
              {scooter.inStock !== false ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-green-600 font-semibold">In Stock</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-600 font-semibold">Out of Stock</span>
                </>
              )}
            </div>

            {scooter.description && (
              <p className="text-gray-600 leading-relaxed mb-6">{scooter.description}</p>
            )}

            {/* Quick specs */}
            {scooter.specs && (
              <div className="grid grid-cols-3 gap-3 mb-6">
                {scooter.specs.topSpeed && (
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <Zap className="w-5 h-5 text-red-500 mx-auto mb-1" />
                    <p className="font-display font-bold text-lg text-gray-900">
                      {scooter.specs.topSpeed}
                    </p>
                    <p className="text-xs text-gray-500">km/h</p>
                  </div>
                )}
                {scooter.specs.range && (
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <Wind className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                    <p className="font-display font-bold text-lg text-gray-900">
                      {scooter.specs.range}
                    </p>
                    <p className="text-xs text-gray-500">km range</p>
                  </div>
                )}
                {scooter.specs.motor && (
                  <div className="bg-gray-50 rounded-xl p-3 text-center">
                    <Battery className="w-5 h-5 text-green-500 mx-auto mb-1" />
                    <p className="font-display font-bold text-lg text-gray-900">
                      {scooter.specs.motor}
                    </p>
                    <p className="text-xs text-gray-500">Watts</p>
                  </div>
                )}
              </div>
            )}

            {/* Price */}
            <div className="flex items-end gap-3 mb-6">
              {scooter.salePrice ? (
                <>
                  <span className="font-display font-bold text-4xl text-red-600">
                    ${scooter.salePrice.toLocaleString()}
                  </span>
                  <span className="text-xl text-gray-400 line-through mb-1">
                    ${scooter.price.toLocaleString()}
                  </span>
                  <span className="bg-green-100 text-green-700 text-sm font-bold px-2 py-1 rounded-lg mb-1">
                    Save ${(scooter.price - scooter.salePrice).toLocaleString()}
                  </span>
                </>
              ) : (
                <span className="font-display font-bold text-4xl text-gray-900">
                  ${scooter.price.toLocaleString()}
                </span>
              )}
            </div>

            {/* Quantity + Actions */}
            {scooter.inStock !== false && (
              <div className="space-y-3">
                {/* Quantity */}
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600 font-medium">Qty:</span>
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                    >
                      -
                    </button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center hover:bg-gray-50 transition-colors text-gray-600"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-4 rounded-xl font-semibold text-base transition-colors"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart — ${(currentPrice * quantity).toLocaleString()}
                </button>

                <a
                  href={`https://wa.me/96171234567?text=${buildWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-semibold text-base transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Enquire on WhatsApp
                </a>

                <button
                  onClick={handleAddToCompare}
                  className={`w-full flex items-center justify-center gap-2 border-2 py-3 rounded-xl font-semibold text-sm transition-colors ${
                    isInCompare
                      ? "border-red-600 text-red-600 bg-red-50"
                      : "border-gray-200 text-gray-600 hover:border-red-300 hover:text-red-600"
                  }`}
                >
                  <GitCompare className="w-4 h-4" />
                  {isInCompare ? "Added to Compare" : "Add to Compare"}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Full Specs Table */}
        {scooter.specs && Object.keys(scooter.specs).length > 0 && (
          <div className="mt-14">
            <h2 className="font-display font-bold text-3xl text-gray-900 uppercase mb-6">
              Technical Specifications
            </h2>
            <div className="bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full">
                <tbody>
                  {Object.entries(scooter.specs).map(([key, value], idx) => {
                    if (!value || !specLabels[key]) return null;
                    const spec = specLabels[key];
                    return (
                      <tr
                        key={key}
                        className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                      >
                        <td className="px-6 py-4 text-sm font-medium text-gray-500 flex items-center gap-2 w-1/2">
                          {spec.icon}
                          {spec.label}
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                          {String(value)}{spec.unit}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
