"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Verified, Database, TrendingUp, Briefcase, Settings, BrainCircuit, Globe, PieChart, Terminal, Code2 } from "lucide-react";

const SECONDARY_CERTS = [
    {
        title: "Predictive Analytics 2022 R2 Administration",
        issuer: "AVEVA™",
        icon: TrendingUp
    },
    {
        title: "CSI AVEVA PI Installation Specialist Exam",
        issuer: "AVEVA™",
        icon: Settings
    },
    {
        title: "Complete Data Science and Machine Learning",
        issuer: "GFG (GeeksforGeeks)",
        icon: BrainCircuit
    },
    {
        title: "Data Analytics",
        issuer: "Meta",
        icon: Verified
    },
    {
        title: "Data Analytics with SQL",
        issuer: "Meta",
        icon: Database
    },
    {
        title: "Geoprocessing Using Python",
        issuer: "ISRO",
        icon: Globe
    },
    {
        title: "Data Analytics Internship",
        issuer: "KPMG",
        icon: Briefcase
    },
    {
        title: "Power BI Certification",
        issuer: "Codebasics",
        icon: PieChart
    },
    {
        title: "Python Verification",
        issuer: "HackerRank",
        icon: Terminal
    },
    {
        title: "Java Verification",
        issuer: "HackerRank",
        icon: Code2
    }
];

export function Certifications() {
    return (
        <section id="certifications" className="py-24 bg-navy relative border-t border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-sans font-bold text-white mb-6 uppercase tracking-wider"
                    >
                        Industry <span className="text-pi-orange">Compliance</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-slate-400 font-sans"
                    >
                        Validated expertise for strictly regulated manufacturing environments.
                    </motion.p>
                </div>

                <div className="max-w-5xl mx-auto">
                    {/* Featured AVEVA Certification */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative bg-gradient-to-r from-navy-light to-[#0D1B2A] rounded-2xl border-2 border-pi-orange/40 overflow-hidden mb-10 shadow-[0_0_30px_rgba(212,82,26,0.15)] group"
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

                        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10">
                            <div className="shrink-0 relative">
                                <div className="w-24 h-24 rounded-full bg-pi-orange/20 border border-pi-orange flex items-center justify-center shadow-[0_0_15px_rgba(212,82,26,0.4)]">
                                    <ShieldCheck className="w-12 h-12 text-pi-orange" />
                                </div>
                                <motion.div
                                    initial={{ rotate: 0 }}
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-0 border-2 border-dashed border-pi-orange/40 rounded-full"
                                />
                            </div>

                            <div className="text-center md:text-left flex-grow">
                                <div className="inline-block px-3 py-1 bg-pi-orange/10 border border-pi-orange/30 text-pi-orange font-mono text-xs font-bold uppercase tracking-widest rounded-full mb-4">
                                    Core Credential
                                </div>
                                <h3 className="text-2xl md:text-4xl font-sans font-bold text-white mb-2">
                                    AVEVA CSI PI Infrastructure Specialist
                                </h3>
                                <p className="text-slate-400 font-sans text-lg">
                                    Certified expert in designing, deploying, and maintaining highly available PI System architectures.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Secondary Certifications Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {SECONDARY_CERTS.map((cert, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: (index % 4) * 0.1 }}
                                className="bg-[#0D1B2A] border border-slate-800 flex flex-col rounded-xl p-6 hover:border-slate-600 hover:bg-navy-light transition-colors group cursor-default"
                            >
                                <div className="w-10 h-10 shrink-0 rounded bg-navy border border-slate-700 flex items-center justify-center mb-4 group-hover:border-pi-orange/50 transition-colors">
                                    <cert.icon className="w-5 h-5 text-slate-400 group-hover:text-pi-orange transition-colors" />
                                </div>
                                <h4 className="text-white font-sans font-bold mb-2 leading-snug flex-grow">{cert.title}</h4>
                                <p className="text-slate-500 font-mono text-xs uppercase tracking-wider">{cert.issuer}</p>
                            </motion.div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
}
