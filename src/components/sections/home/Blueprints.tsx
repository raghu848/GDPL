"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { createBlueprintsTimeline } from "@/animations/timelines";
import RevealLines from "@/components/ui/RevealLines";
import FloatingBackdrop from "@/components/ui/FloatingBackdrop";
import PlanLightbox from "@/components/ui/PlanLightbox";
import BlueprintsVideo from "./BlueprintsVideo";
import { blueprints, blueprintCategories } from "@/lib/blueprintsData";
import { cn } from "@/lib/utils";

export default function Blueprints() {
  const root = useRef<HTMLElement>(null);
  const info = useRef<HTMLDivElement>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [active, setActive] = useState(0);

  useSectionTimeline(root, createBlueprintsTimeline);

  // Content on the left swaps with a soft rise whenever the video moves to another plan.
  useEffect(() => {
    const el = info.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const tween = gsap.fromTo(el.querySelectorAll("[data-swap]"), { y: 18, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.7, stagger: 0.07, ease: "power3.out", clearProps: "transform",
    });
    return () => { tween.kill(); };
  }, [active]);

  const plan = blueprints[active];

  return (
    <section ref={root} className="tone-light sec-flow sec-flow--warm relative flex h-[100svh] min-h-[560px] flex-col overflow-hidden bg-[#F6EDDF] pt-20 text-ink md:pt-24">
      <FloatingBackdrop strength={0.9} />
      <div className="shell flex min-h-0 w-full flex-1 flex-col">
        <div className="hairline mb-4 md:mb-5" />

        <div className="grid min-h-0 flex-1 grid-cols-1 grid-rows-[auto_minmax(0,1fr)_auto] gap-x-10 gap-y-3 lg:grid-cols-12 lg:grid-rows-[auto_minmax(0,1fr)]">
          {/* Heading */}
          <div className="lg:col-span-5">
            <span data-index className="eyebrow mb-3 block text-muted">Master Planning</span>
            <RevealLines
              className="display-lg"
              lines={["Engineered in", <em key="e" className="italic text-accent">every detail.</em>]}
            />
          </div>

          {/* Video (right on desktop) */}
          <div className="relative min-h-0 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1">
            <BlueprintsVideo onActive={setActive} sectionRef={root} />
          </div>

          {/* Content that follows the plan on screen */}
          <div ref={info} className="flex flex-col justify-end pb-3 lg:col-span-5 lg:justify-between lg:pb-6">
            <ul className="hidden flex-wrap gap-x-6 gap-y-2 lg:flex" aria-label="Plan categories">
              {blueprintCategories.map((c) => (
                <li
                  key={c}
                  className={cn(
                    "eyebrow text-[0.62rem] tracking-[0.15em] transition-colors duration-500",
                    c === plan.category ? "text-accent" : "text-muted/60"
                  )}
                >
                  {c}
                </li>
              ))}
            </ul>

            <div>
              <p data-swap className="eyebrow text-[0.7rem] tracking-[0.15em] text-accent">
                {String(active + 1).padStart(2, "0")} / {String(blueprints.length).padStart(2, "0")} — {plan.category.toUpperCase()}
              </p>
              <h3 data-swap className="mt-2 font-display text-3xl leading-tight md:mt-3 md:text-5xl">
                {plan.label}
              </h3>
              <p data-swap className="eyebrow mt-2 text-[0.65rem] tracking-[0.15em] text-muted">{plan.meta.toUpperCase()}</p>
              <p data-swap className="mt-4 hidden max-w-[44ch] leading-[1.8] text-muted md:block">{plan.alt}.</p>
              <button
                data-swap
                type="button"
                onClick={() => setLightboxIndex(active)}
                className="eyebrow mt-4 border-b border-ink/40 pb-0.5 text-[0.65rem] tracking-[0.15em] transition-colors hover:border-accent hover:text-accent md:mt-6"
              >
                View plan
              </button>
            </div>
          </div>
        </div>
      </div>

      <PlanLightbox items={blueprints} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />
    </section>
  );
}
