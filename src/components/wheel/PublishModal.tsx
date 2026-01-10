"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Upload, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { checkProfanity } from "@/lib/moderation";
import { supabase } from "@/lib/supabase";
import { Wheel } from "@/lib/types";
import { COMMUNITY_CATEGORIES } from "@/lib/constants";

interface PublishModalProps {
    isOpen: boolean;
    onClose: () => void;
    wheel: Wheel;
}

export function PublishModal({ isOpen, onClose, wheel }: PublishModalProps) {
    const [category, setCategory] = useState(COMMUNITY_CATEGORIES[0].id);
    const [title, setTitle] = useState(wheel.title);
    const [description, setDescription] = useState("");
    const [isPublishing, setIsPublishing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handlePublish = async () => {
        setIsPublishing(true);
        setError(null);

        // 1. Moderation Check
        // 1. Moderation Check
        const allText = title + " " + description + " " + wheel.segments.map(s => s.text).join(" ");
        if (checkProfanity(allText)) {
            setError("Wheel contains inappropriate content (English profanity filter).");
            setIsPublishing(false);
            return;
        }

        // 2. Publish to DB
        try {
            // First, update the title in the original wheels table if it changed
            if (title !== wheel.title) {
                const { error: updateError } = await supabase
                    .from("wheels")
                    .update({ title: title })
                    .eq("id", wheel.id);

                if (updateError) throw updateError;
            }

            const { error: dbError } = await supabase
                .from("community_shares")
                .insert({
                    wheel_id: wheel.id,
                    category: category,
                    description: description.trim() || null,
                    reports: 0,
                    spins: 0,
                    is_hidden: false
                });

            if (dbError) {
                // Check for duplicate key aka already published
                if (dbError.code === "23505") {
                    setError("This wheel is already published!");
                } else {
                    throw dbError;
                }
            } else {
                setSuccess(true);
            }
        } catch (err: any) {
            console.error(err);
            setError(err.message || "Failed to publish. Try again later.");
        } finally {
            setIsPublishing(false);
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            >
                <div onClick={onClose} className="absolute inset-0" />

                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    className="relative w-full max-w-md bg-slate-900 border border-white/10 p-6 rounded-3xl shadow-2xl overflow-hidden"
                >
                    {/* Background Glow */}
                    <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-indigo-500/10 blur-[100px] pointer-events-none" />

                    {success ? (
                        <div className="text-center py-8 relative z-10">
                            <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Check size={32} strokeWidth={3} />
                            </div>
                            <h2 className="text-2xl font-black text-white mb-2">Published!</h2>
                            <p className="text-zinc-400 mb-6">Your wheel is now live in the Community Library.</p>
                            <button
                                onClick={onClose}
                                className="w-full py-3 bg-white text-black rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all"
                            >
                                Close
                            </button>
                        </div>
                    ) : (
                        <div className="relative z-10 space-y-6">
                            <div className="text-center">
                                <h2 className="text-2xl font-black text-white mb-2">Publish to Community</h2>
                                <p className="text-zinc-400 text-sm mb-6">
                                    Share your wheel with the world. Anyone can find and spin it.
                                </p>
                            </div>

                            {/* Title Input */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Wheel Title</label>
                                <input
                                    type="text"
                                    className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-lg font-bold text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-colors"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Give it a catchy name..."
                                />
                            </div>

                            {/* Category Selection */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Select Category</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {COMMUNITY_CATEGORIES.map(cat => (
                                        <button
                                            key={cat.id}
                                            onClick={() => setCategory(cat.id)}
                                            className={cn(
                                                "p-3 rounded-xl text-sm font-medium transition-all text-left border",
                                                category === cat.id
                                                    ? "bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                                                    : "bg-white/5 border-white/5 text-zinc-400 hover:bg-white/10"
                                            )}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Optional Description */}
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Description (Optional)</label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/5 rounded-xl p-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-indigo-500/50 transition-colors resize-none h-20"
                                    placeholder="Tell people what this wheel is for..."
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    maxLength={150}
                                />
                                <div className="text-right text-[10px] text-zinc-600">{description.length}/150</div>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-200 text-sm">
                                    <AlertCircle size={18} className="shrink-0" />
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    onClick={onClose}
                                    className="flex-1 py-3 bg-white/5 text-white rounded-xl font-bold hover:bg-white/10 transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handlePublish}
                                    disabled={isPublishing}
                                    className="flex-1 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPublishing ? (
                                        "Publishing..."
                                    ) : (
                                        <>
                                            <Upload size={18} />
                                            Publish
                                        </>
                                    )}
                                </button>
                            </div>

                            <p className="text-[10px] text-zinc-600 text-center px-4">
                                Use common sense. Hate speech or explicit offensive terms will be rejected automatically.
                            </p>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
