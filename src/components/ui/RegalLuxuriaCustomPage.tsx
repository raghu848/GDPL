"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import PageHero from "@/components/sections/shared/PageHero";
import EditorialSection from "@/components/sections/shared/EditorialSection";
import SectionHeader from "@/components/sections/shared/SectionHeader";
import CTASection from "@/components/sections/shared/CTASection";
import MagneticButton, { Arrow } from "@/components/ui/MagneticButton";
import { useLenis } from "@/components/shared/SmoothScroll";

const WHATSAPP = "https://wa.me/917789000077";

// Project Data expanded for Luxury Presentation
const luxuriaData = {
  name: "Regal Luxuria",
  tagline: "The Pinnacle of Architectural Poetry, Curated for the Discerning Few.",
  location: "Sector 114, Mohali",
  status: "Upcoming",
  area: "6.0 Acres",
  residencesSummary: "Bespoke Plots & Showrooms",
  totalUnits: "70 Signature Estates",
  projectType: "Super-Premium Commercial & Retail Plots",
  longDescription:
    "Regal Luxuria is the undisputed crown jewel of the GDPL portfolio. Positioned in the heart of Sector 114, Mohali, it is a master-planned sanctuary tailored to exceed the loftiest global benchmarks. From wide tree-lined boulevards and architectural coherence to underground cabling and state-of-the-art security systems, every touchpoint has been curated with uncompromising rigor.\n\nWhether establishing a flagship luxury showroom, a corporate headquarters, or a high-end gourmet destination, Regal Luxuria provides the ideal foundations for success. This is not merely an investment — it is a physical monument to your legacy.",
  heroImage: "/images/regal-luxuria/hero.jpg",
  heroImageAlt: "A majestic rendering of Regal Luxuria commercial facade under a twilight sky",
  galleryImages: [
    { src: "/images/regal-luxuria/lobby.jpg", alt: "Corporate lobby entrance", label: "Grand Atrium Lobby", category: "Architectural Mastery" },
    { src: "/images/regal-luxuria/pool.jpg", alt: "Rooftop infinity pool view", label: "Sky Lounge & Pool", category: "Wellness Sanctum" },
    { src: "/images/regal-luxuria/living.jpg", alt: "Modern luxury corporate lounge", label: "VIP Executive Lounge", category: "Elite Socials" },
  ],
  materials: [
    {
      name: "Calacatta Gold Marble",
      use: "Lobby & Plaza Facade",
      description: "Impeccably veined, sourced from Italian quarries. Reflects natural light to create a bright, cathedral-like glow.",
      swatch: "from-[#eae6df] to-[#d6cfc4]",
    },
    {
      name: "Brushed Bronze & Brass",
      use: "Signage & Trim Details",
      description: "Meticulously finished details designed to age gracefully with a rich, tactile patina that speaks of quality.",
      swatch: "from-[#e3ceaf] to-[#bfa886]",
    },
    {
      name: "Acoustic Smart Glass",
      use: "Showroom Frontages",
      description: "Double-glazed, high-clarity structural glazing providing perfect acoustic isolation while maintaining thermal comfort.",
      swatch: "from-[#d2dfdf] to-[#adc3c3]",
    },
    {
      name: "Sustainable Hardwoods",
      use: "Pedestrian Boulevards",
      description: "Reclaimed, ultra-durable teak and ipe cladding that grounds the modern structures in a warm, biophilic aesthetic.",
      swatch: "from-[#cfbfaf] to-[#a38f7a]",
    },
  ],
  amenities: [
    {
      category: "The Sanctum (Wellness)",
      description: "Spaces designed for physical rejuvenation and clarity of mind.",
      items: [
        { name: "Rooftop Wellness Spa", desc: "Private treatment suites, steam chambers, and hydrotherapy." },
        { name: "Signature Infinity Pool", desc: "Temp-controlled swimming lanes overlooking the Mohali skyline." },
        { name: "Zen Meditation Court", desc: "Biophilic pocket gardens with sound-masked water features." },
        { name: "Executive Fitness Centre", desc: "Cardio-vascular machinery and private pilates instructors." },
      ],
    },
    {
      category: "The Salon (Lifestyle)",
      description: "Curated settings for networking, culinary arts, and visual gallery showcases.",
      items: [
        { name: "Rooftop Fine Dining", desc: "Curated culinary experiences from world-renowned chefs." },
        { name: "VIP Executive Lounge", desc: "Soundproofed boardrooms and cigar lockers for business hosting." },
        { name: "Open-Air Amphitheatre", desc: "Dedicated courtyard space for private events, launches and art galleries." },
        { name: "Double-Height Showroom Fronts", desc: "18-foot clear height spaces maximizing brand visibility." },
      ],
    },
    {
      category: "The System (Convenience)",
      description: "Invisible infrastructure designed to provide effortless comfort.",
      items: [
        { name: "Concierge Valet Service", desc: "Seamless vehicle retrieval and dedicated visitor management." },
        { name: "Smart Grid Power", desc: "Uninterrupted 100% load backup with eco-friendly gas generator redundancy." },
        { name: "Underground Infrastructure", desc: "All cabling, fiber optics, and drain lines placed completely subterranean." },
        { name: "Elite 5-Tier Security", desc: "Thermal perimeter scanners, biometric checkpoints and continuous patrol." },
      ],
    },
  ],
  connectivity: [
    { name: "CP 67 Mall", distance: "08 Mins", category: "Lifestyle" },
    { name: "International Airport", distance: "20 Mins", category: "Transit" },
    { name: "Quark City / IT Hub", distance: "15 Mins", category: "Business" },
    { name: "Ivy Multi-Speciality Hospital", distance: "10 Mins", category: "Healthcare" },
    { name: "Oakridge International School", distance: "05 Mins", category: "Education" },
    { name: "CGC Landran", distance: "05 Mins", category: "Education" },
  ],
  metrics: [
    { value: "10+", label: "Key Retail Hubs" },
    { value: "20 Mins", label: "To Intl Airport" },
    { value: "05 Mins", label: "To CGC & Schools" },
    { value: "100%", label: "Visible Signage" },
  ],
  highlights: [
    "Unprecedented 6-Acre Commercial Sanctuary",
    "70 Curated Plots Crafted for Retail Giants",
    "Double-Height Glass Facade Design Authorization",
    "First-of-its-Kind Subterranean Utility Masterplan",
    "100% Pedestrian-Friendly Boulevards",
    "Designed to IGBC Green Building Gold Standard",
  ],
};

type GalleryImage = (typeof luxuriaData.galleryImages)[number];
const [lobby, pool, living] = luxuriaData.galleryImages;
const pad = (n: number) => String(n).padStart(2, "0");

export default function RegalLuxuriaCustomPage() {
  const [selected, setSelected] = useState<GalleryImage | null>(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!selected) return;
    lenis?.stop();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [selected, lenis]);

  return (
    <main className="bg-bone text-ink">
      <PageHero
        eyebrow={`${luxuriaData.status} — ${luxuriaData.location}`}
        lines={["Regal", <em key="l" className="accent-text">Luxuria.</em>]}
        copy={luxuriaData.tagline}
        image={{ src: luxuriaData.heroImage, alt: luxuriaData.heroImageAlt }}
        meta={[
          { label: "Development Size", value: luxuriaData.area },
          { label: "Estates", value: luxuriaData.residencesSummary },
          { label: "Premium Plots", value: luxuriaData.totalUnits },
          { label: "Project Type", value: "Commercial & Retail" },
        ]}
        actions={
          <>
            <MagneticButton href={WHATSAPP} variant="solid">
              Enquire Now
            </MagneticButton>
            <MagneticButton href="#philosophy">Discover</MagneticButton>
          </>
        }
      />

      {/* 01 — Philosophy */}
      <EditorialSection tone="light" id="philosophy">
        <SectionHeader label="Crown Jewel Legacy" lines={["The benchmark of", <em key="p" className="accent-text">prestige land.</em>]} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-8">
          {luxuriaData.longDescription.split("\n\n").map((p, i) => (
            <p
              key={i}
              data-fade
              className={
                i === 0
                  ? "lg:col-span-5 lg:col-start-3 text-xl leading-relaxed text-ink/95"
                  : "lg:col-span-4 lg:col-start-9 leading-[1.85] text-muted"
              }
            >
              {p}
            </p>
          ))}
        </div>

        <figure className="mt-20 md:mt-28 lg:ml-[16.66%]">
          <button type="button" onClick={() => setSelected(lobby)} data-cursor="view" data-cursor-label="View Image" className="group block w-full text-left">
            <div data-frame data-dir="center" className="media-frame aspect-[16/10]">
              <div data-parallax="6" className="media-inner">
                <div data-media className="absolute inset-0">
                  <Image
                    src={lobby.src}
                    alt="Grand lobby visualization"
                    fill
                    sizes="(min-width: 1024px) 80vw, 100vw"
                    className="object-cover transition-transform duration-[1600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                  />
                </div>
              </div>
            </div>
          </button>
          <figcaption data-fade className="mt-5 flex justify-between eyebrow text-[0.65rem] text-muted">
            <span>The Grand Atrium Entrance</span>
            <span>Fig. 01</span>
          </figcaption>
        </figure>
      </EditorialSection>

      {/* 02 — Estates */}
      <EditorialSection tone="linen">
        <SectionHeader
          label="The Estates"
          lines={["Visualizing the", <em key="e" className="accent-text">extraordinary.</em>]}
          copy="Wide setbacks, symmetrical facade guidelines, and custom utility plug-ins ensure that your architecture commands attention on the main Sector 114 arterial axis."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-16 items-end">
          <div className="md:col-span-5 flex flex-col gap-10">
            <div>
              <span data-fade className="eyebrow text-accent block">
                Curated Spaces
              </span>
              <p data-fade className="mt-5 font-display text-[clamp(1.5rem,2.3vw,2.25rem)] leading-snug tracking-[-0.02em] max-w-[22ch]">
                A cohesive masterplan designed to elevate presence.
              </p>
            </div>
            <GalleryTile image={living} caption="VIP Business Salon" aspect="aspect-[4/5]" onOpen={setSelected} />
          </div>
          <div className="md:col-span-6 md:col-start-7 flex flex-col gap-8">
            <GalleryTile image={pool} caption="Sky Sanctuary" aspect="aspect-[4/3] md:aspect-square" onOpen={setSelected} dir="right" />
            <div data-fade className="flex items-center justify-between border-t border-ink/15 pt-6">
              <p className="eyebrow text-[0.62rem] text-muted">Interactive Showcase</p>
              <p className="text-sm text-muted">Select an image to view it in full.</p>
            </div>
          </div>
        </div>
      </EditorialSection>

      {/* 03 — Materials */}
      <EditorialSection tone="paper">
        <SectionHeader
          label="Materials"
          lines={["Crafted to exist", <em key="g" className="accent-text">for generations.</em>]}
          copy="Every surface at Regal Luxuria is specified to resist wear, retain tactile elegance, and provide deep architectural continuity."
        />
        <div data-stagger className="grid grid-cols-1 md:grid-cols-2 border-t border-ink/12">
          {luxuriaData.materials.map((mat, i) => (
            <article
              key={mat.name}
              data-item
              data-cursor="hover"
              className="group relative overflow-hidden border-b border-ink/12 md:odd:border-r p-8 md:p-12 min-h-[320px] flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start gap-4 mb-8">
                  <span className="eyebrow text-[0.62rem] text-accent">{pad(i + 1)}</span>
                  <span className="eyebrow text-[0.62rem] text-muted text-right">{mat.use}</span>
                </div>
                <h3 className="font-display text-[clamp(1.6rem,2.4vw,2.4rem)] leading-tight tracking-[-0.02em]">{mat.name}</h3>
                <p className="mt-4 leading-relaxed text-muted max-w-[42ch]">{mat.description}</p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <span className={`h-9 w-9 rounded-full border border-ink/15 bg-gradient-to-tr ${mat.swatch}`} />
                <span className="eyebrow text-[0.6rem] text-muted">Specified Texture</span>
              </div>

              <div className="absolute inset-0 flex flex-col justify-end bg-sand text-ink p-8 md:p-12 translate-y-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
                <span className={`mb-auto h-14 w-14 rounded-full bg-gradient-to-tr ${mat.swatch}`} />
                <p className="eyebrow text-[0.62rem] text-accent">Premium Grade Specified</p>
                <p className="mt-4 font-display text-[clamp(1.3rem,1.9vw,1.8rem)] leading-snug tracking-[-0.01em] max-w-[28ch]">
                  Sourced from global vendors to ensure zero structural variations or dynamic flaws.
                </p>
              </div>
            </article>
          ))}
        </div>
      </EditorialSection>

      {/* 04 — Amenities */}
      <EditorialSection tone="sand">
        <SectionHeader label="Amenities" lines={["The luxury of", <em key="s" className="accent-text">effortless systems.</em>]} />
        <div className="flex flex-col">
          {luxuriaData.amenities.map((category, i) => (
            <div key={category.category} className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8 border-t border-ink/12 py-12 md:py-16">
              <div className="md:col-span-4">
                <span data-fade className="eyebrow text-[0.62rem] text-accent block">
                  {pad(i + 1)}
                </span>
                <h3 data-fade className="mt-4 font-display text-[clamp(1.6rem,2.4vw,2.4rem)] leading-tight tracking-[-0.02em]">
                  {category.category}
                </h3>
                <p data-fade className="mt-4 text-muted leading-relaxed max-w-[32ch]">
                  {category.description}
                </p>
              </div>
              <ul data-stagger className="md:col-span-7 md:col-start-6 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-10">
                {category.items.map((item) => (
                  <li key={item.name} data-item className="group">
                    <h4 className="text-lg text-ink transition-colors duration-500 group-hover:text-accent">{item.name}</h4>
                    <p className="mt-2 text-muted leading-relaxed">{item.desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </EditorialSection>

      {/* 05 — Destination */}
      <EditorialSection tone="light">
        <SectionHeader
          label="Destination"
          lines={["Mohali Sector 114", <em key="a" className="accent-text">arterial grid.</em>]}
          copy="Regal Luxuria commands direct presence on Mohali's fastest-growing retail corridor, ensuring frictionless accessibility."
        />
        <ul data-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
          {luxuriaData.connectivity.map((c) => (
            <li key={c.name} data-item className="group border-t border-ink/12 py-7">
              <div className="flex items-center justify-between eyebrow text-[0.62rem]">
                <span className="text-accent">{c.category}</span>
                <span className="text-muted">{c.distance}</span>
              </div>
              <p className="mt-4 font-display text-[clamp(1.3rem,1.8vw,1.75rem)] leading-tight tracking-[-0.01em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                {c.name}
              </p>
            </li>
          ))}
        </ul>
        <div data-stagger className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
          {luxuriaData.metrics.map((m) => (
            <div key={m.label} data-item>
              <div className="hairline mb-6" />
              <p className="font-display text-[clamp(2rem,4vw,3.75rem)] leading-none tracking-[-0.04em]">{m.value}</p>
              <p className="eyebrow text-[0.62rem] text-muted mt-4">{m.label}</p>
            </div>
          ))}
        </div>
      </EditorialSection>

      {/* 06 — Attributes */}
      <EditorialSection tone="linen">
        <SectionHeader label="Core Specifications" lines={["Regal Luxuria", <em key="t" className="accent-text">attributes.</em>]} />
        <ol data-stagger className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {luxuriaData.highlights.map((h, i) => (
            <li key={h} data-item className="flex gap-6 border-t border-ink/12 py-7">
              <span className="eyebrow text-[0.62rem] text-accent pt-1.5">{pad(i + 1)}</span>
              <span className="font-display text-[clamp(1.2rem,1.7vw,1.6rem)] leading-snug tracking-[-0.01em] text-ink/90">{h}</span>
            </li>
          ))}
        </ol>
      </EditorialSection>

      <CTASection
        image={{ src: pool.src, alt: pool.alt }}
        eyebrow="VIP Site Engagement"
        lines={["Secure your", <em key="c" className="accent-text">legacy estate.</em>]}
        copy="Request a VIP site consultation or download our private architectural brochure containing plotting layout dimensions."
        actions={
          <>
            <MagneticButton href={WHATSAPP} variant="solid">
              WhatsApp VIP Desk
            </MagneticButton>
            <MagneticButton href="tel:+917789000077" showArrow={false}>
              Direct Call Line
            </MagneticButton>
          </>
        }
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-bone/15 pt-8">
          <div>
            <p className="eyebrow text-[0.62rem] text-bone/70">Architectural Schematics</p>
            <p className="mt-2 font-display text-lg">Regal Luxuria Master Plan (PDF, 8.4MB)</p>
          </div>
          <a
            href="https://cdn.sanity.io/files/535lnz3g/production/2a789cf267e2c4032f7fcf76d3a9179cc936939f.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 eyebrow text-accent-soft py-2 -my-2"
          >
            <span className="link-underline link-underline--group">Download Schema</span>
            <Arrow className="rotate-90 transition-transform duration-500 group-hover:translate-y-1" />
          </a>
        </div>
      </CTASection>

      {/* Lightbox */}
      <AnimatePresence>
        {selected && (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={selected.label}
            className="fixed inset-0 z-[125] flex flex-col items-center justify-center tone-light bg-paper/97 text-ink p-5 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.1 } }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="relative w-full max-w-6xl aspect-[16/10] overflow-hidden"
              initial={{ clipPath: "inset(10% 10% 10% 10%)", scale: 1.04 }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)", scale: 1, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ clipPath: "inset(6% 6% 6% 6%)", opacity: 0, transition: { duration: 0.4 } }}
            >
              <Image src={selected.src} alt={selected.alt} fill sizes="90vw" className="object-cover" />
            </motion.div>
            <div className="mt-6 flex w-full max-w-6xl items-end justify-between gap-6">
              <div>
                <span className="eyebrow text-[0.62rem] text-accent">{selected.category}</span>
                <h3 className="mt-2 font-display text-2xl">{selected.label}</h3>
              </div>
              <button type="button" onClick={() => setSelected(null)} className="link-underline eyebrow text-ink/75 hover:text-ink">
                Close (Esc)
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

function GalleryTile({
  image,
  caption,
  aspect,
  onOpen,
  dir = "up",
}: {
  image: GalleryImage;
  caption: string;
  aspect: string;
  onOpen: (img: GalleryImage) => void;
  dir?: string;
}) {
  return (
    <button type="button" onClick={() => onOpen(image)} data-cursor="view" data-cursor-label="View Image" className="group block w-full text-left">
      <div data-frame data-dir={dir} className={`media-frame ${aspect}`}>
        <div data-parallax="6" className="media-inner">
          <div data-media className="absolute inset-0">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 768px) 45vw, 100vw"
              className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between eyebrow text-[0.65rem] text-muted">
        <span>{caption}</span>
        <span className="transition-transform duration-500 group-hover:translate-x-1">View</span>
      </div>
    </button>
  );
}
