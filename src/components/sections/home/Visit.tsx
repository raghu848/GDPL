"use client";

import { useRef } from "react";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { createEditorialTimeline } from "@/animations/timelines";
import RevealLines from "@/components/ui/RevealLines";
import MagneticButton from "@/components/ui/MagneticButton";

const ADDRESS = "Regal Heights, PM2H+8GV, GH-11D, Sector 91, Sahibzada Ajit Singh Nagar, Punjab 140307";
const DIRECTIONS = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(ADDRESS)}`;
const EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.144415840488!2d76.68339127632644!3d30.686214987747754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feffd886ec457%3A0xe1f893f4e1f7c0a9!2sRegal%20Heights!5e0!3m2!1sen!2sin!4v1709971234567!5m2!1sen!2sin";

export default function Visit() {
  const root = useRef<HTMLElement>(null);
  useSectionTimeline(root, (el, env) => {
    createEditorialTimeline(el, env);
  });

  return (
    <section ref={root} className="relative bg-bone text-ink py-28 md:py-40">
      <div className="shell grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14 items-end">
        <div className="lg:col-span-4 flex flex-col">
          <div className="flex items-center gap-6 mb-10">
            <span data-index className="eyebrow text-muted">Visit Us</span>
          </div>
          <RevealLines className="display-md" lines={["Experience it", <em key="f" className="italic text-accent">firsthand.</em>]} />
          <div className="hairline mt-12" data-rule />
          <dl className="mt-8 grid grid-cols-1 gap-6">
            <div data-fade>
              <dt className="eyebrow text-[0.62rem] text-muted">Address</dt>
              <dd className="mt-2 leading-relaxed">
                Regal Heights, GH-11D, Sector 91,
                <br />
                Sahibzada Ajit Singh Nagar, Punjab 140307
              </dd>
            </div>
            <div data-fade>
              <dt className="eyebrow text-[0.62rem] text-muted">Site Visits</dt>
              <dd className="mt-2">
                <a href="tel:+917789000077" className="link-underline inline-block py-1.5 -my-1.5">+91 77890 00077</a>
              </dd>
            </div>
          </dl>
          <div data-cta className="mt-10 [--btn-fill:#0e100e] [--btn-fill-text:#f4f1eb]">
            <MagneticButton href={DIRECTIONS}>Get Directions</MagneticButton>
          </div>
        </div>

        <div className="lg:col-span-8">
          <div data-frame data-dir="right" className="media-frame aspect-[4/3] md:aspect-[16/10] w-full group">
            <div data-media className="absolute inset-0">
              <iframe
                src={EMBED}
                title="Map showing the GDPL site at Regal Heights, Sector 91, Mohali"
                className="h-full w-full border-0 grayscale contrast-[1.05] opacity-90 transition-[filter,opacity] duration-1000 group-hover:grayscale-0 group-hover:opacity-100"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
