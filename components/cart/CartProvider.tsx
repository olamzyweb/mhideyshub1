"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/lib/cart";
import { toast } from "sonner";

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, size?: string, color?: string) => void;
  updateQuantity: (id: string, quantity: number, size?: string, color?: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const STORAGE_KEY = "mhideys-cart";

function getKey(item: CartItem) {
  return `${item.id}_${item.size ?? ""}_${item.color ?? ""}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      addItem: (item) => {
        setItems((prev) => {
          const key = getKey(item);
          const existing = prev.find((p) => getKey(p) === key);
          if (existing) {
            return prev.map((p) => (getKey(p) === key ? { ...p, quantity: p.quantity + item.quantity } : p));
          }
          return [...prev, item];
        });
        toast.success("Added to cart");
      },
      removeItem: (id, size, color) => {
        setItems((prev) => prev.filter((p) => getKey(p) !== `${id}_${size ?? ""}_${color ?? ""}`));
        toast.message("Item removed");
      },
      updateQuantity: (id, quantity, size, color) => {
        if (quantity <= 0) return;
        setItems((prev) =>
          prev.map((p) =>
            getKey(p) === `${id}_${size ?? ""}_${color ?? ""}` ? { ...p, quantity } : p
          )
        );
      },
      clear: () => setItems([])
    }),
    [items]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
