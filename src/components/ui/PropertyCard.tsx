"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, MapPin, Navigation } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

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
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative w-full aspect-[4/5] md:aspect-[3/4] rounded-3xl overflow-hidden hover-lift cursor-pointer bg-stone border border-white/5 shadow-sm"
        >
            {/* Edge-to-edge background image */}
            <Image
                src={image}
                alt={name}
                fill
                className="object-cover transition-transform duration-[1.5s] ease-[0.16,1,0.3,1] group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Subtle gradient overlay for text legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-stone/80 via-stone/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Floating Specs Tag (Top Left) */}
            <div className="absolute top-6 left-6 z-20">
                <div className="px-4 py-1.5 rounded-full backdrop-blur-md bg-stone/60 text-xs md:text-[14px] font-normal capitalize tracking-[0.2em] border border-white/5 text-white font-serif">
                    {specs}
                </div>
            </div>

            {/* Main Content Area (Bottom) */}
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 z-20 flex flex-col justify-end">

                {/* Title and Location */}
                <div className="mb-6 transform transition-transform duration-500 group-hover:-translate-y-2">
                    <h3 className="font-serif text-3xl md:text-4xl font-normal text-white mb-2">{name}</h3>
                    <div className="flex items-center text-white/60 text-sm md:text-base font-light">
                        <MapPin className="w-4 h-4 mr-2" />
                        {location}
                    </div>
                </div>

                {/* Location Intelligence (Distances) - Reveals slightly more on hover */}
                <div className="grid grid-cols-3 gap-2 border-t border-white/5 pt-5 mt-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {distances.map((d, i) => (
                        <div key={i} className="flex flex-col">
                            <span className="text-[9px] text-neutral-400 capitalize tracking-widest mb-1 font-serif">{d.label}</span>
                            <span className="text-sm md:text-base font-medium text-white flex items-center">
                                <Navigation className="w-3 h-3 mr-1 opacity-50" />
                                {d.dist}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Animated Arrow Button */}
                <div className="absolute top-6 right-6 z-20 w-12 h-12 rounded-full flex items-center justify-center bg-white/5 border border-white/10 overflow-hidden group-hover:bg-noir transition-colors duration-500">
                    <div className="relative flex items-center justify-center">
                        <ArrowUpRight className="w-5 h-5 text-white absolute transition-all duration-500 group-hover:text-white group-hover:translate-x-full group-hover:-translate-y-full" />
                        <ArrowUpRight className="w-5 h-5 text-white absolute -translate-x-full translate-y-full transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
                    </div>
                </div>

            </div>
        </motion.div>
    );
}
