import { ThemeConfig } from '../types.js';

export const oceanTheme: ThemeConfig = {
    name: 'ocean',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    windowBg: 'rgba(15, 30, 50, 0.95)',
    windowBorder: 'rgba(102, 126, 234, 0.3)',
    titleColor: '#dbeafe',
    controls: {
        red: '#f87171',
        yellow: '#fbbf24',
        green: '#34d399',
    },
    codeTheme: {
        dark: 'material-theme-ocean',
        light: 'material-theme-lighter',
    },
};
