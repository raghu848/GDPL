"use client";

import Link from "next/link";
import { Instagram, Facebook, Youtube, Mail, Phone } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-noir py-16 border-t border-text-primary-dark/10">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    <div className="space-y-6">
                        <img src="/images/GDPL_Logo_white.png" alt="GDPL Logo" className="h-10 w-auto" />
                        <p className="text-muted text-xs font-light max-w-xs leading-relaxed">
                            We know everything you need about Mohali property market. Building trust since a decade.
                        </p>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h4 className="text-[10px] font-black tracking-[0.3em] uppercase text-muted mb-4">Contact Info</h4>
                            <div className="space-y-1">
                                <a href="mailto:info@gdplmohali.in" className="block text-lg font-bold hover:text-muted transition-colors action-text">info@gdplmohali.in</a>
                                <a href="tel:+917789000077" className="block text-lg font-bold hover:text-muted transition-colors action-text">+91 77890 00077</a>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center">
                            <Link href="#" className="p-2 border border-text-primary-dark/10 rounded-full hover:bg-text-primary-dark hover:text-noir transition-all">
                                <Instagram className="w-3.5 h-3.5 icon-bronze" />
                            </Link>
                            <Link href="#" className="p-2 border border-text-primary-dark/10 rounded-full hover:bg-text-primary-dark hover:text-noir transition-all">
                                <Facebook className="w-3.5 h-3.5 icon-bronze" />
                            </Link>
                            <Link href="#" className="p-2 border border-text-primary-dark/10 rounded-full hover:bg-text-primary-dark hover:text-noir transition-all">
                                <Youtube className="w-3.5 h-3.5 icon-bronze" />
                            </Link>
                        </div>
                    </div>

                    <nav className="grid grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <Link href="/" className="block text-[10px] font-black tracking-[0.3em] uppercase hover:text-muted transition-colors">Main</Link>
                            <Link href="/projects" className="block text-[10px] font-black tracking-[0.3em] uppercase hover:text-muted transition-colors">Projects</Link>
                            <Link href="/about" className="block text-[10px] font-black tracking-[0.3em] uppercase hover:text-muted transition-colors">About</Link>
                        </div>
                        <div className="space-y-3">
                            <Link href="#" className="block text-[10px] font-black tracking-[0.3em] uppercase hover:text-muted transition-colors">Consulting</Link>
                            <Link href="#" className="block text-[10px] font-black tracking-[0.3em] uppercase hover:text-muted transition-colors">News</Link>
                            <Link href="/contact" className="block text-[10px] font-black tracking-[0.4em] uppercase hover:text-muted transition-colors">Contact</Link>
                        </div>
                    </nav>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-text-primary-dark/10 text-[10px] font-black tracking-[0.3em] uppercase text-muted">
                    <p>&copy; {new Date().getFullYear()} GDPL Mohali. All Rights Reserved.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-text-primary-dark transition-colors text-[10px]">Privacy Policy</Link>
                        <Link href="https://growdient.com/" className="hover:text-text-primary-dark transition-colors text-[10px]">Made by Growdient</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
