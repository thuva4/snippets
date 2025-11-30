import { ThemeConfig } from '../types.js';

export const defaultTheme: ThemeConfig = {
    name: 'default',
    background: 'linear-gradient(140deg, rgb(165, 142, 251), rgb(233, 191, 248))',
    windowBg: '#1a1a1a',
    windowBorder: 'rgba(255, 255, 255, 0.1)',
    titleColor: '#c9d1d9',
    controls: {
        red: '#ff5f56',
        yellow: '#ffbd2e',
        green: '#27c93f',
    },
    codeTheme: {
        dark: 'github-dark',
        light: 'github-light',
    },
};
