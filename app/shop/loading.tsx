import ProductSkeleton from "@/components/site/ProductSkeleton";

export default function LoadingShop() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
