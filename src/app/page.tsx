"use client";

import Hero from "@/components/ui/Hero";
import ShutterReveal from "@/components/ui/ShutterReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ContactMap from "@/components/shared/ContactMap";
import { projects } from "@/lib/projectsData";
import {
  ArrowRight, MessageSquare, Shield, TrendingUp, Eye, Award,
  Dumbbell, Wifi, HeartPulse, UtensilsCrossed, Baby, Clapperboard,
  Briefcase, Lock, ChevronRight, Quote, Star
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Home() {
  const [activeAmenityTab, setActiveAmenityTab] = useState(0);

  const amenityCategories = [
    {
      name: "Sports & Recreation",
      icon: <Dumbbell className="w-5 h-5" />,
      items: [
        "Resort-style Swimming Pool", "Indoor Badminton Court", "Basketball Court",
        "Cricket Pitch", "Skating Rink", "Jogging Track", "Table Tennis",
        "Billiards Room", "Premium Indoor Golf", "Amphitheatre"
      ]
    },
    {
      name: "Smart Living",
      icon: <Wifi className="w-5 h-5" />,
      items: [
        "Smart Premium Lifts", "Complete Power Backup", "Wi-Fi in Common Areas",
        "All-Weather Air Conditioning", "Premium Marble Flooring",
        "False Ceiling (Drawing, Dining & Kitchen)", "Internal Height – 10.5 Feet"
      ]
    },
    {
      name: "Health & Wellness",
      icon: <HeartPulse className="w-5 h-5" />,
      items: [
        "Fully Equipped Gymnasium", "Spa & Sauna", "Yoga Room",
        "Medical Facilities", "24×7 Ambulance Service", "Meditation Zone"
      ]
    },
    {
      name: "Food & Beverages",
      icon: <UtensilsCrossed className="w-5 h-5" />,
      items: [
        "Signature Club & Café", "Rooftop Lounge", "Barbeque Zone",
        "Open-Air Coffee Area", "Library & Reading Café"
      ]
    },
    {
      name: "Kids & Family",
      icon: <Baby className="w-5 h-5" />,
      items: [
        "Kids' Play Area", "In-House Crèche", "Kids' Corner",
        "Kids' Pool", "Open-to-Sky Lawns"
      ]
    },
    {
      name: "Entertainment",
      icon: <Clapperboard className="w-5 h-5" />,
      items: [
        "Mini Theatre", "Virtual Golf Simulator", "Snooker Zone",
        "Recreation Room", "Iconic Sky Walk"
      ]
    },
    {
      name: "Safety & Security",
      icon: <Lock className="w-5 h-5" />,
      items: [
        "3-Tier Security System", "Complete Camera Surveillance",
        "Panic Button in Every Apartment", "Biometric Entry", "24/7 Guard Service"
      ]
    },
  ];

  const testimonials = [
    {
      name: "Raghav & Simran Kapoor",
      text: "Choosing GDPL was our best decision. The transparency throughout the buying process, the quality of construction, and the attention to detail is unmatched. Our apartment at Regal Heights feels like a five-star resort every single day.",
      rating: 5,
    },
    {
      name: "Dr. Manpreet Singh",
      text: "As an NRI, I needed a developer I could trust completely. GDPL delivered beyond expectations — timely possession, honest dealing, and a home that exceeded every promise. Highly recommended for anyone looking in Mohali.",
      rating: 5,
    },
    {
      name: "Anjali Mehta",
      text: "From the first site visit to final possession, the experience was seamless. The amenities at Regal Residencia are outstanding and the team truly cares about their customers. GDPL stands for trust.",
      rating: 5,
    },
  ];

  const timeline = [
    { year: "2015", title: "The Beginning", desc: "GDPL was founded with a vision to transform the Mohali real estate landscape with transparency and quality construction." },
    { year: "2017", title: "First Milestone", desc: "Successfully delivered our first residential project, earning the trust of hundreds of families in the Tricity region." },
    { year: "2020", title: "Expanding Horizons", desc: "Launched Regal Heights & Regal Residencia — flagship projects that set new benchmarks for luxury living in sector 91." },
    { year: "2023", title: "Market Leadership", desc: "Crossed 500+ delivered units with 100% transparency record. Recognized as one of Mohali's most trusted developers." },
    { year: "2026", title: "The Future Is Now", desc: "With 8 active projects spanning Mohali, Zirakpur, and New Chandigarh — GDPL continues to shape the region's skyline." },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);

  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-gold selection:text-black grain-overlay">
      {/* ═══════════════ 1. HERO ═══════════════ */}
      <Hero />

      {/* ═══════════════ 2. PHILOSOPHY / TAGLINE ═══════════════ */}
      <section className="py-40 md:py-56 bg-transparent relative overflow-hidden">
        {/* Decorative gold accent lines */}
        <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)" }} />
        <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.15), transparent)" }} />

        {/* Left decorative vertical line */}
        <motion.div
          className="absolute left-[8%] top-[15%] bottom-[15%] w-[1px] hidden lg:block"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.2), transparent)", transformOrigin: "top" }}
        />
        {/* Right decorative vertical line */}
        <motion.div
          className="absolute right-[8%] top-[15%] bottom-[15%] w-[1px] hidden lg:block"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.2), transparent)", transformOrigin: "bottom" }}
        />

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Label with ornamental line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-6 mb-16"
          >
            <div className="h-[1px] w-16 md:w-24" style={{ background: "linear-gradient(90deg, transparent, #D4AF37)" }} />
            <p className="section-label">Our Philosophy</p>
            <div className="h-[1px] w-16 md:w-24" style={{ background: "linear-gradient(90deg, #D4AF37, transparent)" }} />
          </motion.div>

          {/* Main tagline — staggered reveal */}
          <div className="max-w-6xl mx-auto text-center">
            {[
              { text: "Shape Skylines.", gold: true, delay: 0 },
              { text: "Value Legacy.", gold: false, delay: 0.15 },
              { text: "Create Communities.", gold: false, delay: 0.3 },
              { text: "Craft Luxury.", gold: true, delay: 0.45 },
            ].map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: false }}
                transition={{ duration: 1, delay: line.delay, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className={`text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[1.1] ${line.gold ? "text-gold-shimmer" : "text-white"}`}>
                  {line.text}
                </h2>
              </motion.div>
            ))}
          </div>

          {/* Ornamental diamond divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-4 my-16"
          >
            <div className="h-[1px] w-20" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5))" }} />
            <div className="w-2 h-2 rotate-45 bg-gold" style={{ boxShadow: "0 0 12px rgba(212,175,55,0.5)" }} />
            <div className="h-[1px] w-20" style={{ background: "linear-gradient(90deg, rgba(212,175,55,0.5), transparent)" }} />
          </motion.div>

          {/* Description in a glassmorphic card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1, delay: 0.7 }}
            className="max-w-2xl mx-auto relative"
          >
            <div className="glass-premium p-10 md:p-12 text-center relative overflow-hidden" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
              {/* Gold corner accents */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t border-l border-gold/30" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b border-r border-gold/30" />

              <p className="text-white/70 text-base md:text-lg font-light leading-relaxed italic">
                &ldquo;We&apos;re fueled by curiosity and creativity. We seek to improve the quality of the
                built environment with subtle, yet confident designs characterised by clean lines
                and forms linked inextricably with function.&rdquo;
              </p>
              <div className="mt-6 flex items-center justify-center gap-3">
                <div className="w-8 h-[1px] bg-gold/40" />
                <span className="text-gold text-[10px] font-black uppercase tracking-[0.4em]">GDPL Mohali</span>
                <div className="w-8 h-[1px] bg-gold/40" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ 3. ELAN-STYLE BIG STAT BAND ═══════════════ */}
      <section className="py-20 relative overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(212,175,55,0.03), rgba(0,0,0,0.8), rgba(212,175,55,0.03))" }}>
        <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)" }} />
        <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent)" }} />
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 md:divide-x md:divide-gold/20">
            {[
              { value: 10, suffix: "+", label: "Years of Trust" },
              { value: 500, suffix: "+", label: "Happy Families" },
              { value: 4, suffix: "", label: "Signature Projects" },
              { value: 8, suffix: "+", label: "Active Developments" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="flex-1 text-center px-8 md:px-12"
              >
                <div className="flex items-baseline justify-center gap-1">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} label="" gold />
                </div>
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 3B. ABOUT GDPL ═══════════════ */}
      <section className="py-32 bg-transparent relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1 }}
            >
              <p className="section-label mb-6">About GDPL</p>
              <div className="w-12 h-[2px] mb-8" style={{ background: "linear-gradient(90deg, #D4AF37, transparent)" }} />
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-10">
                With {new Date().getFullYear() - 2015}+ Years of Trust, GDPL Creates Spaces Where <span className="text-gold-gradient">Dreams Grow</span> & Legacies Begin
              </h3>
              <p className="text-muted text-lg font-light leading-relaxed mb-6">
                GDPL has grown massively with its notable lineage of iconic properties — Regal Heights, Regal Residencia, Regal Empirus, and the upcoming Regal Luxuria. We are committed to expand our fine craftsmanship with trustworthy timely deliveries.
              </p>
              <p className="text-muted text-base font-light leading-relaxed">
                We don&apos;t just build — we manage, consult, train market participants, and create educational content for investors and property buyers across the Tricity region.
              </p>
            </motion.div>

            {/* Homeland-style category cards */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1, delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Residential", count: "4 Projects", desc: "Luxury apartments & independent floors" },
                { label: "Commercial", count: "Coming Soon", desc: "Premium office & retail spaces" },
                { label: "Consulting", count: "360° Coverage", desc: "Expert real estate advisory" },
                { label: "Education", count: "1000+ Hours", desc: "Investor training & content" },
              ].map((cat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="glass-premium p-6 group hover:border-gold/30 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(circle at 50% 0%, rgba(212,175,55,0.06), transparent 70%)" }} />
                  <div className="relative z-10">
                    <p className="text-gold text-[10px] font-black uppercase tracking-[0.3em] mb-2">{cat.label}</p>
                    <p className="text-xl font-black mb-1">{cat.count}</p>
                    <p className="text-white/40 text-xs font-light">{cat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 4. SIGNATURE PROJECTS (Green Lotus style full-bleed) ═══════════════ */}
      <section className="py-32 bg-transparent">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <p className="section-label mb-4">Portfolio</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none">
              Our Signature <span className="text-gold-gradient">Projects</span>
            </h2>
          </motion.div>

          {/* Full-bleed project cards */}
          <div className="space-y-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{ duration: 1 }}
              >
                <Link href={`/projects/${project.slug}`} className="group block">
                  <div className="relative overflow-hidden rounded-3xl glow-gold">
                    {/* Image */}
                    <div className="aspect-[21/9] md:aspect-[21/8] overflow-hidden">
                      <img
                        src={project.heroImage}
                        alt={project.name}
                        className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                      />
                    </div>

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

                    {/* Content on image */}
                    <div className="absolute inset-0 flex items-center p-8 md:p-16">
                      <div className="max-w-lg">
                        <p className="section-label mb-3">{project.location}</p>
                        <h3 className="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tighter leading-none mb-4 group-hover:text-gold transition-colors">
                          {project.name}
                        </h3>
                        <p className="text-white/60 text-xs md:text-sm uppercase tracking-[0.2em] font-bold mb-4">{project.tagline}</p>
                        <p className="text-white/50 text-sm md:text-base font-light leading-relaxed hidden md:block max-w-md">
                          {project.description}
                        </p>
                        <div className="flex items-center gap-3 mt-6 text-gold text-[10px] uppercase tracking-[0.3em] font-black group-hover:gap-5 transition-all">
                          Explore Project <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/projects" className="inline-flex items-center gap-4 btn-gold py-5 px-12 text-[10px] uppercase tracking-[0.3em] font-black rounded-full group">
              View All Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════ 5. AMENITIES TABBED SECTION ═══════════════ */}
      <section className="py-32 bg-transparent relative">
        <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)" }} />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Signature Amenities</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
              Amenities That <span className="text-gold-gradient">Set Us Apart</span>
            </h2>
            <p className="text-muted text-base md:text-lg font-light max-w-2xl mx-auto">
              At GDPL, amenities are not just conveniences — they&apos;re a reflection of our philosophy. Each element is carefully designed to elevate lifestyles.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {amenityCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveAmenityTab(idx)}
                className={`flex items-center gap-2 px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${activeAmenityTab === idx
                  ? "bg-gold text-black border-gold"
                  : "bg-transparent text-muted border-white/10 hover:border-gold/30 hover:text-white"
                  }`}
              >
                {cat.icon}
                <span className="hidden md:inline">{cat.name}</span>
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
              className="glass-premium p-8 md:p-12 rounded-3xl"
            >
              <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-8 flex items-center gap-4">
                <span className="text-gold">{amenityCategories[activeAmenityTab].icon}</span>
                {amenityCategories[activeAmenityTab].name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {amenityCategories[activeAmenityTab].items.map((item, i) => (
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

      {/* ═══════════════ 6. WHY CHOOSE GDPL ═══════════════ */}
      <section className="py-32 bg-transparent relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Why Choose Us</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              THE <span className="text-gold-gradient">GDPL</span> DIFFERENCE
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Shield className="w-6 h-6" />, title: "100% Transparency", description: "Complete documentation and legal clarity at every step of your investment journey." },
              { icon: <TrendingUp className="w-6 h-6" />, title: "Strategic Locations", description: "Properties in high-growth corridors of Mohali for maximum appreciation." },
              { icon: <Eye className="w-6 h-6" />, title: "360° Market Coverage", description: "Build, manage, consult, and educate — we cover every facet of real estate." },
              { icon: <Award className="w-6 h-6" />, title: "Premium Construction", description: "World-class materials and finishes that define luxury at every touchpoint." },
            ].map((prop, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="glass-premium p-8 rounded-2xl group hover:border-gold/30 transition-all duration-500"
              >
                <div className="mb-6 p-3 bg-gold/10 w-fit rounded-xl border border-gold/15 text-gold group-hover:bg-gold group-hover:text-black transition-all duration-500">
                  {prop.icon}
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight mb-3">{prop.title}</h4>
                <p className="text-muted text-sm font-light leading-relaxed">{prop.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 7. TESTIMONIALS ═══════════════ */}
      <section className="py-32 bg-transparent relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)" }} />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Voices of Trust</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              What Our <span className="text-gold-gradient">Clients</span> Say
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="glass-premium p-10 md:p-16 rounded-3xl text-center relative"
              >
                <Quote className="w-10 h-10 text-gold/30 mx-auto mb-8" />
                <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed italic mb-10">
                  &ldquo;{testimonials[activeTestimonial].text}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="text-white font-bold text-lg">{testimonials[activeTestimonial].name}</p>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTestimonial === idx
                    ? "bg-gold scale-125"
                    : "bg-white/20 hover:bg-white/40"
                    }`}
                  style={activeTestimonial === idx ? { boxShadow: "0 0 10px rgba(212,175,55,0.5)" } : {}}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 8. TIMELINE ═══════════════ */}
      <section className="py-32 bg-transparent relative">
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
            className="text-center mb-20"
          >
            <p className="section-label mb-4">Our Journey</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
              Legacy of <span className="text-gold-gradient">Trust</span>
            </h2>
          </motion.div>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Vertical line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2" style={{ background: "linear-gradient(to bottom, transparent, #D4AF37 10%, #D4AF37 90%, transparent)" }} />

            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className={`relative flex items-start gap-8 mb-16 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}
              >
                {/* Gold dot */}
                <div className="absolute left-4 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-gold z-10 mt-1" style={{ boxShadow: "0 0 12px rgba(212,175,55,0.6)" }} />

                {/* Content */}
                <div className={`ml-12 md:ml-0 md:w-[calc(50%-3rem)] ${idx % 2 === 0 ? "md:pr-8 md:text-right" : "md:pl-8"}`}>
                  <div className="glass-premium p-6 md:p-8 rounded-2xl">
                    <span className="text-gold text-3xl md:text-4xl font-black tracking-tighter">{item.year}</span>
                    <h4 className="text-lg font-black uppercase tracking-tight mt-2 mb-3">{item.title}</h4>
                    <p className="text-muted text-sm font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 9. MAP ═══════════════ */}
      <ContactMap />

      {/* ═══════════════ 10. VISION CTA ═══════════════ */}
      <section className="relative py-40 overflow-hidden" style={{ background: "linear-gradient(135deg, #FFFFFF 0%, #F8F4E8 50%, #FFFFFF 100%)" }}>
        <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />
        <div className="absolute bottom-0 left-0 w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, #D4AF37, transparent)" }} />

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[10px] uppercase tracking-[0.5em] mb-8 font-bold text-gold/60">Luxury Isn&apos;t Complete Without Responsibility</p>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-16 text-black">
                LET&apos;S IMAGINE YOUR FUTURE IN{" "}
                <span style={{
                  background: "linear-gradient(135deg, #B38F36 0%, #D4AF37 50%, #E8C55A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  MOHALI
                </span>
              </h2>
              <Link
                href="https://wa.me/917710380077"
                target="_blank"
                className="inline-flex items-center gap-4 py-6 px-12 rounded-full text-xs font-black uppercase tracking-[0.4em] btn-gold group"
              >
                <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Connect with us
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}
