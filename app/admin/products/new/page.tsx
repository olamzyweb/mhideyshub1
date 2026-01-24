import { prisma } from "@/lib/prisma";
import ProductForm from "@/components/admin/ProductForm";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
      <h2 className="text-lg font-semibold text-ink">Add product</h2>
      <div className="mt-6">
        <ProductForm categories={categories} />
      </div>
    </div>
  );
}
