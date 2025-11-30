import { BundledLanguage } from 'shiki';
import { highlightCode } from '../utils/highlighter.js';
import { getRegisteredTheme } from '../plugins/registry.js';
import { generateCodeHTML } from '../utils/html.js';
import { ThemeConfig } from '../plugins/themes/types.js';
import { SnippetOptions } from './types.js';

function getContainerStyles(options: SnippetOptions, theme: ThemeConfig): string {
    const styles = [
        'display: inline-block',
        `padding: ${options.margin || 0}px`,
        options.background ? `background: ${theme.background}` : 'background: transparent',
        'border-radius: 16px',
        'font-family: sans-serif',
        'box-sizing: border-box',
        options.maxWidth ? `max-width: ${options.maxWidth}px` : '',
        'width: fit-content',
        'min-width: 100%',
    ];
    return styles.filter(Boolean).join('; ');
}

function getWindowStyles(theme: ThemeConfig, hasBackground: boolean): string {
    const styles = [
        `background: ${theme.windowBg}`,
        `border: 1px solid ${theme.windowBorder}`,
        'border-radius: 12px',
        'overflow: hidden',
        hasBackground ? 'box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3)' : 'box-shadow: none',
        'display: flex',
        'flex-direction: column',
        'min-width: 300px',
        'min-height: 200px',
        'width: 100%',
    ];
    return styles.join('; ');
}

function getHeaderStyles(theme: ThemeConfig): string {
    const styles = [
        'display: flex',
        'align-items: center',
        'justify-content: space-between',
        'padding: 12px 16px',
        `border-bottom: 1px solid ${theme.windowBorder}`,
        `background: ${theme.windowBg}`,
        'height: 44px',
        'box-sizing: border-box',
    ];
    return styles.join('; ');
}

function getCodeStyles(options: SnippetOptions, theme: ThemeConfig): string {
    const styles = [
        `padding: ${options.padding}px`,
        "font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace",
        'font-size: 14px',
        'line-height: 1.6',
        'word-break: break-word',
        'overflow-wrap: anywhere',
        `color: ${theme.titleColor}`,
        'margin: 0',
        'flex: 1',
    ];
    return styles.join('; ');
}

function getControlsHTML(theme: ThemeConfig): string {
    return `
        <div style="display: flex; gap: 8px;">
            <span style="width: 12px; height: 12px; border-radius: 50%; background-color: ${theme.controls.red}; display: inline-block;"></span>
            <span style="width: 12px; height: 12px; border-radius: 50%; background-color: ${theme.controls.yellow}; display: inline-block;"></span>
            <span style="width: 12px; height: 12px; border-radius: 50%; background-color: ${theme.controls.green}; display: inline-block;"></span>
        </div>
    `;
}

async function generatePaneHTML(
    code: string,
    language: BundledLanguage,
    theme: any,
    themeConfig: ThemeConfig,
    options: SnippetOptions,
    fileName?: string,
    highlightLines?: string,
    isLast: boolean = true
): Promise<string> {
    const codeLines = await highlightCode(code, language, theme);
    const codeHTML = generateCodeHTML(codeLines, {
        lineNumberStart: options.lineNumberStart,
        showLineNumbers: options.showLineNumbers,
        highlightLines: highlightLines || (options.highlightLines as string),
    });

    const paneStyles = [
        'display: flex',
        'flex-direction: column',
        'flex: 1',
        'min-width: 0',
        !isLast ? `border-right: 1px solid ${themeConfig.windowBorder}` : '',
    ].filter(Boolean).join('; ');

    const headerStyles = [
        'display: flex',
        'align-items: center',
        'padding: 8px 16px',
        `border-bottom: 1px solid ${themeConfig.windowBorder}`,
        'background-color: rgba(0,0,0,0.02)',
        `color: ${themeConfig.titleColor}`,
        'font-size: 12px',
        "font-family: 'Inter', sans-serif",
        'opacity: 0.8',
    ].join('; ');

    return `
        <div class="snippet-pane" style="${paneStyles}">
            ${fileName ? `
            <div class="pane-header" style="${headerStyles}">
                ${fileName}
            </div>
            ` : ''}
            <div class="snippet-code" style="${getCodeStyles(options, themeConfig)}">
                ${codeHTML}
            </div>
        </div>
    `;
}

export async function generateSnippetHTML(options: SnippetOptions): Promise<string> {
    const {
        code,
        language,
        theme = 'github-dark',
        padding = 16,
        margin = 0,
        background = true,
        darkMode = true,
        fileName = '',
        windowTheme = 'default',
        showLineNumbers = false,
        lineNumberStart = 1,
        highlightLines,
        noWindow = false,
        columns = [],
    } = options;

    const themeConfig = getRegisteredTheme(windowTheme, darkMode);

    if (noWindow) {
        if (columns.length > 0) {
            const panes = await Promise.all(columns.map((col, index) =>
                generatePaneHTML(col.code, col.language, theme, themeConfig, options, col.fileName, col.highlightLines, index === columns.length - 1)
            ));
            return `<div style="display: flex; flex-direction: row; flex: 1;">${panes.join('')}</div>`;
        }

        const codeLines = await highlightCode(code || '', language as any, theme as any);
        const codeHTML = generateCodeHTML(codeLines, {
            lineNumberStart,
            showLineNumbers,
            highlightLines: highlightLines as string,
        });

        return `
            <div class="snippet-code" style="${getCodeStyles({ ...options, padding }, themeConfig)}">
                ${codeHTML}
            </div>
        `.trim();
    }

    let contentHTML = '';

    if (columns.length > 0) {
        const panes = await Promise.all(columns.map((col, index) =>
            generatePaneHTML(col.code, col.language, theme, themeConfig, options, col.fileName, col.highlightLines, index === columns.length - 1)
        ));
        contentHTML = `<div style="display: flex; flex-direction: row; width: 100%; flex: 1;">${panes.join('')}</div>`;
    } else {
        contentHTML = await generatePaneHTML(
            code || '',
            language as any,
            theme,
            themeConfig,
            options,
            fileName,
            highlightLines as string
        );
    }

    return `
<div class="snippet-container" style="${getContainerStyles({ ...options, padding, margin, background }, themeConfig)}">
    <div class="snippet-window" style="${getWindowStyles(themeConfig, background)}">
        <div class="snippet-header" style="${getHeaderStyles(themeConfig)}">
            ${getControlsHTML(themeConfig)}
            ${(!columns.length && fileName) ? `<div style="color: ${themeConfig.titleColor}; font-size: 13px; font-weight: 500;">${fileName}</div>` : '<div></div>'}
            <div style="width: 68px;"></div>
        </div>
        ${contentHTML}
    </div>
</div>
    `.trim();
}
