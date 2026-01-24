import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="font-display text-3xl font-semibold text-ink">About MHIDEY&apos;S HUB💎💕</h1>
      <p className="mt-4 text-sm text-ink/70">
        We curate affordable thrifted and new pieces so you can look stunning without breaking the bank. From
        baggy jeans to elegant skirts and male wears, MHIDEY&apos;S HUB is your plug for everyday fashion finds.
      </p>
      <p className="mt-4 text-sm text-ink/70">
        Our mission is to make fashion accessible, fun, and simple. Chat with us on WhatsApp for styling tips
        and availability.
      </p>
      <Link href="/shop" className="mt-6 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white">
        Shop now
      </Link>
    </div>
  );
}
