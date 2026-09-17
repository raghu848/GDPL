"use client";

import { useRef } from "react";
import { LocationAdvantage } from "@/lib/projectsData";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { createEditorialTimeline } from "@/animations/timelines";
import RevealLines from "./RevealLines";

interface LocationSplitScrollProps {
  items: LocationAdvantage[];
}

export default function LocationSplitScroll({ items }: LocationSplitScrollProps) {
  const ref = useRef<HTMLElement>(null);
  useSectionTimeline(ref, (el, env) => {
    createEditorialTimeline(el, env);
  });

  // Group by category, longest names first (keeps the original ordering rule).
  const grouped = items.reduce<Record<string, LocationAdvantage[]>>((acc, item) => {
    (acc[item.category] ??= []).push(item);
    return acc;
  }, {});
  const categories = Object.keys(grouped);
  categories.forEach((c) => grouped[c].sort((a, b) => b.name.length - a.name.length));

  return (
    <section ref={ref} className="tone-light relative bg-sand text-ink">
      <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-x-8">
        <div className="lg:col-span-5 lg:sticky lg:top-0 lg:h-screen self-start flex flex-col justify-center pt-28 pb-16 lg:py-0">
          <div className="flex items-center gap-6 mb-10">
            <span data-index className="eyebrow text-muted">
              Location
            </span>
          </div>
          <RevealLines className="display-lg" lines={["Connected to", "everywhere you", <em key="b" className="accent-text">need to be.</em>]} />
          <p data-fade className="mt-10 body-lg text-muted max-w-[40ch]">
            Strategically located with seamless connectivity to highways, the airport, and city hubs — offering unmatched
            convenience every day.
          </p>
        </div>

        <div className="lg:col-span-6 lg:col-start-7 pb-28 lg:py-[28vh]">
          {categories.map((category, ci) => (
            <div key={category} className="mb-20 last:mb-0">
              <h3 data-fade className="eyebrow text-accent mb-6 flex items-center gap-4">
                <span>{String(ci + 1).padStart(2, "0")}</span>
                <span className="h-px w-8 bg-accent/40" />
                {category}
              </h3>
              <ul>
                {grouped[category].map((item) => (
                  <li
                    key={item.name}
                    data-fade
                    className="group flex items-baseline justify-between gap-6 border-t border-ink/10 py-5 last:border-b"
                  >
                    <span className="font-display text-[clamp(1.15rem,1.6vw,1.6rem)] leading-snug tracking-[-0.01em] text-ink/90 transition-[transform,color] duration-500 group-hover:translate-x-2 group-hover:text-ink">
                      {item.name}
                    </span>
                    <span className="eyebrow text-[0.65rem] text-muted whitespace-nowrap transition-colors duration-500 group-hover:text-accent">
                      {item.distance}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
