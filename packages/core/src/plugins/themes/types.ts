export interface ThemeConfig {
    name: string;
    background: string;
    windowBg: string;
    windowBorder: string;
    titleColor: string;
    controls: {
        red: string;
        yellow: string;
        green: string;
    };

    codeTheme?: {
        dark: string;
        light: string;
    };
}
