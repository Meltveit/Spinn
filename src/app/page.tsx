"use client";

import Image from "next/image";

import { useState, useEffect, Suspense, useRef } from "react";
import confetti from "canvas-confetti";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "@/components/wheel/Spinner";
import { SegmentEditor } from "@/components/wheel/SegmentEditor";
import { SpinButton } from "@/components/wheel/SpinButton";
import { supabase } from "@/lib/supabase";
import { WheelSegment } from "@/lib/types";
import { PRESET_CATEGORIES } from "@/lib/constants";
import { Trash2, RotateCcw, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const INITIAL_SEGMENTS: WheelSegment[] = [
  { id: "1", text: "Pizza", color: "#EF4444" },
  { id: "2", text: "Sushi", color: "#3B82F6" },
  { id: "3", text: "Burger", color: "#F59E0B" },
  { id: "4", text: "Salad", color: "#10B981" },
  { id: "5", text: "Tacos", color: "#8B5CF6" },
  { id: "6", text: "Pasta", color: "#EC4899" },
];

const SPINS_BEFORE_AD = 4;

function HomeContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [segments, setSegments] = useState<WheelSegment[]>(INITIAL_SEGMENTS);
  const [initialSegments, setInitialSegments] = useState<WheelSegment[]>(INITIAL_SEGMENTS);
  const [title, setTitle] = useState("My Decision Wheel");
  const [isSpinning, setIsSpinning] = useState(false);
  const [winner, setWinner] = useState<WheelSegment | null>(null);
  const [isSharing, setIsSharing] = useState(false);
  const [isEliminationMode, setIsEliminationMode] = useState(false);

  // Ref to track spins for ads (persistence not needed per session)
  // We useRef so it doesn't trigger re-renders
  const spinCountRef = useRef(0);

  useEffect(() => {
    const templateId = searchParams.get("template");
    if (templateId) {
      for (const cat of PRESET_CATEGORIES) {
        const preset = cat.presets.find(p => p.id === templateId);
        if (preset) {
          setSegments(preset.segments);
          setInitialSegments(preset.segments);
          setTitle(preset.title);
          break;
        }
      }
    }
  }, [searchParams]);

  const handleSpinEnd = (winningSegment: WheelSegment) => {
    setWinner(winningSegment);
    triggerConfetti();
    spinCountRef.current += 1;
  };

  const handleShare = async () => {
    if (segments.length < 2) return alert("Add at least 2 options!");
    setIsSharing(true);

    const { data, error } = await supabase.from('wheels').insert({
      title,
      segments: segments,
    }).select().single();

    if (error) {
      console.error(error);
      alert("Failed to create wheel. Please try again.");
      setIsSharing(false);
    } else if (data) {
      router.push(`/wheel/${data.id}`);
    }
  };

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const closeWinnerModal = () => {
    if (isEliminationMode && winner) {
      setSegments(prev => prev.filter(s => s.id !== winner.id));
    }
    setWinner(null);

    // Trigger Ad Refresh every X spins
    if (spinCountRef.current > 0 && spinCountRef.current % SPINS_BEFORE_AD === 0) {
      window.dispatchEvent(new Event("refresh-ad"));
    }
  };

  const resetGame = () => {
    setSegments(initialSegments);
    setWinner(null);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-pink-500/30 overflow-x-hidden relative">

      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[100px]" />
      </div>

      {/* Header */}
      <header className="fixed top-0 w-full z-40 bg-black/10 backdrop-blur-lg border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="SpintheQ Logo"
              width={140}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => router.push("/games")} className="text-sm font-medium hover:text-indigo-400 transition-colors text-zinc-300">Games 🎮</button>
            <button onClick={() => router.push("/library")} className="text-sm font-medium hover:text-indigo-400 transition-colors text-zinc-300">Library</button>
            <button
              onClick={handleShare}
              disabled={isSharing}
              className="px-6 py-2 bg-white text-black rounded-full font-bold text-xs uppercase hover:scale-105 transition-all disabled:opacity-50 disabled:hover:scale-100 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
            >
              {isSharing ? "Saving..." : "Share Wheel"}
            </button>
          </div>
        </div>
      </header>

      <main className="pt-24 pb-20 px-4 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start relative z-10">

        {/* Left Column: Wheel & Controls */}
        <div className="flex flex-col items-center gap-8 sticky top-24">
          <div className="text-center w-full max-w-md">
            {/* Title Input */}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-transparent text-center text-4xl md:text-5xl font-black tracking-tight focus:outline-none focus:underline decoration-indigo-500/50 mb-2 truncate text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 drop-shadow-sm placeholder:text-zinc-600"
              placeholder="Give it a title..."
            />
            <p className="text-zinc-400 text-lg font-medium">
              {winner ? "We have a winner!" : "Can't decide? Let fate choose for you."}
            </p>
          </div>

          {/* Game Controls */}
          <div className="flex items-center gap-4 bg-white/5 p-2 rounded-full border border-white/5">
            <button
              onClick={() => setIsEliminationMode(!isEliminationMode)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all",
                isEliminationMode ? "bg-red-500/20 text-red-400 border border-red-500/50" : "hover:bg-white/5 text-zinc-400"
              )}
            >
              <Trash2 size={14} />
              Elimination Mode {isEliminationMode ? "ON" : "OFF"}
            </button>

            {isEliminationMode && (
              <button
                onClick={resetGame}
                className="p-2 hover:bg-white/10 rounded-full text-zinc-400 hover:text-white transition-colors"
                title="Reset Wheel"
              >
                <RotateCcw size={16} />
              </button>
            )}
          </div>

          <div className="relative w-full max-w-md">
            {/* Glow effect behind wheel */}
            <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/30 to-purple-500/30 blur-3xl rounded-full transform scale-110" />

            <Spinner
              segments={segments}
              isSpinning={isSpinning}
              setIsSpinning={setIsSpinning}
              onSpinEnd={handleSpinEnd}
            />
          </div>

          <SpinButton
            onClick={() => setIsSpinning(true)}
            disabled={isSpinning || segments.length < 2}
          />
        </div>

        {/* Right Column: Editor */}
        <div className="w-full relative z-10">
          <SegmentEditor
            segments={segments}
            setSegments={(newSegments) => {
              setSegments(newSegments);
              setWinner(null); // Reset winner on edit
            }}
          />
          {/* Ad Space Removed */}
        </div>

      </main>

      {/* Winner Modal Overlay */}
      <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={closeWinnerModal}
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
                onClick={closeWinnerModal}
                className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold transition-all shadow-lg hover:shadow-indigo-500/25"
              >
                Spin Again
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomeContent />
    </Suspense>
  );
}
