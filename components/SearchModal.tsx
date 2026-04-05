"use client";

import { useStore } from "@/lib/store";
import { X, Search, ArrowRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { client, SCOOTERS_QUERY, ACCESSORIES_QUERY } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface SearchResult {
  _id: string;
  name: string;
  slug: { current: string };
  price: number;
  salePrice?: number;
  image?: { asset: { _ref: string } };
  type: "scooter" | "accessory";
}

export function SearchModal() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const q = query.toLowerCase();
        const [scooters, accessories] = await Promise.all([
          client.fetch(SCOOTERS_QUERY),
          client.fetch(ACCESSORIES_QUERY),
        ]);

        const allResults: SearchResult[] = [
          ...scooters.map((s: SearchResult) => ({ ...s, type: "scooter" as const })),
          ...accessories.map((a: SearchResult) => ({ ...a, type: "accessory" as const })),
        ];

        const filtered = allResults.filter((item) =>
          item.name.toLowerCase().includes(q)
        ).slice(0, 6);

        setResults(filtered);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [setSearchOpen]);

  if (!searchOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
        onClick={() => setSearchOpen(false)}
      />
      <div className="fixed top-4 left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 px-4">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
            <Search className="w-5 h-5 text-gray-400 shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search scooters, accessories..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 text-base outline-none text-gray-900 placeholder-gray-400"
            />
            <button
              onClick={() => setSearchOpen(false)}
              className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>

          {/* Results */}
          {loading && (
            <div className="p-8 text-center text-gray-400">Searching...</div>
          )}

          {!loading && query && results.length === 0 && (
            <div className="p-8 text-center text-gray-400">
              No results for &quot;{query}&quot;
            </div>
          )}

          {!loading && results.length > 0 && (
            <ul className="py-2 max-h-80 overflow-y-auto">
              {results.map((item) => (
                <li key={item._id}>
                  <Link
                    href={`/${item.type === "scooter" ? "scooters" : "accessories"}/${item.slug.current}`}
                    onClick={() => setSearchOpen(false)}
                    className="flex items-center gap-4 px-5 py-3 hover:bg-red-50 transition-colors"
                  >
                    <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                      {item.image && (
                        <Image
                          src={urlFor(item.image).width(96).url()}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-contain"
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-gray-900 truncate">{item.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                    </div>
                    <div className="text-right shrink-0">
                      {item.salePrice ? (
                        <p className="font-bold text-sm text-red-600">${item.salePrice}</p>
                      ) : (
                        <p className="font-bold text-sm text-gray-900">${item.price}</p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-300" />
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {!query && (
            <div className="p-6 text-center text-sm text-gray-400">
              Start typing to search products...
            </div>
          )}
        </div>
      </div>
    </>
  );
}
