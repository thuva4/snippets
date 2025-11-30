# @thuva4/snippets-node

Node.js implementation for generating code snippet images.

## Overview

`@thuva4/snippets-node` provides a complete Node.js solution for creating code snippet images. It uses headless browsers (Puppeteer or Playwright) to render HTML to PNG images, and includes a CLI tool for command-line usage.

## Installation

```bash
npm install @thuva4/snippets-node
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

### Save to File

```typescript
import { createSnippet } from '@thuva4/snippets-node';

const snippet = createSnippet()
  .code('const greeting = "Hello, World!";')
  .language('javascript')
  .fileName('example.js')
  .theme('vercel')
  .padding(16)
  .margin(32)
  .width(1200);

// Save to file
await snippet.save('output.png');
```

### Get Buffer

```typescript
import { createSnippet } from '@thuva4/snippets-node';

const buffer = await createSnippet()
  .code('const x = 42;')
  .language('javascript')
  .theme('nord')
  .generate();

// Use buffer (e.g., upload to S3, send via HTTP, etc.)
```

## CLI Usage

The package includes a `snippets` CLI command:

```bash
# Basic usage
npx snippets --code "console.log('hello')" --language javascript --output snippet.png

# With theme and styling
npx snippets \
  --code "const x = 42;" \
  --language typescript \
  --theme vercel \
  --padding 24 \
  --margin 48 \
  --output example.png

# From file
npx snippets \
  --file ./src/example.ts \
  --language typescript \
  --theme dracula \
  --output snippet.png
```

## Features

- **🎨 Multiple Themes**: 13+ built-in themes (Vercel, Tailwind, Dracula, Nord, etc.)
- **🔧 Highly Customizable**: Control padding, margins, colors, shadows, and more
- ** Buffer or File**: Generate to file or get raw buffer for custom workflows
- **⚡ CLI Tool**: Use from command line for quick snippet generation
- **🎯 TypeScript**: Full TypeScript support with comprehensive types
- **🔌 Extensible**: Plugin system for custom themes and processing

## Builder Methods

The `SnippetBuilder` provides a fluent API:

- `.code(string)` - Set the code content
- `.language(string)` - Set the programming language
- `.theme(string)` - Set the theme name
- `.fileName(string)` - Set the window title/filename
- `.padding(number)` - Set padding
- `.margin(number)` - Set margin
- `.width(number)` - Set output width
- `.format('png' | 'jpeg')` - Set output format
- `.lineNumbers(boolean)` - Show/hide line numbers
- `.highlightLines(string)` - Highlight specific lines (e.g., "1-3,5,7-9")
- `.save(path)` - Save to file
- `.generate()` - Get buffer

## Requirements

- Node.js 16 or higher

## Use Cases

- Generate code snippets for documentation
- Build custom code snippet sharing tools
- Generate tutorial/blog post images

## Related Packages

- **[@thuva4/snippets-core](https://www.npmjs.com/package/@thuva4/snippets-core)**: Core logic and types
- **[@thuva4/snippets-browser](https://www.npmjs.com/package/@thuva4/snippets-browser)**: Browser-based implementation

## License

MIT
