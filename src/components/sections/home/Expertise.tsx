"use client";

import { useRef } from "react";
import Image from "next/image";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { createServicesTimeline } from "@/animations/timelines";
import RevealLines from "@/components/ui/RevealLines";
import { Arrow } from "@/components/ui/MagneticButton";

// Every pillar is illustrated with a render of an actual GDPL project.
const PILLARS = [
  {
    title: "100% Transparency",
    desc: "Complete documentation and legal clarity at every step of your investment journey.",
    image: "/regal_empirus/renders/grand-entrance.jpg",
    alt: "Twin Regal Empirus towers framing the sculpted entrance court at dusk",
  },
  {
    title: "Strategic Locations",
    desc: "Properties in the high-growth corridors of Mohali, positioned for long-term appreciation.",
    image: "/regal_empirus/renders/night-elevation.jpg",
    alt: "Regal Empirus towers lit up at night beside the Sector 91 arterial road",
  },
  {
    title: "360° Market Coverage",
    desc: "Build, manage, consult and educate — we cover every facet of real estate.",
    image: "/regal_heights/renders/aerial-front.jpg",
    alt: "Aerial view of the three Regal Heights towers surrounded by landscaped greens",
  },
  {
    title: "Premium Construction",
    desc: "World-class materials and finishes that define luxury at every touchpoint.",
    image: "/regal_heights/renders/corner-tower.jpg",
    alt: "Corner elevation of a Regal Heights tower with wrap-around balconies",
  },
];

export default function Expertise() {
  const root = useRef<HTMLElement>(null);
  useSectionTimeline(root, createServicesTimeline);

  return (
    <section ref={root} id="expertise" className="tone-light relative bg-linen text-ink py-28 md:py-40">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10 mb-16 md:mb-24">
          <div className="lg:col-span-2 flex lg:flex-col gap-6 justify-between lg:justify-start">
            <span data-index className="font-display text-[clamp(3.5rem,6vw,6.5rem)] leading-none tracking-[-0.05em] text-accent">
              02
            </span>
            <span data-index className="eyebrow text-muted lg:mt-6 self-end lg:self-start">The GDPL Difference</span>
          </div>
          <div className="lg:col-span-6">
            <RevealLines className="display-lg" lines={["Expertise that", "protects your", <em key="i" className="italic text-accent">investment.</em>]} />
          </div>
          <div className="lg:col-span-4 flex items-end">
            <p data-fade className="body-lg text-muted max-w-[38ch]">
              Four commitments shape every GDPL address — from the first document you sign to the day you receive your keys.
            </p>
          </div>
        </div>

        <div data-cards className="flex flex-col lg:flex-row gap-3 lg:h-[72vh] lg:min-h-[560px]">
          {PILLARS.map((p, i) => (
            <article
              key={p.title}
              data-card
              data-cursor="hover"
              className="group relative overflow-hidden bg-ink-2 text-bone aspect-[4/5] sm:aspect-[16/11] lg:aspect-auto lg:flex-1 lg:hover:flex-[1.55] transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            >
              <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
                <Image src={p.image} alt={p.alt} fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/35 to-ink/20 transition-opacity duration-700 group-hover:opacity-80" />
              <div className="absolute inset-0 bg-ink/25 transition-opacity duration-700 group-hover:opacity-0" />

              <div className="relative h-full flex flex-col justify-between p-6 md:p-8">
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-bone/85">0{i + 1}</span>
                  <span className="h-px w-10 bg-bone/30 transition-all duration-700 group-hover:w-16 group-hover:bg-accent-soft" />
                </div>

                <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-2">
                  <h3 className="font-display text-[clamp(1.75rem,2.3vw,2.5rem)] leading-[1.05] tracking-[-0.02em] max-w-[12ch]">{p.title}</h3>
                  <div className="grid lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="overflow-hidden">
                      <p className="pt-4 text-bone/85 leading-relaxed max-w-[34ch] lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-700 delay-100">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                  <span className="mt-6 inline-flex text-bone/90 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 group-hover:text-accent-soft">
                    <Arrow />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
