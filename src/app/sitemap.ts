import { MetadataRoute } from 'next';
import { PRESET_CATEGORIES } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://spintheq.com'; // Change this to your actual domain later

    // 1. Static Routes
    const staticPaths = [
        "",
        "/library",
        "/library/community",
        "/games",
        "/about",
        "/privacy",
    ];

    const staticRoutes = staticPaths.map(route => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: (route === "" ? 'daily' : 'weekly') as 'daily' | 'weekly',
        priority: route === "" ? 1 : 0.8,
    }));

    // 2. Preset Routes
    const presetRoutes = PRESET_CATEGORIES.flatMap(category =>
        category.presets.map(preset => ({
            url: `${baseUrl}/?template=${preset.id}`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.6,
        }))
    );

    return [...staticRoutes, ...presetRoutes];
}
