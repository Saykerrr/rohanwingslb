"use client";

import { useStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, GitCompare, CheckCircle, XCircle } from "lucide-react";

const specRows = [
  { key: "topSpeed", label: "Top Speed", unit: "km/h" },
  { key: "range", label: "Range", unit: "km" },
  { key: "motor", label: "Motor Power", unit: "W" },
  { key: "battery", label: "Battery", unit: "Wh" },
  { key: "weight", label: "Weight", unit: "kg" },
  { key: "maxLoad", label: "Max Load", unit: "kg" },
  { key: "chargingTime", label: "Charging Time", unit: "h" },
  { key: "waterResistance", label: "Water Resistance", unit: "" },
  { key: "tireSize", label: "Tire Size", unit: '"' },
  { key: "brakes", label: "Brakes", unit: "" },
  { key: "suspension", label: "Suspension", unit: "" },
];

function getBest(items: Array<{ specs: Record<string, unknown> }>, key: string): number | null {
  const values = items.map((item) => item.specs[key]).filter((v) => typeof v === "number") as number[];
  if (!values.length) return null;
  return key === "weight" || key === "chargingTime" ? Math.min(...values) : Math.max(...values);
}

export function ComparePageClient() {
  const { compareItems, removeFromCompare, clearCompare } = useStore();

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-900 text-white py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-500 font-bold text-sm uppercase tracking-widest mb-2">
                Side by Side
              </p>
              <h1 className="font-display font-bold text-5xl uppercase">Compare</h1>
            </div>
            {compareItems.length > 0 && (
              <button
                onClick={clearCompare}
                className="text-sm text-gray-400 hover:text-red-400 transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {compareItems.length === 0 ? (
          <div className="text-center py-20">
            <GitCompare className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <h2 className="font-display text-2xl text-gray-400 uppercase mb-2">
              No Scooters to Compare
            </h2>
            <p className="text-gray-400 mb-6 text-sm">
              Add up to 3 scooters from the catalog to compare specs side by side.
            </p>
            <Link
              href="/scooters"
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
            >
              Browse Scooters
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              {/* Product headers */}
              <thead>
                <tr>
                  <th className="w-40 text-left py-4 pr-4 text-sm font-bold text-gray-400 uppercase tracking-wide align-bottom">
                    Spec
                  </th>
                  {compareItems.map((item) => (
                    <th key={item.id} className="px-4 py-4 align-top">
                      <div className="relative bg-gray-50 rounded-2xl p-4 border border-gray-100">
                        <button
                          onClick={() => removeFromCompare(item.id)}
                          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-200 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>

                        {/* Image */}
                        <div className="w-full aspect-square bg-white rounded-xl overflow-hidden mb-3 border border-gray-100">
                          {item.image ? (
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={200}
                              height={200}
                              className="w-full h-full object-contain p-2"
                            />
                          ) : (
                            <div className="w-full h-full bg-gray-100" />
                          )}
                        </div>

                        <p className="text-xs text-red-600 font-bold uppercase tracking-wide mb-1">
                          {item.brand}
                        </p>
                        <Link
                          href={`/scooters/${item.slug}`}
                          className="font-display font-semibold text-sm text-gray-900 hover:text-red-600 transition-colors uppercase leading-tight block"
                        >
                          {item.name}
                        </Link>

                        <div className="mt-3">
                          {item.salePrice ? (
                            <>
                              <p className="font-display font-bold text-xl text-red-600">
                                ${item.salePrice.toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-400 line-through">
                                ${item.price.toLocaleString()}
                              </p>
                            </>
                          ) : (
                            <p className="font-display font-bold text-xl text-gray-900">
                              ${item.price.toLocaleString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </th>
                  ))}

                  {/* Empty slot(s) */}
                  {compareItems.length < 3 && (
                    <th className="px-4 py-4 align-top">
                      <Link
                        href="/scooters"
                        className="flex flex-col items-center justify-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all p-8 gap-3"
                      >
                        <Plus className="w-8 h-8 text-gray-300" />
                        <span className="text-sm text-gray-400 font-medium">Add Scooter</span>
                      </Link>
                    </th>
                  )}
                </tr>
              </thead>

              {/* Spec rows */}
              <tbody>
                {specRows.map((row, idx) => {
                  const bestValue = getBest(
                    compareItems.map((i) => ({ specs: i.specs as Record<string, unknown> })),
                    row.key
                  );

                  return (
                    <tr
                      key={row.key}
                      className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"}
                    >
                      <td className="py-4 pr-4 text-sm font-medium text-gray-500">
                        {row.label}
                      </td>
                      {compareItems.map((item) => {
                        const value = (item.specs as Record<string, unknown>)[row.key];
                        const isBest =
                          typeof value === "number" &&
                          bestValue !== null &&
                          value === bestValue;

                        return (
                          <td key={item.id} className="px-4 py-4 text-center">
                            {value !== undefined && value !== null ? (
                              <span
                                className={`inline-flex items-center gap-1 font-semibold text-sm px-2 py-1 rounded-lg ${
                                  isBest
                                    ? "bg-green-100 text-green-700"
                                    : "text-gray-700"
                                }`}
                              >
                                {isBest && (
                                  <CheckCircle className="w-3.5 h-3.5" />
                                )}
                                {String(value)}{row.unit}
                              </span>
                            ) : (
                              <span className="text-gray-300 text-sm">—</span>
                            )}
                          </td>
                        );
                      })}
                      {compareItems.length < 3 && <td />}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
