import { ThemeRegistrationRaw } from 'shiki';
import { ThemeInput } from '../utils/highlighter.js';
import { ThemeConfig } from '../plugins/themes/types.js';

export interface UnifiedTheme extends ThemeConfig, ThemeRegistrationRaw {
    name: string;
}

export type PaddingConfig = number | {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
};

export type BackgroundConfig =
    | string
    | {
        type: 'gradient';
        colors: string[];
        direction?: string;
    }
    | {
        type: 'solid';
        color: string;
    }
    | {
        type: 'image';
        url: string;
        size?: string;
        position?: string;
    };

export interface ShadowConfig {
    blur?: number;
    spread?: number;
    offsetX?: number;
    offsetY?: number;
    color?: string;
}

export interface BorderConfig {
    width?: number;
    color?: string;
    radius?: number;
    style?: 'solid' | 'dashed' | 'dotted';
}

export interface AdvancedStyleConfig {
    padding?: PaddingConfig;
    margin?: number;
    background?: BackgroundConfig;
    darkMode?: boolean;
}

export interface AdvancedWindowConfig {
    theme?: string;
    showControls?: boolean;
    showTitle?: boolean;
    shadow?: ShadowConfig;
    border?: BorderConfig;
}

export interface StyleConfig {
    padding?: 0 | 16 | 24 | 32 | 48 | 64 | 128;
    margin?: 0 | 16 | 24 | 32 | 48 | 64 | 128;
    background?: boolean;
    darkMode?: boolean;
}

export interface WindowConfig {
    theme?: 'default' | 'vercel' | 'supabase' | 'tailwind' | 'minimal';
    showControls?: boolean;
    showTitle?: boolean;
    borderRadius?: number;
}

export interface CodeConfig {
    theme?: ThemeInput;
    fontSize?: number;
    lineHeight?: number;
    fontFamily?: string;
}

export interface OutputConfig {
    format?: 'png';
    quality?: number;
    scale?: number;
    width?: number;
    path?: string;
}

export interface Config {
    style?: StyleConfig;
    window?: WindowConfig;
    code?: CodeConfig;
    output?: OutputConfig;
}

export interface AdvancedConfig {
    style?: AdvancedStyleConfig;
    window?: AdvancedWindowConfig;
    code?: CodeConfig;
    output?: OutputConfig;
}



export interface LineNumberConfig {
    show?: boolean;
    start?: number;
    style?: {
        color?: string;
        backgroundColor?: string;
        padding?: string;
        minWidth?: string;
    };
}

export interface LineHighlightConfig {
    lines: number[] | string; // [1, 3, 5] or "1,3,5-7"
    style?: {
        backgroundColor?: string;
        borderLeft?: string;
    };
}

export interface AnnotationConfig {
    line: number;
    text: string;
    position?: 'left' | 'right';
    style?: {
        color?: string;
        backgroundColor?: string;
        fontSize?: string;
    };
}

export interface EnhancedCodeConfig extends CodeConfig {
    lineNumbers?: LineNumberConfig;
    highlightLines?: LineHighlightConfig;
    annotations?: AnnotationConfig[];
}

export interface PresetConfig {
    name: string;
    description: string;
    style?: StyleConfig;
    window?: WindowConfig;
    code?: CodeConfig;
    output?: OutputConfig;
}