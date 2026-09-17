"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { createTeamTimeline } from "@/animations/timelines";
import RevealLines from "@/components/ui/RevealLines";
import { Arrow } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const LEADERS = [
  {
    name: "Mr. B.S. Gill",
    role: "Visionary Leader & Mentor",
    image: "/images/mr bs gill.jpg",
    bio: "Our vision is to create developments that exceed expectations and leave a lasting impact on our customers and society.",
  },
  {
    name: "Mr. Nardeep Singh",
    role: "Driving Innovation & Growth",
    image: "/images/nardeep singh.jpg",
    bio: "We focus on projects that uphold customer trust while paving the way for a brighter, more sustainable future.",
  },
];

export default function Team() {
  const root = useRef<HTMLElement>(null);
  useSectionTimeline(root, createTeamTimeline);

  return (
    <section ref={root} id="team" className="relative bg-bone text-ink py-28 md:py-44">
      <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16">
        <div className="lg:col-span-5 flex flex-col">
          <div className="flex items-center gap-6 mb-10">
            <span data-index className="eyebrow text-muted">Leadership</span>
          </div>
          <RevealLines className="display-lg" lines={["The people", "behind the", <em key="p" className="italic text-accent">promise.</em>]} />
          <p data-fade className="mt-10 body-lg text-muted max-w-[38ch]">
            Behind GDPL lies a team of dedicated professionals — from architects to client advisors — united by a single goal:
            building spaces that inspire.
          </p>
        </div>

        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-14">
          {LEADERS.map((l, i) => (
            <Link key={l.name} href="/about" data-card data-cursor="hover" className={cn("group flex flex-col", i === 1 && "sm:mt-32")}>
              <div data-frame data-dir="up" className="media-frame aspect-[3/4] w-full">
                <div data-media className="absolute inset-0">
                  <Image
                    src={l.image}
                    alt={`Portrait of ${l.name}, ${l.role} at GDPL`}
                    fill
                    sizes="(min-width: 1024px) 28vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top grayscale transition-[filter,transform] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:scale-[1.04]"
                  />
                </div>
              </div>
              <div className="mt-6 flex items-start justify-between gap-4">
                <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                  <h3 className="font-display text-[clamp(1.6rem,2.2vw,2.25rem)] leading-tight tracking-[-0.02em]">{l.name}</h3>
                  <p className="mt-2 eyebrow text-[0.65rem] text-muted">{l.role}</p>
                </div>
                <span className="mt-3 text-accent opacity-0 -translate-x-3 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-0">
                  <Arrow />
                </span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted max-w-[40ch]">{l.bio}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
