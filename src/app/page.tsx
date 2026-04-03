"use client";

import Hero from "@/components/ui/Hero";
import ShutterReveal from "@/components/ui/ShutterReveal";
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
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
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
    { year: "2023", title: "Market Leadership", desc: "Crossed 300+ delivered units with 100% transparency record. Recognized as one of Mohali's most trusted developers." },
    { year: "2026", title: "The Future Is Now", desc: "With 8 active projects spanning Mohali, Zirakpur, and New Chandigarh — GDPL continues to shape the region's skyline." },
  ];

  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeTimelineStep, setActiveTimelineStep] = useState(0);
  const timelineRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Robust IntersectionObserver — fires when item crosses the vertical midpoint
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    timelineRefs.current.forEach((el, idx) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveTimelineStep(idx);
        },
        {
          rootMargin: "-45% 0px -45% 0px",
          threshold: 0,
        }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const philosophyRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: philosophyRef,
    offset: ["start start", "end end"]
  });

  // Smooth Linear Mapping: 'Our' slowly travels down between lines as the user scrolls.
  // No staircase holding—it directly correlates position to the page scroll depth.
  const ourYRaw = useTransform(
    scrollYProgress,
    [0.1, 0.4, 0.7, 0.95],
    [0, 100, 200, 300]
  );
  // Extremely smooth spring to act as a shock absorber for the mouse wheel
  const smoothOurYRaw = useSpring(ourYRaw, { stiffness: 80, damping: 20, restDelta: 0.001 });
  // Convert the smoothed number back into a CSS percentage string
  // Add a strict clamp so the label NEVER scrolls above 'Vision' (0%) or below 'Legacy' (300%)
  const smoothOurY = useTransform(smoothOurYRaw, (y) => {
    const clampedY = Math.max(0, Math.min(300, y));
    return `${clampedY}%`;
  });

  return (
    <main className="min-h-screen bg-transparent text-white selection:bg-noir selection:text-white grain-overlay">
      {/* ═══════════════ 1. HERO ═══════════════ */}
      <Hero />

      {/* ═══════════════ 2. ABOUT Gdpl ═══════════════ */}
      <section className="pt-12 pb-24 bg-transparent relative">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              <p className="section-label mb-6">About Gdpl</p>
              <div className="w-12 h-[2px] mb-8 bg-white/10" />
              <h3 className="text-3xl md:text-5xl font-normal capitalize tracking-normal leading-tight mb-8 text-white font-serif">
                A Legacy of <span className="text-[#D4AF37] font-serif">Trust.</span><br /> A Standard of <span className="text-[#D4AF37] font-serif">Royal Living.</span>
              </h3>
              <p className="text-white text-xl font-bold leading-tight mb-8">
                At Gdpl, every development is a bespoke creation—meticulously designed to reflect prestige, comfort, and timeless elegance.
              </p>
              <p className="text-muted text-lg font-light leading-relaxed">
                From panoramic surroundings to thoughtfully curated spaces, we create sanctuaries that embody the pinnacle of modern living. With an unwavering commitment to quality and trust, we deliver not just homes, but powerful investments for a secure and elevated future.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[
                { label: "Portfolio", count: "4 Signature Projects", desc: "Across prime sectors of Mohali" },
                { label: "Legacy", count: "11+ Years", desc: "Of trust and consistent delivery" },
                { label: "Delivered", count: "300+ Homes", desc: "Built with consistency and care" },
                { label: "Land Portfolio", count: "25+ Acres", desc: "Spanning across signature Gdpl developments" },
              ].map((cat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="glass-premium p-8 group border border-white/5 transition-all duration-500 relative overflow-hidden h-full flex flex-col justify-center"
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-white/5" />
                  <div className="relative z-10">
                    <p className="text-white/40 text-[14px] font-normal capitalize tracking-[0.3em] mb-3 font-serif">{cat.label}</p>
                    <p className="text-xl md:text-2xl font-black mb-2 tracking-tight group-hover:text-white transition-colors leading-tight capitalize">{cat.count}</p>
                    <p className="text-white/60 text-xs md:text-sm font-light leading-relaxed">{cat.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 3B. Our Philosophy (Smooth Linear Sticky Scroll) ═══════════════ */}
      <div
        ref={philosophyRef}
        className="h-[160vh] relative z-20"
      >
        <section className="sticky top-[10vh] md:top-[12vh] flex flex-col items-center overflow-hidden w-full bg-[#06110d] text-white py-12 px-4 md:px-6 rounded-none z-10 shadow-3xl">

          {/* 🖼 Background Images Layer */}
          <div className="absolute inset-0 pointer-events-none z-0">
            {/* Desktop Background (hidden on mobile) */}
            <img
              src="/images/regal-luxuria/WhatsApp%20Image%202026-04-01%20at%205.43.10%20PM.jpeg"
              alt=""
              className="hidden md:block w-full h-full object-cover opacity-30 object-center"
            />
            {/* Mobile Background (visible only on mobile) */}
            <img
              src="/images/regal-luxuria/WhatsApp%20Image%202026-04-01%20at%205.43.56%20PM.jpeg"
              alt=""
              className="block md:hidden w-full h-full object-cover opacity-30 object-center"
            />
            {/* Overlay Gradient to dim the images and keep text readable */}
            <div className="absolute inset-0 bg-[#06110d]/20" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#06110d] via-transparent to-[#06110d]" />
            {/* Subtle Ruby glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(212,175,55,0.05)_0%,transparent_60%)]" />
          </div>

          <div className="container mx-auto relative z-10 flex flex-col items-center">
            {/* Header Safety Zone */}
            <div className="w-full text-left mb-6 md:absolute md:top-0 md:left-0 md:mb-0">
              <span className="text-[14px] md:text-[11px] font-normal capitalize tracking-[0.6em] text-white/50 whitespace-nowrap font-serif">
                Our Philosophy
              </span>
            </div>

            {/* Main content grid - Side-by-Side with wrapping support */}
            <div className="flex flex-row items-start justify-center w-full max-w-5xl mx-auto relative px-2">
              {/* Traveling OUR label track */}
              <div className="relative w-[25%] md:w-[30%] flex justify-end pr-3">
                <motion.div
                  style={{ y: smoothOurY }}
                  className="h-[8vh] md:h-[12vh] flex items-center justify-end"
                >
                  <h2 className="text-[clamp(40px,8vw,80px)] font-black font-serif tracking-[0.12em] capitalize leading-none bg-gradient-to-br from-[#fffbe0] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent drop-shadow-[0_2px_24px_rgba(212,175,55,0.35)]">
                    Our
                  </h2>
                </motion.div>
              </div>

              {/* Tagline rows - Full content with wrapping enabled on mobile */}
              <div className="w-[75%] md:w-[70%] flex flex-col">
                {[
                  { head: "Vision", body: "Shapes Skylines." },
                  { head: "Craft", body: "Builds Sanctuaries." },
                  { head: "Design", body: "Defines Distinction." },
                  { head: "Legacy", body: "Commands Trust." },
                ].map((line, i) => (
                  <motion.div
                    key={i}
                    className="h-[8vh] md:h-[12vh] flex items-center"
                  >
                    <h2 className="text-lg md:text-3xl lg:text-4xl font-normal capitalize tracking-normal leading-tight text-white whitespace-normal md:whitespace-nowrap overflow-visible font-serif">
                      <span>
                        {line.head}{" "}
                        <span className="text-white opacity-40 ml-1 md:ml-2">
                          {line.body}
                        </span>
                      </span>
                    </h2>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Description Fixed Visibility */}
            <div className="mt-6 md:absolute md:-bottom-2 md:right-0 max-w-sm text-center md:text-right hidden lg:block">
              <p className="text-[14px] text-white/50 leading-relaxed font-light capitalize tracking-[0.2em] font-serif">
                Built on Regal legacy, Gdpl crafts iconic spaces while guiding Tricity with trusted real estate expertise
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* ═══════════════ 4. SIGNATURE PROJECTS ═══════════════ */}
      <SignaturePortfolio />

      {/* ═══════════════ 5. AMENITIES ═══════════════ */}
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
            <h2 className="text-4xl md:text-6xl font-normal capitalize tracking-normal leading-none mb-6 font-serif">
              Amenities That Set Us Apart
            </h2>
            <p className="text-muted text-base md:text-lg font-light max-w-2xl mx-auto">
              At Gdpl, amenities are not just conveniences — they&apos;re a reflection of our philosophy. Each element is carefully designed to elevate lifestyles.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex xl:justify-center gap-3 mb-16 overflow-x-auto pb-4 no-scrollbar -mx-6 px-6 snap-x snap-mandatory">
            {amenityCategories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveAmenityTab(idx)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-[14px] font-black capitalize tracking-[0.2em] transition-all duration-300 border whitespace-nowrap snap-center ${activeAmenityTab === idx
                  ? "bg-noir text-white border-noir shadow-lg"
                  : "bg-transparent text-neutral-400 border-white/5 hover:border-white/20 hover:text-white"
                  }`}
              >
                {cat.icon}
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

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
              <h3 className="text-2xl md:text-3xl font-normal capitalize tracking-normal mb-8 flex items-center gap-4 font-serif">
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
            <h2 className="text-4xl md:text-6xl font-normal capitalize tracking-normal leading-none text-white font-serif">
              The Gdpl Difference
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
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
                className="glass-premium p-10 rounded-2xl group hover:border-gold/30 transition-all duration-500"
              >
                <div className="mb-8 p-3 bg-white/5 w-fit rounded-xl border border-white/10 text-white group-hover:bg-noir group-hover:text-white transition-all duration-500">
                  {prop.icon}
                </div>
                <h4 className="text-xl md:text-2xl font-normal capitalize tracking-normal mb-5 text-white font-serif">{prop.title}</h4>
                <p className="text-white/60 text-base font-light leading-relaxed">{prop.description}</p>
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
            <h2 className="text-4xl md:text-6xl font-normal capitalize tracking-normal leading-none text-white font-serif">
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
                className="glass-premium p-10 md:p-16 rounded-3xl text-center relative border border-white/5 shadow-lg"
              >
                <Quote className="w-10 h-10 text-white/10 mx-auto mb-8" />
                <p className="text-lg md:text-xl text-white/80 font-light leading-relaxed italic mb-10">
                  &ldquo;{testimonials[activeTestimonial].text}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-white fill-noir" />
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
                    ? "bg-noir scale-125"
                    : "bg-white/10 hover:bg-white/20"
                    }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ 8. TIMELINE (Sticky Split-Screen) ═══════════════ */}
      <section className="relative bg-transparent">
        <div className="flex flex-col md:flex-row">
          {/* Left Side: Sticky Year */}
          <div className="hidden md:block w-1/2 h-screen sticky top-0 bg-noir overflow-hidden z-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05)_0%,transparent_70%)]" />
            <div className="h-full flex items-center justify-center p-20 relative">
              <div className="text-center transition-all duration-300">
                <p className="text-white/40 text-[10px] font-normal tracking-[0.4em] capitalize mb-8 font-serif">Legacy of Trust</p>
                <h3 className="text-8xl lg:text-[12rem] font-normal tracking-normal text-white leading-none mb-4 font-serif transition-all duration-300">
                  {timeline[activeTimelineStep].year}
                </h3>
                <h4 className="text-2xl font-bold capitalize tracking-widest text-white/80 transition-all duration-300">
                  {timeline[activeTimelineStep].title}
                </h4>
              </div>
            </div>
          </div>

          <div className="md:hidden bg-noir py-10 px-6 text-center">
            <p className="text-white/40 text-[14px] font-normal capitalize tracking-[0.5em] mb-4 font-serif">Our Journey</p>
            <h2 className="text-5xl font-normal text-white capitalize tracking-normal font-serif">Legacy of Trust</h2>
          </div>

          {/* Right Side: Content */}
          <div className="w-full md:w-1/2 bg-transparent">
            {timeline.map((item, idx) => (
              <div
                key={idx}
                className="min-h-[100vh] flex items-center px-8 md:px-20 py-12 md:py-16 border-b border-white/5 last:border-0"
              >
                <div className="max-w-md">
                  <div className="md:hidden mb-6 flex items-baseline gap-4">
                    <span className="text-4xl font-normal text-white font-serif">{item.year}</span>
                    <span className="text-xs font-bold capitalize tracking-widest text-white/40">{item.title}</span>
                  </div>
                  <motion.div
                    ref={(el) => { timelineRefs.current[idx] = el; }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px" }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-12 h-[2px] bg-white/10 mb-8" />
                    <h3 className="text-2xl md:text-3xl font-normal capitalize tracking-normal mb-8 text-white leading-tight font-serif">
                      {item.desc.split(". ")[0]}.
                    </h3>
                    <p className="text-white/60 text-lg font-light leading-relaxed">
                      {item.desc.split(". ").slice(1).join(". ")}
                    </p>
                    <div className="mt-12 flex items-center justify-between">
                      <div className="text-[14px] capitalize tracking-[0.3em] font-normal text-white/30 font-serif">Milestone {idx + 1}</div>
                      <div className="w-20 h-[1px] bg-white/5" />
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
              <p className="text-[14px] capitalize tracking-[0.5em] mb-8 font-normal text-white/40 font-serif">Luxury Isn&apos;t Complete Without Responsibility</p>
              <h2 className="text-4xl md:text-7xl font-normal capitalize tracking-normal leading-none mb-16 text-white text-balance font-serif">
                Let&apos;s imagine your future in <span className="text-[#D4AF37] font-serif">Mohali</span>
              </h2>
              <Link
                href="https://wa.me/917710380077"
                target="_blank"
                className="inline-flex items-center gap-4 py-6 px-12 rounded-full text-xs font-black capitalize tracking-[0.4em] btn-gold group"
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
