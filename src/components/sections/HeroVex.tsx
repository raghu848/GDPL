'use client';

import React from 'react';
import AnimatedHeading from '../ui/AnimatedHeading';
import FadeIn from '../ui/FadeIn';
import { MessageSquare, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const HeroVex: React.FC = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black font-sans">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260403_050628_c4e32401-fab4-4a27-b7a8-6e9291cd5959.mp4"
          type="video/mp4"
        />
      </video>

      {/* NO Overlay as specified */}

      {/* Content Container */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-12 lg:pb-16 max-w-7xl mx-auto w-full">
        <div className="lg:grid lg:grid-cols-2 lg:items-end w-full">
          {/* Left Column: Main Content */}
          <div className="flex flex-col">
            <AnimatedHeading
              text={"Shaping tomorrow\nwith vision and action."}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal mb-4 text-white leading-tight"
            />
            
            <FadeIn delay={800} duration={1000}>
              <p className="text-base md:text-lg text-gray-300 mb-8 max-w-lg">
                We back visionaries and craft ventures that define what comes next.
              </p>
            </FadeIn>

            <FadeIn delay={1200} duration={1000}>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                <Link 
                  href="https://wa.me/917710380077" 
                  target="_blank"
                  className="btn-gold px-6 py-3 md:px-10 md:py-4 rounded-full flex items-center justify-center gap-3 w-full sm:w-auto text-sm md:text-base whitespace-nowrap cursor-pointer hover:scale-105 transition-transform"
                >
                  <MessageSquare className="w-4 h-4 md:w-5 md:h-5" />
                  Connect Now
                </Link>
                <Link 
                  href="/projects"
                  className="liquid-glass border border-white/20 text-white px-6 py-3 md:px-10 md:py-4 rounded-full font-medium hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2 w-full sm:w-auto text-sm md:text-base whitespace-nowrap cursor-pointer"
                >
                  View Projects
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Tag Card */}
          <div className="mt-12 lg:mt-0 flex items-end justify-start lg:justify-end">
            <FadeIn delay={1400} duration={1000}>
              <div className="liquid-glass border border-white/20 px-6 py-3 rounded-xl">
                <span className="text-lg md:text-xl lg:text-2xl font-light text-white whitespace-nowrap">
                  Investing. Building. Advisory.
                </span>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroVex;
