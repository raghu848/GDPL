"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useSite } from "./SiteContext";
import { useLenis } from "./SmoothScroll";

/**
 * Cinematic first-load sequence:
 * logo sharpens from blur → progress runs 0–100 → logo lifts,
 * panel slides away and the hero begins its entrance.
 */
export default function Preloader() {
  const { setReady } = useSite();
  const lenis = useLenis();
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  const logo = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const meta = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (done) lenis?.start();
    else lenis?.stop();
  }, [lenis, done]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const loaded = new Promise<void>((resolve) => {
      if (document.readyState === "complete") resolve();
      else window.addEventListener("load", () => resolve(), { once: true });
    });
    const capped = Promise.race([loaded, new Promise<void>((r) => setTimeout(r, 2600))]);

    const ctx = gsap.context(() => {
      const exit = () => {
        const out = gsap.timeline({ onComplete: () => setDone(true) });
        if (reduce) {
          out.call(() => setReady(true)).to(root.current, { opacity: 0, duration: 0.4 });
          return;
        }
        out
          .to(meta.current, { opacity: 0, y: -10, duration: 0.4, ease: "power2.in" })
          .to(logo.current, { scale: 1.12, opacity: 0, duration: 0.7, ease: "power3.in" }, 0)
          .call(() => setReady(true), [], 0.35)
          .to(panel.current, { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, 0.3);
      };

      const counter = { v: 0 };
      const intro = gsap.timeline({
        onComplete: () => {
          capped.then(exit);
        },
      });

      if (reduce) {
        intro.set(logo.current, { opacity: 1 }).set(bar.current, { scaleX: 1 });
        if (count.current) count.current.textContent = "100";
        intro.to({}, { duration: 0.3 });
        return;
      }

      intro
        .fromTo(
          logo.current,
          { opacity: 0, filter: "blur(16px)", scale: 0.96 },
          { opacity: 1, filter: "blur(0px)", scale: 1, duration: 1.1, ease: "power3.out" }
        )
        .from(meta.current, { opacity: 0, y: 12, duration: 0.8, ease: "power3.out" }, 0.3)
        .fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, duration: 1.8, ease: "power2.inOut" }, 0.3)
        .to(
          counter,
          {
            v: 100,
            duration: 1.8,
            ease: "power2.inOut",
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
            },
          },
          0.3
        );
    }, root);

    return () => ctx.revert();
  }, [setReady]);

  if (done) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[120] pointer-events-auto" aria-hidden>
      <div ref={panel} className="absolute inset-0 bg-bone flex items-center justify-center overflow-hidden">
        <div className="grain" />
        <div ref={logo} className="relative will-change-transform" style={{ opacity: 0 }}>
          <Image
            src="/images/GDPL_Logo_dark.png"
            alt=""
            width={240}
            height={74}
            priority
            className="h-12 md:h-16 w-auto object-contain"
          />
        </div>

        <div ref={meta} className="absolute bottom-10 md:bottom-14 left-0 right-0 shell flex items-end justify-between gap-6 text-muted">
          <span className="eyebrow hidden sm:block">Building Dreams</span>
          <div className="flex-1 max-w-[260px] mx-auto sm:mx-0">
            <div className="relative h-px w-full bg-ink/10 overflow-hidden">
              <div ref={bar} className="absolute inset-0 bg-accent origin-left" style={{ transform: "scaleX(0)" }} />
            </div>
          </div>
          <span className="eyebrow tabular-nums">
            <span ref={count}>000</span>
          </span>
        </div>
      </div>
    </div>
  );
}
