import Image from "next/image";
import PageHero from "@/components/sections/shared/PageHero";
import EditorialSection from "@/components/sections/shared/EditorialSection";
import SectionHeader from "@/components/sections/shared/SectionHeader";
import CTASection from "@/components/sections/shared/CTASection";
import MagneticButton from "@/components/ui/MagneticButton";
import { WHATSAPP } from "@/components/shared/Navbar";

const LEADERS = [
  {
    name: "Mr. B.S. Gill",
    role: "Visionary Leader and Mentor",
    image: "/images/mr bs gill.jpg",
    bio: "As a company, Gdpl has always prioritized quality, innovation, and a deep-rooted commitment to community building. Our vision is to create developments that not only meet expectations but exceed them, leaving a lasting impact on the lives of our customers and the society at large.",
  },
  {
    name: "Mr. Nardeep Singh",
    role: "Driving Innovation and Growth",
    image: "/images/nardeep singh.jpg",
    bio: "At Gdpl, we are constantly innovating to align with the evolving needs of our customers. Our focus remains on delivering projects that uphold customer trust while paving the way for a brighter, more sustainable future.",
  },
];

const CSR = [
  { title: "Education", text: "Supporting local schools and providing resources for children's growth." },
  { title: "Environment", text: "Promoting green initiatives and sustainable living practices." },
  { title: "Social Welfare", text: "Aiming to make a meaningful difference in the lives of the people we serve." },
];

export default function AboutPage() {
  return (
    <main className="bg-bone text-ink">
      <PageHero
        lines={["Shaping skylines,", <em key="t" className="accent-text">building trust.</em>]}
        headlineClassName="space-y-[0.14em]"
        copy="A distinguished name in Mohali real estate."
        image={{
          src: "/regal_empirus/renders/night-elevation-wide.jpg",
          alt: "Regal Empirus towers lit up at dusk beside the Sector 91 road",
        }}
        actions={
          <>
            <MagneticButton href="#leadership" variant="solid">
              Meet the Leadership
            </MagneticButton>
          </>
        }
      />

      {/* 01 — Who we are */}
      <EditorialSection tone="light">
        <SectionHeader
          label="Who We Are"
          lines={["A distinguished", "name in", <em key="r" className="accent-text">real estate.</em>]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14">
          <div className="lg:col-span-5 lg:col-start-3 flex flex-col gap-8">
            <p data-fade className="text-xl leading-relaxed text-ink/95">
              Gdpl is a distinguished entity in the real estate sector, celebrated for delivering high-quality construction and
              innovative design. Our portfolio showcases a diverse range of projects, including luxurious residential estates,
              cutting-edge commercial hubs, and infrastructural marvels.
            </p>
            <p data-fade className="leading-[1.8] text-muted">
              Each development reflects our unwavering commitment to sustainability and modernity, ensuring that every structure
              is not only aesthetically pleasing but also environmentally responsible.
            </p>
          </div>
          {/* On desktop the frame is pinned to the bottom of the text and rises into
              the empty band beside the heading, so nothing is left hanging below. */}
          <div className="lg:col-span-4 lg:col-start-9 lg:relative">
            <div data-frame data-dir="up" className="media-frame aspect-[4/5] lg:absolute lg:inset-x-0 lg:bottom-0 lg:min-h-full">
              <div data-parallax="6" className="media-inner">
                <div data-media className="absolute inset-0">
                  <Image
                    src="/office_images/IMG_2365.jpg"
                    alt="Glass-partitioned corridor at the GDPL office, lined with department suites"
                    fill
                    sizes="(min-width: 1024px) 30vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </EditorialSection>

      {/* 03 — Leadership */}
      <EditorialSection tone="light" id="leadership">
        <SectionHeader label="The Visionaries" lines={["Our", <em key="l" className="accent-text">leadership.</em>]} />

        <div className="flex flex-col gap-24 md:gap-40">
          {LEADERS.map((leader, i) => (
            <article key={leader.name} className="group grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-10 items-center">
              <div className={i % 2 === 0 ? "lg:col-span-5 lg:col-start-2" : "lg:col-span-5 lg:col-start-8 lg:row-start-1"}>
                <div data-frame data-dir="up" className="media-frame aspect-[3/4]">
                  <div data-media className="absolute inset-0">
                    <Image
                      src={leader.image}
                      alt={`Official portrait of ${leader.name}, ${leader.role} at GDPL`}
                      fill
                      sizes="(min-width: 1024px) 38vw, 100vw"
                      className="object-cover object-top grayscale transition-[filter,transform] duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:grayscale-0 group-hover:scale-[1.03]"
                    />
                  </div>
                </div>
              </div>
              <div className={i % 2 === 0 ? "lg:col-span-5 lg:col-start-8" : "lg:col-span-5 lg:col-start-2 lg:row-start-1"}>
                <span data-fade className="eyebrow text-muted block">
                  0{i + 1} — {leader.role}
                </span>
                <h3 data-fade className="mt-6 font-display text-[clamp(2.25rem,4vw,4rem)] leading-[1.02] tracking-[-0.03em]">
                  {leader.name}
                </h3>
                <div data-rule className="hairline my-10" />
                <p data-fade className="font-display text-[clamp(1.2rem,1.7vw,1.65rem)] leading-[1.5] tracking-[-0.01em] text-ink/85">
                  &ldquo;{leader.bio}&rdquo;
                </p>
              </div>
            </article>
          ))}
        </div>
      </EditorialSection>

      {/* 04 — Team */}
      <EditorialSection tone="sand">
        <SectionHeader label="The Backbone" lines={["Our", <em key="t" className="accent-text">team.</em>]} />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14 items-end">
          <div className="lg:col-span-6 lg:col-start-3">
            <p data-fade className="font-display text-[clamp(1.6rem,2.8vw,2.75rem)] leading-[1.3] tracking-[-0.02em]">
              Behind Gdpl&apos;s success lies a team of dedicated professionals who bring expertise, creativity, and passion to
              every project.
            </p>
            <p data-fade className="mt-10 body-lg text-muted max-w-[52ch]">
              Our team members, from architects to customer relations specialists, work collaboratively to ensure that our
              projects are nothing short of excellence. We are united by a common goal: building spaces that inspire.
            </p>
          </div>
          <div className="lg:col-span-3 lg:col-start-10">
            <div data-frame data-dir="left" className="media-frame aspect-[4/5]">
              <div data-media className="absolute inset-0">
                <Image
                  src="/office_images/IMG_2367.jpg"
                  alt="GDPL cabin with the message 'We support and respect our team members'"
                  fill
                  sizes="(min-width: 1024px) 22vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </EditorialSection>

      {/* 05 — CSR */}
      <EditorialSection tone="light">
        <SectionHeader
          label="Responsibility"
          lines={["Corporate social", <em key="c" className="accent-text">responsibility.</em>]}
          copy="At Gdpl, we believe in giving back to the community. Our CSR initiatives focus on education, environment, and social welfare."
        />
        <div data-stagger className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-14">
          {CSR.map((item, i) => (
            <div key={item.title} data-item className="group">
              <div className="hairline mb-8" />
              <span className="eyebrow text-accent">0{i + 1}</span>
              <h3 className="mt-6 font-display text-[clamp(1.9rem,2.8vw,2.75rem)] leading-tight tracking-[-0.02em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                {item.title}
              </h3>
              <p className="mt-5 leading-relaxed text-muted max-w-[32ch]">{item.text}</p>
            </div>
          ))}
        </div>
      </EditorialSection>

      <CTASection
        image={{
          src: "/images/regal-luxuria/WhatsApp Image 2026-04-01 at 5.43.10 PM.jpeg",
          alt: "City lights of the Tricity region at night",
        }}
        eyebrow="Our Fundamental Vision"
        headlineClassName="display-lg max-w-[20ch]"
        lines={["To be the region's most", "trusted developer, where", <em key="v" className="accent-text">quality meets transparency.</em>]}
        copy="Every address we build is a promise kept — to our customers, our partners and the city we call home."
        actions={
          <>
            <MagneticButton href={WHATSAPP} variant="solid">
              Start a Conversation
            </MagneticButton>
            <MagneticButton href="/contact">Contact Us</MagneticButton>
          </>
        }
      />
    </main>
  );
}
