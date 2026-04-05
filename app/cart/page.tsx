import { CartPageClient } from "@/components/CartPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Your Cart" };

export default function CartPage() {
  return <CartPageClient />;
}
