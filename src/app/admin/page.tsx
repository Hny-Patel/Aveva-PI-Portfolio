"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Inbox, RefreshCw, Mail, User, MessageSquare, Calendar, LogOut, ChevronDown, ChevronUp } from "lucide-react";

const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || "hiren2024";

interface Submission {
    id: string;
    name: string;
    email: string;
    message: string;
    created_at: string;
}

function formatDate(iso: string) {
    return new Date(iso).toLocaleString("en-IN", {
        day: "2-digit", month: "short", year: "numeric",
        hour: "2-digit", minute: "2-digit",
    });
}

export default function AdminPage() {
    const [pin, setPin] = useState("");
    const [authenticated, setAuthenticated] = useState(false);
    const [pinError, setPinError] = useState(false);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState<string | null>(null);
    const [expandedId, setExpandedId] = useState<string | null>(null);

    const fetchSubmissions = useCallback(async () => {
        setLoading(true);
        setFetchError(null);
        try {
            const res = await fetch("/api/admin/contacts", {
                headers: { "x-admin-pin": ADMIN_PIN },
            });
            const json = await res.json();
            if (!res.ok) {
                throw new Error(json.error || `HTTP ${res.status}`);
            }
            setSubmissions(json.data || []);
        } catch (err: unknown) {
            const msg = err instanceof Error ? err.message : "Unknown error";
            setFetchError(msg);
            console.error("Failed to fetch:", msg);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (pin === ADMIN_PIN) {
            setAuthenticated(true);
            sessionStorage.setItem("admin_auth", "1");
        } else {
            setPinError(true);
            setPin("");
            setTimeout(() => setPinError(false), 2000);
        }
    };

    const handleLogout = () => {
        setAuthenticated(false);
        sessionStorage.removeItem("admin_auth");
        setPin("");
    };

    useEffect(() => {
        if (sessionStorage.getItem("admin_auth") === "1") {
            setAuthenticated(true);
        }
    }, []);

    useEffect(() => {
        if (authenticated) fetchSubmissions();
    }, [authenticated, fetchSubmissions]);

    // ─── LOGIN SCREEN ─────────────────────────────────────────────────────────
    if (!authenticated) {
        return (
            <div className="min-h-screen bg-navy flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-navy-light border border-slate-700 rounded-2xl p-8 w-full max-w-sm shadow-2xl"
                >
                    <div className="flex flex-col items-center mb-8">
                        <div className="w-14 h-14 rounded-full bg-pi-orange/20 border border-pi-orange flex items-center justify-center mb-4">
                            <Lock className="w-6 h-6 text-pi-orange" />
                        </div>
                        <h1 className="text-2xl font-sans font-bold text-white">Admin Inbox</h1>
                        <p className="text-slate-400 text-sm mt-1 font-mono">Enter your PIN to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            placeholder="Enter PIN"
                            autoFocus
                            className={`w-full bg-navy border rounded-lg px-4 py-3 text-white text-center font-mono text-xl tracking-widest focus:outline-none transition-colors ${pinError
                                ? "border-red-500 focus:border-red-500"
                                : "border-slate-700 focus:border-pi-orange"
                                }`}
                        />
                        <AnimatePresence>
                            {pinError && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="text-red-400 text-sm text-center font-mono"
                                >
                                    Incorrect PIN. Try again.
                                </motion.p>
                            )}
                        </AnimatePresence>
                        <button
                            type="submit"
                            className="w-full py-3 bg-pi-orange hover:bg-pi-orange-light text-white font-sans font-semibold rounded-lg transition-colors"
                        >
                            Unlock
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    // ─── INBOX SCREEN ─────────────────────────────────────────────────────────
    const unreadCount = submissions.length;

    return (
        <div className="min-h-screen bg-navy">
            <div className="border-b border-slate-800 bg-navy-light sticky top-0 z-10">
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Inbox className="w-5 h-5 text-pi-orange" />
                        <h1 className="font-sans font-bold text-white">Contact Inbox</h1>
                        {unreadCount > 0 && (
                            <span className="bg-pi-orange text-white text-xs font-mono px-2 py-0.5 rounded-full">
                                {unreadCount}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={fetchSubmissions}
                            disabled={loading}
                            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm font-mono transition-colors"
                        >
                            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                            Refresh
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 text-slate-500 hover:text-red-400 text-sm font-mono transition-colors"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 py-8">
                {loading && submissions.length === 0 ? (
                    <div className="flex flex-col items-center py-24 text-slate-600">
                        <RefreshCw className="w-8 h-8 animate-spin mb-4" />
                        <p className="font-mono text-sm">Loading messages...</p>
                    </div>
                ) : fetchError ? (
                    <div className="flex flex-col items-center py-24 text-red-400">
                        <Inbox className="w-10 h-10 mb-4 opacity-40" />
                        <p className="font-mono text-sm font-bold mb-2">Failed to load messages</p>
                        <p className="font-mono text-xs text-slate-500 max-w-sm text-center">{fetchError}</p>
                        <button onClick={fetchSubmissions} className="mt-4 text-xs font-mono text-pi-orange hover:underline">Try again</button>
                    </div>
                ) : submissions.length === 0 ? (
                    <div className="flex flex-col items-center py-24 text-slate-600">
                        <Inbox className="w-12 h-12 mb-4 opacity-30" />
                        <p className="font-mono text-sm">No messages yet.</p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {submissions.map((s, i) => {
                            const isExpanded = expandedId === s.id;
                            const lines = s.message?.split("\n") ?? [];
                            const subjectLine = lines.find(l => l.startsWith("Subject:"))?.replace("Subject:", "").trim() || "No subject";
                            const bodyLines = lines.filter(l => !l.startsWith("Subject:") && l.trim() !== "");

                            return (
                                <motion.div
                                    key={s.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className={`bg-navy-light border rounded-xl overflow-hidden transition-colors cursor-pointer ${isExpanded ? "border-pi-orange/40" : "border-slate-800 hover:border-slate-600"
                                        }`}
                                    onClick={() => setExpandedId(isExpanded ? null : s.id)}
                                >
                                    {/* Header Row */}
                                    <div className="px-6 py-4 flex items-center gap-4">
                                        <div className="w-9 h-9 rounded-full bg-navy border border-slate-700 flex items-center justify-center shrink-0">
                                            <User className="w-4 h-4 text-slate-400" />
                                        </div>
                                        <div className="flex-grow min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className="text-white font-sans font-semibold truncate">{s.name}</span>
                                                <span className="text-slate-600 text-xs font-mono hidden sm:block">&lt;{s.email}&gt;</span>
                                            </div>
                                            <p className="text-slate-400 text-sm truncate font-sans">{subjectLine}</p>
                                        </div>
                                        <div className="flex items-center gap-3 shrink-0">
                                            <div className="flex items-center gap-1.5 text-slate-600 text-xs font-mono">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span className="hidden sm:block">{formatDate(s.created_at)}</span>
                                            </div>
                                            {isExpanded ? (
                                                <ChevronUp className="w-4 h-4 text-pi-orange" />
                                            ) : (
                                                <ChevronDown className="w-4 h-4 text-slate-500" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Expanded Body */}
                                    <AnimatePresence>
                                        {isExpanded && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.25 }}
                                                className="overflow-hidden border-t border-slate-800"
                                            >
                                                <div className="px-6 py-5 space-y-4 bg-navy/60">
                                                    <div className="flex flex-wrap gap-4 text-sm font-mono text-slate-400">
                                                        <span className="flex items-center gap-2">
                                                            <Mail className="w-3.5 h-3.5 text-pi-orange" />
                                                            <a href={`mailto:${s.email}`} className="text-pi-orange hover:underline">{s.email}</a>
                                                        </span>
                                                        <span className="flex items-center gap-2">
                                                            <MessageSquare className="w-3.5 h-3.5" />
                                                            Subject: <strong className="text-slate-200">{subjectLine}</strong>
                                                        </span>
                                                        <span className="flex items-center gap-2">
                                                            <Calendar className="w-3.5 h-3.5" />
                                                            {formatDate(s.created_at)}
                                                        </span>
                                                    </div>
                                                    <div className="bg-navy rounded-lg border border-slate-800 p-4">
                                                        {bodyLines.map((line, li) => (
                                                            <p key={li} className="text-slate-300 font-sans leading-relaxed">{line}</p>
                                                        ))}
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
