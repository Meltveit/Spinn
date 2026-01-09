"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import { cn } from "@/lib/utils";
import { WheelSegment } from "@/lib/types";

interface SpinnerProps {
    segments: WheelSegment[];
    onSpinEnd?: (winner: WheelSegment) => void;
    isSpinning?: boolean;
    setIsSpinning?: (spinning: boolean) => void;
}

export function Spinner({ segments, onSpinEnd, isSpinning, setIsSpinning }: SpinnerProps) {
    const controls = useAnimation();

    // We strictly use a Ref for current rotation to avoid re-render conflicts.
    // We only need state for initial render, or not even that if we start at 0.
    const currentRotationRef = useRef(0);
    const isSpinningRef = useRef(false);

    useEffect(() => {
        if (isSpinning && !isSpinningRef.current) {
            spin();
        }
    }, [isSpinning]);

    const spin = async () => {
        // Safety check
        if (segments.length === 0) return;

        isSpinningRef.current = true;

        // Random winner index
        const winnerIndex = Math.floor(Math.random() * segments.length);
        const segmentAngle = 360 / segments.length;

        // --- Target Calculation ---
        // 1. Current position: currentRotationRef.current
        // 2. We want to land on 'targetAngleFromTop' (relative to the wheel's 0-degree start).
        //    But since we are rotating the CONTAINER, we want the container to rotate such that the target segment is at the TOP (0 deg).
        //    If the segment is at +90deg (3 o'clock) normally, we need to rotate the container -90deg (or +270deg) to bring it to 12 o'clock.

        const winnerAngleRelativeToWheelZero = (winnerIndex * segmentAngle) + (segmentAngle / 2);

        // The rotation needed to bring 'winnerAngleRelativeToWheelZero' to the Top (0 deg):
        // TargetRotation = 360 - winnerAngleRelativeToWheelZero.
        const targetVisualAngle = 360 - winnerAngleRelativeToWheelZero;

        // Calculate the diff from current rotation to the next target visual angle.
        // We want to move FORWARD (Clockwise).
        const currentVisualAngle = currentRotationRef.current % 360;

        let diff = targetVisualAngle - currentVisualAngle;
        if (diff < 0) {
            diff += 360;
        }

        // Add random jitter: +/- 40% of segment width
        const noise = (Math.random() - 0.5) * (segmentAngle * 0.8);

        const extraSpins = 360 * (5 + Math.floor(Math.random() * 3));

        // New Total = Old Total + Spins + Diff + Noise
        const newTotalRotation = currentRotationRef.current + extraSpins + diff + noise;

        // Ensure strictly increasing rotation for smooth clockwise spin
        // (Sometimes noise could technically make it slightly less than previous if extraSpins was 0, but extraSpins is huge).

        await controls.start({
            rotate: newTotalRotation,
            transition: {
                duration: 4.5,
                ease: [0.2, 0, 0.1, 1], // Ease out quart/quint
                type: "tween"
            }
        });

        // Update ref to the new final value so next spin starts from here
        currentRotationRef.current = newTotalRotation;

        // We do NOT mod 360 the ref, so the number just grows. This prevents "rewind" animations.

        isSpinningRef.current = false;

        if (setIsSpinning) setIsSpinning(false);
        if (onSpinEnd) onSpinEnd(segments[winnerIndex]);
    };

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
            {/* Pointer - Modern SVG */}
            <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 z-20 filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)]">
                <svg
                    width="40"
                    height="50"
                    viewBox="0 0 40 50"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transform origin-top"
                >
                    {/* Main Arrow Body - Rounded Top, Sharp Point */}
                    <path
                        d="M20 50L0 15C0 6.71573 6.71573 0 15 0H25C33.2843 0 40 6.71573 40 15L20 50Z"
                        fill="white"
                        stroke="#E4E4E7"
                        strokeWidth="2"
                    />
                    {/* Inner Detail for depth */}
                    <circle cx="20" cy="15" r="6" fill="#F4F4F5" />
                    <circle cx="20" cy="15" r="2" fill="#D4D4D8" />
                </svg>
            </div>

            {/* Wheel */}
            <motion.div
                className="w-full h-full rounded-full border-[8px] border-white/10 shadow-2xl overflow-hidden relative"
                animate={controls}
                initial={{ rotate: 0 }}
            // removed style={{ rotate }} to prevent React state vs Framer Motion conflicts
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
                                className="absolute top-1/2 left-1/2 h-1/2 origin-bottom flex justify-center pt-2 pb-12"
                                style={{
                                    transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                                    width: `${300 / segments.length}%`
                                }}
                            >
                                <span
                                    className="text-white font-bold text-[10px] md:text-sm uppercase tracking-wider truncate px-1 drop-shadow-md select-none"
                                    style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', maxHeight: '100%' }}
                                >
                                    {seg.text}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </motion.div>

            {/* Center Hub */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-full shadow-xl z-10 flex items-center justify-center border-4 border-zinc-100">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 shadow-inner flex items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-white/50 blur-[1px]"></div>
                </div>
            </div>
        </div>
    );
}
