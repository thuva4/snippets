export const DEFAULT_CONFIG = {
    style: {
        padding: 16,
        margin: 32,
        background: true,
        darkMode: true,
    },
    window: {
        theme: 'default' as const,
        showControls: true,
        showTitle: true,
        borderRadius: 8,
    },
    code: {
        theme: 'github-dark' as const,
        fontSize: 14,
        lineHeight: 1.6,
        fontFamily: 'Roboto Mono',
    },
    output: {
        format: 'png' as const,
        quality: 100,
        scale: 2,
        width: 1000,
    },
} as const;

export type DefaultConfig = typeof DEFAULT_CONFIG;
