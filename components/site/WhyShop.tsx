import { Sparkles, Truck, BadgeCheck } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const items = [
  {
    title: "Affordable & stylish",
    description: "Curated thrifted and new pieces without the premium price tag.",
    icon: Sparkles
  },
  {
    title: "Fast WhatsApp support",
    description: "Chat instantly with the team for sizes, colors, and availability.",
    icon: BadgeCheck
  },
  {
    title: "Easy delivery",
    description: "Smooth delivery coordination across cities in Nigeria.",
    icon: Truck
  }
];

export default function WhyShop() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="font-display text-2xl font-semibold text-ink">Why shop with us</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {items.map((item) => (
            <Card key={item.title} className="border-ink/10">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sand">
                  <item.icon size={20} />
                </div>
                <CardTitle className="mt-4 text-lg">{item.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-ink/70">{item.description}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
