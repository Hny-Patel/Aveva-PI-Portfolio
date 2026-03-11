"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutDashboard, Cable, FileClock, ChevronDown, CheckCircle2, ChevronUp, Network } from "lucide-react";

const PROJECTS = [
    {
        id: "petronet",
        title: "Petronet LNG Real-Time Data Monitoring Platform",
        location: "Delhi, Kochi, Dahej",
        challenge: "Manual data exchange via phone calls and Excel between Dahej (Gujarat), Kochi (Kerala), and Corporate Delhi office.",
        solution: "Deployed a centralized PI Server at Delhi corporate with remote PI Interfaces at Dahej & Kochi, establishing dedicated networking infrastructure for secure, high-speed real-time data flow.",
        metrics: [
            "30+ interactive live dashboards",
            "2 major plant integrations",
            "Real-time KPIs for storage tanks, pumps, BOG compressors, STVs, SCVs, and process flows"
        ],
        tags: ["PI Interface", "PI Data Archive", "PI Vision", "Enterprise Architecture"],
        icon: LayoutDashboard,
        colorText: "text-pi-orange",
        colorBg: "bg-pi-orange/10",
        colorBorder: "border-pi-orange/20",
    },
    {
        id: "iocl",
        title: "IOCL Pipeline Noida (CPIMS Integration)",
        location: "Noida",
        challenge: "Existing CPIMS pipeline systems archived data via Grafana but completely lacked integration with newer CGD and EMS plant facilities.",
        solution: "Architected the AVEVA PI OPC UA Connector v2 for secure ingestion of new plant data. Deployed PI Vision alongside existing Grafana dashboards, executed a complete AF hierarchy redesign, and managed licensing updates.",
        metrics: [
            "4 unified interactive dashboards across systems",
            "3 automated operational reports",
            "Seamless OPC UA payload transitions"
        ],
        tags: ["OPC UA Connector v2", "PI Vision", "Asset Framework", "System Migration"],
        icon: Cable,
        colorText: "text-blue-500",
        colorBg: "bg-blue-500/10",
        colorBorder: "border-blue-500/20",
    },
    {
        id: "gail",
        title: "GAIL Digital Logbook (XStudio)",
        location: "India",
        challenge: "Operators relied on manual, paper-based asset logging in control rooms, leading to data inaccuracies and completely lacking real-time constraint validation.",
        solution: "Engineered a robust digital logging solution mandating GPS-based logsheet access (ensuring on-site presence). Built real-time text field validation (highlighting out-of-range values in red), centralized server dashboards, and automated daily email reports.",
        metrics: [
            "Eliminated manual paper entries",
            "Automated shift handovers & compliance",
            "Enforced GPS-authenticated physical presence checks"
        ],
        tags: ["Digital Transformation", "Real-Time Validation", "Operational Excellence"],
        icon: FileClock,
        colorText: "text-emerald-500",
        colorBg: "bg-emerald-500/10",
        colorBorder: "border-emerald-500/20",
    }
];

export function Projects() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        setExpandedId(prev => (prev === id ? null : id));
    };

    return (
        <section id="projects" className="py-24 bg-navy-light relative border-t border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-16 md:flex md:items-end md:justify-between max-w-5xl mx-auto">
                    <div className="max-w-2xl">
                        <motion.h2
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl md:text-5xl font-sans font-bold text-white mb-6 uppercase tracking-wider"
                        >
                            Case <span className="text-pi-orange">Studies</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-lg text-slate-400 font-sans"
                        >
                            Deep dive into large-scale integrations and architectural deployments across India&apos;s critical energy sector.
                        </motion.p>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto space-y-8">
                    {PROJECTS.map((project, index) => {
                        const isExpanded = expandedId === project.id;
                        return (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`bg-[#0D1B2A] border ${isExpanded ? 'border-pi-orange/50' : 'border-slate-800'} rounded-2xl overflow-hidden transition-colors duration-300`}
                            >
                                {/* Header / Collapsed State */}
                                <div
                                    className="p-6 md:p-8 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-slate-800/30 transition-colors"
                                    onClick={() => toggleExpand(project.id)}
                                >
                                    <div className="flex items-start md:items-center gap-6">
                                        <div className={`shrink-0 p-4 rounded-xl bg-navy-light border border-slate-700 ${project.colorText}`}>
                                            <project.icon className="w-8 h-8" />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl md:text-3xl font-bold font-sans text-white mb-2 group-hover:text-pi-orange transition-colors">
                                                {project.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-2">
                                                {project.tags.slice(0, 3).map((tag, i) => (
                                                    <span key={i} className={`text-xs font-mono px-2 py-1 rounded-md border text-slate-300 bg-slate-800/50 border-slate-700`}>
                                                        {tag}
                                                    </span>
                                                ))}
                                                {project.tags.length > 3 && (
                                                    <span className={`text-xs font-mono px-2 py-1 rounded-md border text-slate-400 bg-slate-800/50 border-slate-700`}>
                                                        +{project.tags.length - 3}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="shrink-0 self-start md:self-center flex items-center gap-4">
                                        <span className={`text-sm font-semibold font-sans px-4 py-2 rounded-lg border flex items-center gap-2 transition-colors ${isExpanded
                                                ? 'bg-pi-orange text-white border-pi-orange hover:bg-pi-orange-light'
                                                : 'bg-navy-light text-slate-300 border-slate-700 hover:border-slate-500'
                                            }`}>
                                            {isExpanded ? 'Close Case Study' : 'View Case Study'}
                                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                        </span>
                                    </div>
                                </div>

                                {/* Expanded Content State */}
                                <AnimatePresence>
                                    {isExpanded && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="overflow-hidden border-t border-slate-800/50 bg-[#0A1520]/50"
                                        >
                                            <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-12">

                                                {/* Left Column: Text Info */}
                                                <div className="space-y-8">
                                                    <div>
                                                        <h4 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-3">The Challenge</h4>
                                                        <p className="text-slate-300 font-sans leading-relaxed border-l-2 border-slate-700 pl-4">{project.challenge}</p>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-3">The Solution</h4>
                                                        <p className="text-white font-sans leading-relaxed border-l-2 border-pi-orange pl-4 bg-gradient-to-r from-pi-orange/5 to-transparent py-2 rounded-r-lg">{project.solution}</p>
                                                    </div>

                                                    <div>
                                                        <h4 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-4">Key Metrics & Outcomes</h4>
                                                        <ul className="space-y-3">
                                                            {project.metrics.map((metric, i) => (
                                                                <li key={i} className="flex items-start gap-3">
                                                                    <CheckCircle2 className="w-5 h-5 text-pi-orange shrink-0 mt-0.5" />
                                                                    <span className="text-slate-300 font-sans">{metric}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                {/* Right Column: Visual Diagram Placeholder & Tags */}
                                                <div className="flex flex-col">

                                                    {/* Architecture Diagram Placeholder */}
                                                    <div className="w-full flex-grow min-h-[250px] bg-navy border-2 border-dashed border-slate-700 rounded-xl relative overflow-hidden flex items-center justify-center p-6 group">
                                                        <div className="absolute inset-0 bg-gradient-to-br from-pi-orange/5 to-blue-500/5 opacity-50" />

                                                        {/* Schematic Decoration */}
                                                        <div className="absolute inset-0 opacity-10" style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)' }}></div>

                                                        <div className="relative z-10 text-center">
                                                            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-600 group-hover:border-pi-orange/50 transition-colors">
                                                                <Network className={`w-8 h-8 ${project.colorText}`} />
                                                            </div>
                                                            <div className="text-slate-400 font-mono text-sm uppercase tracking-widest">Architecture Schematic</div>
                                                            <div className="text-slate-600 font-sans text-xs mt-2">Visualizing Node Data Flow</div>
                                                        </div>
                                                    </div>

                                                    {/* Full Tags List */}
                                                    <div className="mt-8">
                                                        <h4 className="text-sm font-mono text-slate-500 uppercase tracking-widest mb-3">Applied Technologies</h4>
                                                        <div className="flex flex-wrap gap-2">
                                                            {project.tags.map((tag, i) => (
                                                                <span key={i} className={`text-sm font-mono px-3 py-1.5 rounded-md border font-medium ${project.colorText} ${project.colorBg} ${project.colorBorder}`}>
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                            </motion.div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
