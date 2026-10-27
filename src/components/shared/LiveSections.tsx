"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Marks decorative sections that are on (or near) the screen with `data-live`, so their
 * ambient CSS animations (orbs, silk light, footer shimmer) only run while visible and
 * sit paused everywhere else. Cuts continuous paint/composite work on long pages.
 */
export default function LiveSections() {
  const pathname = usePathname();

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.setAttribute("data-live", "");
          else e.target.removeAttribute("data-live");
        }),
      { rootMargin: "120px 0px" }
    );
    const scan = () => document.querySelectorAll(".about-atmosphere, .sec-flow, footer").forEach((el) => io.observe(el));
    scan();
    const late = window.setTimeout(scan, 700); // sections that mount a beat after the route
    const onVisibility = () => document.documentElement.toggleAttribute("data-hidden", document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.clearTimeout(late);
      document.removeEventListener("visibilitychange", onVisibility);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
