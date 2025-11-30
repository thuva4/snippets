import { BaseSnippetBuilder, SnippetOptions } from '@thuva4/snippets-core';
export type { SnippetOptions } from '@thuva4/snippets-core';

/**
 * Returns HTML output.
 */
export class BrowserSnippetBuilder extends BaseSnippetBuilder {
    constructor(code?: string, language?: string) {
        super(code, language);
    }

    async toHTML(): Promise<string> {
        if (!this.options.code && (!this.options.columns || this.options.columns.length === 0)) {
            throw new Error('Code content is required');
        }

        const { generateSnippetHTML } = await import('@thuva4/snippets-core');

        return generateSnippetHTML(this.options as SnippetOptions);
    }

    getOptions(): Partial<SnippetOptions> {
        return { ...this.options };
    }
}

export function createSnippet(code?: string, language?: string): BrowserSnippetBuilder {
    return new BrowserSnippetBuilder(code, language);
}
