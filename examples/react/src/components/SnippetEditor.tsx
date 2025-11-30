import { useState, useEffect, useRef } from 'react';
import { useSnippet } from '../hooks/useSnippet';
import type { SnippetOptions } from '../types';
import type { BundledLanguage } from 'shiki';
import './SnippetEditor.css';

interface Props {
    code: string;
    fileName: string;
    language: BundledLanguage;
    highlightLines?: string;
    onChange: (code: string) => void;
    onFileNameChange: (fileName: string) => void;
    onLanguageChange: (language: string) => void;
    onHighlightChange?: (lines: string) => void;
    options: Omit<SnippetOptions, 'language'>;
    onRemove?: () => void;
    themeStyles?: {
        headerFooter: React.CSSProperties;
        separator: React.CSSProperties;
    };
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

export function SnippetEditor({
    code,
    fileName,
    language,
    highlightLines = '',
    onChange,
    onFileNameChange,
    onLanguageChange,
    onHighlightChange,
    options,
    onRemove,
    themeStyles
}: Props) {
    const { html, isLoading } = useSnippet(code, {
        ...options,
        language,
        highlightLines,
        noWindow: true
    } as any);

    const htmlRef = useRef<HTMLDivElement>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if (htmlRef.current && !isEditing) {
            htmlRef.current.innerHTML = html;
        }
    }, [html, isEditing]);

    useEffect(() => {
        if (textareaRef.current && isEditing) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [code, isEditing]);

    const handleClick = () => {
        setIsEditing(true);
        setTimeout(() => textareaRef.current?.focus(), 10);
    };

    const handleBlur = () => {
        setIsEditing(false);
    };

    return (
        <div className="snippet-pane">
            <div className="pane-header" style={themeStyles?.headerFooter}>
                <input
                    type="text"
                    value={fileName}
                    onChange={(e) => onFileNameChange(e.target.value)}
                    placeholder="Filename"
                    className="filename-input"
                    style={{ color: themeStyles?.headerFooter?.color }}
                />
                {onRemove && (
                    <button
                        onClick={onRemove}
                        className="btn-close"
                        aria-label="Remove file"
                        style={{ color: themeStyles?.headerFooter?.color }}
                    >
                        ×
                    </button>
                )}
            </div>

            <div className="pane-body">
                <div className="snippet-display">
                    <div
                        ref={htmlRef}
                        className={`snippet-html ${isLoading ? 'loading' : ''} ${isEditing ? 'hidden' : ''}`}
                        onClick={handleClick}
                    />

                    {isEditing && (
                        <textarea
                            ref={textareaRef}
                            value={code}
                            onChange={(e) => onChange(e.target.value)}
                            onBlur={handleBlur}
                            className="code-editor-overlay"
                            spellCheck={false}
                            autoFocus
                        />
                    )}

                    {isLoading && (
                        <div className="loading-overlay">
                            <div className="spinner" />
                        </div>
                    )}
                </div>
            </div>

            <div className="pane-footer" style={themeStyles?.headerFooter}>
                <div className="control-item">
                    <select
                        value={language}
                        onChange={(e) => onLanguageChange(e.target.value)}
                        className="language-select"
                        style={{
                            borderColor: themeStyles?.separator?.borderColor,
                            color: themeStyles?.headerFooter?.color
                        }}
                    >
                        {LANGUAGES.map(lang => (
                            <option key={lang.value} value={lang.value}>
                                {lang.label.toUpperCase()}
                            </option>
                        ))}
                    </select>
                </div>

                {onHighlightChange && (
                    <div className="control-item highlight-control">
                        <input
                            type="text"
                            value={highlightLines}
                            onChange={(e) => onHighlightChange(e.target.value)}
                            placeholder="Highlight: 1,3-5"
                            className="highlight-input"
                            style={{
                                borderColor: themeStyles?.separator?.borderColor,
                                color: themeStyles?.headerFooter?.color
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
}
