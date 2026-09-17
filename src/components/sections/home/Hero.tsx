"use client";

import { CSSProperties, useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useHeroTimeline } from "@/animations/useHeroTimeline";
import { useSite } from "@/components/shared/SiteContext";
import { cn } from "@/lib/utils";

const SLIDES: { src: string; alt: string; focusMobile: string }[] = [
  {
    src: "/images/hero-family/home-frame.jpg",
    alt: "A mother and daughter hanging a family photo on the wall of their home",
    focusMobile: "42% center",
  },
  {
    src: "/images/hero-family/pillow-play.jpg",
    alt: "A father and daughter laughing through a pillow fight at home",
    focusMobile: "60% center",
  },
  {
    src: "/images/hero-family/together.jpg",
    alt: "A family laughing together on a sunlit bed",
    focusMobile: "63% center",
  },
  {
    src: "/images/hero-family/first-steps.jpg",
    alt: "Parents cheering on their baby climbing the stairs at home",
    focusMobile: "45% center",
  },
  {
    src: "/images/hero-family/balcony-view.jpg",
    alt: "A woman taking in the city and sea view from a glass-railed balcony",
    focusMobile: "76% center",
  },
];

const STATS = [
  { value: 300, suffix: "+", label: "Happy Homes" },
  { value: 11, suffix: "+", label: "Years of Trust" },
  { value: 25, suffix: "+", label: "Acres of Development" },
];

/** Seconds each photo holds, and the length of the curtain between them. */
const DWELL = 6.5;
const WIPE = 1.6;

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  useHeroTimeline(root);
  const { ready } = useSite();

  const [active, setActive] = useState(0);
  const previous = useRef(0);
  const counted = useRef(false);
  const cycle = useRef<gsap.core.Timeline | null>(null);
  const layers = useRef<(HTMLDivElement | null)[]>([]);
  const frames = useRef<(HTMLDivElement | null)[]>([]);
  const counters = useRef<(HTMLSpanElement | null)[]>([]);
  const progress = useRef<HTMLSpanElement>(null);
  const edge = useRef<HTMLDivElement>(null);

  // Each pass: draw the next photo in like a curtain, then hold while the stats rail fills.
  useEffect(() => {
    if (!ready) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const layer = layers.current[active];
    const frame = frames.current[active];
    if (!layer || !frame) return;

    // On the very first pass there is nothing to reveal over, so it opens flat.
    const prev = previous.current;
    const opening = prev === active;
    const prevFrame = frames.current[prev];

    // The outgoing photo stays one step down so the curtain draws across it.
    layers.current.forEach((el, i) => el && gsap.set(el, { zIndex: i === active ? 2 : i === prev ? 1 : 0 }));

    const tl = gsap.timeline({ onComplete: reduce ? undefined : () => setActive((i) => (i + 1) % SLIDES.length) });
    cycle.current = tl;

    if (opening || reduce) {
      tl.set(layer, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 });
      if (!opening) tl.fromTo(layer, { opacity: 0 }, { opacity: 1, duration: 0.9, ease: "power2.out" }, 0);
      if (!reduce) tl.fromTo(frame, { scale: 1.08, xPercent: 0 }, { scale: 1.03, duration: DWELL + WIPE, ease: "none" }, 0);
    } else {
      // Incoming: a curtain opens from the right while the photo glides into place behind it.
      tl.set(layer, { opacity: 1 })
        .fromTo(layer, { clipPath: "inset(0% 0% 0% 100%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: WIPE, ease: "expo.inOut" }, 0)
        .fromTo(frame, { scale: 1.18, xPercent: 9 }, { scale: 1.06, xPercent: 0, duration: WIPE + 0.3, ease: "expo.inOut" }, 0)
        .to(frame, { scale: 1.03, duration: DWELL, ease: "none" }, WIPE + 0.3);

      // Outgoing: eases back and away, so the change reads as depth rather than a cut.
      if (prevFrame) tl.to(prevFrame, { xPercent: -6, scale: 1.1, duration: WIPE, ease: "expo.inOut" }, 0);

      // A fine light edge rides the curtain.
      if (edge.current) {
        tl.fromTo(edge.current, { xPercent: 100, autoAlpha: 1 }, { xPercent: 0, duration: WIPE, ease: "expo.inOut" }, 0).to(
          edge.current,
          { autoAlpha: 0, duration: 0.3 },
          WIPE - 0.15
        );
      }
    }

    // The rail beside the stats fills while this photo holds.
    if (progress.current) {
      tl.fromTo(progress.current, { scaleY: 0 }, { scaleY: 1, duration: DWELL + (opening ? WIPE : 0), ease: "none" }, reduce ? 0 : 0.1);
      if (reduce) gsap.set(progress.current, { scaleY: 1 });
    }

    return () => {
      previous.current = active;
      tl.kill();
      cycle.current = null;
    };
  }, [active, ready]);

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

  // Pointer parallax — the photo and the stats drift at different depths.
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

  // Each photo lights one of the stats in turn.
  const lit = active % STATS.length;

  return (
    <section ref={root} className="tone-light relative h-[100svh] min-h-[560px] w-full overflow-hidden bg-bone text-ink">
      {/* The page still needs its headline for search and screen readers. */}
      <h1 className="sr-only">GDPL Mohali — shaping tomorrow with vision and action</h1>

      {/* ── Full-screen photographs ── */}
      <div data-hero-media className="absolute inset-0 will-change-transform">
        <div data-hero-media-inner className="absolute inset-0">
          <div data-hero-media-blur className="absolute inset-0 bg-sand">
            {SLIDES.map((s, i) => (
              <div
                key={s.src}
                ref={(el) => {
                  layers.current[i] = el;
                }}
                className="absolute inset-0 overflow-hidden will-change-[clip-path]"
                style={i === 0 ? { zIndex: 2 } : { zIndex: 0, opacity: 0 }}
                aria-hidden={i !== active}
              >
                <div
                  ref={(el) => {
                    frames.current[i] = el;
                  }}
                  className="absolute inset-0 will-change-transform"
                >
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    priority={i < 2}
                    sizes="100vw"
                    className="object-cover [object-position:var(--focus-mobile)] lg:object-center"
                    style={{ "--focus-mobile": s.focusMobile } as CSSProperties}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Light edge that rides the curtain between photos */}
      <div ref={edge} aria-hidden className="pointer-events-none absolute inset-0 z-[3] opacity-0">
        <span className="absolute inset-y-0 left-0 w-px bg-paper shadow-[0_0_24px_6px_rgba(251,249,245,0.55)]" />
      </div>

      {/* Soft ivory at the top for the navigation, and behind the stats so they read on every photo */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-[4] h-36 bg-gradient-to-b from-bone/55 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-[4] h-[48%] bg-gradient-to-t from-bone/90 via-bone/50 to-transparent lg:hidden" />
      <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-[4] hidden w-[36%] bg-gradient-to-r from-bone/80 via-bone/35 to-transparent lg:block" />
      <div data-hero-reveal aria-hidden className="absolute inset-0 z-[5] bg-bone opacity-0" />
      <div data-hero-overlay aria-hidden className="absolute inset-0 z-[5] bg-bone opacity-0" />

      {/* ── Proof: one open column on the left, lit one stat at a time ── */}
      <div className="absolute left-[var(--gutter)] bottom-[max(1.5rem,5svh)] z-20 lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2">
        <div data-hero-decor>
          <div data-hero-band className="relative pl-6 lg:pl-9">
            {/* Rail: the brass fill tracks how long the current photo has left */}
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
