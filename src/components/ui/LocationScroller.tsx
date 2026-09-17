"use client";

import { motion, useAnimationFrame, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";
import { LocationAdvantage } from "@/lib/projectsData";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

/** Endless, draggable track. */
function Track({ children, baseVelocity }: { children: ReactNode; baseVelocity: number }) {
  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  useAnimationFrame((_, delta) => {
    baseX.set(baseX.get() + baseVelocity * (delta / 1000));
  });

  return (
    <div className="flex flex-nowrap whitespace-nowrap">
      <motion.div
        className="flex flex-nowrap whitespace-nowrap cursor-grab active:cursor-grabbing"
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.05}
        onDrag={(_, info) => baseX.set(baseX.get() + info.delta.x * 0.01)}
      >
        {[0, 1, 2, 3].map((copy) => (
          <div key={copy} className="flex gap-5 md:gap-6 px-2.5 md:px-3" aria-hidden={copy > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function LocationScroller({ items }: { items: LocationAdvantage[] }) {
  return (
    <div className="relative w-full overflow-hidden py-4" data-cursor="hover">
      <Track baseVelocity={-0.8}>
        {items.map((loc) => (
          <article key={loc.name} className="group w-[280px] md:w-[340px] shrink-0 whitespace-normal">
            {loc.image && (
              <div className="relative aspect-[4/3] overflow-hidden bg-linen">
                <Image
                  src={loc.image}
                  alt={loc.imageAlt || loc.name}
                  fill
                  sizes="340px"
                  draggable={false}
                  className="object-cover grayscale-[35%] transition-[transform,filter] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                <span className="absolute top-4 left-4 eyebrow text-[0.58rem] px-3 py-1.5 rounded-full bg-ink/55 backdrop-blur-md text-bone/95">
                  {loc.category}
                </span>
              </div>
            )}
            <div className="flex items-end justify-between gap-4 border-b border-ink/12 py-5">
              <h3 className="font-display text-[1.35rem] leading-tight tracking-[-0.01em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1">
                {loc.name}
              </h3>
              <span className="eyebrow text-[0.62rem] text-accent whitespace-nowrap">~ {loc.distance}</span>
            </div>
          </article>
        ))}
      </Track>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-12 md:w-40 bg-gradient-to-r from-sand to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-12 md:w-40 bg-gradient-to-l from-sand to-transparent" />
    </div>
  );
}
