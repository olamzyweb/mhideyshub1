import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({
      where: { id: params.id },
      include: { images: true, category: true }
    }),
    prisma.category.findMany({ orderBy: { name: "asc" } })
  ]);

  if (!product) notFound();

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
      <h2 className="text-lg font-semibold text-ink">Edit product</h2>
      <div className="mt-6">
        <ProductForm categories={categories} product={product} />
      </div>
    </div>
  );
}
