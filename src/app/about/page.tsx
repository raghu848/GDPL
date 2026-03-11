"use client";

import { motion } from "framer-motion";
import { Users, Globe, Heart, ShieldCheck } from "lucide-react";

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
        <main className="min-h-screen bg-obsidian text-white font-sans pb-24 selection:bg-white selection:text-black">
            {/* Hero Section */}
            <section className="relative h-screen w-full mb-32 overflow-hidden">
                {/* Video Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-black/30 z-10" />
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
            <section className="container mx-auto px-6 mb-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
                    <div>
                        <h2 className="text-h2 mb-12 border-l-4 border-white pl-6 uppercase tracking-tighter">Who We Are</h2>
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

                    {/* Stats Grid - Sid Style */}
                    <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-12">
                        <div>
                            <div className="text-5xl font-black mb-2 tracking-tighter">10+</div>
                            <div className="text-[10px] uppercase tracking-[0.3em] text-muted font-bold">Years of Legacy</div>
                        </div>
                        <div>
                            <div className="text-5xl font-black mb-2 tracking-tighter">500+</div>
                            <div className="text-[10px] uppercase tracking-[0.3em] text-muted font-bold">Families Served</div>
                        </div>
                        <div className="col-span-2 pt-8 border-t border-white/5 mt-4">
                            <div className="text-7xl font-black mb-2 tracking-tighter">100%</div>
                            <div className="text-[10px] uppercase tracking-[0.3em] text-muted font-bold">Transparency & Trust</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Journey Section */}
            <section className="container mx-auto px-6 mb-40">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-[10px] uppercase tracking-[0.4em] text-muted mb-8 font-black">Evolution</h2>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-12">
                            Our<br />Journey
                        </h2>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="space-y-8 text-muted text-lg leading-relaxed font-light"
                    >
                        <p>
                            From our humble beginnings to becoming a trusted name in real estate, GDPL’s journey is a testament to perseverance, innovation, and a customer-centric approach.
                        </p>
                        <p>
                            Over the years, we have expanded our horizons, delivering landmark projects and setting new benchmarks in the industry. Our growth is fueled by the trust of our clients and our passion for excellence.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Leadership - New Section */}
            <section className="container mx-auto px-6 mb-20">
                <h2 className="text-h2 mb-20 text-center uppercase tracking-tighter">Our Leadership</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
                    {leaders.map((leader, index) => (
                        <div key={leader.name} className="space-y-10 group max-w-md mx-auto text-center">
                            <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden border border-white/10 mx-auto w-full">
                                <img
                                    src={leader.image}
                                    alt={leader.name}
                                    className="w-full h-full object-cover md:grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-3xl font-bold tracking-tight uppercase">{leader.name}</h3>
                                <div className="text-gold uppercase tracking-[0.15em] text-[10px] font-bold">{leader.role}</div>
                                <p className="text-muted leading-relaxed font-light mt-6 italic text-sm md:text-base">
                                    &quot;{leader.bio}&quot;
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Our Team (The People) Section */}
            <section className="py-24 bg-white/5 border-y border-white/5 mb-32">
                <div className="container mx-auto px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false }}
                            transition={{ duration: 1 }}
                        >
                            <h2 className="text-[10px] uppercase tracking-[0.4em] text-muted mb-12 font-black">The Backbone</h2>
                            <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-none mb-16">
                                OUR TEAM
                            </h2>
                            <p className="text-muted text-xl md:text-2xl font-light leading-relaxed mb-12">
                                Behind GDPL’s success lies a team of dedicated professionals who bring expertise, creativity, and passion to every project.
                            </p>
                            <p className="text-muted text-lg font-light leading-relaxed max-w-2xl mx-auto opacity-70">
                                Our team members, from architects to customer relations specialists, work collaboratively to ensure that our projects are nothing short of excellence. We are united by a common goal: building spaces that inspire.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CSR Section */}
            <section className="container mx-auto px-6 mb-40">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-[10px] uppercase tracking-[0.4em] text-muted mb-8 font-black">Responsibility</h2>
                        <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
                            Corporate Social<br />Responsibility
                        </h2>
                    </div>
                    <div className="md:w-1/3">
                        <p className="text-muted text-sm font-light leading-relaxed">
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
                            className="p-12 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/[0.08] transition-colors"
                        >
                            <div className="mb-8 p-4 bg-white/10 w-fit rounded-2xl text-white">
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-black uppercase tracking-tighter mb-4">{item.title}</h3>
                            <p className="text-muted text-sm font-light leading-relaxed">{item.text}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Vision Callout */}
            <section className="bg-white text-black py-40">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-[10px] uppercase tracking-[0.5em] mb-12 font-bold opacity-30">Our Fundamental Vision</div>
                        <h2 className="text-4xl md:text-6xl font-black leading-tight uppercase tracking-tighter">
                            To be the region&apos;s most trusted real estate developer, where quality meets transparency.
                        </h2>
                    </div>
                </div>
            </section>
        </main>
    );
}
