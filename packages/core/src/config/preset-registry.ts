import { BUILT_IN_PRESETS } from './presets.js';
import { Config, PresetConfig } from './types.js';
import { mergeConfig } from './index.js';

const presetRegistry = new Map<string, PresetConfig>();

function initializeBuiltInPresets() {
    for (const [name, config] of Object.entries(BUILT_IN_PRESETS)) {
        presetRegistry.set(name, config);
    }
}

initializeBuiltInPresets();

export function registerPreset(name: string, preset: PresetConfig): void {
    presetRegistry.set(name, preset);
}

export function getPreset(name: string): PresetConfig | undefined {
    return presetRegistry.get(name);
}

export function applyPreset(
    presetName: string,
    baseConfig: Partial<Config> = {}
): Partial<Config> {
    const preset = getPreset(presetName);

    if (!preset) {
        console.warn(`Preset "${presetName}" not found`);
        return baseConfig;
    }

    // Convert PresetConfig to Config format
    const presetAsConfig: Partial<Config> = {
        style: preset.style,
        window: preset.window,
        code: preset.code,
        output: preset.output,
    };

    return mergeConfig(presetAsConfig, baseConfig);
}

export function listPresets(): string[] {
    return Array.from(presetRegistry.keys());
}

export function hasPreset(name: string): boolean {
    return presetRegistry.has(name);
}

export function unregisterPreset(name: string): boolean {
    return presetRegistry.delete(name);
}
