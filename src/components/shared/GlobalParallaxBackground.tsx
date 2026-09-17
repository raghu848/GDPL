"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useRef, useEffect } from "react";
import Image from "next/image";

export default function AboutParallaxBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Mouse Parallax
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothMouseX = useSpring(mouseX, { damping: 50, stiffness: 400 });
    const smoothMouseY = useSpring(mouseY, { damping: 50, stiffness: 400 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            mouseX.set((clientX / innerWidth) - 0.5);
            mouseY.set((clientY / innerHeight) - 0.5);
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Speed transforms for different layers
    const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
    const midY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
    const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);
    
    const mouseX1 = useTransform(smoothMouseX, [-0.5, 0.5], ["-20px", "20px"]);
    const mouseY1 = useTransform(smoothMouseY, [-0.5, 0.5], ["-20px", "20px"]);
    
    const mouseX2 = useTransform(smoothMouseX, [-0.5, 0.5], ["-50px", "50px"]);
    const mouseY2 = useTransform(smoothMouseY, [-0.5, 0.5], ["-50px", "50px"]);

    return (
        <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#0A0204]">
            {/* Layer 1: Background Base (The Landscape) */}
            <motion.div style={{ y: bgY, x: mouseX1 }} className="absolute inset-0 z-0 opacity-40">
                <Image
                    src="/png/1035.jpg"
                    alt="Background Landscape"
                    fill
                    className="object-cover scale-125"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0A0204] via-transparent to-[#0A0204]" />
            </motion.div>

            {/* Layer 2: Midground Buildings (Vector) - Repeated for depth */}
            <motion.div 
                style={{ y: midY, x: mouseX2 }} 
                className="absolute bottom-[-10%] right-[-10%] w-[90%] h-[90%] z-10 opacity-30"
            >
                <Image
                    src="/png/building_vector.png"
                    alt="Midground Building 1"
                    fill
                    className="object-contain object-bottom brightness-150 contrast-125"
                />
            </motion.div>

            <motion.div 
                style={{ y: useTransform(scrollYProgress, [0, 1], ["10%", "50%"]), x: useTransform(smoothMouseX, [-0.5, 0.5], ["30px", "-30px"]) }} 
                className="absolute bottom-[-5%] left-[-20%] w-[70%] h-[70%] z-5 opacity-15 blur-[1px]"
            >
                <Image
                    src="/png/building_vector.png"
                    alt="Midground Building 2"
                    fill
                    className="object-contain object-bottom scale-x-[-1] brightness-50"
                />
            </motion.div>

            {/* Layer 3: Foreground Buildings (Draft) */}
            <motion.div 
                style={{ y: fgY, x: useTransform(smoothMouseX, [-0.5, 0.5], ["-80px", "80px"]) }} 
                className="absolute bottom-[-30%] left-[-5%] w-full h-[100%] z-20 opacity-25"
            >
                <Image
                    src="/png/building_draft.png"
                    alt="Foreground Building"
                    fill
                    className="object-contain object-bottom scale-150 brightness-200"
                />
            </motion.div>

            {/* Atmospheric Layer: Floating Particles / Fog */}
            <motion.div 
                animate={{ 
                    x: [0, 50, 0],
                    y: [0, 30, 0]
                }}
                transition={{ 
                    duration: 20, 
                    repeat: Infinity, 
                    ease: "linear" 
                }}
                className="absolute inset-0 z-30 opacity-40"
            >
                <div className="absolute top-[20%] left-[10%] w-64 h-64 bg-[#D4AF37]/10 blur-[100px] rounded-full" />
                <div className="absolute bottom-[30%] right-[20%] w-96 h-96 bg-[#D4AF37]/5 blur-[120px] rounded-full" />
            </motion.div>

            {/* Global Grain Overlay */}
            <div className="absolute inset-0 z-50 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
        </div>
    );
}
