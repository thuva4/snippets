import { useState, useEffect } from 'react';
import type { SnippetOptions } from '../types.js';

export function useSnippet(code: string, options: SnippetOptions) {
    const [html, setHtml] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(async () => {
            try {
                // @ts-ignore
                const { createSnippet } = await import('@thuva4/snippets-browser');

                const windowTheme = options?.windowTheme || (typeof options.theme === 'string' ? options.theme : 'default');

                const builder = createSnippet(code, (options as any)?.language);

                if (options.columns && options.columns.length > 0) {
                    builder.columns(options.columns);
                    if (options?.windowTheme) builder.windowTheme(options.windowTheme);
                    else builder.theme(windowTheme);

                    builder.code(code).language((options as any)?.language);
                } else {
                    builder.code(code).language((options as any)?.language);
                }

                builder.theme(windowTheme);
                if (options?.padding !== undefined) builder.padding(options.padding as any);
                if (options?.margin !== undefined) builder.margin(options.margin as any);
                if (options?.background !== undefined) builder.background(options.background);
                if (options?.darkMode !== undefined) builder.darkMode(options.darkMode);
                if (options?.showLineNumbers !== undefined) builder.lineNumbers(options.showLineNumbers);
                if (options?.highlightLines !== undefined) builder.highlightLines(options.highlightLines || '');
                if (options?.noWindow !== undefined) builder.noWindow(options.noWindow);
                if (options?.width !== undefined) builder.width(options.width);
                if (options?.maxWidth !== undefined) builder.maxWidth(options.maxWidth);

                const result = await builder.toHTML();

                setHtml(result);
            } catch (error) {
                console.error('Render error:', error);
                setHtml('<div>Error rendering snippet</div>');
            } finally {
                setIsLoading(false);
            }
        }, 50);

        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [code, JSON.stringify(options)]);

    return { html, isLoading };
}
