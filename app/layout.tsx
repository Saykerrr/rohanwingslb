import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { FooterWrapper } from "@/components/FooterWrapper";
import { CartDrawer } from "@/components/CartDrawer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Rohan Wings Lebanon | Electric Scooters",
    template: "%s | Rohan Wings Lebanon",
  },
  description:
    "Lebanon's premier electric scooter shop. Explore Segway, Ninebot, Xiaomi & more.",
  keywords: ["electric scooter", "Lebanon", "Segway", "Ninebot", "Xiaomi", "e-scooter"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased bg-white text-gray-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <FooterWrapper />
        <CartDrawer />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#DC2626",
              color: "#fff",
              borderRadius: 10,
              fontSize: 14,
              fontWeight: 600,
              fontFamily: "'Oswald', sans-serif",
              letterSpacing: 1,
              padding: "12px 22px",
              boxShadow: "0 4px 20px rgba(220,38,38,.25)",
            },
            duration: 2200,
            success: { icon: null },
            error: { icon: null },
          }}
        />
      </body>
    </html>
  );
}
