export { SnippetBuilder, createSnippet } from './SnippetBuilder.js';

export {
    setGlobalDefaults,
    getGlobalDefaults,
    resetGlobalDefaults,
    resolveConfig,
    mergeConfig,
    DEFAULT_CONFIG,
    registerPreset,
    getPreset,
    applyPreset,
    listPresets,
    hasPreset,
    unregisterPreset,
} from '@snippets/core';

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
    LineNumberConfig,
    LineHighlightConfig,
    AnnotationConfig,
    EnhancedCodeConfig,
    PresetConfig,
} from '@snippets/core';

export {
    type ThemeConfig,
    themes,
    getTheme,
    registerTheme,
    getRegisteredTheme,
    listThemes,
    unregisterTheme,
    hasTheme,
} from '@snippets/core';

export {
    defaultTheme,
    vercelTheme,
    supabaseTheme,
    tailwindTheme,
    minimalTheme,
    cyberpunkTheme,
    sunsetTheme,
    oceanTheme,
    forestTheme,
    auroraTheme,
    draculaTheme,
    monokaiTheme,
    nordTheme,
} from '@snippets/core';

export type {
    Plugin,
    PluginHooks,
    ThemePlugin,
    AnyPlugin,
} from '@snippets/core';

export {
    escapeHtml,
    generateCodeHTML,
    highlightCode,
    parseMarkdown,
    parseMarkdownWithSeparators,
    paddingToCSS,
    backgroundToCSS,
    shadowToCSS,
    borderToCSS,
    borderRadiusToCSS,
    parseLineRange,
    shouldHighlightLine,
    generateLineNumberHTML,
    generateAnnotationHTML,
    getHighlightStyle,
} from '@snippets/core';



