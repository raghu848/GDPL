"use client";

import React from "react";
import { Scene3D } from "@/components/ui/Scene3D";
import { motion } from "framer-motion";

const Section = ({ title, content, alignment = "left" }: { title: string, content: string, alignment?: "left" | "right" }) => (
  <section className={`min-h-screen flex items-center px-10 md:px-20 ${alignment === "right" ? "justify-end text-right" : "justify-start text-left"}`}>
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: false, margin: "-100px" }}
      className="max-w-2xl bg-black/20 backdrop-blur-md p-10 rounded-2xl border border-white/10 shadow-2xl"
    >
      <h2 className="text-5xl md:text-7xl font-light tracking-tighter text-white mb-6 uppercase">
        {title}
      </h2>
      <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed">
        {content}
      </p>
      <motion.button 
        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
        whileTap={{ scale: 0.95 }}
        className="mt-8 px-8 py-3 border border-white/20 text-white rounded-full text-sm uppercase tracking-widest transition-colors"
      >
        Explore More
      </motion.button>
    </motion.div>
  </section>
);

export default function CinematicPage() {
  return (
      <main className="relative bg-[#050505] text-white overflow-hidden">
        {/* The 3D World */}
        <Scene3D />

        {/* Content Layers */}
        <div className="relative z-10">
          {/* Hero Section */}
          <section className="h-screen flex flex-col items-center justify-center text-center px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <h1 className="text-[10vw] font-extralight tracking-[-0.05em] leading-[0.9] uppercase mix-blend-difference">
                Regal <br /> <span className="font-medium italic">Visions</span>
              </h1>
              <p className="mt-6 text-white/40 tracking-[0.3em] uppercase text-sm">
                Luxury Redefined in 3D Space
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-10 flex flex-col items-center"
            >
              <div className="w-[1px] h-20 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
              <span className="text-[10px] uppercase tracking-[0.5em] mt-4 opacity-30">Scroll to Explore</span>
            </motion.div>
          </section>

          {/* Feature Sections */}
          <Section 
            title="Atmospheric"
            content="Experience architectural elegance through a lens of cinematic depth. Every layer tells a story of precision and luxury, crafted for the modern visionary."
          />

          <Section 
            alignment="right"
            title="Immersive"
            content="Our 3D environments aren't just seen; they are felt. High-performance parallax layers react to your every movement, creating a living, breathing digital space."
          />

          <Section 
            title="Future"
            content="Step into the next generation of real estate presentation. Where technology meets timeless design, creating an unforgettable digital journey."
          />

          {/* Footer-like Section */}
          <section className="h-screen flex items-center justify-center bg-gradient-to-t from-black to-transparent">
            <div className="text-center">
              <h3 className="text-4xl font-light mb-8 opacity-60 italic">Elevate Your Perspective</h3>
              <div className="grid grid-cols-3 gap-12 text-xs tracking-[0.3em] uppercase opacity-40">
                <span>Innovation</span>
                <span>Design</span>
                <span>Luxury</span>
              </div>
            </div>
          </section>
        </div>

      </main>
  );
}
