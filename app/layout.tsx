import type { Metadata } from "next";
import { Bricolage_Grotesque, Epilogue } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const epilogue = Epilogue({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "E-Solution — Agence Marketing Immobilier au Maroc",
  description:
    "E-Solution accompagne promoteurs, agences et investisseurs immobiliers au Maroc. Campagnes Meta, visuels, sites web. Des acheteurs, pas juste des vues.",
  keywords:
    "agence marketing immobilier Maroc, leads immobilier, publicité Meta immobilier, branding immobilier Tanger",
  openGraph: {
    title: "E-Solution — Marketing Immobilier · Maroc",
    description:
      "Campagnes Meta, visuels et sites web conçus pour vendre votre projet immobilier au Maroc.",
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
    <html lang="fr" className={`${bricolage.variable} ${epilogue.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
