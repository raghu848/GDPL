"use client";

import { useRef } from "react";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { createStatsTimeline } from "@/animations/timelines";

const STATS = [
  { value: 4, suffix: "", label: "Signature Projects", desc: "Across prime sectors of Mohali" },
  { value: 300, suffix: "+", label: "Happy Homes", desc: "Delivered with consistency and care" },
  { value: 11, suffix: "+", label: "Years of Trust", desc: "Of transparent, on-time delivery" },
  { value: 25, suffix: "+", label: "Acres", desc: "Spanning signature developments" },
];

export default function Stats() {
  const root = useRef<HTMLElement>(null);
  useSectionTimeline(root, createStatsTimeline);

  return (
    <section ref={root} className="bg-bone text-ink pb-28 md:pb-40">
      <div className="shell grid grid-cols-2 lg:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-14">
        {STATS.map((s) => (
          <div key={s.label} className="flex flex-col">
            <div className="hairline mb-8 md:mb-10" data-rule />
            <div className="font-display text-[clamp(3rem,6.2vw,6.5rem)] leading-none tracking-[-0.05em] tabular-nums">
              <span data-count={s.value}>{s.value}</span>
              <span className="text-accent">{s.suffix}</span>
            </div>
            <p data-fade className="eyebrow mt-5 text-ink/90">{s.label}</p>
            <p data-fade className="mt-2 text-sm text-muted leading-relaxed max-w-[24ch]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
