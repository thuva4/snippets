import { BundledLanguage } from 'shiki';

export interface CodeBlock {
    code: string;
    language: BundledLanguage;
    fileName?: string;
}

export function parseMarkdown(markdown: string): CodeBlock[][] {
    const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/g;
    const blocks: CodeBlock[] = [];

    let match;
    while ((match = codeBlockRegex.exec(markdown)) !== null) {
        const language = match[1] as BundledLanguage;
        const code = match[2].trim();

        blocks.push({
            code,
            language,
        });
    }

    if (blocks.length === 0) {
        return [];
    }

    return [blocks];
}

export function parseMarkdownWithSeparators(markdown: string): CodeBlock[][] {
    const sections = markdown.split(/\n---\n|\n\n\n+/);

    return sections
        .map(section => {
            const blocks: CodeBlock[] = [];
            const codeBlockRegex = /```(\w+)\n([\s\S]*?)```/g;

            let match;
            while ((match = codeBlockRegex.exec(section)) !== null) {
                const language = match[1] as BundledLanguage;
                const code = match[2].trim();

                blocks.push({
                    code,
                    language,
                });
            }

            return blocks;
        })
        .filter(blocks => blocks.length > 0);
}
