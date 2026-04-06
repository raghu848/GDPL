"use client";

import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";
import Image from "next/image";
import { useRef, ReactNode } from "react";

// Local implementation of wrap to avoid dependency issues
const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface Amenity {
    name: string;
    icon: string;
}

interface AmenityScrollerProps {
    amenities: Amenity[];
}

interface ParallaxProps {
    children: ReactNode;
    baseVelocity: number;
}

function ParallaxText({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });
    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2], {
        clamp: false
    });

    /**
     * This is a magic wrapping for the length of the text - you
     * have to replace for wrapping that works for you or dynamically
     * calculate
     */
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        /**
         * This is what controls the direction of the scroll
         * depending on the scroll velocity
         */
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    /**
     * The number of times to repeat the child text should be enough to
     * fill the screen width and allow for seamless looping.
     */
    return (
        <div className="flex flex-nowrap whitespace-nowrap">
            <motion.div className="flex flex-nowrap whitespace-nowrap" style={{ x }}>
                <div className="flex gap-16 px-12">{children}</div>
                <div className="flex gap-16 px-12">{children}</div>
                <div className="flex gap-16 px-12">{children}</div>
                <div className="flex gap-16 px-12">{children}</div>
            </motion.div>
        </div>
    );
}

export default function AmenityScroller({ amenities }: AmenityScrollerProps) {
    return (
        <div className="relative w-full overflow-hidden py-20 bg-noir/5 backdrop-blur-md border-y border-white/5">
            <ParallaxText baseVelocity={-1}>
                {amenities.map((amenity, idx) => (
                    <div
                        key={`${amenity.name}-${idx}`}
                        className="flex flex-col items-center gap-6 group min-w-[160px]"
                    >
                        <div className="relative">
                            {/* Golden Glow Background */}
                            <div className="absolute inset-0 bg-[#D4AF37]/0 rounded-full blur-2xl group-hover:bg-[#D4AF37]/15 transition-all duration-700" />
                            
                            <div className="relative w-24 h-24 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center p-6 transition-all duration-700 group-hover:bg-noir group-hover:border-[#D4AF37]/50 group-hover:-translate-y-4 shadow-2xl">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={amenity.icon}
                                        alt={amenity.name}
                                        fill
                                        className="object-contain filter invert opacity-100 brightness-200 group-hover:scale-110 transition-all duration-700 drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <span className="block text-[11px] font-black tracking-[0.4em] uppercase text-white/30 group-hover:text-white transition-all duration-500 mb-1">
                                {amenity.name}
                            </span>
                            <div className="w-0 h-[1px] bg-[#D4AF37] mx-auto group-hover:w-full transition-all duration-700 opacity-50" />
                        </div>
                    </div>
                ))}
            </ParallaxText>

            {/* Premium Gradient Mask Overlays */}
            {/* Removed as per previous request, but subtle ones can be added back if it feels too 'raw' */}
        </div>
    );
}
