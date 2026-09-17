"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { ProjectRender } from "@/lib/projectsData";
import EditorialSection from "@/components/sections/shared/EditorialSection";
import SectionHeader from "@/components/sections/shared/SectionHeader";
import { Arrow } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const pad = (n: number) => String(n).padStart(2, "0");

type Props = {
  renders: ProjectRender[];
  projectName: string;
};

/**
 * Studio renders for a project: a banner tile above a uniform grid, each one
 * opening a keyboard-navigable lightbox (← → to move, Esc to close).
 */
export default function RenderGallery({ renders, projectName }: Props) {
  const [open, setOpen] = useState<number | null>(null);
  const count = renders.length;

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback((dir: 1 | -1) => setOpen((i) => (i === null ? i : (i + dir + count) % count)), [count]);

  return (
    <EditorialSection tone="sand" id="renders">
      <SectionHeader
        label="Project Renders"
        lines={["The latest", <em key="r" className="accent-text">renders.</em>]}
        copy={`Fresh visualisations of ${projectName} — click any frame to open it full screen.`}
      />

      <div data-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {renders.map((render, i) => (
          <button
            key={render.src}
            type="button"
            data-item
            data-cursor="view"
            data-cursor-label="View Render"
            onClick={() => setOpen(i)}
            aria-label={`Open render ${pad(i + 1)}: ${render.label}`}
            className={cn(
              "group relative overflow-hidden bg-linen text-left",
              i === 0 ? "md:col-span-2 lg:col-span-3 aspect-[4/3] md:aspect-[21/9]" : "aspect-[4/3]"
            )}
          >
            <Image
              src={render.src}
              alt={render.alt}
              fill
              sizes={i === 0 ? "(min-width: 1024px) 80vw, 100vw" : "(min-width: 1024px) 27vw, (min-width: 768px) 45vw, 100vw"}
              className="object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-ink/5 transition-opacity duration-700 group-hover:opacity-85" />

            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
              <div className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
                <span className="eyebrow text-[0.58rem] text-bone/70">{pad(i + 1)}</span>
                <h3 className="mt-2 font-display text-[clamp(1.25rem,1.8vw,1.9rem)] leading-tight tracking-[-0.02em] text-bone">
                  {render.label}
                </h3>
              </div>
              <span className="shrink-0 text-bone/80 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:text-accent-soft">
                <Arrow />
              </span>
            </div>
          </button>
        ))}
      </div>

      {open !== null && <Lightbox renders={renders} index={open} onClose={close} onStep={step} />}
    </EditorialSection>
  );
}

function Lightbox({
  renders,
  index,
  onClose,
  onStep,
}: {
  renders: ProjectRender[];
  index: number;
  onClose: () => void;
  onStep: (dir: 1 | -1) => void;
}) {
  const dialog = useRef<HTMLDivElement>(null);
  const render = renders[index];

  // Keyboard control + a scroll lock for as long as the lightbox is open.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") onStep(1);
      else if (e.key === "ArrowLeft") onStep(-1);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    dialog.current?.focus();
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep]);

  return (
    <div
      ref={dialog}
      role="dialog"
      aria-modal="true"
      aria-label={`${render.label} — render ${pad(index + 1)} of ${pad(renders.length)}`}
      tabIndex={-1}
      onClick={onClose}
      className="fixed inset-0 z-[125] tone-light flex flex-col bg-paper/97 text-ink backdrop-blur-md p-4 md:p-8 outline-none animate-[fadeIn_0.4s_ease-out]"
    >
      <div className="flex items-center justify-between gap-6 shrink-0">
        <span className="eyebrow text-[0.62rem] text-muted">
          {pad(index + 1)} <span className="text-ink/30">/ {pad(renders.length)}</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close render viewer"
          className="flex items-center gap-3 eyebrow text-[0.62rem] text-ink/75 hover:text-ink transition-colors duration-500"
        >
          Close <X className="h-4 w-4" aria-hidden />
        </button>
      </div>

      {/* Stop propagation so clicks on the frame itself don't close the viewer. */}
      <div onClick={(e) => e.stopPropagation()} className="relative flex-1 min-h-0 my-5 md:my-8">
        <Image
          key={render.src}
          src={render.src}
          alt={render.alt}
          fill
          sizes="100vw"
          priority
          className="object-contain animate-[fadeIn_0.5s_ease-out]"
        />
      </div>

      <div onClick={(e) => e.stopPropagation()} className="shrink-0 flex flex-col md:flex-row md:items-end justify-between gap-5">
        <div className="max-w-[52ch]">
          <h3 className="font-display text-[clamp(1.5rem,2.6vw,2.4rem)] leading-tight tracking-[-0.025em] text-ink">{render.label}</h3>
          <p className="mt-2 text-sm md:text-base text-muted leading-relaxed">{render.caption}</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => onStep(-1)}
            aria-label="Previous render"
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink/80 hover:border-ink hover:text-ink transition-colors duration-500"
          >
            <Arrow className="rotate-180 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-1" />
          </button>
          <button
            type="button"
            onClick={() => onStep(1)}
            aria-label="Next render"
            className="group flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 text-ink/80 hover:border-ink hover:text-ink transition-colors duration-500"
          >
            <Arrow className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
