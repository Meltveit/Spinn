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

export const COMMUNITY_CATEGORIES = [
    { id: "decision", label: "🤔 Decision" },
    { id: "party", label: "🎉 Party/Fun" },
    { id: "food", label: "🍔 Food & Drink" },
    { id: "streaming", label: "👾 Streaming/Gaming" },
    { id: "funny", label: "😂 Just Funny" },
    { id: "educational", label: "🧠 Educational" },
];

export const PRESET_CATEGORIES: PresetCategory[] = [
    {
        id: "food",
        title: "Food & Drink",
        description: "The hardest decision of the day, solved instantly.",
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
                    { id: "7", text: "Steak", color: "#F43F5E" },
                    { id: "8", text: "Curry", color: "#6366F1" },
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
                    { id: "5", text: "McDonald's", color: "#FACC15" },
                    { id: "6", text: "KFC", color: "#DC2626" },
                    { id: "7", text: "Subway", color: "#16A34A" },
                ]
            },
            {
                id: "coffee-order",
                title: "Coffee Shop Order",
                segments: [
                    { id: "1", text: "Latte", color: "#D97706" },
                    { id: "2", text: "Cappuccino", color: "#92400E" },
                    { id: "3", text: "Iced Americano", color: "#78350F" },
                    { id: "4", text: "Matcha", color: "#10B981" },
                    { id: "5", text: "Espresso", color: "#000000" },
                    { id: "6", text: "Chai", color: "#B45309" },
                ]
            }
        ]
    },
    {
        id: "entertainment",
        title: "Activities & Entertainment",
        description: "Boredom busters for solo nights or group hangouts.",
        presets: [
            {
                id: "movie-genre",
                title: "Movie Genre",
                segments: [
                    { id: "1", text: "Action", color: "#EF4444" },
                    { id: "2", text: "Comedy", color: "#3B82F6" },
                    { id: "3", text: "Horror", color: "#F59E0B" },
                    { id: "4", text: "Sci-Fi", color: "#10B981" },
                    { id: "5", text: "Romance", color: "#8B5CF6" },
                    { id: "6", text: "Thriller", color: "#EC4899" },
                ]
            },
            {
                id: "date-night",
                title: "Date Night Ideas",
                segments: [
                    { id: "1", text: "Cinema", color: "#EC4899" },
                    { id: "2", text: "Fancy Dinner", color: "#EF4444" },
                    { id: "3", text: "Bowling", color: "#3B82F6" },
                    { id: "4", text: "Cook Together", color: "#10B981" },
                    { id: "5", text: "Board Games", color: "#F59E0B" },
                    { id: "6", text: "Stargazing", color: "#6366F1" },
                ]
            },
            {
                id: "workout",
                title: "Quick Workout",
                segments: [
                    { id: "1", text: "20 Pushups", color: "#EF4444" },
                    { id: "2", text: "50 Squats", color: "#3B82F6" },
                    { id: "3", text: "1min Plank", color: "#F59E0B" },
                    { id: "4", text: "30 Burpees", color: "#10B981" },
                    { id: "5", text: "Rest Day!", color: "#8B5CF6" },
                    { id: "6", text: "Run 1km", color: "#06B6D4" },
                ]
            }
        ]
    },
    {
        id: "party",
        title: "Party & Social",
        description: "Ice breakers and party games.",
        presets: [
            {
                id: "truth-dare",
                title: "Truth or Dare",
                segments: [
                    { id: "1", text: "Truth", color: "#3B82F6" },
                    { id: "2", text: "Dare", color: "#EF4444" },
                    { id: "3", text: "Truth", color: "#3B82F6" },
                    { id: "4", text: "Dare", color: "#EF4444" },
                    { id: "5", text: "Spin Again", color: "#10B981" },
                ]
            },
            {
                id: "drinking-game",
                title: "Sip or Skip (21+)",
                segments: [
                    { id: "1", text: "Take 1 Sip", color: "#EF4444" },
                    { id: "2", text: "Give 2 Sips", color: "#3B82F6" },
                    { id: "3", text: "Waterfall", color: "#06B6D4" },
                    { id: "4", text: "Truth", color: "#8B5CF6" },
                    { id: "5", text: "Never Have I Ever", color: "#F59E0B" },
                    { id: "6", text: "Finish It", color: "#000000" },
                ]
            },
            {
                id: "charades",
                title: "Charades Categories",
                segments: [
                    { id: "1", text: "Movies", color: "#EF4444" },
                    { id: "2", text: "Animals", color: "#10B981" },
                    { id: "3", text: "Songs", color: "#3B82F6" },
                    { id: "4", text: "Objects", color: "#F59E0B" },
                    { id: "5", text: "Actions", color: "#8B5CF6" },
                    { id: "6", text: "Celebs", color: "#EC4899" },
                ]
            }
        ]
    },
    {
        id: "streaming",
        title: "Streamer Tools",
        description: "Engage your Twitch/Kick chat.",
        presets: [
            {
                id: "stream-challenge",
                title: "In-Game Challenge",
                segments: [
                    { id: "1", text: "Use Pistol Only", color: "#EF4444" },
                    { id: "2", text: "No Healing", color: "#DC2626" },
                    { id: "3", text: "Sensitivity x2", color: "#F59E0B" },
                    { id: "4", text: "Mute Game Sound", color: "#3B82F6" },
                    { id: "5", text: "Chat Chooses Loadout", color: "#8B5CF6" },
                    { id: "6", text: "Drop Best Item", color: "#000000" },
                ]
            },
            {
                id: "giveaway",
                title: "Simple Giveaway",
                segments: [
                    { id: "1", text: "User 1", color: "#3B82F6" },
                    { id: "2", text: "User 2", color: "#10B981" },
                    { id: "3", text: "User 3", color: "#F59E0B" },
                    { id: "4", text: "User 4", color: "#EF4444" },
                    // This is just a template, users edit this
                ]
            }
        ]
    },
    {
        id: "daily",
        title: "Daily Decisions",
        description: "Small choices made easy.",
        presets: [
            {
                id: "cleaning",
                title: "What to Clean?",
                segments: [
                    { id: "1", text: "Dishes", color: "#3B82F6" },
                    { id: "2", text: "Laundry", color: "#EC4899" },
                    { id: "3", text: "Vacuum", color: "#10B981" },
                    { id: "4", text: "Bathroom", color: "#EF4444" },
                    { id: "5", text: "Take a Break", color: "#F59E0B" },
                ]
            },
            {
                id: "weekend",
                title: "Weekend Plans",
                segments: [
                    { id: "1", text: "Sleep In", color: "#6366F1" },
                    { id: "2", text: "Hike/Walk", color: "#10B981" },
                    { id: "3", text: "Visit Family", color: "#F59E0B" },
                    { id: "4", text: "Gaming Marathon", color: "#EF4444" },
                    { id: "5", text: "Read a Book", color: "#3B82F6" },
                ]
            }
        ]
    },
    {
        id: "classic-games",
        title: "Classic Games",
        description: "Digital versions of physical classics.",
        presets: [
            {
                id: "twister",
                title: "Twister Spinner",
                segments: [
                    { id: "1", text: "Left Hand RED", color: "#EF4444" },
                    { id: "2", text: "Left Hand BLUE", color: "#3B82F6" },
                    { id: "3", text: "Left Hand YELLOW", color: "#FACC15" },
                    { id: "4", text: "Left Hand GREEN", color: "#10B981" },
                    { id: "5", text: "Right Hand RED", color: "#EF4444" },
                    { id: "6", text: "Right Hand BLUE", color: "#3B82F6" },
                    { id: "7", text: "Right Hand YELLOW", color: "#FACC15" },
                    { id: "8", text: "Right Hand GREEN", color: "#10B981" },
                    { id: "9", text: "Left Foot RED", color: "#EF4444" },
                    { id: "10", text: "Left Foot BLUE", color: "#3B82F6" },
                    { id: "11", text: "Left Foot YELLOW", color: "#FACC15" },
                    { id: "12", text: "Left Foot GREEN", color: "#10B981" },
                    { id: "13", text: "Right Foot RED", color: "#EF4444" },
                    { id: "14", text: "Right Foot BLUE", color: "#3B82F6" },
                    { id: "15", text: "Right Foot YELLOW", color: "#FACC15" },
                    { id: "16", text: "Right Foot GREEN", color: "#10B981" },
                ]
            },
            {
                id: "coin-flip",
                title: "Coin Flip",
                segments: [
                    { id: "1", text: "HEADS", color: "#FACC15" },
                    { id: "2", text: "TAILS", color: "#94A3B8" },
                ]
            },
            {
                id: "dice",
                title: "Roll a Die (D6)",
                segments: [
                    { id: "1", text: "1", color: "#EF4444" },
                    { id: "2", text: "2", color: "#3B82F6" },
                    { id: "3", text: "3", color: "#FACC15" },
                    { id: "4", text: "4", color: "#10B981" },
                    { id: "5", text: "5", color: "#8B5CF6" },
                    { id: "6", text: "6", color: "#EC4899" },
                ]
            },
            {
                id: "magic-8-ball",
                title: "Magic 8-Ball",
                segments: [
                    { id: "1", text: "Yes", color: "#10B981" },
                    { id: "2", text: "No", color: "#EF4444" },
                    { id: "3", text: "Maybe", color: "#FACC15" },
                    { id: "4", text: "Ask Later", color: "#3B82F6" },
                    { id: "5", text: "Definitely", color: "#10B981" },
                    { id: "6", text: "Unlikely", color: "#EF4444" },
                ]
            }
        ]
    }
];
