"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
    name: string;
    specs: string;
    location: string;
    image: string;
    distances: Array<{ label: string; dist: string }>;
}

export default function PropertyCard({ name, specs, location, image, distances }: PropertyCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative w-full aspect-[4/5] md:aspect-[3/4] rounded-[2rem] overflow-hidden hover-lift cursor-pointer bg-obsidian-light/50 border border-white/10"
        >
            {/* Edge-to-edge background image */}
            <img
                src={image}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-110"
            />

            {/* Heavy gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-obsidian/20 transition-opacity duration-500 group-hover:opacity-0" />

            {/* Floating Specs Tag (Top Left) */}
            <div className="absolute top-6 left-6 z-20">
                <div className="glass-panel px-4 py-1.5 rounded-full backdrop-blur-md bg-black/20 text-xs md:text-sm font-medium tracking-wide border border-white/20">
                    <span className="text-alabaster">{specs}</span>
                </div>
            </div>

            {/* Main Content Area (Bottom) */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 flex flex-col justify-end">

                {/* Title and Location */}
                <div className="mb-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">{name}</h3>
                    <div className="flex items-center text-alabaster/70 text-sm md:text-base font-light">
                        <MapPin className="w-4 h-4 mr-2 text-gold animate-bounce" style={{ animationDuration: '2s' }} />
                        {location}
                    </div>
                </div>

                {/* Location Intelligence (Distances) - Reveals slightly more on hover */}
                <div className="grid grid-cols-3 gap-2 border-t border-white/10 pt-5 mt-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {distances.map((d, i) => (
                        <div key={i} className="flex flex-col">
                            <span className="text-[10px] md:text-xs text-gold uppercase tracking-widest mb-1">{d.label}</span>
                            <span className="text-sm md:text-base font-medium text-white flex items-center">
                                <Navigation className="w-3 h-3 mr-1 opacity-50" />
                                {d.dist}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Animated Arrow Button (Appears purely on hover structurally but here we just animate position) */}
                <div className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full glass-panel flex items-center justify-center bg-white/5 border border-white/10 overflow-hidden group-hover:bg-gold transition-colors duration-500">
                    <div className="relative flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5 text-alabaster absolute transition-all duration-500 group-hover:text-obsidian group-hover:translate-x-full group-hover:-translate-y-full" />
                        <ArrowUpRight className="w-5 h-5 text-obsidian absolute -translate-x-full translate-y-full transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
