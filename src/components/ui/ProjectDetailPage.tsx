import { Project } from "@/lib/projectsData";
import PageHero from "@/components/sections/shared/PageHero";
import EditorialSection from "@/components/sections/shared/EditorialSection";
import SectionHeader from "@/components/sections/shared/SectionHeader";
import CTASection from "@/components/sections/shared/CTASection";
import MagneticButton, { Arrow } from "@/components/ui/MagneticButton";
import AmenityScroller from "./AmenityScroller";
import LocationScroller from "./LocationScroller";
import LocationSplitScroll from "./LocationSplitScroll";
import EmpirusGallery from "./EmpirusGallery";
import RenderGallery from "./RenderGallery";

const WHATSAPP = "https://wa.me/917789000077";

const LOCATION_SUMMARY = [
  { value: "10+", label: "Key Destinations" },
  { value: "Approx. 20", label: "Minutes Drive" },
  { value: "Multiple", label: "Top Hospitals" },
  { value: "Multiple", label: "Edu Institutions" },
];

export default function ProjectDetailPage({ project }: { project: Project }) {
  const isEmpirus = project.slug === "regal-empirus";
  const isResidencia = project.slug === "regal-residencia";
  const paragraphs = project.longDescription.split("\n\n");

  const meta = [
    project.area && { label: "Development Size", value: project.area },
    project.residencesSummary && { label: "Residences", value: project.residencesSummary },
    project.projectType && { label: "Project Type", value: project.projectType },
    project.totalUnits && { label: "Total Units", value: project.totalUnits },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <main className="bg-bone text-ink">
      <PageHero
        eyebrow={`${project.status} — ${project.location}`}
        lines={[project.name]}
        copy={project.tagline}
        image={{ src: project.heroImage, alt: project.heroImageAlt }}
        meta={meta}
        actions={
          <>
            <MagneticButton href={WHATSAPP} variant="solid">
              Enquire Now
            </MagneticButton>
            <MagneticButton href="#overview">Overview</MagneticButton>
          </>
        }
      />

      {/* Overview */}
      <EditorialSection tone="light" id="overview">
        <SectionHeader label="About the Project" lines={["About", <em key="n" className="accent-text">{project.name}.</em>]} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16">
          <div className="lg:col-span-6 lg:col-start-3 flex flex-col gap-7">
            {paragraphs.map((para, i) => (
              <p key={i} data-fade className={i === 0 ? "text-xl leading-relaxed text-ink/95" : "leading-[1.85] text-muted"}>
                {para}
              </p>
            ))}
          </div>
          <div className="lg:col-span-3 lg:col-start-10">
            <p data-fade className="eyebrow text-muted mb-6">
              Key Highlights
            </p>
            <ol data-stagger>
              {project.highlights.map((h, i) => (
                <li key={h} data-item className="flex gap-5 border-t border-ink/12 py-5 last:border-b">
                  <span className="eyebrow text-[0.62rem] text-accent pt-1">{String(i + 1).padStart(2, "0")}</span>
                  <span className="leading-snug text-ink/95">{h}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </EditorialSection>

      {isEmpirus && <EmpirusGallery />}

      {!!project.renders?.length && <RenderGallery renders={project.renders} projectName={project.name} />}

      {/* Configurations */}
      <EditorialSection tone="paper">
        <SectionHeader
          label="Floor Plans"
          lines={["Available", <em key="c" className="accent-text">configurations.</em>]}
          copy="Speak with our team for detailed pricing, floor plans and availability."
        />
        <ul data-stagger>
          {project.configurations.map((config, i) => (
            <li key={config.type} data-item>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="group grid grid-cols-12 items-baseline gap-x-6 gap-y-2 border-t border-ink/12 py-8 md:py-10"
              >
                <span className="col-span-2 md:col-span-1 eyebrow text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="col-span-10 md:col-span-6 font-display text-[clamp(1.75rem,3.2vw,3.25rem)] leading-tight tracking-[-0.03em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                  {config.type}
                </span>
                <span className="col-start-3 col-span-10 md:col-start-auto md:col-span-3 text-ink/85">
                  {config.size}
                  {config.booking && <span className="block text-sm text-muted mt-1">Booking: {config.booking}</span>}
                </span>
                <span className="hidden md:flex md:col-span-2 justify-end items-center gap-3 eyebrow text-[0.62rem] text-muted transition-colors duration-500 group-hover:text-ink">
                  Enquire
                  <Arrow className="transition-transform duration-700 group-hover:translate-x-2" />
                </span>
              </a>
            </li>
          ))}
          <li className="border-t border-ink/12" />
        </ul>
      </EditorialSection>

      {/* Amenities */}
      {!isEmpirus && (
        <EditorialSection tone="linen" contained={false}>
          <div className="shell">
            <SectionHeader
              label="Lifestyle"
              lines={["Premium", <em key="a" className="accent-text">amenities.</em>]}
              copy="Thoughtfully curated spaces for wellness, recreation and everyday ease."
            />
          </div>
          {project.amenityIcons ? (
            <div data-fade>
              <AmenityScroller amenities={Object.entries(project.amenityIcons).map(([name, icon]) => ({ name, icon }))} />
            </div>
          ) : (
            <div className="shell">
              <div data-stagger className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-14">
                {project.amenities.map((category, i) => (
                  <div key={category.name} data-item>
                    <div className="h-px w-full bg-ink/15 mb-8" />
                    <span className="eyebrow text-[0.62rem] text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="mt-4 font-display text-[clamp(1.4rem,2vw,1.9rem)] leading-tight tracking-[-0.02em]">{category.name}</h3>
                    <ul className="mt-6 flex flex-col gap-3">
                      {category.items.map((item) => (
                        <li key={item} className="text-ink/80 leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}
        </EditorialSection>
      )}

      {/* Location */}
      {project.locationAdvantages &&
        (isResidencia ? (
          <LocationSplitScroll items={project.locationAdvantages} />
        ) : (
          <EditorialSection tone="sand" contained={false}>
            <div className="shell">
              <SectionHeader
                label="Prime Connectivity"
                lines={["Location", <em key="l" className="accent-text">advantages.</em>]}
                copy="Strategically positioned for seamless connectivity to top schools, hospitals, IT hubs, and lifestyle destinations."
              />
            </div>
            <div data-fade>
              <LocationScroller items={project.locationAdvantages} />
            </div>
            <div className="shell mt-20">
              <div data-stagger className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12">
                {LOCATION_SUMMARY.map((s) => (
                  <div key={s.label} data-item>
                    <div className="h-px w-full bg-ink/15 mb-6" />
                    <p className="font-display text-[clamp(1.9rem,3.6vw,3.5rem)] leading-none tracking-[-0.04em]">{s.value}</p>
                    <p className="eyebrow text-[0.62rem] text-muted mt-4">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </EditorialSection>
        ))}

      <CTASection
        image={{ src: project.heroImage, alt: project.heroImageAlt }}
        eyebrow="Take the Next Step"
        lines={["Interested in", <em key="i" className="accent-text">{project.name}?</em>]}
        copy="Schedule a private site visit or connect with our team for detailed pricing and floor plans."
        actions={
          <>
            <MagneticButton href={WHATSAPP} variant="solid">
              WhatsApp Us
            </MagneticButton>
            <MagneticButton href="tel:+917789000077" showArrow={false}>
              Call Now
            </MagneticButton>
          </>
        }
      />
    </main>
  );
}
