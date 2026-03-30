"use client";

import { projects } from "@/lib/projectsData";
import { ArrowRight, Search, MapPin } from "lucide-react";
import Link from "next/link";
import ShutterReveal from "@/components/ui/ShutterReveal";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";

export default function ProjectsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const filters = ["All", "Ongoing", "Upcoming", "Delivered"];

    const filteredProjects = projects.filter(project => {
        const matchesSearch =
            project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.location.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = activeFilter === "All" || project.status === activeFilter;

        return matchesSearch && matchesFilter;
    });

    const statusColors: Record<string, string> = {
        Ongoing: "bg-green-500/10 text-green-600 border-green-500/20",
        Delivered: "bg-black/5 text-noir border-black/10",
        Upcoming: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    };

    return (
        <main className="min-h-screen bg-transparent text-noir pb-24 grain-overlay">
            {/* Hero */}
            <section className="relative h-[70vh] w-full mb-24 overflow-hidden flex items-center">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-stone/60 via-stone/30 to-transparent z-10" />
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        poster="/images/herosection.png"
                        className="w-full h-full object-cover"
                    >
                        <source src="/images/GDPL 1st (1080p No Audio).mp4" type="video/mp4" />
                    </video>
                </div>

                <div className="container mx-auto px-6 relative z-20">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <p className="section-label mb-4">Our Portfolio</p>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
                            Signature Projects
                        </h1>
                        <p className="text-muted text-lg max-w-xl font-light">
                            Explore our collection of premium residential landmarks across Mohali, each crafted with GDPL&apos;s hallmark of transparency and luxury.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="container mx-auto px-6">
                {/* Search & Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col md:flex-row gap-6 mb-20 items-center"
                >
                    {/* Search */}
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-noir/30" />
                        <input
                            type="text"
                            placeholder="Search projects by name or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full search-premium rounded-full pl-12 pr-6 py-4 text-sm font-light text-noir placeholder:text-noir/30 outline-none border border-black/5"
                        />
                    </div>

                    {/* Filter Pills */}
                    <div className="flex gap-2 shrink-0">
                        {filters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                className={`px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${activeFilter === filter
                                    ? "bg-noir text-white border-noir"
                                    : "bg-transparent text-neutral-400 border-black/5 hover:border-black/20 hover:text-noir"
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Project Cards */}
                <div className="space-y-10">
                    {filteredProjects.map((project, idx) => (
                        <motion.div
                            key={project.slug}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.15 }}
                            transition={{ duration: 1, delay: idx * 0.1 }}
                        >
                            <Link href={`/projects/${project.slug}`} className="group block">
                                <div className="relative overflow-hidden border border-black/5 group-hover:border-black/20 transition-all duration-700">
                                    {/* Full-bleed Image with Shutter Reveal */}
                                    <ShutterReveal className="aspect-[21/9]">
                                        <Image
                                            src={project.heroImage}
                                            alt={project.name}
                                            fill
                                            className="object-cover md:grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                            sizes="100vw"
                                        />
                                    </ShutterReveal>

                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-stone/95 via-stone/40 to-transparent" />

                                    {/* Content */}
                                    <div className="absolute inset-0 flex items-center p-8 md:p-16">
                                        <div className="max-w-xl">
                                            {/* Status badge */}
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] border mb-4 ${statusColors[project.status]}`}>
                                                <span className="w-1 h-1 rounded-full bg-current animate-pulse" />
                                                {project.status}
                                            </div>

                                            <div className="flex items-center gap-2 mb-3">
                                                <MapPin className="w-3 h-3 text-noir" />
                                                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-noir/40">{project.location}</span>
                                            </div>

                                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none mb-3 group-hover:text-black transition-colors">
                                                {project.name}
                                            </h2>

                                            <p className="text-noir/50 text-xs md:text-sm uppercase tracking-[0.2em] font-bold mb-4">{project.tagline}</p>

                                            <p className="text-noir/40 text-sm font-light leading-relaxed hidden md:block max-w-md mb-6">{project.description}</p>

                                            {/* Quick info */}
                                            <div className="flex flex-wrap gap-6 hidden md:flex">
                                                {project.priceLabel !== "Coming Soon" && (
                                                    <div>
                                                        <p className="text-[9px] uppercase tracking-[0.2em] text-noir/40 font-bold">Price</p>
                                                        <p className="text-sm font-black">{project.priceLabel}</p>
                                                    </div>
                                                )}
                                                {project.area && project.area !== "TBA" && (
                                                    <div>
                                                        <p className="text-[9px] uppercase tracking-[0.2em] text-noir/40 font-bold">Area</p>
                                                        <p className="text-sm font-black">{project.area}</p>
                                                    </div>
                                                )}
                                                <div>
                                                    <p className="text-[9px] uppercase tracking-[0.2em] text-noir/40 font-bold">Configs</p>
                                                    <p className="text-sm font-black">{project.configurations.map(c => c.type).join(", ")}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 mt-6 text-noir text-[10px] uppercase tracking-[0.3em] font-black group-hover:gap-5 transition-all">
                                                Explore Project <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* No results */}
                {filteredProjects.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center py-32"
                    >
                        <p className="text-muted text-xl font-light">No projects match your search.</p>
                        <button
                            onClick={() => { setSearchQuery(""); setActiveFilter("All"); }}
                            className="mt-6 text-noir text-sm font-bold uppercase tracking-[0.2em] hover:underline"
                        >
                            Clear filters
                        </button>
                    </motion.div>
                )}
            </div>
        </main>
    );
}
