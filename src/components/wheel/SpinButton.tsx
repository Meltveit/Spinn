"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SpinButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

export function SpinButton({ onClick, disabled }: SpinButtonProps) {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            disabled={disabled}
            className={cn(
                "relative group px-12 py-4 rounded-full font-black text-2xl uppercase tracking-widest transition-all",
                "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white shadow-xl shadow-indigo-500/30",
                "disabled:opacity-50 disabled:cursor-not-allowed disabled:grayscale"
            )}
        >
            <span className="relative z-10 flex items-center gap-2">
                SPIN IT!
            </span>
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        </motion.button>
    );
}
