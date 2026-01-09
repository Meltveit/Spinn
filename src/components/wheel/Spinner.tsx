"use client";

import { useState, useEffect } from "react";
import { motion, useAnimation, PanInfo } from "framer-motion";
import { cn } from "@/lib/utils";

export type WheelSegment = {
    id: string;
    text: string;
    color: string;
};

interface SpinnerProps {
    segments: WheelSegment[];
    onSpinEnd?: (winner: WheelSegment) => void;
    isSpinning?: boolean;
    setIsSpinning?: (spinning: boolean) => void;
}

export function Spinner({ segments, onSpinEnd, isSpinning, setIsSpinning }: SpinnerProps) {
    const controls = useAnimation();
    const [rotation, setRotation] = useState(0);

    const spin = () => {
        if (isSpinning) return;

        // Safety check
        if (segments.length === 0) return;

        if (setIsSpinning) setIsSpinning(true);

        // Random winner index
        const winnerIndex = Math.floor(Math.random() * segments.length);
        const segmentAngle = 360 / segments.length;

        // Calculate rotation to land on the winner
        // We want the winner to be at the top scanner (270deg or -90deg usually, let's say pointer is at top 0deg)
        // If pointer is at top, and we rotate clockwise.
        // Segment 0 starts at 0deg?
        // Let's assume standard unit circle, 0 is right. Top is 270 (-90).
        // Let's just make sure the pointer is visually aligned.

        // Extra rotations for effect (5 to 10 full spins)
        const extraSpins = 360 * (5 + Math.floor(Math.random() * 5));

        // Random offset within the segment to avoid landing on lines
        const randomOffset = Math.random() * (segmentAngle - 10) + 5;

        // The target angle
        // If we want index N to be at the top:
        // We need to rotate such that the start of seg N + offset is at the pointer.

        const newRotation = rotation + extraSpins + (360 - (winnerIndex * segmentAngle)) + randomOffset;

        controls.start({
            rotate: newRotation,
            transition: {
                duration: 4,
                ease: [0.15, 0, 0.2, 1], // Cubic bezier for "spin down" feel
                type: "tween"
            }
        }).then(() => {
            setRotation(newRotation % 360);
            if (setIsSpinning) setIsSpinning(false);
            if (onSpinEnd) onSpinEnd(segments[winnerIndex]);
        });
    };

    // Allow parent to trigger spin if needed, but usually we just click standard button?
    // Let's expose spin via ref or just have a button inside/outside.
    // For now, let's just use the prop to know we ARE spinning.

    // Actually, we want to call spin() when the User clicks "SPIN".
    // So we probably need to expose this or handle it via a prop trigger. 
    // But cleaner is to have a "Spin" button in the center or outside.

    // Let's attach spin to the internal method for now, but usually this is controlled from outside.
    // We'll update this once we have the parent controller.

    useEffect(() => {
        if (isSpinning) {
            spin();
        }
    }, [isSpinning]);


    // Helper to calculate SVG path for a segment
    const getSegmentPath = (index: number, total: number) => {
        const startAngle = (index * 360) / total;
        const endAngle = ((index + 1) * 360) / total;

        // Convert to radians, subtract 90deg to start at top (12 o'clock)
        const startRad = (startAngle - 90) * (Math.PI / 180);
        const endRad = (endAngle - 90) * (Math.PI / 180);

        const x1 = 50 + 50 * Math.cos(startRad);
        const y1 = 50 + 50 * Math.sin(startRad);
        const x2 = 50 + 50 * Math.cos(endRad);
        const y2 = 50 + 50 * Math.sin(endRad);

        // Large arc flag
        const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

        return `M 50 50 L ${x1} ${y1} A 50 50 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
    };

    return (
        <div className="relative w-full max-w-[400px] aspect-square mx-auto">
            {/* Pointer */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20 w-8 h-10 pointer-events-none">
                <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[30px] border-t-zinc-800 drop-shadow-lg"></div>
            </div>

            {/* Wheel */}
            <motion.div
                className="w-full h-full rounded-full border-4 border-white shadow-2xl overflow-hidden relative"
                animate={controls}
                initial={{ rotate: 0 }}
            >
                <svg viewBox="0 0 100 100" className="w-full h-full transform transition-transform">
                    {segments.map((seg, i) => (
                        <path
                            key={seg.id}
                            d={getSegmentPath(i, segments.length)}
                            fill={seg.color}
                            stroke="white"
                            strokeWidth="0.5"
                        />
                    ))}
                </svg>

                {/* Text Items */}
                <div className="absolute inset-0 w-full h-full pointer-events-none">
                    {segments.map((seg, i) => {
                        const angle = (i * 360) / segments.length + (360 / segments.length) / 2;
                        return (
                            <div
                                key={seg.id}
                                className="absolute top-1/2 left-1/2 h-1/2 origin-bottom flex justify-center pt-4"
                                style={{
                                    transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                                    width: `${300 / segments.length}%`
                                }}
                            >
                                <span
                                    className="text-white font-bold text-xs uppercase tracking-wider truncate px-1 drop-shadow-md"
                                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                                >
                                    {seg.text}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Center Knocker/Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg z-10 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500"></div>
            </div>
        </div>
    );
}
