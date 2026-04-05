import { client, FEATURED_SCOOTERS_QUERY } from "@/lib/sanity";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export async function FeaturedScooters() {
  let scooters = [];
  try {
    scooters = await client.fetch(FEATURED_SCOOTERS_QUERY);
  } catch {
    // Sanity not configured yet
  }

  if (!scooters.length) {
    // Demo placeholder cards
    scooters = [
      {
        _id: "demo-1",
        name: "Segway Ninebot Max G2",
        brand: "segway",
        category: "city",
        slug: { current: "segway-ninebot-max-g2" },
        price: 799,
        salePrice: 699,
        badge: "Best Seller",
        inStock: true,
        featured: true,
        specs: { topSpeed: 25, range: 70, motor: 450 },
        description: "The ultimate city commuter with massive range.",
      },
      {
        _id: "demo-2",
        name: "Xiaomi Electric Scooter 4 Pro",
        brand: "xiaomi",
        category: "city",
        slug: { current: "xiaomi-4-pro" },
        price: 599,
        badge: "New",
        inStock: true,
        featured: true,
        specs: { topSpeed: 25, range: 55, motor: 700 },
        description: "Powerful and foldable city scooter.",
      },
      {
        _id: "demo-3",
        name: "Kaabo Wolf Warrior 11",
        brand: "kaabo",
        category: "off-road",
        slug: { current: "kaabo-wolf-warrior-11" },
        price: 2299,
        badge: "Hot Deal",
        inStock: true,
        featured: true,
        specs: { topSpeed: 65, range: 120, motor: 2000 },
        description: "Dominate any terrain with dual motor power.",
      },
    ];
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-red-600 font-bold text-sm uppercase tracking-widest mb-2">
              Featured
            </p>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-gray-900 uppercase">
              Top Picks
            </h2>
          </div>
          <Link
            href="/scooters"
            className="hidden sm:flex items-center gap-2 text-red-600 font-semibold text-sm hover:gap-3 transition-all"
          >
            View All <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {scooters.map((scooter: Parameters<typeof ProductCard>[0]["scooter"]) => (
            <ProductCard key={scooter._id} scooter={scooter} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/scooters"
            className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-colors"
          >
            View All Scooters <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
