"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

const officeImages = [
  {
    src: "/office_images/IMG_2361 (1).jpg",
    alt: "Modern open-plan office with organized workstations and desktop computers",
    className: "md:col-span-2 md:row-span-3 aspect-square md:aspect-auto",
  },
  {
    src: "/office_images/IMG_2362.jpg",
    alt: "Spacious professional workspace with ergonomic black chairs and white desks",
    className: "md:col-span-1 md:row-span-1 aspect-square md:aspect-auto",
  },
  {
    src: "/office_images/IMG_2365.jpg",
    alt: "Contemporary office hallway with glass partitions and linear ceiling lights",
    className: "md:col-span-1 md:row-span-1 aspect-square md:aspect-auto",
  },
  {
    src: "/office_images/IMG_2364.jpg",
    alt: "Minimalist reception area featuring a white desk and fluted wood wall accents",
    className: "md:col-span-1 md:row-span-2 aspect-[3/4] md:aspect-auto",
  },
  {
    src: "/office_images/IMG_2378.jpg",
    alt: "Executive cabin workstation with motivational quote on a concrete-finish wall",
    className: "md:col-span-1 md:row-span-1 aspect-square md:aspect-auto",
  },
  {
    src: "/office_images/IMG_2372.jpg",
    alt: "Luxury manager office with a decorative bull statue and landscape artwork",
    className: "md:col-span-1 md:row-span-1 aspect-square md:aspect-auto",
  },
];

export default function OfficeGallery() {
  const containerRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section className="py-12 md:py-20 bg-transparent relative overflow-hidden">
      <div className="container mx-auto px-6 mb-8 md:mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="section-label mb-4">Our Workspace</p>
          <h2 className="text-5xl md:text-8xl font-normal capitalize tracking-normal leading-[0.9] text-white font-serif">
            A <span className="text-[#D4AF37] font-serif">Bespoke</span> Environment
          </h2>
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[140px]"
        >
          {officeImages.map((image, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/5 group ${image.className}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Subtle Overlay to match premium aesthetic */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* Optional: Descriptive label on hover */}
              <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <p className="text-[12px] font-normal capitalize tracking-[0.2em] text-white/80 font-serif">
                  {image.alt}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
