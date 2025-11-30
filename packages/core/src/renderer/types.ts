import { BundledLanguage } from 'shiki';
import { ThemeInput } from '../utils/highlighter.js';

export interface CodeColumn {
    code: string;
    language: BundledLanguage;
    fileName?: string;
    highlightLines?: string;
}

export interface SnippetOptions {
    code?: string;
    language?: BundledLanguage;
    theme?: ThemeInput;
    padding?: 0 | 16 | 32 | 64 | 128;
    margin?: 0 | 16 | 32 | 64 | 128;
    background?: boolean;
    darkMode?: boolean;
    fileName?: string;
    windowTheme?: string;
    showLineNumbers?: boolean;
    lineNumberStart?: number;
    highlightLines?: number[] | string;
    width?: number;
    maxWidth?: number;
    noWindow?: boolean;
    columns?: CodeColumn[];
    output?: string;
    scale?: number;
    format?: 'png' | 'jpeg' | 'webp' | 'pdf';
}
