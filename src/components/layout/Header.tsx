"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
    { href: "#about", label: "About" },
    { href: "#skills", label: "Skills" },
    { href: "#projects", label: "Projects" },
    { href: "#metrics", label: "Metrics" },
    { href: "#certifications", label: "Certifications" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        const href = e.currentTarget.getAttribute('href');
        if (href?.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const elem = document.getElementById(targetId);
            if (elem) {
                elem.scrollIntoView({ behavior: 'smooth' });
                setMobileMenuOpen(false);
            }
        }
    };

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled
                    ? "bg-navy/80 backdrop-blur-md shadow-md py-4"
                    : "bg-transparent py-6"
            )}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    <Link href="/" className="group" onClick={() => setMobileMenuOpen(false)}>
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-bold font-sans text-slate-100 group-hover:text-pi-orange transition-colors duration-300">
                                HP.
                            </span>
                            <span className="hidden sm:inline-block text-sm font-mono text-slate-400 group-hover:text-slate-300 transition-colors duration-300">
                // System.PI
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8 text-sm font-sans font-medium">
                        {NAV_LINKS.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                onClick={handleSmoothScroll}
                                className="text-slate-300 hover:text-pi-orange transition-colors"
                                aria-label={`Navigate to ${link.label} section`}
                            >
                                {link.label}
                            </a>
                        ))}
                        <a
                            href="#contact"
                            onClick={handleSmoothScroll}
                            className="bg-pi-orange hover:bg-pi-orange-light text-white px-5 py-2.5 rounded transition-colors font-semibold"
                            aria-label="Navigate to contact section"
                        >
                            Get In Touch
                        </a>
                    </nav>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden text-slate-300 hover:text-white w-12 h-12 flex items-center justify-center -mr-3"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle mobile menu"
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 p-4 bg-navy/95 backdrop-blur-xl shadow-xl border-b border-navy-light md:hidden"
                    >
                        <nav className="flex flex-col gap-4">
                            {NAV_LINKS.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    onClick={handleSmoothScroll}
                                    className="block px-4 py-2 text-slate-300 hover:text-pi-orange hover:bg-navy-light rounded"
                                    aria-label={`Navigate to ${link.label} section`}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#contact"
                                onClick={handleSmoothScroll}
                                className="block px-4 py-3 mt-2 text-center bg-pi-orange hover:bg-pi-orange-light text-white rounded font-semibold"
                                aria-label="Navigate to contact section"
                            >
                                Get In Touch
                            </a>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
