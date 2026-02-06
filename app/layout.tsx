import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";
import Providers from "@/app/providers";
import Script from "next/script";

const display = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"]
});

const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "MHIDEY'S HUB | Affordable wears you'll love",
  description: "Affordable thrifted and new fashion for women and men in Nigeria.",
  openGraph: {
    title: "MHIDEY'S HUB",
    description: "Affordable wears you’ll love.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1160117710255795"
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
      <Script
        src="https://pl28661471.effectivegatecpm.com/1b/7c/73/1b7c73ff6b866dd02eb481d83f6800ab.js"
        strategy="afterInteractive"
      />
      <body className={`${display.variable} ${body.variable} font-body`}>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
