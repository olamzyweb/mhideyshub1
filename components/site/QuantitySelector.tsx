"use client";

import { Button } from "@/components/ui/button";

export default function QuantitySelector({ value, onChange }: { value: number; onChange: (value: number) => void }) {
  return (
    <div className="flex items-center gap-3">
      <Button type="button" size="sm" variant="outline" onClick={() => onChange(Math.max(1, value - 1))}>
        -
      </Button>
      <span className="min-w-[28px] text-center text-sm font-semibold">{value}</span>
      <Button type="button" size="sm" variant="outline" onClick={() => onChange(value + 1)}>
        +
      </Button>
    </div>
  );
}
