import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-hero-gradient py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-ink/60">MHIDEY&apos;S HUB💎💕</p>
          <h1 className="mt-4 font-display text-4xl font-semibold text-ink md:text-5xl">
            Affordable wears you’ll love.
          </h1>
          <p className="mt-4 text-base text-ink/70">
            Shop curated thrifted and new styles for women and men. Fresh drops, cozy fits, and standout
            pieces at prices that make sense.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button asChild>
              <Link href="/shop">Shop now</Link>
            </Button>
            <Button asChild variant="outline">
              <a href="https://chat.whatsapp.com/LZk3ZAIos259NRUc2OG7fx?mode=ems_copy_c" target="_blank" rel="noreferrer">
                Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -left-10 top-10 h-24 w-24 rounded-full bg-blush opacity-70" />
          <div className="absolute -right-6 bottom-8 h-28 w-28 rounded-full bg-mint opacity-70" />
          <div className="relative rounded-[32px] border border-white/60 bg-white/70 p-6 shadow-soft">
            <div className="grid gap-4">
              <div className="rounded-2xl border border-ink/10 bg-white p-4">
                <p className="text-xs uppercase tracking-widest text-ink/50">Fresh drop</p>
                <p className="mt-2 text-lg font-semibold text-ink">Nova tops + baggy denim</p>
                <p className="mt-1 text-sm text-ink/60">Limited pieces this week.</p>
              </div>
              <div className="rounded-2xl border border-ink/10 bg-white p-4">
                <p className="text-xs uppercase tracking-widest text-ink/50">Top pick</p>
                <p className="mt-2 text-lg font-semibold text-ink">Thrifted jeans</p>
                <p className="mt-1 text-sm text-ink/60">Comfort fit. Premium feel.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
