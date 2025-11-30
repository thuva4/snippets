import { ThemeConfig } from '../types.js';

export const vercelTheme: ThemeConfig = {
    name: 'vercel',
    background: 'linear-gradient(to bottom, #000, #111)',
    windowBg: '#0a0a0a',
    windowBorder: 'rgba(255, 255, 255, 0.1)',
    titleColor: '#e0e0e0',
    controls: {
        red: '#ff5f56',
        yellow: '#ffbd2e',
        green: '#27c93f',
    },
    codeTheme: {
        dark: 'vitesse-dark',
        light: 'vitesse-light',
    },
};
