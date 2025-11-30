import { SnippetOptions, CodeColumn } from '../renderer/types.js';
import { BundledLanguage } from 'shiki';
import { ThemeInput } from '../utils/highlighter.js';
import { getRegisteredTheme, registerTheme } from '../plugins/registry.js';
import { applyPreset } from '../config/preset-registry.js';

export class BaseSnippetBuilder {
    protected options: Partial<SnippetOptions> = {};

    constructor(code?: string, language?: string) {
        if (code) this.options.code = code;
        if (language) this.options.language = language as BundledLanguage;
    }

    code(code: string): this {
        this.options.code = code;
        return this;
    }

    language(language: string): this {
        this.options.language = language as BundledLanguage;
        return this;
    }

    fileName(fileName: string): this {
        this.options.fileName = fileName;
        return this;
    }

    theme(theme: string): this {
        this.options.windowTheme = theme;

        const themeConfig = getRegisteredTheme(theme, this.options.darkMode ?? true);
        if (themeConfig.codeTheme && !this.options.theme) {
            const shikiTheme = this.options.darkMode ? themeConfig.codeTheme.dark : themeConfig.codeTheme.light;
            this.options.theme = shikiTheme as ThemeInput;
        }

        return this;
    }

    codeTheme(theme: ThemeInput): this {
        this.options.theme = theme;

        if (typeof theme !== 'string' && 'windowBg' in theme) {
            registerTheme(theme.name, theme);
            this.options.windowTheme = theme.name;
        }

        return this;
    }

    windowTheme(theme: string): this {
        this.options.windowTheme = theme;
        return this;
    }

    padding(padding: 0 | 16 | 32 | 64 | 128): this {
        this.options.padding = padding;
        return this;
    }

    margin(margin: 0 | 16 | 32 | 64 | 128): this {
        this.options.margin = margin;
        return this;
    }

    width(width: number): this {
        this.options.width = width;
        return this;
    }

    maxWidth(width: number): this {
        this.options.maxWidth = width;
        return this;
    }

    background(enabled: boolean): this {
        this.options.background = enabled;
        return this;
    }

    darkMode(enabled: boolean): this {
        this.options.darkMode = enabled;
        return this;
    }

    lineNumbers(enabled: boolean, start?: number): this {
        this.options.showLineNumbers = enabled;
        if (start !== undefined) {
            this.options.lineNumberStart = start;
        }
        return this;
    }

    highlightLines(lines: number[] | string): this {
        this.options.highlightLines = lines;
        return this;
    }

    columns(columns: CodeColumn[]): this {
        this.options.columns = columns;
        return this;
    }

    preset(presetName: string): this {
        const presetConfig = applyPreset(presetName);

        if (presetConfig.style) {
            if (presetConfig.style.padding !== undefined) this.options.padding = presetConfig.style.padding as any;
            if (presetConfig.style.margin !== undefined) this.options.margin = presetConfig.style.margin as any;
            if (presetConfig.style.background !== undefined) this.options.background = presetConfig.style.background;
            if (presetConfig.style.darkMode !== undefined) this.options.darkMode = presetConfig.style.darkMode;
        }

        if (presetConfig.window) {
            if (presetConfig.window.theme) this.options.windowTheme = presetConfig.window.theme;
        }

        if (presetConfig.code) {
            if (presetConfig.code.theme) this.options.theme = presetConfig.code.theme as ThemeInput;
        }

        if (presetConfig.output) {
            if (presetConfig.output.width) this.options.width = presetConfig.output.width;
            if (presetConfig.output.scale) this.options.scale = presetConfig.output.scale;
        }

        return this;
    }

    noWindow(enabled: boolean): this {
        this.options.noWindow = enabled;
        return this;
    }

    format(format: 'png' | 'jpeg' | 'webp' | 'pdf'): this {
        this.options.format = format;
        return this;
    }

    getOptions(): Partial<SnippetOptions> {
        return { ...this.options };
    }
}
