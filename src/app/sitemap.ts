import { MetadataRoute } from 'next';
import { PRESET_CATEGORIES } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://spintheq.com'; // Change this to your actual domain later

    // 1. Static Routes
    const staticRoutes = [
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/library`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
    ];

    // 2. Generate URLs for each Preset Template
    // URL Structure: /?template=id
    // Note: Query params are often ignored by sitemaps unless canonicalized, 
    // but since our app loads content based on them, we can list them if we consider them distinct pages.
    // HOWEVER, it is cleaner for SEO if we eventually made them /template/[id].
    // For now, let's just ensure the main pages are indexed.
    // If we want to index templates, we should ideally have a route like /template/[id] that redirects or renders content.
    // Since we currently use query params, standard sitemaps might not be the best place for them unless they are canonical.

    // Let's create sitemap entries for them anyway assuming we might migrate to /template/[id] or Google picks them up.
    // A better approach for V2: Create a dynamic route `/templates/[slug]` that renders the wheel.

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
