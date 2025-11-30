import { BaseSnippetBuilder, SnippetOptions } from '@thuva4/snippets-core';
import { generateImage } from './renderer.js';

export class SnippetBuilder extends BaseSnippetBuilder {
    constructor(code?: string, language?: string) {
        super(code, language);
    }

    async save(outputPath: string): Promise<Buffer | Uint8Array> {
        if (!this.options.code && !this.options.columns) {
            throw new Error('Code content or columns are required');
        }
        if (!this.options.language && !this.options.columns) {
            throw new Error('Language is required');
        }

        this.options.output = outputPath;

        return generateImage(this.options as SnippetOptions);
    }

    async generate(): Promise<Buffer | Uint8Array> {
        if (!this.options.code && !this.options.columns) {
            throw new Error('Code content or columns are required');
        }
        if (!this.options.language && !this.options.columns) {
            throw new Error('Language is required');
        }

        return generateImage(this.options as SnippetOptions);
    }
}

export function createSnippet(code?: string, language?: string): SnippetBuilder {
    return new SnippetBuilder(code, language);
}
