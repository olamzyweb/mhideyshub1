"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import { Button } from "@/components/ui/button";
import { buildWhatsAppMessage, buildWhatsAppUrl, formatNaira } from "@/lib/whatsapp";
import { WHATSAPP_NUMBER } from "@/lib/constants";

export default function CartPage() {
  const { items, updateQuantity, removeItem, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [note, setNote] = useState("");

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const checkout = () => {
    if (items.length === 0) return;
    const message = buildWhatsAppMessage({
      items,
      name,
      phone,
      location,
      note
    });
    const url = buildWhatsAppUrl(message, WHATSAPP_NUMBER);
    window.open(url, "_blank");
    clear();
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink">Your cart</h1>
      {items.length === 0 ? (
        <p className="mt-6 text-sm text-ink/70">Your cart is empty.</p>
      ) : (
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={`${item.id}-${item.size ?? ""}-${item.color ?? ""}`} className="flex gap-4 rounded-2xl border border-ink/10 bg-white p-4">
                <div className="relative h-28 w-24 overflow-hidden rounded-xl bg-sand">
                  <Image src={item.image} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-ink">{item.name}</h3>
                  <p className="text-xs text-ink/60">{item.size ? `Size: ${item.size}` : ""}</p>
                  <div className="mt-3 flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) => updateQuantity(item.id, Number(event.target.value), item.size, item.color)}
                      className="h-9 w-20 rounded-xl border border-ink/15 px-3 text-sm"
                    />
                    <Button variant="ghost" size="sm" onClick={() => removeItem(item.id, item.size, item.color)}>
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="text-sm font-semibold text-ink">{formatNaira(item.price * item.quantity)}</div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
            <h2 className="text-lg font-semibold text-ink">Order summary</h2>
            <p className="mt-2 text-sm text-ink/70">Total: {formatNaira(total)}</p>
            <div className="mt-6 space-y-3">
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Full name"
                className="h-10 w-full rounded-xl border border-ink/15 px-4 text-sm"
              />
              <input
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                placeholder="Phone number"
                className="h-10 w-full rounded-xl border border-ink/15 px-4 text-sm"
              />
              <input
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="Delivery location"
                className="h-10 w-full rounded-xl border border-ink/15 px-4 text-sm"
              />
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Optional note"
                className="min-h-[80px] w-full rounded-xl border border-ink/15 px-4 py-2 text-sm"
              />
            </div>
            <Button className="mt-6 w-full" onClick={checkout}>
              Checkout on WhatsApp
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
