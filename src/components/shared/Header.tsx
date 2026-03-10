"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
    const pathname = usePathname();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Our Projects", path: "/projects" },
        { name: "About Us", path: "/about" },
        { name: "Contact", path: "/contact" },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={cn(
                    "fixed top-0 left-0 w-full z-50 transition-all duration-700 font-sans",
                    isScrolled ? "bg-black/80 backdrop-blur-md py-4 border-b border-white/5" : "bg-transparent py-8"
                )}
            >
                <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
                    {/* Left: Language Toggle (Sid Thailand Style) */}
                    <div className="flex items-center gap-4">
                        <span className="text-[10px] font-black tracking-[0.3em] uppercase cursor-pointer hover:text-white transition-colors">
                            EN
                        </span>
                    </div>

                    {/* Center: Logo */}
                    <Link href="/" className="absolute left-1/2 -translate-x-1/2 group">
                        <img
                            src="/images/image.png"
                            alt="GDPL Logo"
                            className="h-8 md:h-12 w-auto object-contain transition-transform duration-700 group-hover:scale-110 invert brightness-200"
                        />
                    </Link>

                    {/* Right: Menu Toggle */}
                    <div className="flex items-center gap-8">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="flex items-center gap-4 group"
                        >
                            <span className="hidden md:block text-[10px] font-black tracking-[0.3em] uppercase group-hover:text-white transition-colors">
                                Menu
                            </span>
                            <div className="w-8 h-[2px] bg-white relative">
                                <div className="absolute top-[-6px] right-0 w-8 h-[2px] bg-white group-hover:w-6 transition-all" />
                                <div className="absolute top-[6px] right-0 w-8 h-[2px] bg-white group-hover:w-4 transition-all" />
                            </div>
                        </button>
                    </div>
                </div>
            </motion.header>

            {/* Sidebar Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Dim Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm"
                        />

                        {/* Sidebar */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed top-0 right-0 h-full w-full md:w-[400px] lg:w-[30%] z-[60] bg-black border-l border-white/5 flex flex-col p-12"
                        >
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="self-end text-white p-2 group mb-20"
                            >
                                <X className="w-8 h-8 transition-transform duration-500 group-hover:rotate-90" />
                            </button>

                            <nav className="flex flex-col gap-6">
                                {navLinks.map((link, i) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.1 * i + 0.2 }}
                                    >
                                        <Link
                                            href={link.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={cn(
                                                "text-xl md:text-2xl font-black uppercase tracking-tighter hover:text-white transition-colors block",
                                                pathname === link.path ? "text-white" : "text-muted"
                                            )}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            <div className="mt-auto flex flex-col gap-8">
                                <div className="h-px w-full bg-white/10" />
                                <div className="space-y-6">
                                    <div className="text-[8px] font-black uppercase tracking-[0.4em] text-white/30">Location</div>
                                    <a
                                        href="https://www.google.com/maps/dir/?api=1&destination=Regal%20Heights%2C%20PM2H%2B8GV%2C%20GH-11D%2C%20Sector%2091%2C%20Sahibzada%20Ajit%20Singh%20Nagar%2C%20Punjab%20140307"
                                        target="_blank"
                                        className="text-[10px] font-black tracking-[0.3em] uppercase hover:text-white transition-colors flex items-center gap-3 group/dir"
                                    >
                                        Get Directions
                                        <div className="w-4 h-4 rounded-full border border-white/20 flex items-center justify-center group-hover/dir:border-white transition-colors">
                                            <div className="w-1 h-1 bg-white rounded-full" />
                                        </div>
                                    </a>
                                </div>
                                <div className="flex gap-8 text-muted text-[10px] font-black tracking-[0.4em] uppercase">
                                    <Link href="#" className="hover:text-white">IG</Link>
                                    <Link href="#" className="hover:text-white">YT</Link>
                                    <Link href="#" className="hover:text-white">FB</Link>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
