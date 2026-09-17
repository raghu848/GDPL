import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/* ─────────────────────────────────────────────────────────────
   Reusable animation primitives.
   Every primitive appends to a timeline so sections can compose
   a single choreographed sequence around one scroll trigger.
   ───────────────────────────────────────────────────────────── */

let registered = false;
export function registerGsap() {
  if (registered || typeof window === "undefined") return;
  gsap.registerPlugin(ScrollTrigger);
  // Sections share builders; optional elements may be absent on some pages.
  gsap.config({ nullTargetWarn: false });
  registered = true;
}

export const EASE = {
  out: "expo.out",
  soft: "power3.out",
  inOut: "power3.inOut",
  cinematic: "power4.inOut",
};

export type MotionEnv = {
  /** ≥1024px */
  desktop: boolean;
  /** prefers-reduced-motion */
  reduce: boolean;
  /** Distance multiplier: lighter movement on small screens */
  k: number;
};

type Targets = gsap.TweenTarget;
type Pos = gsap.Position | undefined;

const q = (root: Element, sel: string) => Array.from(root.querySelectorAll(sel));

/** Heading lines rise out of their masks with a slight blur. */
export function revealLines(
  tl: gsap.core.Timeline,
  targets: Targets,
  env: MotionEnv,
  opts: { position?: Pos; stagger?: number; duration?: number; y?: number; blur?: boolean } = {}
) {
  if (env.reduce) return tl.from(targets, { opacity: 0, duration: 0.6, ease: "none" }, opts.position);
  return tl.from(
    targets,
    {
      yPercent: opts.y ?? 105,
      opacity: 0,
      filter: opts.blur ? "blur(8px)" : "blur(0px)",
      duration: opts.duration ?? 1.2,
      stagger: opts.stagger ?? 0.12,
      ease: EASE.out,
      clearProps: "filter",
    },
    opts.position
  );
}

/** Generic text/card entrance: opacity 0 → 1, y → 0. */
export function fadeUp(
  tl: gsap.core.Timeline,
  targets: Targets,
  env: MotionEnv,
  opts: { position?: Pos; y?: number; stagger?: number; duration?: number } = {}
) {
  if (env.reduce) return tl.from(targets, { opacity: 0, duration: 0.6, ease: "none", stagger: 0.05 }, opts.position);
  return tl.from(
    targets,
    {
      y: (opts.y ?? 50) * env.k,
      opacity: 0,
      duration: opts.duration ?? 1.1,
      stagger: opts.stagger ?? 0.1,
      ease: EASE.out,
    },
    opts.position
  );
}

/** Masked image reveal: the frame's clip-path opens while the image settles from 1.1 → 1. */
export function maskReveal(
  tl: gsap.core.Timeline,
  frame: Element,
  image: Element | null,
  env: MotionEnv,
  opts: { position?: Pos; direction?: "up" | "left" | "right" | "center"; duration?: number; darken?: boolean } = {}
) {
  if (env.reduce) return tl.from(frame, { opacity: 0, duration: 0.6, ease: "none" }, opts.position);
  const start = {
    up: "inset(100% 0% 0% 0%)",
    left: "inset(0% 100% 0% 0%)",
    right: "inset(0% 0% 0% 100%)",
    center: "inset(12% 18% 12% 18%)",
  }[opts.direction ?? "up"];
  const d = opts.duration ?? 1.6;
  tl.fromTo(
    frame,
    { clipPath: start },
    { clipPath: "inset(0% 0% 0% 0%)", duration: d, ease: EASE.cinematic },
    opts.position
  );
  if (image) {
    tl.fromTo(
      image,
      { scale: 1.12, filter: opts.darken ? "brightness(0.6)" : "brightness(1)" },
      { scale: 1, filter: "brightness(1)", duration: d + 0.4, ease: EASE.out },
      "<"
    );
  }
  return tl;
}

/** Divider lines draw from width 0 → 100%. */
export function drawLines(
  tl: gsap.core.Timeline,
  targets: Targets,
  env: MotionEnv,
  opts: { position?: Pos; stagger?: number } = {}
) {
  if (env.reduce) return tl;
  return tl.from(
    targets,
    { scaleX: 0, transformOrigin: "left center", duration: 1.4, stagger: opts.stagger ?? 0.08, ease: EASE.inOut },
    opts.position
  );
}

/** Counts every [data-count] inside root from 0 to its target value. */
export function countUp(tl: gsap.core.Timeline, root: Element, env: MotionEnv, opts: { position?: Pos } = {}) {
  const els = q(root, "[data-count]") as HTMLElement[];
  els.forEach((el, i) => {
    const target = parseFloat(el.dataset.count || "0");
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    const counter = { v: env.reduce ? target : 0 };
    el.textContent = counter.v.toFixed(decimals);
    tl.to(
      counter,
      {
        v: target,
        duration: env.reduce ? 0 : 2.2,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = counter.v.toFixed(decimals);
        },
      },
      i === 0 ? opts.position : "<0.08"
    );
  });
  return tl;
}

/** Scroll-linked parallax on an image inside an overflow-hidden frame. */
export function parallax(target: Element, trigger: Element, env: MotionEnv, amount = 12) {
  if (env.reduce) return;
  gsap.fromTo(
    target,
    { yPercent: -amount * env.k },
    {
      yPercent: amount * env.k,
      ease: "none",
      scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true },
    }
  );
}

/** Creates a paused-until-in-view timeline bound to a section. */
export function sectionTimeline(trigger: Element, start = "top 75%") {
  return gsap.timeline({
    scrollTrigger: { trigger, start, toggleActions: "play none none none" },
  });
}

const escapeHtml = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/**
 * Splits a plain-text element into masked visual lines for line-by-line reveals.
 * Call revert() once the reveal finishes so text reflows naturally on resize.
 */
export function splitLines(el: HTMLElement) {
  const original = el.innerHTML;
  const words = (el.textContent ?? "").trim().split(/\s+/);
  el.innerHTML = words.map((w) => `<span data-w style="display:inline-block">${escapeHtml(w)}</span>`).join(" ");

  const groups: string[][] = [];
  let top = Number.NaN;
  el.querySelectorAll<HTMLElement>("[data-w]").forEach((span) => {
    if (Math.abs(span.offsetTop - top) > 2 || Number.isNaN(top)) {
      groups.push([]);
      top = span.offsetTop;
    }
    groups[groups.length - 1].push(span.textContent ?? "");
  });

  el.innerHTML = groups
    .map((g) => `<span class="line-mask"><span class="line-inner" data-split-line>${g.map(escapeHtml).join(" ")}</span></span>`)
    .join("");

  let reverted = false;
  return {
    lines: Array.from(el.querySelectorAll("[data-split-line]")),
    revert: () => {
      if (reverted) return;
      reverted = true;
      el.innerHTML = original;
    },
  };
}

export { q };
