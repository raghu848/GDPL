"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const images = [
    { src: "/regal_empirus/pictures/1_Five_Star_Club_House.jpg.jpeg", alt: "Five Star Club House", label: "Signature Club" },
    { src: "/regal_empirus/pictures/2_Swimming_Pool_with_Kids_Splash_Pool.jpg.jpeg", alt: "Swimming Pool", label: "Infinity Pool" },
    { src: "/regal_empirus/pictures/3_Cafeteria.jpg.jpeg", alt: "Cafeteria", label: "Gourmet Café" },
    { src: "/regal_empirus/pictures/4_Fully_Equipped_Gym.jpg.jpeg", alt: "Fully Equipped Gym", label: "Fitness Center" },
    { src: "/regal_empirus/pictures/5_Banquet_Hall.jpg.jpeg", alt: "Banquet Hall", label: "Grand Ballroom" },
    { src: "/regal_empirus/pictures/6_Kids_Play_Area.jpg.jpeg", alt: "Kids Play Area", label: "Kids Zone" },
    { src: "/regal_empirus/pictures/7_Library.jpg.jpeg", alt: "Library", label: "Quiet Library" },
    { src: "/regal_empirus/pictures/8_Basement_Parking.jpg.jpeg", alt: "Basement Parking", label: "Secure Parking" },
    { src: "/regal_empirus/pictures/9_Stilt_Parking.jpg.jpeg", alt: "Stilt Parking", label: "Stilt Access" },
    { src: "/regal_empirus/pictures/10_Surface_Parking.jpg.jpeg", alt: "Surface Parking", label: "Surface Parking" },
];

const EmpirusGallery: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const mm = gsap.matchMedia();

        mm.add("(min-width: 1024px)", () => {
            if (!sectionRef.current || !gridRef.current) return;

            const items = gridRef.current.querySelectorAll(".gallery-item");

            // Efficient single timeline for the entire section
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=200%", 
                    pin: true,
                    scrub: 0.6,
                    anticipatePin: 1,
                }
            });

            // Set initial state - More conservative offsets to ensure frame visibility
            gsap.set(items, { 
                y: (i) => i < 5 ? 40 : 80,
                opacity: 0.7,
                scale: 0.9,
                willChange: "transform, opacity"
            });

            // Smooth parallax movement
            tl.to(items, {
                y: (i) => i < 5 ? -80 : -40, // Row 1 moves up more, Row 2 moves up less
                opacity: 1,
                scale: 1,
                ease: "power2.out",
                stagger: {
                    amount: 0.3,
                    from: "start",
                    grid: [2, 5]
                }
            });

            return () => {
                tl.kill();
                ScrollTrigger.getAll().forEach(st => st.kill());
            };
        });

        // Mobile logic (no pinning, static grid)
        mm.add("(max-width: 1023px)", () => {
            // Reset items to natural state
            const items = gridRef.current?.querySelectorAll(".gallery-item");
            if (items) {
                gsap.set(items, { y: 0, opacity: 1, scale: 1 });
            }
        });

        return () => mm.revert();
    }, []);

    return (
        <section 
            ref={sectionRef} 
            className="relative h-auto lg:h-screen w-full bg-noir overflow-hidden flex flex-col justify-center items-center py-16 lg:py-20"
        >
            {/* Architectural Grid Background Overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)', backgroundSize: '100px 100px' }} />
            
            <div className="w-full relative z-10 pt-24 pb-12 px-0">
                <div className="text-center mb-16">
                    <p className="text-[14px] font-normal capitalize tracking-[0.4em] text-gold/60 mb-4 font-serif">Signature Features</p>
                    <h2 className="text-4xl md:text-6xl font-normal capitalize tracking-tight text-white font-serif leading-none">
                        Unmatched <span className="text-[#D4AF37] opacity-90 font-serif">Excellence</span>
                    </h2>
                </div>

                <div 
                    ref={gridRef}
                    className="grid grid-cols-2 lg:grid-cols-5 gap-2 md:gap-4 w-full"
                >
                    {images.map((img, i) => (
                        <div 
                            key={i} 
                            className="gallery-item relative aspect-square overflow-hidden rounded-2xl border border-white/10 group shadow-2xl bg-white/5"
                        >
                            <Image 
                                src={img.src} 
                                alt={img.alt} 
                                fill 
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, 20vw"
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Info Label */}
                            <div className="absolute bottom-6 left-6 right-6">
                                <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-1 font-serif group-hover:text-gold transition-colors">{`Feature ${i + 1}`}</p>
                                <h4 className="text-sm font-normal text-white capitalize tracking-normal font-serif">{img.label}</h4>
                            </div>

                            {/* Corner Accent */}
                            <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-white/20 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EmpirusGallery;
