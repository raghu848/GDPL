"use client";

import Link from "next/link";
import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export function Arrow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 26 12" fill="none" stroke="currentColor" strokeWidth="1" className={cn("h-3 w-[26px]", className)} aria-hidden>
      <path d="M0 6h24M19 1l5 5-5 5" />
    </svg>
  );
}

type Props = {
  href: string;
  children: ReactNode;
  variant?: "outline" | "solid" | "dark";
  className?: string;
  showArrow?: boolean;
  target?: string;
};

/** CTA with a fill wipe, arrow nudge and a very restrained magnetic pull. */
export default function MagneticButton({ href, children, variant = "outline", className, showArrow = true, target }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    const xTo = gsap.quickTo(el, "x", { duration: 0.7, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.7, ease: "power3.out" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.12);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.18);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerleave", leave);
      gsap.killTweensOf(el);
    };
  }, []);

  const classes = cn(
    "btn-premium",
    variant === "solid" && "btn-premium--solid",
    variant === "dark" && "btn-premium--dark",
    className
  );
  const content = (
    <>
      <span className="btn-label">{children}</span>
      {showArrow && (
        <span className="btn-arrow">
          <Arrow />
        </span>
      )}
    </>
  );

  if (/^(https?:|mailto:|tel:)/.test(href)) {
    return (
      <a ref={ref} href={href} target={target ?? "_blank"} rel="noopener noreferrer" className={classes} data-cursor="hover">
        {content}
      </a>
    );
  }
  return (
    <Link ref={ref} href={href} className={classes} data-cursor="hover">
      {content}
    </Link>
  );
}
