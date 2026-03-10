"use client";

import ShutterReveal from "@/components/ui/ShutterReveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectsPage() {
    const allProjects = [
        {
            name: "Regal Heights",
            specs: "3 & 4 BHK Luxury Apartments",
            location: "Sector 91, Mohali",
            image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        },
        {
            name: "Regal Residencia",
            specs: "Premium Independent Floors",
            location: "Sector 91, Mohali",
            image: "https://images.unsplash.com/photo-1628624747186-a941c476b7ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        },
        {
            name: "GLC Cooperative Homez",
            specs: "Spacious 3 BHK Residencies",
            location: "Zirakpur",
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        },
        {
            name: "Foothills",
            specs: "Ultra-Luxury Estates",
            location: "New Chandigarh",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
        }
    ];

    const categories = ["All Projects", "Condos", "Villas", "Upcoming"];

    return (
        <main className="min-h-screen bg-black text-white pb-24">
            <section className="relative h-[70vh] w-full mb-32 overflow-hidden flex items-center">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/50 z-10" />
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="/images/Luxury_Apartment_Drone_Footage_Generated.mp4" type="video/mp4" />
                    </video>
                </div>

                <div className="container mx-auto px-6 relative z-20">
                    <header>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-9xl font-black mb-12 uppercase tracking-tighter leading-none"
                        >
                            OUR<br />PROJECTS
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-white/80 text-xl md:text-2xl max-w-3xl font-light leading-relaxed"
                        >
                            Discover our ongoing and completed projects to see how we bring to life the concepts that are shaping the future of real estate in Mohali.
                        </motion.p>
                    </header>
                </div>
            </section>

            <div className="container mx-auto px-6">
                {/* minimalist Category Filters */}
                <div className="flex gap-12 mb-24 border-b border-white/5 pb-8 overflow-x-auto selection:bg-white selection:text-black">
                    {categories.map((cat, idx) => (
                        <button
                            key={cat}
                            className={cn(
                                "text-[10px] font-black tracking-[0.4em] uppercase transition-colors whitespace-nowrap",
                                idx === 0 ? "text-white underline underline-offset-[16px] decoration-2" : "text-muted hover:text-white"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
                    {allProjects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            className="group"
                        >
                            <Link href={`/projects/${idx}`} className="block">
                                <ShutterReveal direction="up" className="aspect-[16/10] rounded-3xl overflow-hidden mb-8 border border-white/5">
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                                    />
                                </ShutterReveal>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">{project.name}</h3>
                                        <p className="text-muted text-[10px] uppercase font-bold tracking-[0.3em]">{project.specs}</p>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-white mt-3" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}

// Helper for conditional classes if not globally available
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
