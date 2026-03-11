"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export function Contact() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        const formData = new FormData(e.currentTarget);
        const subject = formData.get("subject") as string;
        const msg = formData.get("message") as string;

        const data = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            message: `Subject: ${subject}\n\n${msg}`,
        };

        try {
            const { error } = await supabase
                .from("contact_submissions")
                .insert([data]);

            if (error) throw error;

            setSubmitStatus("success");
            e.currentTarget.reset();
        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
            // Reset status after 5 seconds if success
            if (submitStatus !== "error") {
                setTimeout(() => setSubmitStatus("idle"), 5000);
            }
        }
    };

    return (
        <section id="contact" className="py-24 bg-navy-light relative border-t border-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-3xl md:text-5xl font-sans font-bold text-white mb-6 uppercase tracking-wider"
                        >
                            Initiate <span className="text-pi-orange">Connection</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-lg text-slate-400 font-sans max-w-2xl mx-auto"
                        >
                            Whether discussing potential roles, PI architecture strategies, or custom data integrations—my inbox is open.
                        </motion.p>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="bg-[#0D1B2A] border border-slate-700/50 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden"
                    >
                        {/* Background Accent */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-pi-orange/5 rounded-full blur-3xl pointer-events-none" />

                        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-mono text-slate-400">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full bg-navy border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pi-orange focus:ring-1 focus:ring-pi-orange transition-colors font-sans"
                                        placeholder="Enter your name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-mono text-slate-400">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full bg-navy border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pi-orange focus:ring-1 focus:ring-pi-orange transition-colors font-sans"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-mono text-slate-400">Subject</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    required
                                    className="w-full bg-navy border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pi-orange focus:ring-1 focus:ring-pi-orange transition-colors font-sans"
                                    placeholder="How can I help you?"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-mono text-slate-400">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows={5}
                                    required
                                    className="w-full bg-navy border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-pi-orange focus:ring-1 focus:ring-pi-orange transition-colors font-sans resize-y"
                                    placeholder="Your message here..."
                                />
                            </div>

                            {/* Status Messages */}
                            {submitStatus === "success" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="flex items-center gap-2 text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-lg"
                                >
                                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                                    <p className="text-sm font-sans">Message securely transmitted. I will respond shortly.</p>
                                </motion.div>
                            )}

                            {submitStatus === "error" && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    className="flex items-center gap-2 text-red-400 bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-lg"
                                >
                                    <AlertCircle className="w-5 h-5 shrink-0" />
                                    <p className="text-sm font-sans">Transmission failed. Please verify your connection or try again later.</p>
                                </motion.div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full sm:w-auto px-8 py-4 bg-pi-orange hover:bg-pi-orange-light text-white font-sans font-semibold rounded-md transition-colors flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Transmitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        Send Message
                                    </>
                                )}
                            </button>

                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
