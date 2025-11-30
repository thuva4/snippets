import { useState, useCallback, useRef } from 'react';
import './ResizeHandle.css';

interface ResizeHandleProps {
    direction: 'horizontal' | 'vertical';
    onResize: (delta: number) => void;
    onResizeEnd?: () => void;
}

export function ResizeHandle({ direction, onResize, onResizeEnd }: ResizeHandleProps) {
    const [isDragging, setIsDragging] = useState(false);
    const startPosRef = useRef<number>(0);

    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsDragging(true);
        startPosRef.current = e.clientX;

        const handleMouseMove = (moveEvent: MouseEvent) => {
            const currentPos = moveEvent.clientX;
            const delta = currentPos - startPosRef.current;
            startPosRef.current = currentPos;
            onResize(delta);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
            if (onResizeEnd) {
                onResizeEnd();
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    }, [direction, onResize, onResizeEnd]);

    return (
        <div
            className={`resize-handle resize-handle-${direction} ${isDragging ? 'dragging' : ''}`}
            onMouseDown={handleMouseDown}
        />
    );
}
