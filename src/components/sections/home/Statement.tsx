"use client";

import { useRef } from "react";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { createStatementTimeline } from "@/animations/timelines";

const LINES = [
  { head: "Vision", tail: "shapes skylines.", indent: "lg:ml-0" },
  { head: "Craft", tail: "builds sanctuaries.", indent: "lg:ml-[11vw]" },
  { head: "Design", tail: "defines distinction.", indent: "lg:ml-[3vw]" },
  { head: "Legacy", tail: "commands trust.", indent: "lg:ml-[15vw]" },
];

export default function Statement() {
  const root = useRef<HTMLElement>(null);
  useSectionTimeline(root, createStatementTimeline);

  return (
    <section ref={root} className="relative bg-bone text-ink py-12 md:py-16 overflow-hidden">
      <div className="shell">
        <p data-index className="eyebrow text-muted mb-8 md:mb-10 flex items-center gap-4">
          <span className="h-px w-10 bg-ink/25" />
          Our Philosophy
        </p>

        <h2 className="font-display text-[clamp(2.2rem,4.3vw,5.4rem)] leading-[1.04] tracking-[-0.035em]">
          {LINES.map((l) => (
            <span key={l.head} data-drift className={`block will-change-transform ${l.indent}`}>
              <span className="line-mask">
                <span data-line className="line-inner">
                  {l.head} <span className="italic text-muted">{l.tail}</span>
                </span>
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-8 md:mt-10 flex lg:justify-end">
          <p data-fade className="body-lg text-muted max-w-[40ch]">
            Built on a regal legacy, GDPL crafts iconic spaces while guiding the Tricity with trusted real estate expertise.
          </p>
        </div>
      </div>
    </section>
  );
}
