import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Carattere, Playfair_Display, Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";
import LuxuryBackground from "@/components/ui/LuxuryBackground";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const carattere = Carattere({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GDPL Mohali - Luxury Real Estate",
  description: "Region's Top Gated Township with the #1 Commitment! Luxury Apartments in Mohali Sector 91.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${plusJakartaSans.variable} ${carattere.variable} ${playfair.variable} ${openSans.variable} font-sans antialiased text-text-primary-dark overflow-x-hidden`}>
        <LuxuryBackground />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
