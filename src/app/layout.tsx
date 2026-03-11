import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/shared/Header";
import Footer from "@/components/shared/Footer";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["600"],
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
      <body suppressHydrationWarning className={`${plusJakartaSans.variable} ${cormorantGaramond.variable} font-sans antialiased text-text-primary-dark bg-background-dark`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
