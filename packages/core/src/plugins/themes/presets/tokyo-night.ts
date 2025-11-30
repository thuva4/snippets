import { ThemeConfig } from '../types.js';

export const tokyoNightTheme: ThemeConfig = {
    name: 'tokyo-night',
    background: 'linear-gradient(140deg, #24283b, #1a1b26)',
    windowBg: '#1a1b26',
    windowBorder: '#414868',
    titleColor: '#c0caf5',
    controls: {
        red: '#f7768e',
        yellow: '#e0af68',
        green: '#9ece6a',
    },
    codeTheme: {
        dark: 'tokyo-night',
        light: 'tokyo-night',
    },
};
