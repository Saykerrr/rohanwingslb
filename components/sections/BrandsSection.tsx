import Link from "next/link";

const brands = [
  { name: "Segway", slug: "segway", color: "#00A0E3" },
  { name: "Xiaomi", slug: "xiaomi", color: "#FF6900" },
  { name: "Vsett", slug: "vsett", color: "#2563EB" },
  { name: "Kaabo", slug: "kaabo", color: "#DC2626" },
  { name: "Zero", slug: "zero", color: "#111827" },
  { name: "Ninebot", slug: "ninebot", color: "#059669" },
];

export function BrandsSection() {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">
          Official Dealer — Premium Brands
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Link
              key={brand.slug}
              href={`/scooters?brand=${brand.slug}`}
              className="flex items-center justify-center py-5 px-3 bg-white rounded-xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all group"
            >
              <div className="text-center">
                <div
                  className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center text-white text-xs font-black"
                  style={{ backgroundColor: brand.color }}
                >
                  {brand.name[0]}
                </div>
                <span className="text-xs font-bold text-gray-600 group-hover:text-red-600 transition-colors uppercase tracking-wide">
                  {brand.name}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
