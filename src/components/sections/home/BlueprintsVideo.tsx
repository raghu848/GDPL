"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { blueprints } from "@/lib/blueprintsData";

// Must match scripts that render the videos: each plan holds CLIP seconds with FADE seconds of crossfade.
const CLIP = 3.6;
const FADE = 0.8;
const STEP = CLIP - FADE;
const DESKTOP_SRC = "/videos/blueprints-desktop.mp4";
const MOBILE_SRC = "/videos/blueprints-mobile.mp4";

/**
 * Scroll-scrubbed architecture reel: the section pins and the page scroll
 * drives the video's playhead, so every plan is shown in turn.
 * Desktop gets a landscape cut, phones a portrait cut.
 */
export default function BlueprintsVideo({
  onActive,
  sectionRef,
}: {
  onActive: (index: number) => void;
  sectionRef: RefObject<HTMLElement | null>;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  const [mobile, setMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => setMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    const vid = video.current;
    if (!el || !vid || !stage.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      let duration = 0;
      let wanted = 0;
      let last = -1;
      const total = blueprints.length * CLIP - (blueprints.length - 1) * FADE;
      const seek = () => {
        if (!duration || Math.abs(vid.currentTime - wanted) < 0.01) return;
        vid.currentTime = wanted;
      };
      // iOS Safari paints nothing from a never-played video: a muted play/pause forces the first frame.
      const prime = () => {
        vid.muted = true;
        const p = vid.play();
        if (p) p.then(() => { vid.pause(); vid.currentTime = wanted; }).catch(() => {});
      };
      const onFirstGesture = () => { prime(); };
      window.addEventListener("touchstart", onFirstGesture, { once: true, passive: true });
      window.addEventListener("scroll", onFirstGesture, { once: true, passive: true });
      const onMeta = () => { duration = vid.duration || total; prime(); };
      vid.addEventListener("loadedmetadata", onMeta);
      if (vid.readyState >= 1) onMeta();
      gsap.ticker.add(seek);

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => `+=${blueprints.length * 85}%`,
        pin: true,
        scrub: 0.4,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const t = self.progress * (duration || total);
          wanted = Math.min(t, (duration || total) - 0.05);
          if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
          const idx = Math.min(blueprints.length - 1, Math.max(0, Math.floor((t + FADE / 2) / STEP)));
          if (idx !== last) { last = idx; onActive(idx); }
        },
      });
      return () => {
        st.kill();
        gsap.ticker.remove(seek);
        vid.removeEventListener("loadedmetadata", onMeta);
        window.removeEventListener("touchstart", onFirstGesture);
        window.removeEventListener("scroll", onFirstGesture);
      };
    });
    return () => mm.revert();
  }, [mobile, sectionRef, onActive]);

  return (
    <div ref={stage} className="absolute inset-0 overflow-hidden bg-white">
      {mobile !== null && (
      <video
        key={mobile ? "m" : "d"}
        ref={video}
        muted
        playsInline
        preload="auto"
        poster="/architecture/master-plan-color.png"
        disablePictureInPicture
        aria-label="Animated walkthrough of the master plan, parking, landscape, floor plans and retail units"
        className="absolute inset-0 h-full w-full object-contain"
      >
        <source src={mobile ? MOBILE_SRC : DESKTOP_SRC} type="video/mp4" />
      </video>
      )}

      <span className="pointer-events-none absolute inset-x-0 bottom-0 block h-px bg-ink/10">
        <span ref={bar} className="block h-px origin-left scale-x-0 bg-accent" />
      </span>
    </div>
  );
}
