"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";
import Link from "next/link";

export default function ContactMap() {
    const address = "Regal Heights, PM2H+8GV, GH-11D, Sector 91, Sahibzada Ajit Singh Nagar, Punjab 140307";
    const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

    // Embed URL for Sector 91 Mohali / Regal Heights area
    const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.144415840488!2d76.68339127632644!3d30.686214987747754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390feffd886ec457%3A0xe1f893f4e1f7c0a9!2sRegal%20Heights!5e0!3m2!1sen!2sin!4v1709971234567!5m2!1sen!2sin";

    return (
        <section className="py-40 bg-noir overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-20 items-center">
                    {/* Left Side: Address & Details */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:w-1/3 space-y-12"
                    >
                        <div>
                            <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-muted mb-8">Visit Us</h2>
                            <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] mb-8">
                                OUR<br />LOCATION
                            </h3>
                            <p className="text-muted text-lg font-light leading-relaxed max-w-sm">
                                Experience luxury firsthand at our flagship site in the heart of Mohali.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-text-primary-dark/5 rounded-full border border-text-primary-dark/10 mt-1">
                                    <MapPin className="w-5 h-5 text-text-primary-dark icon-bronze" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-muted">Address</p>
                                    <p className="text-sm font-medium leading-relaxed pr-8">
                                        Regal Heights, GH-11D, Sector 91,<br />
                                        Sahibzada Ajit Singh Nagar,<br />
                                        Punjab 140307
                                    </p>
                                </div>
                            </div>
                        </div>

                        <Link
                            href={googleMapsUrl}
                            target="_blank"
                            className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] w-fit btn-dark"
                        >
                            Get Directions
                            <Navigation className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </Link>
                    </motion.div>

                    {/* Right Side: Map Display */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="lg:w-2/3 w-full aspect-[16/9] relative rounded-3xl overflow-hidden border border-white/10 group"
                    >
                        <iframe
                            src={mapEmbedUrl}
                            className="w-full h-full border-0 md:grayscale md:invert contrast-125 opacity-70 group-hover:grayscale-0 group-hover:invert-0 group-hover:opacity-100 transition-all duration-1000"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            suppressHydrationWarning
                        ></iframe>

                        {/* Interactive Overlay Elements */}
                        <div className="absolute inset-0 pointer-events-none border border-text-primary-dark/10 rounded-3xl" />
                        <div className="absolute top-6 right-6 p-4 bg-noir/80 backdrop-blur-md rounded-2xl border border-text-primary-dark/10 hidden md:block">
                            <p className="text-[8px] font-black uppercase tracking-[0.3em] text-text-primary-dark/50 mb-1">Status</p>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-text-primary-dark flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                Open for Visitation
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
