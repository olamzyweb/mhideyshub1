import slugify from "slugify";
import CategoryCard from "@/components/site/CategoryCard";
import { CATEGORY_LIST } from "@/lib/constants";

export default function CategoryGrid() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-2xl font-semibold text-ink">Categories</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORY_LIST.map((name) => (
            <CategoryCard key={name} name={name} slug={slugify(name, { lower: true })} />
          ))}
        </div>
      </div>
    </section>
  );
}
