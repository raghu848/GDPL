"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";

interface DragCarouselProps {
    images: string[];
}

export default function DragCarousel({ images }: DragCarouselProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [carouselWidth, setCarouselWidth] = useState(0);

    useEffect(() => {
        if (containerRef.current) {
            setCarouselWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
        }

        const handleResize = () => {
            if (containerRef.current) {
                setCarouselWidth(containerRef.current.scrollWidth - containerRef.current.offsetWidth);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [images]);

    return (
        <div className="relative overflow-hidden py-8 cursor-grab active:cursor-grabbing w-full">
            <motion.div
                ref={containerRef}
                className="flex gap-6 px-6 md:px-12 w-max"
                drag="x"
                dragConstraints={{ right: 0, left: -carouselWidth }}
                whileTap={{ cursor: "grabbing" }}
            >
                {images.map((img, idx) => (
                    <motion.div
                        key={idx}
                        className="relative h-[400px] md:h-[600px] w-[300px] md:w-[450px] shrink-0 overflow-hidden rounded-2xl group"
                    >
                        <img
                            src={img}
                            alt={`Carousel image ${idx + 1}`}
                            className="w-full h-full object-cover pointer-events-none group-hover:scale-105 transition-transform duration-700"
                        />
                    </motion.div>
                ))}
            </motion.div>
            <div className="absolute inset-0 pointer-events-none border-y border-text-primary-dark/10 mix-blend-overlay"></div>
        </div>
    );
}
