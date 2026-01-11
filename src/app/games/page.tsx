import Link from "next/link";
import { ArrowLeft, Gamepad2, Skull, Dice5, Coins } from "lucide-react";
import { PRESET_CATEGORIES } from "@/lib/constants";

export default function GamesPage() {
    // Collect all "Game" related presets
    // We specifically want the "Classic Games" category we just added,
    // plus maybe "Party & Social"
    const gameCategories = PRESET_CATEGORIES.filter(c =>
        c.id === "classic-games" || c.id === "party"
    );

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-pink-500/30 overflow-x-hidden relative">

            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[100px]" />
            </div>

            <main className="relative z-10 pt-24 px-4 max-w-6xl mx-auto pb-20">

                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-wider">
                        <ArrowLeft size={16} />
                        Back to Wheel
                    </Link>
                </div>

                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-500/20 rounded-2xl mb-4 border border-indigo-500/30">
                        <Gamepad2 size={32} className="text-indigo-400" />
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300 drop-shadow-sm">
                        Game Arcade
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        Classic party games, digitalized. Spin to play Twister, Truth or Dare, and more.
                    </p>
                </div>

                {/* Feature Highlight: Elimination Mode */}
                <div className="mb-20 p-8 rounded-3xl bg-gradient-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-32 bg-red-500/10 blur-[80px] rounded-full pointer-events-none" />

                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="space-y-4 max-w-xl text-center md:text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-xs font-bold uppercase border border-red-500/30">
                                <Skull size={14} />
                                New Feature
                            </div>
                            <h2 className="text-3xl font-black text-white">Elimination Mode</h2>
                            <p className="text-zinc-400 text-lg">
                                The ultimate "Battle Royale" for your wheel. Toggle <span className="text-white font-bold">Elimination Mode</span> on the home page to remove winners after each spin until only one remains.
                            </p>
                            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-400 transition-colors shadow-lg hover:shadow-red-500/25">
                                Try it Now <ArrowLeft className="rotate-180" size={18} />
                            </Link>
                        </div>
                        {/* Visual Representation (Abstract) */}
                        <div className="flex gap-2 opacity-80">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="w-16 h-24 bg-zinc-800 rounded-lg border border-white/10 animate-pulse flex items-center justify-center">
                                    <span className="text-2xl">❌</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Game Categories */}
                <div className="space-y-20">
                    {gameCategories.map((category) => (
                        <div key={category.id}>
                            <div className="flex items-end gap-4 mb-8 border-b border-white/5 pb-4">
                                <div>
                                    <h2 className="text-3xl font-bold text-white mb-1">{category.title}</h2>
                                    <p className="text-zinc-500">{category.description}</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.presets.map((preset) => (
                                    <Link
                                        key={preset.id}
                                        href={`/?template=${preset.id}`}
                                        className="group relative bg-white/5 hover:bg-white/10 border border-white/5 hover:border-indigo-500/50 p-6 rounded-2xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 overflow-hidden"
                                    >
                                        <div className="absolute top-0 right-0 p-24 bg-gradient-to-br from-indigo-500/0 to-purple-500/0 group-hover:from-indigo-500/10 group-hover:to-purple-500/10 blur-2xl rounded-full transition-all duration-500" />

                                        <div className="relative z-10">
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-300 transition-colors">
                                                {preset.title}
                                            </h3>
                                            <div className="flex flex-wrap gap-2">
                                                {preset.segments.slice(0, 4).map((seg) => (
                                                    <span
                                                        key={seg.id}
                                                        className="text-[10px] px-2 py-1 rounded bg-black/20 text-zinc-400 border border-white/5"
                                                    >
                                                        {seg.text}
                                                    </span>
                                                ))}
                                                {preset.segments.length > 4 && (
                                                    <span className="text-[10px] px-2 py-1 rounded bg-black/20 text-zinc-500 border border-white/5">
                                                        +{preset.segments.length - 4} more
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </main>
        </div>
    );
}
