"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "@/components/wheel/Spinner";
import { SpinButton } from "@/components/wheel/SpinButton";
import { PublishModal } from "@/components/wheel/PublishModal";
import { Wheel, WheelSegment } from "@/lib/types";
import { supabase } from "@/lib/supabase";

import { Check, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export function SharedWheelView({ wheel, isAlreadyPublished = false }: { wheel: Wheel; isAlreadyPublished?: boolean }) {
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState<WheelSegment | null>(null);
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

    const handleSpinEnd = (winningSegment: WheelSegment) => {
        setWinner(winningSegment);
        triggerConfetti();

        // Fire-and-forget spin count increment
        supabase.rpc("increment_spin_count", { target_id: wheel.id }).then(({ error }) => {
            if (error) console.error("Failed to increment spin count:", error);
        });
    };

    const triggerConfetti = () => {
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-pink-500/30 overflow-x-hidden relative">

            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
            </div>

            <header className="fixed top-0 w-full z-40 bg-black/10 backdrop-blur-lg border-b border-white/5">
                <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/library/community" className="p-2 hover:bg-white/10 rounded-full transition-colors text-zinc-400 hover:text-white">
                            <ArrowLeft size={20} />
                        </Link>
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/logo.png"
                                alt="SpintheQ Logo"
                                width={140}
                                height={40}
                                className="h-10 w-auto object-contain"
                                priority
                            />
                        </Link>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href="/library" className="text-sm font-medium hover:text-indigo-400 transition-colors text-zinc-300">Library</Link>
                        <Link href="/" className="px-6 py-2 bg-white text-black rounded-full font-bold text-xs uppercase hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                            Create Your Own
                        </Link>
                    </div>
                </div>
            </header>

            <main className="pt-24 pb-20 px-4 max-w-4xl mx-auto flex flex-col items-center gap-12 relative z-10">
                <div className="text-center space-y-2 max-w-2xl">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 drop-shadow-sm pb-4">
                        {wheel.title}
                    </h1>
                    <p className="text-zinc-400 text-lg font-medium">
                        {winner ? "We have a winner!" : "Spin to decide!"}
                    </p>
                </div>

                <div className="relative w-full max-w-md">
                    {/* Glow effect behind wheel */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 blur-3xl rounded-full transform scale-110" />

                    <Spinner
                        segments={wheel.segments}
                        isSpinning={isSpinning}
                        setIsSpinning={setIsSpinning}
                        onSpinEnd={handleSpinEnd}
                    />
                </div>

                <SpinButton
                    onClick={() => setIsSpinning(true)}
                    disabled={isSpinning}
                />

                {/* Publish to Community Option - Only show if NOT already published */}
                {!isAlreadyPublished && (
                    <button
                        onClick={() => setIsPublishModalOpen(true)}
                        className="mt-8 text-white/40 text-xs uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group cursor-pointer"
                    >
                        <span className="w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
                        Publish to Community Library
                    </button>
                )}
            </main>

            {/* Winner Modal - Matches Home Page Design */}
            <AnimatePresence>
                {winner && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                        onClick={() => setWinner(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.5, y: 100 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-zinc-900 border border-white/10 p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center relative overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute top-0 left-0 w-full h-2" style={{ backgroundColor: winner.color }} />

                            <h2 className="text-zinc-400 uppercase tracking-widest text-sm font-bold mb-4">The Result Is</h2>
                            <div className="text-5xl font-black text-white mb-8 py-2 drop-shadow-lg">
                                {winner.text}
                            </div>

                            <button
                                onClick={() => setWinner(null)}
                                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-500/25"
                            >
                                Spin Again
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <PublishModal
                isOpen={isPublishModalOpen}
                onClose={() => setIsPublishModalOpen(false)}
                wheel={wheel}
            />
        </div>
    );
}
