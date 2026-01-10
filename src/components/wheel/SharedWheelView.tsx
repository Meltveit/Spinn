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

export function SharedWheelView({ wheel }: { wheel: Wheel }) {
    const [isSpinning, setIsSpinning] = useState(false);
    const [winner, setWinner] = useState<WheelSegment | null>(null);
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

    const handleSpinEnd = (winningSegment: WheelSegment) => {
        setWinner(winningSegment);
        triggerConfetti();
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
                    <Link href="/" className="px-6 py-2 bg-white text-black rounded-full font-bold text-xs uppercase hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        Create Your Own
                    </Link>
                </div>
            </header>

            <main className="pt-24 pb-20 px-4 max-w-4xl mx-auto flex flex-col items-center gap-12 relative z-10">
                <div className="text-center space-y-2">
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 drop-shadow-sm pb-2">
                        {wheel.title}
                    </h1>
                    <p className="text-zinc-400 text-lg">
                        {winner ? `Result: ${winner.text}` : "Spin to decide!"}
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

                {/* Publish to Community Option - Subtle */}
                <button
                    onClick={() => setIsPublishModalOpen(true)}
                    className="text-white/40 text-xs uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2 group"
                >
                    <span className="w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-125 transition-transform" />
                    Publish to Community Library
                </button>
            </main>

            {/* Simply Winner Overlay */}
            <AnimatePresence>
                {winner && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-0 left-0 w-full p-8 bg-zinc-900/90 backdrop-blur-md border-t border-white/10 shadow-2xl z-50 flex flex-col items-center text-center pb-12"
                    >
                        <div className="uppercase text-xs font-bold text-zinc-400 tracking-widest mb-2">Winner</div>
                        <div className="text-5xl font-black text-white drop-shadow-lg mb-4">{winner.text}</div>
                        <button onClick={() => setWinner(null)} className="px-8 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform">Close</button>
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
