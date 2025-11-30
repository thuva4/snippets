import { useEffect, useState, useRef, useCallback } from 'react';
import { ResizeHandle } from './ResizeHandle';
import './ResizeOverlay.css';
import { DEFAULT_CONFIG } from '../../../../packages/core/src/index';

interface ResizeOverlayProps {
    containerRef: React.RefObject<HTMLDivElement>;
    onWindowResize: (width: number) => void;
    onColumnResize: (columnIndex: number, width: number) => void;
    onResizeEnd: () => void;
    columnCount: number;
    windowWidth: number | null;
    columnWidths: Record<number, number>;
}

export function ResizeOverlay({
    containerRef,
    onWindowResize,
    onColumnResize,
    onResizeEnd,
    columnCount,
    windowWidth,
    columnWidths,
}: ResizeOverlayProps) {
    const [showWindowHandle, setShowWindowHandle] = useState(false);
    const [columnHandles, setColumnHandles] = useState<Array<{ left: number; index: number }>>([]);
    const overlayRef = useRef<HTMLDivElement>(null);
    const updateTimerRef = useRef<NodeJS.Timeout | null>(null);

    const updatePositions = useCallback(() => {
        if (!containerRef.current) return;

        const snippetWindow = containerRef.current.querySelector('.snippet-window') as HTMLElement;
        if (snippetWindow) {
            setShowWindowHandle(true);
        } else {
            setShowWindowHandle(false);
        }

        if (columnCount > 1) {
            const panes = Array.from(containerRef.current.querySelectorAll('.snippet-pane') || []) as HTMLElement[];
            const containerRect = containerRef.current.getBoundingClientRect();

            const handles: Array<{ left: number; index: number }> = [];

            for (let i = 0; i < panes.length - 1; i++) {
                const pane = panes[i];
                const paneRect = pane.getBoundingClientRect();
                const leftPosition = paneRect.right - containerRect.left;
                handles.push({ left: leftPosition, index: i });
            }

            setColumnHandles(handles);
        } else {
            setColumnHandles([]);
        }
    }, [containerRef, columnCount]);

    useEffect(() => {
        updatePositions();

        window.addEventListener('resize', updatePositions);

        const observer = new MutationObserver(() => {
            if (updateTimerRef.current) {
                clearTimeout(updateTimerRef.current);
            }
            updateTimerRef.current = setTimeout(updatePositions, 50);
        });

        if (containerRef.current) {
            observer.observe(containerRef.current, {
                childList: true,
                subtree: true,
                attributes: true,
            });
        }

        const intervals = [100, 300, 600, 1000, 2000].map(delay =>
            setTimeout(updatePositions, delay)
        );

        return () => {
            window.removeEventListener('resize', updatePositions);
            observer.disconnect();
            if (updateTimerRef.current) {
                clearTimeout(updateTimerRef.current);
            }
            intervals.forEach(clearTimeout);
        };
    }, [updatePositions, containerRef]);

    useEffect(() => {
        if (!containerRef.current) return;

        const timer = setTimeout(() => {
            if (windowWidth !== null) {
                const snippetWindow = containerRef.current?.querySelector('.snippet-window') as HTMLElement;
                if (snippetWindow) {
                    snippetWindow.style.width = `${windowWidth}px`;
                    snippetWindow.style.maxWidth = `${windowWidth}px`;
                    snippetWindow.style.minWidth = `${windowWidth}px`;
                }
            }

            if (Object.keys(columnWidths).length > 0) {
                const panes = Array.from(containerRef.current?.querySelectorAll('.snippet-pane') || []) as HTMLElement[];
                panes.forEach((pane, idx) => {
                    if (idx === panes.length - 1) {
                        pane.style.flex = '1';
                        pane.style.width = '';
                        pane.style.minWidth = '200px';
                        return;
                    }

                    pane.style.flex = 'none';
                    if (columnWidths[idx] !== undefined) {
                        pane.style.width = `${columnWidths[idx]}px`;
                    } else if (pane.style.width) {
                        pane.style.width = `${pane.offsetWidth}px`;
                    }
                });
            }

            updatePositions();
        }, 1000);

        return () => clearTimeout(timer);
    }, [containerRef, windowWidth, columnWidths, updatePositions]);

    const handleWindowResize = useCallback((delta: number) => {
        if (!containerRef.current) return;

        const snippetWindow = containerRef.current.querySelector('.snippet-window') as HTMLElement;
        if (snippetWindow) {
            const currentWidth = snippetWindow.offsetWidth;
            const minWidth = DEFAULT_CONFIG.output.width;
            const newWidth = Math.max(minWidth, Math.min(currentWidth + delta, window.innerWidth - 100));

            // Direct DOM manipulation ONLY - don't update state during drag
            snippetWindow.style.width = `${newWidth}px`;
            snippetWindow.style.minWidth = `${newWidth}px`;

            updatePositions();
        }
    }, [containerRef, updatePositions]);

    const handleWindowResizeEnd = useCallback(() => {
        if (!containerRef.current) return;

        const snippetWindow = containerRef.current.querySelector('.snippet-window') as HTMLElement;
        if (snippetWindow) {
            const finalWidth = snippetWindow.offsetWidth;
            onWindowResize(finalWidth);
        }
    }, [containerRef, onWindowResize]);

    const handleColumnResize = useCallback((columnIndex: number, delta: number) => {
        if (!containerRef.current) return;

        const panes = Array.from(containerRef.current.querySelectorAll('.snippet-pane')) as HTMLElement[];
        if (columnIndex < 0 || columnIndex >= panes.length - 1) return;

        const leftPane = panes[columnIndex];
        const rightPane = panes[columnIndex + 1];

        if (leftPane && rightPane) {
            const leftWidth = leftPane.offsetWidth;
            const rightWidth = rightPane.offsetWidth;
            const totalWidth = leftWidth + rightWidth;

            let newLeftWidth = leftWidth + delta;
            let newRightWidth = rightWidth - delta;

            if (newLeftWidth < 200) {
                newLeftWidth = 200;
                newRightWidth = totalWidth - 200;
            }
            if (newRightWidth < 200) {
                newRightWidth = 200;
                newLeftWidth = totalWidth - 200;
            }

            if (newLeftWidth >= 200 && newRightWidth >= 200 && (newLeftWidth + newRightWidth) === totalWidth) {
                panes.forEach((pane, idx) => {
                    if (idx === panes.length - 1) {
                        pane.style.flex = '1';
                        pane.style.width = '';
                    } else {
                        pane.style.flex = 'none';
                    }
                });

                leftPane.style.width = `${newLeftWidth}px`;

                if (columnIndex + 1 < panes.length - 1) {
                    rightPane.style.width = `${newRightWidth}px`;
                }

                panes.forEach((pane, idx) => {
                    if (idx !== columnIndex && idx !== columnIndex + 1 && idx !== panes.length - 1) {
                        if (!pane.style.width || pane.style.width === '') {
                            pane.style.width = `${pane.offsetWidth}px`;
                        }
                    }
                });

                onColumnResize(columnIndex, newLeftWidth);

                if (columnIndex + 1 < panes.length - 1) {
                    onColumnResize(columnIndex + 1, newRightWidth);
                }
            }
        }
    }, [containerRef, onColumnResize]);

    const handleColumnResizeEnd = useCallback(() => {
        updatePositions();
        onResizeEnd();
    }, [updatePositions, onResizeEnd]);

    return (
        <div ref={overlayRef} className="resize-overlay">
            {showWindowHandle && (
                <ResizeHandle
                    direction="horizontal"
                    onResize={handleWindowResize}
                    onResizeEnd={handleWindowResizeEnd}
                />
            )}

            {columnHandles.map((handle) => (
                <div
                    key={`column-handle-${handle.index}`}
                    className="column-handle-wrapper"
                    style={{
                        position: 'absolute',
                        left: `${handle.left}px`,
                        top: '44px',
                        bottom: 0,
                        transform: 'translateX(-4px)',
                    }}
                >
                    <ResizeHandle
                        direction="vertical"
                        onResize={(delta) => handleColumnResize(handle.index, delta)}
                        onResizeEnd={handleColumnResizeEnd}
                    />
                </div>
            ))}
        </div>
    );
}
