import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-pink-500/30 overflow-x-hidden relative">

            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
            </div>

            <main className="relative z-10 pt-24 px-4 max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-wider">
                    <ArrowLeft size={16} />
                    Back to Wheel
                </Link>

                <h1 className="text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
                    About SpinTheQ
                </h1>

                <div className="space-y-6 text-zinc-300 leading-relaxed text-lg">
                    <p>
                        <strong className="text-white">SpinTheQ</strong> is designed to make decision-making fun, fast, and fair.
                        Whether you are arguing over what to eat for dinner, assigning chores, or just bored, our wheels are here to help.
                    </p>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Why use it?</h2>
                    <ul className="list-disc pl-5 space-y-2 marker:text-indigo-500">
                        <li><strong>Free Forever:</strong> No accounts needed for basic spinning.</li>
                        <li><strong>Community Library:</strong> Share your creations and discover thousands of wheels made by others.</li>
                        <li><strong>Privacy Focused:</strong> We don't sell your data. We just want you to spin wheels.</li>
                        <li><strong>Customizable:</strong> Colors, text, weights - you control it all.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-white mt-12 mb-4">Contact</h2>
                    <p>
                        Have a suggestion or found a bug? We'd love to hear from you.
                    </p>
                </div>

                <div className="mt-12 p-6 bg-white/5 border border-white/5 rounded-2xl">
                    <h3 className="text-white font-bold mb-2">Credits</h3>
                    <p className="text-sm text-zinc-400">
                        Built with Next.js, Tailwind, Framer Motion, and Supabase.
                    </p>
                </div>
            </main>
        </div>
    );
}
