"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [formState, setFormState] = useState({ name: "", email: "", message: "" });

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
            {/* 1. Hero Section with Image */}
            <section className="pt-40 pb-20 border-b border-white/5 mx-auto px-6 container">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <h2 className="text-[10px] font-black tracking-[0.4em] uppercase text-muted mb-8">Get In Touch</h2>
                        <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-12">
                            LET&apos;S<br />CONNECT
                        </h1>
                        <p className="text-muted text-xl md:text-2xl max-w-lg font-light leading-relaxed">
                            Whether you&apos;re looking for a new home, a strategic investment, or expert consulting, our team is here to guide you.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="relative rounded-3xl overflow-hidden border border-white/10 flex items-center justify-center p-4 bg-white/5"
                    >
                        <img
                            src="/images/herosection.png"
                            alt="Contact Hero"
                            className="w-full h-auto object-contain grayscale hover:grayscale-0 transition-all duration-1000 max-h-[500px]"
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
                                    <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-8">SAY HELLO</h2>
                                    <p className="text-white/60 text-lg font-light leading-relaxed max-w-md">
                                        Drop us a message and we&apos;ll get back to you within 24 hours. Your future in Mohali starts with a simple conversation.
                                    </p>
                                </div>

                                <div className="space-y-8">
                                    <div className="flex items-center gap-6 group">
                                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl group-hover:bg-white text-white group-hover:text-black transition-all">
                                            <Phone className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 mb-1">Call Us</p>
                                            <p className="text-lg font-medium">+91 77103 80077</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 group">
                                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl group-hover:bg-white text-white group-hover:text-black transition-all">
                                            <Mail className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50 mb-1">Email Us</p>
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
                            className="bg-black/40 backdrop-blur-2xl p-8 md:p-12 rounded-[2rem] border border-white/10 shadow-2xl"
                        >
                            <form className="space-y-8">
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="John Doe"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-white transition-colors"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-white transition-colors"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Message</label>
                                    <textarea
                                        rows={4}
                                        placeholder="Tell us about your requirements..."
                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-white transition-colors resize-none"
                                    />
                                </div>
                                <button className="w-full bg-white text-black py-6 rounded-xl font-black uppercase tracking-[0.4em] text-[10px] hover:bg-white/90 transition-all flex items-center justify-center gap-4 group mt-12">
                                    Send Message
                                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 3. Simple Footer Info */}
            <section className="py-40 bg-black">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-24 items-center">
                        <div className="max-w-xs">
                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-8">Registered Office</h3>
                            <p className="text-muted font-light leading-relaxed">
                                SCO 123-124, Sector 17-C, Chandigarh, India<br />
                                160017
                            </p>
                        </div>
                        <div className="md:col-span-2 border-l border-white/10 pl-12 md:pl-24">
                            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-12">
                                WE ARE<br />HERE TO HELP.
                            </h2>
                            <div className="flex flex-wrap gap-8">
                                <a href="https://wa.me/917710380077" target="_blank" className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-muted hover:text-white transition-all">
                                    <MessageSquare className="w-4 h-4" />
                                    WhatsApp
                                </a>
                                <a href="mailto:info@gdplmohali.com" className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-muted hover:text-white transition-all">
                                    <Mail className="w-4 h-4" />
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
