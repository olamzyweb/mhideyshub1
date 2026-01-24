import { prisma } from "@/lib/prisma";
import ProductTable from "@/components/admin/ProductTable";

export default async function AdminProductsPage() {
  const products = await prisma.product.findMany({
    include: { images: true, category: true },
    orderBy: { createdAt: "desc" }
  });

  return <ProductTable products={products} />;
}
