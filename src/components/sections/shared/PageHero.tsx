"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useHeroTimeline } from "@/animations/useHeroTimeline";
import { useVideoInView } from "@/hooks/useVideoInView";
import { cn } from "@/lib/utils";

const SLIDE_MS = 6000;

type Props = {
  eyebrow?: ReactNode;
  lines: ReactNode[];
  copy?: ReactNode;
  image?: { src: string; alt: string; className?: string };
  /** Several renders: the hero crossfades through them on its own (replaces `image`). */
  images?: { src: string; alt: string; className?: string }[];
  video?: string;
  actions?: ReactNode;
  meta?: { label: string; value: ReactNode }[];
  size?: "full" | "tall";
  headlineClassName?: string;
  /** Which side the words sit on from desktop up; phones always read left-aligned. */
  align?: "left" | "right";
};

/** Cinematic page opener shared by inner pages — same choreography as the home hero. */
export default function PageHero({ eyebrow, lines, copy, image, images, video, actions, meta, size = "full", headlineClassName, align = "left" }: Props) {
  const right = align === "right";
  const root = useRef<HTMLElement>(null);
  useHeroTimeline(root);
  const videoRef = useVideoInView<HTMLVideoElement>();
  const slides = images && images.length > 1 ? images : null;
  const [active, setActive] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  // Auto-advance; restarts whenever the slide changes (including a manual pick). No autoplay for reduced motion.
  useEffect(() => {
    if (!slides || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => go((active + 1) % slides.length), SLIDE_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, slides]);
  const go = (i: number) => {
    if (i === active) return;
    setPrev(active);
    setActive(i);
  };

  return (
    <section
      ref={root}
      className={cn(
        "tone-dark relative flex flex-col w-full overflow-hidden bg-ink text-bone",
        size === "full" ? "min-h-[100svh]" : "min-h-[88svh]"
      )}
    >
      <div data-hero-media className="absolute inset-0 will-change-transform">
        <div data-hero-media-inner className="absolute inset-0">
          {slides &&
            slides.map((im, i) => {
              // Only the current, outgoing and next image are mounted; the rest download when they are about to be needed.
              const near = i === active || i === prev || i === (active + 1) % slides.length;
              return (
              <div
                key={im.src}
                aria-hidden={i !== active}
                className="absolute inset-0 transition-opacity duration-[1600ms] ease-in-out"
                style={{ opacity: i === active ? 1 : 0 }}
              >
                {near && (
                  <Image
                    src={im.src}
                    alt={im.alt}
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    className={cn("object-cover", (i === active || i === prev) && "hero-kb", im.className)}
                  />
                )}
              </div>
              );
            })}
          {!slides && image && (
            <Image src={image.src} alt={image.alt} fill priority sizes="100vw" className={cn("object-cover", image.className)} />
          )}
          {video && (
            <video ref={videoRef} loop muted playsInline preload="metadata" className="absolute inset-0 h-full w-full object-cover">
              <source src={video} type="video/mp4" />
            </video>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/55" />
      <div className={cn("absolute inset-0 via-ink/15 to-transparent from-ink/65", right ? "bg-gradient-to-l" : "bg-gradient-to-r")} />
      <div data-hero-overlay className="absolute inset-0 bg-ink opacity-0" />

      <div
        data-hero-content
        className={cn("relative z-10 flex-1 shell flex flex-col justify-end pt-36 pb-[max(4.5rem,10vh)]", right && "lg:items-end lg:text-right")}
      >
        {eyebrow && (
          <p data-hero-eyebrow className={cn("eyebrow text-bone/90 mb-6 md:mb-8 flex items-center gap-4", right && "lg:flex-row-reverse")}>
            <span className="h-px w-10 shrink-0 bg-accent-soft/70" />
            {eyebrow}
          </p>
        )}

        <h1 data-hero-headline className={cn("display-hero", headlineClassName)}>
          {lines.map((line, i) => (
            <span key={i} className="block lg:whitespace-nowrap">
              <span data-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h1>

        {(copy || actions || meta) && (
          <div className={cn("mt-8 md:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end", right && "lg:w-full")}>
            <div className={cn("lg:col-span-6 flex flex-col gap-8 md:gap-10", right && "lg:col-start-7 lg:items-end")}>
              {copy && (
                <p data-hero-copy className="body-lg text-bone/90 max-w-[48ch]">
                  {copy}
                </p>
              )}
              {actions && (
                <div data-hero-cta className={cn("flex flex-col sm:flex-row gap-4", right && "lg:justify-end")}>
                  {actions}
                </div>
              )}
            </div>

            {meta && meta.length > 0 && (
              <dl className="lg:col-span-6 grid grid-cols-2 gap-x-8 gap-y-6 lg:pl-10">
                {meta.map((m) => (
                  <div key={m.label} data-hero-meta className="border-t border-bone/15 pt-4">
                    <dt className="eyebrow text-[0.62rem] text-bone/70">{m.label}</dt>
                    <dd className="mt-2 font-display text-[clamp(1.05rem,1.6vw,1.6rem)] leading-tight tracking-[-0.01em]">{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}
      </div>

      {slides && (
        <div className="absolute bottom-6 md:bottom-9 right-[var(--gutter)] z-10 flex items-center gap-2" role="group" aria-label="Hero images">
          {slides.map((im, i) => (
            <button
              key={im.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Show image ${i + 1} of ${slides.length}`}
              aria-current={i === active}
              className="group relative h-6 w-8 md:w-10"
            >
              <span className="absolute inset-x-0 top-1/2 block h-px -translate-y-1/2 bg-bone/35" />
              {i === active && (
                <span
                  key={active}
                  className="hero-bar-fill absolute inset-x-0 top-1/2 block h-px -translate-y-1/2 bg-bone"
                  style={{ animationDuration: `${SLIDE_MS}ms` }}
                />
              )}
            </button>
          ))}
        </div>
      )}

      <div data-hero-cue-wrap className="absolute bottom-5 md:bottom-7 left-1/2 -translate-x-1/2 z-10 hidden md:block">
        <div data-hero-cue className="flex flex-col items-center gap-3 text-bone/80">
          <span className="eyebrow text-[0.6rem]">Scroll</span>
          <span className="relative block h-10 w-px overflow-hidden bg-bone/15">
            <span className="scroll-cue absolute inset-0 bg-bone" />
          </span>
        </div>
      </div>
    </section>
  );
}
