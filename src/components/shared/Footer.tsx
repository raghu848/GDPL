"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { drawLines, fadeUp, revealLines, sectionTimeline } from "@/animations/primitives";
import { NAV_LINKS } from "./Navbar";
import { useLenis } from "./SmoothScroll";

const SOCIALS = [
  { name: "Instagram", href: "#" },
  { name: "Facebook", href: "#" },
  { name: "YouTube", href: "#" },
];

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  const lenis = useLenis();

  useSectionTimeline(root, (el, env) => {
    const tl = sectionTimeline(el, "top 85%");
    drawLines(tl, el.querySelectorAll("[data-rule]"), env);
    fadeUp(tl, el.querySelectorAll("[data-fade]"), env, { position: 0.2, stagger: 0.06, y: 30 });
    revealLines(tl, el.querySelectorAll("[data-line]"), env, { position: 0.3, duration: 1.6 });
  });

  const toTop = () => (lenis ? lenis.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0, behavior: "smooth" }));

  return (
    <footer ref={root} className="tone-light relative bg-linen text-ink overflow-hidden">
      <div className="shell pt-24 md:pt-32">
        <div className="hairline" data-rule />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-8 py-16 md:py-24">
          <div className="md:col-span-5 flex flex-col gap-8" data-fade>
            <Image src="/images/GDPL_Logo_dark.png" alt="GDPL" width={160} height={50} className="h-11 w-auto self-start" />
            <p className="max-w-sm text-muted leading-relaxed">
              We know everything you need about the Mohali property market. Building trust for over a decade.
            </p>
          </div>

          <div className="md:col-span-2 flex flex-col gap-5" data-fade>
            <span className="eyebrow text-muted">Navigate</span>
            <ul className="flex flex-col gap-3">
              {NAV_LINKS.map((l) => (
                <li key={l.name}>
                  <Link href={l.href} className="link-underline text-ink/85 hover:text-ink transition-colors inline-block py-1.5 -my-1.5">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 flex flex-col gap-5" data-fade>
            <span className="eyebrow text-muted">Contact</span>
            <div className="flex flex-col gap-3">
              <a href="tel:+917789000077" className="link-underline self-start text-ink/85 hover:text-ink py-1.5 -my-1.5">+91 77890 00077</a>
              <a href="mailto:info@gdplmohali.in" className="link-underline self-start text-ink/85 hover:text-ink py-1.5 -my-1.5">info@gdplmohali.in</a>
              <p className="text-muted leading-relaxed mt-2">
                Regal Heights, GH-11D, Sector 91,
                <br />
                Sahibzada Ajit Singh Nagar, Punjab 140307
              </p>
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-5" data-fade>
            <span className="eyebrow text-muted">Follow</span>
            <ul className="flex flex-col gap-3">
              {SOCIALS.map((s) => (
                <li key={s.name}>
                  <Link href={s.href} className="link-underline text-ink/85 hover:text-ink inline-block py-1.5 -my-1.5">{s.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div aria-hidden className="select-none pointer-events-none">
          {/* The mask carries the font size so its em padding scales with the lettering —
              otherwise it pads by ~1px and crops the descender of the "g". */}
          <span className="line-mask font-display text-[clamp(3.25rem,13.5vw,15rem)] pt-[0.17em] pb-[0.19em]">
            <span data-line className="line-inner leading-[0.9] tracking-[-0.05em] text-ink/[0.14] whitespace-nowrap">
              Building Dreams
            </span>
          </span>
        </div>

        <div className="hairline mt-10" data-rule />
        <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-6 py-8 text-xs tracking-[0.08em] text-muted">
          <p>&copy; {new Date().getFullYear()} Gdpl Mohali. All Rights Reserved.</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
            <Link href="#" className="link-underline hover:text-ink py-2 -my-2">Privacy Policy</Link>
            <Link href="https://growdient.com/" className="link-underline hover:text-ink py-2 -my-2">Made by Growdient</Link>
            <button type="button" onClick={toTop} className="link-underline eyebrow text-[0.65rem] text-ink/80 hover:text-ink py-2 -my-2">
              Back to top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
