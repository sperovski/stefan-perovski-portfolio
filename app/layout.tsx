import type { Metadata } from "next";
import { Hanken_Grotesk, Young_Serif } from "next/font/google";
import "./globals.css";

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-young-serif",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});

export const metadata: Metadata = {
  title: "Stefan Perovski",
  description:
    "Software engineering student at FINKI in Skopje, building apps for students, cafés and clinics.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${youngSerif.variable} ${hanken.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
