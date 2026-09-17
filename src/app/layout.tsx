import type { Metadata } from "next";
import { Jost } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "@/components/shared/ClientLayout";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

// Boska (Indian Type Foundry, Fontshare free font licence) — the title face across the site.
const boska = localFont({
  variable: "--font-boska",
  display: "swap",
  src: [
    { path: "./fonts/Boska-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Boska-MediumItalic.woff2", weight: "500", style: "italic" },
  ],
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
    <html lang="en" suppressHydrationWarning className={`${jost.variable} ${boska.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased text-text-primary-dark overflow-x-hidden">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
