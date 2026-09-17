"use client";

import { ReactNode, useRef } from "react";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { createEditorialTimeline } from "@/animations/timelines";
import { cn } from "@/lib/utils";

const TONES = {
  light: "bg-bone text-ink tone-light",
  paper: "bg-paper text-ink tone-light",
  linen: "bg-linen text-ink tone-light",
  sand: "bg-sand text-ink tone-light",
  dark: "bg-ink text-bone tone-dark",
  "dark-2": "bg-ink-2 text-bone tone-dark",
};

type Props = {
  tone?: keyof typeof TONES;
  id?: string;
  className?: string;
  /** Wrap children in the page shell (set false for full-bleed content). */
  contained?: boolean;
  children: ReactNode;
};

/** Section wrapper that choreographs every data-* reveal inside it. */
export default function EditorialSection({ tone = "light", id, className, contained = true, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  useSectionTimeline(ref, (el, env) => {
    createEditorialTimeline(el, env);
  });

  return (
    <section ref={ref} id={id} className={cn("relative py-28 md:py-40", TONES[tone], className)}>
      {contained ? <div className="shell">{children}</div> : children}
    </section>
  );
}
