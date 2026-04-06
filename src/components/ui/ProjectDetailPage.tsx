"use client";

import { Project } from "@/lib/projectsData";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MapPin, ArrowRight, ChevronRight, MessageSquare, Phone, Check, X, MousePointer2 } from "lucide-react";
import Link from "next/link";
import { useState, useRef } from "react";
import Image from "next/image";
import AmenityScroller from "./AmenityScroller";

export default function ProjectDetailPage({ project }: { project: Project }) {
    const [activeAmenityTab, setActiveAmenityTab] = useState(0);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);
    const heroRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const statusColors = {
        Ongoing: "bg-black/5 text-black border-black/10",
        Delivered: "bg-white/5 text-white border-white/10",
        Upcoming: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    };

    return (
        <main className="min-h-screen bg-transparent text-white grain-overlay">
            {/* ═══════ 1. HERO ═══════ */}
            <section
                ref={heroRef}
                className="relative h-screen w-full flex items-center overflow-hidden bg-stone-100 vhs-flicker"
            >
                {/* 90's VHS Overlay Elements */}
                <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden">
                    <div className="vhs-scanlines" />

                    {/* Golden Lens Flare / Light Leak - Reduced Opacity for clarity */}
                    <div className="absolute inset-0 z-10 opacity-30">
                        <div className="absolute -top-[20%] -left-[20%] w-[140%] h-[140%] bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.08)_0%,transparent_70%)] animate-slow-drift" />
                    </div>



                    {/* Digital Timer */}
                    <div className="absolute bottom-40 left-12 text-[#D4AF37]/30 font-mono text-[9px] tracking-widest uppercase hidden lg:block">
                        SP  PLAY  00:04:12:08
                    </div>
                </div>

                <motion.div
                    style={{ y: backgroundY }}
                    animate={{
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute inset-0 z-0"
                >
                    <Image
                        src={project.heroImage}
                        alt={project.name}
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-white via-white/30 to-transparent" />
                    <div className="absolute inset-0 bg-[#D4AF37]/2 mix-blend-overlay" />
                </motion.div>

                <div className="container mx-auto px-6 h-full flex flex-col justify-center relative z-10">
                    <motion.div
                        style={{ y: textY, opacity: opacityHero }}
                        className="max-w-6xl w-full"
                    >
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-[14px] font-black capitalize tracking-[0.4em] border shadow-sm ${statusColors[project.status]}`}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                    {project.status}
                                </div>
                                <div className="h-[1px] w-12 bg-white/10" />
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-[#D4AF37] font-serif" />
                                    <span className="text-[14px] font-normal capitalize tracking-[0.3em] text-black/80 font-serif">{project.location}</span>
                                </div>
                            </div>
                        </motion.div>

                        <div className="relative">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
                                className="text-5xl md:text-7xl lg:text-[100px] font-normal capitalize tracking-tight leading-[1.1] mb-12 text-black font-serif px-4"
                            >
                                {project.name}
                            </motion.h1>
                        </div>

                        {project.tagline && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 1 }}
                                className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16 mb-20"
                            >
                                <p className="text-black/80 text-lg md:text-xl font-normal max-w-2xl leading-relaxed italic">
                                    "{project.tagline}"
                                </p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                {/* Floating Bottom Stats Bar */}
                <div className="absolute bottom-10 left-0 w-full z-20 px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="container mx-auto"
                    >
                        <div className="glass-premium border border-white/5 rounded-[2rem] p-6 md:p-8 flex flex-wrap items-center justify-between gap-8 md:gap-12 shadow-2xl backdrop-blur-xl">
                            <div className="flex items-center gap-12 flex-1 flex-wrap">
                                {project.area && (
                                    <div className="min-w-[140px]">
                                        <p className="text-[12px] font-normal capitalize tracking-[0.4em] text-white/40 mb-2 font-serif">Development Size</p>
                                        <p className="text-xl md:text-2xl font-black tracking-tight">{project.area}</p>
                                    </div>
                                )}
                                {project.residencesSummary && (
                                    <div className="min-w-[140px]">
                                        <p className="text-[12px] font-normal capitalize tracking-[0.4em] text-white/40 mb-2 font-serif">Residences</p>
                                        <p className="text-xl md:text-2xl font-black tracking-tight">{project.residencesSummary}</p>
                                    </div>
                                )}
                                {project.projectType && (
                                    <div className="min-w-[140px]">
                                        <p className="text-[12px] font-normal capitalize tracking-[0.4em] text-white/40 mb-2 font-serif">Project Type</p>
                                        <p className="text-xl md:text-2xl font-black tracking-tight">{project.projectType}</p>
                                    </div>
                                )}
                            </div>

                            <a
                                href="#overview"
                                className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-noir text-white flex items-center justify-center group transition-all duration-500 hover:scale-110"
                            >
                                <ArrowRight className="w-6 h-6 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Scroll hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 2 }}
                    className="absolute right-12 bottom-12 hidden lg:flex flex-col items-center gap-4"
                >
                    <span className="text-[14px] font-normal capitalize tracking-[0.5em] rotate-90 origin-right text-white/20 whitespace-nowrap font-serif">Scroll Experience</span>
                    <div className="w-[1px] h-20 bg-gradient-to-b from-black/20 to-transparent" />
                </motion.div>
            </section>

            {/* ═══════ 2. OVERVIEW ═══════ */}
            <section id="overview" className="py-20 relative">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <p className="section-label mb-6">About the Project</p>
                            <div className="w-12 h-[2px] mb-8 bg-white/10" />
                            <h2 className="text-3xl md:text-5xl font-normal capitalize tracking-normal leading-[0.9] mb-10 text-white font-serif">
                                {project.name}
                            </h2>
                            <p className="text-muted text-lg font-light leading-relaxed">{project.longDescription}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="flex flex-col justify-center"
                        >
                            {/* Highlights Card */}
                            <div className="glass-premium p-10 md:p-12 rounded-[2.5rem] border border-white/5 shadow-2xl">
                                <h3 className="text-xl font-black capitalize tracking-tight mb-10 flex items-center gap-4">
                                    <span className="w-2.5 h-2.5 rounded-full bg-noir" />
                                    Key Highlights
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                                    {project.highlights.map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-center gap-5 group"
                                        >
                                            <div className="shrink-0 p-2 bg-white/5 rounded-xl border border-white/10 text-white group-hover:bg-noir group-hover:text-white transition-all duration-300">
                                                <Check className="w-4 h-4" />
                                            </div>
                                            <span className="text-white/80 text-base font-light leading-relaxed">{h}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ═══════ 3. CONFIGURATIONS ═══════ */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-center mb-16"
                    >
                        <p className="section-label mb-4">Floor Plans</p>
                        <h2 className="text-3xl md:text-5xl font-normal capitalize tracking-normal leading-none text-white font-serif">
                            Available <span className="text-[#D4AF37] font-serif">Configurations</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {project.configurations.map((config, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: idx * 0.15 }}
                                className="glass-premium p-8 rounded-2xl text-center group border border-white/5 transition-all duration-500 relative overflow-hidden"
                            >
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black capitalize tracking-tight mb-3 group-hover:text-white transition-colors">{config.type}</h3>
                                    <p className="text-white font-mono text-lg mb-2">{config.size}</p>
                                    {config.booking && (
                                        <p className="text-[14px] capitalize tracking-[0.3em] text-white/40 font-normal mt-4 pt-4 border-t border-white/5 font-serif">
                                            Booking: {config.booking}
                                        </p>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ═══════ 4. GALLERY ═══════ */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-center mb-16"
                    >
                        <p className="section-label mb-4">Visual Tour</p>
                        <h2 className="text-3xl md:text-5xl font-normal capitalize tracking-normal leading-none text-white font-serif">
                            Project <span className="text-[#D4AF37] font-serif">Gallery</span>
                        </h2>
                    </motion.div>

                    {/* Staggered Masonry Grid */}
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.05 }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: {
                                    staggerChildren: 0.1,
                                    delayChildren: 0.2
                                }
                            }
                        }}
                        className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4"
                    >
                        {project.galleryImages.map((img, idx) => (
                            <motion.div
                                key={idx}
                                variants={{
                                    hidden: { opacity: 0, y: 40, scale: 0.95, filter: "blur(10px)" },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        filter: "blur(0px)",
                                        transition: {
                                            duration: 1.2,
                                            ease: [0.16, 1, 0.3, 1]
                                        }
                                    }
                                }}
                                className="break-inside-avoid group cursor-pointer"
                                onClick={() => setLightboxImage(img)}
                            >
                                <div className="overflow-hidden rounded-2xl border border-white/5 transition-all duration-700 relative aspect-[4/3] md:aspect-auto">
                                    <Image
                                        src={img}
                                        alt={`${project.name} - Image ${idx + 1}`}
                                        width={800}
                                        height={600}
                                        className="w-full h-auto object-cover md:grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-stone/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 cursor-pointer"
                        onClick={() => setLightboxImage(null)}
                    >
                        <button className="absolute top-6 right-6 p-4 bg-white/5 rounded-full hover:bg-black hover:text-white transition-all z-10">
                            <X className="w-5 h-5" />
                        </button>
                        <Image
                            src={lightboxImage}
                            alt="Gallery fullscreen"
                            width={1920}
                            height={1080}
                            className="max-w-full max-h-[85vh] object-contain rounded-xl"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══════ 5. AMENITIES ═══════ */}
            <section className="py-32 relative">
                <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.15), transparent)" }} />
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1 }}
                        className="text-center mb-16"
                    >
                        <p className="section-label mb-4">Lifestyle</p>
                        <h2 className="text-3xl md:text-5xl font-normal capitalize tracking-normal leading-none text-white font-serif">
                            Premium <span className="text-[#D4AF37] font-serif">Amenities</span>
                        </h2>
                    </motion.div>
                    
                    {/* High-End Amenity Scroller */}
                    {project.amenityIcons && (
                        <div className="mb-20">
                            <AmenityScroller 
                                amenities={Object.entries(project.amenityIcons).map(([name, icon]) => ({ name, icon }))} 
                            />
                        </div>
                    )}

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {project.amenities.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveAmenityTab(idx)}
                                className={`px-6 py-3 rounded-full text-[14px] font-black capitalize tracking-[0.2em] transition-all duration-300 border ${activeAmenityTab === idx
                                    ? "bg-noir text-white border-noir"
                                    : "bg-transparent text-neutral-400 border-white/10 hover:border-white/20 hover:text-white"
                                    }`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeAmenityTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="glass-premium p-8 md:p-12 rounded-3xl max-w-4xl mx-auto border border-white/5 shadow-sm"
                        >
                            <h3 className="text-2xl font-black capitalize tracking-tighter mb-8">{project.amenities[activeAmenityTab].name}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.amenities[activeAmenityTab].items.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-white/5 transition-colors group"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-noir shrink-0 group-hover:scale-150 transition-transform" />
                                        <span className="text-white/80 text-sm font-light">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* ═══════ 6. CTA ═══════ */}
            <section className="py-32 relative bg-noir text-white">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
                <div className="container mx-auto px-6">
                    <div className="bg-white/5 backdrop-blur-sm p-12 md:p-20 rounded-3xl text-center relative overflow-hidden border border-white/10">
                        {/* corner accents */}
                        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-white/20" />
                        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-white/20" />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <p className="section-label mb-6 !text-white/40">Take the Next Step</p>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-normal capitalize tracking-normal leading-none mb-6 text-white font-serif">
                                Interested in {project.name}?
                            </h2>
                            <p className="text-white/60 text-lg font-light max-w-xl mx-auto mb-12">
                                Schedule a private site visit or connect with our team for detailed pricing and floor plans.
                            </p>
                            <div className="flex flex-col md:flex-row gap-4 justify-center">
                                <Link
                                    href="https://wa.me/917789000077"
                                    target="_blank"
                                    className="inline-flex items-center justify-center gap-4 btn-gold py-5 px-10 rounded-full text-[14px] font-normal capitalize tracking-[0.3em] group font-serif"
                                >
                                    <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    WhatsApp Us
                                </Link>
                                <Link
                                    href="tel:+917789000077"
                                    className="inline-flex items-center justify-center gap-4 border border-white/20 text-white py-5 px-10 rounded-full text-[14px] font-normal capitalize tracking-[0.3em] hover:bg-white hover:text-noir transition-all group font-serif"
                                >
                                    <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    Call Now
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </main>
    );
}
