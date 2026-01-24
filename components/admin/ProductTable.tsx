"use client";

import Link from "next/link";
import { toast } from "sonner";
import type { ProductItem } from "@/lib/types";

export default function ProductTable({ products }: { products: ProductItem[] }) {
  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Failed to delete");
      return;
    }
    toast.message("Product deleted");
    window.location.reload();
  };

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-ink">Products</h2>
        <Link href="/admin/products/new" className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white">
          Add product
        </Link>
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-xs uppercase text-ink/50">
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Category</th>
              <th className="py-2">Price</th>
              <th className="py-2">Status</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t border-ink/10">
                <td className="py-3 font-semibold text-ink">{product.name}</td>
                <td className="py-3">{product.category.name}</td>
                <td className="py-3">?{product.price.toLocaleString("en-NG")}</td>
                <td className="py-3">{product.inStock ? "In stock" : "Out of stock"}</td>
                <td className="py-3">
                  <div className="flex gap-2">
                    <Link href={`/admin/products/${product.id}/edit`} className="text-xs font-semibold text-ink">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(product.id)} className="text-xs font-semibold text-rose-500">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
