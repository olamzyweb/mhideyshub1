import type { CartItem } from "@/lib/cart";

export function formatNaira(value: number) {
  return `₦${value.toLocaleString("en-NG")}`;
}

export function buildWhatsAppMessage(params: {
  items: CartItem[];
  name: string;
  phone: string;
  location: string;
  note?: string;
}) {
  const lines: string[] = [];
  lines.push("Hello MHIDEY'S HUB💎💕! I want to order:");

  params.items.forEach((item, index) => {
    const size = item.size ? ` - Size: ${item.size}` : "";
    const color = item.color ? ` - Color: ${item.color}` : "";
    lines.push(
      `${index + 1}) ${item.name} - Qty: ${item.quantity}${size}${color} - Price: ${formatNaira(item.price)}`
    );
  });

  const total = params.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  lines.push(`Total: ${formatNaira(total)}`);
  lines.push(`Customer name: ${params.name}`);
  lines.push(`Phone: ${params.phone}`);
  lines.push(`Delivery location: ${params.location}`);
  if (params.note) {
    lines.push(`Note: ${params.note}`);
  }

  return lines.join("\n");
}

export function buildWhatsAppUrl(message: string, number: string) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}
