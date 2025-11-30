import { describe, it, expect } from 'vitest';
import { escapeHtml, generateCodeHTML } from './html.js';

describe('html utils', () => {
    describe('escapeHtml', () => {
        it('should escape special characters', () => {
            expect(escapeHtml('<div>')).toBe('&lt;div&gt;');
            expect(escapeHtml('"quote"')).toBe('&quot;quote&quot;');
            expect(escapeHtml("'single'")).toBe('&#039;single&#039;');
        });

        it('should NOT replace spaces with &nbsp;', () => {
            expect(escapeHtml('hello world')).toBe('hello world');
        });
    });

    describe('generateCodeHTML', () => {
        it('should generate HTML with pre-wrap style', () => {
            const mockLines = [{
                props: {
                    children: [{
                        props: {
                            children: 'console.log("hello")',
                            style: { color: '#000' }
                        }
                    }]
                }
            }];

            const html = generateCodeHTML(mockLines);
            expect(html).toContain('white-space: pre-wrap');
            expect(html).toContain('overflow-wrap: anywhere');
        });
    });
});
