import { ThemeConfig } from '../types.js';

export const auroraTheme: ThemeConfig = {
    name: 'aurora',
    background: 'linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)',
    windowBg: 'rgba(15, 23, 42, 0.95)',
    windowBorder: 'rgba(0, 201, 255, 0.3)',
    titleColor: '#e0f2fe',
    controls: {
        red: '#f87171',
        yellow: '#fbbf24',
        green: '#34d399',
    },
    codeTheme: {
        dark: 'aurora-x',
        light: 'catppuccin-latte',
    },
};
