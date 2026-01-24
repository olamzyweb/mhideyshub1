export default function ProductSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-ink/10 bg-white p-4">
      <div className="aspect-[3/4] rounded-xl bg-sand" />
      <div className="mt-4 h-4 w-3/4 rounded bg-ink/10" />
      <div className="mt-2 h-3 w-1/2 rounded bg-ink/10" />
      <div className="mt-4 h-4 w-1/3 rounded bg-ink/10" />
    </div>
  );
}
