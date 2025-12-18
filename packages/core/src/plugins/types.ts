import type { ThemeConfig } from './themes/types.js';

export interface Plugin {
    name: string;
    version: string;
    description?: string;
    author?: string;
}

export interface PluginHooks {
    onRegister?(): void | Promise<void>;
    onBeforeRender?(context: RenderContext): void | Promise<void>;
    onAfterRender?(context: RenderContext, result: Buffer): void | Promise<void>;
}

export interface RenderContext {
    code: string;
    language: string;
    options: Record<string, unknown>;
}

export interface ThemePlugin extends Plugin {
    type: 'theme';
    config: ThemeConfig;
    variants?: {
        light?: ThemeConfig;
        dark?: ThemeConfig;
    };
}

export type { ThemeConfig };
export type AnyPlugin = ThemePlugin;
