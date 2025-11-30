import { ThemeConfig } from '../types.js';

export const coffeeTheme: ThemeConfig = {
    name: 'coffee',
    background: 'linear-gradient(135deg, #3a1c71 0%, #d76d77 50%, #ffaf7b 100%)',
    windowBg: 'rgba(40, 30, 25, 0.95)',
    windowBorder: 'rgba(255, 175, 123, 0.3)',
    titleColor: '#f5e6d3',
    controls: {
        red: '#d76d77',
        yellow: '#ffaf7b',
        green: '#98c379',
    },
    codeTheme: {
        dark: 'gruvbox-dark-medium',
        light: 'gruvbox-light-medium',
    },
};
