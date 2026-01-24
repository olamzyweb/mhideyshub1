"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import QuantitySelector from "@/components/site/QuantitySelector";
import { useCart } from "@/components/cart/CartProvider";
import { buildWhatsAppMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { SIZE_OPTIONS, WHATSAPP_NUMBER } from "@/lib/constants";
import type { ProductItem } from "@/lib/types";

export default function ProductActions({ product }: { product: ProductItem }) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");

  const handleAdd = () => {
    addItem({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0]?.url || "https://placehold.co/600x800",
      quantity,
      size: size || undefined,
      color: color || undefined
    });
  };

  const handleWhatsApp = () => {
    const message = buildWhatsAppMessage({
      items: [
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image: product.images[0]?.url || "https://placehold.co/600x800",
          quantity,
          size: size || undefined,
          color: color || undefined
        }
      ],
      name: "",
      phone: "",
      location: "",
      note: ""
    });
    const url = buildWhatsAppUrl(message, WHATSAPP_NUMBER);
    window.open(url, "_blank");
  };

  return (
    <div className="mt-8 space-y-6">
      <div>
        <p className="text-sm font-semibold text-ink">Size (optional)</p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SIZE_OPTIONS.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => setSize(option)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold ${
                size === option ? "border-ink bg-ink text-white" : "border-ink/20 bg-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-ink">Color (optional)</p>
        <input
          value={color}
          onChange={(event) => setColor(event.target.value)}
          placeholder="e.g. Rose gold"
          className="mt-3 h-10 w-full rounded-xl border border-ink/15 px-4 text-sm"
        />
      </div>
      <div>
        <p className="text-sm font-semibold text-ink">Quantity</p>
        <div className="mt-3">
          <QuantitySelector value={quantity} onChange={setQuantity} />
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        <Button onClick={handleAdd}>Add to cart</Button>
        <Button variant="outline" onClick={handleWhatsApp}>Checkout via WhatsApp</Button>
      </div>
    </div>
  );
}
