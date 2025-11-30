export function parseLineRange(range: string): number[] {
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
}

export function shouldHighlightLine(
    lineNumber: number,
    highlightLines: number[] | string
): boolean {
    const lines = typeof highlightLines === 'string'
        ? parseLineRange(highlightLines)
        : highlightLines;

    return lines.includes(lineNumber);
}

export function generateLineNumberHTML(
    lineNumber: number,
    config?: {
        color?: string;
        backgroundColor?: string;
        padding?: string;
        minWidth?: string;
    }
): string {
    const color = config?.color || '#6e7681';
    const backgroundColor = config?.backgroundColor || 'transparent';
    const padding = config?.padding || '0 12px 0 0';
    const minWidth = config?.minWidth || '40px';

    return `<span class="line-number" style="
    color: ${color};
    background-color: ${backgroundColor};
    padding: ${padding};
    min-width: ${minWidth};
    display: inline-block;
    text-align: right;
    user-select: none;
    opacity: 0.5;
  ">${lineNumber}</span>`;
}

export function generateAnnotationHTML(annotation: {
    text: string;
    position?: 'left' | 'right';
    color?: string;
    backgroundColor?: string;
    fontSize?: string;
}): string {
    const position = annotation.position || 'right';
    const color = annotation.color || '#8b949e';
    const backgroundColor = annotation.backgroundColor || 'rgba(110, 118, 129, 0.1)';
    const fontSize = annotation.fontSize || '12px';

    return `<span class="annotation annotation-${position}" style="
    color: ${color};
    background-color: ${backgroundColor};
    font-size: ${fontSize};
    padding: 2px 8px;
    border-radius: 4px;
    margin-left: ${position === 'right' ? '12px' : '0'};
    margin-right: ${position === 'left' ? '12px' : '0'};
    font-style: italic;
  ">${annotation.text}</span>`;
}

export function getHighlightStyle(config?: {
    backgroundColor?: string;
    borderLeft?: string;
}): string {
    const backgroundColor = config?.backgroundColor || 'rgba(110, 118, 129, 0.1)';
    const borderLeft = config?.borderLeft || '3px solid #58a6ff';

    return `background-color: ${backgroundColor}; border-left: ${borderLeft}; padding-left: 8px;`;
}
