# Snippets React Demo

Modern React demo with inline editable code snippet.

## Features

- ✨ **Inline Editing**: Click on snippet to edit code directly
- 🎨 **19 Themes**: All available themes with instant preview
- 💻 **19+ Languages**: Support for all major programming languages
- ⚡ **Real-time Preview**: Debounced rendering (500ms)
- 📦 **Export**: Download as SVG or copy to clipboard
- 🎯 **Controls**: Theme, language, padding, margin, line numbers

## Quick Start

1. **Install dependencies**:
   ```bash
   cd demo-react
   npm install
   ```

2. **Start dev server**:
   ```bash
   npm run dev
   ```

3. **Open browser**:
   ```
   http://localhost:3001
   ```

## Usage

1. **Edit Code**: Click on the rendered snippet to edit inline
2. **Customize**: Use bottom control panel to adjust options
3. **Download**: Click "Download" to save as SVG

## Tech Stack

- React 18 + TypeScript
- Vite (fast build tool)
- snippets/browser API
- CSS Modules

## Development

```bash
# Install
npm install

# Dev server
npm run dev

# Build
npm run build

# Preview build
npm run preview
```

## Controls

- **Theme**: Select from 19 themes
- **Language**: Choose programming language
- **Padding**: Code padding (0, 16, 32, 64, 128)
- **Margin**: Outside margin (0, 16, 32, 64)
- **Background**: Toggle gradient background
- **Dark mode**: Toggle dark/light window
- **Line numbers**: Show/hide line numbers

## Architecture

```
src/
├── App.tsx                 # Main app component
├── components/
│   ├── SnippetEditor.tsx  # Inline editable snippet
│   └── ControlPanel.tsx   # Bottom controls
├── hooks/
│   └── useSnippet.ts      # Rendering logic
└── styles/
    ├── index.css
    ├── App.css
    ├── SnippetEditor.css
    └── ControlPanel.css
```

## Features Implemented

✅ Inline editing
✅ Real-time preview with debouncing
✅ All theme/language options
✅ Responsive design
✅ Download & copy functionality
✅ Smooth transitions
✅ Loading states

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## License

MIT
