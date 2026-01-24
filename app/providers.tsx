"use client";

import { CartProvider } from "@/components/cart/CartProvider";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <Toaster richColors position="top-right" />
    </CartProvider>
  );
}
