"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ImageRevealSection() {
    const containerRef = useRef<HTMLElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const scaleImage = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
    const yParallax = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <section ref={containerRef} className="pb-24 pt-12 bg-transparent relative z-10 w-full flex flex-col items-center justify-center overflow-hidden">
            <motion.div
                style={{ y: yParallax }}
                className="w-full max-w-[90rem] mx-auto px-4 md:px-8"
            >
                <div className="aspect-[16/9] md:aspect-[21/9] w-full rounded-[2.5rem] overflow-hidden bg-stone/5 border border-white/5 p-2 shadow-2xl group hover:border-noir/30 transition-colors duration-500 backdrop-blur-md">
                    <div className="w-full h-full rounded-[2rem] overflow-hidden relative">
                        <motion.img
                            style={{ scale: scaleImage }}
                            src="/images/herosection.png"
                            alt="Premium Real Estate"
                            className="w-full h-full object-cover origin-center transition-transform duration-[1.5s] group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone/80 via-transparent to-transparent opacity-80" />

                        {/* Text Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white pointer-events-none">
                            <h3 className="font-serif text-3xl md:text-5xl font-light tracking-wide capitalize">
                                Experience The Regal Legacy
                            </h3>
                        </div>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
