"use client";

import Hero from "@/components/ui/Hero";
import ShutterReveal from "@/components/ui/ShutterReveal";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ContactMap from "@/components/shared/ContactMap";
import { projects } from "@/lib/projectsData";
import {
  ArrowRight, MessageSquare, Shield, TrendingUp, Eye, Award,
  Dumbbell, Wifi, HeartPulse, UtensilsCrossed, Baby, Clapperboard,
  Briefcase, Lock, ChevronRight, Quote, Star, Waves, Trophy,
  Target, Footprints, Tablets, Gamepad2, Club, Mic2, Zap,
  ThermometerSnowflake, LayoutPanelLeft, Grid3X3, MoveUp,
  Activity, Stethoscope, PlusCircle, Leaf, Coffee,
  BookOpen, Pizza, Palette, Ghost, Wind, Video, Crosshair,
  Fingerprint, UserCheck, BellRing, Smartphone, Music
} from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import SignaturePortfolio from "@/components/ui/SignaturePortfolio";

export default function Home() {
  const [activeAmenityTab, setActiveAmenityTab] = useState(0);

  const amenityCategories = [
    {
      name: "Sports & Recreation",
      icon: <Dumbbell className="w-5 h-5" />,
      items: [
        { name: "Resort-style Swimming Pool", icon: <Waves className="w-4 h-4" /> },
        { name: "Indoor Badminton Court", icon: <Trophy className="w-4 h-4" /> },
        { name: "Basketball Court", icon: <Target className="w-4 h-4" /> },
        { name: "Cricket Pitch", icon: <Target className="w-4 h-4" /> },
        { name: "Skating Rink", icon: <Wind className="w-4 h-4" /> },
        { name: "Jogging Track", icon: <Footprints className="w-4 h-4" /> },
        { name: "Table Tennis", icon: <Tablets className="w-4 h-4" /> },
        { name: "Billiards Room", icon: <Gamepad2 className="w-4 h-4" /> },
        { name: "Premium Indoor Golf", icon: <Target className="w-4 h-4" /> },
        // { name: "Amphitheatre", icon: <Music className="w-4 h-4" /> }
      ]
    },
    {
      name: "Smart Living",
      icon: <Wifi className="w-5 h-5" />,
      items: [
        { name: "Smart Premium Lifts", icon: <MoveUp className="w-4 h-4" /> },
        { name: "Complete Power Backup", icon: <Zap className="w-4 h-4" /> },
        { name: "Wi-Fi in Common Areas", icon: <Wifi className="w-4 h-4" /> },
        { name: "All-Weather Air Conditioning", icon: <ThermometerSnowflake className="w-4 h-4" /> },
        { name: "Premium Marble Flooring", icon: <Grid3X3 className="w-4 h-4" /> },
        { name: "False Ceiling", icon: <LayoutPanelLeft className="w-4 h-4" /> },
        { name: "Internal Height – 10.5 Feet", icon: <MoveUp className="w-4 h-4" /> }
      ]
    },
    {
      name: "Health & Wellness",
      icon: <HeartPulse className="w-5 h-5" />,
      items: [
        { name: "Fully Equipped Gymnasium", icon: <Dumbbell className="w-4 h-4" /> },
        { name: "Spa & Sauna", icon: <Wind className="w-4 h-4" /> },
        { name: "Yoga Room", icon: <Leaf className="w-4 h-4" /> },
        { name: "Medical Facilities", icon: <Stethoscope className="w-4 h-4" /> },
        { name: "24×7 Ambulance Service", icon: <PlusCircle className="w-4 h-4" /> },
        { name: "Meditation Zone", icon: <HeartPulse className="w-4 h-4" /> }
      ]
    },
    {
      name: "Food & Beverages",
      icon: <UtensilsCrossed className="w-5 h-5" />,
      items: [
        { name: "Signature Club & Café", icon: <Club className="w-4 h-4" /> },
        { name: "Rooftop Lounge", icon: <Wind className="w-4 h-4" /> },
        { name: "Barbeque Zone", icon: <Pizza className="w-4 h-4" /> },
        { name: "Open-Air Coffee Area", icon: <Coffee className="w-4 h-4" /> },
        { name: "Library & Reading Café", icon: <BookOpen className="w-4 h-4" /> }
      ]
    },
    {
      name: "Kids & Family",
      icon: <Baby className="w-5 h-5" />,
      items: [
        { name: "Kids' Play Area", icon: <Palette className="w-4 h-4" /> },
        { name: "In-House Crèche", icon: <Baby className="w-4 h-4" /> },
        { name: "Kids' Corner", icon: <Ghost className="w-4 h-4" /> },
        { name: "Kids' Pool", icon: <Waves className="w-4 h-4" /> },
        { name: "Open-to-Sky Lawns", icon: <Leaf className="w-4 h-4" /> }
      ]
    },
    {
      name: "Entertainment",
      icon: <Clapperboard className="w-5 h-5" />,
      items: [
        { name: "Mini Theatre", icon: <Video className="w-4 h-4" /> },
        { name: "Virtual Golf Simulator", icon: <Target className="w-4 h-4" /> },
        { name: "Snooker Zone", icon: <Gamepad2 className="w-4 h-4" /> },
        { name: "Recreation Room", icon: <Music className="w-4 h-4" /> },
        { name: "Iconic Sky Walk", icon: <Footprints className="w-4 h-4" /> }
      ]
    },
    {
      name: "Safety & Security",
      icon: <Lock className="w-5 h-5" />,
      items: [
        { name: "3-Tier Security System", icon: <Shield className="w-4 h-4" /> },
        { name: "Complete Camera Surveillance", icon: <Video className="w-4 h-4" /> },
        { name: "Panic Button", icon: <BellRing className="w-4 h-4" /> },
        { name: "Biometric Entry", icon: <Fingerprint className="w-4 h-4" /> },
        { name: "24/7 Guard Service", icon: <UserCheck className="w-4 h-4" /> }
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
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);

  return (
    <main className="min-h-screen bg-transparent text-noir selection:bg-noir selection:text-white grain-overlay">
      {/* ═══════════════ 1. HERO ═══════════════ */}
      <Hero />

      {/* ═══════════════ 2. ABOUT GDPL ═══════════════ */}
      <section className="py-20 bg-transparent relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <p className="section-label mb-6">About GDPL</p>
              <div className="w-12 h-[2px] mb-8 bg-black/10" />
              <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-[0.9] mb-10 text-noir">
                With {new Date().getFullYear() - 2015}+ Years of Trust, GDPL Creates Spaces Where Dreams Grow & Legacies Begin
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
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
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
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="glass-premium p-8 group border border-black/5 transition-all duration-500 relative overflow-hidden"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-black/5" />
                  <div className="relative z-10">
                    <p className="text-noir/40 text-[10px] font-black uppercase tracking-[0.3em] mb-4">{cat.label}</p>
                    <p className="text-2xl font-black mb-2 tracking-tight group-hover:text-noir transition-colors">{cat.count}</p>
                    <p className="text-noir/40 text-[11px] font-light leading-relaxed">{cat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 3. ELAN-STYLE BIG STAT BAND ═══════════════ */}
      <section className="py-12 relative overflow-hidden bg-noir">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-0 md:divide-x md:divide-white/10">
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
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="flex-1 text-center px-8 md:px-12"
              >
                <div className="flex items-baseline justify-center gap-1 group">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} label="" className="text-white" />
                </div>
                <p className="text-[9px] md:text-[10px] uppercase tracking-[0.4em] text-white/40 font-bold mt-2">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 3B. OUR PHILOSOPHY ═══════════════ */}
      <section className="py-16 md:py-20 bg-transparent relative overflow-hidden">
        {/* Decorative accent lines */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-black/5" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-black/5" />

        {/* Left decorative vertical line */}
        <motion.div
          className="absolute left-[8%] top-[15%] bottom-[15%] w-[1px] hidden lg:block"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.05), transparent)", transformOrigin: "top" }}
        />
        {/* Right decorative vertical line */}
        <motion.div
          className="absolute right-[8%] top-[15%] bottom-[15%] w-[1px] hidden lg:block"
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.05), transparent)", transformOrigin: "bottom" }}
        />

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Label with ornamental line */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-6 mb-16"
          >
            <div className="h-[1px] w-16 md:w-24 bg-black/10" />
            <p className="section-label !text-noir/40">Our Philosophy</p>
            <div className="h-[1px] w-16 md:w-24 bg-black/10" />
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
                viewport={{ once: true }}
                transition={{ duration: 1, delay: line.delay, ease: [0.16, 1, 0.3, 1] }}
              >
                <h2 className={`text-4xl md:text-6xl lg:text-8xl font-black uppercase tracking-tighter leading-[1.1] ${line.gold ? "" : "opacity-80"}`}>
                  {line.text}
                </h2>
              </motion.div>
            ))}
          </div>

          {/* Ornamental diamond divider */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center justify-center gap-4 my-16"
          >
            <div className="h-[1px] w-20 bg-black/5" />
            <div className="w-1.5 h-1.5 rotate-45 bg-black" />
            <div className="h-[1px] w-20 bg-black/5" />
          </motion.div>

          {/* Description in a glassmorphic card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.7 }}
            className="max-w-4xl mx-auto relative"
          >
            <div className="glass-premium p-12 md:p-16 text-center relative overflow-hidden group border border-black/5 transition-all duration-700">
              <p className="text-noir/80 text-lg md:text-2xl font-light leading-relaxed italic relative z-10 font-serif">
                &ldquo;We&apos;re fueled by curiosity and creativity. We seek to improve the quality of the
                built environment with subtle, yet confident designs characterised by clean lines
                and forms linked inextricably with function.&rdquo;
              </p>
              <div className="mt-10 flex items-center justify-center gap-4 relative z-10">
                <div className="w-12 h-[1px] bg-black/10" />
                <span className="text-noir text-xs font-black uppercase tracking-[0.5em]">GDPL Mohali</span>
                <div className="w-12 h-[1px] bg-black/10" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>


      {/* ═══════════════ 4. SIGNATURE PROJECTS (Interactive Portfolio) ═══════════════ */}
      <SignaturePortfolio />

      {/* ═══════════════ 5. AMENITIES TABBED SECTION ═══════════════ */}
      <section className="py-32 bg-transparent relative">
        <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)" }} />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Signature Amenities</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">
              Amenities That Set Us Apart
            </h2>
            <p className="text-muted text-base md:text-lg font-light max-w-2xl mx-auto">
              At GDPL, amenities are not just conveniences — they&apos;re a reflection of our philosophy. Each element is carefully designed to elevate lifestyles.
            </p>
          </motion.div>

          {/* Tabs - Scrollable on Mobile */}
          <div className="flex xl:justify-center gap-3 mb-16 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6 snap-x snap-mandatory">
            {amenityCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveAmenityTab(idx)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border whitespace-nowrap snap-center ${activeAmenityTab === idx
                  ? "bg-noir text-white border-noir shadow-lg"
                  : "bg-transparent text-neutral-400 border-black/5 hover:border-black/20 hover:text-noir"
                  }`}
              >
                {cat.icon}
                <span>{cat.name}</span>
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
              className="bg-noir p-8 md:p-12 rounded-3xl text-white shadow-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
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
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0 group-hover:bg-noir group-hover:text-gold transition-all duration-500 text-white/40">
                      {item.icon}
                    </div>
                    <span className="text-white/80 text-xs md:text-sm font-light tracking-wide">{item.name}</span>
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
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Why Choose Us</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-noir">
              THE GDPL DIFFERENCE
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
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="glass-premium p-8 rounded-2xl group hover:border-gold/30 transition-all duration-500"
              >
                <div className="mb-6 p-3 bg-black/5 w-fit rounded-xl border border-black/10 text-noir group-hover:bg-noir group-hover:text-white transition-all duration-500">
                  {prop.icon}
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight mb-3 text-noir">{prop.title}</h4>
                <p className="text-noir/60 text-sm font-light leading-relaxed">{prop.description}</p>
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
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <p className="section-label mb-4">Voices of Trust</p>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-noir">
              What Our Clients Say
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
                className="glass-premium p-10 md:p-16 rounded-3xl text-center relative border border-black/5 shadow-lg"
              >
                <Quote className="w-10 h-10 text-black/10 mx-auto mb-8" />
                <p className="text-lg md:text-xl text-noir/80 font-light leading-relaxed italic mb-10">
                  &ldquo;{testimonials[activeTestimonial].text}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-noir fill-noir" />
                  ))}
                </div>
                <p className="text-noir font-bold text-lg">{testimonials[activeTestimonial].name}</p>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${activeTestimonial === idx
                    ? "bg-noir scale-125"
                    : "bg-black/10 hover:bg-black/20"
                    }`}
                  style={activeTestimonial === idx ? { boxShadow: "0 0 10px rgba(212,175,55,0.5)" } : {}}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 8. TIMELINE (Sticky Split-Screen) ═══════════════ */}
      <section className="relative bg-transparent">
        <div className="flex flex-col md:flex-row">
          {/* Left Side: Sticky Year/Title (Black) */}
          <div className="hidden md:block w-1/2 h-screen sticky top-0 bg-noir overflow-hidden z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
            <div className="h-full flex items-center justify-center p-20 relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTimelineStep}
                  initial={{ opacity: 0, x: -40, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: 40, filter: "blur(10px)" }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center"
                >
                  <p className="text-white/40 text-xs font-black uppercase tracking-[0.5em] mb-8">Legacy of Trust</p>
                  <h3 className="text-8xl lg:text-[12rem] font-black tracking-tighter text-white leading-none mb-4">
                    {timeline[activeTimelineStep].year}
                  </h3>
                  <h4 className="text-2xl font-bold uppercase tracking-widest text-white/80">
                    {timeline[activeTimelineStep].title}
                  </h4>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile Year Header */}
          <div className="md:hidden bg-noir py-10 px-6 text-center">
            <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.5em] mb-4">Our Journey</p>
            <h2 className="text-5xl font-black text-white uppercase tracking-tighter">Legacy of Trust</h2>
          </div>

          {/* Right Side: Scrolling Content (Beach) */}
          <div className="w-full md:w-1/2 bg-transparent">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className="min-h-[60vh] md:min-h-screen flex items-center px-8 md:px-20 py-24 border-b border-black/5 last:border-0"
              >
                <div className="max-w-md">
                  <div className="md:hidden mb-6 flex items-baseline gap-4">
                    <span className="text-4xl font-black text-noir">{item.year}</span>
                    <span className="text-xs font-bold uppercase tracking-widest text-noir/40">{item.title}</span>
                  </div>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    onViewportEnter={() => setActiveTimelineStep(idx)}
                    viewport={{ margin: "-45% 0px -45% 0px" }}
                    transition={{ duration: 1 }}
                  >
                    <div className="w-12 h-[2px] bg-black/10 mb-8" />
                    <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-8 text-noir leading-tight">
                      {item.desc.split(". ")[0]}.
                    </h3>
                    <p className="text-noir/60 text-lg font-light leading-relaxed">
                      {item.desc.split(". ").slice(1).join(". ")}
                    </p>
                    <div className="mt-12 flex items-center justify-between">
                      <div className="text-[10px] uppercase tracking-[0.3em] font-black text-noir/30">Milestone {idx + 1}</div>
                      <div className="w-20 h-[1px] bg-black/5" />
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ 9. MAP ═══════════════ */}
      <ContactMap />

      {/* ═══════════════ 10. VISION CTA ═══════════════ */}
      <section className="relative py-40 overflow-hidden bg-noir">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-[10px] uppercase tracking-[0.5em] mb-8 font-bold text-white/40">Luxury Isn&apos;t Complete Without Responsibility</p>
              <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-16 text-white">
                LET&apos;S IMAGINE YOUR FUTURE IN <span className="opacity-30 text-white">MOHALI</span>
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
