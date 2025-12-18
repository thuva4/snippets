import { createHighlighter, BundledLanguage, BundledTheme, Highlighter, ThemeRegistration, ThemeRegistrationRaw } from 'shiki';
import { UnifiedTheme } from '../config/types.js';

let highlighterPromise: Promise<Highlighter> | null = null;

async function getHighlighter() {
    if (!highlighterPromise) {
        highlighterPromise = createHighlighter({
            themes: ['github-dark'],
            langs: ['javascript', 'typescript', 'json', 'bash', 'markdown'],
        });
    }
    return highlighterPromise;
}

export function _resetHighlighter(): void {
    highlighterPromise = null;
}

export type ThemeInput = BundledTheme | ThemeRegistration | ThemeRegistrationRaw | UnifiedTheme;

export async function highlightCode(code: string, lang: BundledLanguage, theme: ThemeInput = 'github-dark') {
    const highlighter = await getHighlighter();

    if (!highlighter.getLoadedLanguages().includes(lang)) {
        try {
            await highlighter.loadLanguage(lang);
        } catch {
            console.warn(`Language "${lang}" not found, falling back to plaintext`);
        }
    }

    const themeName = typeof theme === 'string' ? theme : (theme.name || 'custom-theme');

    if (typeof theme === 'string') {
        if (!highlighter.getLoadedThemes().includes(theme as string)) {
            await highlighter.loadTheme(theme as BundledTheme);
        }
    } else {
        const shikiTheme: ThemeRegistrationRaw = {
            name: themeName,
            type: theme.type,
            colors: theme.colors,
            tokenColors: theme.tokenColors,
            settings: theme.settings ?? [],
            semanticHighlighting: theme.semanticHighlighting,
            semanticTokenColors: theme.semanticTokenColors,
        };

        if (!highlighter.getLoadedThemes().includes(themeName)) {
            await highlighter.loadTheme(shikiTheme);
        }
    }

    const tokens = highlighter.codeToTokens(code, {
        lang,
        theme: themeName,
    });

    const lines = tokens.tokens.map(line => {
        const spans = line.map(token => ({
            type: 'span',
            props: {
                style: { color: token.color },
                children: token.content || ' ',
            },
        }));

        return {
            type: 'div',
            props: {
                style: {
                    display: 'flex',
                    flexDirection: 'row' as const,
                    height: '1.5em',
                },
                children: spans,
            },
        };
    });

    return lines;
}
