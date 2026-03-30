// "use client";

// import { useEffect, useRef, useState } from "react";
// import { motion, useInView } from "framer-motion";

// interface AnimatedCounterProps {
//     target: number;
//     suffix?: string;
//     prefix?: string;
//     duration?: number;
//     className?: string;
//     labelClassName?: string;
//     label: string;
//     gold?: boolean;
// }

// export default function AnimatedCounter({
//     target,
//     suffix = "",
//     prefix = "",
//     duration = 2,
//     className = "",
//     labelClassName = "",
//     label,
//     gold = false,
// }: AnimatedCounterProps) {
//     const ref = useRef<HTMLDivElement>(null);
//     const isInView = useInView(ref, { once: true, amount: 0.5 });
//     const [count, setCount] = useState(0);
//     const [hasAnimated, setHasAnimated] = useState(false);

//     useEffect(() => {
//         if (!isInView) {
//             setCount(0);
//             setHasAnimated(false);
//             return;
//         }
//         if (hasAnimated) return;

//         setHasAnimated(true);
//         const startTime = performance.now();
//         const durationMs = duration * 1000;

//         const animate = (currentTime: number) => {
//             const elapsed = currentTime - startTime;
//             const progress = Math.min(elapsed / durationMs, 1);

//             // Ease out cubic
//             const eased = 1 - Math.pow(1 - progress, 3);
//             const currentCount = Math.round(eased * target);

//             setCount(currentCount);

//             if (progress < 1) {
//                 requestAnimationFrame(animate);
//             }
//         };

//         requestAnimationFrame(animate);
//     }, [isInView, target, duration, hasAnimated]);

//     return (
//         <div ref={ref} className="space-y-4">
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
//                 transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
//                 className={`text-5xl font-black tracking-tighter ${gold ? "text-gold-gradient" : ""} ${className}`}
//             >
//                 {prefix}{count}{suffix}
//             </motion.div>
//             <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={isInView ? { opacity: 1 } : { opacity: 0 }}
//                 transition={{ duration: 0.8, delay: 0.3 }}
//                 className={`text-[10px] uppercase tracking-[0.3em] text-muted font-bold ${labelClassName}`}
//             >
//                 {label}
//             </motion.div>
//         </div>
//     );
// }
