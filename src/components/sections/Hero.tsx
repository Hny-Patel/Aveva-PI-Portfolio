"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Database, Download } from "lucide-react";

// Typing Animation Sub-component
const TITLES = [
    "PI Data Historian Architect",
    "AVEVA Certified Engineer",
    "Real-Time Industrial Data Specialist"
];

function TypingAnimation() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % TITLES.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-24 sm:h-24 md:h-28 lg:h-32 overflow-hidden flex justify-center items-center relative w-full mb-8">
            <AnimatePresence mode="popLayout">
                <motion.div
                    key={index}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center justify-center text-xl sm:text-3xl lg:text-4xl font-sans font-medium text-slate-300 text-center w-full px-4 leading-tight sm:leading-snug"
                >
                    {TITLES[index]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

// Canvas Component
function NetworkCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        let animationFrameId: number;

        // Set canvas dimensions
        const resizeCanvas = () => {
            canvas!.width = window.innerWidth;
            canvas!.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Colors
        const SERVER_COLOR = "#D4521A";
        const TAG_COLOR = "#00B4D8";
        const BG_COLOR = "#0D1B2A";

        class Node {
            x: number;
            y: number;
            radius: number;
            vx: number;
            vy: number;
            color: string;
            isServer: boolean;

            constructor(isServer = false) {
                this.isServer = isServer;
                this.radius = isServer ? 10 : Math.random() * 2 + 1.5;

                if (isServer) {
                    this.x = canvas!.width / 2;
                    this.y = canvas!.height / 2;
                    this.vx = 0;
                    this.vy = 0;
                    this.color = SERVER_COLOR;
                } else {
                    this.x = Math.random() * canvas!.width;
                    this.y = Math.random() * canvas!.height;
                    // Slowly drift tags
                    this.vx = (Math.random() - 0.5) * 0.3;
                    this.vy = (Math.random() - 0.5) * 0.3;
                    this.color = TAG_COLOR;
                }
            }

            update(width: number, height: number) {
                if (!this.isServer) {
                    this.x += this.vx;
                    this.y += this.vy;

                    if (this.x < 0 || this.x > width) this.vx *= -1;
                    if (this.y < 0 || this.y > height) this.vy *= -1;
                } else {
                    // Keep server node moving slightly or just centered
                    this.x = width / 2;
                    this.y = height / 2;
                }
            }

            draw(ctx: CanvasRenderingContext2D) {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fillStyle = this.color;

                if (this.isServer) {
                    ctx.shadowBlur = 30;
                    ctx.shadowColor = SERVER_COLOR;
                } else {
                    ctx.shadowBlur = 10;
                    ctx.shadowColor = TAG_COLOR;
                }

                ctx.fill();
                ctx.shadowBlur = 0;
            }
        }

        const PADDING = 100;
        const nodes: Node[] = [];
        const NUM_TAGS = Math.min(Math.round(window.innerWidth / 15), 60);

        // High fidelity PI Server node
        const serverNode = new Node(true);
        nodes.push(serverNode);

        // Tags
        for (let i = 0; i < NUM_TAGS; i++) {
            nodes.push(new Node(false));
        }

        // Packet Simulation
        interface Packet {
            from: Node;
            to: Node;
            progress: number;
            speed: number;
        }
        const packets: Packet[] = [];

        const drawLinesAndPackets = () => {
            // Connect each tag to the central server
            for (let i = 1; i < nodes.length; i++) {
                const tag = nodes[i];
                const dx = serverNode.x - tag.x;
                const dy = serverNode.y - tag.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Define dynamic connection radius based on screen size
                const connectionRadius = canvas!.width < 768 ? 250 : 450;

                if (dist < connectionRadius) {
                    // Draw Line
                    ctx.beginPath();
                    ctx.moveTo(tag.x, tag.y);
                    ctx.lineTo(serverNode.x, serverNode.y);

                    const opacity = 1 - (dist / connectionRadius);
                    // Teal lines fading out
                    ctx.strokeStyle = `rgba(0, 180, 216, ${opacity * 0.3})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();

                    // Spawn packet occasionally (simulate data flow)
                    if (Math.random() < 0.005) {
                        packets.push({
                            from: tag,
                            to: serverNode,
                            progress: 0,
                            speed: 0.01 + Math.random() * 0.015
                        });
                    }
                }
            }

            // Render packets
            for (let i = packets.length - 1; i >= 0; i--) {
                const p = packets[i];
                p.progress += p.speed;

                if (p.progress >= 1) {
                    packets.splice(i, 1);
                    continue;
                }

                const x = p.from.x + (p.to.x - p.from.x) * p.progress;
                const y = p.from.y + (p.to.y - p.from.y) * p.progress;

                ctx.beginPath();
                ctx.arc(x, y, 2, 0, Math.PI * 2);
                ctx.fillStyle = "#fff";
                ctx.shadowBlur = 8;
                ctx.shadowColor = "#D4521A";
                ctx.fill();
                ctx.shadowBlur = 0;
            }
        };

        const animate = () => {
            // Fill background
            ctx.fillStyle = BG_COLOR;
            ctx.fillRect(0, 0, canvas!.width, canvas!.height);

            // Update and Draw
            nodes.forEach(node => {
                node.update(canvas!.width, canvas!.height);
                node.draw(ctx);
            });

            drawLinesAndPackets();

            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}

export function Hero() {
    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const href = e.currentTarget.getAttribute('href');
        if (href?.startsWith('#')) {
            const targetId = href.substring(1);
            const elem = document.getElementById(targetId);
            if (elem) {
                elem.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    const handleResumeDownload = () => {
        // In a real scenario, this would link to an actual PDF in the public folder.
        window.open('/hiren_patel_resume.pdf', '_blank');
    };

    return (
        <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden bg-navy">
            {/* Background Animation */}
            <NetworkCanvas />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center justify-center min-h-[75vh]">
                <div className="max-w-4xl mx-auto text-center mt-auto">

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="flex items-center justify-center gap-3 mb-6"
                    >
                        <div className="bg-navy-light/80 border border-navy-light px-4 py-1.5 rounded-full flex items-center gap-2">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pi-orange opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-pi-orange"></span>
                            </span>
                            <span className="text-xs sm:text-sm font-mono tracking-wide text-slate-300">Target: Sr. Manufacturing Systems Engineer</span>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-sans font-bold text-white mb-6 tracking-tight"
                    >
                        Hiren Patel
                    </motion.h1>

                    {/* Typing Title Animation */}
                    <TypingAnimation />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                    >
                        <a
                            href="#projects"
                            onClick={handleScroll}
                            className="w-full sm:w-auto px-8 py-4 bg-pi-orange hover:bg-pi-orange-light text-white font-sans font-semibold rounded-md transition-colors flex items-center justify-center gap-2 group shadow-lg shadow-pi-orange/20"
                        >
                            <Database className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                            View Projects
                        </a>

                        <button
                            onClick={handleResumeDownload}
                            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-slate-800 border-2 border-slate-600 hover:border-slate-400 text-white font-sans font-semibold rounded-md transition-all flex items-center justify-center gap-2 group"
                        >
                            <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                            Download Resume
                        </button>
                    </motion.div>
                </div>

                {/* Quick Stats Row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8 md:gap-12 mt-12 mb-auto pb-12 opacity-80"
                >
                    <div className="flex flex-col items-center">
                        <span className="text-2xl sm:text-3xl font-mono text-pi-orange font-bold">30+</span>
                        <span className="text-xs sm:text-sm font-sans text-slate-400 uppercase tracking-widest mt-1">Dashboards Deployed</span>
                    </div>

                    <div className="hidden md:block w-px h-12 bg-slate-700" />

                    <div className="flex flex-col items-center">
                        <span className="text-2xl sm:text-3xl font-mono text-pi-orange font-bold">3</span>
                        <span className="text-xs sm:text-sm font-sans text-slate-400 uppercase tracking-widest mt-1">Manufacturing Plants</span>
                    </div>

                    <div className="hidden md:block w-px h-12 bg-slate-700" />

                    <div className="flex flex-col items-center">
                        <span className="text-2xl sm:text-3xl font-mono text-pi-orange font-bold">5+</span>
                        <span className="text-xs sm:text-sm font-sans text-slate-400 uppercase tracking-widest mt-1">AVEVA Certifications</span>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                        className="text-pi-orange/80"
                    >
                        <ArrowDown className="w-6 h-6" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
