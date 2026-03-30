"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

export default function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();

    // Parallax and scaling effects
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-stone"
        >
            {/* Video scaling layer */}
            <motion.div
                style={{ y: y1, scale }}
                className="absolute inset-0 z-0 h-full w-full"
            >
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-b from-stone/20 via-transparent to-stone/40" />
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster="/images/herosection.png"
                    className="w-full h-full object-cover"
                >
                    <source src="/images/GDPL 1st (1080p No Audio).mp4" type="video/mp4" />
                    {/* Fallback to optimized images if video fails */}
                    <div className="relative w-full h-full">
                        <Image
                            src="/images/herosection.png"
                            alt="GDPL Mohali Architecture"
                            fill
                            priority
                            className="object-cover"
                            sizes="100vw"
                        />
                    </div>
                </video>
            </motion.div>

            {/* Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                style={{ opacity }}
                className="absolute bottom-10 left-1/2 z-20 bounce-indicator flex flex-col items-center gap-2"
            >
                <span className="text-[8px] uppercase tracking-[0.4em] text-noir font-bold">Scroll</span>
                <ChevronDown className="w-4 h-4 text-noir" />
            </motion.div>
        </section>
    );
}
