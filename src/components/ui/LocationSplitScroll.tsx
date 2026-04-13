"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import { LocationAdvantage } from "@/lib/projectsData";

interface LocationSplitScrollProps {
    items: LocationAdvantage[];
}

export default function LocationSplitScroll({ items }: LocationSplitScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Group items by category
    const groupedItems = items.reduce((acc, item) => {
        if (!acc[item.category]) {
            acc[item.category] = [];
        }
        acc[item.category].push(item);
        return acc;
    }, {} as Record<string, LocationAdvantage[]>);

    // Sort items within each category by name length (longest first)
    Object.keys(groupedItems).forEach(category => {
        groupedItems[category].sort((a, b) => b.name.length - a.name.length);
    });

    const categories = Object.keys(groupedItems);

    return (
        <section 
            ref={containerRef}
            className="relative bg-[#0B2418] text-white overflow-visible w-full"
        >
            <div className="flex flex-col lg:flex-row min-h-screen w-full relative">
                
                {/* Left Side - Fixed/Sticky */}
                <div className="w-full lg:w-1/2 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center px-8 md:px-16 lg:px-24 xl:px-32 bg-[#0B2418] z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="mb-6 flex items-center gap-4">
                            <div className="w-12 h-[1px] bg-[#D4AF37]" />
                            <span className="text-[12px] font-black tracking-[0.4em] uppercase text-[#D4AF37]">Location</span>
                        </div>
                        <h2 className="text-6xl md:text-8xl lg:text-[80px] xl:text-[100px] font-serif leading-[1] mb-10 tracking-normal text-white">
                            <span className="text-white">Connected</span> to<br />
                            <span className="text-[#D4AF37]">Everywhere</span> You<br />
                            <span className="text-white">Need</span> to <span className="text-[#D4AF37]">Be.</span>
                        </h2>
                        <p className="text-white/60 text-lg md:text-xl font-playfair max-w-md leading-relaxed italic">
                            Strategically located with seamless connectivity to highways, the airport, and city hubs—offering unmatched convenience every day.
                        </p>
                    </motion.div>
                </div>

                {/* Right Side - Scrollable */}
                <div className="w-full lg:w-1/2 px-8 md:px-16 lg:px-24">
                    {/* Top padding - reverted to perfect initial alignment */}
                    <div className="h-[40vh] hidden lg:block" />
                    
                    <div className="max-w-xl mx-auto lg:mx-0 space-y-24 lg:space-y-40">
                        {categories.map((category, idx) => (
                            <div key={category} className="relative">
                                <motion.h3 
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.8 }}
                                    className="text-[#D4AF37] text-3xl md:text-4xl font-serif mb-8 tracking-wide"
                                >
                                    {category}
                                </motion.h3>
                                
                                <div className="space-y-8">
                                    {groupedItems[category].map((item, itemIdx) => (
                                        <motion.div 
                                            key={itemIdx}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.6, delay: itemIdx * 0.1 }}
                                            className="flex flex-col md:flex-row md:items-baseline md:justify-between group cursor-default"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/30 group-hover:bg-[#D4AF37] group-hover:scale-150 transition-all duration-500" />
                                                <span className="text-xl md:text-2xl text-white/90 font-playfair font-light group-hover:text-white transition-colors duration-300">
                                                    {item.name}
                                                </span>
                                            </div>
                                            <div className="flex-grow mx-6 hidden md:block border-b border-white/5 group-hover:border-[#D4AF37]/20 transition-all duration-500" />
                                            <span className="text-lg md:text-xl text-white/30 font-opensans group-hover:text-[#D4AF37]/70 transition-colors duration-300">
                                                — {item.distance}
                                            </span>
                                        </motion.div>
                                    ))}
                                </div>
                                
                                {idx < categories.length - 1 && (
                                    <div className="absolute -bottom-20 lg:-bottom-32 left-0 w-full h-[1px] bg-gradient-to-r from-white/5 via-white/10 to-transparent" />
                                )}
                            </div>
                        ))}
                    </div>
                    
                    {/* Critical spacer: Ensures section ends exactly when Education is aligned */}
                    <div className="h-[15vh] lg:h-[15vh]" />
                </div>
            </div>
        </section>
    );
}
