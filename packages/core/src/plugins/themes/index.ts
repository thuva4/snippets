import { ThemeConfig } from './types.js';
import { defaultTheme } from './presets/default.js';
import { vercelTheme } from './presets/vercel.js';
import { supabaseTheme } from './presets/supabase.js';
import { tailwindTheme } from './presets/tailwind.js';
import { minimalTheme } from './presets/minimal.js';
import { cyberpunkTheme } from './presets/cyberpunk.js';
import { sunsetTheme } from './presets/sunset.js';
import { oceanTheme } from './presets/ocean.js';
import { forestTheme } from './presets/forest.js';
import { auroraTheme } from './presets/aurora.js';
import { draculaTheme } from './presets/dracula.js';
import { monokaiTheme } from './presets/monokai.js';
import { nordTheme } from './presets/nord.js';
import { synthwaveTheme } from './presets/synthwave.js';
import { nightOwlTheme } from './presets/night-owl.js';
import { tokyoNightTheme } from './presets/tokyo-night.js';
import { coffeeTheme } from './presets/coffee.js';
import { matrixTheme } from './presets/matrix.js';
import { nebulaTheme } from './presets/nebula.js';

export { type ThemeConfig };

/**
 * Built-in themes registry
 */
export const themes: Record<string, ThemeConfig> = {
    default: defaultTheme,
    vercel: vercelTheme,
    supabase: supabaseTheme,
    tailwind: tailwindTheme,
    minimal: minimalTheme,
    cyberpunk: cyberpunkTheme,
    sunset: sunsetTheme,
    ocean: oceanTheme,
    forest: forestTheme,
    aurora: auroraTheme,
    dracula: draculaTheme,
    monokai: monokaiTheme,
    nord: nordTheme,
    synthwave: synthwaveTheme,
    'night-owl': nightOwlTheme,
    'tokyo-night': tokyoNightTheme,
    coffee: coffeeTheme,
    matrix: matrixTheme,
    nebula: nebulaTheme,
};

export function getTheme(themeName: string, darkMode: boolean): ThemeConfig {
    const theme = themes[themeName] || themes.default;

    if (!darkMode && themeName === 'default') {
        return {
            ...theme,
            background: 'linear-gradient(140deg, rgb(165, 142, 251), rgb(233, 191, 248))',
            windowBg: '#FFFFFF',
            windowBorder: 'rgba(0, 0, 0, 0.1)',
            titleColor: '#6E6E73',
        };
    }

    return theme;
}
