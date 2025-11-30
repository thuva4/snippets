# @thuva4/snippets-core

Core logic and types for code snippet image generation.

## Overview

`@thuva4/snippets-core` is the foundational package that provides configuration, types, theming, and rendering logic for generating code snippet images. This package is platform-agnostic and can be used in both Node.js and browser environments.

## Installation

```bash
npm install @thuva4/snippets-core
```

## Key Features

- **Type-safe Configuration**: Comprehensive TypeScript types for all configuration options
- **Theme System**: Built-in themes and plugin architecture for custom themes
- **Preset System**: Pre-configured styles and layouts
- **Code Highlighting**: Syntax highlighting powered by Shiki
- **HTML Generation**: Render code snippets as HTML with customizable styling
- **Style Utilities**: Helper functions for CSS generation (padding, shadows, borders, backgrounds)
- **Line Features**: Line numbers, line highlighting, and annotations

## Theme Registration

```typescript
import { registerTheme } from '@thuva4/snippets-core';

registerTheme('custom', {
  name: 'Custom Theme',
  background: 'linear-gradient(140deg, #667eea, #764ba2)',
  windowBg: '#1a1a2e',
  windowBorder: 'rgba(255, 255, 255, 0.1)',
  titleColor: '#e0e0e0',
  controls: {
    red: '#ff5f56',
    yellow: '#ffbd2e',
    green: '#27c93f',
  },
});
```

## Style Utilities

```typescript
import { 
  paddingToCSS,
  backgroundToCSS,
  shadowToCSS,
  borderToCSS,
  borderRadiusToCSS 
} from '@thuva4/snippets-core';

// Convert padding config to CSS
const paddingCSS = paddingToCSS({ top: 32, right: 24, bottom: 32, left: 24 });

// Convert background config to CSS
const bgCSS = backgroundToCSS({
  type: 'gradient',
  colors: ['#667eea', '#764ba2'],
  direction: '140deg'
});

// Convert shadow config to CSS
const shadowCSS = shadowToCSS({
  offsetX: 0,
  offsetY: 20,
  blur: 60,
  spread: 0,
  color: 'rgba(0, 0, 0, 0.3)'
});
```

## Code Highlighting

```typescript
import { highlightCode, generateCodeHTML } from '@thuva4/snippets-core';

// Highlight code with Shiki
const highlighted = await highlightCode(
  'const x = 42;',
  'javascript',
  'nord'
);

// Generate HTML for code
const html = generateCodeHTML(highlighted, { 
  showLineNumbers: true 
});
```

## Line Features

```typescript
import { 
  parseLineRange,
  shouldHighlightLine,
  generateLineNumberHTML,
  generateAnnotationHTML 
} from '@thuva4/snippets-core';

// Parse line ranges like "1-3,5,7-9"
const lines = parseLineRange('1-3,5,7-9');

// Check if line should be highlighted
const isHighlighted = shouldHighlightLine(5, '1-3,5,7-9');

// Generate line number HTML
const lineNumHTML = generateLineNumberHTML(5, {
  color: '#888',
  highlightColor: '#fff'
});
```

## HTML Generation

```typescript
import { generateSnippetHTML } from '@thuva4/snippets-core';

const html = await generateSnippetHTML({
  code: 'console.log("Hello, World!");',
  language: 'javascript',
  style: { padding: 24 },
  window: { theme: 'vercel', title: 'example.js' },
  code: { showLineNumbers: true }
});
```

## Use Cases

This core package is used by:

- **[@thuva4/snippets-node](https://www.npmjs.com/package/@thuva4/snippets-node)**: Node.js implementation with Puppeteer/Playwright rendering
- **[@thuva4/snippets-browser](https://www.npmjs.com/package/@thuva4/snippets-browser)**: Browser-based implementation

## License

MIT
