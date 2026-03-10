"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ChevronDown } from "lucide-react";

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
            className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black"
        >
            {/* Video scaling layer */}
            <motion.div
                style={{ y: y1, scale }}
                className="absolute inset-0 z-0 h-full w-full"
            >
                <div className="absolute inset-0 bg-black/20 z-10" />
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                >
                    <source src="/images/GDPL 1st (1080p No Audio).mp4" type="video/mp4" />
                    {/* Fallback to images if video fails */}
                    <picture>
                        <source media="(max-width: 768px)" srcSet="/images/hero_mobile.jpg" />
                        <img
                            src="/images/herosection.png"
                            alt="GDPL Mohali Architecture"
                            className="w-full h-full object-cover"
                        />
                    </picture>
                </video>
            </motion.div>
        </section>
    );
}
