"use client";

import { useEffect, useRef } from "react";

/**
 * Videos whose play() got rejected (Low Power Mode, a strict autoplay policy,
 * or any other reason the browser wants a real user gesture first). We retry
 * them on the visitor's very first tap/scroll anywhere on the page, so they
 * never have to hit the tiny native play button themselves.
 */
const pending = new Set<HTMLVideoElement>();
let unlockAttached = false;

function tryPlay(video: HTMLVideoElement) {
  if (document.hidden) return;
  const result = video.play();
  if (result && typeof result.catch === "function") {
    result.then(() => pending.delete(video)).catch(() => pending.add(video));
  }
}

function isNearViewport(video: HTMLVideoElement) {
  const r = video.getBoundingClientRect();
  const margin = window.innerHeight;
  return r.bottom > -margin && r.top < window.innerHeight + margin;
}

function attachUnlock() {
  if (unlockAttached) return;
  unlockAttached = true;
  const unlock = () => pending.forEach(tryPlay);
  (["touchstart", "pointerdown", "click", "scroll", "keydown"] as const).forEach((evt) =>
    document.addEventListener(evt, unlock, { passive: true, capture: true })
  );
}

type Options = {
  threshold?: number;
  /** Set false to keep the video running once it starts, even after it scrolls offscreen. */
  pauseOnLeave?: boolean;
  /**
   * How far outside the real viewport to start buffering/playing early, so
   * the video is already running by the time it's actually visible instead of
   * stalling for a couple of seconds first — mobile connections are often too
   * slow to fetch a multi-megabyte video the instant it scrolls into frame.
   */
  rootMargin?: string;
};

/**
 * Mobile browsers silently drop `autoPlay` on offscreen video and never resume
 * it on their own — the visitor is left staring at a paused first frame. This
 * drives playback from an IntersectionObserver instead: start buffering and
 * playing while the video is still approaching (per `rootMargin`), so it's
 * already running by the time it's actually on screen, and — with
 * `pauseOnLeave` (the default) — pause the instant it scrolls fully away to
 * save battery and bandwidth on sections the visitor never reaches. Any
 * play() rejected outright (Low Power Mode, etc.) is retried on the next
 * user interaction.
 */
export function useVideoInView<T extends HTMLVideoElement>({
  threshold = 0,
  pauseOnLeave = true,
  rootMargin = "60% 0px 60% 0px",
}: Options = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    attachUnlock();

    // React's SSR/hydration doesn't reliably carry the `muted` JSX attribute
    // over to the real DOM property in time for the browser's autoplay check —
    // mobile browsers require video.muted to already be true at that moment,
    // so we force both explicitly before ever attempting play().
    video.muted = true;
    video.defaultMuted = true;
    // Kick the fetch off immediately if it's anywhere near the viewport,
    // rather than waiting on the observer's first (async) callback.
    if (video.preload !== "none" && isNearViewport(video)) video.load();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) tryPlay(video);
        else if (pauseOnLeave) video.pause();
      },
      { threshold, rootMargin }
    );
    observer.observe(video);

    const onVisibility = () => {
      if (document.hidden) {
        if (pauseOnLeave) video.pause();
      } else if (isNearViewport(video)) {
        tryPlay(video);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      pending.delete(video);
    };
  }, [threshold, pauseOnLeave, rootMargin]);

  return ref;
}
