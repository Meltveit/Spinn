import { notFound } from "next/navigation";
import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import { SharedWheelView } from "@/components/wheel/SharedWheelView";
import { Wheel } from "@/lib/types";

type Props = {
    params: Promise<{ id: string }>;
};

async function getWheel(id: string) {
    const { data, error } = await supabase
        .from("wheels")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) return null;
    return data as Wheel;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const wheel = await getWheel(id);

    if (!wheel) {
        return {
            title: "Wheel Not Found - SpintheQ",
        };
    }

    return {
        title: `${wheel.title} - SpintheQ`,
        description: `Spin the wheel to decide: ${wheel.segments.map(s => s.text).slice(0, 3).join(", ")}...`,
        openGraph: {
            title: wheel.title,
            description: "Spin the wheel to make a decision!",
            type: "website",
        }
    };
}

export default async function WheelPage({ params }: Props) {
    const { id } = await params;
    const wheel = await getWheel(id);

    if (!wheel) {
        notFound();
    }

    return <SharedWheelView wheel={wheel} />;
}
