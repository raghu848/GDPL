"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const GOLD_SOFT = "rgba(184,154,106,0.2)";
const GOLD_ARC = "rgba(184,154,106,0.5)";

const RINGS = [
  { size: 94, rx: 72, ry: 0, dur: 70, dir: 1 },
  { size: 122, rx: 66, ry: 14, dur: 95, dir: -1 },
  { size: 70, rx: 76, ry: -10, dur: 55, dir: 1 },
];

/**
 * Soft champagne orbital rings around the About building (CSS 3D). The rings
 * idle-turn on their own and the pinned timeline in AboutScenes spins them
 * further on scroll via the data-orbit-* hooks. One arc of each ring is a
 * touch brighter so the turning reads. The building stays a flat image.
 */
export default function AboutOrbit() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const q = (s: string) => Array.from(el.querySelectorAll<HTMLElement>(s));

    // Static poses (also the final look under reduced motion).
    q("[data-orbit-ring]").forEach((r, i) => gsap.set(r, { rotationX: RINGS[i].rx, rotationY: RINGS[i].ry }));

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      q("[data-orbit-spin]").forEach((s, i) =>
        gsap.to(s, { rotation: RINGS[i].dir * 360, duration: RINGS[i].dur, ease: "none", repeat: -1 })
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} aria-hidden className="pointer-events-none absolute inset-0 z-10 [perspective:1100px]">
      {RINGS.map((r, i) => (
        <div
          key={i}
          data-orbit-ring
          className="absolute left-1/2 top-[48%] [transform-style:preserve-3d]"
          style={{ width: `${r.size}%`, aspectRatio: "1", marginLeft: `${-r.size / 2}%`, marginTop: `${-r.size / 2}%` }}
        >
          <div data-orbit-scroll className="h-full w-full">
          <div data-orbit-spin className="relative h-full w-full rounded-full" style={{ border: `1px solid ${GOLD_SOFT}`, borderTopColor: GOLD_ARC }}>
          </div>
          </div>
        </div>
      ))}

    </div>
  );
}
