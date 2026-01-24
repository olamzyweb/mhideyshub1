import { prisma } from "@/lib/prisma";
import Hero from "@/components/site/Hero";
import CategoryGrid from "@/components/site/CategoryGrid";
import FeaturedGrid from "@/components/site/FeaturedGrid";
import WhyShop from "@/components/site/WhyShop";
import Testimonials from "@/components/site/Testimonials";

export default async function HomePage() {
  const products = await prisma.product.findMany({
    where: { featured: true },
    include: { images: true, category: true },
    take: 4,
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <Hero />
      <CategoryGrid />
      <FeaturedGrid products={products} />
      <WhyShop />
      <Testimonials />
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="rounded-2xl border border-ink/10 bg-white p-10 text-center shadow-soft">
            <h2 className="font-display text-2xl font-semibold text-ink">Join our WhatsApp group</h2>
            <p className="mt-3 text-sm text-ink/70">
              Get first access to new drops, flash sales, and styling tips.
            </p>
            <a
              href="https://chat.whatsapp.com/LZk3ZAIos259NRUc2OG7fx?mode=ems_copy_c"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white"
            >
              Join WhatsApp Group
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
