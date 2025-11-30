# Code Snippet to Image Library

Code snippet images with customizable themes and layouts.

## Installation

```bash
npm install @thuva4/snippets-node
# or for browser usage
npm install @thuva4/snippets-browser
```

## Quick Start

### Builder API

```typescript
import { createSnippet } from '@thuva4/snippets-node';

await createSnippet()
  .code('console.log("Hello, World!");')
  .language('javascript')
  .theme('vercel')
  .padding(24)
  .margin(48)
  .format('png')
  .save('output.png');
```

## API Reference

### Builder API

```typescript
import { createSnippet, setGlobalDefaults } from '@thuva4/snippets-node';

// Create snippet with builder
const snippet = createSnippet()
  .code('...')
  .language('javascript')
  .fileName('example.js')
  .theme('vercel')
  .padding(16)
  .margin(32)
  .width(1200);

// Save to file
await snippet.save('output.png');

// Or get buffer
const buffer = await snippet.generate();

// Set global defaults
setGlobalDefaults({
  style: { padding: 24, margin: 48 },
  window: { theme: 'vercel' },
});
```

## Themes

### Preview

```typescript
// Try different themes
await createSnippet()
  .code('const x = 42;')
  .language('javascript')
  .theme('vercel')
  .save('vercel.png');
```

## Custom Themes

You can register your own custom themes:

```typescript
import { registerTheme, createSnippet } from '@thuva4/snippets-node';

// Register a custom theme
registerTheme('cyberpunk', {
  name: 'Cyberpunk',
  background: 'linear-gradient(140deg, #ff006e, #8338ec, #3a86ff)',
  windowBg: '#1a0033',
  windowBorder: 'rgba(255, 0, 110, 0.3)',
  titleColor: '#ff006e',
  controls: {
    red: '#ff006e',
    yellow: '#ffbe0b',
    green: '#3a86ff',
  },
});

// Use your custom theme
await createSnippet()
  .code('const neon = { pink: "#ff006e" };')
  .language('javascript')
  .theme('cyberpunk')
  .save('output.png');
```

## Advanced Customization

The library supports fine-grained style options for advanced control:

### Padding Per Side

```typescript
import { paddingToCSS } from '@thuva4/snippets-core';

// Custom padding for each side
const padding = {
  top: 32,
  right: 24,
  bottom: 32,
  left: 24
};

const css = paddingToCSS(padding); // "32px 24px 32px 24px"
```

### Custom Backgrounds

```typescript
import { backgroundToCSS } from '@thuva4/snippets-core';

// Gradient background
const gradient = {
  type: 'gradient',
  colors: ['#667eea', '#764ba2', '#f093fb'],
  direction: '140deg'
};

const css = backgroundToCSS(gradient);
```

### Shadow Customization

```typescript
import { shadowToCSS } from '@thuva4/snippets-core';

const shadow = {
  offsetX: 0,
  offsetY: 20,
  blur: 60,
  spread: 0,
  color: 'rgba(0, 0, 0, 0.3)'
};

const css = shadowToCSS(shadow);
```

### Border Styling

```typescript
import { borderToCSS, borderRadiusToCSS } from '@thuva4/snippets-core';

const border = {
  width: 2,
  color: 'rgba(255, 255, 255, 0.2)',
  radius: 12,
  style: 'solid'
};

const borderCSS = borderToCSS(border);
const radiusCSS = borderRadiusToCSS(border);
```

## Examples

See the `/test` directory for more examples:

- `test/example.ts` - Basic usage
- `test/customization.ts` - Theme and width customization
- `test/padding.ts` - Padding examples
- `test/margin.ts` - Margin examples
- `test/builder-api.ts` - New builder API examples

## License

MIT
