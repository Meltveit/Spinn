import { WheelSegment } from "@/lib/types";

export type PresetCategory = {
    id: string;
    title: string;
    description: string;
    presets: PresetWheel[];
}

export type PresetWheel = {
    id: string;
    title: string;
    segments: WheelSegment[];
}

export const PRESET_CATEGORIES: PresetCategory[] = [
    {
        id: "food",
        title: "The Dinner Decider",
        description: "Can't decide what to eat? Let the wheel choose your next meal.",
        presets: [
            {
                id: "dinner-basic",
                title: "What's for Dinner?",
                segments: [
                    { id: "1", text: "Pizza", color: "#EF4444" },
                    { id: "2", text: "Sushi", color: "#3B82F6" },
                    { id: "3", text: "Tacos", color: "#F59E0B" },
                    { id: "4", text: "Burgers", color: "#10B981" },
                    { id: "5", text: "Salad", color: "#8B5CF6" },
                    { id: "6", text: "Pasta", color: "#EC4899" },
                ]
            },
            {
                id: "takeout",
                title: "Takeout Roulette",
                segments: [
                    { id: "1", text: "Chinese", color: "#EF4444" },
                    { id: "2", text: "Indian", color: "#3B82F6" },
                    { id: "3", text: "Thai", color: "#F59E0B" },
                    { id: "4", text: "Kebab", color: "#10B981" },
                ]
            }
        ]
    },
    {
        id: "entertainment",
        title: "The Movie Night Wheel",
        description: "End the scrolling paralysis on Netflix.",
        presets: [
            {
                id: "genre",
                title: "Movie Genre",
                segments: [
                    { id: "1", text: "Action", color: "#EF4444" },
                    { id: "2", text: "Comedy", color: "#3B82F6" },
                    { id: "3", text: "Horror", color: "#F59E0B" },
                    { id: "4", text: "Sci-Fi", color: "#10B981" },
                    { id: "5", text: "Romance", color: "#8B5CF6" },
                    { id: "6", text: "Documentary", color: "#EC4899" },
                ]
            }
        ]
    },
    {
        id: "streaming",
        title: "The Streamer Box",
        description: "Tools for Twitch & Kick streamers to engage chat.",
        presets: [
            {
                id: "stream-game",
                title: "Which game next?",
                segments: [
                    { id: "1", text: "Fortnite", color: "#EF4444" },
                    { id: "2", text: "Valorant", color: "#3B82F6" },
                    { id: "3", text: "Minecraft", color: "#F59E0B" },
                    { id: "4", text: "Just Chatting", color: "#10B981" },
                ]
            }
        ]
    }
];
