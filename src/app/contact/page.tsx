"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });

    return (
        <main className="min-h-screen bg-transparent text-white selection:bg-gold selection:text-black grain-overlay">
            {/* 1. Hero Section with Image */}
            <section className="pt-40 pb-20 border-b border-gold/5 mx-auto px-6 container relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="section-label mb-8">Get In Touch</h2>
                        {/* Gold accent line */}
                        <div className="w-12 h-[2px] mb-8" style={{ background: "linear-gradient(90deg, #D4AF37, transparent)" }} />
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-12">
                            LET&apos;S<br /><span className="text-gold-gradient">CONNECT</span>
                        </h1>
                        <p className="text-muted text-xl md:text-2xl max-w-lg font-light leading-relaxed">
                            Whether you&apos;re looking for a new home, a strategic investment, or expert consulting, our team is here to guide you.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative rounded-3xl overflow-hidden glow-gold flex items-center justify-center p-4 bg-white/5"
                    >
                        {/* Gold corner accents */}
                        <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-gold/30 z-10" />
                        <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-gold/30 z-10" />
                        <img
                            src="/images/herosection.png"
                            alt="Contact Hero"
                            className="w-full h-auto object-contain md:grayscale hover:grayscale-0 transition-all duration-1000 max-h-[500px]"
                        />
                    </motion.div>
                </div>
            </section>

            {/* 2. Form Section with Video Background */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/60 z-10" />
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover grayscale opacity-40 contrast-125"
                    >
                        <source src="/images/Architectural_Animation_Loop_Generation.mp4" type="video/mp4" />
                    </video>
                </div>

                <div className="container mx-auto px-6 relative z-20 py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 1 }}
                        >
                            <div className="space-y-16">
                                <div>
                                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">SAY <span className="text-gold-gradient">HELLO</span></h2>
                                    <p className="text-white/60 text-lg font-light leading-relaxed max-w-md">
                                        Drop us a message and we&apos;ll get back to you within 24 hours. Your future in Mohali starts with a simple conversation.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    <div className="flex items-center gap-6 group">
                                        <div className="p-4 bg-gold/5 border border-gold/15 rounded-2xl group-hover:bg-gold text-gold group-hover:text-black transition-all duration-500">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/40 mb-1">Call Us</p>
                                            <p className="text-lg font-medium">+91 77890 00077</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 group">
                                        <div className="p-4 bg-gold/5 border border-gold/15 rounded-2xl group-hover:bg-gold text-gold group-hover:text-black transition-all duration-500">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/40 mb-1">Email Us</p>
                                            <p className="text-lg font-medium">info@gdplmohali.com</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 1 }}
                            className="glass-premium p-8 md:p-12 rounded-[2rem] shadow-2xl relative"
                        >
                            {/* Gold corner accents */}
                            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/20" />
                            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/20" />

                            <form className="space-y-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/50">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none input-premium text-white placeholder-white/30"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/50">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none input-premium text-white placeholder-white/30"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/50">Message</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Tell us about your requirements..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none input-premium resize-none text-white placeholder-white/30"
                                    />
                                </div>
                                <button className="w-full py-6 rounded-xl text-[10px] flex items-center justify-center gap-4 group mt-12 btn-gold">
                                    Send Message
                                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Office Info Section */}
            <section className="py-40 bg-transparent relative z-10">
                <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)" }} />
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-24 items-center">
                        <div className="max-w-xs">
                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">Registered Office</h3>
                            <p className="text-muted font-light leading-relaxed">
                                SCO 123-124, Sector 17-C, Chandigarh, India<br />
                                160017
                            </p>
                        </div>
                        <div className="md:col-span-2 border-l border-gold/10 pl-12 md:pl-24">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-12">
                                WE ARE<br />HERE TO <span className="text-gold-gradient">HELP.</span>
                            </h2>
                            <div className="flex flex-wrap gap-8">
                                <a href="https://wa.me/917789000077" target="_blank" className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60 hover:text-gold transition-all group">
                                    <MessageSquare className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    WhatsApp
                                </a>
                                <a href="mailto:info@gdplmohali.com" className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60 hover:text-gold transition-all group">
                                    <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    Email
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
