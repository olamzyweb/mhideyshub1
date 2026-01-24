import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "Everything arrived looking even better than the photos. Super affordable too!",
    name: "Chidinma"
  },
  {
    quote: "Quick delivery and great WhatsApp support. Love the pieces!",
    name: "Tobi"
  },
  {
    quote: "The thrifted jeans are premium. I keep coming back for more.",
    name: "Kemi"
  }
];

export default function Testimonials() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-2xl font-semibold text-ink">Testimonials</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => (
            <Card key={item.name} className="border-ink/10">
              <CardContent className="pt-6 text-sm text-ink/70">
                <p className="text-base text-ink">“{item.quote}”</p>
                <p className="mt-4 font-semibold">— {item.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
