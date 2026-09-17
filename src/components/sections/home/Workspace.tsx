"use client";

import { useRef } from "react";
import Image from "next/image";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { createImageRevealTimeline } from "@/animations/timelines";
import RevealLines from "@/components/ui/RevealLines";
import { cn } from "@/lib/utils";

type Shot = { src: string; alt: string; caption: string; frame: string; wrap: string; dir: string; speed: number };

const SHOTS: Shot[] = [
  {
    src: "/office_images/IMG_2362.jpg",
    alt: "Open-plan workspace with ergonomic chairs and white desks",
    caption: "The Studio",
    wrap: "lg:col-span-8",
    frame: "aspect-[16/10]",
    dir: "center",
    speed: 7,
  },
  {
    src: "/office_images/IMG_2365.jpg",
    alt: "Office corridor with glass partitions and linear lighting",
    caption: "Glass Corridor",
    wrap: "lg:col-span-4 lg:mt-48",
    frame: "aspect-[3/4]",
    dir: "up",
    speed: 12,
  },
  {
    src: "/office_images/IMG_2364.jpg",
    alt: "Minimalist reception with fluted wood wall accents",
    caption: "Reception",
    wrap: "lg:col-span-4 lg:-mt-24",
    frame: "aspect-[4/5]",
    dir: "up",
    speed: 10,
  },
  {
    src: "/office_images/IMG_2378.jpg",
    alt: "Executive cabin workstation with concrete-finish wall",
    caption: "Executive Cabin",
    wrap: "lg:col-span-5 lg:mt-28",
    frame: "aspect-[4/3]",
    dir: "left",
    speed: 6,
  },
  {
    src: "/office_images/IMG_2372.jpg",
    alt: "Director's office with bull sculpture and landscape artwork",
    caption: "Director's Office",
    wrap: "lg:col-span-3 lg:mt-64",
    frame: "aspect-[3/4]",
    dir: "up",
    speed: 14,
  },
];

export default function Workspace() {
  const root = useRef<HTMLElement>(null);
  useSectionTimeline(root, createImageRevealTimeline);

  return (
    <section ref={root} className="relative bg-paper text-ink pb-28 md:pb-44">
      <div className="shell">
        <div className="hairline mb-24 md:mb-36" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8 mb-20 md:mb-28">
          <div className="lg:col-span-2 lg:pt-4">
            <span data-index className="eyebrow text-muted">Our Workspace</span>
          </div>
          <div className="lg:col-span-6">
            <RevealLines className="display-lg" lines={["A bespoke", <em key="e" className="italic text-accent">environment.</em>]} />
          </div>
          <div className="lg:col-span-4 flex items-end">
            <p data-fade className="body-lg text-muted max-w-[36ch]">
              Where every GDPL address begins — a considered space for planning, design and the conversations that follow.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-x-6 md:gap-x-8 gap-y-14 md:gap-y-16">
          {SHOTS.map((s, i) => (
            <figure key={s.src} className={cn(s.wrap, i === 0 && "sm:col-span-2")}>
              <div data-frame data-dir={s.dir} data-cursor="hover" className={cn("media-frame w-full", s.frame)}>
                <div data-parallax={s.speed} className="media-inner">
                  <div data-media className="absolute inset-0">
                    <Image src={s.src} alt={s.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" />
                  </div>
                </div>
              </div>
              <figcaption data-caption className="mt-4 flex items-center justify-between eyebrow text-[0.65rem] text-muted">
                <span>{s.caption}</span>
                <span>0{i + 1}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
