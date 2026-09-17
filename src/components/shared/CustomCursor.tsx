"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

type Mode = "default" | "hover" | "view";

/** Desktop-only cursor: a small dot that grows over links/media and labels project cards. */
export default function CustomCursor() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const mode = useRef<Mode>("default");

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 1024px)");
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled || !wrap.current || !dot.current) return;
    const html = document.documentElement;
    html.classList.add("has-custom-cursor");

    const xTo = gsap.quickTo(wrap.current, "x", { duration: 0.45, ease: "power3.out" });
    const yTo = gsap.quickTo(wrap.current, "y", { duration: 0.45, ease: "power3.out" });

    const apply = (next: Mode, label = "") => {
      if (mode.current === next && next !== "view") return;
      mode.current = next;
      const d = dot.current!;
      if (labelRef.current) labelRef.current.textContent = label;
      d.dataset.mode = next;
      if (wrap.current) wrap.current.dataset.mode = next;
      gsap.to(d, {
        scale: next === "view" ? 1 : next === "hover" ? 0.5 : 0.11,
        duration: 0.5,
        ease: "expo.out",
      });
      gsap.to(labelRef.current, { opacity: next === "view" ? 1 : 0, duration: 0.3 });
    };

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      gsap.to(wrap.current, { opacity: 1, duration: 0.3, overwrite: "auto" });
    };
    const onOver = (e: PointerEvent) => {
      const el = (e.target as Element).closest<HTMLElement>("[data-cursor], a, button, input, textarea, select");
      if (!el) return apply("default");
      const kind = el.dataset.cursor;
      if (kind === "view") return apply("view", el.dataset.cursorLabel || "View Project");
      if (kind === "none") return apply("default");
      apply("hover");
    };
    const onLeave = () => gsap.to(wrap.current, { opacity: 0, duration: 0.3 });

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      html.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled]);

  // Reset on navigation so a stale "view" state never lingers.
  useEffect(() => {
    if (!enabled || !dot.current) return;
    mode.current = "hover";
    gsap.to(dot.current, { scale: 0.11, duration: 0.4 });
    gsap.set(labelRef.current, { opacity: 0 });
    mode.current = "default";
  }, [pathname, enabled]);

  if (!enabled) return null;

  return (
    // Blend mode lives on the fixed wrapper (the stacking context) so the dot inverts against the page:
    // light on dark sections, dark on light sections. "View" labels switch back to a normal solid fill.
    <div
      ref={wrap}
      data-mode="default"
      className="pointer-events-none fixed left-0 top-0 z-[200] mix-blend-difference data-[mode=view]:mix-blend-normal"
      style={{ opacity: 0 }}
      aria-hidden
    >
      <div
        ref={dot}
        data-mode="default"
        className="absolute -left-11 -top-11 flex h-22 w-22 items-center justify-center rounded-full bg-bone data-[mode=view]:bg-accent-soft"
        style={{ transform: "scale(0.11)" }}
      >
        <span ref={labelRef} className="eyebrow text-[0.6rem] tracking-[0.18em] text-ink opacity-0 whitespace-nowrap">
          View Project
        </span>
      </div>
    </div>
  );
}
