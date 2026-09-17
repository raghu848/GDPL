"use client";

import { useEffect, useLayoutEffect, RefObject, DependencyList } from "react";
import gsap from "gsap";
import { registerGsap, MotionEnv } from "./primitives";

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Builds a section's GSAP choreography inside gsap.matchMedia so that
 * tweens + ScrollTriggers are scoped, rebuilt on breakpoint / reduced-motion
 * changes, and fully reverted when the component unmounts.
 */
export function useSectionTimeline(
  scope: RefObject<HTMLElement | null>,
  build: (root: HTMLElement, env: MotionEnv) => unknown,
  deps: DependencyList = []
) {
  useIsoLayoutEffect(() => {
    const root = scope.current;
    if (!root) return;
    registerGsap();

    const mm = gsap.matchMedia();
    mm.add(
      { desktop: "(min-width: 1024px)", reduce: "(prefers-reduced-motion: reduce)" },
      (ctx) => {
        const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };
        const cleanup = build(root, { desktop, reduce, k: desktop ? 1 : 0.6 });
        return typeof cleanup === "function" ? (cleanup as () => void) : undefined;
      },
      root
    );

    return () => mm.revert();
  }, deps);
}
