"use client";

import ShutterReveal from "@/components/ui/ShutterReveal";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ProjectsPage() {
    const residenciaImages = [
        "/regal_rersidencia/Regal Residencia Sector 114 Mohali _page-0006.jpg",
        "/regal_rersidencia/Regal Residencia Sector 114 Mohali _page-0007.jpg",
        "/regal_rersidencia/Regal Residencia Sector 114 Mohali _page-0009.jpg",
        "/regal_rersidencia/Regal Residencia Sector 114 Mohali _page-0010.jpg",
        "/regal_rersidencia/Regal Residencia Sector 114 Mohali _page-0011.jpg",
        "/regal_rersidencia/Regal Residencia Sector 114 Mohali _page-0012.jpg",
        "/regal_rersidencia/Regal Residencia Sector 114 Mohali _page-0013.jpg",
        "/regal_rersidencia/Regal Residencia Sector 114 Mohali _page-0014.jpg",
    ];

    const empirusImages = [
        "/regal_empirus/BOOKET_REGAL EMPIRUS CTC_page-0006.jpg",
        "/regal_empirus/BOOKET_REGAL EMPIRUS CTC_page-0007.jpg",
        "/regal_empirus/BOOKET_REGAL EMPIRUS CTC_page-0009.jpg",
        "/regal_empirus/BOOKET_REGAL EMPIRUS CTC_page-0010.jpg",
        "/regal_empirus/BOOKET_REGAL EMPIRUS CTC_page-0011.jpg",
        "/regal_empirus/BOOKET_REGAL EMPIRUS CTC_page-0012.jpg",
        "/regal_empirus/BOOKET_REGAL EMPIRUS CTC_page-0013.jpg",
    ];

    const heightsImages = [
        "/regal_heights/img4.jpg",
        "/regal_heights/img5.jpg",
        "/regal_heights/img7.jpg",
        "/regal_heights/img11.jpg",
        "/regal_heights/img13.jpg",
        "/regal_heights/img14.jpg",
        "/regal_heights/img15.jpg",
        "/regal_heights/img19.jpg",
        "/regal_heights/img27.jpg",
    ];

    const allProjects = [
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

    const categories = ["All Projects", "Condos", "Villas", "Upcoming"];

    return (
        <main className="min-h-screen bg-black text-white pb-24">
            <section className="relative h-[70vh] w-full mb-32 overflow-hidden flex items-center">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/50 z-10" />
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="/images/Luxury_Apartment_Drone_Footage_Generated.mp4" type="video/mp4" />
                    </video>
                </div>

                <div className="container mx-auto px-6 relative z-20">
                    <header>
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-6xl md:text-9xl font-black mb-12 uppercase tracking-tighter leading-none"
                        >
                            OUR<br />PROJECTS
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-white/80 text-xl md:text-2xl max-w-3xl font-light leading-relaxed"
                        >
                            Discover our ongoing and completed projects to see how we bring to life the concepts that are shaping the future of real estate in Mohali.
                        </motion.p>
                    </header>
                </div>
            </section>

            <div className="container mx-auto px-6">
                {/* minimalist Category Filters */}
                <div className="flex gap-12 mb-24 border-b border-white/5 pb-8 overflow-x-auto selection:bg-white selection:text-black">
                    {categories.map((cat, idx) => (
                        <button
                            key={cat}
                            className={cn(
                                "text-[10px] font-black tracking-[0.4em] uppercase transition-colors whitespace-nowrap",
                                idx === 0 ? "text-white underline underline-offset-[16px] decoration-2" : "text-muted hover:text-white"
                            )}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-32">
                    {allProjects.map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            className="group"
                        >
                            <Link href={`/projects/${idx}`} className="block">
                                <ShutterReveal direction="up" className="aspect-[16/10] rounded-3xl overflow-hidden mb-8 border border-white/5">
                                    <img
                                        src={project.image}
                                        alt={project.name}
                                        className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 transition-all duration-1000 scale-100 group-hover:scale-105"
                                    />
                                </ShutterReveal>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-3xl font-black uppercase tracking-tighter mb-2">{project.name}</h3>
                                        <p className="text-muted text-[10px] uppercase font-bold tracking-[0.3em]">{project.specs}</p>
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-white mt-3" />
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Detailed Property Sections */}
                <div className="mt-40 space-y-40">
                    {/* REGAL RESIDENCIA */}
                    <section className="pt-20 border-t border-white/10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 max-w-[1400px] mx-auto">

                            {/* Sticky Content */}
                            <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit mb-12 lg:mb-0">
                                <div className="mb-10">
                                    <p className="text-muted text-[10px] tracking-[0.4em] uppercase font-bold mb-4">Sector 114, Mohali</p>
                                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none mb-6">Regal<br />Residencia</h2>
                                    <div className="inline-block bg-white/10 px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase">
                                        Demand - ₹6,900/sq.ft.
                                    </div>
                                </div>

                                <div className="space-y-10">
                                    <div>
                                        <h4 className="text-[10px] text-muted uppercase tracking-[0.3em] font-black mb-4">Configurations</h4>
                                        <ul className="space-y-3">
                                            <li className="flex justify-between border-b border-white/10 pb-2">
                                                <span className="text-white/80 font-light">3 BHK</span>
                                                <span className="font-mono text-sm">1800 sq.ft.</span>
                                            </li>
                                            <li className="flex justify-between border-b border-white/10 pb-2">
                                                <span className="text-white/80 font-light">3+1 BHK</span>
                                                <span className="font-mono text-sm">2150 sq.ft.</span>
                                            </li>
                                            <li className="flex justify-between border-b border-white/10 pb-2">
                                                <span className="text-white/80 font-light">4+1 BHK</span>
                                                <span className="font-mono text-sm">3200 sq.ft.</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-[10px] text-muted uppercase tracking-[0.3em] font-black mb-4">World-Class Lifestyle</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                "Iconic Sky Walk", "Resort-style Pool", "Spa & Sauna",
                                                "Mini Theatre", "Premium Indoor Golf", "Signature Club",
                                                "Library & Café", "Skating Rink", "Crèche Facility", "Barbeque Zone"
                                            ].map((amenity, i) => (
                                                <span key={i} className="text-xs border border-white/20 px-3 py-1.5 rounded-full text-white/70">
                                                    {amenity}
                                                </span>
                                            ))}
                                            <div className="mt-4 text-xs text-muted w-full">
                                                + over 20 more premium lifestyle amenities including dedicated kids zones, outdoor loungers, and expansive open-to-sky lawns.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Scrolling Images */}
                            <div className="lg:col-span-7 flex flex-col gap-8">
                                <div className="rounded-3xl overflow-hidden border border-white/10 group">
                                    <img src="/images/Regal Residencia Sector 114 Mohali _page-0001.jpg" alt="Regal Residencia Overview" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                {residenciaImages.map((src, idx) => (
                                    <div key={idx} className="rounded-3xl overflow-hidden border border-white/10 group">
                                        <img src={src} alt={`Regal Residencia Detail ${idx + 1}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                ))}
                                <div className="rounded-3xl overflow-hidden border border-white/10 group">
                                    <img src="/images/Regal Residencia Sector 114 Mohali _page-0015.jpg" alt="Regal Residencia Feature" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* REGAL EMPIRUS */}
                    <section className="pt-32 border-t border-white/10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 max-w-[1400px] mx-auto">

                            {/* Sticky Content */}
                            <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit mb-12 lg:mb-0">
                                <div className="mb-10">
                                    <p className="text-muted text-[10px] tracking-[0.4em] uppercase font-bold mb-4">Sector 91, Mohali</p>
                                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none mb-6">Regal<br />Empirus</h2>
                                    <div className="inline-block bg-white/10 px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase mb-2">
                                        Demand - ₹8,600/sq.ft.
                                    </div>
                                    <p className="text-white/60 text-sm mt-4 leading-relaxed">
                                        A luxurious living experience offering modern amenities and plenty of green space. 5.37 acres of total land area featuring a massive 2-acre lush green podium park inside a 3-side open site.
                                    </p>
                                </div>

                                <div className="space-y-10">
                                    <div>
                                        <h4 className="text-[10px] text-muted uppercase tracking-[0.3em] font-black mb-4">Configurations</h4>
                                        <ul className="space-y-3">
                                            <li className="flex justify-between border-b border-white/10 pb-2">
                                                <span className="text-white/80 font-light">3+1 BHK</span>
                                                <span className="font-mono text-sm">2200 sq.ft.</span>
                                            </li>
                                            <li className="flex justify-between border-b border-white/10 pb-2">
                                                <span className="text-white/80 font-light">4+1 BHK</span>
                                                <span className="font-mono text-sm">3200 sq.ft.</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-[10px] text-muted uppercase tracking-[0.3em] font-black mb-4">Amenities & Features</h4>
                                        <ul className="text-sm text-white/70 space-y-3 font-light">
                                            <li className="flex gap-4 items-start"><span className="text-white shrink-0">❖</span> <div>Five-Star Club House & Banquet Hall</div></li>
                                            <li className="flex gap-4 items-start"><span className="text-white shrink-0">❖</span> <div>Swimming Pool with Kids&apos; Splash Pool</div></li>
                                            <li className="flex gap-4 items-start"><span className="text-white shrink-0">❖</span> <div>Sun-facing apartments for natural light and ventilation</div></li>
                                            <li className="flex gap-4 items-start"><span className="text-white shrink-0">❖</span> <div>Multi-level Parking (Basement, Stilt, Surface)</div></li>
                                            <li className="flex gap-4 items-start"><span className="text-white shrink-0">❖</span> <div>Fully Equipped Gym, Library, and Cafeteria</div></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Scrolling Images */}
                            <div className="lg:col-span-7 flex flex-col gap-8">
                                <div className="rounded-3xl overflow-hidden border border-white/10 group">
                                    <img src="/images/Regal Residencia Sector 114 Mohali _page-0001.jpg" alt="Regal Empirus Overview" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                {empirusImages.map((src, idx) => (
                                    <div key={idx} className="rounded-3xl overflow-hidden border border-white/10 group">
                                        <img src={src} alt={`Regal Empirus Detail ${idx + 1}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                ))}
                                <div className="rounded-3xl overflow-hidden border border-white/10 group">
                                    <img src="/images/Regal Residencia Sector 114 Mohali _page-0015.jpg" alt="Regal Empirus Feature" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* REGAL HEIGHTS */}
                    <section className="pt-32 border-t border-white/10">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 max-w-[1400px] mx-auto">

                            {/* Sticky Content */}
                            <div className="lg:col-span-5 lg:sticky lg:top-32 h-fit mb-12 lg:mb-0">
                                <div className="mb-10">
                                    <p className="text-muted text-[10px] tracking-[0.4em] uppercase font-bold mb-4">Mohali</p>
                                    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white leading-none mb-6">Regal<br />Heights</h2>
                                    <div className="flex flex-wrap gap-2">
                                        <div className="inline-block bg-white/10 px-4 py-2 rounded-full text-xs font-mono tracking-widest uppercase">
                                            BSP - ₹8,600/sq.ft.
                                        </div>
                                    </div>
                                    <p className="text-white/60 text-sm mt-4 leading-relaxed">
                                        Luxurious high-rise living offering 25+ premium amenities. Spread across 5.37 acres, featuring a 2-acre podium park in a 3-side open site.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <h4 className="text-[10px] text-muted uppercase tracking-[0.3em] font-black mb-4">Configurations</h4>
                                        <ul className="space-y-3">
                                            <li className="flex justify-between border-b border-white/10 pb-2">
                                                <span className="text-white/80 font-light">3+1 BHK <span className="text-white/40 text-xs ml-2 tracking-widest">(BOOKING 30L)</span></span>
                                                <span className="font-mono text-sm">2200 sq.ft.</span>
                                            </li>
                                            <li className="flex justify-between border-b border-white/10 pb-2">
                                                <span className="text-white/80 font-light">4+1 BHK <span className="text-white/40 text-xs ml-2 tracking-widest">(BOOKING 50L)</span></span>
                                                <span className="font-mono text-sm">3200 sq.ft.</span>
                                            </li>
                                            <li className="flex justify-between border-b border-white/10 pb-2">
                                                <span className="text-white font-light">Earthvilla&apos;s & Skyvilla&apos;s</span>
                                                <span className="font-mono text-sm">5000-6000 sq.ft.</span>
                                            </li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-[10px] text-muted uppercase tracking-[0.3em] font-black mb-4">Amenities & Features</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {[
                                                "25,000 sq.ft Club House", "Sports Arena", "Sun-facing Layout",
                                                "Splash Pool", "2 Acres Podium Park"
                                            ].map((amenity, i) => (
                                                <span key={i} className="text-xs border border-white/20 px-3 py-1.5 rounded-full text-white/70">
                                                    {amenity}
                                                </span>
                                            ))}
                                            <span className="text-xs border border-transparent px-3 py-1.5 rounded-full text-muted">
                                                + over 20 more luxury amenities spanning wellness, sports, & entertainment
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Scrolling Images */}
                            <div className="lg:col-span-7 flex flex-col gap-8">
                                <div className="rounded-3xl overflow-hidden border border-white/10 group">
                                    <img src="/images/Regal Residencia Sector 114 Mohali _page-0001.jpg" alt="Regal Heights Overview" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                                {heightsImages.map((src, idx) => (
                                    <div key={idx} className="rounded-3xl overflow-hidden border border-white/10 group">
                                        <img src={src} alt={`Regal Heights Detail ${idx + 1}`} className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                ))}
                                <div className="rounded-3xl overflow-hidden border border-white/10 group">
                                    <img src="/images/Regal Residencia Sector 114 Mohali _page-0015.jpg" alt="Regal Heights Feature" className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105" />
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

// Helper for conditional classes if not globally available
function cn(...classes: any[]) {
    return classes.filter(Boolean).join(" ");
}
