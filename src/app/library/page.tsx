import Link from "next/link";
import Image from "next/image";
import { Users, ArrowRight } from "lucide-react";
import { PRESET_CATEGORIES } from "@/lib/constants";

export const metadata = {
    title: "Wheel Library - SpintheQ",
    description: "Browse popular decision wheels for Food, Movies, Games and more.",
};

export default function LibraryPage() {
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
                </div>
            </header>

            <main className="pt-32 pb-20 px-4 max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 drop-shadow-sm pb-2">
                        Wheel Library
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
                        Discover ready-made wheels for every occasion. From dinner decisions to streamer challenges.
                    </p>

                    <Link
                        href="/library/community"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full text-white font-bold transition-all hover:scale-105 group"
                    >
                        <Users size={18} className="text-indigo-400" />
                        <span>Browse Community Created Wheels</span>
                        <ArrowRight size={16} className="opacity-50 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                <div className="space-y-16">
                    {PRESET_CATEGORIES.map((category) => (
                        <section key={category.id} className="space-y-6">
                            <div className="border-b border-white/10 pb-4">
                                <h2 className="text-2xl font-bold text-white">{category.title}</h2>
                                <p className="text-zinc-400">{category.description}</p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {category.presets.map((preset) => (
                                    <Link
                                        key={preset.id}
                                        href={`/?template=${preset.id}`}
                                        className="group block p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-colors shadow-lg hover:shadow-indigo-500/20"
                                    >
                                        <h3 className="text-lg font-bold mb-2 text-white group-hover:text-indigo-400 transition-colors">{preset.title}</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {preset.segments.slice(0, 4).map(seg => (
                                                <span key={seg.id} className="text-xs px-2 py-1 rounded-full bg-black/20 text-zinc-300 border border-white/5">
                                                    {seg.text}
                                                </span>
                                            ))}
                                            {preset.segments.length > 4 && (
                                                <span className="text-xs px-2 py-1 rounded-full bg-black/20 text-zinc-500 border border-white/5">
                                                    +{preset.segments.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            </main>
        </div>
    );
}
