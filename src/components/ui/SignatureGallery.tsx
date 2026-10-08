"use client";

import { useRef, type CSSProperties } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { fadeUp, revealLines, sectionTimeline } from "@/animations/primitives";
import type { SignatureImage } from "@/lib/projectsData";
import RevealLines from "./RevealLines";

const ROWS = 2;

/** Signature features grid — pinned on desktop while the tiles open and drift. */
export default function SignatureGallery({ images }: { images: SignatureImage[] }) {
  const root = useRef<HTMLElement>(null);
  const cols = Math.ceil(images.length / ROWS);

  useSectionTimeline(root, (el, env) => {
    const head = sectionTimeline(el, "top 70%");
    fadeUp(head, el.querySelectorAll("[data-index]"), env, { y: 20 });
    revealLines(head, el.querySelectorAll("[data-line]"), env, { position: 0.1 });

    const tiles = el.querySelectorAll("[data-tile]");
    if (env.desktop && !env.reduce) {
      gsap
        .timeline({
          scrollTrigger: { trigger: el.querySelector("[data-pin]"), start: "top top", end: "+=110%", pin: true, scrub: 0.8, anticipatePin: 1 },
        })
        .fromTo(
          tiles,
          { y: (i) => (i < cols ? 70 : 130), clipPath: "inset(14% 0% 14% 0%)" },
          { y: (i) => (i < cols ? -30 : 0), clipPath: "inset(0% 0% 0% 0%)", ease: "none", stagger: { amount: 0.3, grid: [ROWS, cols], from: "start" } }
        );
    } else {
      const grid = el.querySelector("[data-grid]");
      if (grid) fadeUp(sectionTimeline(grid, "top 85%"), tiles, env, { y: 40, stagger: 0.06 });
    }
  });

  // The grid is sized so both rows fit the pinned viewport: its width is capped
  // at (viewport height − chrome) × (cols / rows), keeping every tile square.
  const gridVars = { "--cols": cols, "--ratio": cols / ROWS } as CSSProperties;

  return (
    <section ref={root} className="tone-light relative bg-linen text-ink overflow-hidden">
      <div data-pin className="lg:h-screen flex flex-col justify-center py-28 lg:py-16">
        <div className="shell">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 lg:mb-10">
            <div className="flex items-end gap-6 md:gap-10">
              <RevealLines className="display-md" lines={["Unmatched", <em key="e" className="accent-text">excellence.</em>]} />
            </div>
            <span data-index className="eyebrow text-muted">
              Signature Features
            </span>
          </div>

          <div
            data-grid
            style={gridVars}
            className="mx-auto grid grid-cols-2 lg:grid-cols-[repeat(var(--cols),minmax(0,1fr))] gap-2 md:gap-3 lg:max-w-[min(100%,calc((100svh-17rem)*var(--ratio)))]"
          >
            {images.map((img, i) => (
              <figure key={img.src} data-tile data-cursor="hover" className="group relative aspect-square overflow-hidden bg-sand text-bone">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes={`(min-width: 1024px) ${Math.round(100 / cols)}vw, 50vw`}
                  className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
                <figcaption className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2">
                  <span className="font-display text-[clamp(0.95rem,1.15vw,1.2rem)] leading-tight transition-transform duration-700 group-hover:-translate-y-1">
                    {img.label}
                  </span>
                  <span className="eyebrow text-[0.55rem] text-bone/75">{String(i + 1).padStart(2, "0")}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
