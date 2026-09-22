"use client";

import { useRef } from "react";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { createAboutTimeline } from "@/animations/timelines";
import { useVideoInView } from "@/hooks/useVideoInView";
import RevealLines from "@/components/ui/RevealLines";
import MagneticButton from "@/components/ui/MagneticButton";

export default function About() {
  const root = useRef<HTMLElement>(null);
  useSectionTimeline(root, createAboutTimeline);
  const videoRef = useVideoInView<HTMLVideoElement>({ pauseOnLeave: false });

  return (
    <section
      ref={root}
      id="about"
      className="relative text-ink pt-28 md:pt-40 pb-20 md:pb-28 bg-[#F7F7F6]"
    >
      <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14">
        <div className="lg:col-span-6 flex flex-col">
          <span data-index className="eyebrow text-muted mb-6 block">About GDPL</span>
          <RevealLines
            className="display-lg"
            lines={[
              <span key="l1" className="block whitespace-nowrap">A legacy of trust,</span>,
              "a standard of",
              <em key="e" className="italic text-accent">royal living.</em>,
            ]}
          />

          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-8 max-w-2xl">
            <p data-fade className="text-lg leading-relaxed text-ink/95">
              At GDPL, every development is a bespoke creation — meticulously designed to reflect prestige, comfort, and
              timeless elegance.
            </p>
            <p data-fade className="leading-[1.8] text-muted">
              From panoramic surroundings to thoughtfully curated spaces, we create sanctuaries that embody modern living.
              With an unwavering commitment to quality and trust, we deliver not just homes, but investments for a secure and
              elevated future.
            </p>
          </div>

          <div data-cta className="mt-12 [--btn-fill:#0e100e] [--btn-fill-text:#f4f1eb]">
            <MagneticButton href="/about">Our Story</MagneticButton>
          </div>
        </div>

        <div className="lg:col-span-6 lg:pl-8">
          <div data-frame data-dir="up" className="media-frame aspect-[19/20] w-full bg-transparent">
            <div data-parallax="6" className="media-inner">
              <div data-media className="absolute inset-0 bg-transparent">
                <video
                  ref={videoRef}
                  muted
                  loop
                  playsInline
                  preload="auto"
                  disablePictureInPicture
                  aria-hidden
                  className="absolute inset-0 h-full w-full object-cover object-[50%_30%]"
                  style={{
                    maskImage: "linear-gradient(to bottom, transparent 0%, #000 7%, #000 91%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 7%, #000 91%, transparent 100%)",
                  }}
                >
                  <source src="/videos/about-building.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
          <p data-fade className="mt-5 eyebrow text-[0.65rem] text-muted flex justify-between">
            <span>GDPL Architecture</span>
            <span>Mohali, Punjab</span>
          </p>
        </div>
      </div>
    </section>
  );
}
