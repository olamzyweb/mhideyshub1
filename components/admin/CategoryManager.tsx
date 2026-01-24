"use client";

import { useState } from "react";
import { toast } from "sonner";
import slugify from "slugify";
import { Button } from "@/components/ui/button";
import type { CategoryItem } from "@/lib/types";

export default function CategoryManager({ categories }: { categories: CategoryItem[] }) {
  const [name, setName] = useState("");

  const createCategory = async () => {
    if (!name) return;
    const res = await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, slug: slugify(name, { lower: true }) })
    });
    if (!res.ok) {
      toast.error("Failed to add category");
      return;
    }
    toast.success("Category added");
    window.location.reload();
  };

  const deleteCategory = async (id: string) => {
    const res = await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Failed to delete category");
      return;
    }
    toast.message("Category deleted");
    window.location.reload();
  };

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-soft">
      <h2 className="text-lg font-semibold text-ink">Categories</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {categories.map((category) => (
          <div key={category.id} className="flex items-center gap-2 rounded-full border border-ink/15 px-4 py-2 text-xs">
            {category.name}
            <button onClick={() => deleteCategory(category.id)} className="text-rose-500">x</button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-3">
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="New category"
          className="h-10 flex-1 rounded-xl border border-ink/15 px-4 text-sm"
        />
        <Button type="button" onClick={createCategory} size="sm">
          Add
        </Button>
      </div>
    </div>
  );
}
