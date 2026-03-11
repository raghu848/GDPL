"use client";

import Hero from "@/components/ui/Hero";
import ShutterReveal from "@/components/ui/ShutterReveal";
import PropertyCard from "@/components/ui/PropertyCard";
import ContactMap from "@/components/shared/ContactMap";
import { ArrowRight, Mail, Phone, Instagram, Facebook, Youtube, MessageSquare } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const featuredProjects = [
    {
      name: "Regal Heights",
      specs: "3 & 4 BHK Luxury Apartments",
      location: "Sector 91, Mohali",
      image: "/regal_heights/gemini.jpeg",
    },
    {
      name: "Regal Residencia",
      specs: "Premium Independent Floors",
      location: "Sector 91, Mohali",
      image: "/regal_heights/img15.jpg",
    },
    {
      name: "GLC Cooperative Homez",
      specs: "Spacious 3 BHK Residencies",
      location: "Zirakpur",
      image: "/regal_rersidencia/WhatsApp Image 2026-03-10 at 1.09.02 PM (1).jpeg",
    },
    {
      name: "Foothills",
      specs: "Ultra-Luxury Estates",
      location: "New Chandigarh",
      image: "/regal_rersidencia/WhatsApp Image 2026-03-10 at 1.09.02 PM.jpeg",
    }
  ];

  return (
    <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Intro Section (Sid Style Numbers) */}
      <section className="py-40 bg-black border-b border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-end">
            <div className="max-w-xl">
              <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-muted mb-8">About GDPL</h2>
              <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-12">
                WE ARE COMPANY OF THE FUTURE THAT COVERS TRICITY PROPERTY MARKET 360°
              </h3>
              <p className="text-muted text-lg font-light leading-relaxed">
                We don&apos;t just build, but also manage, consult, train market participants and create educational content for investors and property buyers.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="text-5xl font-black tracking-tighter">10+</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted font-bold">Years of Legacy</div>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-black tracking-tighter">500+</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted font-bold">Units Delivered</div>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-black tracking-tighter">100%</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted font-bold">Transparency</div>
              </div>
              <div className="space-y-4">
                <div className="text-5xl font-black tracking-tighter">08</div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted font-bold">Active Projects</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Projects Showcase (Shutter Reveals) */}
      <section className="py-40 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
            <h2 className="text-h2 tracking-tighter">Featured Projects</h2>
            <Link href="/projects" className="group flex items-center gap-4 text-[10px] uppercase tracking-[0.3em] font-bold">
              Go to all projects <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
            {featuredProjects.map((project, idx) => (
              <motion.div
                key={idx}
                className={idx % 2 !== 0 ? "md:mt-40" : ""}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link href={`/projects/${idx}`} className="group cursor-pointer block">
                  <ShutterReveal direction="up" className="aspect-[16/10] rounded-3xl overflow-hidden mb-8">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 md:grayscale group-hover:grayscale-0"
                    />
                  </ShutterReveal>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">{project.name}</h3>
                      <p className="text-muted text-[10px] uppercase tracking-[0.2em]">{project.specs}</p>
                    </div>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-widest">{project.location}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Map Section */}
      <ContactMap />

      {/* 5. Contact / Vision Callout */}
      <section className="bg-white text-black py-40">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-16">
              LET&apos;S IMAGINE YOUR FUTURE IN MOHALI
            </h2>
            <Link
              href="https://wa.me/917710380077"
              target="_blank"
              className="inline-flex items-center gap-4 py-6 px-12 border-2 border-black rounded-full text-xs font-black uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all duration-500 group"
            >
              <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
              Connect with us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
