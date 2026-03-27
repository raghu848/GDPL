"use client";

import { Project } from "@/lib/projectsData";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowRight, ChevronRight, MessageSquare, Phone, Check, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ProjectDetailPage({ project }: { project: Project }) {
    const [activeAmenityTab, setActiveAmenityTab] = useState(0);
    const [lightboxImage, setLightboxImage] = useState<string | null>(null);

    const statusColors = {
        Ongoing: "bg-green-500/20 text-green-400 border-green-500/30",
        Delivered: "bg-gold/20 text-gold border-gold/30",
        Upcoming: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    };

    return (
        <main className="min-h-screen bg-transparent text-white grain-overlay">
            {/* ═══════ 1. HERO ═══════ */}
            <section className="relative h-screen w-full flex items-end overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={project.heroImage}
                        alt={project.name}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />
                </div>

                <div className="container mx-auto px-6 pb-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        {/* Status badge */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border mb-6 ${statusColors[project.status]}`}>
                            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                            {project.status}
                        </div>

                        <div className="flex items-center gap-3 mb-4">
                            <MapPin className="w-4 h-4 text-gold" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gold">{project.location}</span>
                        </div>

                        <h1 className="text-5xl md:text-8xl lg:text-[120px] font-black uppercase tracking-tighter leading-none mb-4">
                            {project.name}
                        </h1>
                        <p className="text-white/60 text-lg md:text-2xl font-light max-w-2xl">{project.tagline}</p>

                        {/* Quick stats row */}
                        <div className="flex flex-wrap gap-8 mt-10 pt-8 border-t border-white/10">
                            {project.priceLabel !== "Coming Soon" && (
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/50 mb-1">Starting Price</p>
                                    <p className="text-xl font-black">{project.priceLabel}</p>
                                </div>
                            )}
                            {project.area && project.area !== "TBA" && (
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/50 mb-1">Total Area</p>
                                    <p className="text-xl font-black">{project.area}</p>
                                </div>
                            )}
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/50 mb-1">Configurations</p>
                                <p className="text-xl font-black">{project.configurations.length} Types</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* ═══════ 2. OVERVIEW ═══════ */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 1 }}
                        >
                            <p className="section-label mb-6">About the Project</p>
                            <div className="w-12 h-[2px] mb-8" style={{ background: "linear-gradient(90deg, #D4AF37, transparent)" }} />
                            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-10">
                                {project.name.split(" ").map((word, i) => (
                                    <span key={i}>
                                        {i === project.name.split(" ").length - 1 ? (
                                            <span className="text-gold-gradient">{word}</span>
                                        ) : (
                                            word + " "
                                        )}
                                    </span>
                                ))}
                            </h2>
                            <p className="text-muted text-lg font-light leading-relaxed">{project.longDescription}</p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 1, delay: 0.2 }}
                        >
                            {/* Highlights Card */}
                            <div className="glass-premium p-8 md:p-10 rounded-3xl">
                                <h3 className="text-lg font-black uppercase tracking-tight mb-8 flex items-center gap-3">
                                    <span className="w-2 h-2 rounded-full bg-gold" style={{ boxShadow: "0 0 8px rgba(212,175,55,0.5)" }} />
                                    Key Highlights
                                </h3>
                                <div className="space-y-5">
                                    {project.highlights.map((h, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: false }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-center gap-4 group"
                                        >
                                            <div className="p-1.5 bg-gold/10 rounded-lg border border-gold/15 text-gold group-hover:bg-gold group-hover:text-black transition-all">
                                                <Check className="w-3 h-3" />
                                            </div>
                                            <span className="text-white/80 text-sm font-light">{h}</span>
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
                <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.15), transparent)" }} />
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 1 }}
                        className="text-center mb-16"
                    >
                        <p className="section-label mb-4">Floor Plans</p>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                            Available <span className="text-gold-gradient">Configurations</span>
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        {project.configurations.map((config, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false }}
                                transition={{ duration: 0.8, delay: idx * 0.15 }}
                                className="glass-premium p-8 rounded-2xl text-center group hover:border-gold/30 transition-all duration-500 relative overflow-hidden"
                            >
                                {/* Subtle gold shimmer on hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(circle at 50% 0%, rgba(212,175,55,0.05), transparent 70%)" }} />

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-black uppercase tracking-tight mb-3 group-hover:text-gold transition-colors">{config.type}</h3>
                                    <p className="text-gold font-mono text-lg mb-2">{config.size}</p>
                                    {config.booking && (
                                        <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-bold mt-4 pt-4 border-t border-white/5">
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
                        viewport={{ once: false }}
                        transition={{ duration: 1 }}
                        className="text-center mb-16"
                    >
                        <p className="section-label mb-4">Visual Tour</p>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                            Project <span className="text-gold-gradient">Gallery</span>
                        </h2>
                    </motion.div>

                    {/* Masonry Grid */}
                    <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                        {project.galleryImages.map((img, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: false, amount: 0.1 }}
                                transition={{ duration: 0.8 }}
                                className="break-inside-avoid group cursor-pointer"
                                onClick={() => setLightboxImage(img)}
                            >
                                <div className="overflow-hidden rounded-2xl glow-gold">
                                    <img
                                        src={img}
                                        alt={`${project.name} - Image ${idx + 1}`}
                                        className="w-full h-auto object-cover md:grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                                    />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            <AnimatePresence>
                {lightboxImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12 cursor-pointer"
                        onClick={() => setLightboxImage(null)}
                    >
                        <button className="absolute top-6 right-6 p-3 bg-white/10 rounded-full hover:bg-gold hover:text-black transition-all z-10">
                            <X className="w-5 h-5" />
                        </button>
                        <motion.img
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            src={lightboxImage}
                            alt="Gallery fullscreen"
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
                        viewport={{ once: false }}
                        transition={{ duration: 1 }}
                        className="text-center mb-16"
                    >
                        <p className="section-label mb-4">Lifestyle</p>
                        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-none">
                            Premium <span className="text-gold-gradient">Amenities</span>
                        </h2>
                    </motion.div>

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {project.amenities.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveAmenityTab(idx)}
                                className={`px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${activeAmenityTab === idx
                                    ? "bg-gold text-black border-gold"
                                    : "bg-transparent text-muted border-white/10 hover:border-gold/30 hover:text-white"
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
                            className="glass-premium p-8 md:p-12 rounded-3xl max-w-4xl mx-auto"
                        >
                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">{project.amenities[activeAmenityTab].name}</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {project.amenities[activeAmenityTab].items.map((item, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-white/5 transition-colors group"
                                    >
                                        <div className="w-1.5 h-1.5 rounded-full bg-gold shrink-0 group-hover:scale-150 transition-transform" style={{ boxShadow: "0 0 6px rgba(212,175,55,0.5)" }} />
                                        <span className="text-white/80 text-sm font-light">{item}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </section>

            {/* ═══════ 6. CTA ═══════ */}
            <section className="py-32 relative">
                <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.15), transparent)" }} />
                <div className="container mx-auto px-6">
                    <div className="glass-premium p-12 md:p-20 rounded-3xl text-center relative overflow-hidden">
                        {/* Gold corner accents */}
                        <div className="absolute top-6 left-6 w-12 h-12 border-t-2 border-l-2 border-gold/30" />
                        <div className="absolute bottom-6 right-6 w-12 h-12 border-b-2 border-r-2 border-gold/30" />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 1 }}
                        >
                            <p className="section-label mb-6">Take the Next Step</p>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
                                Interested in{" "}
                                <span className="text-gold-gradient">{project.name}</span>?
                            </h2>
                            <p className="text-muted text-lg font-light max-w-xl mx-auto mb-12">
                                Schedule a private site visit or connect with our team for detailed pricing and floor plans.
                            </p>
                            <div className="flex flex-col md:flex-row gap-4 justify-center">
                                <Link
                                    href="https://wa.me/917789000077"
                                    target="_blank"
                                    className="inline-flex items-center justify-center gap-4 btn-gold py-5 px-10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] group"
                                >
                                    <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    WhatsApp Us
                                </Link>
                                <Link
                                    href="tel:+917789000077"
                                    className="inline-flex items-center justify-center gap-4 border border-gold/30 text-gold py-5 px-10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-gold hover:text-black transition-all group"
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
