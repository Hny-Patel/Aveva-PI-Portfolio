"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

function AnimatedCounter({ from = 0, to, duration = 2.5 }: { from?: number; to: number; duration?: number }) {
    const count = useMotionValue(from);
    const rounded = useTransform(count, (latest) => Math.round(latest));
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (inView) {
            animate(count, to, { duration, ease: "easeOut" });
        }
    }, [count, inView, to, duration]);

    return <motion.span ref={ref}>{rounded}</motion.span>;
}

const METRICS = [
    {
        value: 30,
        suffix: "+",
        label: "Comprehensive Dashboards",
        description: "Developed and delivered for enterprise-wide visibility.",
    },
    {
        value: 3,
        suffix: "",
        label: "Plant Deployments",
        description: "Successful large-scale manufacturing data integrations.",
    },
    {
        value: 2,
        suffix: "+",
        label: "PI Servers Managed",
        description: "Data Archive, AF, and Vision infrastructure.",
    }
];

export function ImpactMetrics() {
    return (
        <section id="metrics" className="py-24 bg-[#0A1520] relative border-t border-slate-800 overflow-hidden">
            {/* Decorative background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1A2E44_1px,transparent_1px),linear-gradient(to_bottom,#1A2E44_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl font-sans font-bold text-white uppercase tracking-wider mb-4"
                    >
                        Engineering <span className="text-pi-orange">Impact</span>
                    </motion.h2>
                    <motion.div
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="h-1 w-24 bg-pi-orange mx-auto rounded-full"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divider-y md:divider-y-0 md:divider-x divider-slate-800">
                    {METRICS.map((metric, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="flex flex-col items-center p-6"
                        >
                            <div className="text-6xl md:text-7xl font-sans font-bold text-pi-orange mb-4 tracking-tighter shadow-pi-orange drop-shadow-lg flex items-center">
                                <AnimatedCounter to={metric.value} />
                                <span className="text-5xl md:text-6xl">{metric.suffix}</span>
                            </div>
                            <h3 className="text-xl font-bold font-sans text-white mb-3 tracking-wide">{metric.label}</h3>
                            <p className="text-slate-400 font-sans max-w-xs">{metric.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
