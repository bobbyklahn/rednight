import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/Cart/CartProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Red Night | Premium Ready-to-Drink Cocktails | Shiraz Gin & Dark Soda",
  description: "Discover Red Night - the perfect blend of Shiraz Gin and Dark Soda. Premium ready-to-drink cocktails for every occasion. Shop 4-packs and slabs with Australia-wide shipping.",
  keywords: ["premix drinks", "ready-to-drink cocktails", "shiraz gin", "premium rtd", "australian premix", "gin cocktail cans", "red night", "craft cocktails"],
  openGraph: {
    title: "Red Night | Premium Ready-to-Drink Cocktails",
    description: "The perfect blend of Shiraz Gin and Dark Soda. Premium ready-to-drink cocktails for every occasion.",
    url: "https://rednight.com.au",
    siteName: "Red Night",
    images: [
      {
        url: "/images/hero/hero-1.jpg",
        width: 1200,
        height: 630,
        alt: "Red Night Premium Cocktails",
      },
    ],
    locale: "en_AU",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
