import { ThemePlugin, ThemeConfig } from './types.js';
import { themes as builtInThemes } from './themes/index.js';

const themeRegistry = new Map<string, ThemePlugin>();

function initializeBuiltInThemes() {
    for (const [name, config] of Object.entries(builtInThemes)) {
        const plugin: ThemePlugin = {
            name: `theme-${name}`,
            version: '1.0.0',
            type: 'theme',
            config,
            description: `Built-in ${config.name} theme`,
        };
        themeRegistry.set(name, plugin);
    }
}

initializeBuiltInThemes();

const RESERVED_NAMES = new Set(['__proto__', 'constructor', 'prototype']);

function validateThemeName(name: string): void {
    if (RESERVED_NAMES.has(name)) {
        throw new Error(`Invalid theme name: "${name}" is reserved`);
    }
}

export function registerTheme(
    name: string,
    theme: ThemePlugin | ThemeConfig
): void {
    validateThemeName(name);

    const plugin: ThemePlugin = isThemePlugin(theme)
        ? theme
        : {
            name: `theme-${name}`,
            version: '1.0.0',
            type: 'theme',
            config: theme,
        };

    themeRegistry.set(name, plugin);
}

export function getRegisteredTheme(
    name: string,
    darkMode: boolean = true
): ThemeConfig {
    const plugin = themeRegistry.get(name);
    const fallback = themeRegistry.get('default');

    if (!plugin) {
        console.warn(`Theme "${name}" not found, using default theme`);
        if (!fallback) {
            throw new Error('Theme registry corrupted: default theme missing');
        }
        return fallback.config;
    }

    if (plugin.variants) {
        if (!darkMode && plugin.variants.light) {
            return plugin.variants.light;
        }
        if (darkMode && plugin.variants.dark) {
            return plugin.variants.dark;
        }
    }

    return plugin.config;
}

export function listThemes(): string[] {
    return Array.from(themeRegistry.keys());
}

export function unregisterTheme(name: string): boolean {
    if (name === 'default') {
        console.warn('Cannot unregister the default theme');
        return false;
    }
    return themeRegistry.delete(name);
}

export function hasTheme(name: string): boolean {
    return themeRegistry.has(name);
}

function isThemePlugin(obj: unknown): obj is ThemePlugin {
    return (
        typeof obj === 'object' &&
        obj !== null &&
        'type' in obj &&
        obj.type === 'theme' &&
        'config' in obj
    );
}
