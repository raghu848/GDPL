"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "./SmoothScroll";
import { useSite } from "./SiteContext";

/**
 * Intercepts internal link clicks site-wide:
 * page fades up → dark overlay rises → route changes → overlay retracts → new page reveals.
 * Same-page hash links scroll smoothly instead.
 */
export default function PageTransition() {
  const router = useRouter();
  const pathname = usePathname();
  const lenis = useLenis();
  const { setReady } = useSite();
  const overlay = useRef<HTMLDivElement>(null);
  const busy = useRef(false);
  const pendingHash = useRef<string | null>(null);
  const failsafe = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scrollToHash = (hash: string, immediate = false) => {
    const el = document.getElementById(hash.replace("#", ""));
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: -40, immediate, duration: 1.6 });
    else el.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  };

  const reveal = () => {
    if (failsafe.current) clearTimeout(failsafe.current);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo(0, 0);
    lenis?.scrollTo(0, { immediate: true, force: true });
    ScrollTrigger.refresh();
    setReady(true);

    const tl = gsap.timeline({
      onComplete: () => {
        busy.current = false;
        if (pendingHash.current) {
          scrollToHash(pendingHash.current);
          pendingHash.current = null;
        }
      },
    });
    tl.set("footer", { clearProps: "opacity,transform" })
      .to(overlay.current, {
        scaleY: 0,
        transformOrigin: "top center",
        duration: reduce ? 0.2 : 0.6,
        ease: "power4.inOut",
        delay: 0.05,
      })
      .fromTo("main", { opacity: 0, y: reduce ? 0 : 30 }, { opacity: 1, y: 0, duration: 0.8, ease: "expo.out", clearProps: "transform,opacity" }, "-=0.35");
  };

  useEffect(() => {
    if (busy.current) reveal();
    // Pinned sections change page height — recalculate every trigger once the route has mounted.
    const id = requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest("a");
      if (!a || !a.href || a.hasAttribute("download") || (a.target && a.target !== "_self")) return;

      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;

      if (url.pathname === location.pathname) {
        if (url.search !== location.search) return;
        e.preventDefault();
        if (url.hash) scrollToHash(url.hash);
        else if (lenis) lenis.scrollTo(0, { duration: 1.6 });
        else window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      e.preventDefault();
      if (busy.current) return;
      busy.current = true;
      pendingHash.current = url.hash || null;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      lenis?.stop();
      let navigated = false;
      const go = () => {
        if (navigated) return;
        navigated = true;
        setReady(false);
        lenis?.start();
        router.push(url.pathname + url.search, { scroll: false });
        failsafe.current = setTimeout(reveal, 4000);
      };
      // Navigation must never depend on animation frames (throttled/background tabs).
      setTimeout(go, reduce ? 450 : 900);
      gsap
        .timeline({ onComplete: go })
        .to(["main", "footer"], { opacity: 0, y: reduce ? 0 : -40, duration: 0.45, ease: "power2.in" })
        .fromTo(
          overlay.current,
          { scaleY: 0, transformOrigin: "bottom center" },
          { scaleY: 1, duration: reduce ? 0.2 : 0.55, ease: "power4.inOut" },
          0.05
        );
    };

    // Capture phase: runs before next/link's handler, which skips navigation once defaultPrevented is set.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis, router]);

  return (
    <div
      ref={overlay}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[110] bg-bone"
      style={{ transform: "scaleY(0)" }}
    />
  );
}
