"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image?: string;
  quantity: number;
  type: "scooter" | "accessory";
  slug: string;
  color?: string;
}

export interface CompareItem {
  id: string;
  name: string;
  brand: string;
  price: number;
  salePrice?: number;
  image?: string;
  slug: string;
  specs: {
    topSpeed?: number;
    range?: number;
    motor?: number;
    battery?: number;
    weight?: number;
    maxLoad?: number;
    chargingTime?: number;
    waterResistance?: string;
    tireSize?: number;
    brakes?: string;
    suspension?: string;
  };
}

interface Store {
  // Cart
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: () => number;
  cartTotal: () => number;

  // Compare
  compareItems: CompareItem[];
  addToCompare: (item: CompareItem) => void;
  removeFromCompare: (id: string) => void;
  clearCompare: () => void;

  // UI
  cartOpen: boolean;
  setCartOpen: (open: boolean) => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (item) => {
        const existing = get().cart.find((i) => i.id === item.id && i.color === item.color);
        if (existing) {
          set({
            cart: get().cart.map((i) =>
              i.id === item.id && i.color === item.color ? { ...i, quantity: i.quantity + 1 } : i
            ),
          });
        } else {
          set({ cart: [...get().cart, { ...item, quantity: 1 }] });
        }
      },
      removeFromCart: (id) =>
        set({ cart: get().cart.filter((i) => !(i.id === id)) }),
      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
        } else {
          set({
            cart: get().cart.map((i) =>
              i.id === id ? { ...i, quantity } : i
            ),
          });
        }
      },
      clearCart: () => set({ cart: [] }),
      cartCount: () => get().cart.reduce((sum, item) => sum + item.quantity, 0),
      cartTotal: () =>
        get().cart.reduce(
          (sum, item) =>
            sum + (item.salePrice ?? item.price) * item.quantity,
          0
        ),

      // Compare
      compareItems: [],
      addToCompare: (item) => {
        const items = get().compareItems;
        if (items.length >= 3) return;
        if (items.find((i) => i.id === item.id)) return;
        set({ compareItems: [...items, item] });
      },
      removeFromCompare: (id) =>
        set({ compareItems: get().compareItems.filter((i) => i.id !== id) }),
      clearCompare: () => set({ compareItems: [] }),

      // UI
      cartOpen: false,
      setCartOpen: (open) => set({ cartOpen: open }),
      searchOpen: false,
      setSearchOpen: (open) => set({ searchOpen: open }),
      mobileMenuOpen: false,
      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
    }),
    {
      name: "rohan-wings-store",
      partialize: (state) => ({
        cart: state.cart,
        compareItems: state.compareItems,
      }),
    }
  )
);
