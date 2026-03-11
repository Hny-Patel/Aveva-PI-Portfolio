import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-navy z-10 relative overflow-hidden border-t border-navy-light pt-16 pb-8">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="inline-block mb-4 group">
                            <div className="flex items-center gap-2">
                                <span className="text-2xl font-bold font-sans text-slate-100 group-hover:text-pi-orange transition-colors duration-300">
                                    HP.
                                </span>
                                <span className="text-sm font-mono text-slate-500">
                  // System.PI
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm text-slate-400 max-w-sm mt-4 font-sans leading-relaxed">
                            AVEVA PI Data Historian Specialist & Sr. Manufacturing Systems Engineer.
                            Translating industrial data into actionable enterprise intelligence.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-slate-100 font-sans font-bold mb-6 tracking-wider text-sm uppercase">Quick Links</h4>
                        <ul className="space-y-3 text-sm text-slate-400 font-sans">
                            <li><a href="#about" className="hover:text-pi-orange transition-colors">About</a></li>
                            <li><a href="#projects" className="hover:text-pi-orange transition-colors">Projects</a></li>
                            <li><a href="#metrics" className="hover:text-pi-orange transition-colors">Metrics</a></li>
                            <li><a href="#certifications" className="hover:text-pi-orange transition-colors">Certifications</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-slate-100 font-sans font-bold mb-6 tracking-wider text-sm uppercase">Connect</h4>
                        <div className="flex space-x-5">
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="LinkedIn">
                                <Linkedin size={22} />
                            </a>
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors" aria-label="GitHub">
                                <Github size={22} />
                            </a>
                            <a href="#contact" className="text-slate-400 hover:text-white transition-colors" aria-label="Email Contact Form cursor tracking">
                                <Mail size={22} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-navy-light pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-mono">
                    <p>&copy; {currentYear} Hiren Patel. All rights reserved.</p>
                    <p className="mt-3 md:mt-0 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-pi-orange inline-block animate-pulse" />
                        System Status: Optimal
                    </p>
                </div>
            </div>
        </footer>
    );
}
