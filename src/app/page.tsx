import Hero from "@/components/sections/home/Hero";
import About from "@/components/sections/home/About";
import SelectedProjects from "@/components/sections/home/SelectedProjects";
import Blueprints from "@/components/sections/home/Blueprints";
import Workspace from "@/components/sections/home/Workspace";
import Journey from "@/components/sections/home/Journey";
import Team from "@/components/sections/home/Team";
import Testimonials from "@/components/sections/home/Testimonials";
import Visit from "@/components/sections/home/Visit";
import ContactCTA from "@/components/sections/home/ContactCTA";

export default function Home() {
  return (
    <main className="bg-bone text-ink">
      <Hero />
      <About />
      <SelectedProjects />
      <Workspace />
      <Blueprints />
      <Journey />
      <Team />
      <Testimonials />
      <Visit />
      <ContactCTA />
    </main>
  );
}
