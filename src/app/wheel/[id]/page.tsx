import { notFound } from "next/navigation";
import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { SharedWheelView } from "@/components/wheel/SharedWheelView";
import { Wheel } from "@/lib/types";

type Props = {
    params: Promise<{ id: string }>;
};

// Fetch both wheel data AND check if it's already published
async function getWheelData(id: string) {
    const { data: wheel, error } = await supabase
        .from("wheels")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !wheel) return null;

    // Check if it exists in community_shares
    const { data: communityData } = await supabase
        .from("community_shares")
        .select("title")
        .eq("wheel_id", id)
        .single();

    // Override title if it exists in community
    const finalWheel = { ...wheel } as Wheel;
    if (communityData?.title) {
        finalWheel.title = communityData.title;
    }

    return {
        wheel: finalWheel,
        isPublished: !!communityData
    };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const data = await getWheelData(id);

    if (!data) {
        return {
            title: "Wheel Not Found - SpintheQ",
        };
    }

    return {
        title: `${data.wheel.title} - SpintheQ`,
        description: `Spin the wheel to decide: ${data.wheel.segments.map(s => s.text).slice(0, 3).join(", ")}...`,
        openGraph: {
            title: data.wheel.title,
            description: "Spin the wheel to make a decision!",
            type: "website",
        }
    };
}

export default async function WheelPage({ params }: Props) {
    const { id } = await params;
    const data = await getWheelData(id);

    if (!data) {
        notFound();
    }

    return <SharedWheelView wheel={data.wheel} isAlreadyPublished={data.isPublished} />;
}
