"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Database,
    Activity,
    GitBranch,
    LayoutDashboard,
    Terminal,
    Cloud,
    Binary,
    Network,
    Code2,
    LineChart
} from "lucide-react";

const PI_ECOSYSTEM = [
    {
        name: "PI Interface / Connectors",
        icon: Network,
        description: "Reliable data collection from diverse OT protocols (OPC DA/UA, Modbus, RDBMS) ensuring high-fidelity data ingress.",
        color: "from-blue-500/20 to-cyan-500/20",
        border: "group-hover:border-cyan-500/50"
    },
    {
        name: "PI Data Archive",
        icon: Database,
        description: "High-performance time-series data storage. Expertise in tag configuration, snapshot/archive subsystems, and system health.",
        color: "from-pi-orange/20 to-red-500/20",
        border: "group-hover:border-pi-orange/50"
    },
    {
        name: "PI Asset Framework (AF)",
        icon: GitBranch,
        description: "Contextualizing raw data into hierarchical asset models. Advanced template design, event frames, and real-time analyses.",
        color: "from-emerald-500/20 to-green-500/20",
        border: "group-hover:border-emerald-500/50"
    },
    {
        name: "PI Vision",
        icon: LayoutDashboard,
        description: "Web-based visualization. Building dynamic, self-configuring dashboards for unified manufacturing intelligence.",
        color: "from-purple-500/20 to-pink-500/20",
        border: "group-hover:border-purple-500/50"
    }
];

const ADDITIONAL_SKILLS = [
    { name: "Python", icon: Terminal },
    { name: "Power BI", icon: LineChart },
    { name: "GCP", icon: Cloud },
    { name: "AWS", icon: Cloud },
    { name: "Data Science", icon: Binary },
    { name: "Streamlit", icon: Code2 },
];

export function Skills() {
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    return (
        <section id="skills" className="py-24 bg-navy relative border-t border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-16 text-center max-w-3xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-5xl font-sans font-bold text-white mb-6 uppercase tracking-wider"
                    >
                        Core <span className="text-pi-orange">Ecosystem</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-slate-400 font-sans"
                    >
                        End-to-end mastery of the AVEVA PI System, from edge data collection to enterprise-level visualization and analytics.
                    </motion.p>
                </div>

                {/* PI Ecosystem Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                    {PI_ECOSYSTEM.map((item, index) => (
                        <motion.div
                            key={item.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredCard(index)}
                            onMouseLeave={() => setHoveredCard(null)}
                            className={`group relative bg-navy-light rounded-xl border border-slate-700/50 p-6 
                        transition-all duration-300 hover:-translate-y-2 cursor-pointer ${item.border}`}
                        >
                            {/* Subtle background gradient on hover */}
                            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="bg-[#0D1B2A] w-12 h-12 rounded-lg flex items-center justify-center mb-6 border border-slate-700 group-hover:border-slate-500 transition-colors">
                                    <item.icon className="w-6 h-6 text-slate-300 group-hover:text-white transition-colors" />
                                </div>

                                <h3 className="text-xl font-bold font-sans text-white mb-2">{item.name}</h3>

                                {/* Tooltip-like expansion on hover (desktop) or always visible (mobile) */}
                                <div className="mt-auto pt-4 relative">
                                    <p className="text-slate-400 font-sans text-sm md:opacity-0 md:h-0 md:group-hover:opacity-100 md:group-hover:h-auto transition-all duration-300 overflow-hidden relative inline-block">
                                        {item.description}
                                    </p>

                                    {/* Plus icon indicating interactivity on desktop */}
                                    <div className="absolute top-0 right-0 md:group-hover:opacity-0 transition-opacity text-pi-orange/70">
                                        <span className="hidden md:block font-mono text-xl">+</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Languages & Tools */}
                <motion.div
                    initial={{ opacity: 0, filter: "blur(10px)" }}
                    whileInView={{ opacity: 1, filter: "blur(0px)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="border border-slate-800 rounded-2xl p-8 bg-gradient-to-b from-navy-light to-navy"
                >
                    <div className="text-center mb-8">
                        <h3 className="text-xl font-sans font-bold text-white mb-2">Modern Technology Stack</h3>
                        <p className="text-sm text-slate-400">Extending PI capabilities through advanced analytics and cloud integration.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {ADDITIONAL_SKILLS.map((skill, index) => (
                            <motion.div
                                key={skill.name}
                                whileHover={{ scale: 1.05 }}
                                className="flex items-center gap-2 bg-[#0D1B2A] border border-slate-700 hover:border-pi-orange/50 px-5 py-3 rounded-lg text-slate-300 hover:text-white transition-colors cursor-default"
                            >
                                <skill.icon className="w-4 h-4 text-pi-orange" />
                                <span className="font-mono text-sm">{skill.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
