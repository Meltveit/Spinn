import Link from "next/link";

export function Footer() {
    return (
        <footer className="w-full bg-black/20 border-t border-white/5 py-12 mt-20 backdrop-blur-sm z-30 relative">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">

                {/* Brand */}
                <div className="text-center md:text-left">
                    <h3 className="text-lg font-black text-white mb-2">SpinTheQ</h3>
                    <p className="text-xs text-zinc-500 max-w-xs">
                        The ultimate decision-making tool. Customize your wheels, spin to win, and share with friends.
                    </p>
                </div>

                {/* Links */}
                <div className="flex gap-8 text-sm font-medium">
                    <Link href="/" className="text-zinc-400 hover:text-white transition-colors">Home</Link>
                    <Link href="/library" className="text-zinc-400 hover:text-white transition-colors">Library</Link>
                    <Link href="/about" className="text-zinc-400 hover:text-white transition-colors">About</Link>
                    <Link href="/privacy" className="text-zinc-400 hover:text-white transition-colors">Privacy</Link>
                </div>

                {/* Copyright */}
                <div className="text-xs text-zinc-600">
                    &copy; {new Date().getFullYear()} SpinTheQ. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
