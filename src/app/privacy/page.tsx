import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-pink-500/30 overflow-x-hidden relative">

            <main className="relative z-10 pt-24 px-4 max-w-3xl mx-auto">
                <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-8 transition-colors text-sm font-bold uppercase tracking-wider">
                    <ArrowLeft size={16} />
                    Back to Wheel
                </Link>

                <h1 className="text-5xl font-black mb-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
                    Privacy Policy
                </h1>

                <div className="space-y-6 text-zinc-400 leading-relaxed text-sm">
                    <p className="text-lg text-zinc-200">
                        This Privacy Policy describes how SpinTheQ ("we", "us", or "our") collects, uses, and shares your information when you use our website.
                    </p>

                    <h2 className="text-xl font-bold text-white mt-8 mb-2">1. Information We Collect</h2>
                    <p>
                        We intentionally collect as little data as possible.
                        <strong> We do not require you to create an account</strong> to use the basic features of the site.
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                        <li><strong>Voluntary Information:</strong> If you publish a wheel to the Community Library, the content of that wheel becomes public.</li>
                        <li><strong>Usage Data:</strong> We may use analytics tools (like Vercel Analytics or Google Analytics) to understand how visitors use our site (e.g., page views, session duration). This data is anonymized.</li>
                    </ul>

                    <h2 className="text-xl font-bold text-white mt-8 mb-2">2. Cookies</h2>
                    <p>
                        We use local storage to save your recent wheels on your device. We may use third-party cookies for analytics or advertising purposes (e.g., Monetag). By using our site, you consent to the use of these cookies.
                    </p>

                    <h2 className="text-xl font-bold text-white mt-8 mb-2">3. Third-Party Links</h2>
                    <p>
                        Our website may contain links to other websites (e.g. via ads). We are not responsible for the privacy practices of those third parties.
                    </p>

                    <h2 className="text-xl font-bold text-white mt-8 mb-2">4. Changes</h2>
                    <p>
                        We may update this policy from time to time. The latest version will always be posted on this page.
                    </p>

                    <p className="mt-12 text-xs text-zinc-600">
                        Last detailed update: January 2026.
                    </p>
                </div>
            </main>
        </div>
    );
}
