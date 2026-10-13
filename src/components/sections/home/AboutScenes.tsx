"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useVideoInView } from "@/hooks/useVideoInView";
import AboutOrbit from "./AboutOrbit";

/* Soft edge so the video's studio backdrop melts into the section colour. */
const FEATHER = {
  maskImage:
    "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent, #000 12%, #000 88%, transparent), linear-gradient(to bottom, transparent, #000 12%, #000 88%, transparent)",
  maskComposite: "intersect",
  WebkitMaskComposite: "source-in",
} as React.CSSProperties;

type SceneProps = {
  id: string;
  bg: string;
  src: string;
  eyebrow: string;
  lines: [string, string];
  body: string;
  index: string;
  flip?: boolean;
  /** Crop the video tighter on small screens so a small subject reads larger. */
  mobileCrop?: boolean;
};

function Scene({ id, bg, src, eyebrow, lines, body, index, flip, mobileCrop }: SceneProps) {
  const videoRef = useVideoInView<HTMLVideoElement>({ pauseOnLeave: true });
  return (
    <div
      data-scene={id}
      className={`about-noise absolute inset-0 isolate overflow-hidden ${flip ? "about-noise--flip" : ""}`}
      style={{ backgroundColor: bg }}
    >
      <div aria-hidden className={`about-float about-float--scene about-float--${id}`}>
        <i /><i /><i /><i /><i />
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 flex h-[100svh] items-center lg:bottom-auto lg:top-0">
      <div className="shell grid w-full grid-cols-1 items-center gap-x-10 gap-y-6 lg:grid-cols-12">
        <div data-item-wrap className={`flex flex-col lg:col-span-4 ${flip ? "lg:order-2" : ""}`}>
          <span data-item className="eyebrow text-muted mb-5 block">{eyebrow}</span>
          <h2 data-item className="display-lg text-ink">
            <span className="block">{lines[0]}</span>
            <em className="block italic text-accent">{lines[1]}</em>
          </h2>
          <p data-item className="mt-6 max-w-md leading-[1.8] text-muted md:mt-10">{body}</p>
          <span data-item className="eyebrow mt-8 text-[0.65rem] text-muted">{index}</span>
        </div>

        <div data-item className={`relative lg:col-span-8 ${flip ? "lg:order-1" : ""}`}>
          <AboutOrbit />
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload="metadata"
            disablePictureInPicture
            aria-hidden
            className={`w-full object-cover lg:aspect-video ${mobileCrop ? "aspect-[5/4] max-lg:-mx-4 max-lg:w-[calc(100%+2rem)]" : "aspect-video"} lg:-ml-[8%] lg:w-[min(116%,calc(88svh*1.7778))] lg:max-w-none`}
            style={id === "b" ? { ...FEATHER, filter: "sepia(0.2) saturate(1.05)" } : FEATHER}
          >
            <source src={src} type="video/mp4" />
          </video>
        </div>
      </div>
      </div>
    </div>
  );
}

/**
 * Continues the About section: once the reader scrolls past it, a pinned stage
 * shows a model turntable on its own studio-matched background, then crossfades
 * to a second video with different copy. Static stack under reduced motion.
 */
export default function AboutScenes({ sectionRef }: { sectionRef: RefObject<HTMLElement | null> }) {
  const layer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = layer.current;
    const section = sectionRef.current;
    if (!el || !section) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add({ motion: "(prefers-reduced-motion: no-preference)", desktop: "(min-width: 1024px)" }, (ctx) => {
      const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
      if (!motion) return;
      const a = el.querySelector('[data-scene="a"]')!;
      const b = el.querySelector('[data-scene="b"]')!;
      const aItems = a.querySelectorAll("[data-item]");
      const bItems = b.querySelectorAll("[data-item]");

      gsap.set([a, b], { opacity: 0 });
      gsap.set(el, { display: "block" });

      // The About section itself is pinned; its content hands over to the videos on scroll.
      const tl = gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section, start: desktop ? "top top" : "bottom bottom", end: "+=320%", pin: true, scrub: 0.6, anticipatePin: 1 },
        })
        .to({}, { duration: 1 })
        .to(a, { opacity: 1, duration: 1 })
        .fromTo(aItems, { y: 36, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, "<")
        .to({}, { duration: 1 })
        .to(a, { opacity: 0, duration: 1 })
        .to(aItems, { y: -30, duration: 1 }, "<")
        .to(b, { opacity: 1, duration: 1 }, "<")
        .fromTo(bItems, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.1 }, "<")
        .to({}, { duration: 1 });

      // Orbit accents: spin rings, drift panels and lights at different speeds while their scene is on screen.
      const orbit = (scope: ParentNode, at: number, len: number) => {
        const qa = (s: string) => Array.from(scope.querySelectorAll<HTMLElement>(s));
        tl.fromTo(qa("[data-orbit-scroll]"), { rotationZ: 0 }, { rotationZ: (i: number) => (i % 2 ? -150 : 190), duration: len }, at);
      };
      const building = section.querySelector<HTMLElement>("[data-about-building]");
      if (building) {
        orbit(building, 0, 1);
        tl.fromTo(building, { scale: 1, xPercent: 0 }, { scale: 1.05, xPercent: -1.5, transformOrigin: "50% 60%", duration: 1 }, 0);
      }
      orbit(a, 1, 2.2);
      orbit(b, 3, 2);
    });
    return () => mm.revert();
  }, [sectionRef]);

  // Hidden until the pinned sequence is active; never shown under reduced motion.
  return (
    <div ref={layer} aria-hidden className="pointer-events-none absolute inset-0 z-20 hidden text-ink">
      <Scene
        id="a"
        bg="#DDD5CB"
        src="/videos/model-a.mp4"
        eyebrow="The Residences"
        lines={["Towers Composed", "For Skyline Living."]}
        body="Slender towers rise above landscaped podiums, each floor shaped to frame light, air and open views — a skyline designed to be lived in."
        index="01 / 02"
      />
      <Scene
        id="b"
        bg="#E9DFCF"
        src="/videos/model-c.mp4"
        eyebrow="Amenities"
        lines={["Resort Living,", "Within Reach."]}
        body="Sky terraces, a landscaped pool deck and shaded lounges sit at the heart of the community, so everyday life feels like a retreat."
        index="02 / 02"
        flip
        mobileCrop
      />
    </div>
  );
}
