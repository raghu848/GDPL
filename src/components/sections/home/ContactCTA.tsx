import CTASection from "@/components/sections/shared/CTASection";
import MagneticButton from "@/components/ui/MagneticButton";
import { WHATSAPP } from "@/components/shared/Navbar";

export default function ContactCTA() {
  return (
    <CTASection
      image={{ src: "/regal_heights/Regal_Heights_.jpg.jpeg", alt: "Regal Heights residential towers, Sector 91, Mohali" }}
      eyebrow="Luxury isn't complete without responsibility"
      lines={["Let's imagine", "your future", <em key="m" className="accent-text">in Mohali.</em>]}
      copy="Speak with our advisors about residences, investments and private site visits across our signature projects."
      actions={
        <>
          <MagneticButton href={WHATSAPP} variant="solid">
            Start a Conversation
          </MagneticButton>
          <MagneticButton href="tel:+917789000077" showArrow={false}>
            +91 77890 00077
          </MagneticButton>
        </>
      }
    />
  );
}
