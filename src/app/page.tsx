import Hero from "@/components/sections/home/Hero";
import About from "@/components/sections/home/About";
import dynamic from "next/dynamic";
import ContactCTA from "@/components/sections/home/ContactCTA";

// Below the fold: split into their own chunks so the first load only ships Hero + About.
// They are still rendered on the server, so the page height (and scroll positions) don't change.
const SelectedProjects = dynamic(() => import("@/components/sections/home/SelectedProjects"));
const Blueprints = dynamic(() => import("@/components/sections/home/Blueprints"));
const Journey = dynamic(() => import("@/components/sections/home/Journey"));
const Team = dynamic(() => import("@/components/sections/home/Team"));
const Testimonials = dynamic(() => import("@/components/sections/home/Testimonials"));
const Visit = dynamic(() => import("@/components/sections/home/Visit"));

export default function Home() {
  return (
    <main className="bg-bone text-ink">
      <Hero />
      <About />
      <SelectedProjects />
      <Blueprints />
      <Journey />
      <Team />
      <Testimonials />
      <Visit />
      <ContactCTA />
    </main>
  );
}
