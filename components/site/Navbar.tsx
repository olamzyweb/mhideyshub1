"use client";

import Link from "next/link";
import { ShoppingBag, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/CartProvider";

export default function Navbar() {
  const { items } = useCart();
  const count = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-semibold text-ink">
          MHIDEY&apos;S HUB💎💕
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-ink md:flex">
          <Link href="/shop" className="hover:text-slate-700">Shop</Link>
          <Link href="/shop" className="hover:text-slate-700">Categories</Link>
          <Link href="/about" className="hover:text-slate-700">About</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" size="sm" className="hidden md:inline-flex">
            <a href="https://chat.whatsapp.com/LZk3ZAIos259NRUc2OG7fx?mode=ems_copy_c" target="_blank" rel="noreferrer">
              <MessageCircle size={16} /> Chat on WhatsApp
            </a>
          </Button>
          <Link href="/cart" className="relative flex h-10 w-10 items-center justify-center rounded-full border border-ink/10">
            <ShoppingBag size={18} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink text-xs text-white">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}
