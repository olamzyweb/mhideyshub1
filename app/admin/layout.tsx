import Link from "next/link";
import { Gem } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-sand">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-ink/50">Admin</p>
            <h1 className="font-display flex items-center gap-2 text-2xl font-semibold text-ink">
              <Gem size={18} />
              MHIDEY&apos;S HUB
            </h1>
          </div>
          <div className="flex gap-3 text-sm font-semibold">
            <Link href="/admin" className="hover:text-slate-700">Dashboard</Link>
            <Link href="/admin/products" className="hover:text-slate-700">Products</Link>
            <Link href="/admin/categories" className="hover:text-slate-700">Categories</Link>
            <Link href="/shop" className="hover:text-slate-700">View site</Link>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
