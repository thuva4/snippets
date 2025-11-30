import { ThemeConfig } from '../types.js';

export const monokaiTheme: ThemeConfig = {
    name: 'monokai',
    background: 'linear-gradient(140deg, #272822, #1e1f1c)',
    windowBg: '#272822',
    windowBorder: '#49483e',
    titleColor: '#f8f8f2',
    controls: {
        red: '#f92672',
        yellow: '#e6db74',
        green: '#a6e22e',
    },
    codeTheme: {
        dark: 'monokai',
        light: 'monokai',
    },
};
