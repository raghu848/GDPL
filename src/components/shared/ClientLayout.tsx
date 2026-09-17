"use client";

import { usePathname } from "next/navigation";
import { SiteProvider } from "./SiteContext";
import SmoothScroll from "./SmoothScroll";
import Preloader from "./Preloader";
import Navbar from "./Navbar";
import Footer from "./Footer";
import CustomCursor from "./CustomCursor";
import PageTransition from "./PageTransition";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bare = pathname === "/vex";

  return (
    <SiteProvider>
      <SmoothScroll>
        <Preloader />
        <PageTransition />
        <CustomCursor />
        {!bare && <Navbar />}
        {children}
        {!bare && <Footer />}
      </SmoothScroll>
    </SiteProvider>
  );
}
