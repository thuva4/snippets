import { ThemeConfig } from '../types.js';

export const sunsetTheme: ThemeConfig = {
    name: 'sunset',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ee5a6f 100%)',
    windowBg: 'rgba(30, 20, 40, 0.95)',
    windowBorder: 'rgba(255, 107, 107, 0.3)',
    titleColor: '#ffe0e0',
    controls: {
        red: '#ff6b6b',
        yellow: '#feca57',
        green: '#48dbfb',
    },
    codeTheme: {
        dark: 'rose-pine-moon',
        light: 'rose-pine-dawn',
    },
};
