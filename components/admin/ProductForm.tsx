"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import type { CategoryItem, ProductItem } from "@/lib/types";

const schema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2),
  description: z.string().min(10),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  featured: z.boolean().optional(),
  inStock: z.boolean().optional()
});

type FormValues = z.infer<typeof schema>;

export default function ProductForm({
  categories,
  product
}: {
  categories: CategoryItem[];
  product?: ProductItem;
}) {
  const router = useRouter();
  const [imageUrls, setImageUrls] = useState<string[]>(product?.images.map((image) => image.url) ?? []);
  const [files, setFiles] = useState<FileList | null>(null);

  const defaultValues = useMemo(
    () => ({
      name: product?.name ?? "",
      slug: product?.slug ?? "",
      description: product?.description ?? "",
      price: product?.price ?? 0,
      categoryId: product?.category.id ?? "",
      featured: product?.featured ?? false,
      inStock: product?.inStock ?? true
    }),
    [product]
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues
  });

  const nameValue = watch("name");

  const onSubmit = async (values: FormValues) => {
    try {
      let uploadedUrls: string[] = [];
      if (files && files.length > 0) {
        const formData = new FormData();
        Array.from(files).forEach((file) => formData.append("files", file));
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        uploadedUrls = data.urls ?? [];
      }

      const payload = {
        ...values,
        images: [...imageUrls, ...uploadedUrls]
      };

      const res = await fetch(product ? `/api/admin/products/${product.id}` : "/api/admin/products", {
        method: product ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error("Failed to save product");

      toast.success(product ? "Product updated" : "Product created");
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm font-semibold text-ink">Product name</label>
          <Input
            {...register("name")}
            onBlur={() => setValue("slug", slugify(nameValue || "", { lower: true, strict: true }))}
          />
          {errors.name && <p className="text-xs text-rose-500">{errors.name.message}</p>}
        </div>
        <div>
          <label className="text-sm font-semibold text-ink">Slug</label>
          <Input {...register("slug")} />
          {errors.slug && <p className="text-xs text-rose-500">{errors.slug.message}</p>}
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-ink">Description</label>
        <Textarea {...register("description")} />
        {errors.description && <p className="text-xs text-rose-500">{errors.description.message}</p>}
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label className="text-sm font-semibold text-ink">Price (?)</label>
          <Input type="number" {...register("price")} />
          {errors.price && <p className="text-xs text-rose-500">{errors.price.message}</p>}
        </div>
        <div>
          <label className="text-sm font-semibold text-ink">Category</label>
          <select
            {...register("categoryId")}
            className="h-11 w-full rounded-xl border border-ink/15 bg-white px-3 text-sm"
          >
            <option value="">Select category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <p className="text-xs text-rose-500">{errors.categoryId.message}</p>}
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("featured")} /> Featured
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("inStock")} /> In stock
          </label>
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-ink">Images</label>
        <div className="mt-3 flex flex-wrap gap-3">
          {imageUrls.map((url) => (
            <div key={url} className="flex items-center gap-2 rounded-xl border border-ink/10 bg-white px-3 py-2 text-xs">
              <span className="max-w-[200px] truncate">{url}</span>
              <button
                type="button"
                onClick={() => setImageUrls((prev) => prev.filter((item) => item !== url))}
                className="text-rose-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <input
          type="file"
          multiple
          onChange={(event) => setFiles(event.target.files)}
          className="mt-3 block text-sm"
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {product ? "Update product" : "Create product"}
      </Button>
    </form>
  );
}
