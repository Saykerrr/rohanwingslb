import { Shield, Truck, Wrench, MessageCircle, Award, Zap } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Official Warranty",
    description:
      "All scooters come with manufacturer warranty. We handle all warranty claims directly.",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description:
      "Free delivery across Beirut on orders over $500. Nationwide delivery available.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Wrench,
    title: "Expert Service",
    description:
      "In-house technicians for maintenance, repairs, and upgrades at all our branches.",
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Support",
    description:
      "Instant support via WhatsApp. Our team responds within minutes, 7 days a week.",
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    icon: Award,
    title: "Premium Brands",
    description:
      "Official dealer for Segway, Xiaomi, Kaabo, Vsett, Zero & more top brands.",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Zap,
    title: "Test Rides",
    description:
      "Try before you buy! Test rides available at all our Beirut branches.",
    color: "text-red-600",
    bg: "bg-red-50",
  },
];

export function WhyUsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-red-600 font-bold text-sm uppercase tracking-widest mb-2">
            Why Choose Us
          </p>
          <h2 className="font-display font-bold text-4xl sm:text-5xl text-gray-900 uppercase">
            The Rohan Wings Difference
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-red-100 hover:shadow-md transition-all"
            >
              <div
                className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-display font-semibold text-lg text-gray-900 uppercase mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
