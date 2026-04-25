import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "E-Solution Realty — Agence Immobilière Premium à Tanger",
  description:
    "E-Solution Realty est l'agence immobilière de référence à Tanger. Expertise en marketing digital, génération de leads et vente de biens haut de gamme au Maroc.",
  keywords:
    "agence immobilière Tanger, immobilier luxe Maroc, marketing immobilier Tanger, E-Solution Realty",
  openGraph: {
    title: "E-Solution Realty — Agence Immobilière Premium à Tanger",
    description:
      "Expertise immobilière haut de gamme à Tanger, Maroc. Résultats mesurables, approche exclusive.",
    type: "website",
    locale: "fr_MA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${cormorant.variable} ${inter.variable}`}>
      <body className="bg-[#0a0a0a] text-white antialiased">{children}</body>
    </html>
  );
}
