import { PaddingConfig, BackgroundConfig, ShadowConfig, BorderConfig } from '../config/types.js';

export function paddingToCSS(padding: PaddingConfig): string {
    if (typeof padding === 'number') {
        return `${padding}px`;
    }

    const top = padding.top ?? 0;
    const right = padding.right ?? 0;
    const bottom = padding.bottom ?? 0;
    const left = padding.left ?? 0;

    return `${top}px ${right}px ${bottom}px ${left}px`;
}


export function backgroundToCSS(background: BackgroundConfig): string {
    if (typeof background === 'string') {
        return background;
    }

    if (background.type === 'solid') {
        return background.color;
    }

    if (background.type === 'gradient') {
        const direction = background.direction || '140deg';
        const colors = background.colors.join(', ');
        return `linear-gradient(${direction}, ${colors})`;
    }

    if (background.type === 'image') {
        const size = background.size || 'cover';
        const position = background.position || 'center';
        return `url(${background.url}) ${position} / ${size}`;
    }

    return 'transparent';
}

export function shadowToCSS(shadow: ShadowConfig): string {
    const offsetX = shadow.offsetX ?? 0;
    const offsetY = shadow.offsetY ?? 20;
    const blur = shadow.blur ?? 60;
    const spread = shadow.spread ?? 0;
    const color = shadow.color ?? 'rgba(0, 0, 0, 0.3)';

    return `${offsetX}px ${offsetY}px ${blur}px ${spread}px ${color}`;
}

export function borderToCSS(border: BorderConfig): string {
    const width = border.width ?? 1;
    const style = border.style ?? 'solid';
    const color = border.color ?? 'rgba(255, 255, 255, 0.1)';

    return `${width}px ${style} ${color}`;
}

export function borderRadiusToCSS(border: BorderConfig): string {
    const radius = border.radius ?? 8;
    return `${radius}px`;
}
