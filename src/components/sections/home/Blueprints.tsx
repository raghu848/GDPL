"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { createBlueprintsTimeline } from "@/animations/timelines";
import RevealLines from "@/components/ui/RevealLines";
import PlanLightbox from "@/components/ui/PlanLightbox";
import { blueprints } from "@/lib/blueprintsData";

// Small, fixed per-card tilt cycling through four angles — a "shuffled deck"
// read without any scroll-driven rotation math (matches the reference site).
const TILTS = [-3.2, 3, -2.8, 3.4];

export default function Blueprints() {
  const root = useRef<HTMLElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useSectionTimeline(root, createBlueprintsTimeline);

  return (
    <section ref={root} className="tone-light relative bg-white text-ink pb-24 md:pb-32">
      <div className="shell">
        <div className="hairline mb-12 md:mb-16" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-6 mb-14 md:mb-20">
          <div className="lg:col-span-2 lg:pt-4">
            <span data-index className="eyebrow text-muted">Master Planning</span>
          </div>
          <div className="lg:col-span-6">
            <RevealLines className="display-lg" lines={["Engineered in", <em key="e" className="italic text-accent">every detail.</em>]} />
          </div>
          <div className="lg:col-span-4 flex items-end">
            <p data-fade className="body-lg text-muted max-w-[36ch]">
              From the site layout to the last square foot of carpet area — every GDPL address begins as a precisely drawn plan.
            </p>
          </div>
        </div>
      </div>

      <div
        data-pin
        className="relative overflow-hidden h-screen min-h-[480px] md:min-h-[640px] flex items-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div data-track className="flex gap-8 px-[var(--gutter)] lg:px-[14vw] w-max will-change-transform">
          {blueprints.map((plan, i) => (
            <div
              key={plan.src}
              style={{ transform: `rotate(${TILTS[i % TILTS.length]}deg)` }}
              className="w-[22rem] sm:w-[25rem] shrink-0"
            >
              <button
                onClick={() => setLightboxIndex(i)}
                data-cursor="view"
                className="group flex w-full flex-col overflow-hidden rounded-[1.75rem] bg-white text-left shadow-[0_30px_70px_-40px_rgba(31,29,26,0.5)] transition-shadow duration-500 hover:shadow-[0_36px_80px_-32px_rgba(31,29,26,0.55)]"
              >
                <div data-frame data-dir="up" className="media-frame relative aspect-[4/5] w-full bg-white">
                  <div data-media className="absolute inset-0">
                    <Image
                      src={plan.src}
                      alt={plan.alt}
                      fill
                      sizes="(max-width: 640px) 82vw, 25rem"
                      className="object-contain transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1 p-6">
                  <p className="eyebrow text-[0.66rem] tracking-[0.15em]">
                    {String(i + 1).padStart(2, "0")} — {plan.label.toUpperCase()}
                  </p>
                  <p className="eyebrow text-[0.58rem] tracking-[0.15em] text-muted">{plan.meta.toUpperCase()}</p>
                </div>
              </button>
            </div>
          ))}
        </div>
      </div>

      <PlanLightbox items={blueprints} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />
    </section>
  );
}
