"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useHeroTimeline } from "@/animations/useHeroTimeline";
import { useSite } from "@/components/shared/SiteContext";
import { useVideoInView } from "@/hooks/useVideoInView";
import { cn } from "@/lib/utils";

const STATS = [
  { value: 300, suffix: "+", label: "Happy Homes" },
  { value: 11, suffix: "+", label: "Years of Trust" },
  { value: 25, suffix: "+", label: "Acres of Development" },
];

/** Seconds the rail highlight holds on each stat before advancing. */
const DWELL = 6.5;

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  useHeroTimeline(root);
  const { ready } = useSite();

  const [lit, setLit] = useState(0);
  const counted = useRef(false);
  const counters = useRef<(HTMLSpanElement | null)[]>([]);
  const progress = useRef<HTMLSpanElement>(null);
  const videoRef = useVideoInView<HTMLVideoElement>();

  // The rail cycles through the stats on a loop while the video plays behind it.
  useEffect(() => {
    if (!ready) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      if (progress.current) gsap.set(progress.current, { scaleY: 1 });
      return;
    }

    let cancelled = false;
    const runCycle = () => {
      if (cancelled || !progress.current) return;
      gsap.fromTo(
        progress.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: DWELL,
          ease: "none",
          onComplete: () => {
            if (cancelled) return;
            setLit((i) => (i + 1) % STATS.length);
            runCycle();
          },
        }
      );
    };
    runCycle();

    return () => {
      cancelled = true;
      gsap.killTweensOf(progress.current);
    };
  }, [ready]);

  // Numbers count up once, as the stats first arrive.
  useEffect(() => {
    if (!ready || counted.current) return;
    counted.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    STATS.forEach((s, i) => {
      const el = counters.current[i];
      if (!el) return;
      const tally = { v: 0 };
      el.textContent = "0";
      gsap.to(tally, {
        v: s.value,
        duration: 1.8,
        delay: 1.65 + i * 0.08,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = String(Math.round(tally.v));
        },
      });
    });
  }, [ready]);

  // Pointer parallax — the video and the stats drift at different depths.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (!window.matchMedia("(min-width: 1024px) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const media = el.querySelector<HTMLElement>("[data-hero-media-inner]");
    const decor = el.querySelector<HTMLElement>("[data-hero-decor]");
    if (!media) return;

    const mediaX = gsap.quickTo(media, "x", { duration: 1.6, ease: "power3" });
    const mediaY = gsap.quickTo(media, "y", { duration: 1.6, ease: "power3" });
    const decorX = decor ? gsap.quickTo(decor, "x", { duration: 2, ease: "power3" }) : null;
    const decorY = decor ? gsap.quickTo(decor, "y", { duration: 2, ease: "power3" }) : null;

    const onMove = (e: PointerEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mediaX(x * -10);
      mediaY(y * -7);
      decorX?.(x * 9);
      decorY?.(y * 6);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      gsap.set([media, decor].filter(Boolean) as HTMLElement[], { clearProps: "x,y" });
    };
  }, []);

  return (
    <section ref={root} className="tone-light relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-bone text-ink">
      {/* The page still needs its headline for search and screen readers. */}
      <h1 className="sr-only">GDPL Mohali — shaping tomorrow with vision and action</h1>

      {/* ── Full-screen hero video ── */}
      <div data-hero-media className="absolute inset-0 will-change-transform">
        <div data-hero-media-inner className="absolute inset-0">
          <div data-hero-media-blur className="absolute inset-0 bg-sand">
            <video
              ref={videoRef}
              muted
              loop
              playsInline
              preload="auto"
              disablePictureInPicture
              aria-hidden
              className="absolute inset-0 h-full w-full object-cover object-center"
            >
              <source src="/videos/hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* Soft ivory at the top for the navigation, and behind the stats so they read on every frame */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-36 bg-gradient-to-b from-bone/55 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[48%] bg-gradient-to-t from-bone/90 via-bone/50 to-transparent lg:hidden" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-[4] hidden w-[36%] bg-gradient-to-r from-bone/80 via-bone/35 to-transparent lg:block" />
      <div data-hero-reveal aria-hidden className="absolute inset-0 z-[5] bg-bone opacity-0" />
      <div data-hero-overlay aria-hidden className="absolute inset-0 z-[5] bg-bone opacity-0" />

      {/* ── Proof: one open column on the left, lit one stat at a time ── */}
      <div className="absolute left-[var(--gutter)] bottom-[max(1.5rem,5svh)] z-20 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2">
        <div data-hero-decor>
          <div data-hero-band className="relative pl-6 lg:pl-9">
            {/* Rail: the brass fill tracks how long the current stat has left */}
            <span aria-hidden className="absolute left-0 top-2 bottom-2 w-px overflow-hidden bg-ink/15">
              <span ref={progress} className="absolute inset-0 origin-top scale-y-0 bg-accent" />
            </span>

            <ul className="flex flex-col">
              {STATS.map((s, i) => (
                <li
                  key={s.label}
                  className={cn(
                    "relative py-1.5 sm:py-2.5 transition-opacity duration-700 lg:py-[clamp(0.7rem,1.8vh,1.15rem)]",
                    i > 0 && "border-t border-ink/10",
                    i === lit ? "opacity-100" : "opacity-70"
                  )}
                >
                  {/* Brass tick that slides out from the rail to the lit stat */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -left-6 top-1/2 h-px bg-accent transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:-left-9",
                      i === lit ? "w-4 lg:w-6" : "w-0"
                    )}
                  />
                  <div className="flex flex-col">
                    <p
                      className={cn(
                        "font-display leading-none tracking-[-0.04em] tabular-nums text-[clamp(2.2rem,4vw,4.4rem)] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] origin-left",
                        i === lit ? "scale-100" : "scale-[0.92]"
                      )}
                    >
                      <span
                        ref={(el) => {
                          counters.current[i] = el;
                        }}
                      >
                        {s.value}
                      </span>
                      <span className="text-accent">{s.suffix}</span>
                    </p>
                    <p className="mt-1 sm:mt-2 eyebrow text-[0.8rem] text-accent lg:text-[0.95rem]">{s.label}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
