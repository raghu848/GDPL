"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { fadeUp, revealLines, sectionTimeline } from "@/animations/primitives";
import RevealLines from "./RevealLines";

const images = [
  { src: "/regal_empirus/pictures/1_Five_Star_Club_House.jpg.jpeg", alt: "Five Star Club House", label: "Signature Club" },
  { src: "/regal_empirus/pictures/2_Swimming_Pool_with_Kids_Splash_Pool.jpg.jpeg", alt: "Swimming Pool", label: "Infinity Pool" },
  { src: "/regal_empirus/pictures/3_Cafeteria.jpg.jpeg", alt: "Cafeteria", label: "Gourmet Café" },
  { src: "/regal_empirus/pictures/4_Fully_Equipped_Gym.jpg.jpeg", alt: "Fully Equipped Gym", label: "Fitness Center" },
  { src: "/regal_empirus/pictures/5_Banquet_Hall.jpg.jpeg", alt: "Banquet Hall", label: "Grand Ballroom" },
  { src: "/regal_empirus/pictures/6_Kids_Play_Area.jpg.jpeg", alt: "Kids Play Area", label: "Kids Zone" },
  { src: "/regal_empirus/pictures/7_Library.jpg.jpeg", alt: "Library", label: "Quiet Library" },
  { src: "/regal_empirus/pictures/8_Basement_Parking.jpg.jpeg", alt: "Basement Parking", label: "Secure Parking" },
  { src: "/regal_empirus/pictures/9_Stilt_Parking.jpg.jpeg", alt: "Stilt Parking", label: "Stilt Access" },
  { src: "/regal_empirus/pictures/10_Surface_Parking.jpg.jpeg", alt: "Surface Parking", label: "Surface Parking" },
];

/** Signature features grid — pinned on desktop while the tiles open and drift. */
export default function EmpirusGallery() {
  const root = useRef<HTMLElement>(null);

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
          { y: (i) => (i < 5 ? 70 : 130), clipPath: "inset(14% 0% 14% 0%)" },
          { y: (i) => (i < 5 ? -30 : 0), clipPath: "inset(0% 0% 0% 0%)", ease: "none", stagger: { amount: 0.3, grid: [2, 5], from: "start" } }
        );
    } else {
      const grid = el.querySelector("[data-grid]");
      if (grid) fadeUp(sectionTimeline(grid, "top 85%"), tiles, env, { y: 40, stagger: 0.06 });
    }
  });

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

          <div data-grid className="mx-auto grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-3 lg:max-w-[min(100%,calc((100svh-17rem)*2.5))]">
            {images.map((img, i) => (
              <figure key={img.src} data-tile data-cursor="hover" className="group relative aspect-square overflow-hidden bg-sand text-bone">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, 50vw"
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
