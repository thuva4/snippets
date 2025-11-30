import { PresetConfig } from "./types.js";

export const BUILT_IN_PRESETS: Record<string, PresetConfig> = {
    twitter: {
        name: 'Twitter',
        description: 'Optimized for Twitter posts (1200x675)',
        style: {
            padding: 24,
            margin: 48,
            background: true,
            darkMode: true,
        },
        window: {
            theme: 'vercel',
            showControls: true,
            showTitle: true,
        },
        output: {
            width: 1200,
            scale: 2,
        },
    },
    blog: {
        name: 'Blog Post',
        description: 'Optimized for blog post images',
        style: {
            padding: 32,
            margin: 64,
            background: true,
            darkMode: true,
        },
        window: {
            theme: 'default',
            showControls: true,
            showTitle: true,
        },
        output: {
            width: 1400,
            scale: 2,
        },
    },
    documentation: {
        name: 'Documentation',
        description: 'Clean style for documentation',
        style: {
            padding: 16,
            margin: 32,
            background: false,
            darkMode: false,
        },
        window: {
            theme: 'minimal',
            showControls: false,
            showTitle: true,
        },
        code: {
            fontSize: 13,
            lineHeight: 1.5,
        },
        output: {
            width: 1000,
            scale: 2,
        },
    },
    presentation: {
        name: 'Presentation',
        description: 'Large text for presentations',
        style: {
            padding: 48,
            margin: 64,
            background: true,
            darkMode: true,
        },
        window: {
            theme: 'tailwind',
            showControls: false,
            showTitle: false,
        },
        code: {
            fontSize: 18,
            lineHeight: 1.8,
        },
        output: {
            width: 1600,
            scale: 2,
        },
    },
    github: {
        name: 'GitHub README',
        description: 'Optimized for GitHub README files',
        style: {
            padding: 24,
            margin: 48,
            background: true,
            darkMode: true,
        },
        window: {
            theme: 'default',
            showControls: true,
            showTitle: true,
        },
        output: {
            width: 1200,
            scale: 2,
        },
    },
};
