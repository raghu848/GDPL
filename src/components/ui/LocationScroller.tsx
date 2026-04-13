"use client";

import { motion, useAnimationFrame, useMotionValue, useTransform, useSpring, useVelocity } from "framer-motion";
import Image from "next/image";
import { LocationAdvantage } from "@/lib/projectsData";
import { GraduationCap, HeartPulse, Building2, ShoppingBag, Plane, Clock, ChevronRight } from "lucide-react";
import { useRef, useState, ReactNode } from "react";

interface LocationScrollerProps {
    items: LocationAdvantage[];
}

const getCategoryIcon = (category: string) => {
    switch (category) {
        case "EDUCATION": return <GraduationCap className="w-3 h-3" />;
        case "HEALTHCARE": return <HeartPulse className="w-3 h-3" />;
        case "IT & BUSINESS": return <Building2 className="w-3 h-3" />;
        case "LIFESTYLE": return <ShoppingBag className="w-3 h-3" />;
        case "CONNECTIVITY": return <Plane className="w-3 h-3" />;
        default: return <Building2 className="w-3 h-3" />;
    }
};

const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min;
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

interface ParallaxProps {
    children: ReactNode;
    baseVelocity: number;
}

function ScrollingContainer({ children, baseVelocity = 100 }: ParallaxProps) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScrollProxy(); // Custom hook or just use global scroll
    
    // Manual Drag handling
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef<number>(1);
    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
        baseX.set(baseX.get() + moveBy);
    });

    return (
        <div className="flex flex-nowrap whitespace-nowrap">
            <motion.div 
                className="flex flex-nowrap whitespace-nowrap cursor-grab active:cursor-grabbing" 
                style={{ x }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.05}
                onDrag={(e, info) => {
                    baseX.set(baseX.get() + info.delta.x * 0.01);
                }}
            >
                <div className="flex gap-6 px-3">{children}</div>
                <div className="flex gap-6 px-3">{children}</div>
                <div className="flex gap-6 px-3">{children}</div>
                <div className="flex gap-6 px-3">{children}</div>
            </motion.div>
        </div>
    );
}

// Simple proxy for scrolly since we don't need velocity factoring here for now
function useScrollProxy() {
    return { scrollY: useMotionValue(0) };
}

export default function LocationScroller({ items }: LocationScrollerProps) {
    return (
        <div className="relative w-full overflow-hidden py-10">
            {/* Gradient Fades for edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-noir to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-noir to-transparent pointer-events-none" />

            <ScrollingContainer baseVelocity={-0.8}>
                {items.map((loc, idx) => (
                    <div
                        key={idx}
                        className="flex-shrink-0 w-[300px] md:w-[340px] group"
                    >
                        <div className="relative rounded-3xl overflow-hidden bg-noir/40 border border-white/5 transition-all duration-500 hover:border-[#D4AF37]/30 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]">
                            {/* Image Section */}
                            {loc.image && (
                                <div className="relative h-48 w-full overflow-hidden">
                                    <Image
                                        src={loc.image}
                                        alt={loc.imageAlt || loc.name}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-noir/80 via-transparent to-transparent" />
                                    
                                    {/* Time Overlay (Top Right) */}
                                    <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                                        <Clock className="w-3 h-3 text-[#D4AF37]" />
                                        <span className="text-[10px] font-bold text-white tracking-widest">~ {loc.distance}</span>
                                    </div>

                                    {/* Category Badge (Bottom Left of Image) */}
                                    <div className="absolute bottom-4 left-4 bg-noir/80 backdrop-blur-md px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-lg border border-[#D4AF37]/30 text-[#D4AF37]">
                                        {getCategoryIcon(loc.category)}
                                        <span className="text-[9px] font-black tracking-[0.2em]">{loc.category}</span>
                                    </div>
                                </div>
                            )}

                            {/* Info Section */}
                            <div className="p-6 bg-gradient-to-b from-noir/60 to-noir/90">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37]/10 group-hover:text-white transition-all duration-500">
                                            {getCategoryIcon(loc.category)}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white leading-tight mb-1 group-hover:text-[#D4AF37] transition-colors font-playfair">
                                                {loc.name}
                                            </h3>
                                            <p className="text-[10px] text-white/40 tracking-[0.1em] font-light font-playfair">
                                                ~ {loc.distance} drive
                                            </p>
                                        </div>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-[#D4AF37] group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </ScrollingContainer>
        </div>
    );
}
