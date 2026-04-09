"use client";

import Link from "next/link";
import { Instagram, Facebook, Youtube, Mail, Phone } from "lucide-react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="bg-transparent py-16 border-t border-gold/10 relative overflow-hidden">
            {/* Subtle gold gradient line at top */}
            <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.4), transparent)" }} />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    <div className="space-y-6">
                        <Image src="/images/GDPL_Logo_white2.png?v=2" alt="GDPL - Group Developers Private Limited Logo" width={160} height={40} className="h-10 w-auto" />
                        <p className="text-muted text-xs font-light max-w-xs leading-relaxed">
                            We know everything you need about Mohali property market. Building trust since a decade.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h4 className="section-label mb-4">Contact Info</h4>
                            <div className="space-y-1">
                                <a href="mailto:info@gdplmohali.in" className="block text-lg font-bold hover:text-gold transition-colors text-gold/80">info@gdplmohali.in</a>
                                <a href="tel:+917789000077" className="block text-lg font-bold hover:text-gold transition-colors text-gold/80">+91 77890 00077</a>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <Link href="#" className="p-2 border border-gold/15 rounded-full hover:bg-gold hover:text-white hover:border-gold transition-all group">
                                <Instagram className="w-3.5 h-3.5 text-gold/60 group-hover:text-white transition-colors" />
                            </Link>
                            <Link href="#" className="p-2 border border-gold/15 rounded-full hover:bg-gold hover:text-white hover:border-gold transition-all group">
                                <Facebook className="w-3.5 h-3.5 text-gold/60 group-hover:text-white transition-colors" />
                            </Link>
                            <Link href="#" className="p-2 border border-gold/15 rounded-full hover:bg-gold hover:text-white hover:border-gold transition-all group">
                                <Youtube className="w-3.5 h-3.5 text-gold/60 group-hover:text-white transition-colors" />
                            </Link>
                        </div>
                    </div>

                    <nav className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <Link href="/" className="block text-[14px] font-normal tracking-[0.3em] capitalize hover:text-gold transition-colors gold-underline w-fit font-serif">Main</Link>
                            <Link href="/projects" className="block text-[14px] font-normal tracking-[0.3em] capitalize hover:text-gold transition-colors gold-underline w-fit font-serif">Projects</Link>
                            <Link href="/about" className="block text-[14px] font-normal tracking-[0.3em] capitalize hover:text-gold transition-colors gold-underline w-fit font-serif">About Us</Link>
                            <Link href="/contact" className="block text-[14px] font-normal tracking-[0.4em] capitalize hover:text-gold transition-colors gold-underline w-fit text-gold font-normal font-serif">Contact Us</Link>
                        </div>
                    </nav>
                </div>

                {/* Gold divider */}
                <div className="gold-divider w-full mb-8" />

                <div className="flex flex-col md:flex-row justify-between items-center text-[14px] font-normal tracking-[0.3em] capitalize text-muted font-serif">
                    <p>&copy; {new Date().getFullYear()} Gdpl Mohali. All Rights Reserved.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-gold transition-colors text-[14px] font-serif">Privacy Policy</Link>
                        <Link href="https://growdient.com/" className="hover:text-gold transition-colors text-[14px] group relative overflow-hidden font-serif">
                            Made by Growdient
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
