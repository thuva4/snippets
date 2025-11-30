import { DEFAULT_CONFIG } from './defaults.js';
import { Config } from './types.js';
import { SnippetOptions } from '../renderer/types.js';

let globalConfig: Config = { ...DEFAULT_CONFIG };

export function setGlobalDefaults(config: Partial<Config>): void {
    globalConfig = mergeConfig(globalConfig, config);
}

export function getGlobalDefaults(): Config {
    return { ...globalConfig };
}

export function resetGlobalDefaults(): void {
    globalConfig = { ...DEFAULT_CONFIG };
}

export function mergeConfig<T extends Record<string, any>>(
    base: T,
    override: Partial<T>
): T {
    const result = { ...base };

    for (const key in override) {
        const value = override[key];
        if (value !== undefined) {
            if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
                result[key] = mergeConfig(
                    (base[key] as Record<string, any>) || {},
                    value as Record<string, any>
                ) as T[Extract<keyof T, string>];
            } else {
                result[key] = value as T[Extract<keyof T, string>];
            }
        }
    }

    return result;
}

export function normalizeLegacyOptions(options: SnippetOptions): {
    code: string;
    language: string;
    fileName?: string;
    config: Config;
    output?: string;
} {
    return {
        code: options.code || '',
        language: options.language || '',
        fileName: options.fileName,
        output: options.output,
        config: {
            style: {
                padding: options.padding,
                margin: options.margin,
                background: options.background,
                darkMode: options.darkMode,
            },
            window: {
                theme: options.windowTheme as any,
            },
            code: {
                theme: options.theme,
            },
            output: {
                width: options.width,
                scale: options.scale,
            },
        },
    };
}

export function resolveConfig(config?: Partial<Config>): Config {
    return mergeConfig(globalConfig, config || {});
}
