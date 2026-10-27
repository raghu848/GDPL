"use client";

import { usePathname } from "next/navigation";
import { SiteProvider } from "./SiteContext";
import SmoothScroll from "./SmoothScroll";
import Preloader from "./Preloader";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PageTransition from "./PageTransition";
import LiveSections from "./LiveSections";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname === "/vex";

  return (
    <SiteProvider>
      <SmoothScroll>
        <Preloader />
        <PageTransition />
        <LiveSections />
        {!bare && <Navbar />}
        {children}
        {!bare && <Footer />}
      </SmoothScroll>
    </SiteProvider>
  );
}
