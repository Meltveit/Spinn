"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export function AdManager() {
    const [adKey, setAdKey] = useState(0);

    useEffect(() => {
        const handleRefresh = () => {
            console.log("Refreshing Ad Script...");
            setAdKey(prev => prev + 1);
        };

        window.addEventListener("refresh-ad", handleRefresh);
        return () => window.removeEventListener("refresh-ad", handleRefresh);
    }, []);

    return (
        <Script
            key={`ad-script-${adKey}`}
            src="https://gizokraijaw.net/vignette.min.js"
            data-zone="10450128"
            strategy="afterInteractive"
        />
    );
}
