import type { Metadata } from "next";
import { Space_Grotesk, Inter, Fraunces } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const fraunces = Fraunces({
  variable: "--font-editorial",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "E-Solution — Agence Marketing Immobilier au Maroc",
  description:
    "E-Solution accompagne promoteurs, agences et investisseurs immobiliers au Maroc. Branding, Meta Ads, leads, shooting, sites web. Résultats mesurables.",
  keywords:
    "agence marketing immobilier Maroc, leads immobilier, publicité Meta immobilier, branding immobilier Tanger",
  openGraph: {
    title: "E-Solution — Marketing Immobilier · Maroc",
    description:
      "Branding, contenu, publicité digitale et sites web pour l'immobilier au Maroc.",
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
    <html lang="fr" className={`${spaceGrotesk.variable} ${inter.variable} ${fraunces.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
