import Link from "next/link";

export default function CategoryCard({ name, slug }: { name: string; slug: string }) {
  return (
    <Link
      href={`/shop?category=${slug}`}
      className="group rounded-2xl border border-ink/10 bg-white p-5 shadow-soft transition hover:-translate-y-1"
    >
      <h3 className="text-sm font-semibold text-ink group-hover:text-slate-700">{name}</h3>
      <p className="mt-2 text-xs text-ink/60">Explore {name.toLowerCase()} picks</p>
    </Link>
  );
}
