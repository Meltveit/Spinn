export interface WheelSegment {
    id: string;
    text: string;
    color: string;
    weight?: number; // For future weighted probabilities
}

export interface Wheel {
    id: string;
    title: string;
    segments: WheelSegment[];
    created_at: string;
    slug?: string;
    views?: number;
}
