import Link from "next/link";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/site/ProductCard";
import { CATEGORY_LIST } from "@/lib/constants";
import slugify from "slugify";
import Script from "next/script";

const PAGE_SIZE = 12;

export const dynamic = "force-dynamic";

export default async function ShopPage({
  searchParams
}: {
  searchParams: { category?: string; q?: string; sort?: string; page?: string };
}) {
  const page = Number(searchParams.page ?? "1");
  const categorySlug = searchParams.category;
  const query = searchParams.q;
  const sort = searchParams.sort ?? "newest";

  const where = {
    ...(categorySlug ? { category: { slug: categorySlug } } : {}),
    ...(query ? { name: { contains: query, mode: "insensitive" as const } } : {})
  };

  const orderBy =
    sort === "price"
      ? { price: "asc" as const }
      : { createdAt: "desc" as const };

  const [products, count] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { images: true, category: true },
      take: PAGE_SIZE,
      skip: (page - 1) * PAGE_SIZE,
      orderBy
    }),
    prisma.product.count({ where })
  ]);

  const totalPages = Math.ceil(count / PAGE_SIZE);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink">Shop</h1>
          <p className="text-sm text-ink/70">Browse the latest affordable drops.</p>
        </div>
        <form className="flex flex-wrap gap-3">
          <input
            name="q"
            placeholder="Search"
            defaultValue={query}
            className="h-10 rounded-xl border border-ink/15 bg-white px-4 text-sm"
          />
          <select name="category" defaultValue={categorySlug ?? ""} className="h-10 rounded-xl border border-ink/15 bg-white px-3 text-sm">
            <option value="">All categories</option>
            {CATEGORY_LIST.map((name) => (
              <option key={name} value={slugify(name, { lower: true })}>
                {name}
              </option>
            ))}
          </select>
          <select name="sort" defaultValue={sort} className="h-10 rounded-xl border border-ink/15 bg-white px-3 text-sm">
            <option value="newest">Newest</option>
            <option value="price">Price: Low to High</option>
          </select>
          <button className="h-10 rounded-full bg-ink px-5 text-sm font-semibold text-white">Filter</button>
        </form>
      </div>

      <div className="mt-8 flex justify-center">
        <Script
          async
          src="https://pl28661475.effectivegatecpm.com/1e63cf5451ded5f9ffa8b6759219da06/invoke.js"
          strategy="afterInteractive"
        />
        <div id="container-1e63cf5451ded5f9ffa8b6759219da06"></div>
      </div>

      <div className="mt-10 grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-10 flex items-center justify-center gap-3">
          {Array.from({ length: totalPages }).map((_, index) => {
            const pageNumber = index + 1;
            const params = new URLSearchParams({
              ...(categorySlug ? { category: categorySlug } : {}),
              ...(query ? { q: query } : {}),
              ...(sort ? { sort } : {})
            });
            params.set("page", pageNumber.toString());
            return (
              <Link
                key={pageNumber}
                href={`/shop?${params.toString()}`}
                className={`flex h-9 w-9 items-center justify-center rounded-full border ${pageNumber === page ? "border-ink bg-ink text-white" : "border-ink/15"
                  }`}
              >
                {pageNumber}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
