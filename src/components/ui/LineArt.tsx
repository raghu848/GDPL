"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Art = "tower" | "balcony" | "house";

const ART: Record<Art, { viewBox: string; paths: string[] }> = {
  // Tower facade with vertical fins, roof cap and rooftop details.
  tower: {
    viewBox: "0 0 200 365",
    paths: [
      "M38 80 V40 H152 V80",
      "M36 40 H154 M36 44 H154",
      "M44 36 L50 26 H58 M52 30 L58 22 L62 30",
      "M38 80 H152 V340 H38 Z",
      "M42 84 H148 V336 H42 Z",
      "M42 84 V336 M56 84 V336 M72 84 V336 M88 84 V336 M103 84 V336 M118 84 V336 M133 84 V336 M148 84 V336",
      "M46 84 V336 M60 84 V336 M76 84 V336 M92 84 V336 M107 84 V336 M122 84 V336 M137 84 V336",
      "M0 342 H200",
    ],
  },
  // Balcony bench / railing with planter pots.
  balcony: {
    viewBox: "0 0 166 300",
    paths: [
      "M12 60 L24 56 L28 76 L16 80 Z M14 82 L26 78 L30 98 L18 102 Z M16 104 L28 100 L32 118 L20 122 Z",
      "M28 56 L28 112 L128 112 L134 130 V250 H20 L18 140 L24 130",
      "M24 130 H128 L134 140 M20 250 L18 276 H160 V250",
      "M34 126 V114 Q34 108 40 108 H48 Q54 108 54 114 V126",
      "M60 126 V114 Q60 108 66 108 H74 Q80 108 80 114 V126",
      "M86 126 V114 Q86 108 92 108 H100 Q106 108 106 114 V126",
      "M112 126 V114 Q112 108 118 108 H126 Q132 108 132 114 V126",
      "M22 146 H156 V272 H22 Z",
    ],
  },
  // Gabled house: roofline, chimney, door, windows.
  house: {
    viewBox: "0 0 240 220",
    paths: [
      "M20 110 L120 30 L220 110",
      "M30 110 L120 38 L210 110",
      "M170 62 V36 H188 V76",
      "M36 110 V200 H204 V110",
      "M0 202 H240",
      "M100 200 V140 Q100 128 112 128 H128 Q140 128 140 140 V200",
      "M120 128 V200",
      "M54 134 H88 V168 H54 Z M71 134 V168 M54 151 H88",
      "M152 134 H186 V168 H152 Z M169 134 V168 M152 151 H186",
      "M104 96 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0",
    ],
  },
};

/**
 * Faint real-estate line illustration for section backgrounds. Purely
 * decorative: pointer-transparent, drawn once on scroll, static under
 * reduced motion. Position it with `className` inside a `relative` section.
 */
export default function LineArt({
  art,
  className = "",
  opacity = 0.08,
}: {
  art: Art;
  className?: string;
  opacity?: number;
}) {
  const svg = useRef<SVGSVGElement>(null);
  const { viewBox, paths } = ART[art];

  useEffect(() => {
    const el = svg.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const lines = Array.from(el.querySelectorAll<SVGPathElement>("path"));
      lines.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });
      gsap.to(lines, {
        strokeDashoffset: 0,
        duration: 3.2,
        ease: "power2.inOut",
        stagger: 0.18,
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
      });
      gsap.to(el, { y: -10, duration: 12, ease: "sine.inOut", yoyo: true, repeat: -1 });
    });
    return () => mm.revert();
  }, []);

  return (
    <svg
      ref={svg}
      aria-hidden
      viewBox={viewBox}
      className={`pointer-events-none absolute text-[#7A5F3E] ${className}`}
      style={{ opacity }}
      fill="none"
      stroke="currentColor"
      strokeWidth={1}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths.map((d, i) => (
        <path key={i} d={d} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
}
