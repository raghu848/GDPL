"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, Project } from "@/lib/projectsData";
import { useSectionTimeline } from "@/animations/useSectionTimeline";
import { createEditorialTimeline } from "@/animations/timelines";
import PageHero from "@/components/sections/shared/PageHero";
import ContactCTA from "@/components/sections/home/ContactCTA";
import { Arrow } from "@/components/ui/MagneticButton";
import { cn } from "@/lib/utils";

const FILTERS = ["All", "Ongoing", "Upcoming", "Delivered"] as const;
const pad = (n: number) => String(n).padStart(2, "0");

export default function ProjectsPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All");

  const counts = useMemo(
    () => Object.fromEntries(FILTERS.map((f) => [f, f === "All" ? projects.length : projects.filter((p) => p.status === f).length])),
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const matchesSearch =
        !q || p.name.toLowerCase().includes(q) || (p.tagline?.toLowerCase().includes(q) ?? false) || p.location.toLowerCase().includes(q);
      return matchesSearch && (filter === "All" || p.status === filter);
    });
  }, [query, filter]);

  // The list height changes with filtering — keep every trigger below it accurate.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [filtered]);

  return (
    <main className="bg-bone text-ink">
      <PageHero
        eyebrow="Discover Excellence"
        lines={["Our signature", <em key="p" className="accent-text">portfolio.</em>]}
        copy="Masterpieces of modern living, designed for those who accept nothing but the exceptional."
        image={{ src: "/regal_empirus/Regal_Empirus_.jpg.jpeg", alt: "Regal Empirus towers at sunset" }}
        meta={[
          { label: "Signature Projects", value: pad(counts.All) },
          { label: "Ongoing", value: pad(counts.Ongoing) },
          { label: "Upcoming", value: pad(counts.Upcoming) },
          { label: "Location", value: "Mohali, Punjab" },
        ]}
      />

      <section className="tone-light bg-bone text-ink pt-20 md:pt-28">
        <div className="shell">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 pb-8 border-b border-ink/15">
            <div className="flex flex-wrap gap-x-9 gap-y-4" role="tablist" aria-label="Filter projects by status">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={filter === f}
                  data-active={filter === f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "link-underline eyebrow transition-colors duration-500",
                    filter === f ? "text-ink" : "text-muted hover:text-ink/85"
                  )}
                >
                  {f}
                  <sup className="ml-1.5 text-[0.6rem] text-ink/50">{pad(counts[f])}</sup>
                </button>
              ))}
            </div>

            <label className="flex items-center gap-4 w-full lg:w-[400px] border-b border-ink/25 focus-within:border-ink transition-colors duration-500 pb-3">
              <Search className="h-4 w-4 shrink-0 text-ink/60" aria-hidden />
              <span className="sr-only">Search projects</span>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name or location"
                className="flex-1 bg-transparent outline-none text-ink placeholder:text-ink/45"
              />
            </label>
          </div>
          <p className="mt-6 eyebrow text-[0.65rem] text-muted" aria-live="polite">
            Showing {pad(filtered.length)} of {pad(projects.length)}
          </p>
        </div>
      </section>

      <section className="tone-light bg-bone text-ink pt-10 pb-28 md:pb-40">
        <div className="shell">
          {filtered.map((project, i) => (
            <ProjectRow key={project.slug} project={project} number={projects.indexOf(project) + 1} flip={i % 2 === 1} />
          ))}

          {filtered.length === 0 && (
            <div className="border-t border-ink/15 py-28 text-center">
              <p className="font-display text-[clamp(1.75rem,3vw,2.75rem)] tracking-[-0.02em]">No projects match your search.</p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setFilter("All");
                }}
                className="link-underline eyebrow mt-8 text-ink/80 hover:text-ink"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>

      <ContactCTA />
    </main>
  );
}

function ProjectRow({ project, number, flip }: { project: Project; number: number; flip: boolean }) {
  const ref = useRef<HTMLElement>(null);
  useSectionTimeline(ref, (el, env) => {
    createEditorialTimeline(el, env, "top 80%");
  });

  const details = [
    project.priceLabel !== "Coming Soon" && { label: "Price", value: project.priceLabel },
    project.area && project.area !== "TBA" && { label: "Area", value: project.area },
    { label: "Configurations", value: project.configurations.map((c) => c.type).join(", ") },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article ref={ref} className="border-t border-ink/15 py-16 md:py-24">
      <Link
        href={`/projects/${project.slug}`}
        data-cursor="view"
        data-cursor-label="View Project"
        className="group grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10 items-center"
      >
        <div className={cn("lg:col-span-7", flip && "lg:col-start-6 lg:row-start-1")}>
          <div data-frame data-dir={flip ? "right" : "left"} className="media-frame aspect-[4/3] lg:aspect-[16/11]">
            <div data-parallax="5" className="media-inner">
              <div data-media className="absolute inset-0">
                <div className="absolute inset-0 transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]">
                  <Image src={project.heroImage} alt={project.heroImageAlt} fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
                </div>
              </div>
            </div>
            <span className="absolute top-5 left-5 eyebrow text-[0.62rem] px-3 py-1.5 rounded-full bg-ink/55 backdrop-blur-md text-bone/95">
              {project.status}
            </span>
          </div>
        </div>

        <div className={cn("lg:col-span-5", flip ? "lg:col-start-1 lg:row-start-1 lg:pr-10" : "lg:pl-10")}>
          <div data-index className="flex items-center gap-4 eyebrow text-muted">
            <span className="text-accent">{pad(number)}</span>
            <span className="h-px w-8 bg-ink/20" />
            {project.location}
          </div>

          {/* Hover transform lives on the heading, never on [data-line]: a CSS
              transform transition on a GSAP target corrupts its reveal. */}
          <h2 className="mt-8 font-display text-[clamp(2.4rem,4.2vw,4.5rem)] leading-[1.02] tracking-[-0.035em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
            <span className="line-mask">
              <span data-line className="line-inner">
                {project.name}
              </span>
            </span>
          </h2>

          {project.tagline && (
            <p data-fade className="mt-6 text-ink/85 leading-relaxed max-w-[48ch]">
              {project.tagline}
            </p>
          )}
          <p data-fade className="mt-4 text-sm text-muted leading-relaxed max-w-[52ch] hidden md:block">
            {project.description}
          </p>

          <dl data-fade className="mt-10 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink/15 pt-6">
            {details.map((d) => (
              <div key={d.label} className={d.label === "Configurations" ? "col-span-2" : ""}>
                <dt className="eyebrow text-[0.6rem] text-muted">{d.label}</dt>
                <dd className="mt-1.5 text-ink/90">{d.value}</dd>
              </div>
            ))}
          </dl>

          <span data-cta className="mt-10 inline-flex items-center gap-4 eyebrow text-ink transition-colors duration-500 group-hover:text-accent">
            <span className="link-underline link-underline--group">Explore Project</span>
            <Arrow className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2" />
          </span>
        </div>
      </Link>
    </article>
  );
}
