"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Check } from "lucide-react";
import Image from "next/image";

interface MilestoneData {
  name: string;
  launch: string;
  possession: string;
  status: string;
  type: string;
  desc: string;
  image?: string;
  badge: "delivered" | "possession" | "soon";
}

const timelineData: MilestoneData[] = [
  {
    name: "Cooperative Housing Society",
    launch: "2016",
    possession: "2020",
    status: "Delivered",
    type: "Cooperative Society",
    desc: "GDPL's inaugural landmark project — a cooperative housing community setting the foundation of trust.",
    image: "/images/timeline_box1.png",
    badge: "delivered",
  },
  {
    name: "Foothills Cooperative Society",
    launch: "2020",
    possession: "2025",
    status: "Delivered",
    type: "Cooperative Society",
    desc: "Nestled at the foothills, this project expanded GDPL's footprint with a thriving community.",
    image: "/images/timeline_box2.png",
    badge: "delivered",
  },
  {
    name: "Regal Heights",
    launch: "2022",
    possession: "2026",
    status: "In Possession",
    type: "Residential High-Rise",
    desc: "A landmark of vertical living — Regal Heights raises the bar with premium residences.",
    image: "/regal_heights/Regal_Heights_.jpg.jpeg",
    badge: "possession",
  },
  {
    name: "Regal Residencia & Regal Luxuria",
    launch: "2024",
    possession: "Coming Soon",
    status: "Coming Soon",
    type: "Dual Project",
    desc: "Two iconic addresses offering luxurious living with world-class amenities.",
    image: "/regal_rersidencia/Regal_Residencia_.jpg.jpeg",
    badge: "soon",
  },
  {
    name: "Regal Empirus",
    launch: "2025",
    possession: "Coming Soon",
    status: "Coming Soon",
    type: "Premium High-Rise",
    desc: "GDPL's most ambitious project — a testament to architectural grandeur and modern living.",
    image: "/regal_empirus/Regal_Empirus_.jpg.jpeg",
    badge: "soon",
  },
];

const Timeline: React.FC = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section className="py-16 bg-white text-gray-900 font-sans overflow-hidden">
      <div className="max-w-[1350px] mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col items-center gap-1 mb-8 text-center">
          <div className="flex justify-center mb-4">
            <Image
              src="/images/GDPL_Logo_white1.png"
              alt="GDPL Logo"
              width={220}
              height={80}
              className="h-20 w-auto object-contain"
            />
          </div>
          <div className="text-[12px] font-bold tracking-[0.4em] text-gray-400 uppercase">Building Dreams</div>
          <p className="font-serif italic text-base text-gray-500 mt-3">The Journey of Growth, Trust & Landmarks.</p>
        </div>

        {/* Timeline Outer */}
        <div className="relative mt-8">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 px-2 py-5">
            <div className="absolute bottom-[80px] left-0 right-0 h-[3px] bg-black/5 hidden md:block">
              <div
                className="h-full bg-[#E8003D] w-full"
              />
            </div>

            {timelineData.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setActiveId(idx === activeId ? null : idx)}
                className="flex flex-col items-center relative group cursor-pointer"
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  className={`bg-white border rounded-2xl p-4 w-full transition-all duration-300 ${
                    activeId === idx 
                    ? "border-[#E8003D] bg-[#fff0f4] shadow-[0_8px_30px_rgba(232,0,61,0.15)]" 
                    : "border-gray-100 group-hover:border-[#E8003D] group-hover:shadow-[0_8px_30px_rgba(232,0,61,0.15)]"
                  }`}
                >
                  <div className="w-full h-[150px] rounded-xl mb-4 overflow-hidden bg-gray-50 flex items-center justify-center relative">
                    {item.image ? (
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    ) : (
                      <div className="text-[11px] uppercase tracking-widest text-gray-400 font-bold">No Image</div>
                    )}
                  </div>
                  <div className="text-[14px] font-bold text-gray-900 leading-tight mb-3 line-clamp-2 h-[40px]">
                    {item.name}
                  </div>
                  <div className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-3 py-1 rounded-full ${
                    item.badge === "delivered" ? "bg-green-50 text-green-700" :
                    item.badge === "possession" ? "bg-amber-50 text-amber-700" :
                    "bg-blue-50 text-blue-700"
                  }`}>
                    {item.badge === "delivered" && <Check size={8} />}
                    {item.badge === "possession" && <span className="text-[12px] leading-none">•</span>}
                    {item.badge === "soon" && <span className="text-[12px] leading-none">◦</span>}
                    <span>{item.status}</span>
                  </div>
                </motion.div>

                {/* Connector Dot */}
                <div className="absolute bottom-[80px] left-1/2 -translate-x-1/2 w-[1.5px] h-[18px] bg-gray-200 hidden md:block" />
                <div className={`w-3.5 h-3.5 rounded-full bg-white border-[3px] border-[#E8003D] relative z-[2] transition-all duration-300 hidden md:block ${
                  activeId === idx ? "scale-125 bg-[#E8003D]" : "group-hover:scale-125 group-hover:bg-[#E8003D]"
                }`} />

                {/* Year Group */}
                <div className="flex items-center flex-wrap justify-center gap-1.5 mt-4">
                  <span className="text-[16px] font-black text-[#E8003D]">{item.launch}</span>
                  {item.possession !== "Coming Soon" && (
                    <>
                      <span className="text-gray-300 text-[13px]">→</span>
                      <span className="text-[13px] text-gray-400 font-medium mt-0.5">{item.possession}</span>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Detail Panel */}
        <AnimatePresence>
          {activeId !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-8 mx-4 border border-gray-100 rounded-xl p-5 bg-gray-50 shadow-sm"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3 text-xl font-bold text-gray-900 font-serif">
                  <span className="text-[#E8003D]">■</span> {timelineData[activeId].name}
                </div>
                <button 
                  onClick={() => setActiveId(null)}
                  className="text-gray-400 hover:text-[#E8003D] transition-colors p-2"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">Launch Year</label>
                  <span className="text-lg font-bold text-gray-900">{timelineData[activeId].launch}</span>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">Possession</label>
                  <span className="text-lg font-bold text-gray-900">{timelineData[activeId].possession}</span>
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-2">Status</label>
                  <span className="text-lg font-bold text-gray-900">{timelineData[activeId].status}</span>
                </div>
                <div className="md:col-span-3 pt-6 border-t border-gray-200">
                  <label className="block text-[11px] uppercase tracking-[0.2em] font-bold text-gray-400 mb-3">About Project</label>
                  <p className="text-lg text-gray-600 leading-relaxed font-light font-playfair">{timelineData[activeId].desc}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Timeline;
