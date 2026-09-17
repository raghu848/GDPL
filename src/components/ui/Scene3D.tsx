"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { motion } from "framer-motion";

gsap.registerPlugin(ScrollTrigger);

interface LayerProps {
  src: string;
  depth: number;
  speed: number;
  scale?: number;
  opacity?: number;
  blur?: number;
  position?: { x: string; y: string };
}

const Layer: React.FC<LayerProps> = ({ 
  src, 
  depth, 
  speed, 
  scale = 1, 
  opacity = 1, 
  blur = 0,
  position = { x: "50%", y: "50%" }
}) => {
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!layerRef.current) return;

    gsap.to(layerRef.current, {
      z: depth + (speed * 200), // Dynamic depth push
      y: -speed * 100, // Parallax vertical movement
      opacity: depth < 0 ? 0.2 + (speed * 0.5) : 1, // Fade distant objects
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });
  }, [depth, speed]);

  return (
    <div
      ref={layerRef}
      className="absolute inset-0 flex items-center justify-center will-change-transform"
      style={{
        transformStyle: "preserve-3d",
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) translateZ(${depth}px) scale(${scale})`,
        opacity,
        filter: blur > 0 ? `blur(${blur}px)` : "none",
      }}
    >
      <div className="relative w-[120vw] h-[120vh]">
        <Image
          src={src}
          alt="Building Layer"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
};

export const Scene3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Main Camera Zoom / Depth Movement
    gsap.to(containerRef.current, {
      z: 500,
      ease: "none",
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    // Camera tilt effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 15;
      const yPos = (clientY / window.innerHeight - 0.5) * 15;

      gsap.to(containerRef.current, {
        rotateY: xPos,
        rotateX: -yPos,
        duration: 1.5,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-[#050505] pointer-events-none">
      {/* Cinematic Fog / Atmosphere */}
      <div className="absolute inset-0 z-[100] pointer-events-none bg-gradient-to-b from-black/40 via-transparent to-black/80" />
      <div className="absolute inset-0 z-[101] pointer-events-none backdrop-blur-[1px] opacity-30" />
      
      {/* Better Grain Overlay */}
      <div className="absolute inset-0 z-[102] pointer-events-none opacity-[0.05] mix-blend-overlay pointer-events-none">
        <svg className="h-full w-full">
          <filter id="noiseFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
      </div>

      <div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ 
              x: Math.random() * 2000 - 1000, 
              y: Math.random() * 2000 - 1000, 
              z: Math.random() * -1000 - 500,
              opacity: Math.random() * 0.5 
            }}
            animate={{ 
              y: "+=200",
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{ 
              duration: 10 + Math.random() * 20, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute w-1 h-1 bg-white rounded-full blur-[1px]"
          />
        ))}

        {/* Deep Background */}
        <Layer 
          src="/png/-Pngtree-building vector_948133.png" 
          depth={-800} 
          speed={0.1} 
          scale={2.5} 
          opacity={0.3} 
          blur={4}
          position={{ x: "45%", y: "45%" }}
        />
        
        {/* Mid-Background */}
        <Layer 
          src="/png/-Pngtree-architectural building line draft design_5762677.png" 
          depth={-400} 
          speed={0.3} 
          scale={1.8} 
          opacity={0.5} 
          blur={2}
          position={{ x: "60%", y: "50%" }}
        />

        {/* Mid-Ground */}
        <Layer 
          src="/images/herosection.png" 
          depth={0} 
          speed={0.6} 
          scale={1.2} 
          opacity={0.8}
          position={{ x: "40%", y: "55%" }}
        />

        {/* Foreground (Closest) */}
        <Layer 
          src="/png/-Pngtree-building vector_948133.png" 
          depth={400} 
          speed={1.2} 
          scale={1.5} 
          opacity={0.9} 
          blur={1}
          position={{ x: "70%", y: "60%" }}
        />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[150px]" />
      </div>
    </div>
  );
};
