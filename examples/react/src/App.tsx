import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import './styles/App.css';
import { useSnippet } from './hooks/useSnippet';
import { ControlPanel } from './components/ControlPanel';
import { ResizeOverlay } from './components/ResizeOverlay';
import { toPng } from 'html-to-image';
import { CodeColumn, SnippetOptions } from './types';
import { EditorOverlay } from './components/EditorOverlay';

function App() {
    const windowRef = useRef<HTMLDivElement>(null);
    const [columns, setColumns] = useState<CodeColumn[]>([
        { id: '1', code: "console.log('Hello, World!');", language: 'javascript', fileName: 'index.js', highlightLines: '' }
    ]);

    const [options, setOptions] = useState<Omit<SnippetOptions, 'language'>>({
        theme: 'supabase',
        padding: 16,
        darkMode: true,
        showLineNumbers: false,
        background: true,
        windowTheme: 'supabase',
        margin: 0,
    });

    const [activePaneIndex, setActivePaneIndex] = useState<number | null>(null);
    const [activePaneRect, setActivePaneRect] = useState<{ top: number; left: number; width: number; height: number } | null>(null);
    const [windowWidth, setWindowWidth] = useState<number | null>(null);
    const [columnWidths, setColumnWidths] = useState<Record<number, number>>({});

    const updateOption = (key: keyof SnippetOptions, value: any) => {
        setOptions((prev) => ({ ...prev, [key]: value }));
    };

    // Sync dark mode with localStorage and HTML class
    useEffect(() => {
        const isDark = options.darkMode;
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [options.darkMode]);

    const updateColumn = (id: string, updates: Partial<CodeColumn>) => {
        setColumns(prev => prev.map(col => col.id === id ? { ...col, ...updates } : col));
    };

    const addColumn = () => {
        if (columns.length >= 3) return;
        const newId = String(columns.length + 1);
        setColumns([...columns, {
            id: newId,
            code: "console.log('Hello, World!');",
            language: 'javascript',
            fileName: `file${newId}.js`,
            highlightLines: ''
        }]);
    };

    const removeColumn = (id: string) => {
        if (columns.length > 1) {
            setColumns(prev => prev.filter(col => col.id !== id));
        }
    };

    const handleDownload = async () => {
        if (windowRef.current) {
            try {
                const dataUrl = await toPng(windowRef.current, {
                    filter: (node) => {
                        return !node.classList?.contains('pane-footer') &&
                            !node.classList?.contains('btn-add-pane-floating') &&
                            !node.classList?.contains('editor-overlay');
                    },
                    pixelRatio: 2,
                });

                const link = document.createElement('a');
                link.download = 'snippet.png';
                link.href = dataUrl;
                link.click();
            } catch (err) {
                console.error('Failed to download image', err);
            }
        }
    };

    const handlePaneClick = (e: React.MouseEvent, index: number) => {
        if ((e.target as HTMLElement).closest('.pane-header')) return;

        const pane = (e.target as HTMLElement).closest('.snippet-pane');
        if (pane) {
            const rect = pane.getBoundingClientRect();
            const containerRect = windowRef.current?.getBoundingClientRect();

            if (containerRect) {
                setActivePaneRect({
                    top: rect.top - containerRect.top,
                    left: rect.left - containerRect.left,
                    width: rect.width,
                    height: rect.height
                });
                setActivePaneIndex(index);
            }
        }
    };

    const closeEditor = () => {
        setActivePaneIndex(null);
        setActivePaneRect(null);
    };

    const handleWindowResize = useCallback((width: number) => {
        setWindowWidth(width);
    }, []);

    const handleColumnResize = useCallback((columnIndex: number, width: number) => {
        setColumnWidths(prev => ({ ...prev, [columnIndex]: width }));
    }, []);

    const handleResizeEnd = useCallback(() => {
        // Trigger re-render after resize completes
        // This is debounced - only happens when user stops dragging
    }, []);

    useEffect(() => {
        const handleResize = () => {
            if (activePaneIndex !== null && windowRef.current) {
                closeEditor();
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [activePaneIndex]);

    return (
        <div className="app">
            <div className="content centered-content">
                <div className="window-container" ref={windowRef} style={{ background: 'transparent', boxShadow: 'none', border: 'none', position: 'relative', overflow: 'visible' }}>

                    <UnifiedSnippetDisplay
                        columns={useMemo(() => {
                            return columns.map((col, index) => ({
                                ...col,
                                width: index === columns.length - 1 ? undefined : columnWidths[index]
                            }));
                        }, [columns, columnWidths])}
                        options={useMemo(() => ({
                            ...options,
                            ...(windowWidth !== null && {
                                width: windowWidth,
                                maxWidth: undefined
                            })
                        }), [options, windowWidth])}
                        onPaneClick={handlePaneClick}
                    />

                    {activePaneIndex !== null && activePaneRect && (
                        <EditorOverlay
                            code={columns[activePaneIndex].code}
                            language={columns[activePaneIndex].language}
                            fileName={columns[activePaneIndex].fileName}
                            highlightLines={columns[activePaneIndex].highlightLines}
                            rect={activePaneRect}
                            onClose={closeEditor}
                            onChange={(updates) => updateColumn(columns[activePaneIndex].id, updates)}
                            onRemove={columns.length > 1 ? () => {
                                removeColumn(columns[activePaneIndex].id);
                                closeEditor();
                            } : undefined}
                        />
                    )}

                    {columns.length < 3 && activePaneIndex === null && (
                        <button
                            onClick={addColumn}
                            className="btn-add-pane-floating"
                            title="Add new pane"
                        >
                            +
                        </button>
                    )}

                    <ResizeOverlay
                        containerRef={windowRef}
                        onWindowResize={handleWindowResize}
                        onColumnResize={handleColumnResize}
                        onResizeEnd={handleResizeEnd}
                        columnCount={columns.length}
                        windowWidth={windowWidth}
                        columnWidths={columnWidths}
                    />
                </div>

                <ControlPanel
                    options={options}
                    onOptionChange={updateOption}
                    onDownload={handleDownload}
                />
            </div>

            <footer className="app-footer">
                <p>© 2025 Thuvarakan Tharmarajasingam. All rights reserved.</p>
            </footer>
        </div>
    );
}

function UnifiedSnippetDisplay({ columns, options, onPaneClick }: { columns: CodeColumn[], options: any, onPaneClick: (e: React.MouseEvent, index: number) => void }) {
    const snippetOptions = useMemo(() => ({
        ...options,
        columns: columns.map(c => ({
            code: c.code,
            language: c.language,
            fileName: c.fileName,
            highlightLines: c.highlightLines,
            width: c.width
        }))
    }), [options, columns]);

    const { html, isLoading } = useSnippet('', snippetOptions);

    const containerRef = useRef<HTMLDivElement>(null);

    const handleClick = useCallback((e: React.MouseEvent) => {
        const pane = (e.target as HTMLElement).closest('.snippet-pane');
        if (pane) {
            const allPanes = Array.from(containerRef.current?.querySelectorAll('.snippet-pane') || []);
            const index = allPanes.indexOf(pane);
            if (index !== -1) {
                onPaneClick(e, index);
            }
        }
    }, [onPaneClick]);

    return (
        <div style={{ position: 'relative' }}>
            <div
                ref={containerRef}
                dangerouslySetInnerHTML={{ __html: html }}
                onClick={handleClick}
                style={{ cursor: 'pointer', opacity: isLoading ? 0.7 : 1, transition: 'opacity 0.2s' }}
            />
            {isLoading && !html && (
                <div className="loading-placeholder">
                    <div className="loading-spinner" />
                    <span>Generating snippet...</span>
                </div>
            )}
        </div>
    );
}

export default App;
