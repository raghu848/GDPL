"use client";

import { FormEvent, useState } from "react";
import PageHero from "@/components/sections/shared/PageHero";
import EditorialSection from "@/components/sections/shared/EditorialSection";
import CTASection from "@/components/sections/shared/CTASection";
import Visit from "@/components/sections/home/Visit";
import RevealLines from "@/components/ui/RevealLines";
import MagneticButton, { Arrow } from "@/components/ui/MagneticButton";

const EMAIL = "info@gdplmohali.com";
const PHONE = "+91 77890 00077";
const PHONE_HREF = "tel:+917789000077";
const WHATSAPP = "https://wa.me/917789000077";

const DETAILS = [
  { label: "Call Us", value: PHONE, href: PHONE_HREF },
  { label: "Email Us", value: EMAIL, href: `mailto:${EMAIL}` },
  { label: "WhatsApp", value: "Chat with our team", href: WHATSAPP },
  { label: "Registered Office", value: "SCO 123-124, Sector 17-C, Chandigarh, India 160017" },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [opened, setOpened] = useState(false);

  const update = (key: keyof typeof form) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [key]: e.target.value }));

  // Opens the visitor's email app with the enquiry pre-filled.
  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const subject = `Website enquiry from ${form.name}`;
    const body = `${form.message}\n\n— ${form.name}\n${form.email}`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <main className="bg-bone text-ink">
      <PageHero
        eyebrow="Get In Touch"
        lines={["Let's", <em key="c" className="accent-text">connect.</em>]}
        copy="Whether you're looking for a new home or a strategic investment, our team is here to guide you."
        image={{
          src: "/office_images/IMG_2364.jpg",
          alt: "GDPL sales office with an illuminated architectural model of the residential towers",
        }}
        actions={
          <>
            <MagneticButton href={WHATSAPP} variant="solid">
              Chat on WhatsApp
            </MagneticButton>
            <MagneticButton href={PHONE_HREF} showArrow={false}>
              {PHONE}
            </MagneticButton>
          </>
        }
      />

      <EditorialSection tone="paper">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-20">
          <div className="lg:col-span-5 flex flex-col">
            <div className="flex items-center gap-6 mb-10">
              <span data-index className="eyebrow text-muted">
                Say Hello
              </span>
            </div>
            <RevealLines className="display-lg" lines={["Drop us", <em key="m" className="accent-text">a message.</em>]} />
            <p data-fade className="mt-10 body-lg text-muted max-w-[40ch]">
              We&apos;ll get back to you within 24 hours. Your future in Mohali starts with a simple conversation.
            </p>

            <dl data-stagger className="mt-14 flex flex-col">
              {DETAILS.map((d) => (
                <div key={d.label} data-item className="border-t border-ink/12 py-6 last:border-b grid grid-cols-3 gap-4">
                  <dt className="eyebrow text-[0.62rem] text-muted pt-1">{d.label}</dt>
                  <dd className="col-span-2">
                    {d.href ? (
                      <a
                        href={d.href}
                        target={d.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className="link-underline text-lg"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <span className="leading-relaxed text-ink/90">{d.value}</span>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            <form data-fade onSubmit={submit} className="flex flex-col gap-12">
              <Field label="Full Name" name="name" value={form.name} onChange={update("name")} autoComplete="name" />
              <Field label="Email Address" name="email" type="email" value={form.email} onChange={update("email")} autoComplete="email" />
              <Field label="Message" name="message" value={form.message} onChange={update("message")} multiline />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-2">
                <button type="submit" className="btn-premium btn-premium--dark self-start" data-cursor="hover">
                  <span className="btn-label">Send Message</span>
                  <span className="btn-arrow">
                    <Arrow />
                  </span>
                </button>
                <p className="text-sm text-muted max-w-[34ch]" aria-live="polite">
                  {opened
                    ? "Your email app should now be open with the message ready to send."
                    : "Submitting opens your email app with the enquiry pre-filled."}
                </p>
              </div>
            </form>
          </div>
        </div>
      </EditorialSection>

      <Visit />

      <CTASection
        video="/images/Architectural_Animation_Loop_Generation.mp4"
        eyebrow="Registered Office — Sector 17-C, Chandigarh"
        lines={["We are", <em key="h" className="accent-text">here to help.</em>]}
        copy="Speak with our advisors about residences, investments and private site visits."
        actions={
          <>
            <MagneticButton href={WHATSAPP} variant="solid">
              WhatsApp
            </MagneticButton>
            <MagneticButton href={`mailto:${EMAIL}`}>Email</MagneticButton>
          </>
        }
      />
    </main>
  );
}

type FieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: { target: { value: string } }) => void;
  type?: string;
  multiline?: boolean;
  autoComplete?: string;
};

function Field({ label, name, value, onChange, type = "text", multiline, autoComplete }: FieldProps) {
  const cls =
    "peer w-full bg-transparent border-b border-ink/20 pb-4 pt-2 text-[clamp(1.15rem,1.6vw,1.5rem)] font-display tracking-[-0.01em] text-ink outline-none transition-colors duration-500 focus:border-ink placeholder:text-transparent";
  return (
    <label className="group relative flex flex-col gap-3">
      <span className="eyebrow text-[0.62rem] text-muted transition-colors duration-500 group-focus-within:text-ink">{label}</span>
      {multiline ? (
        <textarea name={name} rows={4} required value={value} onChange={onChange} className={`${cls} resize-none`} data-lenis-prevent />
      ) : (
        <input name={name} type={type} required value={value} onChange={onChange} autoComplete={autoComplete} className={cls} />
      )}
      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:scale-x-100" />
    </label>
  );
}
