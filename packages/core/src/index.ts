export {
    setGlobalDefaults,
    getGlobalDefaults,
    resetGlobalDefaults,
    resolveConfig,
    mergeConfig,
    normalizeLegacyOptions,
} from './config/index.js';

export { DEFAULT_CONFIG } from './config/defaults.js';

export {
    registerPreset,
    getPreset,
    applyPreset,
    listPresets,
    hasPreset,
    unregisterPreset,
} from './config/preset-registry.js';

export type {
    PresetConfig,
    LineNumberConfig,
    LineHighlightConfig,
    AnnotationConfig,
    EnhancedCodeConfig,
} from './config/types.js';
export { BUILT_IN_PRESETS } from './config/presets.js';

// Types
export type {
    Config,
    StyleConfig,
    WindowConfig,
    CodeConfig,
    OutputConfig,

    PaddingConfig,
    BackgroundConfig,
    ShadowConfig,
    BorderConfig,
    AdvancedStyleConfig,
    AdvancedWindowConfig,
    AdvancedConfig,
} from './config/types.js';

export { type ThemeConfig, themes, getTheme } from './plugins/themes/index.js';

export { defaultTheme } from './plugins/themes/presets/default.js';
export { vercelTheme } from './plugins/themes/presets/vercel.js';
export { supabaseTheme } from './plugins/themes/presets/supabase.js';
export { tailwindTheme } from './plugins/themes/presets/tailwind.js';
export { minimalTheme } from './plugins/themes/presets/minimal.js';
export { cyberpunkTheme } from './plugins/themes/presets/cyberpunk.js';
export { sunsetTheme } from './plugins/themes/presets/sunset.js';
export { oceanTheme } from './plugins/themes/presets/ocean.js';
export { forestTheme } from './plugins/themes/presets/forest.js';
export { auroraTheme } from './plugins/themes/presets/aurora.js';
export { draculaTheme } from './plugins/themes/presets/dracula.js';
export { monokaiTheme } from './plugins/themes/presets/monokai.js';
export { nordTheme } from './plugins/themes/presets/nord.js';

// Plugin system
export {
    registerTheme,
    getRegisteredTheme,
    listThemes,
    unregisterTheme,
    hasTheme,
} from './plugins/registry.js';

export type {
    Plugin,
    PluginHooks,
    ThemePlugin,
    AnyPlugin,
} from './plugins/types.js';

export { escapeHtml, generateCodeHTML } from './utils/html.js';
export { highlightCode, _resetHighlighter, type ThemeInput } from './utils/highlighter.js';
export { parseMarkdown, parseMarkdownWithSeparators } from './utils/markdown.js';
export {
    paddingToCSS,
    backgroundToCSS,
    shadowToCSS,
    borderToCSS,
    borderRadiusToCSS,
} from './utils/style.js';

export {
    parseLineRange,
    shouldHighlightLine,
    generateLineNumberHTML,
    generateAnnotationHTML,
    getHighlightStyle,
} from './utils/line-features.js';

export {
    generateSnippetHTML,
    type SnippetOptions,
    type CodeColumn,
} from './renderer/index.js';

export { BaseSnippetBuilder } from './builder/BaseSnippetBuilder.js';
