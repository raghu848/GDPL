"use client";

import { RefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import { useSectionTimeline } from "./useSectionTimeline";
import { createHeroTimeline } from "./timelines";
import { useSite } from "@/components/shared/SiteContext";

/** Builds a hero's entrance + scroll choreography and plays the entrance once the site is ready. */
export function useHeroTimeline(root: RefObject<HTMLElement | null>) {
  const { ready } = useSite();
  const intro = useRef<gsap.core.Timeline | null>(null);
  // Seeded at mount: true on client-side navigations, false while the preloader runs.
  const readyRef = useRef(ready);

  useSectionTimeline(root, (el, env) => {
    const tl = createHeroTimeline(el, env);
    intro.current = tl;
    if (readyRef.current) tl.play();
    return () => {
      intro.current = null;
    };
  });

  useEffect(() => {
    readyRef.current = ready;
    if (ready) intro.current?.play();
  }, [ready]);
}
