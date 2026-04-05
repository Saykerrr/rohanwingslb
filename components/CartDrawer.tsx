"use client";

import { useEffect } from "react";
import { useStore } from "@/lib/store";
import { useRouter } from "next/navigation";

// Prototype uses a full cart page, not a slide-in drawer.
// This component listens for cart open events and navigates to /cart.
export function CartDrawer() {
  const { cartOpen, setCartOpen } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (cartOpen) {
      setCartOpen(false);
      router.push("/cart");
    }
  }, [cartOpen, setCartOpen, router]);

  return null;
}
