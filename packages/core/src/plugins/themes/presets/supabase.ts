import { ThemeConfig } from '../types.js';

export const supabaseTheme: ThemeConfig = {
    name: 'supabase',
    background: 'linear-gradient(to right, #3ecf8e, #2dd4bf)',
    windowBg: '#1a1a1a',
    windowBorder: 'rgba(62, 207, 142, 0.3)',
    titleColor: '#f0f0f0',
    controls: {
        red: '#ff5f56',
        yellow: '#ffbd2e',
        green: '#27c93f',
    },
    codeTheme: {
        dark: 'catppuccin-mocha',
        light: 'catppuccin-latte',
    },
};
