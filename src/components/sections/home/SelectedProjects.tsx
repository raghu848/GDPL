"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projectsData";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { createProjectsTimeline } from "@/animations/timelines";
import RevealLines from "@/components/ui/RevealLines";
import MagneticButton, { Arrow } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

export default function SelectedProjects() {
  const root = useRef<HTMLElement>(null);
  useSectionTimeline(root, createProjectsTimeline);

  return (
    <section ref={root} id="projects" className="tone-light relative bg-paper text-ink">
      <div className="shell"><div className="hairline" /></div>

      <div data-pin className="relative lg:h-screen lg:overflow-hidden lg:flex lg:items-center py-24 md:py-32 lg:py-0">
        <div
          data-track
          className="flex flex-col lg:flex-row lg:items-center gap-20 lg:gap-[5vw] px-[var(--gutter)] lg:w-max will-change-transform"
        >
          {/* Intro panel */}
          <div className="lg:w-[34vw] lg:max-w-[560px] shrink-0 flex flex-col">
            <span className="eyebrow text-muted mb-8 flex items-center gap-4">
              <span className="h-px w-8 bg-ink/20" />
              Signature Portfolio
            </span>
            <RevealLines className="display-xl" lines={["Selected", <em key="p" className="italic text-accent">Projects</em>]} />
            <p data-fade className="mt-10 body-lg text-muted max-w-[36ch]">
              Landmark residences and commercial addresses across Mohali&apos;s most promising sectors.
            </p>
            <div data-fade className="mt-10 hidden lg:flex items-center gap-4 eyebrow text-muted">
              Scroll to explore <Arrow className="text-ink/70" />
            </div>
          </div>

          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              data-card
              data-cursor="view"
              data-cursor-label="View Project"
              className={cn("group shrink-0 lg:w-[40vw] lg:max-w-[720px] flex flex-col", i % 2 === 1 && "lg:translate-y-[7vh]")}
            >
              <div data-card-frame className="relative overflow-hidden bg-sand aspect-[4/3] lg:aspect-auto lg:h-[56vh]">
                <div data-card-media className="absolute inset-y-0 -inset-x-[8%]">
                  <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]">
                    <Image
                      src={project.heroImage}
                      alt={project.heroImageAlt}
                      fill
                      sizes="(min-width: 1024px) 46vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-ink/10 transition-colors duration-700 group-hover:bg-ink/0" />
                <span className="absolute top-5 left-5 eyebrow text-[0.62rem] px-3 py-1.5 rounded-full bg-ink/55 backdrop-blur-md text-bone/95">
                  {project.status}
                </span>
              </div>

              <div className="mt-6 flex items-start justify-between gap-6">
                <div className="flex gap-5 md:gap-8">
                  <span data-card-text className="eyebrow text-muted pt-2">0{i + 1}</span>
                  <div>
                    {/* Hover transform sits on an inner span: a CSS transform
                        transition on a GSAP target corrupts its reveal. */}
                    <h3 data-card-text className="font-display text-[clamp(1.9rem,2.8vw,3rem)] leading-none tracking-[-0.03em]">
                      <span className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-1">
                        {project.name}
                      </span>
                    </h3>
                    <p data-card-text className="mt-3 eyebrow text-[0.68rem] text-muted">
                      {project.location} · {project.projectType}
                    </p>
                  </div>
                </div>
                <span data-card-text className="mt-2 text-ink/70 transition-colors duration-700 group-hover:text-accent">
                  <span className="inline-block transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                    <Arrow />
                  </span>
                </span>
              </div>
            </Link>
          ))}

          {/* End panel */}
          <div className="shrink-0 lg:w-[26vw] flex flex-col items-start gap-8 lg:pl-[2vw]">
            <p className="text-muted max-w-[28ch]">Explore every GDPL address — ongoing, upcoming and delivered.</p>
            <MagneticButton href="/projects">Full Portfolio</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
