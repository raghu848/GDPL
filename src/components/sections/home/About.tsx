"use client";

import { useRef } from "react";
import Image from "next/image";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { createAboutTimeline } from "@/animations/timelines";
import RevealLines from "@/components/ui/RevealLines";
import MagneticButton from "@/components/ui/MagneticButton";

export default function About() {
  const root = useRef<HTMLElement>(null);
  useSectionTimeline(root, createAboutTimeline);

  return (
    <section ref={root} id="about" className="relative bg-bone text-ink pt-28 md:pt-40 pb-20 md:pb-28">
      <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14">
        <div className="lg:col-span-2 lg:pt-4">
          <span data-index className="eyebrow text-muted">About GDPL</span>
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <RevealLines
            className="display-lg"
            lines={["A legacy of trust,", "a standard of", <em key="e" className="italic text-accent">royal living.</em>]}
          />

          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8 max-w-2xl">
            <p data-fade className="text-lg leading-relaxed text-ink/95">
              At GDPL, every development is a bespoke creation — meticulously designed to reflect prestige, comfort, and
              timeless elegance.
            </p>
            <p data-fade className="leading-[1.8] text-muted">
              From panoramic surroundings to thoughtfully curated spaces, we create sanctuaries that embody modern living.
              With an unwavering commitment to quality and trust, we deliver not just homes, but investments for a secure and
              elevated future.
            </p>
          </div>

          <div data-cta className="mt-12 [--btn-fill:#0e100e] [--btn-fill-text:#f4f1eb]">
            <MagneticButton href="/about">Our Story</MagneticButton>
          </div>
        </div>

        <div className="lg:col-span-5 lg:pl-8 lg:pt-28">
          <div data-frame data-dir="up" className="media-frame aspect-[4/5] w-full">
            <div data-parallax="6" className="media-inner">
              <div data-media className="absolute inset-0">
                <Image
                  src="/office_images/IMG_2361 (1).jpg"
                  alt="GDPL head office reception with brass logo on marble wall"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
          <p data-fade className="mt-5 eyebrow text-[0.65rem] text-muted flex justify-between">
            <span>GDPL Head Office</span>
            <span>Mohali, Punjab</span>
          </p>
        </div>
      </div>
    </section>
  );
}
