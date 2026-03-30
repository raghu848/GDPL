"use client";

import { motion, useInView, Variants } from "framer-motion";
import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ShutterRevealProps {
    children: ReactNode;
    className?: string;
    direction?: "up" | "down" | "left" | "right";
    delay?: number;
}

export default function ShutterReveal({ children, className, direction = "up", delay = 0 }: ShutterRevealProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const variants: Variants = {
        hidden: {
            clipPath: direction === "up" ? "inset(100% 0 0 0)" :
                direction === "down" ? "inset(0 0 100% 0)" :
                    direction === "left" ? "inset(0 0 0 100%)" :
                        "inset(0 100% 0 0)"
        },
        visible: {
            clipPath: "inset(0% 0 0 0)",
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay }
        }
    };

    return (
        <div ref={ref} className={cn("relative overflow-hidden", className)}>
            <motion.div
                variants={variants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="h-full w-full"
            >
                {children}
            </motion.div>
        </div>
    );
}
