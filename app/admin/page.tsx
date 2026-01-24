import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [totalProducts, featuredProducts, outOfStock] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { featured: true } }),
    prisma.product.count({ where: { inStock: false } })
  ]);

  const stats = [
    { label: "Total products", value: totalProducts },
    { label: "Featured products", value: featuredProducts },
    { label: "Out of stock", value: outOfStock }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {stats.map((stat) => (
        <div key={stat.label} className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
          <p className="text-xs uppercase tracking-widest text-ink/50">{stat.label}</p>
          <p className="mt-4 text-3xl font-semibold text-ink">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
