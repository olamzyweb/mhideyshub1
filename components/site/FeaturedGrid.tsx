import type { ProductItem } from "@/lib/types";
import ProductCard from "@/components/site/ProductCard";

export default function FeaturedGrid({ products }: { products: ProductItem[] }) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-ink">Featured picks</h2>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
