"use client";

import { motion } from "framer-motion";
import { Globe, Heart, ShieldCheck } from "lucide-react";

export default function AboutPage() {
    const leaders = [
        {
            name: "Mr. B.S. Gill",
            role: "Visionary Leader and Mentor",
            image: "/images/mr bs gill.jpg",
            bio: "As a company, GDPL has always prioritized quality, innovation, and a deep-rooted commitment to community building. Our vision is to create developments that not only meet expectations but exceed them, leaving a lasting impact on the lives of our customers and the society at large."
        },
        {
            name: "Mr. Nardeep Singh",
            role: "Driving Innovation and Growth",
            image: "/images/nardeep singh.jpg",
            bio: "At GDPL, we are constantly innovating to align with the evolving needs of our customers. Our focus remains on delivering projects that uphold customer trust while paving the way for a brighter, more sustainable future."
        }
    ];

    return (
        <main className="min-h-screen bg-transparent text-noir font-sans pb-24 selection:bg-noir selection:text-white">
            {/* Hero Section */}
            <section className="relative h-[80vh] w-full mb-32 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source src="/images/WhatsApp Video 2024-12-12 at 1.39.05 PM (540p No Audio).mp4" type="video/mp4" />
                    </video>
                </div>
            </section>

            {/* Main Content - Who We Are */}
            <section className="container mx-auto px-6 mb-40 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    <div>
                        <h2 className="text-h2 mb-12 border-l-4 border-gold pl-6 uppercase tracking-tighter">Who We Are</h2>
                        <div className="space-y-8 text-muted text-lg leading-relaxed font-light">
                            <p>
                                GDPL is a distinguished entity in the real estate sector, celebrated for
                                delivering high-quality construction and innovative design. Our portfolio
                                showcases a diverse range of projects, including luxurious residential estates,
                                cutting-edge commercial hubs, and infrastructural marvels.
                            </p>
                            <p>
                                Each development reflects our unwavering commitment to sustainability and
                                modernity, ensuring that every structure is not only aesthetically pleasing
                                but also environmentally responsible.
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid with Static High-End Typography */}
                    <div className="grid grid-cols-2 gap-8 border-t border-black/10 pt-12">
                        <div className="flex flex-col items-center text-center">
                            <span className="text-4xl md:text-5xl font-black text-noir tracking-tighter">10+</span>
                            <span className="text-[9px] uppercase tracking-[0.3em] text-noir/40 font-bold mt-2">Years of Legacy</span>
                        </div>
                        <div className="flex flex-col items-center text-center">
                            <span className="text-4xl md:text-5xl font-black text-noir tracking-tighter">500+</span>
                            <span className="text-[9px] uppercase tracking-[0.3em] text-noir/40 font-bold mt-2">Families Served</span>
                        </div>
                        <div className="col-span-2 pt-8 border-t border-black/5 mt-4 text-center">
                            <span className="text-6xl md:text-7xl font-black text-noir tracking-tighter block mb-2">100%</span>
                            <span className="text-[10px] uppercase tracking-[0.4em] text-noir/40 font-bold">Transparency & Trust</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Journey Section with Timeline */}
            <section className="container mx-auto px-6 mb-40 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="section-label mb-8">Evolution</h2>
                        {/* Architectural accent line */}
                        <div className="w-12 h-[2px] mb-8 bg-black/10" />
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-12 text-noir">
                            Our<br />Journey
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="space-y-8 relative"
                    >
                        {/* Timeline vertical line */}
                        <div className="absolute left-0 top-0 bottom-0 w-[1px] hidden lg:block bg-black/10" />

                        <div className="lg:pl-8 relative">
                            <div className="absolute left-[-3.5px] top-2 w-2 h-2 rounded-full bg-noir hidden lg:block" />
                            <p className="text-muted text-lg leading-relaxed font-light">
                                From our humble beginnings to becoming a trusted name in real estate, GDPL&apos;s journey is a testament to perseverance, innovation, and a customer-centric approach.
                            </p>
                        </div>
                        <div className="lg:pl-8 relative">
                            <div className="absolute left-[-4px] top-2 gold-dot hidden lg:block" />
                            <p className="text-muted text-lg leading-relaxed font-light">
                                Over the years, we have expanded our horizons, delivering landmark projects and setting new benchmarks in the industry. Our growth is fueled by the trust of our clients and our passion for excellence.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Our Leadership */}
            <section className="container mx-auto px-6 mb-20 relative z-10">
                <div className="text-center mb-20">
                    <h2 className="section-label mb-4">The Visionaries</h2>
                    <h3 className="text-h2 uppercase tracking-tighter">Our Leadership</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
                    {leaders.map((leader) => (
                        <motion.div
                            key={leader.name}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 1 }}
                            className="space-y-10 group max-w-md mx-auto text-center"
                        >
                            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-gold/10 mx-auto w-full group-hover:border-gold/30 transition-all duration-700">
                                <img
                                    src={leader.image}
                                    alt={leader.name}
                                    className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                {/* Gold corner accents on hover */}
                                <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-gold/0 group-hover:border-gold/50 transition-all duration-700" />
                                <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-gold/0 group-hover:border-gold/50 transition-all duration-700" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-3xl font-black tracking-tight uppercase text-noir">{leader.name}</h3>
                                <div className="text-noir uppercase tracking-[0.15em] text-[11px] font-black">{leader.role}</div>
                                <p className="text-noir leading-relaxed font-normal mt-6 italic text-base md:text-lg">
                                    &quot;{leader.bio}&quot;
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Our Team (High-Contrast Noir Section) */}
            <section className="py-24 bg-noir text-white mb-32 relative z-10">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 1 }}
                        >
                            <h2 className="section-label mb-12 !text-white/40">The Backbone</h2>
                            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-16 text-white">
                                OUR TEAM
                            </h2>
                            <p className="text-white/60 text-xl md:text-2xl font-light leading-relaxed mb-12">
                                Behind GDPL&apos;s success lies a team of dedicated professionals who bring expertise, creativity, and passion to every project.
                            </p>
                            <p className="text-white/40 text-lg font-light leading-relaxed max-w-2xl mx-auto">
                                Our team members, from architects to customer relations specialists, work collaboratively to ensure that our projects are nothing short of excellence. We are united by a common goal: building spaces that inspire.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CSR Section with Gold Icon Glow */}
            <section className="container mx-auto px-6 mb-40 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-xl">
                        <h2 className="section-label mb-8">Responsibility</h2>
                        <div className="w-12 h-[2px] mb-8 bg-black/10" />
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none text-noir">
                            CORPORATE SOCIAL<br /><span className="text-ruby">RESPONSIBILITY</span>
                        </h2>
                    </div>
                    <div className="md:w-1/3">
                        <p className="text-noir text-base font-normal leading-relaxed">
                            At GDPL, we believe in giving back to the community. Our CSR initiatives focus on education, environment, and social welfare.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                        { title: "Education", text: "Supporting local schools and providing resources for children's growth.", icon: <Globe className="w-8 h-8" /> },
                        { title: "Environment", text: "Promoting green initiatives and sustainable living practices.", icon: <ShieldCheck className="w-8 h-8" /> },
                        { title: "Social Welfare", text: "Aiming to make a meaningful difference in the lives of the people we serve.", icon: <Heart className="w-8 h-8" /> }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 0.8, delay: idx * 0.2 }}
                            className="glass-premium p-12 rounded-3xl group border-black/5 hover:bg-white transition-all duration-700"
                        >
                            <div className="mb-8 p-4 bg-black/5 w-fit rounded-2xl text-noir group-hover:bg-noir group-hover:text-white transition-all duration-500 border border-black/5">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 group-hover:text-noir transition-colors text-noir">{item.title}</h3>
                            <p className="text-noir text-base font-normal leading-relaxed">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Vision Callout (Noir Contrast) */}
            <section className="relative py-40 overflow-hidden bg-noir">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10" />
                <div className="container mx-auto px-6 text-center relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-[10px] uppercase tracking-[0.5em] mb-12 font-bold text-white/40">Our Fundamental Vision</div>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black leading-tight uppercase tracking-tighter text-white">
                            To be the region&apos;s most trusted developer, where{" "}
                            <span className="text-white/40">
                                quality meets transparency.
                            </span>
                        </h2>
                    </div>
                </div>
            </section>
        </main>
    );
}
