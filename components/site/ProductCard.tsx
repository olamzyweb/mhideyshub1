import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatNaira } from "@/lib/whatsapp";
import type { ProductItem } from "@/lib/types";

export default function ProductCard({ product }: { product: ProductItem }) {
  const image = product.images[0]?.url || "https://placehold.co/600x800";

  return (
    <Link href={`/product/${product.slug}`} className="group rounded-2xl border border-ink/10 bg-white p-4 shadow-soft">
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-sand">
        <Image src={image} alt={product.name} fill className="object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-ink">{product.name}</h3>
          <p className="text-xs text-ink/60">{product.category.name}</p>
        </div>
        {product.featured && <Badge>Featured</Badge>}
      </div>
      <p className="mt-3 text-base font-semibold text-ink">{formatNaira(product.price)}</p>
    </Link>
  );
}
