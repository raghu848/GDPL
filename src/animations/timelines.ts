import gsap from "gsap";
import {
  MotionEnv,
  EASE,
  revealLines,
  fadeUp,
  maskReveal,
  drawLines,
  countUp,
  parallax,
  sectionTimeline,
  splitLines,
} from "./primitives";

/* ─────────────────────────────────────────────────────────────
   Section choreography. Each builder reads data-attributes from
   its section root so markup stays declarative:

   [data-index]  section number        [data-line]   heading line (inside .line-mask)
   [data-fade]   supporting text       [data-rule]   hairline divider
   [data-frame]  clipped image frame   [data-media]  image inside a frame
   [data-parallax] parallax wrapper    [data-cta]    call to action
   ───────────────────────────────────────────────────────────── */

const all = (root: Element, s: string) => Array.from(root.querySelectorAll(s));
const one = (root: Element, s: string) => root.querySelector(s);

type Dir = "up" | "left" | "right" | "center";

/**
 * Shared editorial sequence: number → heading → copy → image → CTA.
 * Elements near the top of the section join one choreographed timeline;
 * elements further down get their own trigger so long sections still
 * reveal as the reader reaches them.
 */
export function createEditorialTimeline(root: HTMLElement, env: MotionEnv, start = "top 72%") {
  const tl = sectionTimeline(root, start);
  const rootTop = root.getBoundingClientRect().top;
  const isFar = (el: Element) => el.getBoundingClientRect().top - rootTop > window.innerHeight * 0.7;
  const split = (sel: string) => {
    const els = all(root, sel).filter((e) => !e.closest("[data-stagger]"));
    return [els.filter((e) => !isFar(e)), els.filter(isFar)] as const;
  };
  const later = (el: Element, build: (t: gsap.core.Timeline) => void) => build(sectionTimeline(el, "top 88%"));

  const [nearIndex, farIndex] = split("[data-index]");
  fadeUp(tl, nearIndex, env, { y: 20, duration: 1 });
  farIndex.forEach((el) => later(el, (t) => fadeUp(t, el, env, { y: 20 })));

  const [nearRules, farRules] = split("[data-rule]");
  drawLines(tl, nearRules, env, { position: 0 });
  farRules.forEach((el) => later(el, (t) => drawLines(t, el, env)));

  const [nearLines, farLines] = split("[data-line]");
  revealLines(tl, nearLines, env, { position: 0.1 });
  const headings = new Map<Element, Element[]>();
  farLines.forEach((line) => {
    const heading = line.closest("h1, h2, h3, h4, p") ?? line.parentElement!;
    headings.set(heading, [...(headings.get(heading) ?? []), line]);
  });
  headings.forEach((lines, heading) => later(heading, (t) => revealLines(t, lines, env)));

  const [nearFade, farFade] = split("[data-fade]");
  fadeUp(tl, nearFade, env, { position: 0.45, stagger: 0.1 });
  farFade.forEach((el) => later(el, (t) => fadeUp(t, el, env)));

  all(root, "[data-frame]").forEach((frame, i) => {
    const direction = ((frame as HTMLElement).dataset.dir as Dir) || "up";
    const media = frame.querySelector("[data-media]");
    if (isFar(frame)) later(frame, (t) => maskReveal(t, frame, media, env, { direction, darken: true }));
    else maskReveal(tl, frame, media, env, { position: 0.3 + i * 0.15, direction, darken: true });
  });

  const [nearCta, farCta] = split("[data-cta]");
  if (nearCta.length) fadeUp(tl, nearCta, env, { position: ">-1", y: 24 });
  farCta.forEach((el) => later(el, (t) => fadeUp(t, el, env, { y: 24 })));

  // Groups of cards / rows: each group staggers in when it arrives.
  all(root, "[data-stagger]").forEach((group) => {
    const items = group.querySelectorAll("[data-item]");
    later(group, (t) => {
      drawLines(t, group.querySelectorAll("[data-rule]"), env, { stagger: 0.06 });
      fadeUp(t, items, env, { position: 0, y: 50, stagger: 0.09, duration: 1.2 });
    });
  });

  const counter = root.querySelector("[data-count]");
  if (counter) countUp(sectionTimeline(counter, "top 85%"), root, env);

  all(root, "[data-parallax]").forEach((p) => {
    parallax(p, p.closest("[data-frame]") ?? p.parentElement!, env, Number((p as HTMLElement).dataset.parallax) || 6);
  });
  return tl;
}

/* 01 — HERO ─────────────────────────────────────────────────── */
export function createHeroTimeline(root: HTMLElement, env: MotionEnv) {
  const $ = (s: string) => all(root, s);
  const media = $("[data-hero-media]");
  const intro = gsap.timeline({ paused: true });

  if (env.reduce) {
    intro
      .set($("[data-hero-reveal]"), { opacity: 0 })
      .from(
        [
          ...media,
          ...$("[data-hero-eyebrow]"),
          ...$("[data-line]"),
          ...$("[data-hero-copy]"),
          ...$("[data-hero-cta]"),
          ...$("[data-hero-meta]"),
          ...$("[data-hero-band]"),
          ...$("[data-hero-cue]"),
        ],
        { opacity: 0, duration: 0.8, stagger: 0.04, ease: "none" }
      );
    return intro;
  }

  intro
    .fromTo(media, { opacity: 0 }, { opacity: 1, duration: 1.8, ease: "power2.out" })
    .fromTo($("[data-hero-media-inner]"), { scale: 1.08 }, { scale: 1, duration: 2.8, ease: "power3.out" }, 0)
    // Architectural reveal: the building sharpens out of a dim, soft frame.
    .fromTo(
      $("[data-hero-media-blur]"),
      { filter: `blur(${12 * env.k}px)` },
      { filter: "blur(0px)", duration: 2.2, ease: "power2.out", clearProps: "filter" },
      0
    )
    .fromTo($("[data-hero-reveal]"), { opacity: 1 }, { opacity: 0, duration: 1.9, ease: "power2.inOut" }, 0.1)
    .from($("[data-hero-eyebrow]"), { y: 30 * env.k, opacity: 0, duration: 1.1, ease: EASE.out }, 0.35)
    .from($("[data-hero-rule]"), { scaleX: 0, transformOrigin: "left center", duration: 1.5, stagger: 0.1, ease: EASE.out }, 0.55)
    .from(
      $("[data-line]"),
      { y: 80 * env.k, opacity: 0, filter: "blur(10px)", duration: 1.5, stagger: 0.14, ease: EASE.out, clearProps: "filter" },
      0.5
    )
    .from($("[data-hero-copy]"), { y: 30 * env.k, opacity: 0, duration: 1.2, ease: EASE.out }, 1.05)
    .from($("[data-hero-cta]"), { y: 24 * env.k, opacity: 0, duration: 1.2, ease: EASE.out }, 1.25)
    .from($("[data-hero-meta]"), { y: 16, opacity: 0, duration: 1, stagger: 0.08, ease: EASE.out }, 1.45)
    .from($("[data-hero-band]"), { y: 30 * env.k, opacity: 0, duration: 1.2, ease: EASE.out }, 1.5)
    .from($("[data-hero-cue]"), { y: 12, opacity: 0, duration: 1, ease: EASE.out }, 1.7);

  // Scroll: the hero is pulled away as the next section arrives.
  gsap
    .timeline({ scrollTrigger: { trigger: root, start: "top top", end: "bottom top", scrub: true } })
    .to(media, { scale: 1.12, ease: "none" }, 0)
    .to($("[data-hero-content]"), { y: -140 * env.k, ease: "none" }, 0)
    .to($("[data-hero-headline]"), { opacity: 0.05, ease: "none" }, 0)
    .to($("[data-hero-overlay]"), { opacity: 0.75, ease: "none" }, 0)
    .to($("[data-hero-band]"), { y: -70 * env.k, opacity: 0, ease: "none" }, 0)
    .to($("[data-hero-cue-wrap]"), { opacity: 0, duration: 0.2, ease: "none" }, 0);

  return intro;
}

/* 02 — ABOUT ────────────────────────────────────────────────── */
export const createAboutTimeline = (root: HTMLElement, env: MotionEnv) => createEditorialTimeline(root, env, "top 70%");

/* 03 — STATS ────────────────────────────────────────────────── */
export function createStatsTimeline(root: HTMLElement, env: MotionEnv) {
  const tl = sectionTimeline(root, "top 80%");
  drawLines(tl, all(root, "[data-rule]"), env, { stagger: 0.12 });
  countUp(tl, root, env, { position: 0.2 });
  fadeUp(tl, all(root, "[data-fade]"), env, { position: 0.45, y: 30, stagger: 0.08 });
  return tl;
}

/* 04 — SERVICES / EXPERTISE ─────────────────────────────────── */
export function createServicesTimeline(root: HTMLElement, env: MotionEnv) {
  createEditorialTimeline(root, env);
  const cards = one(root, "[data-cards]");
  if (!cards) return;
  const tl = sectionTimeline(cards, "top 82%");
  fadeUp(tl, all(root, "[data-card]"), env, { y: 60, stagger: 0.12, duration: 1.3 });
}

/* 05 — SELECTED PROJECTS (horizontal) ───────────────────────── */
export function createProjectsTimeline(root: HTMLElement, env: MotionEnv) {
  const track = one(root, "[data-track]") as HTMLElement | null;
  const pin = one(root, "[data-pin]") as HTMLElement | null;

  const head = sectionTimeline(root, "top 70%");
  revealLines(head, all(root, "[data-line]"), env);
  fadeUp(head, all(root, "[data-fade]"), env, { position: 0.3 });

  if (env.desktop && !env.reduce && track && pin) {
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    const move = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    all(root, "[data-card]").forEach((card) => {
      const media = card.querySelector("[data-card-media]");
      if (media) {
        gsap.fromTo(
          media,
          { xPercent: -6, filter: "brightness(0.65)" },
          {
            xPercent: 6,
            filter: "brightness(1)",
            ease: "none",
            scrollTrigger: { trigger: card, containerAnimation: move, start: "left right", end: "right left", scrub: true },
          }
        );
      }
      gsap.from(card.querySelectorAll("[data-card-text]"), {
        y: 40,
        opacity: 0,
        duration: 1.1,
        stagger: 0.08,
        ease: EASE.out,
        scrollTrigger: { trigger: card, containerAnimation: move, start: "left 80%" },
      });
    });
    return;
  }

  all(root, "[data-card]").forEach((card) => {
    const tl = sectionTimeline(card, "top 85%");
    const frame = card.querySelector("[data-card-frame]");
    if (frame) maskReveal(tl, frame, card.querySelector("[data-card-media]"), env, { direction: "up", darken: true });
    fadeUp(tl, card.querySelectorAll("[data-card-text]"), env, { position: 0.4, y: 30 });
  });
}

/* 06 — STATEMENT ────────────────────────────────────────────── */
export function createStatementTimeline(root: HTMLElement, env: MotionEnv) {
  const tl = sectionTimeline(root, "top 68%");
  fadeUp(tl, all(root, "[data-index]"), env, { y: 20 });
  revealLines(tl, all(root, "[data-line]"), env, { position: 0.1, stagger: 0.18, duration: 1.5, blur: true });
  fadeUp(tl, all(root, "[data-fade]"), env, { position: 0.9 });
  if (env.reduce) return;
  all(root, "[data-drift]").forEach((el, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    gsap.fromTo(
      el,
      { xPercent: 5 * dir * env.k },
      { xPercent: -3 * dir * env.k, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } }
    );
  });
}

/* 07 — PROJECT / PROPERTY IMAGE REVEALS ─────────────────────── */
export function createImageRevealTimeline(root: HTMLElement, env: MotionEnv) {
  const head = sectionTimeline(root, "top 72%");
  fadeUp(head, all(root, "[data-index]"), env, { y: 20 });
  revealLines(head, all(root, "[data-line]"), env, { position: 0.1 });
  fadeUp(head, all(root, "[data-fade]"), env, { position: 0.45 });

  all(root, "[data-frame]").forEach((frame) => {
    const tl = sectionTimeline(frame, "top 85%");
    const dir = ((frame as HTMLElement).dataset.dir as "up" | "left" | "right" | "center") || "center";
    maskReveal(tl, frame, frame.querySelector("[data-media]"), env, { direction: dir, darken: true, duration: 1.8 });
    const caption = frame.parentElement?.querySelectorAll("[data-caption]");
    if (caption?.length) fadeUp(tl, caption, env, { position: 0.6, y: 30 });
  });

  all(root, "[data-parallax]").forEach((p) => {
    parallax(p, p.closest("[data-frame]") ?? p.parentElement!, env, Number((p as HTMLElement).dataset.parallax) || 8);
  });
}

/* 07b — BLUEPRINTS (pinned, fanned horizontal deck) ──────────── */
export function createBlueprintsTimeline(root: HTMLElement, env: MotionEnv) {
  const head = sectionTimeline(root, "top 75%");
  fadeUp(head, all(root, "[data-index]"), env, { y: 20 });
  revealLines(head, all(root, "[data-line]"), env, { position: 0.1 });
  fadeUp(head, all(root, "[data-fade]"), env, { position: 0.45, stagger: 0.1 });

  const track = one(root, "[data-track]") as HTMLElement | null;
  const pin = one(root, "[data-pin]") as HTMLElement | null;

  // Pin-and-scrub on every screen size: vertical scroll (finger drag on
  // mobile, wheel on desktop) drives the horizontal slide — no separate
  // swipe gesture needed. Only reduced-motion users get the plain fallback.
  if (!env.reduce && track && pin) {
    const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
    gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: pin,
        start: "top top",
        end: () => `+=${distance() * 1.15}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });
    return;
  }

  all(root, "[data-frame]").forEach((frame) => {
    const tl = sectionTimeline(frame, "top 90%");
    maskReveal(tl, frame, frame.querySelector("[data-media]"), env, { direction: "up", darken: true, duration: 1.2 });
  });
}

/* 08 — JOURNEY (milestones) ─────────────────────────────────── */
export function createJourneyTimeline(root: HTMLElement, env: MotionEnv) {
  createEditorialTimeline(root, env);
  const list = one(root, "[data-rows]");
  if (!list) return;
  const tl = sectionTimeline(list, "top 82%");
  drawLines(tl, list.querySelectorAll("[data-row-rule]"), env, { stagger: 0.08 });
  fadeUp(tl, list.querySelectorAll("[data-row]"), env, { position: 0.1, y: 40, stagger: 0.08 });
}

/* 09 — TEAM ─────────────────────────────────────────────────── */
export function createTeamTimeline(root: HTMLElement, env: MotionEnv) {
  const tl = createEditorialTimeline(root, env);
  fadeUp(tl, all(root, "[data-card]"), env, { position: 0.35, y: 60, stagger: 0.15, duration: 1.3 });
}

/* 10 — TESTIMONIAL ──────────────────────────────────────────── */
export function createTestimonialTimeline(root: HTMLElement, env: MotionEnv) {
  const quote = one(root, "[data-quote]") as HTMLElement | null;
  const tl = sectionTimeline(root, "top 70%");
  fadeUp(tl, all(root, "[data-index]"), env, { y: 20 });
  if (quote) {
    const split = splitLines(quote);
    revealLines(tl, split.lines, env, { position: 0.1, stagger: 0.1, duration: 1.3 });
    tl.eventCallback("onComplete", split.revert);
    fadeUp(tl, all(root, "[data-fade]"), env, { position: ">-0.6", y: 20 });
    return split.revert;
  }
}

/* 11 — CONTACT CTA ──────────────────────────────────────────── */
export function createContactTimeline(root: HTMLElement, env: MotionEnv) {
  const media = one(root, "[data-media]");
  if (media && !env.reduce) {
    gsap.fromTo(
      media,
      { scale: 1.18, yPercent: -6 * env.k },
      { scale: 1, yPercent: 6 * env.k, ease: "none", scrollTrigger: { trigger: root, start: "top bottom", end: "bottom top", scrub: true } }
    );
  }
  const tl = sectionTimeline(root, "top 62%");
  fadeUp(tl, all(root, "[data-index]"), env, { y: 20 });
  revealLines(tl, all(root, "[data-line]"), env, { position: 0.1, stagger: 0.14, duration: 1.5 });
  fadeUp(tl, all(root, "[data-fade]"), env, { position: 0.65 });
  fadeUp(tl, all(root, "[data-cta]"), env, { position: 0.9, y: 30 });
}
