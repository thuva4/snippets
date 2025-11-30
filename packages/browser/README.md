# @thuva4/snippets-browser

Browser implementation for generating code snippet images.

## Overview

`@thuva4/snippets-browser` brings code snippet image generation to the browser. Perfect for client-side applications, web editors, and interactive documentation tools.

## Installation

```bash
npm install @thuva4/snippets-browser
```

## Quick Start

```typescript
import { createSnippet } from '@thuva4/snippets-browser';

const snippet = createSnippet()
  .code('console.log("Hello, World!");')
  .language('javascript')
  .theme('vercel')
  .padding(24)
  .margin(48);

// Generate HTML (for display in browser)
const html = await snippet.generateHTML();
document.getElementById('preview').innerHTML = html;

// Or get as data URL for download
const dataUrl = await snippet.toDataURL();
```

## Features

- **🌐 Browser Native**: No server required, runs entirely in the browser
- **⚡ Zero Dependencies**: Lightweight with minimal bundle size
- **🔧 Customizable**: Same configuration API as Node.js version
- **📱 Framework Agnostic**: Works with React, Vue, Svelte, vanilla JS, etc.
- **🎯 TypeScript**: Full TypeScript support

## Usage Examples

### Display in DOM

```typescript
import { createSnippet } from '@thuva4/snippets-browser';

const snippet = createSnippet()
  .code(`function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}`)
  .language('javascript')
  .theme('dracula')
  .fileName('fibonacci.js')
  .lineNumbers(true);

const html = await snippet.generateHTML();
document.getElementById('snippet-container').innerHTML = html;
```

### React Integration

```tsx
import { createSnippet } from '@thuva4/snippets-browser';
import { useState, useEffect } from 'react';

function CodeSnippetPreview({ code, language, theme }) {
  const [html, setHtml] = useState('');
  
  useEffect(() => {
    createSnippet()
      .code(code)
      .language(language)
      .theme(theme)
      .generateHTML()
      .then(setHtml);
  }, [code, language, theme]);
  
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

### Vue Integration

```vue
<template>
  <div v-html="snippetHtml"></div>
</template>

<script setup>
import { createSnippet } from '@thuva4/snippets-browser';
import { ref, watchEffect } from 'vue';

const props = defineProps(['code', 'language', 'theme']);
const snippetHtml = ref('');

watchEffect(async () => {
  snippetHtml.value = await createSnippet()
    .code(props.code)
    .language(props.language)
    .theme(props.theme)
    .generateHTML();
});
</script>
```

### Interactive Code Editor

```typescript
import { createSnippet } from '@thuva4/snippets-browser';

// Update preview on code change
const editor = document.getElementById('code-editor');
const preview = document.getElementById('preview');

editor.addEventListener('input', async (e) => {
  const html = await createSnippet()
    .code(e.target.value)
    .language('javascript')
    .theme('vercel')
    .generateHTML();
  
  preview.innerHTML = html;
});
```

## Browser Compatibility

- Modern browsers with ES6+ support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Bundle Size

The browser package is optimized for size:
- Core: ~50KB (minified + gzipped)
- Includes Shiki for syntax highlighting
- Tree-shakeable exports

## Use Cases

- **Code Playgrounds**: Live code editor previews
- **Documentation Sites**: Interactive code examples
- **Educational Platforms**: Visual code tutorials
- **Social Sharing**: Generate shareable code images
- **CMS/Blog Tools**: Code snippet widgets
- **Design Tools**: Code mockup generators

## Differences from Node Package

| Feature | Browser | Node |
|---------|---------|------|
| Rendering | HTML/Canvas | Puppeteer/Playwright |
| Output | HTML/Data URL | PNG/JPEG Buffer |
| Environment | Browser | Node.js |
| CLI | ❌ | ✅ |
| File System | ❌ | ✅ |
| Bundle Size | Small | Large |

## Related Packages

- **[@thuva4/snippets-core](https://www.npmjs.com/package/@thuva4/snippets-core)**: Core logic and types
- **[@thuva4/snippets-node](https://www.npmjs.com/package/@thuva4/snippets-node)**: Node.js implementation with CLI

## License

MIT
