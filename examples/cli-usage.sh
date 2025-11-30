#!/bin/bash
# CLI Usage Examples

echo "📸 Code Snippet CLI Examples"
echo ""

# Basic usage
echo "1️⃣  Basic generation:"
echo "   snippets generate code.js -o test-results/output.png"
echo ""

# With line numbers
echo "2️⃣  With line numbers:"
echo "   snippets generate code.js -o test-results/output.png --line-numbers"
echo ""

# Using presets
echo "3️⃣  Using Twitter preset:"
echo "   snippets generate code.js --preset twitter -o test-results/tweet.png"
echo ""

# Custom theme
echo "4️⃣  Custom theme and window:"
echo "   snippets generate code.js --theme vercel --window-theme vercel -o test-results/output.png"
echo ""

# Line highlighting
echo "5️⃣  Highlight specific lines:"
echo "   snippets generate code.js --highlight '1,3,5-7' -o test-results/output.png"
echo ""

# Export formats
echo "6️⃣  Export to PDF:"
echo "   snippets generate code.js --format pdf -o test-results/output.pdf"
echo ""

# From stdin
echo "7️⃣  From stdin:"
echo "   cat code.js | snippets generate -l javascript -o test-results/output.png"
echo ""

# List available options
echo "8️⃣  List themes:"
echo "   snippets list themes"
echo ""

echo "9️⃣  List presets:"
echo "   snippets list presets"
