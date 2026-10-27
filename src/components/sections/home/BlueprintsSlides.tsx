"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { blueprints } from "@/lib/blueprintsData";
import { cn } from "@/lib/utils";

/**
 * Pinned plan viewer: scrolling steps through the plans and each one crossfades in.
 * Plain optimised images (next/image serves WebP/AVIF at the right size), so there is no
 * video to download, decode or seek — only the current plan and its neighbours are mounted.
 */
export default function BlueprintsSlides({
  onActive,
  sectionRef,
}: {
  onActive: (index: number) => void;
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const bar = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let last = 0;
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${blueprints.length * 70}%`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          const idx = Math.min(blueprints.length - 1, Math.floor(self.progress * blueprints.length));
          if (idx !== last) {
            last = idx;
            setActive(idx);
            onActive(idx);
          }
        },
      });
      return () => st.kill();
    });
    return () => mm.revert();
  }, [sectionRef, onActive]);

  return (
    // multiply: the plans have a white page, which takes on the section's warm base instead of showing as a box.
    <div className="absolute inset-0 overflow-hidden mix-blend-multiply">
      {blueprints.map((plan, i) => {
        if (i !== 0 && Math.abs(i - active) > 1) return null;
        return (
          <div
            key={plan.src}
            aria-hidden={i !== active}
            className={cn(
              "absolute inset-0 p-[3%] transition-[opacity,transform] duration-700 ease-out",
              i === active ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
            )}
          >
            <div className="relative h-full w-full">
              <Image
                src={plan.src}
                alt={plan.alt}
                fill
                priority={i === 0}
                sizes="(max-width: 1024px) 92vw, 56vw"
                className="object-contain"
              />
            </div>
          </div>
        );
      })}

      <span className="pointer-events-none absolute inset-x-0 bottom-0 block h-px bg-ink/10">
        <span ref={bar} className="block h-px origin-left scale-x-0 bg-accent" />
      </span>
    </div>
  );
}
