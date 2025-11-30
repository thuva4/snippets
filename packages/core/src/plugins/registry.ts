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

export function registerTheme(
    name: string,
    theme: ThemePlugin | ThemeConfig
): void {
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

    if (!plugin) {
        console.warn(`Theme "${name}" not found, using default theme`);
        return themeRegistry.get('default')!.config;
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
    return themeRegistry.delete(name);
}

export function hasTheme(name: string): boolean {
    return themeRegistry.has(name);
}

function isThemePlugin(obj: any): obj is ThemePlugin {
    return obj && typeof obj === 'object' && obj.type === 'theme' && obj.config;
}
