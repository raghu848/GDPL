"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const GREY = "#9A9890";
const BEIGE = "#B8A582";
const BROWN = "#7A5F3E";

const stroke = { fill: "none", strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const };

/**
 * Decorative architectural blueprint layer for the About section.
 * Transparent (the section keeps its own background), pointer-transparent,
 * and animated only via transform / opacity / stroke-dashoffset.
 * `buildingSelector` is the element nudged against the pointer.
 */
export default function AboutBackdrop({ buildingSelector }: { buildingSelector: string }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const section = el.parentElement as HTMLElement;
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    mm.add(
      {
        desktop: "(min-width: 1024px)",
        reduce: "(prefers-reduced-motion: reduce)",
        fine: "(hover: hover) and (pointer: fine)",
      },
      (ctx) => {
        const { desktop, reduce, fine } = ctx.conditions as Record<string, boolean>;
        const q = <T extends Element>(s: string) => Array.from(el.querySelectorAll<T>(s));

        // Tablet / mobile get a lighter set of drawings.
        q<SVGElement>("[data-desktop-only]").forEach((n) => (n.style.display = desktop ? "" : "none"));

        const paths = q<SVGGeometryElement>("[data-draw]").filter((p) => desktop || !p.closest("[data-desktop-only]"));
        paths.forEach((p) => {
          const len = p.getTotalLength();
          p.style.strokeDasharray = `${len}`;
          p.style.strokeDashoffset = reduce ? "0" : `${len}`;
        });
        if (reduce) return;

        const enter = { trigger: section, start: "top 70%", once: true };

        // Blueprint lines draw themselves.
        gsap.to(paths, { strokeDashoffset: 0, duration: 4.5, ease: "power2.inOut", stagger: 0.25, scrollTrigger: enter });

        // Measurement rails extend top → bottom.
        gsap.fromTo(q("[data-rail]"), { scaleY: 0 }, {
          scaleY: 1, transformOrigin: "50% 0%", duration: 5, ease: "power2.inOut", stagger: 0.4, scrollTrigger: enter,
        });
        gsap.fromTo(q("[data-mark]"), { opacity: 0 }, { opacity: 1, duration: 2, delay: 2.5, stagger: 0.3, scrollTrigger: enter });

        // Building: rises ~20px and settles from 1.02 → 1 (on a dedicated wrapper).
        const rise = section.querySelector("[data-about-enter]");
        if (rise) {
          gsap.fromTo(rise, { y: 20, scale: 1.02 }, {
            y: 0, scale: 1, duration: 1.8, ease: "power3.out", clearProps: "transform", scrollTrigger: { ...enter, start: "top 65%" },
          });
        }

        // Structural grid drifts 5–10px, very slowly.
        gsap.to("[data-grid]", { x: 8, y: 6, duration: 14, ease: "sine.inOut", yoyo: true, repeat: -1 });

        // Elevation arcs breathe in and out of their drawn state.
        gsap.to(q("[data-arc]"), { x: (i) => (i % 2 ? -10 : 10), duration: 16, ease: "sine.inOut", yoyo: true, repeat: -1, stagger: 2 });

        // Pointer parallax: desktop pointer devices only.
        if (!desktop || !fine) return;
        const layers = q<HTMLElement>("[data-depth]").map((n) => ({
          x: gsap.quickTo(n, "x", { duration: 1.6, ease: "power3.out" }),
          y: gsap.quickTo(n, "y", { duration: 1.6, ease: "power3.out" }),
          d: Number(n.dataset.depth),
        }));
        const building = section.querySelector<HTMLElement>(buildingSelector);
        const bx = building && gsap.quickTo(building, "x", { duration: 1.8, ease: "power3.out" });
        const by = building && gsap.quickTo(building, "y", { duration: 1.8, ease: "power3.out" });

        const onMove = (e: PointerEvent) => {
          const r = section.getBoundingClientRect();
          const nx = (e.clientX - r.left) / r.width - 0.5;
          const ny = (e.clientY - r.top) / r.height - 0.5;
          layers.forEach((l) => { l.x(nx * l.d * 2); l.y(ny * l.d * 2); });
          bx?.(-nx * 5);
          by?.(-ny * 5);
        };
        section.addEventListener("pointermove", onMove, { passive: true });
        return () => section.removeEventListener("pointermove", onMove);
      },
      el
    );
    return () => mm.revert();
  }, [buildingSelector]);

  return (
    <div ref={root} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Structural grid (oversized so its drift never exposes an edge) */}
      <div data-depth="3" className="absolute inset-0 will-change-transform">
        <svg data-grid className="absolute -inset-4 h-[calc(100%+2rem)] w-[calc(100%+2rem)]" style={{ opacity: 0.06 }}>
          <defs>
            <pattern id="about-grid" width="96" height="96" patternUnits="userSpaceOnUse">
              <path d="M96 0 H0 V96" fill="none" stroke={GREY} strokeWidth="1" />
              <path d="M48 0 V96 M0 48 H96" fill="none" stroke={GREY} strokeWidth="1" opacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>
      </div>

      {/* Drawings */}
      <div data-depth="5" className="absolute inset-0 will-change-transform">
        <svg className="h-full w-full" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          {/* Large elevation arcs behind the building */}
          <g data-arc {...stroke} stroke={BEIGE} style={{ opacity: 0.07 }}>
            <path data-draw d="M1440 40 A 460 460 0 0 0 980 500 A 460 460 0 0 0 1440 960" />
          </g>
          <g data-arc {...stroke} stroke={GREY} style={{ opacity: 0.06 }}>
            <path data-draw d="M1440 -80 A 620 620 0 0 0 820 540 A 620 620 0 0 0 1440 1160" />
          </g>
          <g data-arc data-desktop-only {...stroke} stroke={BROWN} style={{ opacity: 0.04 }}>
            <path data-draw d="M1440 150 A 330 330 0 0 0 1110 480 A 330 330 0 0 0 1440 810" />
          </g>

          {/* Outline of a second structure behind the building: stepped tower + floor lines */}
          <g {...stroke} stroke={BROWN} style={{ opacity: 0.05 }}>
            <path data-draw d="M770 880 V380 H830 V250 H900 V120 H980 V880" />
            <path data-draw data-desktop-only d="M770 520 H980 M770 660 H980 M830 400 H980 M900 270 H980" />
          </g>

          {/* Floor plan (after the supplied sketch): outer wall, core and stair notch */}
          <g {...stroke} stroke={BEIGE} style={{ opacity: 0.07 }}>
            <path data-draw d="M60 840 H340 V620 H60 Z" />
            <path data-draw d="M200 620 V680 M130 680 H270 V760 H130 Z" />
            <path data-draw data-desktop-only d="M60 760 H130 M270 760 H340" />
          </g>

          {/* Elevation of a low block + roofline */}
          <g data-desktop-only {...stroke} stroke={GREY} style={{ opacity: 0.06 }}>
            <path data-draw d="M420 880 V790 H560 V740 H700 V880" />
            <path data-draw d="M420 820 H700" />
          </g>

          {/* Dimension lines with end ticks */}
          <g {...stroke} stroke={BROWN} style={{ opacity: 0.06 }}>
            <path data-draw d="M830 56 H1380 M830 46 V66 M1380 46 V66" />
            <path data-draw data-desktop-only d="M60 580 H340 M60 570 V590 M340 570 V590" />
          </g>

          {/* Corner registration marks */}
          <g data-mark {...stroke} stroke={GREY} style={{ opacity: 0.07 }}>
            <path d="M1330 820 h20 M1340 810 v20" />
            <path d="M420 120 h20 M430 110 v20" />
          </g>
          <g data-mark data-desktop-only fill={BROWN} fontSize="10" letterSpacing="2" style={{ opacity: 0.07, fontFamily: "inherit" }}>
            <text x="1348" y="842">01</text>
            <text x="446" y="124">02</text>
            <text x="348" y="612">03</text>
          </g>
        </svg>
      </div>

      {/* Measurement rails near the edges */}
      {(["left-3 md:left-6", "right-3 md:right-6"] as const).map((pos) => (
        <svg key={pos} data-rail data-desktop-only className={`absolute inset-y-0 w-3 ${pos}`} style={{ opacity: 0.07 }}>
          <line x1="6" y1="0" x2="6" y2="100%" stroke={GREY} strokeWidth="1" />
          <line x1="6" y1="0" x2="6" y2="100%" stroke={GREY} strokeWidth="10" strokeDasharray="1 23" />
        </svg>
      ))}
    </div>
  );
}
