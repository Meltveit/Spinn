"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { Search, Filter, AlertTriangle, MessageSquare, Flag, Play } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";
import { COMMUNITY_CATEGORIES } from "@/lib/constants";

interface CommunityWheel {
    wheel_id: string;
    category: string;
    title: string | null;
    description: string | null;
    reports: number;
    spins: number;
    created_at: string;
    wheels: {
        id: string;
        title: string;
        slug: string;
        segments: any[];
    };
}

const ALL_CATEGORIES = [
    { id: "all", label: "All" },
    ...COMMUNITY_CATEGORIES
];

export function CommunityGrid() {
    const [wheels, setWheels] = useState<CommunityWheel[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState("all");
    const [reportedIds, setReportedIds] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchWheels();
    }, [filter]);

    const fetchWheels = async () => {
        setLoading(true);
        try {
            let query = supabase
                .from("community_shares")
                .select("*, wheels(id, title, slug, segments)")
                .eq("is_hidden", false)
                .order("created_at", { ascending: false });

            if (filter !== "all") {
                query = query.eq("category", filter);
            }

            const { data, error } = await query;
            if (error) throw error;

            // TS check: ensure data shape
            const safeData = (data || []).filter(item => item.wheels) as unknown as CommunityWheel[];
            setWheels(safeData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleReport = async (wheelId: string) => {
        if (reportedIds.has(wheelId)) return;

        if (!confirm("Report this wheel for inappropriate content?")) return;

        try {
            const { error } = await supabase.rpc("report_wheel", { target_id: wheelId });
            if (error) throw error;

            setReportedIds(prev => new Set(prev).add(wheelId));
            alert("Thanks! We will review this.");
        } catch (err) {
            console.error(err);
            alert("Error reporting wheel.");
        }
    };

    return (
        <div className="space-y-8">
            {/* Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
                {ALL_CATEGORIES.map(cat => (
                    <button
                        key={cat.id}
                        onClick={() => setFilter(cat.id)}
                        className={cn(
                            "px-4 py-2 rounded-full text-sm font-bold transition-all border",
                            filter === cat.id
                                ? "bg-white text-black border-white shadow-lg shadow-white/25 scale-105"
                                : "bg-white/5 text-zinc-400 border-white/5 hover:bg-white/10 hover:border-white/20"
                        )}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {/* Grid */}
            {loading ? (
                <div className="flex justify-center p-12">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500" />
                </div>
            ) : wheels.length === 0 ? (
                <div className="text-center py-20 text-zinc-500">
                    <MessageSquare size={48} className="mx-auto mb-4 opacity-50" />
                    <p>No wheels found in this category yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wheels.map((item) => (
                        <div key={item.wheel_id} className="group relative bg-white/5 border border-white/5 rounded-2xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1">
                            <Link href={`/wheel/${item.wheels.id}`} className="block p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-md border border-indigo-500/20">
                                        {ALL_CATEGORIES.find(c => c.id === item.category)?.label || item.category}
                                    </span>
                                    <span className="text-xs text-zinc-500">
                                        {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                                    {item.title || item.wheels.title}
                                </h3>

                                <div className="flex flex-wrap gap-1 mb-6">
                                    {item.wheels.segments.slice(0, 3).map((seg: any, i: number) => (
                                        <span key={i} className="text-[10px] bg-black/30 text-zinc-400 px-2 py-0.5 rounded border border-white/5">
                                            {seg.text}
                                        </span>
                                    ))}
                                    {item.wheels.segments.length > 3 && (
                                        <span className="text-[10px] text-zinc-600 px-1">+{item.wheels.segments.length - 3} more</span>
                                    )}
                                </div>

                                {item.description && (
                                    <p className="text-xs text-zinc-500 line-clamp-2 mb-4">
                                        {item.description}
                                    </p>
                                )}
                            </Link>

                            {/* Actions Footer */}
                            <div className="px-6 py-3 border-t border-white/5 flex justify-between items-center bg-black/20">
                                <span className="text-xs text-zinc-600 flex items-center gap-2">
                                    <span className="flex items-center gap-1 text-indigo-400">
                                        <Play size={10} fill="currentColor" />
                                        <span className="font-bold">{item.spins || 0}</span>
                                    </span>
                                </span>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleReport(item.wheel_id);
                                    }}
                                    disabled={reportedIds.has(item.wheel_id)}
                                    className={cn(
                                        "flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors",
                                        reportedIds.has(item.wheel_id)
                                            ? "text-red-500/50 cursor-not-allowed"
                                            : "text-zinc-600 hover:text-red-400"
                                    )}
                                    title="Report inappropriate content"
                                >
                                    <Flag size={12} />
                                    {reportedIds.has(item.wheel_id) ? "Reported" : "Report"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
