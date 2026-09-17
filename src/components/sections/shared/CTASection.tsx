"use client";

import { ReactNode, useRef } from "react";
import Image from "next/image";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { createContactTimeline } from "@/animations/timelines";
import { cn } from "@/lib/utils";

type Props = {
  image?: { src: string; alt: string };
  video?: string;
  eyebrow: ReactNode;
  lines: ReactNode[];
  copy?: ReactNode;
  actions: ReactNode;
  children?: ReactNode;
  headlineClassName?: string;
};

/** Full-bleed closing call to action with slow image parallax. */
export default function CTASection({ image, video, eyebrow, lines, copy, actions, children, headlineClassName }: Props) {
  const root = useRef<HTMLElement>(null);
  useSectionTimeline(root, createContactTimeline);

  return (
    <section ref={root} className="tone-dark relative min-h-[100svh] flex items-end overflow-hidden bg-ink text-bone">
      <div data-media className="absolute inset-0 will-change-transform">
        {image && <Image src={image.src} alt={image.alt} fill sizes="100vw" className="object-cover" />}
        {video && (
          <video autoPlay loop muted playsInline preload="none" className="absolute inset-0 h-full w-full object-cover">
            <source src={video} type="video/mp4" />
          </video>
        )}
      </div>
      <div className="absolute inset-0 bg-ink/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-ink/60" />

      <div className="relative z-10 shell w-full pt-40 pb-20 md:pb-28">
        <p data-index className="eyebrow text-bone/80 mb-10 flex items-center gap-4">
          <span className="h-px w-10 shrink-0 bg-accent-soft/70" />
          {eyebrow}
        </p>

        <h2 className={cn("display-xl max-w-[16ch]", headlineClassName)}>
          {lines.map((line, i) => (
            <span key={i} className="line-mask">
              <span data-line className="line-inner">
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-12 md:mt-16 flex flex-col md:flex-row md:items-end justify-between gap-10">
          {copy && (
            <p data-fade className="body-lg text-bone/85 max-w-[42ch]">
              {copy}
            </p>
          )}
          <div data-cta className="flex flex-col sm:flex-row gap-4">
            {actions}
          </div>
        </div>

        {children && (
          <div data-fade className="mt-16 md:mt-20">
            {children}
          </div>
        )}
      </div>
    </section>
  );
}
