export function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

interface GenerateHtmlOptions {
    lineNumberStart?: number;
    showLineNumbers?: boolean;
    highlightLines?: number[] | string;
}

const parseLineRange = (range: string): number[] => {
    const lines: number[] = [];
    const parts = range.split(',').map(p => p.trim());

    for (const part of parts) {
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(n => parseInt(n.trim(), 10));
            for (let i = start; i <= end; i++) {
                lines.push(i);
            }
        } else {
            lines.push(parseInt(part, 10));
        }
    }

    return [...new Set(lines)].sort((a, b) => a - b);
};

const shouldHighlight = (lineNum: number, highlightLines?: number[] | string): boolean => {
    if (!highlightLines) return false;
    const lines = typeof highlightLines === 'string'
        ? parseLineRange(highlightLines)
        : highlightLines;
    return lines.includes(lineNum);
};

export function generateCodeHTML(lines: any[], options: GenerateHtmlOptions = {}): string {
    const { lineNumberStart = 1, showLineNumbers = false, highlightLines } = options;

    return lines.map((line, index) => {
        const lineNumber = lineNumberStart + index;
        const isHighlighted = shouldHighlight(lineNumber, highlightLines);

        const spans = line.props.children.map((span: any) =>
            `<span style="color: ${span.props.style.color}">${escapeHtml(span.props.children)}</span>`
        ).join('');

        const lineNumberHTML = showLineNumbers
            ? `<span class="line-number" style="color: #6e7681; opacity: 0.5; padding-right: 16px; min-width: 40px; display: flex; justify-content: flex-end; user-select: none;">${lineNumber}</span>`
            : '';

        const highlightStyle = isHighlighted
            ? 'background-color: rgba(110, 118, 129, 0.15); border-left: 3px solid #58a6ff;'
            : '';

        return `<div style="display: flex; flex-direction: row; min-height: 1.5em; height: auto; ${highlightStyle}">${lineNumberHTML}<div style="flex: 1; white-space: pre-wrap; overflow-wrap: anywhere;">${spans}</div></div>`;
    }).join('');
}
