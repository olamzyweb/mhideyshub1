import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatNaira } from "@/lib/whatsapp";
import ProductActions from "@/components/site/ProductActions";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { images: true, category: true }
  });

  if (!product) return { title: "Product not found" };

  return {
    title: `${product.name} | MHIDEY'S HUB`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description
    }
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { images: true, category: true }
  });

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-ink/10 bg-sand">
            <Image src={product.images[0]?.url || "https://placehold.co/600x800"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {product.images.map((image) => (
              <div key={image.id} className="relative aspect-square overflow-hidden rounded-xl border border-ink/10 bg-sand">
                <Image src={image.url} alt={product.name} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm uppercase tracking-widest text-ink/50">{product.category.name}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-ink">{product.name}</h1>
          <p className="mt-4 text-lg font-semibold text-ink">{formatNaira(product.price)}</p>
          <p className="mt-3 text-sm text-ink/70">{product.description}</p>
          <p className={`mt-4 text-sm font-semibold ${product.inStock ? "text-emerald-600" : "text-rose-500"}`}>
            {product.inStock ? "In stock" : "Out of stock"}
          </p>
          <ProductActions product={product} />
        </div>
      </div>
    </div>
  );
}
