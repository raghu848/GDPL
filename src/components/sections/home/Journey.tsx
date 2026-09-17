"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { createJourneyTimeline } from "@/animations/timelines";
import RevealLines from "@/components/ui/RevealLines";
import { cn } from "@/lib/utils";

const MILESTONES = [
  {
    name: "Cooperative Housing Society",
    launch: "2016",
    possession: "2020",
    status: "Delivered",
    type: "Cooperative Society",
    desc: "GDPL's inaugural landmark project — a cooperative housing community setting the foundation of trust.",
    image: "/images/timeline_box1.png",
  },
  {
    name: "Foothills Cooperative Society",
    launch: "2020",
    possession: "2025",
    status: "Delivered",
    type: "Cooperative Society",
    desc: "Nestled at the foothills, this project expanded GDPL's footprint with a thriving community.",
    image: "/images/timeline_box2.png",
  },
  {
    name: "Regal Heights",
    launch: "2022",
    possession: "2026",
    status: "In Possession",
    type: "Residential High-Rise",
    desc: "A landmark of vertical living — Regal Heights raises the bar with premium residences.",
    image: "/regal_heights/Regal_Heights_.jpg.jpeg",
  },
  {
    name: "Regal Residencia & Regal Luxuria",
    launch: "2024",
    possession: "Coming Soon",
    status: "Coming Soon",
    type: "Dual Project",
    desc: "Two iconic addresses offering luxurious living with world-class amenities.",
    image: "/regal_rersidencia/Regal_Residencia_.jpg.jpeg",
  },
  {
    name: "Regal Empirus",
    launch: "2025",
    possession: "Coming Soon",
    status: "Coming Soon",
    type: "Premium High-Rise",
    desc: "GDPL's most ambitious project — a testament to architectural grandeur and modern living.",
    image: "/regal_empirus/Regal_Empirus_.jpg.jpeg",
  },
];

export default function Journey() {
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  useSectionTimeline(root, createJourneyTimeline);

  return (
    <section ref={root} className="tone-light relative bg-linen text-ink py-28 md:py-40">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8 mb-16 md:mb-24">
          <div className="lg:col-span-2 lg:pt-4">
            <span data-index className="eyebrow text-muted">Our Journey</span>
          </div>
          <div className="lg:col-span-6">
            <RevealLines className="display-lg" lines={["Growth, trust", <em key="l" className="italic text-accent">& landmarks.</em>]} />
          </div>
          <div className="lg:col-span-4 flex items-end">
            <p data-fade className="body-lg text-muted max-w-[36ch]">
              A decade of addresses — each one raising the standard for the next.
            </p>
          </div>
        </div>

        <ul data-rows>
          {MILESTONES.map((m, i) => {
            const isOpen = open === i;
            return (
              <li key={m.name} className="relative">
                <div data-row-rule className="hairline" />
                <div data-row>
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group w-full text-left grid grid-cols-12 items-center gap-x-6 py-7 md:py-9"
                  >
                    <span className="col-span-3 md:col-span-2 font-display text-[clamp(1.6rem,2.6vw,2.75rem)] tracking-[-0.03em] text-ink/55 transition-colors duration-500 group-hover:text-accent">
                      {m.launch}
                    </span>
                    <span className="col-span-9 md:col-span-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                      <span className="block font-display text-[clamp(1.35rem,2.2vw,2.25rem)] leading-tight tracking-[-0.02em]">{m.name}</span>
                      <span className="block mt-2 eyebrow text-[0.65rem] text-muted">{m.type}</span>
                    </span>
                    <span className="hidden md:block md:col-span-2 eyebrow text-[0.68rem] text-ink/75">{m.status}</span>
                    <span className="hidden md:flex md:col-span-2 justify-end items-center gap-6">
                      <span className="relative block h-16 w-24 overflow-hidden bg-sand">
                        <Image
                          src={m.image}
                          alt=""
                          fill
                          sizes="96px"
                          className="object-cover grayscale opacity-70 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
                        />
                      </span>
                      <span className={cn("relative h-4 w-4 shrink-0 transition-transform duration-500", isOpen && "rotate-45")}>
                        <span className="absolute left-0 top-1/2 h-px w-4 bg-ink/60" />
                        <span className="absolute top-0 left-1/2 h-4 w-px bg-ink/60" />
                      </span>
                    </span>
                  </button>

                  <div className={cn("grid transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                    <div className="overflow-hidden">
                      <div className="grid grid-cols-12 gap-x-6 gap-y-6 pb-10">
                        <p className="col-span-12 md:col-start-3 md:col-span-6 text-ink/80 leading-relaxed">{m.desc}</p>
                        <dl className="col-span-12 md:col-span-4 grid grid-cols-3 gap-4">
                          {[
                            ["Launch", m.launch],
                            ["Possession", m.possession],
                            ["Status", m.status],
                          ].map(([k, v]) => (
                            <div key={k}>
                              <dt className="eyebrow text-[0.6rem] text-muted">{k}</dt>
                              <dd className="mt-2 text-ink">{v}</dd>
                            </div>
                          ))}
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
          <li><div data-row-rule className="hairline" /></li>
        </ul>
      </div>
    </section>
  );
}
