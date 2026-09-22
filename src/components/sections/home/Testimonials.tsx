"use client";

import { useRef, useState } from "react";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { createTestimonialTimeline } from "@/animations/timelines";
import { Arrow } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const TESTIMONIALS = [
  {
    name: "Raghav & Simran Kapoor",
    role: "Homeowners, Regal Heights",
    text: "Choosing GDPL was our best decision. The transparency throughout the buying process, the quality of construction, and the attention to detail is unmatched. Our apartment at Regal Heights feels like a five-star resort every single day.",
  },
  {
    name: "Dr. Manpreet Singh",
    role: "NRI Homeowner",
    text: "As an NRI, I needed a developer I could trust completely. GDPL delivered beyond expectations — timely possession, honest dealing, and a home that exceeded every promise. Highly recommended for anyone looking in Mohali.",
  },
  {
    name: "Anjali Mehta",
    role: "Homeowner, Regal Residencia",
    text: "From the first site visit to final possession, the experience was seamless. The amenities at Regal Residencia are outstanding and the team truly cares about their customers. GDPL stands for trust.",
  },
];

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  useSectionTimeline(root, createTestimonialTimeline, [active]);

  const t = TESTIMONIALS[active];
  const go = (dir: number) => setActive((a) => (a + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section ref={root} className="tone-light relative bg-sand text-ink py-16 md:py-24 overflow-hidden">
      <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12">
        <div className="lg:col-span-3 flex lg:flex-col justify-between gap-6">
          <span data-index className="eyebrow text-muted lg:pt-4">
            Voices of Trust
          </span>

          <div className="flex items-center gap-6 self-end lg:self-start">
            <span className="eyebrow text-muted tabular-nums">
              0{active + 1} <span className="text-ink/25">/ 0{TESTIMONIALS.length}</span>
            </span>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="h-12 w-12 rounded-full border border-ink/20 flex items-center justify-center transition-colors duration-500 hover:bg-ink hover:text-bone">
                <Arrow className="w-4 rotate-180" />
              </button>
              <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="h-12 w-12 rounded-full border border-ink/20 flex items-center justify-center transition-colors duration-500 hover:bg-ink hover:text-bone">
                <Arrow className="w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-9">
          <span aria-hidden className="block font-display text-[4.5rem] md:text-[5.5rem] leading-[0.5] text-accent/35 mb-2">&ldquo;</span>
          <blockquote>
            <p key={active} data-quote className="font-display text-[clamp(1.4rem,2.3vw,2.5rem)] leading-[1.25] tracking-[-0.02em] text-ink/90">
              {t.text}
            </p>
            <footer data-fade className="mt-8 md:mt-10 flex flex-wrap items-center gap-x-6 gap-y-2">
              <span className="h-px w-12 bg-accent/60" />
              <cite className="not-italic text-lg">{t.name}</cite>
              <span className="eyebrow text-[0.65rem] text-muted">{t.role}</span>
            </footer>
          </blockquote>

          <div className="mt-8 md:mt-10 flex gap-8">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setActive(i)}
                className={cn("link-underline eyebrow text-[0.62rem] py-3 -my-3 transition-colors duration-500", i === active ? "text-ink" : "text-ink/50 hover:text-ink/80")}
                data-active={i === active}
              >
                {item.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
