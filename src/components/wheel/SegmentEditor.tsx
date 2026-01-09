"use client";

import { useState } from "react";
import { Plus, X, Shuffle, Trash2 } from "lucide-react";
import { WheelSegment } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SegmentEditorProps {
    segments: WheelSegment[];
    setSegments: (segments: WheelSegment[]) => void;
}

const PRESET_COLORS = [
    "#EF4444", // Red
    "#F97316", // Orange
    "#F59E0B", // Amber
    "#10B981", // Emerald
    "#3B82F6", // Blue
    "#6366F1", // Indigo
    "#8B5CF6", // Violet
    "#EC4899", // Pink
];

export function SegmentEditor({ segments, setSegments }: SegmentEditorProps) {
    const [inputText, setInputText] = useState("");

    const addSegment = () => {
        if (!inputText.trim()) return;

        const newSegment: WheelSegment = {
            id: crypto.randomUUID(),
            text: inputText,
            color: PRESET_COLORS[segments.length % PRESET_COLORS.length],
        };

        setSegments([...segments, newSegment]);
        setInputText("");
    };

    const removeSegment = (id: string) => {
        setSegments(segments.filter(s => s.id !== id));
    };

    const updateSegment = (id: string, updates: Partial<WheelSegment>) => {
        setSegments(segments.map(s => s.id === id ? { ...s, ...updates } : s));
    };

    const clearAll = () => {
        if (confirm("Are you sure you want to clear all options?")) {
            setSegments([]);
        }
    };

    const shuffleColors = () => {
        const shuffled = [...segments].map(s => ({
            ...s,
            color: PRESET_COLORS[Math.floor(Math.random() * PRESET_COLORS.length)]
        }));
        setSegments(shuffled);
    };

    return (
        <div className="w-full max-w-md mx-auto p-6 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white">Options</h2>
                <div className="flex gap-2">
                    <button onClick={shuffleColors} className="p-2 text-zinc-400 hover:text-indigo-400 hover:bg-white/5 rounded-full transition-colors" title="Shuffle Colors">
                        <Shuffle className="w-4 h-4" />
                    </button>
                    <button onClick={clearAll} className="p-2 text-zinc-400 hover:text-red-400 hover:bg-white/5 rounded-full transition-colors" title="Clear All">
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            <div className="flex gap-2 mb-6">
                <input
                    type="text"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addSegment()}
                    placeholder="Add an option (e.g. Pizza)"
                    className="flex-1 px-4 py-3 bg-black/20 text-white placeholder:text-zinc-500 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
                <button
                    onClick={addSegment}
                    disabled={!inputText.trim()}
                    className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-indigo-500/20"
                >
                    <Plus className="w-6 h-6" />
                </button>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                {segments.map((segment) => (
                    <div
                        key={segment.id}
                        className="group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                    >
                        <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 shrink-0">
                            <input
                                type="color"
                                value={segment.color}
                                onChange={(e) => updateSegment(segment.id, { color: e.target.value })}
                                className="absolute inset-[-50%] w-[200%] h-[200%] cursor-pointer p-0 m-0 border-none"
                            />
                        </div>

                        <input
                            type="text"
                            value={segment.text}
                            onChange={(e) => updateSegment(segment.id, { text: e.target.value })}
                            className="flex-1 bg-transparent border-none focus:outline-none text-zinc-200 font-medium placeholder:text-zinc-600"
                            placeholder="Option text"
                        />
                        <button
                            onClick={() => removeSegment(segment.id)}
                            className="p-2 text-zinc-500 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                ))}
                {segments.length === 0 && (
                    <div className="text-center py-8 text-zinc-500 italic">
                        No options yet. Add some above!
                    </div>
                )}
            </div>
        </div>
    );
}
