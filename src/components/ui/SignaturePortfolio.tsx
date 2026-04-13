"use client";

import { motion, useSpring, useTransform, useScroll, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { projects, Project } from "@/lib/projectsData";
import { cn } from "@/lib/utils";

export default function SignaturePortfolio() {
    const [activeIndex, setActiveIndex] = useState<number | null>(0); // Default to first project for visual presence
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Heading parallax
    const rawX = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [300, 0, 0, 300]);
    const translateX = useSpring(rawX, { stiffness: 100, damping: 30 });
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <section
            ref={containerRef}
            className="py-16 md:py-24 bg-transparent relative overflow-hidden"
        >
            {/* Heading - Always Visible & Center-Aligned on Mobile, Left-Aligned on Desktop */}
            <div className="container mx-auto px-6 mb-12 md:mb-16">
                {/* Desktop Animated Parallax */}
                <motion.div style={{ x: translateX, opacity }} className="hidden md:block">
                    <p className="section-label mb-4">Our Portfolio</p>
                    <h2 className="text-5xl md:text-8xl font-normal capitalize tracking-normal leading-[0.9] text-white font-serif">
                        <span className="text-[#D4AF37] font-serif">Signature</span> Projects
                    </h2>
                </motion.div>
                
                {/* Mobile Static */}
                <motion.div style={{ opacity }} className="md:hidden">
                    <p className="section-label mb-4">Our Portfolio</p>
                    <h2 className="text-5xl md:text-8xl font-normal capitalize tracking-normal leading-[0.9] text-white font-serif">
                        <span className="text-[#D4AF37] font-serif">Signature</span> Projects
                    </h2>
                </motion.div>
            </div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 items-start border-t border-white/5">
                    {/* Left Side: Project List */}
                    <div className="flex flex-col lg:col-span-5 lg:pr-12 lg:sticky lg:top-[12.5vh] lg:h-[75vh] lg:justify-between lg:py-4">
                        {projects.map((project, idx) => (
                            <ProjectItem
                                key={project.slug}
                                project={project}
                                index={idx}
                                isActive={activeIndex === idx}
                                onHover={() => setActiveIndex(idx)}
                            />
                        ))}

                        {/* All Projects Link */}
                        <div className="mt-8 flex justify-start">
                            <Link
                                href="/projects"
                                className="group flex items-center gap-4 text-xs font-black capitalize tracking-[0.4em] text-white/40 hover:text-white transition-colors"
                            >
                                Full Portfolio
                                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-noir group-hover:text-white transition-all">
                                    <ArrowUpRight className="w-4 h-4" />
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Right Side: High-End Sticky Image Gallery (Desktop) */}
                    <div className="hidden lg:block lg:col-span-7 sticky top-[12.5vh] h-[75vh] w-full rounded-[2rem] overflow-hidden bg-white/5 border border-white/5 shadow-2xl">
                        {projects.map((project, idx) => (
                            <motion.div
                                key={project.slug}
                                initial={false}
                                animate={{
                                    opacity: activeIndex === idx ? 1 : 0,
                                    scale: activeIndex === idx ? 1 : 1.05,
                                    zIndex: activeIndex === idx ? 10 : 0
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.16, 1, 0.3, 1]
                                }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={project.heroImage}
                                    alt={project.heroImageAlt}
                                    fill
                                    className="object-cover"
                                    priority={idx === 0}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                                <div className="absolute bottom-12 left-12 right-12">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="w-8 h-[1px] bg-white/40" />
                                        <span className="text-[14px] font-normal capitalize tracking-[0.4em] text-white/80 font-serif">
                                            {project.location}
                                        </span>
                                    </div>
                                    <h4 className="text-5xl font-normal text-white capitalize tracking-normal leading-none mb-4 font-serif">
                                        {project.name}
                                    </h4>
                                    <p className="text-white/40 text-[14px] font-normal capitalize tracking-[0.3em] font-serif">
                                        {project.status}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

function ProjectItem({
    project,
    index,
    isActive,
    onHover
}: {
    project: Project;
    index: number;
    isActive: boolean;
    onHover: () => void;
}) {
    return (
        <div className="relative border-b border-white/5 group">
            <Link
                href={`/projects/${project.slug}`}
                onMouseEnter={onHover}
                className={cn(
                    "flex flex-col py-6 md:py-4 transition-all duration-300",
                    !isActive ? "lg:opacity-40" : "opacity-100"
                )}
            >
                <h3 className="text-3xl md:text-5xl lg:text-4xl xl:text-5xl font-normal capitalize tracking-normal leading-none flex items-center gap-4 mb-4 font-serif">
                    {project.name}
                    <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden md:block text-white/20" />
                </h3>

                {/* Mobile Tagline Reveal */}
                {project.tagline && (
                    <p className="text-sm font-medium leading-relaxed text-white/60 mb-6 lg:hidden line-clamp-2">
                        {project.tagline}
                    </p>
                )}

                {project.tagline && (
                    <p className={cn(
                        "hidden lg:block text-sm font-medium leading-relaxed max-w-xl transition-all duration-500 line-clamp-2",
                        isActive ? "text-white/60" : "text-white/0"
                    )}>
                        {project.tagline}
                    </p>
                )}

                {/* Mobile-Only Image Reveal */}
                <div className="lg:hidden mt-0 relative aspect-video rounded-2xl overflow-hidden border border-white/5">
                    <Image
                        src={project.heroImage}
                        alt={project.name}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute bottom-4 left-4 p-2">
                        <p className="text-[8px] font-normal capitalize tracking-[0.2em] text-white/60 mb-1 font-serif">{project.location}</p>
                        <h4 className="text-white font-black capitalize tracking-tighter text-xl">{project.name}</h4>
                    </div>
                </div>
            </Link>
        </div>
    );
}
