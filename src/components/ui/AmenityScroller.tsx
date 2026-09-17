"use client";

import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface Amenity {
  name: string;
  icon: string;
}

/** Endless, draggable marquee. */
function Marquee({ children, baseVelocity }: { children: ReactNode; baseVelocity: number }) {
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
          <div key={copy} className="flex gap-6 md:gap-10 px-3 md:px-5" aria-hidden={copy > 0}>
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

export default function AmenityScroller({ amenities }: { amenities: Amenity[] }) {
  return (
    <div className="relative w-full overflow-hidden border-y border-ink/10 py-14 md:py-20" data-cursor="hover">
      <Marquee baseVelocity={-0.5}>
        {amenities.map((amenity) => (
          <div key={amenity.name} className="group flex w-[150px] md:w-[180px] flex-col items-center gap-6">
            <div className="relative flex h-24 w-24 md:h-28 md:w-28 items-center justify-center rounded-full border border-ink/15 transition-[border-color,background-color] duration-700 group-hover:border-accent group-hover:bg-ink/[0.03]">
              <div className="relative h-9 w-9 md:h-10 md:w-10">
                <Image
                  src={amenity.icon}
                  alt=""
                  fill
                  sizes="40px"
                  className="object-contain opacity-70 transition-[opacity,transform] duration-700 group-hover:scale-110 group-hover:opacity-100"
                />
              </div>
            </div>
            <span className="eyebrow text-[0.6rem] text-center whitespace-normal leading-relaxed text-ink/70 transition-colors duration-500 group-hover:text-ink">
              {amenity.name}
            </span>
          </div>
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-40 bg-gradient-to-r from-linen to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-40 bg-gradient-to-l from-linen to-transparent" />
    </div>
  );
}
