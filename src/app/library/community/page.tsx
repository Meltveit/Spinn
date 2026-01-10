import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Users, Sparkles } from "lucide-react";
import { CommunityGrid } from "@/components/wheel/CommunityGrid";

export const metadata = {
    title: "Community Library - SpintheQ",
    description: "Browse and spin wheels created by the SpintheQ community.",
};

export default function CommunityPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-pink-500/30">

            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px]" />
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
                    <Link href="/library" className="flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                        <ArrowLeft size={16} />
                        Back to Library
                    </Link>
                </div>
            </header>

            <main className="pt-32 pb-20 px-4 max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2">
                        <Users size={12} />
                        Community Created
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-4 drop-shadow-sm">
                        Community <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Library</span>
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
                        Discover wheels created by other users.
                        See something inappropriate? Use the report button.
                    </p>
                </div>

                <CommunityGrid />
            </main>
        </div>
    );
}
