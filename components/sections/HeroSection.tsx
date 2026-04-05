"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, Zap, Shield, Truck } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Red accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-700 via-red-500 to-red-700" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Text content */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-red-600/10 border border-red-600/30 text-red-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <Zap className="w-4 h-4" />
            Lebanon&apos;s #1 Electric Scooter Shop
          </div>

          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight uppercase tracking-tight">
            Ride The{" "}
            <span className="text-red-500">Future</span>
            <br />
            Today
          </h1>

          <p className="mt-6 text-lg text-gray-300 max-w-xl leading-relaxed">
            Discover Lebanon&apos;s largest collection of premium electric scooters. From city commuters to off-road beasts — we&apos;ve got your ride.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/scooters"
              className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-xl font-semibold text-base transition-all hover:shadow-lg hover:shadow-red-600/30"
            >
              Shop Scooters
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/compare"
              className="flex items-center justify-center gap-2 border-2 border-gray-600 hover:border-red-500 text-gray-300 hover:text-red-400 px-8 py-4 rounded-xl font-semibold text-base transition-all"
            >
              Compare Models
            </Link>
          </div>

          {/* Trust badges */}
          <div className="mt-10 flex flex-wrap gap-6 justify-center lg:justify-start">
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Shield className="w-4 h-4 text-red-500" />
              <span>Official Warranty</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Truck className="w-4 h-4 text-red-500" />
              <span>Free Beirut Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Zap className="w-4 h-4 text-red-500" />
              <span>Expert Support</span>
            </div>
          </div>
        </div>

        {/* Hero visual */}
        <div className="hidden lg:flex items-center justify-center relative">
          <div className="w-80 h-80 bg-red-600/10 rounded-full flex items-center justify-center relative">
            <div className="w-56 h-56 bg-red-600/20 rounded-full flex items-center justify-center">
              <div className="text-center">
                <Zap className="w-24 h-24 text-red-500 mx-auto" />
                <p className="text-white font-display text-2xl font-bold uppercase mt-2">
                  Electric
                </p>
              </div>
            </div>
            {/* Orbiting stats */}
            {[
              { label: "Top Speed", value: "65+", unit: "km/h", angle: 0 },
              { label: "Range", value: "120+", unit: "km", angle: 120 },
              { label: "Brands", value: "6+", unit: "", angle: 240 },
            ].map((stat) => {
              const rad = (stat.angle * Math.PI) / 180;
              const x = 50 + 45 * Math.cos(rad - Math.PI / 2);
              const y = 50 + 45 * Math.sin(rad - Math.PI / 2);
              return (
                <div
                  key={stat.label}
                  className="absolute bg-gray-800 border border-gray-700 rounded-xl px-3 py-2 text-center"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <p className="font-display font-bold text-white text-lg leading-none">
                    {stat.value}
                    <span className="text-sm text-red-400">{stat.unit}</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-6 h-6 text-gray-500" />
      </div>
    </section>
  );
}
