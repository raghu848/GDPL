"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { cn } from "@/lib/utils";
import { useSite } from "./SiteContext";
import { useLenis } from "./SmoothScroll";
import MagneticButton from "@/components/ui/MagneticButton";

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Contact", href: "/contact" },
];

export const WHATSAPP = "https://wa.me/917710380077";

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { ready } = useSite();
  const lenis = useLenis();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  // The home hero is bright, high-key photography, so its nav needs charcoal type from
  // the start; inner pages open on darker photography and keep light type until scrolled.
  const solid = scrolled || open || pathname === "/";
  const header = useRef<HTMLElement>(null);
  const shown = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Enter once, right after the preloader hands off.
  useEffect(() => {
    if (!ready || shown.current || !header.current) return;
    shown.current = true;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.to(header.current, { opacity: 1, duration: 0.4 });
      return;
    }
    gsap.fromTo(
      header.current,
      { opacity: 0, y: -24 },
      { opacity: 1, y: 0, duration: 1.2, delay: 0.9, ease: "expo.out", clearProps: "transform" }
    );
  }, [ready]);

  // Close the mobile menu whenever the route changes.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open, lenis]);

  const isActive = (href: string) => (href.includes("#") ? false : href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <header
        ref={header}
        style={{ opacity: 0 }}
        className={cn(
          "fixed inset-x-0 top-0 z-[90] transition-[color,background-color,border-color,height,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] border-b",
          // Light type over the photo hero; light glass with charcoal type once it scrolls away.
          solid ? "tone-light text-ink" : "text-bone",
          scrolled || open
            ? "h-[72px] bg-paper/85 backdrop-blur-xl border-ink/10"
            : "h-[88px] md:h-[104px] bg-transparent border-transparent",
          open && "bg-paper border-transparent backdrop-blur-none"
        )}
      >
        <div className="shell h-full flex items-center justify-between gap-8">
          <Link href="/" aria-label="GDPL home" className="relative z-10 shrink-0">
            {/* White mark over photography, charcoal mark on the light glass bar. */}
            <span
              className={cn(
                "relative block origin-left transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                scrolled && !open ? "scale-[0.82]" : "scale-100"
              )}
            >
              <Image
                src="/images/GDPL_Logo_white2.png"
                alt="GDPL - Group Developers Private Limited"
                width={160}
                height={50}
                priority
                className={cn("w-auto object-contain h-9 md:h-11 transition-opacity duration-500", solid ? "opacity-0" : "opacity-100")}
              />
              <Image
                src="/images/GDPL_Logo_dark.png"
                alt=""
                aria-hidden
                width={160}
                height={50}
                priority
                className={cn(
                  "absolute inset-0 w-auto object-contain h-9 md:h-11 transition-opacity duration-500",
                  solid ? "opacity-100" : "opacity-0"
                )}
              />
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10 xl:gap-12" aria-label="Primary">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                data-active={isActive(link.href)}
                className="link-underline eyebrow text-[0.95rem] tracking-[0.14em] text-current opacity-90 hover:opacity-100 transition-opacity duration-500 data-[active=true]:opacity-100"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden lg:block">
              <MagneticButton href={WHATSAPP} className="min-h-12 px-7 text-[0.85rem] tracking-[0.14em]">
                Enquire
              </MagneticButton>
            </div>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              className="lg:hidden relative z-10 -mr-2 flex h-11 w-11 items-center justify-center"
            >
              <span
                className={cn(
                  "absolute h-px w-7 bg-current transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  open ? "rotate-45" : "-translate-y-[4px]"
                )}
              />
              <span
                className={cn(
                  "absolute h-px bg-current transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  open ? "w-7 -rotate-45" : "w-5 translate-x-1 translate-y-[4px]"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            key="menu"
            className="tone-light fixed inset-0 z-[85] bg-paper text-ink lg:hidden flex flex-col"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)", transition: { duration: 0.8, ease: EASE } }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)", transition: { duration: 0.7, ease: EASE, delay: 0.25 } }}
          >
            <motion.nav
              className="shell flex-1 flex flex-col justify-center gap-1 pt-24"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.07, delayChildren: 0.25 } },
                closed: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
              }}
            >
              {NAV_LINKS.map((link, i) => (
                <div key={link.name} className="overflow-hidden border-b border-ink/10">
                  <motion.div
                    variants={{
                      open: { y: "0%", opacity: 1, transition: { duration: 0.9, ease: EASE } },
                      closed: { y: "110%", opacity: 0, transition: { duration: 0.45, ease: [0.7, 0, 0.84, 0] } },
                    }}
                  >
                    <Link href={link.href} onClick={() => setOpen(false)} className="flex items-baseline justify-between py-4">
                      <span className="font-display text-[clamp(2.25rem,9vw,3.5rem)] leading-none tracking-[-0.03em]">{link.name}</span>
                      <span className="eyebrow text-muted">0{i + 1}</span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </motion.nav>

            <motion.div
              className="shell pb-10 pt-8 flex flex-col gap-6 text-ink/75"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.8, ease: EASE } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
            >
              <div className="flex flex-col gap-1 text-sm">
                <a href="tel:+917789000077" className="text-ink">+91 77890 00077</a>
                <a href="mailto:info@gdplmohali.in">info@gdplmohali.in</a>
              </div>
              <MagneticButton href={WHATSAPP} variant="solid" className="self-start">
                Enquire Now
              </MagneticButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
