import { useCallback, useEffect, useRef, useState } from 'react';
import type { BundledLanguage } from 'shiki';
import './EditorOverlay.css';

interface Props {
    code: string;
    language: BundledLanguage;
    fileName: string;
    highlightLines: string;
    onChange: (updates: { code?: string; language?: BundledLanguage; fileName?: string; highlightLines?: string }) => void;
    onClose: () => void;
    onRemove?: () => void;
    rect: { top: number; left: number; width: number; height: number };
}

const LANGUAGES: { value: string; label: string }[] = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'go', label: 'Go' },
    { value: 'rust', label: 'Rust' },
    { value: 'sql', label: 'SQL' },
    { value: 'json', label: 'JSON' },
    { value: 'markdown', label: 'Markdown' },
    { value: 'tsx', label: 'TSX' },
    { value: 'jsx', label: 'JSX' },
    { value: 'bash', label: 'Bash' },
    { value: 'yaml', label: 'YAML' },
];

export function EditorOverlay({ code: initialCode, language: initialLanguage, fileName: initialFileName, highlightLines: initialHighlightLines, onChange, onClose, onRemove, rect }: Props) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [code, setCode] = useState(initialCode);
    const [language, setLanguage] = useState(initialLanguage);
    const [fileName, setFileName] = useState(initialFileName);
    const [highlightLines, setHighlightLines] = useState(initialHighlightLines);


    const stateRef = useRef({ code, language, fileName, highlightLines });
    stateRef.current = { code, language, fileName, highlightLines };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.setSelectionRange(textareaRef.current.value.length, textareaRef.current.value.length);
        }
    }, []);

    const handleClickOutside = useCallback((e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            onChange(stateRef.current);
            onClose();
        }
    }, [onChange, onClose]);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [handleClickOutside]);

    return (
        <div
            ref={containerRef}
            className="editor-overlay"
            style={{
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
            }}
        >
            <div className="editor-header-bar">
                <div className="header-group">
                    <input
                        type="text"
                        value={fileName}
                        onChange={(e) => setFileName(e.target.value)}
                        placeholder="Filename"
                        className="header-input filename-input"
                    />
                </div>
                {onRemove && (
                    <div className="header-group" style={{ marginLeft: 'auto' }}>
                        <button
                            onClick={(e) => { e.stopPropagation(); onRemove(); }}
                            className="btn-remove-pane"
                            title="Remove pane"
                        >
                            🗑️
                        </button>
                    </div>
                )}
            </div>

            <div className="editor-content-area">
                <textarea
                    ref={textareaRef}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="editor-textarea"
                    spellCheck={false}
                />
            </div>

            <div className="editor-footer-bar">
                <div className="footer-group">
                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value as BundledLanguage)}
                        className="footer-select"
                    >
                        {LANGUAGES.map(lang => (
                            <option key={lang.value} value={lang.value}>{lang.label}</option>
                        ))}
                    </select>
                </div>
                <div className="footer-group">
                    <input
                        type="text"
                        value={highlightLines}
                        onChange={(e) => setHighlightLines(e.target.value)}
                        placeholder="Highlight (1,3-5)"
                        className="footer-input highlight-input"
                    />
                </div>
            </div>
        </div>
    );
}
