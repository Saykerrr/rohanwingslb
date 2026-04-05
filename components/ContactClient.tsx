"use client";

import { MapPin, Phone, MessageCircle, ExternalLink } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface Branch {
  _id: string;
  name: string;
  phone?: string;
  whatsappNumber?: string;
  mapsLink?: string;
  address?: string;
}

export function ContactClient({ branches }: { branches: Branch[] }) {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-red-500 font-bold text-sm uppercase tracking-widest mb-2">
            Get in Touch
          </p>
          <h1 className="font-display font-bold text-5xl uppercase">Contact Us</h1>
          <p className="text-gray-400 mt-2">
            Visit one of our branches or reach us on WhatsApp.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Quick contact */}
        <div className="grid sm:grid-cols-3 gap-4 mb-14">
          <a
            href="https://wa.me/96171234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-2xl bg-green-50 border border-green-100 hover:border-green-300 transition-all group"
          >
            <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">WhatsApp</p>
              <p className="text-xs text-gray-500">Instant replies · 7 days</p>
            </div>
          </a>

          <a
            href="tel:+96171234567"
            className="flex items-center gap-4 p-5 rounded-2xl bg-blue-50 border border-blue-100 hover:border-blue-300 transition-all"
          >
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
              <Phone className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Call Us</p>
              <p className="text-xs text-gray-500">+961 71 234 567</p>
            </div>
          </a>

          <a
            href="https://instagram.com/rohanwingslebanon"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-2xl bg-red-50 border border-red-100 hover:border-red-300 transition-all"
          >
            <div className="w-12 h-12 bg-red-600 rounded-xl flex items-center justify-center shrink-0">
              <InstagramIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-900 text-sm">Instagram</p>
              <p className="text-xs text-gray-500">@rohanwingslebanon</p>
            </div>
          </a>
        </div>

        {/* Branches */}
        <h2 className="font-display font-bold text-3xl text-gray-900 uppercase mb-6">
          Our Branches
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch, idx) => (
            <div
              key={branch._id}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Map placeholder */}
              <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                <MapPin className="w-10 h-10 text-red-600" />
                {idx === 0 && (
                  <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    Main Branch
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-display font-semibold text-lg text-gray-900 uppercase mb-1">
                  {branch.name}
                </h3>
                {branch.address && (
                  <p className="text-sm text-gray-500 flex items-center gap-1.5 mb-3">
                    <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                    {branch.address}
                  </p>
                )}

                <div className="flex flex-col gap-2">
                  {branch.phone && (
                    <a
                      href={`tel:${branch.phone}`}
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Phone className="w-4 h-4 text-gray-400" />
                      {branch.phone}
                    </a>
                  )}
                  {branch.whatsappNumber && (
                    <a
                      href={`https://wa.me/${branch.whatsappNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-gray-400" />
                      WhatsApp
                    </a>
                  )}
                </div>

                {branch.mapsLink && (
                  <a
                    href={branch.mapsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center justify-center gap-2 w-full border border-gray-200 hover:border-red-500 hover:text-red-600 text-gray-600 text-sm font-semibold py-2.5 rounded-xl transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Get Directions
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="mt-14 bg-gray-900 rounded-2xl p-10 text-center text-white">
          <MessageCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
          <h3 className="font-display font-bold text-3xl uppercase mb-3">
            Order via WhatsApp
          </h3>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            Browse our catalog, add items to your cart, then checkout directly via WhatsApp. No account needed.
          </p>
          <a
            href="https://wa.me/96171234567?text=Hi! I'd like to enquire about your scooters."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
            Start WhatsApp Chat
          </a>
        </div>
      </div>
    </div>
  );
}
