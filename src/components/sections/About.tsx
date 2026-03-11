"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, CheckCircle2 } from "lucide-react";

const TIMELINE_DATA = [
    {
        role: "Technical Manager",
        company: "SSM Infotech, Surat",
        period: "Sept 2023 – Present",
        description: "Leading a team of engineers to deliver enterprise-scale AVEVA PI solutions. Architecting integrations, managing full lifecycle deployments, and ensuring compliance with industry standards.",
        icon: Briefcase,
    },
    {
        role: "PI Application Developer",
        company: "Industrial Analytics Sector",
        period: "2020 – 2023",
        description: "Developed and maintained PI Data Archive, PI Asset Framework templates, and custom PI Vision displays. Collaborated seamlessly with automation and IT teams.",
        icon: Briefcase,
    },
    {
        role: "B.E. Computer Engineering",
        company: "Gujarat Technological University (GTU)",
        period: "Graduated",
        description: "Foundation in computer science, data structures, and software engineering principles.",
        icon: GraduationCap,
    },
];

const TARGET_REQUIREMENTS = [
    "Lifecycle upgrades & migrations of PI Data Historian systems",
    "Technical SME for PI Historian across enterprise infrastructure",
    "PI Asset Framework templates, Analyses, PI Vision displays",
    "Cross-functional collaboration with manufacturing, automation, IT",
    "Regulatory compliance, system validation & change management"
];

export function About() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 80%", "end 50%"],
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section id="about" className="py-24 bg-navy-light relative border-t border-slate-800" ref={containerRef}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-sans font-bold text-white mb-6 uppercase tracking-wider"
                    >
                        Professional <span className="text-pi-orange">Overview</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-slate-400 font-sans"
                    >
                        Bridging the gap between operational technology (OT) and information technology (IT) with precision-engineered data architectures.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8">

                    {/* Left Column: Career Timeline */}
                    <div className="relative">
                        <h3 className="text-2xl font-sans font-bold text-white mb-10 tracking-wide border-b border-slate-700 pb-4 inline-block">Career Trajectory</h3>

                        {/* The Animated Line */}
                        <div className="absolute left-[21px] top-[100px] bottom-0 w-0.5 bg-slate-800">
                            <motion.div
                                className="absolute top-0 left-0 w-full bg-pi-orange origin-top"
                                style={{ height: lineHeight }}
                            />
                        </div>

                        <div className="space-y-12">
                            {TIMELINE_DATA.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                    className="relative pl-14"
                                >
                                    <div className="absolute left-0 top-1 p-2 bg-navy border-2 border-slate-700 rounded-full z-10 
                                  transition-colors duration-300 hover:border-pi-orange group">
                                        <item.icon className="w-5 h-5 text-slate-400 group-hover:text-pi-orange" />
                                    </div>

                                    <div className="bg-navy p-6 rounded-lg border border-slate-800 shadow-xl hover:border-slate-700 transition-colors">
                                        <span className="text-pi-orange font-mono text-sm tracking-widest font-semibold block mb-2">
                                            {item.period}
                                        </span>
                                        <h4 className="text-xl font-bold font-sans text-white mb-1">{item.role}</h4>
                                        <p className="text-slate-400 font-sans text-sm mb-4">{item.company}</p>
                                        <p className="text-slate-300 font-sans leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Amgen Role Alignment */}
                    <div className="lg:pl-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#0D1B2A] rounded-xl border border-pi-orange/30 p-8 shadow-2xl relative overflow-hidden"
                        >
                            {/* Subtle background glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-pi-orange/5 rounded-full blur-3xl pointer-events-none" />

                            <h3 className="text-2xl font-sans font-bold text-white mb-6 tracking-wide">Strategic Value Proposition</h3>
                            <p className="text-slate-400 mb-8 font-sans leading-relaxed">
                                As an Application Manager, I bring targeted expertise directly aligned with enterprise operational pillars:
                            </p>

                            <ul className="space-y-6">
                                {TARGET_REQUIREMENTS.map((req, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                                        className="flex items-start gap-4 group"
                                    >
                                        <div className="mt-1 bg-navy-light rounded-full p-1 group-hover:bg-pi-orange/10 transition-colors">
                                            <CheckCircle2 className="w-5 h-5 text-pi-orange" />
                                        </div>
                                        <span className="text-slate-300 font-sans leading-relaxed group-hover:text-white transition-colors">
                                            {req}
                                        </span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
}
